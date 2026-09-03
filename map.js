/* map.js — 133 Places 지도. 점 하나가 장소 하나이고, 팝업에 그 자리에서 그린 그림이 모두 들어간다.
   Leaflet 이 안 뜨면 조용히 물러나고 아래 목록이 그 역할을 한다. */
(function () {
  "use strict";
  var el = document.getElementById("map");
  if (!el) return;

  if (typeof L === "undefined" || typeof PLACES === "undefined" || typeof WORKS === "undefined") {
    el.outerHTML = '<div class="map-fallback">The map could not be loaded. The list of locations is below.</div>';
    return;
  }

  var map = L.map(el, { scrollWheelZoom: false }).setView([36.5, 127.9], 7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    maxZoom: 18
  }).addTo(map);

  var bounds = [];
  PLACES.forEach(function (p) {
    var mine = WORKS.filter(function (w) { return w.place === p.id; })
                    .sort(function (a, b) { return a.n - b.n; });

    /* 점 크기가 그 자리에서 그린 그림 수를 말한다 */
    var r = 6 + Math.min(mine.length, 6) * 1.6;
    var m = L.circleMarker([p.lat, p.lng], {
      radius: r, color: "#c8a45c", weight: 1.5, fillColor: "#c8a45c", fillOpacity: 0.45
    }).addTo(map);

    var body = "<strong>" + p.en + "</strong><br><span style='color:#a9a29a'>" + p.ko + "</span>";
    if (mine.length) {
      body += "<ul style='margin:8px 0 0;padding-inline-start:16px'>";
      mine.forEach(function (w) {
        var t = w.word || "—";
        body += "<li>" + (w.video ? "<a href='" + w.video + "' target='_blank' rel='noopener'>" + t + "</a>" : t) +
                (w.en ? " <span style='color:#6f6961'>" + w.en + "</span>" : "") + "</li>";
      });
      body += "</ul>";
    }
    m.bindPopup(body);
    bounds.push([p.lat, p.lng]);
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] });
})();
