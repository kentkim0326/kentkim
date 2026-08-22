/* app.js — 언어 전환 · 이미지 지연 삽입 · 133 Places 렌더.

   1) 영어가 HTML 안에 그대로 있다. JS 는 한국어로 "바꾸기만" 한다.
      자바스크립트가 죽어도, 크롤러가 실행을 안 해도 영문 전문이 남는다.
   2) 없는 요소를 만져도 죽지 않는다.
   3) 이미지는 파일이 실제로 있을 때만 들어간다. 히어로 사진이 없으면
      히어로가 글씨만으로 서도록 .no-image 로 바뀐다 — 빈 회색 사각형을 보이지 않는다. */

(function () {
  "use strict";

  var LS_KEY = "kentkim.lang";
  var T = (typeof KO === "object" && KO) || {};

  function detect() {
    try {
      var saved = localStorage.getItem(LS_KEY);
      if (saved === "ko" || saved === "en") return saved;
    } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
  }

  function apply(lang) {
    var nodes = document.querySelectorAll("[data-t]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], key = el.getAttribute("data-t");
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = lang === "ko" && T[key] ? T[key] : el.dataset.en;
    }
    document.documentElement.lang = lang;
    var btns = document.querySelectorAll(".lang-toggle button");
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-lang") === lang ? "true" : "false");
    }
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  window.currentLang = detect();

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest(".lang-toggle button") : null;
    if (!b) return;
    window.currentLang = b.getAttribute("data-lang");
    apply(window.currentLang);
  });

  /* 이미지: 있으면 넣고, 없으면 자리표시를 남긴다 */
  function hydrateImages(root) {
    var plates = (root || document).querySelectorAll("[data-img]");
    for (var i = 0; i < plates.length; i++) {
      (function (plate) {
        var src = plate.getAttribute("data-img");
        if (!src) return;
        var isHero = plate.hasAttribute("data-hero");
        var probe = new Image();
        probe.onload = function () {
          plate.innerHTML = "";
          var img = document.createElement("img");
          img.src = src;
          if (!isHero) img.loading = "lazy";
          img.alt = plate.getAttribute("data-alt") || "";
          plate.appendChild(img);
        };
        probe.onerror = function () {
          if (isHero) {
            var hero = plate.closest(".hero");
            if (hero) hero.classList.add("no-image");
            plate.remove();
          }
        };
        probe.src = src;
      })(plates[i]);
    }
  }

  /* 133 Places */
  function renderPlaces() {
    if (typeof PLACES === "undefined") return;
    var lang = window.currentLang;

    var list = document.getElementById("placeList");
    if (list) {
      var html = "";
      for (var i = 0; i < PLACES.length; i++) {
        var p = PLACES[i];
        var line = (lang === "ko" ? p.ko : p.en) + '<span class="kr">' + (lang === "ko" ? p.en : p.ko) + "</span>";
        html += "<li>" + (p.video ? '<a href="' + p.video + '" target="_blank" rel="noopener">' + line + "</a>" : line) + "</li>";
      }
      list.innerHTML = html;
    }

    var works = document.getElementById("placeWorks");
    if (works) {
      var w = "";
      for (var k = 0; k < PLACES.length; k++) {
        var q = PLACES[k];
        if (!q.img) continue;
        w += '<figure><div class="frame landscape" data-img="' + q.img + '"></div>' +
             '<figcaption><span class="t">' + (lang === "ko" ? q.ko : q.en) + "</span>" +
             '<span class="m">' + (lang === "ko" ? q.en : q.ko) + "</span></figcaption></figure>";
      }
      works.innerHTML = w;
      var sec = document.getElementById("placeWorksSection");
      if (sec) sec.hidden = !w;          /* 사진이 하나도 없으면 섹션째 감춘다 */
      if (w) hydrateImages(works);
    }

    var el;
    if ((el = document.getElementById("cMapped"))) el.textContent = String(PLACES.length);
    if ((el = document.getElementById("cTotal")) && typeof PLACES_TOTAL !== "undefined") el.textContent = String(PLACES_TOTAL);
    if ((el = document.getElementById("cVideo")) && typeof VIDEOS_TOTAL !== "undefined") el.textContent = String(VIDEOS_TOTAL);
  }

  function boot() {
    apply(window.currentLang);
    hydrateImages(document);
    renderPlaces();
    var yr = document.getElementById("yr");
    if (yr) yr.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("langchange", renderPlaces);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
