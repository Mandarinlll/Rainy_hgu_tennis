(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  function getPageName(path) {
    var cleanPath = path.split("#")[0].split("?")[0];
    var pageName = cleanPath.substring(cleanPath.lastIndexOf("/") + 1);

    return pageName || "index.html";
  }

  if (nav) {
    var currentPage = getPageName(window.location.pathname);
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));

    navLinks.forEach(function (link) {
      var linkUrl = new URL(link.getAttribute("href"), window.location.href);
      var linkPage = getPageName(linkUrl.pathname);
      var isCurrentPage = linkPage === currentPage;

      link.classList.toggle("is-current", isCurrentPage);

      if (isCurrentPage) {
        link.setAttribute("aria-current", "page");
        return;
      }

      link.removeAttribute("aria-current");
    });
  }

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

  var backToTopButton = document.createElement("button");

  backToTopButton.className = "back-to-top";
  backToTopButton.type = "button";
  backToTopButton.setAttribute("aria-label", "トップへ戻る");
  backToTopButton.setAttribute("title", "トップへ戻る");
  backToTopButton.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(backToTopButton);

  function updateBackToTopButton() {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 420);
  }

  backToTopButton.addEventListener("click", function () {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", updateBackToTopButton, { passive: true });
  updateBackToTopButton();

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

  function findLocalIndex(target, parentSelector, childSelector) {
    var parent = target.closest(parentSelector);

    if (!parent) {
      return -1;
    }

    return Array.prototype.indexOf.call(parent.querySelectorAll(childSelector), target);
  }

  function getRevealOrder(target, fallbackIndex) {
    var groups = [
      [".stats-strip", ".stat-card"],
      [".schedule-overview", ".schedule-card"],
      [".timeline", ".timeline-item"],
      [".value-list", "article"],
      [".gallery-grid", ".gallery-card"],
      [".faq-grid", "article"],
      [".cta-section", ".cta-section > *"],
      [".split-section", ".split-section > *"],
      [".album-intro", ".album-intro > *"],
      [".sns-section", ".sns-section > *"]
    ];
    var localIndex = -1;

    groups.some(function (group) {
      localIndex = findLocalIndex(target, group[0], group[1]);
      return localIndex !== -1;
    });

    if (localIndex !== -1) {
      return localIndex;
    }

    return fallbackIndex % 4;
  }

  seenTargets.forEach(function (target, index) {
    target.classList.add("reveal-on-scroll");
    target.style.setProperty("--reveal-delay", getRevealOrder(target, index) * 70 + "ms");
  });

  var statNumbers = Array.prototype.slice.call(document.querySelectorAll(".stat-number"));
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readCountData(element) {
    if (element.countData) {
      return element.countData;
    }

    var originalText = element.getAttribute("data-count-target") || element.textContent.trim();
    var numericMatch = originalText.match(/-?[\d,]+(?:\.\d+)?/);

    if (!numericMatch) {
      return null;
    }

    var numericText = numericMatch[0];
    var decimalPart = numericText.split(".")[1];
    var data = {
      originalText: originalText,
      target: Number(numericText.replace(/,/g, "")),
      prefix: originalText.slice(0, numericMatch.index),
      suffix: originalText.slice(numericMatch.index + numericText.length),
      decimals: decimalPart ? decimalPart.length : 0,
      useGrouping: numericText.indexOf(",") !== -1
    };

    element.countData = data;
    return data;
  }

  function formatCount(value, data) {
    var numberText = data.decimals > 0 ? value.toFixed(data.decimals) : String(Math.round(value));

    if (data.useGrouping) {
      numberText = Number(numberText).toLocaleString("ja-JP", {
        minimumFractionDigits: data.decimals,
        maximumFractionDigits: data.decimals
      });
    }

    return data.prefix + numberText + data.suffix;
  }

  function startCountUp(element) {
    var data = readCountData(element);

    if (!data || element.getAttribute("data-counted") === "true") {
      return;
    }

    element.setAttribute("data-counted", "true");

    if (prefersReducedMotion) {
      element.textContent = data.originalText;
      return;
    }

    var startTime = null;
    var duration = 2000;

    function tick(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatCount(data.target * easedProgress, data);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
        return;
      }

      element.textContent = data.originalText;
    }

    window.requestAnimationFrame(tick);
  }

  statNumbers.forEach(function (element) {
    var data = readCountData(element);

    if (data) {
      element.setAttribute("data-count-target", data.originalText);
      element.textContent = formatCount(0, data);
    }
  });

  if (!("IntersectionObserver" in window)) {
    seenTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    statNumbers.forEach(startCountUp);
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

  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startCountUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -16% 0px",
      threshold: 0.35
    }
  );

  statNumbers.forEach(function (element) {
    countObserver.observe(element);
  });
})();
