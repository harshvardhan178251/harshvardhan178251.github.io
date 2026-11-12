/* ============================================================
   Harsh Vardhan — portfolio interactions
   Nav state · mobile menu · typing effect · scroll reveal ·
   interactive particle grid
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scroll state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    const close = () => {
      toggle.classList.remove("is-open");
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  }

  /* ---------- typing effect ---------- */
  const typed = document.getElementById("typed-line");
  if (typed) {
    const phrases = [
      "I build things for the web.",
      "I build AI agents that remember.",
      "I ship full-stack products end to end.",
      "I solve DSA problems in Java.",
    ];

    if (reduceMotion) {
      typed.textContent = phrases[0];
    } else {
      let phrase = 0;
      let char = 0;
      let deleting = false;

      const tick = () => {
        const current = phrases[phrase];
        char += deleting ? -1 : 1;
        typed.textContent = current.slice(0, char);

        let delay = deleting ? 40 : 75;

        if (!deleting && char === current.length) {
          delay = 1800;
          deleting = true;
        } else if (deleting && char === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          delay = 320;
        }
        setTimeout(tick, delay);
      };

      setTimeout(tick, 700);
    }
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- scroll progress ---------- */
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (cursor && ring && finePointer && !reduceMotion) {
    let rx = 0, ry = 0, tx = 0, ty = 0;

    window.addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      cursor.classList.add("is-on");
      ring.classList.add("is-on");
    }, { passive: true });

    // The ring lags behind the dot — cheap easing, no library.
    const follow = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);

    document.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-on");
      ring.classList.remove("is-on");
    });

    const hoverables = "a, button, .chip, .counter, [data-tilt]";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(hoverables)) ring.classList.add("is-hover");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(hoverables)) ring.classList.remove("is-hover");
    });
  }

  /* ---------- animated counters ---------- */
  const counterBox = document.getElementById("counters");
  if (counterBox) {
    const nums = counterBox.querySelectorAll("[data-count]");

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (reduceMotion) { el.textContent = String(target); return; }

      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nums.forEach(animate);
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(counterBox);
    }
  }

  /* ---------- active section dots ---------- */
  const dotLinks = Array.from(document.querySelectorAll(".dots a"));
  if (dotLinks.length && "IntersectionObserver" in window) {
    const sections = dotLinks
      .map((a) => document.getElementById(a.dataset.dot))
      .filter(Boolean);

    const setActive = (id) => {
      dotLinks.forEach((a) =>
        a.classList.toggle("is-active", a.dataset.dot === id)
      );
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach((s) => io.observe(s));
  }

  /* ---------- 3D tilt on cards ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-6px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- particle grid ---------- */
  const canvas = document.getElementById("grid-canvas");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let width, height, dots, raf;

    const GAP = 34;
    const LINK_DIST = 130;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          dots.push({
            x,
            y,
            ox: x,
            oy: y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.7,
          });
        }
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, width, height);
      const time = t * 0.001;

      for (const d of dots) {
        d.x = d.ox + Math.sin(time * d.speed + d.phase) * 4;
        d.y = d.oy + Math.cos(time * d.speed + d.phase) * 4;

        const distFromMouse = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const glow = distFromMouse < 150 ? 0.85 : 0.28;

        ctx.beginPath();
        ctx.arc(d.x, d.y, glow > 0.5 ? 1.7 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle =
          distFromMouse < 150
            ? `rgba(34, 211, 238, ${glow})`
            : `rgba(148, 163, 216, ${glow})`;
        ctx.fill();
      }

      // link nearby dots
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (Math.hypot(a.x - mouse.x, a.y - mouse.y) > 150) continue;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.3 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    }

    const mouse = { x: -999, y: -999 };
    window.addEventListener(
      "pointermove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true }
    );

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });

    // Pause when the tab is hidden — saves battery and CPU.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(frame);
      }
    });

    resize();
    raf = requestAnimationFrame(frame);
  }
})();
