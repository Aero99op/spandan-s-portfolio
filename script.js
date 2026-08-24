/**
 * SPANDAN PRAYAS PATRA — PORTFOLIO INTERACTION ENGINE
 * AI Coder & System Design Architect — Pure Pitch Black & White Typography
 */

const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

// Theme Controller (Pure Pitch Black Dark & Clean Manuscript Light)
const root = document.documentElement;
const savedTheme = localStorage.getItem("spandan-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  root.setAttribute("data-theme", savedTheme);
} else {
  root.setAttribute("data-theme", "dark");
}

$("#themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("spandan-theme", next);
});

// Preloader Sequence
let preloaderDone = false;
function finishPreloader() {
  if (preloaderDone) return;
  preloaderDone = true;
  document.body.classList.add("loaded");
  startTyping();
}
window.addEventListener("load", () => setTimeout(finishPreloader, 800));
setTimeout(finishPreloader, 2800); // Safety fallback

// Custom Manga Ink Cursor
(function initCursor() {
  if (!finePointer || reduceMotion) return;
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    document.body.classList.add("cursor-on");
  });

  document.documentElement.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-on");
  });

  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();

  const hoverables = "a, button, input, textarea, .tilt, .chip, .stat, .interest-card, .skills-card, .lang-card, .project-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) document.body.classList.remove("cursor-hover");
  });
})();

// Elegant Monochrome Particles Canvas
(function initPetals() {
  const canvas = $("#petals");
  if (!canvas || reduceMotion) {
    if (canvas) canvas.remove();
    return;
  }
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    spawn();
  }

  function particleCount() {
    return Math.min(30, Math.floor(W / 45));
  }

  function makeParticle(fromTop) {
    const isPetal = Math.random() > 0.4;
    const size = isPetal ? 5 + Math.random() * 6 : 1.5 + Math.random() * 2.5;
    return {
      isPetal,
      x: Math.random() * W,
      y: fromTop ? -20 : Math.random() * H,
      size,
      vy: isPetal ? 0.4 + Math.random() * 0.8 : -0.25 - Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      swayAmp: isPetal ? 16 + Math.random() * 30 : 8,
      swayFreq: isPetal ? 0.004 + Math.random() * 0.006 : 0.002,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.025,
      alpha: isPetal ? 0.25 + Math.random() * 0.35 : 0.35 + Math.random() * 0.4
    };
  }

  function spawn() {
    particles = Array.from({ length: particleCount() }, () => makeParticle(false));
  }

  function drawParticle(p) {
    const isLight = root.getAttribute("data-theme") === "light";
    ctx.save();
    ctx.translate(p.x + Math.sin(p.phase) * p.swayAmp, p.y);
    ctx.rotate(p.rot);

    if (p.isPetal) {
      ctx.fillStyle = isLight
        ? `rgba(0, 0, 0, ${p.alpha * 0.3})`
        : `rgba(255, 255, 255, ${p.alpha * 0.35})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.6, p.size * 1.2, -p.size * 0.15, p.size, p.size * 0.6);
      ctx.bezierCurveTo(p.size * 0.65, p.size * 1.05, p.size * 0.15, p.size * 0.85, 0, 0);
      ctx.fill();
    } else {
      // Glow Spark / Clean Ember
      ctx.fillStyle = isLight
        ? `rgba(0, 0, 0, ${p.alpha * 0.35})`
        : `rgba(255, 255, 255, ${p.alpha * 0.55})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.vy;
      p.x += p.vx;
      p.phase += p.swayFreq * 16;
      p.rot += p.vr;

      if (p.isPetal) {
        if (p.y > H + 30 || p.x < -80 || p.x > W + 80) particles[i] = makeParticle(true);
      } else {
        if (p.y < -30 || p.x < -40 || p.x > W + 40) {
          particles[i] = makeParticle(false);
          particles[i].y = H + 20;
        }
      }
      drawParticle(p);
    }
    requestAnimationFrame(frame);
  })();

  window.addEventListener("resize", resize);
  resize();
})();

// Role Rotator / Typewriter (Concise & Zero Layout Shift)
const roles = [
  "Intelligent AI Systems",
  "Scalable Architectures",
  "Cloud & DevOps Systems",
  "Autonomous AI Code",
  "Modern Digital Platforms"
];

