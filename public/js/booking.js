/* ==========================================================================
   Consultation booking
   Visitors pick a weekday and a 60-minute slot (shown in their own time zone),
   then the booking opens in WhatsApp as a ready-to-send message.
   Availability is set in BOOKING below.
   ========================================================================== */
(() => {
  const BOOKING = {
    whatsappNumber: "447587910296",
    hostZone: "Europe/London", // availability is defined in UK time
    ownerZone: "Asia/Karachi", // also shown in the WhatsApp message for Abubakar
    days: [1, 2, 3, 4, 5], // Mon–Fri (0 = Sunday)
    firstHour: 12, // first slot starts 12:00 PM UK
    lastHour: 23, // last slot starts 11:00 PM UK (ends at midnight)
    slotMinutes: 60,
    daysAhead: 14, // how many weekdays to offer
    minNoticeHours: 2, // slots starting sooner than this are hidden
  };

  const dialog = document.getElementById("booking");
  if (!dialog || typeof dialog.showModal !== "function") return; // old browsers keep the plain WhatsApp link

  const $ = (sel) => dialog.querySelector(sel);
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  /* --- time-zone helpers (no libraries) --- */
  // Offset (ms) of `zone` from UTC at instant `t`.
  const zoneOffset = (t, zone) => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }).formatToParts(new Date(t)).map((p) => [p.type, p.value])
    );
    const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
    return asUtc - Math.floor(t / 1000) * 1000;
  };
  // Instant for a wall-clock time in `zone`.
  const zonedInstant = (y, m, d, h, zone) => {
    const guess = Date.UTC(y, m, d, h);
    let t = guess - zoneOffset(guess, zone);
    t = guess - zoneOffset(t, zone); // second pass settles DST edges
    return new Date(t);
  };
  // Calendar date (y, m, d, weekday) of instant `t` in `zone`.
  const zonedDate = (t, zone) => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "numeric", day: "numeric", weekday: "short" })
        .formatToParts(new Date(t)).map((x) => [x.type, x.value])
    );
    const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { y: +p.year, m: +p.month - 1, d: +p.day, wd };
  };
  const fmt = (date, zone, opts) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, ...opts }).format(date);
  const timeOf = (date, zone) => fmt(date, zone, { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", " ");
  const dayOf = (date, zone) => fmt(date, zone, { weekday: "short", day: "numeric", month: "short" });

  /* --- build the list of bookable days and slots --- */
  const buildDays = () => {
    const now = Date.now();
    const earliest = now + BOOKING.minNoticeHours * 3600e3;
    const out = [];
    for (let i = 0; out.length < BOOKING.daysAhead && i < 40; i++) {
      const { y, m, d, wd } = zonedDate(now + i * 86400e3, BOOKING.hostZone);
      if (!BOOKING.days.includes(wd)) continue;
      const slots = [];
      for (let h = BOOKING.firstHour; h <= BOOKING.lastHour; h++) {
        const start = zonedInstant(y, m, d, h, BOOKING.hostZone);
        if (start.getTime() >= earliest) slots.push(start);
      }
      if (slots.length) out.push({ key: `${y}-${m}-${d}`, label: zonedInstant(y, m, d, 12, BOOKING.hostZone), slots });
    }
    return out;
  };

  let days = [];
  let picked = { day: null, slot: null };

  const renderDays = () => {
    $("#bk-days").innerHTML = days
      .map((d, i) => {
        const [wd, rest] = [fmt(d.label, BOOKING.hostZone, { weekday: "short" }), fmt(d.label, BOOKING.hostZone, { day: "numeric", month: "short" })];
        return `<button type="button" class="bk-chip" role="radio" aria-checked="${picked.day === i}" data-day="${i}"><span>${wd}</span><strong>${rest}</strong></button>`;
      })
      .join("");
  };

  const renderSlots = () => {
    const box = $("#bk-slots");
    if (picked.day === null) {
      box.innerHTML = `<p class="bk-hint">Pick a day to see available times.</p>`;
      return;
    }
    box.innerHTML = days[picked.day].slots
      .map((s, i) => {
        const uk = timeOf(s, BOOKING.hostZone);
        const local = timeOf(s, visitorZone);
        const sameZone = uk === local && dayOf(s, visitorZone) === dayOf(s, BOOKING.hostZone);
        return `<button type="button" class="bk-slot" role="radio" aria-checked="${picked.slot === i}" data-slot="${i}">
          <strong>${local}</strong>${sameZone ? "" : `<span>${uk} UK</span>`}</button>`;
      })
      .join("");
  };

  const update = () => {
    const ready = picked.day !== null && picked.slot !== null && $("#bk-name").value.trim();
    $("#bk-confirm").disabled = !ready;
    const s = picked.day !== null && picked.slot !== null ? days[picked.day].slots[picked.slot] : null;
    $("#bk-summary").textContent = s
      ? `${dayOf(s, visitorZone)}, ${timeOf(s, visitorZone)} your time · 60 minutes`
      : "";
  };

  dialog.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-day]");
    const slot = e.target.closest("[data-slot]");
    if (chip) { picked = { day: +chip.dataset.day, slot: null }; renderDays(); renderSlots(); update(); }
    else if (slot) { picked.slot = +slot.dataset.slot; renderSlots(); update(); }
    else if (e.target === dialog || e.target.closest("[data-close]")) close();
  });
  $("#bk-name").addEventListener("input", update);

  $("#bk-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("#bk-confirm").disabled) return;
    const s = days[picked.day].slots[picked.slot];
    const lines = [
      "Hi Abubakar, I'd like to book a 60-minute consultation about my TikTok Shop.",
      "",
      `Date: ${fmt(s, BOOKING.hostZone, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
      `Time: ${timeOf(s, BOOKING.hostZone)} UK time`,
      `(${timeOf(s, BOOKING.ownerZone)} Pakistan time${visitorZone !== BOOKING.hostZone ? `, ${timeOf(s, visitorZone)} my time` : ""})`,
      "",
      `Name: ${$("#bk-name").value.trim()}`,
    ];
    const brand = $("#bk-brand").value.trim();
    const note = $("#bk-note").value.trim();
    if (brand) lines.push(`Brand / shop: ${brand}`);
    if (note) lines.push(`About: ${note}`);
    window.open(`https://wa.me/${BOOKING.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    close();
  });

  const open = () => {
    days = buildDays();
    picked = { day: days.length ? 0 : null, slot: null };
    $("#bk-zone").textContent = visitorZone.replace(/_/g, " ");
    renderDays(); renderSlots(); update();
    dialog.showModal();
    document.documentElement.classList.add("bk-open");
  };
  const close = () => { dialog.close(); };
  dialog.addEventListener("close", () => document.documentElement.classList.remove("bk-open"));

  document.querySelectorAll('[data-link="consultation"]').forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); open(); })
  );
})();
