/* ==========================================================================
   Ram Gheewala — Portfolio Scripts
   Loaded with `defer`, so the DOM is parsed before this runs.
   ========================================================================== */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ------------------------------------------------------------------
     Data: career roles (source of truth for the timeline section)
     ------------------------------------------------------------------ */
  const ROLES = [
    {
      title: "Junior .NET Developer",
      company: "VSI Infotech LLP",
      period: "Jun 2025 – Present",
      type: "Full-time",
      location: "Surat, Gujarat, India",
      description:
        "Building and maintaining multi-region pay-in / payout gateway services in ASP.NET MVC and ASP.NET Core processing ~50,000+ transactions/day.",
      highlights: [
        "Diagnosed and resolved high-severity production incidents across deposits, callbacks, and refunds, cutting mean resolution time by ~30%.",
        "Designed indexing strategies and optimized stored procedures powering analytics dashboards, reducing report query latency by 40%.",
        "Implemented .NET background services for automated payout-retry and settlement-batch processing with idempotency and failure alerting, removing manual reprocessing.",
      ],
      stack: [
        "ASP.NET Core",
        "ASP.NET MVC",
        "C#",
        "SQL Server",
        "Hangfire",
        "Clean Architecture",
        "Idempotency",
      ],
    },
    {
      title: "ASP.NET Developer",
      company: "Tenacious Techies",
      period: "Jan 2025 – May 2025",
      type: "Full-time",
      location: "Surat, Gujarat, India",
      description:
        "Backend developer on FoodChow, a production food-delivery SaaS platform.",
      highlights: [
        "Integrated Porter, Pidge, and Uber Direct delivery providers behind a unified abstraction layer with real-time order tracking.",
        "Built a unified refund API across Stripe, Razorpay, and RazorpayX.",
        "Rewrote admin reporting queries, cutting execution time from 12s to under 2s.",
      ],
      stack: [
        "ASP.NET Core",
        "SQL Server",
        "Stripe",
        "Razorpay",
        "RazorpayX",
        "REST APIs",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "VSI Infotech LLP",
      period: "Jun 2024 – Dec 2024",
      type: "Internship",
      location: "Surat, Gujarat, India",
      description:
        "Production support and debugging on payment gateway services, driven by structured logs and dashboards.",
      highlights: [
        "Triaged high-severity bugs by querying Serilog logs in Elasticsearch and Grafana dashboards, tracing stack traces and API payloads to isolate root causes.",
        "Reproduced defects in staging and raised them with root-cause analysis, severity, impact, and repro steps.",
      ],
      stack: [
        "ASP.NET Core",
        "ASP.NET MVC",
        "C#",
        "SQL Server",
        "Serilog",
        "Elasticsearch",
        "Grafana",
        "Postman",
      ],
    },
    {
      title: "ASP.NET Core Intern",
      company: "Toshal Infotech",
      period: "Jan 2024 – May 2024",
      type: "Internship",
      location: "Surat, Gujarat, India",
      description:
        "Built RESTful APIs in ASP.NET Core with a focus on data-access performance.",
      highlights: [
        "Built RESTful APIs with ASP.NET Core, PostgreSQL, Redis, and Dapper.",
        "Built a YouTube OAuth 2.0 upload integration.",
        "Optimized data access with stored procedures for a ~20% efficiency gain.",
      ],
      stack: ["ASP.NET Core", "PostgreSQL", "Redis", "Dapper", "OAuth 2.0"],
    },
  ];

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];

  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );

  const refreshIcons = () => {
    if (window.lucide) window.lucide.createIcons();
  };

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  function initYear() {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function initMobileMenu() {
    const btn = $("#mobile-menu-btn");
    const menu = $("#mobile-menu");
    if (!btn || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
    };

    btn.addEventListener("click", () =>
      setOpen(menu.classList.contains("hidden")),
    );

    // Close the menu after choosing a section
    $$("a", menu).forEach((link) =>
      link.addEventListener("click", () => setOpen(false)),
    );
  }

  /* ------------------------------------------------------------------
     Custom cursor
     ------------------------------------------------------------------ */
  function initCursor() {
    const cursor = $("#custom-cursor");
    if (!cursor) return;
    window.addEventListener(
      "mousemove",
      (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      },
      { passive: true },
    );
  }

  /* ------------------------------------------------------------------
     Haptic feedback on supported devices
     ------------------------------------------------------------------ */
  function initHaptics() {
    if (!("vibrate" in navigator)) return;
    $$(".haptic-pulse").forEach((el) =>
      el.addEventListener("click", () => navigator.vibrate(15)),
    );
  }

  /* ------------------------------------------------------------------
     Career timeline
     ------------------------------------------------------------------ */
  function renderRoleSelectors(container) {
    container.innerHTML = ROLES.map(
      (role, i) => `
        <button
          type="button"
          class="role-selector-card glass-card p-6 rounded-2xl cursor-pointer"
          data-role-index="${i}"
          aria-controls="role-detail-panel"
        >
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span class="role-period">${escapeHtml(role.period)}</span>
            <span class="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">${escapeHtml(role.type)}</span>
          </div>
          <h3 class="text-lg font-heading font-bold text-white">${escapeHtml(role.title)}</h3>
          <p class="text-xs text-slate-400 font-mono">${escapeHtml(role.company)} • Surat, India</p>
        </button>`,
    ).join("");
  }

  function renderRoleDetail(panel, role) {
    const highlights = role.highlights
      .map(
        (h) => `
          <li class="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
            <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
            <span>${escapeHtml(h)}</span>
          </li>`,
      )
      .join("");

    const stack = role.stack
      .map((s) => `<span class="chip chip--sm">${escapeHtml(s)}</span>`)
      .join("");

    panel.innerHTML = `
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-400 mb-1">
          <span>${escapeHtml(role.period)}</span>
          <span>${escapeHtml(role.location)}</span>
        </div>
        <h3 class="text-2xl font-heading font-bold text-white">${escapeHtml(role.title)}</h3>
        <p class="text-sm font-mono text-slate-400">${escapeHtml(role.company)}</p>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(role.description)}</p>

      <div class="space-y-3">
        <h4 class="text-xs font-mono uppercase text-cyan-400 tracking-wider">Key Deliverables & Impact</h4>
        <ul class="space-y-2">${highlights}</ul>
      </div>

      <div class="pt-2">
        <h4 class="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">Technologies Used</h4>
        <div class="flex flex-wrap gap-2">${stack}</div>
      </div>`;

    refreshIcons();
  }

  function initTimeline() {
    const list = $("#role-selector-list");
    const panel = $("#role-detail-panel");
    if (!list || !panel) return;

    renderRoleSelectors(list);
    const cards = $$(".role-selector-card", list);

    const selectRole = (index) => {
      cards.forEach((card, i) => {
        const active = i === index;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-pressed", String(active));
        $(".role-period", card).classList.toggle("text-cyan-400", active);
      });

      if (prefersReducedMotion) {
        renderRoleDetail(panel, ROLES[index]);
        return;
      }
      panel.classList.add("is-switching");
      window.setTimeout(() => {
        renderRoleDetail(panel, ROLES[index]);
        panel.classList.remove("is-switching");
      }, 150);
    };

    list.addEventListener("click", (e) => {
      const card = e.target.closest("[data-role-index]");
      if (card) selectRole(Number(card.dataset.roleIndex));
    });

    // Initial render without the fade
    cards[0].classList.add("is-active");
    cards[0].setAttribute("aria-pressed", "true");
    $(".role-period", cards[0]).classList.add("text-cyan-400");
    renderRoleDetail(panel, ROLES[0]);
  }

  /* ------------------------------------------------------------------
     Ambient particle canvas
     ------------------------------------------------------------------ */
  function initParticleCanvas() {
    const canvas = $("#bg-canvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    const LINK_DISTANCE = 120;
    const mouse = { x: null, y: null, radius: 150 };
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Push particles away from the pointer
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 3;
            this.y -= (dy / distance) * force * 3;
          }
        }
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const count = Math.min(Math.floor(window.innerWidth / 15), 80);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const drawLinks = () => {
      ctx.lineWidth = 0.5;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(
            particles[a].x - particles[b].x,
            particles[a].y - particles[b].y,
          );
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - (dist / LINK_DISTANCE) * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLinks();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true },
    );

    resizeCanvas();
    initParticles();
    animate();
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  initYear();
  initMobileMenu();
  initCursor();
  initHaptics();
  initTimeline();
  initParticleCanvas();
  refreshIcons();
})();
