/* map.js — 133 Places 지도. Leaflet 이 안 뜨면 조용히 물러나고 아래 목록이 그 역할을 한다. */
(function () {
  "use strict";
  var el = document.getElementById("map");
  if (!el) return;

  if (typeof L === "undefined" || typeof PLACES === "undefined") {
    el.outerHTML = '<div class="map-fallback">The map could not be loaded. The list of locations is below.</div>';
    return;
  }

  var map = L.map(el, { scrollWheelZoom: false }).setView([36.5, 127.9], 7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 18
  }).addTo(map);

  var group = [];
  PLACES.forEach(function (p) {
    var m = L.circleMarker([p.lat, p.lng], {
      radius: 7, color: "#c8a45c", weight: 2, fillColor: "#c8a45c", fillOpacity: 0.75
    }).addTo(map);
    var body = "<strong>" + p.en + "</strong><br>" + p.ko;
    if (p.word) body += '<br><em style="color:#8a6a25">' + p.word + "</em>";
    if (p.video) body += '<br><a href="' + p.video + '" target="_blank" rel="noopener">video →</a>';
    m.bindPopup(body);
    group.push([p.lat, p.lng]);
  });

  if (group.length) map.fitBounds(group, { padding: [40, 40] });
})();
