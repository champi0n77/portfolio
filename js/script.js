/* ============================================================
   Victor Agbo — COS 106 Term Project
   Shared behaviour for every page (js/script.js)

   Contents:
     1. Dark / light theme toggle (remembered in localStorage)
     2. Mobile hamburger menu (open, close, Escape key)
     3. Highlight the current page in the navigation
     4. Fade-in-on-scroll animation (IntersectionObserver)

   Page-specific JavaScript lives in its own file so this one stays
   small: js/planner.js (task manager) and js/contact.js (validation).
   ============================================================ */

/* Wrap everything in an IIFE so our variables stay private and do
   not collide with other scripts on the page. */
(function () {
  "use strict";

  var body = document.body;

  /* ----------------------------------------------------------
     1. THEME TOGGLE
     The saved choice is read from localStorage on load, so the
     theme survives a refresh and carries across pages.
     ---------------------------------------------------------- */
  var THEME_KEY = "victor-portfolio-theme";

  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);

    // Keep the button's accessibility state in sync with the look.
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (err) {
    // localStorage can be blocked (e.g. strict privacy settings);
    // the site still works, it just will not remember the choice.
    savedTheme = null;
  }

  applyTheme(savedTheme === "dark");

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isDark = !body.classList.contains("dark");
      applyTheme(isDark);
      try {
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      } catch (err) {
        /* ignore storage errors */
      }
    });
  });

  /* ----------------------------------------------------------
     2. MOBILE MENU
     Adds/removes the class "menu-open" on <body>; the CSS does
     the sliding. aria-expanded tells screen readers the state.
     ---------------------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menuClose = document.querySelector(".menu-close");
  var overlay = document.querySelector(".mobile-overlay");

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(true);
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", function () {
      setMenu(false);
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      setMenu(false);
    });
  }

  // Close the menu after tapping a link, otherwise it stays open
  // over the page the visitor just navigated to.
  document.querySelectorAll(".mobile-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  /* ----------------------------------------------------------
     3. CURRENT PAGE HIGHLIGHT
     The HTML already marks the current page with aria-current,
     but this keeps the menu correct even if a page is copied.
     It compares the last part of each link's href with the file
     name in the address bar, which also works when index.html is
     opened straight from the folder (file://).
     ---------------------------------------------------------- */
  function currentFileName() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  var thisPage = currentFileName();
  var navLinks = document.querySelectorAll(
    ".nav-list a, .mobile-links a, .footer-nav a"
  );

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href") || "";
    var fileName = href.split("/").pop();

    // Only page links (not anchors or external URLs) take part.
    if (fileName && fileName.indexOf(".html") !== -1) {
      link.classList.toggle("is-active", fileName === thisPage);
    }
  });

  /* ----------------------------------------------------------
     4. FADE-IN ON SCROLL
     Elements are marked with .reveal, then become visible once
     they enter the viewport. If IntersectionObserver is missing,
     everything is shown immediately so nothing is hidden.
     ---------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".hero-text, .hero-photo, .section-head, .bio-text, .facts-card, .info-card, .chip-list"
  );

  if (!("IntersectionObserver" in window)) {
    return;
  }

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
})();
