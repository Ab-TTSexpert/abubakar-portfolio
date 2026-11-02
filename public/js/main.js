(() => {
  "use strict";
  const S = window.SITE;
  const doc = document.documentElement;
  doc.classList.remove("no-js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // On Netlify, images go through its image CDN; elsewhere (e.g. GitHub Pages) they load directly.
  const onNetlify = /\.netlify\.app$/.test(location.hostname);
  const cdn = (src, w) =>
    onNetlify ? `/.netlify/images?url=${encodeURIComponent("/" + src.replace(/^\//, ""))}&w=${w}&fm=webp&q=80` : src;

  /* ---------- Render: experience ---------- */
  const expList = $("#experience-list");
  expList.innerHTML = S.experience
    .map((job, i) => {
      const meta = [job.type, job.location].filter(Boolean).map((m) => `<span>${esc(m)}</span>`);
      if (!job.type || !job.location) meta.push(`<span class="is-placeholder">Role details to be added</span>`);
      const company = job.companyUrl
        ? `${esc(job.company)} <a href="${esc(job.companyUrl)}" target="_blank" rel="noopener">(${esc(job.companyLabel || job.companyUrl)})</a>`
        : esc(job.company);
      return `<li class="tl-item">
        <span class="tl-dot" aria-hidden="true"></span>
        <article class="tl-card reveal ${i % 2 ? "reveal--right" : "reveal--left"}">
          <div class="tl-top">
            <span class="tl-period">${esc(job.period)}</span>
            ${job.current ? `<span class="badge-current">Current</span>` : ""}
          </div>
          <h3>${esc(job.title)}</h3>
          <p class="tl-company">${company}</p>
          <div class="tl-meta">${meta.join("")}</div>
          <ul class="tl-points">${job.points.map((p, j) => `<li style="--stagger:${0.2 + j * 0.06}s">${esc(p)}</li>`).join("")}</ul>
        </article>
      </li>`;
    })
    .join("");

  /* ---------- Render: projects ---------- */
  const initials = (name) =>
    name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  $("#projects-grid").innerHTML = S.projects
    .map((p, i) => {
      let media;
      if (p.image) {
        const contain = p.imageFit === "contain";
        const dark = /birdie/i.test(p.image);
        media = `<div class="project__media ${contain ? "project__media--contain" : ""} ${dark ? "project__media--dark" : ""}">
          <img src="${cdn(p.image, 640)}" width="640" height="360" loading="lazy" decoding="async" alt="${esc(p.brand)} brand ${contain ? "logo" : "image"}" />
        </div>`;
      } else {
        media = `<div class="project__media"><div class="initials" role="img" aria-label="${esc(p.brand)} placeholder tile"><span>${initials(p.brand)}</span></div></div>`;
      }
      const amount = `${p.currency}${p.revenue.toLocaleString("en-US")}`;
      return `<article class="project reveal">
        ${media}
        <div class="project__body">
          <div class="project__tags">
            <span class="tag-market">${esc(p.market)}</span>
            <span class="tag-cat">${esc(p.category)}</span>
          </div>
          <p class="project__case">Case ${String(i + 1).padStart(2, "0")}</p>
          <h3>${esc(p.brand)}</h3>
          <div class="rev">
            <p class="rev__label">Reported Monthly Shop Revenue</p>
            <p class="rev__value">~<span data-count="${p.revenue}" data-prefix="${esc(p.currency)}" data-sep="1">${esc(amount)}</span><small> /month</small></p>
            ${p.growth ? `<p class="rev__growth">${esc(p.growth)}<em>Reported for the shop during the period I supported it.</em></p>` : ""}
          </div>
          <div>
            <p class="project__label">My role</p>
            <p class="project__role">${esc(p.role)}</p>
          </div>
          <div>
            <p class="project__label">Key activities</p>
            <ul class="project__acts">${p.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
          </div>
          ${p.link ? `<a class="project__link" href="${esc(p.link)}" target="_blank" rel="noopener">Visit website <span aria-hidden="true">↗</span></a>` : ""}
        </div>
      </article>`;
    })
    .join("");

  /* ---------- Render: pricing ---------- */
  $("#pricing-grid").innerHTML = S.pricing
    .map(
      (plan) => `<article class="plan reveal ${plan.featured ? "plan--featured" : ""}">
        ${plan.badge ? `<span class="plan__badge">${esc(plan.badge)}</span>` : ""}
        <h3>${esc(plan.name)}</h3>
        <p class="plan__desc">${esc(plan.description)}</p>
        <p class="plan__price">${esc(plan.price)}${plan.period ? `<small> ${esc(plan.period)}</small>` : ""}</p>
        <ul class="plan__features">${plan.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn ${plan.featured ? "btn--primary" : "btn--ghost"}" href="${esc(plan.link)}" target="_blank" rel="noopener">${esc(plan.cta)}</a>
      </article>`
    )
    .join("");

  /* ---------- Render: snapshots (with watermark) ---------- */
  const wmMarkup = () => {
    const tile = Array.from({ length: 48 }, () => `<span>${esc(S.watermark)}</span>`).join("");
    return `<div class="wm__tile">${tile}</div><div class="wm__corner">${esc(S.watermark)}</div>`;
  };
  $("#gallery").innerHTML = S.snapshots
    .map(
      (s, i) => `<button type="button" class="shot-btn reveal" data-index="${i}" aria-label="Enlarge: ${esc(s.alt)}">
        <figure class="shot">
          <img src="${cdn(s.src, 800)}" srcset="${cdn(s.src, 480)} 480w, ${cdn(s.src, 800)} 800w" sizes="(max-width: 560px) 100vw, 400px"
               width="${s.w}" height="${s.h}" loading="lazy" decoding="async" alt="${esc(s.alt)}" draggable="false" />
          <div class="wm" aria-hidden="true">${wmMarkup()}</div>
        </figure>
      </button>`
    )
    .join("");


  /* ---------- Render: affiliate management, tools, case study ---------- */
  const stroke = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    chat: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path ${stroke} d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>`,
    users: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle ${stroke} cx="9" cy="8" r="3.2"/><path ${stroke} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle ${stroke} cx="17" cy="9" r="2.6"/><path ${stroke} d="M16 14.3c2.9.2 5 2.4 5 5.7"/></svg>`,
    grid: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect ${stroke} x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect ${stroke} x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect ${stroke} x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect ${stroke} x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>`,
  };
  $("#affiliate-intro").textContent = S.affiliate.intro;
  $("#affiliate-steps").innerHTML = S.affiliate.steps
    .map(
      (st, i) => `<li class="aff-step reveal">
        <span class="aff-step__n" aria-hidden="true">${i + 1}</span>
        <div><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></div>
      </li>`
    )
    .join("");
  $("#channels").innerHTML = S.affiliate.channels
    .map(
      (c) => `<li class="channel"><span class="channel__ico">${icons[c.icon] || ""}</span>
        <div><strong>${esc(c.name)}</strong><span>${esc(c.note)}</span></div></li>`
    )
    .join("");
  $("#tools-grid").innerHTML = S.tools
    .map((t) => {
      const mark = t.logo
        ? `<img class="tool__logo" src="${esc(t.logo)}" alt="${esc(t.name)} logo" width="52" height="52" loading="lazy" />`
        : `<span class="tool__tile" aria-hidden="true">${esc(t.name.charAt(0))}</span>`;
      return `<article class="tool reveal">
        <div class="tool__head">${mark}<div><h3>${esc(t.name)}</h3><p class="tool__role">${esc(t.role)}</p></div></div>
        <p class="project__label">How I use it</p>
        <ul class="project__acts">${t.how.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      </article>`;
    })
    .join("");

  const cs = S.caseStudy;
  const miniStats = (list) =>
    `<div class="mini">${list.map((m) => `<div class="mini__item"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join("")}</div>`;
  const money = (n) => `$${n.toLocaleString("en-US")}`;
  $("#case-study-body").innerHTML = `
    <article class="case__card reveal">
      <div class="project__tags">
        <span class="tag-market">${esc(cs.market)}</span>
        <span class="tag-cat">${esc(cs.category)}</span>
      </div>
      <h3 class="case__title">${esc(cs.title)}</h3>
      <p class="case__intro">${esc(cs.intro)}</p>
      <div class="case__rev">
        <div class="rev">
          <p class="rev__label">Reported Monthly Shop Revenue · ${esc(cs.before.label)}</p>
          <p class="rev__value"><span data-count="${cs.before.value}" data-prefix="$" data-sep="1">${money(cs.before.value)}</span></p>
          <p class="rev__growth">${esc(cs.before.sub)}</p>
        </div>
        <div class="case__mult" aria-hidden="true"><strong>${esc(cs.multiple)}</strong><span>→</span></div>
        <div class="rev rev--after">
          <p class="rev__label">Reported Monthly Shop Revenue · ${esc(cs.after.label)}</p>
          <p class="rev__value"><span data-count="${cs.after.value}" data-prefix="$" data-sep="1">${money(cs.after.value)}</span></p>
          <p class="rev__growth">${esc(cs.after.sub)}</p>
        </div>
      </div>
    </article>
    <div class="stats stats--4">
      ${cs.totals.map((t) => `<article class="stat reveal"><p class="stat__num stat__num--text"><span>${esc(t.value)}</span></p><p class="stat__label">${esc(t.label)}</p></article>`).join("")}
    </div>
    <div class="case__cols">
      <article class="case__panel reveal">
        <h3>What I did</h3>
        <ul class="project__acts">${cs.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      </article>
      <div class="case__results">
        <article class="case__panel reveal">
          <h3>${esc(cs.affiliate.title)} <small>${esc(cs.affiliate.period)}</small></h3>
          ${miniStats(cs.affiliate.stats)}
          <p class="case__fine">${esc(cs.affiliate.note)}</p>
        </article>
        <article class="case__panel reveal">
          <h3>${esc(cs.ads.title)} <small>${esc(cs.ads.period)}</small></h3>
          ${miniStats(cs.ads.stats)}
        </article>
      </div>
    </div>
    <div class="gallery gallery--case" id="case-gallery">
      ${cs.images
        .map(
          (s, i) => `<button type="button" class="shot-btn reveal" data-index="${i}" aria-label="Enlarge: ${esc(s.alt)}">
            <figure class="shot">
              <img src="${cdn(s.src, 800)}" srcset="${cdn(s.src, 480)} 480w, ${cdn(s.src, 800)} 800w" sizes="(max-width: 560px) 100vw, 400px"
                   width="${s.w}" height="${s.h}" loading="lazy" decoding="async" alt="${esc(s.alt)}" draggable="false" />
              <div class="wm" aria-hidden="true">${wmMarkup()}</div>
            </figure>
            <span class="shot-cap">${esc(s.cap)}</span>
          </button>`
        )
        .join("")}
    </div>
    <p class="note reveal">${esc(cs.note)}</p>`;

  /* ---------- Reveal on scroll (staggered per batch) ---------- */
  const markVisible = (el) => el.classList.add("is-visible");
  const reveals = $$(".reveal, .tags");
  $$(".tags li").forEach((li, i) => li.style.setProperty("--stagger", `${i * 0.07}s`));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(markVisible);
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        batch.forEach((el, i) => {
          io.unobserve(el);
          setTimeout(() => markVisible(el), Math.min(i, 6) * 90);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */
  const format = (el, v) => {
    const dec = +el.dataset.decimals || 0;
    const num = el.dataset.sep ? Math.round(v).toLocaleString("en-US") : v.toFixed(dec);
    el.textContent = `${el.dataset.prefix || ""}${num}${el.dataset.suffix || ""}`;
  };
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      format(el, target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counters = $$("[data-count]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          countUp(e.target);
        }),
      { threshold: 0.6 }
    );
    counters.forEach((el) => {
      format(el, 0);
      cio.observe(el);
    });
  }

  /* ---------- Scroll-driven: progress bar, navbar, timeline, back-to-top ---------- */
  const bar = $(".scroll-progress span");
  const nav = $(".nav");
  const toTop = $(".to-top");
  const timeline = $(".timeline");
  const line = $(".timeline__line span");
  const planBtns = $$(".plan .btn");
  // True when a pricing button sits under the fixed back-to-top button (bottom-right corner)
  const coversPlanBtn = () => {
    const top = window.innerHeight - 84, left = doc.clientWidth - 76;
    return planBtns.some((b) => {
      const r = b.getBoundingClientRect();
      return r.bottom > top && r.top < window.innerHeight && r.right > left;
    });
  };
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-scrolled", y > 12);
    toTop.classList.toggle("is-shown", y > 600 && !coversPlanBtn());
    if (!reduceMotion) {
      const r = timeline.getBoundingClientRect();
      const p = (window.innerHeight * 0.7 - r.top) / r.height;
      line.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
    }
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- Active nav link ---------- */
  const links = $$(".nav__links a, .mobile-menu a:not(.btn)");
  const sections = [...new Set(links.map((a) => $(a.getAttribute("href"))).filter(Boolean))];
  if ("IntersectionObserver" in window) {
    const sio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => sio.observe(s));
  }

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  const menu = $("#mobile-menu");
  // Closed by default; a dropdown only (no overlay, no scroll lock, no focus trap).
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  };
  setMenu(false);
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || menu.hidden) return;
    const hadFocus = menu.contains(document.activeElement);
    setMenu(false);
    if (hadFocus) toggle.focus();
  });
  window.matchMedia("(min-width: 721px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbFig = $(".lightbox__figure", lb);
  const lbImg = $("img", lbFig);
  const lbCount = $(".lightbox__count", lb);
  $(".wm", lbFig).innerHTML = wmMarkup();
  let current = 0;
  let lastFocus = null;
  let list = S.snapshots;
  const show = (i) => {
    current = (i + list.length) % list.length;
    const s = list[current];
    lbImg.src = cdn(s.src, 1600);
    lbImg.alt = s.alt;
    lbImg.width = s.w;
    lbImg.height = s.h;
    lbFig.style.setProperty("--ar", String(s.w / s.h));
    lbCount.textContent = `${current + 1} / ${list.length}`;
  };
  const swap = (dir) => {
    if (reduceMotion) return show(current + dir);
    lbFig.classList.add("is-swapping");
    setTimeout(() => { show(current + dir); lbFig.classList.remove("is-swapping"); }, 200);
  };
  const open = (i, l) => {
    lastFocus = document.activeElement;
    list = l || S.snapshots;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => lb.classList.add("is-open"));
    $(".lightbox__close", lb).focus();
  };
  const close = () => {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { lb.hidden = true; }, reduceMotion ? 0 : 350);
    if (lastFocus) lastFocus.focus();
  };
  $("#gallery").addEventListener("click", (e) => {
    const btn = e.target.closest(".shot-btn");
    if (btn) open(+btn.dataset.index, S.snapshots);
  });
  $("#case-gallery").addEventListener("click", (e) => {
    const btn = e.target.closest(".shot-btn");
    if (btn) open(+btn.dataset.index, S.caseStudy.images);
  });
  $(".lightbox__close", lb).addEventListener("click", close);
  $(".lightbox__nav--prev", lb).addEventListener("click", () => swap(-1));
  $(".lightbox__nav--next", lb).addEventListener("click", () => swap(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  lbImg.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") swap(1);
    else if (e.key === "ArrowLeft") swap(-1);
    else if (e.key === "Tab") {
      const f = $$("button", lb);
      const idx = f.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Private visit counter (counts only, no personal data) ----------
     Needs Netlify Functions, so it only runs when the site is hosted on Netlify. */
  if (onNetlify) {
  const statsLink = $(".footer__stats");
  if (statsLink) statsLink.hidden = false;
  const KEY = "ab_visitor";
  let isNew = false;
  try {
    if (!localStorage.getItem(KEY)) { localStorage.setItem(KEY, "1"); isNew = true; }
  } catch {
    // Storage blocked: fall back to a first-party cookie.
    if (!/(^|; )ab_visitor=1/.test(document.cookie)) {
      document.cookie = "ab_visitor=1; max-age=31536000; path=/; SameSite=Lax";
      isNew = /(^|; )ab_visitor=1/.test(document.cookie);
    }
  }
  const payload = JSON.stringify({ newVisitor: isNew });
  if (!(navigator.sendBeacon && navigator.sendBeacon("/api/visit", new Blob([payload], { type: "application/json" })))) {
    fetch("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }
  }
})();
