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
})();
