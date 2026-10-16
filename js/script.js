(function () {
  "use strict";

  var menuToggle = document.getElementById("menuToggle");
  var toc = document.getElementById("toc");
  var backToTop = document.getElementById("backToTop");
  var tocLinks = toc ? Array.prototype.slice.call(toc.querySelectorAll("a")) : [];
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  if (menuToggle && toc) {
    menuToggle.addEventListener("click", function () {
      var isOpen = toc.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    tocLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        toc.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if ("IntersectionObserver" in window && sections.length && tocLinks.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = toc.querySelector('a[href="#' + entry.target.id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
