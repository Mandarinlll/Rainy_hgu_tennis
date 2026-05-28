(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var copyButton = document.querySelector("[data-copy-text]");
  var feedback = document.querySelector(".copy-feedback");

  if (copyButton && feedback) {
    copyButton.addEventListener("click", function () {
      var text = copyButton.getAttribute("data-copy-text");

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          feedback.textContent = "コピーしました: " + text;
        });
        return;
      }

      feedback.textContent = "サークル名: " + text;
    });
  }

  var revealSelectors = [
    ".hero-copy",
    ".page-hero > div",
    ".stat-card",
    ".split-section > *",
    ".philosophy-band .band-copy",
    ".value-list article",
    ".section-heading",
    ".schedule-card",
    ".timeline-item",
    ".table-wrap",
    ".album-intro > *",
    ".gallery-card",
    ".sns-section > *",
    ".faq-grid article",
    ".cta-section > *"
  ];
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(revealSelectors.join(","))
  );
  var seenTargets = [];

  revealTargets.forEach(function (target) {
    if (seenTargets.indexOf(target) === -1) {
      seenTargets.push(target);
    }
  });

  seenTargets.forEach(function (target, index) {
    target.classList.add("reveal-on-scroll");
    target.style.setProperty("--reveal-delay", (index % 6) * 70 + "ms");
  });

  if (!("IntersectionObserver" in window)) {
    seenTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    }
  );

  seenTargets.forEach(function (target) {
    revealObserver.observe(target);
  });
})();
