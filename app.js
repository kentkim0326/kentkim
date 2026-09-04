/* app.js — 언어 전환 · 이미지 지연 삽입 · 133 Places 렌더.

   1) 영어가 HTML 안에 그대로 있다. JS 는 한국어로 "바꾸기만" 한다.
      자바스크립트가 죽어도, 크롤러가 실행을 안 해도 영문 전문이 남는다.
   2) 없는 요소를 만져도 죽지 않는다.
   3) 이미지는 파일이 실제로 있을 때만 들어간다. 히어로 사진이 없으면
      히어로가 글씨만으로 서도록 .no-image 로 바뀐다 — 빈 회색 사각형을 보이지 않는다. */

(function () {
  "use strict";

  var LS_KEY = "kentkim.lang";
  /* 언어 지도. 영어는 HTML 안에 원문이 있으므로 지도가 필요 없다.
     지도에 키가 없으면 그 자리에 영어가 그대로 남는다 — 렌더가 깨지지 않는다. */
  var MAPS = {
    ko: (typeof KO === "object" && KO) || null,
    zh: (typeof ZH === "object" && ZH) || null,
    ja: (typeof JA === "object" && JA) || null
  };
  var LANGS = ["en", "ko", "zh", "ja"];

  function detect() {
    try {
      var saved = localStorage.getItem(LS_KEY);
      if (LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var n = (navigator.language || "en").toLowerCase();
    if (n.indexOf("ko") === 0) return "ko";
    if (n.indexOf("zh") === 0) return "zh";
    if (n.indexOf("ja") === 0) return "ja";
    return "en";
  }

  function apply(lang) {
    var nodes = document.querySelectorAll("[data-t]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], key = el.getAttribute("data-t");
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var map = MAPS[lang];
      el.innerHTML = map && map[key] ? map[key] : el.dataset.en;
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
          if (isHero) tryHeroVideo(plate, src);
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

  /* 히어로 영상 — 파일이 있으면 사진 위에 얹고, 없으면 사진이 그대로 남는다.
     · 소리 없이 자동재생하려면 muted + playsinline 이 반드시 있어야 한다(모바일 정책).
     · 사진을 poster 로 깔아 두어 영상이 뜨기 전에도 빈 화면이 보이지 않는다.
     · 「동작 줄이기」를 켠 사용자에게는 영상을 넣지 않는다.
     · 데이터 절약 모드·2G/3G 는 받지 않는다. 화면 크기로는 막지 않는다 —
       모바일에서도 영상을 보여 준다(대표님 결정, 2026-09-03).
     ※ 사파리는 Network Information API 가 없어 셀룰러인지 알 수 없다. 그래서
       모바일 데이터 절약은 「가벼운 파일을 따로 주는」 쪽으로 푼다(data-video-mobile). */
  function shouldSkipHeroVideo() {
    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    } catch (e) {}
    try {
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        if (conn.saveData) return true;
        if (conn.effectiveType && /2g|slow-2g|3g/.test(conn.effectiveType)) return true;
      }
    } catch (e) {}
    return false;
  }

  /* 좁은 화면에서는 가벼운 파일이 있으면 그것을 쓴다.
     data-video-mobile 이 없으면 그냥 원본을 쓴다 — 파일을 올리기 전에도 동작한다. */
  function heroVideoSrc(plate) {
    var small = plate.getAttribute("data-video-mobile");
    if (small) {
      try {
        if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) return small;
      } catch (e) {}
    }
    return plate.getAttribute("data-video");
  }

  function tryHeroVideo(plate, posterSrc) {
    var src = heroVideoSrc(plate);
    if (!src) return;
    if (shouldSkipHeroVideo()) return;

    /* 히어로 영상은 14MB 다. 사진만으로도 화면이 서므로, 받아서 손해인 곳에서는 아예 받지 않는다.
       조건에 걸리면 poster 로 쓰던 사진이 그대로 남는다 — 페이지는 달라지지 않는다. */
    try {
      if (window.innerWidth < 900) return;                       /* 모바일·태블릿 */
      var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (c) {
        if (c.saveData) return;                                  /* 데이터 절약 모드 */
        if (/^(slow-)?2g$|^3g$/.test(c.effectiveType || "")) return;  /* 느린 회선 */
      }
    } catch (e) {}

    var v = document.createElement("video");
    v.muted = true; v.defaultMuted = true;
    v.autoplay = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.preload = "auto";
    v.poster = posterSrc;
    v.className = "hero-video";

    /* DOM 에 먼저 붙인다 — 떼어 놓은 <video> 는 사파리에서 로드가 시작되지 않는 일이 있다.
       poster 가 뒤에 깔린 사진과 같은 그림이라, 붙여 두어도 재생 전에는 티가 나지 않는다. */
    plate.appendChild(v);
    v.src = src;

    /* loadeddata 를 기다리지 않고 바로 play() 한다 — iOS 사파리는 preload="auto" 를
       무시하고 재생을 시도할 때까지 받지 않는다. 기다리면 그 이벤트가 영영 안 온다.
       버퍼링 동안에는 뒤에 깔린 사진이 그대로 보인다. */
    var pr = v.play();
    if (pr && pr.catch) pr.catch(function () { v.remove(); });   /* 자동재생이 막히면 사진으로 남는다 */
    v.addEventListener("error", function () { v.remove(); });
  }

  /* 133 Places — 장소별로 묶어서 그린다. 「133」은 장소가 아니라 그림 수다. */
  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderPlaces() {
    if (typeof WORKS === "undefined" || typeof PLACES === "undefined") return;
    var lang = window.currentLang;

    var list = document.getElementById("placeList");
    if (list) {
      var html = "";
      for (var i = 0; i < PLACES.length; i++) {
        var pl = PLACES[i];
        var mine = WORKS.filter(function (w) { return w.place === pl.id; })
                        .sort(function (a, b) { return (a.n || 0) - (b.n || 0); });
        if (!mine.length) continue;

        html += '<section class="place-group">';
        html += '<h3 class="pg-name">' + esc(lang === "ko" ? pl.ko : pl.en) +
                '<span class="pg-alt">' + esc(lang === "ko" ? pl.en : pl.ko) + "</span></h3>";
        html += '<ol class="pg-works">';
        for (var j = 0; j < mine.length; j++) {
          var w = mine[j];
          var label = w.word
            ? '<span class="w-word">' + esc(w.word) + "</span>" +
              (w.en ? '<span class="w-en">' + esc(w.en) + "</span>" : "")
            : '<span class="w-word w-none">' + (lang === "ko" ? "낱말 확인 중" : "word to be confirmed") + "</span>";
          /* 번호를 아직 모르는 줄은 그린 날짜로 대신한다 — 목록을 받으면 번호로 바뀐다 */
          var mark = w.n ? String(w.n) : (w.date || "").slice(5).replace("-", ".");
          html += '<li><span class="w-n">' + mark + "</span>" +
                  (w.video
                    ? '<a href="' + esc(w.video) + '" target="_blank" rel="noopener">' + label + '<span class="w-play">film</span></a>'
                    : label) +
                  "</li>";
        }
        html += "</ol></section>";
      }
      list.innerHTML = html;
    }

    var works = document.getElementById("placeWorks");
    if (works) {
      var shown = WORKS.filter(function (w) { return w.img; });
      var g = "";
      for (var k = 0; k < shown.length; k++) {
        var q = shown[k];
        var at = PLACES.filter(function (p) { return p.id === q.place; })[0] || { en: "", ko: "" };
        g += '<figure><div class="frame landscape" data-img="' + esc(q.img) + '"></div>' +
             '<figcaption><span class="t">' + esc(q.word || "") + "</span>" +
             '<span class="m">' + esc(lang === "ko" ? at.ko : at.en) + " · no. " + q.n + "</span></figcaption></figure>";
      }
      works.innerHTML = g;
      var sec = document.getElementById("placeWorksSection");
      if (sec) sec.hidden = !g;
      if (g) hydrateImages(works);
    }

    var el;
    if ((el = document.getElementById("cTotal")) && typeof WORKS_TOTAL !== "undefined") el.textContent = String(WORKS_TOTAL);
    if ((el = document.getElementById("cFilms"))) el.textContent = String(WORKS.filter(function (w) { return w.video; }).length);
    if ((el = document.getElementById("cPlaces"))) el.textContent = String(PLACES.length);
  }

  /* 문의 폼 — 주소를 화면·HTML 어디에도 그대로 적어두지 않는다. 메일 앱을 열어
     받는 사람·제목·본문을 채워 주는 역할까지만 하고, 실제 전송은 방문자의 메일 앱이 한다. */
  function setupContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var addr = ["kentkim", "gmail.com"].join("@");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var org = form.org.value.trim();
      var msg = form.msg.value.trim();
      var subject = "Enquiry from " + (name || "the website");
      var body = msg + "\n\n" + name + (org ? "\n" + org : "");
      window.location.href = "mailto:" + addr +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  function boot() {
    apply(window.currentLang);
    hydrateImages(document);
    renderPlaces();
    setupContactForm();
    var yr = document.getElementById("yr");
    if (yr) yr.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("langchange", renderPlaces);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
