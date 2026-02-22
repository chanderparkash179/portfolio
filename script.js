const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const navToggle = document.querySelector(".nav-toggle");
const drawer = document.querySelector(".mobile-drawer");
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

navToggle?.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

drawer?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => drawer.classList.remove("open"));
});

const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        active?.classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => observer.observe(section));

if (!prefersReducedMotion) {
  new Typed("#typed", {
    strings: [
      "Java Full-Stack Engineer",
      "Cloud-Native Architect",
      "AI Systems Builder",
      "Fintech and Enterprise Specialist",
      "I Help Startups Scale Fast"
    ],
    typeSpeed: 45,
    backSpeed: 20,
    backDelay: 1400,
    loop: true
  });

  AOS.init({
    duration: 900,
    once: true,
    easing: "ease-out-cubic"
  });

  VANTA.NET({
    el: "#hero-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    color: 0x0ea5e9,
    backgroundColor: 0x0a0f1e,
    points: 10.0,
    spacing: 20.0,
    maxDistance: 22.0
  });
} else {
  const typedEl = document.getElementById("typed");
  if (typedEl) typedEl.textContent = "Java Full-Stack Engineer";
}

const cursorGlow = document.getElementById("cursor-glow");
if (!prefersReducedMotion && cursorGlow) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || "0");
      const isDecimal = target % 1 !== 0;
      let current = 0;
      const duration = 1400;
      const step = (timestamp) => {
        const progress = Math.min(timestamp / duration, 1);
        current = target * progress;
        el.textContent = isDecimal
          ? current.toFixed(2)
          : Math.floor(current).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

const projectContent = {
  "project-sphf": `
    <h3>SPHF — Sindh Peoples Housing for Flood Affected</h3>
    <p>
      Problem: Deliver transparent, secure housing relief at scale after
      catastrophic floods.
    </p>
    <p>
      Built: Modernized a Spring Boot architecture, optimized MSSQL and JPA,
      and stabilized workflows to support 50,000+ families through USAID-funded
      distribution.
    </p>
    <p>
      Impact: Approval times reduced from weeks to days while maintaining data
      integrity and system resilience.
    </p>
  `,
  "project-retail": `
    <h3>Retail Pulse 3.0</h3>
    <p>
      Problem: Retail clients needed real-time intelligence without downtime or
      runaway cloud costs.
    </p>
    <p>
      Built: Cloud-native microservices with Java 21, Spring Boot 3, AWS, and
      PostgreSQL, plus Redis caching for low-latency insights.
    </p>
    <p>
      Impact: High-traffic analytics delivered with resilience, plus guidance as
      an AWS cost optimization consultant for sustained efficiency.
    </p>
  `,
  "project-panasonic-admin": `
    <h3>Panasonic Europe Admin Panel</h3>
    <p>
      Problem: Product data updates were slow and error-prone across multiple
      platforms.
    </p>
    <p>
      Built: Fault-tolerant Angular UI with Spring MVC microservices, enabling
      360-degree user and product management.
    </p>
    <p>
      Impact: Reduced data entry errors by 25% and accelerated catalog updates
      by 40%.
    </p>
  `,
  "project-panasonic-profile": `
    <h3>Profile Center & Lumix Pro</h3>
    <p>
      Problem: Millions of Panasonic customers needed a reliable, unified
      product registration platform.
    </p>
    <p>
      Built: Integrated Spring Boot and Node.js services with Angular frontend,
      improving responsiveness and data reliability.
    </p>
    <p>
      Impact: Scaled to millions of users with faster and more accurate updates.
    </p>
  `,
  "project-bah": `
    <h3>Bank-al-Habib Teller & OBS</h3>
    <p>
      Problem: Core banking modules required higher scalability and deployment
      consistency.
    </p>
    <p>
      Built: Java 17 and Quarkus microservices with Docker, optimized for
      high-volume financial transactions.
    </p>
    <p>
      Impact: Improved reliability and reduced deployment complexity.
    </p>
  `,
  "project-byild": `
    <h3>BYILD LMS</h3>
    <p>
      Problem: A modern LMS needed secure access and fast content delivery.
    </p>
    <p>
      Built: Spring Security + JWT authentication, optimized MySQL queries, and
      AWS-backed infrastructure for stable learning experiences. I stepped in as
      a Java Spring Boot developer for a startup-style LMS to ship quickly.
    </p>
    <p>
      Impact: 30% faster content retrieval and improved course enrollment flow.
    </p>
  `,
  "project-tasdeeq": `
    <h3>Tasdeeq</h3>
    <p>
      Problem: High-volume verification requests needed low-latency responses
      and strong compliance.
    </p>
    <p>
      Built: Spring Boot APIs with PostgreSQL, Redis caching, and Kafka for
      asynchronous processing.
    </p>
    <p>
      Impact: Reliable AML/PEP and verification workflows at scale.
    </p>
  `
};

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-modal");
    modalBody.innerHTML = projectContent[key] || "";
    modal.classList.add("open");
  });
});

modalClose?.addEventListener("click", () => modal.classList.remove("open"));
modal?.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});

const form = document.getElementById("contactForm");
const success = document.querySelector(".form-success");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (success) success.style.display = "none";
  let valid = true;
  form.querySelectorAll("label").forEach((label) => {
    const input = label.querySelector("input, select, textarea");
    if (!input) return;
    const isValid =
      input.checkValidity() && input.value.trim().length > 0;
    label.classList.toggle("invalid", !isValid);
    if (!isValid) valid = false;
  });
  if (valid) {
    success.style.display = "block";
    form.reset();
  }
});

const track = document.querySelector(".testimonial-track");
const prev = document.querySelector(".carousel-btn.prev");
const next = document.querySelector(".carousel-btn.next");
let index = 0;

function updateCarousel(direction = 1) {
  if (!track) return;
  const cards = track.children.length;
  index = (index + direction + cards) % cards;
  track.style.transform = `translateX(-${index * 100}%)`;
}

next?.addEventListener("click", () => updateCarousel(1));
prev?.addEventListener("click", () => updateCarousel(-1));

if (!prefersReducedMotion) {
  setInterval(() => updateCarousel(1), 6000);
}

if (!prefersReducedMotion && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-right", {
    y: 30,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}
