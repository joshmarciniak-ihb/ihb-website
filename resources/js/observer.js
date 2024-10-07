const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        if (target.matches(".hero-title") || target.matches(".hero-links")) {
          if (target.getAttribute("aria-hidden") !== "true") {
            target.classList.add("animate");
          }
        } else {
          target.classList.add("animate");
        }
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0, 0.1, 1],
  }
);

const animateTags = [
  ".content-title",
  ".title-divider",
  ".content-desc",
  ".content-link",
  ".content-img",
  ".content-divider",
  ".card",
  ".hero-title",
  ".hero-desc",
  ".hero-links",
  ".left-card",
  ".right-card",
];

const tags = document.querySelectorAll(animateTags);

tags.forEach((tag) => {
  observer.observe(tag);
});
