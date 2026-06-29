const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(".reveal, .stamp");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (document.body.classList.contains("home-page")) {
  let logoFrame = null;

  const updateHomeLogoMode = () => {
    const progress = Math.min(window.scrollY / 280, 1);
    document.body.style.setProperty("--logo-bg-alpha", (1 - progress).toFixed(3));
    document.body.style.setProperty("--logo-full-opacity", (1 - progress).toFixed(3));
    document.body.style.setProperty("--logo-watermark-opacity", (progress * 0.075).toFixed(3));
    document.body.style.setProperty("--logo-scale", (1 + progress * 0.08).toFixed(3));
    document.body.classList.toggle("logo-watermark", progress >= 0.98);
    logoFrame = null;
  };

  const requestHomeLogoUpdate = () => {
    if (logoFrame) return;
    logoFrame = window.requestAnimationFrame(updateHomeLogoMode);
  };

  updateHomeLogoMode();
  window.addEventListener("scroll", requestHomeLogoUpdate, { passive: true });
}
