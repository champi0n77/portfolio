/* ============================================================
   Champion Iwuchukwu — Student Portfolio
   Shared behaviour for every page (js/script.js)

   Contents:
     2. Mobile hamburger menu (open, close, Escape key)
     3. Highlight the current page in the navigation

   Page-specific JavaScript lives in its own file so this one stays
   small: js/planner.js (task manager) and js/contact.js (validation).
   ============================================================ */

/* Wrap everything in an IIFE so our variables stay private and do
   not collide with other scripts on the page. */
(function () {
  "use strict";

  var body = document.body;

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

})();
