/* DOM AUTO — interactions légères, sans dépendance */
(function () {
  "use strict";

  /* Header : ombre au scroll */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Menu mobile */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-locked", open);
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  /* Horaires : jour courant + ouvert / fermé (heure de Paris) */
  var hours = [];
  try { hours = JSON.parse(document.body.getAttribute("data-hours") || "[]"); } catch (e) {}
  var parisNow = function () {
    var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var days = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
    return { day: days[get("weekday")], minutes: Number(get("hour")) % 24 * 60 + Number(get("minute")) };
  };
  var toMin = function (t) { var p = t.split(":"); return Number(p[0]) * 60 + Number(p[1]); };
  var fmt = function (t) { var p = t.split(":"); return Number(p[0]) + "h" + (p[1] === "00" ? "" : p[1]); };
  if (hours.length) {
    var now = parisNow();
    document.querySelectorAll("[data-hours-table] tr[data-day='" + now.day + "']").forEach(function (tr) { tr.classList.add("is-today"); });
    var today = hours.find(function (d) { return d.d === now.day; }) || { s: [] };
    var open = today.s.find(function (s) { return now.minutes >= toMin(s[0]) && now.minutes < toMin(s[1]); });
    var text;
    if (open) {
      text = "Ouvert, jusqu'à " + fmt(open[1]);
    } else {
      var later = today.s.find(function (s) { return now.minutes < toMin(s[0]); });
      if (later) text = "Fermé, réouverture à " + fmt(later[0]);
      else {
        var names = ["", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        for (var i = 1; i <= 7; i++) {
          var d = ((now.day - 1 + i) % 7) + 1;
          var next = hours.find(function (h) { return h.d === d; });
          if (next && next.s.length) { text = "Fermé, réouverture " + (i === 1 ? "demain" : names[d]) + " à " + fmt(next.s[0][0]); break; }
        }
      }
    }
    document.querySelectorAll("[data-open-status]").forEach(function (el) {
      el.classList.add(open ? "is-open" : "is-closed");
      el.querySelector("[data-open-text]").textContent = text || "Fermé";
      el.hidden = false;
    });
  }

  /* Carte : chargée uniquement au clic */
  document.querySelectorAll("[data-map-load]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var map = btn.closest("[data-map]");
      var iframe = document.createElement("iframe");
      iframe.src = map.getAttribute("data-src");
      iframe.title = "Carte Google Maps : emplacement du garage DOM AUTO à Léognan";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      map.appendChild(iframe);
      map.querySelector(".map-facade").hidden = true;
    });
  });

  /* Carousel avis (défilement natif + boutons) */
  var track = document.querySelector("[data-carousel]");
  if (track) {
    var step = function (dir) {
      var card = track.querySelector("li");
      var w = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
      track.scrollBy({ left: dir * w, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    var prev = document.querySelector("[data-carousel-prev]");
    var nextBtn = document.querySelector("[data-carousel-next]");
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });
  }

  /* Formulaire rendez-vous / devis */
  var form = document.querySelector("[data-form]");
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var pre = params.get("prestation");
    var select = form.querySelector("#prestation");
    if (pre && select) {
      var map = { "controle-technique": "autre", distribution: "mecanique", embrayage: "mecanique", climatisation: "autre", echappement: "mecanique", autres: "autre" };
      var val = select.querySelector("option[value='" + pre + "']") ? pre : map[pre];
      if (val) select.value = val;
    }
    var status = form.querySelector("[data-form-status]");
    var setError = function (field, msg) {
      var err = form.querySelector("#" + field.id + "-error");
      if (msg) {
        field.setAttribute("aria-invalid", "true");
        var desc = (field.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== field.id + "-error"; });
        desc.push(field.id + "-error");
        field.setAttribute("aria-describedby", desc.join(" "));
        if (err) { err.textContent = msg; err.hidden = false; }
      } else {
        field.removeAttribute("aria-invalid");
        if (err) { err.textContent = ""; err.hidden = true; }
      }
    };
    var validate = function () {
      var firstInvalid = null;
      var check = function (id, test, msg) {
        var f = form.querySelector("#" + id);
        if (!f) return;
        var ok = test(f);
        setError(f, ok ? "" : msg);
        if (!ok && !firstInvalid) firstInvalid = f;
      };
      check("nom", function (f) { return f.value.trim().length >= 2; }, "Indiquez votre nom.");
      check("telephone", function (f) { return f.value.replace(/[^\d+]/g, "").length >= 10; }, "Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78.");
      check("email", function (f) { return !f.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value); }, "Vérifiez l'adresse email, par exemple nom@exemple.fr.");
      check("message", function (f) { return f.value.trim().length >= 5; }, "Décrivez votre besoin en quelques mots.");
      check("consentement", function (f) { return f.checked; }, "Cochez cette case pour que nous puissions vous répondre.");
      return firstInvalid;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status"; status.textContent = "";
      var invalid = validate();
      if (invalid) { invalid.focus(); return; }
      if (form.querySelector("#site_web").value) return; // robot
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== "site_web") data[k] = v; });
      data.consentement = true;
      data.source = "site-dom-auto";
      data.page = window.location.href;
      data.date = new Date().toISOString();
      var endpoint = form.getAttribute("data-endpoint");
      var phone = document.querySelector(".header-phone span");
      var phoneText = phone ? phone.textContent : "";
      if (!endpoint) {
        status.className = "form-status is-error";
        status.textContent = "L'envoi en ligne n'est pas encore activé. Appelez le garage au " + phoneText + ", du lundi au vendredi.";
        status.focus();
        return;
      }
      var btn = form.querySelector("button[type='submit']");
      btn.disabled = true;
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          form.reset();
          status.className = "form-status is-success";
          status.textContent = "Demande envoyée. L'équipe DOM AUTO vous rappelle pour organiser votre passage au garage.";
          status.focus();
        })
        .catch(function () {
          status.className = "form-status is-error";
          status.textContent = "La demande n'est pas partie. Réessayez dans un instant ou appelez le garage au " + phoneText + ".";
          status.focus();
        })
        .finally(function () { btn.disabled = false; });
    });
    form.querySelectorAll("input, textarea").forEach(function (f) {
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") setError(f, ""); });
    });
  }
})();
