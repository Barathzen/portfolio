/* =========================================================================
   Barath M R — Portfolio · interactions
   Vanilla, no deps. Every flourish gates behind prefers-reduced-motion.
   ========================================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ----- Project dossier data -------------------------------------------- */
  const PROJECTS = {
    weather: {
      tags: "Python · Django · JavaScript · Nov 2023",
      title: "Weather Prediction Web App",
      lede: "A Django-based application providing real-time weather updates globally.",
      facts: [["Role", "Full-Stack Developer"], ["Stack", "Python, Django, JavaScript, REST APIs"], ["Duration", "Nov 2023 – Dec 2023"]],
      text: "<p>Developed a Django-based application providing real-time weather updates globally. Integrated live weather APIs to fetch conditions and forecasts, surfaced through a clean, responsive interface.</p><p>The backend uses a modular architecture with clear separation of concerns, which kept the deploy stable at <strong>95% uptime</strong> throughout testing.</p>",
      link: "#"
    },
    feedback: {
      tags: "Python · Flask · NLP · Sept 2024",
      title: "AI Feedback System",
      lede: "A web-based feedback system utilising NLP techniques to evaluate text and speech inputs.",
      facts: [["Role", "Full-Stack & ML Developer"], ["Stack", "Python, Flask, NLP, Speech-to-Text"], ["Duration", "Sept 2024 – Nov 2024"]],
      text: "<p>Built a web-based feedback system that evaluates free-form text and spoken input using NLP. The pipeline handles both written feedback and speech-to-text transcription, then scores sentiment and quality.</p><p>Achieved <strong>95% accuracy</strong> on sentiment analysis and was designed with real-world deployment in mind — usable, performant, and easy to extend.</p>",
      link: "#"
    }
  };

  /* ----- Section mapping for the Log Pose ------------------------------- */
  const SECTIONS = {
    home:    { label: "Home",      deg: 0   },
    work:    { label: "Projects",  deg: 72  },
    skills:  { label: "Charts",    deg: 144 },
    about:   { label: "About",     deg: 216 },
    contact: { label: "Signal",    deg: 288 }
  };

  /* ----- Typewriter for the hero lede ---------------------------------- */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const lines = [
      "Chasing scalable apps across the Grand Line of data.",
      "Building AI agents that pull their weight in any crew.",
      "Turning raw data into charts a captain can trust."
    ];
    if (prefersReduced) {
      typedEl.textContent = lines[0];
    } else {
      let li = 0, ci = 0, deleting = false;
      const tick = () => {
        const cur = lines[li];
        if (!deleting) {
          ci++;
          typedEl.textContent = cur.slice(0, ci);
          if (ci === cur.length) { deleting = true; return setTimeout(tick, 1900); }
          return setTimeout(tick, 38 + Math.random() * 40);
        }
        ci--;
        typedEl.textContent = cur.slice(0, ci);
        if (ci === 0) { deleting = false; li = (li + 1) % lines.length; return setTimeout(tick, 350); }
        setTimeout(tick, 22);
      };
      setTimeout(tick, 600);
    }
  }

  /* ----- Animated canvas ocean ----------------------------------------- */
  const ocean = document.getElementById("bg-ocean");
  if (ocean && !prefersReduced) {
    const ctx = ocean.getContext("2d");
    let w = 0, h = 0, t = 0, raf = null;
    const resize = () => {
      w = ocean.width = window.innerWidth;
      h = ocean.height = Math.min(window.innerHeight * 0.4, 360);
      ocean.style.bottom = "0";
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const layers = [
      { amp: 12, len: 220, spd: 0.022, col: "rgba(31,93,126,0.18)", off: 0   },
      { amp: 16, len: 320, spd: 0.015, col: "rgba(31,93,126,0.14)", off: 28  },
      { amp: 10, len: 160, spd: 0.030, col: "rgba(47,147,184,0.12)", off: 54 }
    ];
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      layers.forEach(L => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 8) {
          const y = L.off + Math.sin((x + t * L.spd * 60) / L.len * Math.PI * 2) * L.amp
                       + Math.sin((x + t * L.spd * 90) / (L.len * 0.5) * Math.PI * 2) * (L.amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h); ctx.closePath();
        ctx.fillStyle = L.col; ctx.fill();
      });
      t += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf), raf = null; }
      else if (!raf) { raf = requestAnimationFrame(draw); }
    });
  }

  /* ----- Floating gold flecks ------------------------------------------ */
  const flecks = document.getElementById("bg-flecks");
  if (flecks && !prefersReduced) {
    const n = 18;
    let frag = "";
    for (let i = 0; i < n; i++) {
      const left = (i / n) * 100 + (i % 3) * 4;
      const dur = 14 + (i % 5) * 4;
      const delay = (i % 6) * 2.5;
      const size = 3 + (i % 3);
      frag += `<i style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:-${delay}s"></i>`;
    }
    flecks.innerHTML = frag;
  }

  /* ----- Parallax on the sea-chart background -------------------------- */
  const bgMap = document.getElementById("bg-map");
  if (bgMap && !prefersReduced) {
    let pending = false;
    window.addEventListener("scroll", () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        bgMap.style.transform = `translateY(${window.scrollY * 0.06}px)`;
        pending = false;
      });
    }, { passive: true });
  }

  /* ----- Footer year ---------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Nav scroll state + mobile menu --------------------------------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    menu.hidden = true; menu.style.display = "none";
    const sync = () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      menu.hidden = !open; menu.style.display = open ? "flex" : "none";
    };
    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(next));
      sync();
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false"); sync();
    }));
  }

  /* ----- Voyage progress: ship sails the route ------------------------- */
  const ship = document.getElementById("voyage-ship");
  const updateVoyage = () => {
    if (!ship) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    const w = window.innerWidth;
    const span = w * 0.88, start = w * 0.06;
    const x = start + pct * span - 22;
    ship.style.transform = `translateX(${x}px)`;
  };
  updateVoyage();
  window.addEventListener("scroll", updateVoyage, { passive: true });
  window.addEventListener("resize", updateVoyage, { passive: true });

  /* ----- Generic count-up (bounty + stat tiles) ------------------------ */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const runCount = (el, target, suffix, dur = 1700) => {
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    if (prefersReduced) { el.textContent = fmt(target) + (suffix || ""); return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(easeOut(t) * target) + (suffix || "");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const bountyEl = document.querySelector(".bounty");
  if (bountyEl) runCount(bountyEl, parseInt(bountyEl.dataset.bounty || "0", 10), "");

  /* ----- Stat tile count-up on reveal ---------------------------------- */
  const counts = Array.from(document.querySelectorAll(".count"));
  if (!("IntersectionObserver" in window) || prefersReduced) {
    counts.forEach(el => runCount(el, +el.dataset.count, el.dataset.suffix || ""));
  } else {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        runCount(el, +el.dataset.count, el.dataset.suffix || "");
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counts.forEach(el => cio.observe(el));
  }

  /* ----- Radial gauges for skills ------------------------------------- */
  const gauges = Array.from(document.querySelectorAll(".gauge"));
  if (gauges.length) {
    const R = 52, C = 2 * Math.PI * R;
    gauges.forEach(g => {
      const arc = g.querySelector(".gauge-arc");
      arc.style.strokeDasharray = C;
      arc.style.strokeDashoffset = C;
    });
    if (!("IntersectionObserver" in window) || prefersReduced) {
      gauges.forEach(g => {
        const v = +g.dataset.gauge || 0;
        g.querySelector(".gauge-arc").style.strokeDashoffset = C * (1 - v / 100);
        g.querySelector(".gauge-val").textContent = v + "%";
      });
    } else {
      const gio = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const g = e.target, v = +g.dataset.gauge || 0, arc = g.querySelector(".gauge-arc"), val = g.querySelector(".gauge-val");
          arc.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.22,.61,.36,1)";
          arc.style.strokeDashoffset = C * (1 - v / 100);
          if (!prefersReduced && val) {
            const t0 = performance.now();
            const step = (now) => {
              const t = Math.min((now - t0) / 1500, 1);
              val.textContent = Math.round(easeOut(t) * v) + "%";
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          } else if (val) {
            val.textContent = v + "%";
          }
          obs.unobserve(g);
        });
      }, { threshold: 0.4 });
      gauges.forEach(g => gio.observe(g));
    }
  }

  /* ----- Scroll reveal + active section (powers nav + Log Pose) -------- */
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = ["home", "work", "skills", "about", "contact"]
    .map(id => document.getElementById(id)).filter(Boolean);
  const needle = document.getElementById("logpose-needle");
  const labelEl = document.getElementById("logpose-label");
  let activeId = "home";

  const setActive = (id) => {
    activeId = id;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    const section = SECTIONS[id];
    if (section) {
      if (needle) needle.style.transform = `rotate(${section.deg}deg)`;
      if (labelEl) labelEl.textContent = section.label;
    }
  };
  setActive("home");

  if (!("IntersectionObserver" in window) || prefersReduced) {
    reveals.forEach(r => r.classList.add("in"));
  }
  if ("IntersectionObserver" in window) {
    if (!prefersReduced) {
      const rio = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
      reveals.forEach(r => rio.observe(r));
    }
    if (sections.length) {
      const sio = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(s => sio.observe(s));
    }
  }

  /* ----- Custom cursor: skull + lagging compass ring ------------------- */
  if (finePointer && !prefersReduced) {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      const skull = cursor.querySelector(".cursor-skull");
      const ring = cursor.querySelector(".cursor-ring");
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.body.classList.add("cursor-on");
      window.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
        cursor.style.opacity = "1";
        skull.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }, { passive: true });
      const loop = () => {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) rotate(${rx + ry}deg)`;
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      document.querySelectorAll("a, button, .work-card, .armory-card, .bounty-tile, .platform-card, .tl-card").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
      });
      window.addEventListener("mouseleave", () => cursor.style.opacity = "0");
    }
  }

  /* ----- 3D tilt on [data-tilt] cards ----------------------------------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach(el => {
      let frame = null;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          el.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
        });
      });
      el.addEventListener("mouseleave", () => {
        if (frame) cancelAnimationFrame(frame);
        el.style.transform = "";
      });
    });
  }

  /* ----- Magnetic buttons ---------------------------------------------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach(el => {
      el.__magneticStrength = 18;
      let frame = null;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`; });
      });
      el.addEventListener("mouseleave", () => {
        if (frame) cancelAnimationFrame(frame);
        el.style.transform = "";
      });
    });
  }

  /* ----- Click the name to highlight ------------------------------------ */
  const nameEl = document.getElementById("hero-skull");
  if (nameEl) {
    nameEl.style.cursor = "pointer";
    nameEl.title = "Click!";
    nameEl.addEventListener("click", () => {
      if (prefersReduced) return;
      nameEl.classList.add("gomu");
      window.setTimeout(() => nameEl.classList.remove("gomu"), 700);
    });
  }

  /* ----- Dossier modal -------------------------------------------------- */
  const modal = document.getElementById("case-modal");
  if (modal) {
    const back = modal.querySelector(".modal-backdrop");
    const closeEl = modal.querySelector(".modal-close");
    const titleEl = document.getElementById("modal-title");
    const tagsEl = document.getElementById("modal-tags");
    const ledeEl = document.getElementById("modal-lede");
    const factsEl = document.getElementById("modal-facts");
    const textEl = document.getElementById("modal-text");
    const linkEl = document.getElementById("modal-link");
    let lastFocus = null;

    const open = (id) => {
      const p = PROJECTS[id];
      if (!p) return;
      titleEl.textContent = p.title;
      tagsEl.textContent = p.tags;
      ledeEl.textContent = p.lede;
      factsEl.innerHTML = p.facts.map(([k, v]) =>
        `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
      textEl.innerHTML = p.text;
      linkEl.href = p.link;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      lastFocus = document.activeElement;
      closeEl.focus();
      window.addEventListener("keydown", onKey);
    };

    const closeFn = () => {
      modal.hidden = true;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };

    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); closeFn(); }
      if (e.key === "Tab" && !modal.hidden) {
        const f = modal.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const list = Array.from(f);
        const first = list[0], lastItem = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastItem.focus(); }
        else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); first.focus(); }
      }
    };

    document.querySelectorAll(".work-tile").forEach(tile => {
      tile.querySelector(".work-card").addEventListener("click", () => open(tile.dataset.project));
    });
    back.addEventListener("click", closeFn);
    closeEl.addEventListener("click", closeFn);
  }

  /* ----- Smooth-scroll with sticky-nav offset -------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  /* ----- Sea Shanty — background music control ------------------------- */
  const shanty = document.getElementById("shanty");
  const shantyBtn = document.getElementById("shanty-btn");
  const shantyLabel = document.getElementById("shanty-label");
  const bgMusic = document.getElementById("bg-music");

  if (shantyBtn && bgMusic) {
    const STORE = "bmr_shanty";
    const TARGET_VOL = 0.5;
    let userIntent = "play"; // "play" | "pause"

    // Honour a previously-saved preference; first-time visitors default to play.
    try { if (localStorage.getItem(STORE) === "pause") userIntent = "pause"; }
    catch (e) { /* storage unavailable — default to play */ }

    const save = (v) => { try { localStorage.setItem(STORE, v); } catch (e) {} };

    const setPlaying = (on) => {
      shanty.classList.toggle("is-playing", on);
      shantyBtn.setAttribute("aria-pressed", String(on));
      shantyBtn.setAttribute("aria-label", on
        ? "Pause background music — sea shanty"
        : "Play background music — sea shanty");
      if (shantyLabel) shantyLabel.textContent = on ? "Now Playing" : "Sea Shanty";
    };

    // Volume ramp so the shanty swells in / fades out instead of cutting hard.
    const fade = (to, ms, done) => {
      const from = bgMusic.volume, t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / ms, 1);
        bgMusic.volume = from + (to - from) * p;
        if (p < 1) requestAnimationFrame(step);
        else if (done) done();
      };
      requestAnimationFrame(step);
    };

    const playFromSilence = (fadeMs) => {
      bgMusic.volume = 0;
      const p = bgMusic.play();
      const ok = () => { fade(TARGET_VOL, fadeMs); setPlaying(true); };
      if (p && typeof p.then === "function") p.then(ok).catch(() => {});
      else ok();
    };

    const toggleShanty = () => {
      if (bgMusic.paused) {
        userIntent = "play"; save("play");
        playFromSilence(800);
      } else {
        userIntent = "pause"; save("pause");
        setPlaying(false);
        fade(0, 420, () => bgMusic.pause());
      }
    };

    shantyBtn.addEventListener("click", toggleShanty);

    // Start the shanty the instant the page loads — no click needed.
    // Permissive browsers (e.g. Chrome once you've played media on this site
    // before, some mobile setups) begin immediately. Where the browser blocks
    // audible autoplay, fall back to the first interaction so visitors still
    // hear it without hunting for a control. The HTML already ships the
    // correct "paused" appearance, so the UI is honest until sound starts.
    if (userIntent === "play") {
      let fallbackArmed = false;
      const armFallback = () => {
        if (fallbackArmed) return; fallbackArmed = true;
        const kick = (e) => {
          // Let the toggle own its own click so the first tap stays predictable.
          if (e.type === "click" && e.target && e.target.closest &&
              e.target.closest(".shanty")) { cleanup(); return; }
          cleanup();
          if (bgMusic.paused) playFromSilence(1400);
        };
        const cleanup = () => {
          window.removeEventListener("click", kick);
          window.removeEventListener("keydown", kick);
          window.removeEventListener("touchstart", kick);
        };
        window.addEventListener("click", kick);
        window.addEventListener("keydown", kick);
        window.addEventListener("touchstart", kick);
      };

      const tryAutoplay = () => {
        if (!bgMusic.paused) { fade(TARGET_VOL, 1400); setPlaying(true); return; }
        bgMusic.volume = 0;
        const p = bgMusic.play();
        const ok = () => { fade(TARGET_VOL, 1400); setPlaying(true); };
        if (p && typeof p.then === "function") {
          p.then(ok).catch(() => {
            // Rejected while fully loaded → real autoplay block: arm the
            // first-interaction fallback. Still loading? The one-shot
            // `canplay` listener below retries, so don't arm yet.
            if (bgMusic.readyState >= 3) armFallback();
          });
        } else { ok(); }
      };

      tryAutoplay();
      if (bgMusic.readyState < 3) bgMusic.addEventListener("canplay", tryAutoplay, { once: true });
    }

    // Failsafe loop if a browser ever drops the loop attribute.
    bgMusic.addEventListener("ended", () => {
      if (userIntent === "play") { bgMusic.currentTime = 0; playFromSilence(600); }
    });
  }

  /* ----- Konami-ish easter egg: type "OP" to flash the fleet ----------- */
  const flash = () => {
    const banner = document.querySelector(".poster-banner");
    if (!banner) return;
    banner.classList.add("flash");
    setTimeout(() => banner.classList.remove("flash"), 800);
  };
  let buffer = "";
  window.addEventListener("keydown", (e) => {
    if (e.key.length === 1) buffer = (buffer + e.key.toLowerCase()).slice(-2);
    if (buffer === "op") flash();
  });
})();
