/* Theme + Font settings for Zensical sites.
 * Adds a settings button next to the search bar in the header.
 * Clicking it opens a small panel with Theme and Font dropdowns.
 * Click the button again, press Esc, click outside, or press Close to minimise.
 * Choices are remembered in the browser (localStorage).
 * If the header/search bar can't be found, the button floats at the top-right.
 */
(function () {
  // ---- Edit these lists ----------------------------------------------------
  // value must match a [data-user-theme="..."] block in extra.css ("" = default)
  var THEMES = [
    { label: "Default (site theme)", value: "" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Sepia", value: "sepia" },
    { label: "Ocean", value: "ocean" },
    { label: "Forest", value: "forest" },
    { label: "Solarized Dark", value: "solarized" },
    { label: "High Contrast", value: "contrast" }
  ];

  // value = exact Google Fonts family name ("" = default)
  var FONTS = [
    { label: "Default (site font)", value: "" },
    { label: "Inter", value: "Inter" },
    { label: "Roboto", value: "Roboto" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "Lato", value: "Lato" },
    { label: "Poppins", value: "Poppins" },
    { label: "Nunito", value: "Nunito" },
    { label: "Source Sans 3", value: "Source Sans 3" },
    { label: "Merriweather (serif)", value: "Merriweather" },
    { label: "Lora (serif)", value: "Lora" }
  ];
  // --------------------------------------------------------------------------

  var FONT_KEY = "zensical-user-font";
  var THEME_KEY = "zensical-user-theme";
  var root = document.documentElement;
  var themeSelect, fontSelect;

  function get(key) {
    try { return localStorage.getItem(key) || ""; } catch (e) { return ""; }
  }
  function set(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  /* ---------- apply font / theme ---------- */
  function loadFont(name) {
    if (!name) return;
    var id = "gf-" + name.replace(/\s+/g, "-");
    if (document.getElementById(id)) return;
    var link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=" +
      encodeURIComponent(name).replace(/%20/g, "+") +
      ":wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }

  function applyFont(name) {
    if (!name) {
      root.classList.remove("has-user-font");
      root.style.removeProperty("--user-font");
      return;
    }
    loadFont(name);
    root.style.setProperty("--user-font", '"' + name + '"');
    root.classList.add("has-user-font");
  }

  function applyTheme(name) {
    if (!name) root.removeAttribute("data-user-theme");
    else root.setAttribute("data-user-theme", name);
  }

  /* ---------- panel ---------- */
  function makeRow(id, text, items, current, onChange) {
    var row = document.createElement("div");
    row.className = "picker-row";

    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = text;

    var select = document.createElement("select");
    select.id = id;
    items.forEach(function (it) {
      var opt = document.createElement("option");
      opt.value = it.value;
      opt.textContent = it.label;
      select.appendChild(opt);
    });
    select.value = current;
    select.addEventListener("change", function () { onChange(select.value); });

    row.appendChild(label);
    row.appendChild(select);
    return { row: row, select: select };
  }

  function buildPanel() {
    var panel = document.getElementById("settings-panel");
    if (panel) return panel;

    panel = document.createElement("div");
    panel.id = "settings-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Appearance settings");

    var head = document.createElement("div");
    head.className = "picker-head";
    var title = document.createElement("strong");
    title.textContent = "Appearance";
    var close = document.createElement("button");
    close.type = "button";
    close.className = "picker-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "\u00D7";
    close.addEventListener("click", closePanel);
    head.appendChild(title);
    head.appendChild(close);

    var t = makeRow("theme-picker-select", "Theme", THEMES, get(THEME_KEY), function (v) {
      applyTheme(v); set(THEME_KEY, v);
    });
    var f = makeRow("font-picker-select", "Font", FONTS, get(FONT_KEY), function (v) {
      applyFont(v); set(FONT_KEY, v);
    });
    themeSelect = t.select;
    fontSelect = f.select;

    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "picker-reset";
    reset.textContent = "Reset to default";
    reset.addEventListener("click", function () {
      themeSelect.value = ""; fontSelect.value = "";
      applyTheme(""); applyFont("");
      set(THEME_KEY, ""); set(FONT_KEY, "");
    });

    panel.appendChild(head);
    panel.appendChild(t.row);
    panel.appendChild(f.row);
    panel.appendChild(reset);
    document.body.appendChild(panel);
    return panel;
  }

  function positionPanel() {
    var btn = document.getElementById("settings-btn");
    var panel = document.getElementById("settings-panel");
    if (!btn || !panel) return;
    var r = btn.getBoundingClientRect();
    panel.style.top = Math.round(r.bottom + 8) + "px";
    var right = Math.max(8, Math.round(window.innerWidth - r.right));
    panel.style.right = right + "px";
  }

  function openPanel() {
    var panel = buildPanel();
    positionPanel();
    panel.classList.add("open");
    var btn = document.getElementById("settings-btn");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    var panel = document.getElementById("settings-panel");
    if (panel) panel.classList.remove("open");
    var btn = document.getElementById("settings-btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    var panel = document.getElementById("settings-panel");
    if (panel && panel.classList.contains("open")) closePanel();
    else openPanel();
  }

  /* ---------- header button ---------- */
  var ICON =
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line>' +
    '<line x1="4" y1="18" x2="20" y2="18"></line>' +
    '<circle cx="9" cy="6" r="2.2" fill="currentColor"></circle>' +
    '<circle cx="15" cy="12" r="2.2" fill="currentColor"></circle>' +
    '<circle cx="8" cy="18" r="2.2" fill="currentColor"></circle></svg>';

  function findAnchor() {
    return (
      document.querySelector(".md-header .md-search") ||
      document.querySelector('[data-md-component="search"]') ||
      document.querySelector(".md-search")
    );
  }

  function ensureButton() {
    var btn = document.getElementById("settings-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "settings-btn";
      btn.type = "button";
      btn.title = "Theme & font settings";
      btn.setAttribute("aria-label", "Theme and font settings");
      btn.setAttribute("aria-haspopup", "dialog");
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = ICON;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        togglePanel();
      });
    }

    var anchor = findAnchor();
    if (anchor && anchor.parentNode) {
      if (btn.parentNode !== anchor.parentNode || btn.previousSibling !== anchor) {
        anchor.parentNode.insertBefore(btn, anchor.nextSibling);
      }
      btn.classList.remove("floating");
    } else if (btn.parentNode !== document.body) {
      document.body.appendChild(btn);
      btn.classList.add("floating");
    }
  }

  /* ---------- init ---------- */
  applyTheme(get(THEME_KEY));
  applyFont(get(FONT_KEY));

  function init() {
    ensureButton();
    buildPanel();

    document.addEventListener("click", function (e) {
      var panel = document.getElementById("settings-panel");
      var btn = document.getElementById("settings-btn");
      if (!panel || !panel.classList.contains("open")) return;
      if (panel.contains(e.target) || (btn && btn.contains(e.target))) return;
      closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
    window.addEventListener("resize", positionPanel);

    // Re-attach the button if the header is re-rendered (e.g. instant navigation)
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        ensureButton();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