let typingStarted = false;
function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  const el = $("#typed");
  if (!el || reduceMotion) {
    if (el) el.textContent = roles[0];
    return;
  }
  let roleIdx = 0, charIdx = 0, deleting = false;

  (function tick() {
    const word = roles[roleIdx];
    el.textContent = word.slice(0, charIdx);
    let delay = deleting ? 30 : 65;

    if (!deleting && charIdx === word.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    } else {
      charIdx += deleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  })();
}

// Navbar Scroll Effect & Scrollspy
const navbar = $("#navbar");
const navAnchors = $$(".nav-links a");
const sections = $$("section[id]");
const scrollProgress = $("#scrollProgress");
const backToTop = $("#backToTop");

window.addEventListener("scroll", () => {
  const st = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;

  // Navbar glass blur
  if (st > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  // Scroll progress
  if (scrollProgress && docH > 0) {
    const pct = Math.min(100, Math.max(0, (st / docH) * 100));
    scrollProgress.style.width = pct + "%";
  }

  // Back to top visibility
  if (st > 500) backToTop.classList.add("show");
  else backToTop.classList.remove("show");

  // Scrollspy
  let currentId = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 180;
    const height = sec.offsetHeight;
    if (st >= top && st < top + height) currentId = sec.getAttribute("id");
  });

  navAnchors.forEach((a) => {
    if (a.getAttribute("href") === "#" + currentId) a.classList.add("active");
    else a.classList.remove("active");
  });
}, { passive: true });

// Back To Top Click
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile Hamburger Menu
const hamburger = $("#hamburger");
const navLinks = $("#navLinks");
const navbar = $("#navbar");

function setMenuState(isOpen) {
  navLinks.classList.toggle("open", isOpen);
  hamburger.classList.toggle("open", isOpen);
  navbar.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

hamburger.addEventListener("click", () => {
  const isOpen = !navLinks.classList.contains("open");
  setMenuState(isOpen);
});

$$(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    setMenuState(false);
  });
});

// Scroll Reveal with Intersection Observer
const reveals = $$(".reveal");
if (!reduceMotion && "IntersectionObserver" in window) {
  reveals.forEach((el) => el.classList.add("init"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in-view"));
}

// 3D Card Tilt Physics
if (finePointer && !reduceMotion) {
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / xc;
      const dy = (y - yc) / yc;

      const rotX = -dy * 7;
      const rotY = dx * 7;
      card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Animated Numerical Stats Counters
let counted = false;
const statsSection = $(".stats");
if (statsSection && "IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        $$(".counter").forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          let curr = 0;
          const inc = Math.max(1, Math.ceil(target / 45));
          const step = () => {
            curr += inc;
            if (curr >= target) {
              counter.textContent = target;
            } else {
              counter.textContent = curr;
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        });
      }
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

// Contact Form Handler & Toast
const contactForm = $("#contactForm");
const toast = $("#toast");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;

    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Transmitted!`;
      contactForm.reset();
      showToast();

      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.disabled = false;
      }, 2500);
    }, 900);
  });
}

function showToast(message = "Message dispatched successfully! Spandan will get back to you shortly.") {
  if (!toast) return;
  const msgEl = $("#toastMsg");
  if (msgEl) msgEl.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// Global Copy CLI Command Helper (e.g. pip install enlang)
window.copyCommand = function(cmd, el) {
  if (!navigator.clipboard) {
    const input = document.createElement("textarea");
    input.value = cmd;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  } else {
    navigator.clipboard.writeText(cmd);
  }

  showToast(`Copied to clipboard: "${cmd}" 🚀`);

  if (el) {
    const icon = el.querySelector(".pip-copy-icon");
    if (icon) {
      icon.className = "fa-solid fa-check pip-copy-icon";
      icon.style.color = "#10b981";
      setTimeout(() => {
        icon.className = "fa-regular fa-copy pip-copy-icon";
        icon.style.color = "";
      }, 2000);
    }
  }
};

// Dynamic Footer Year
$("#year").textContent = new Date().getFullYear();
