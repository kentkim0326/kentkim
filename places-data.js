/* 133 Places — 좌표 데이터.
   여기 한 곳만 고치면 지도·목록·집계가 전부 따라온다(app.js 가 세어 쓴다).

   한 줄 형식:
     { en:"Roman name", ko:"한글 이름", lat:00.0000, lng:000.0000,
       video:"https://youtu.be/...",  // 없으면 빈 문자열
       img:"assets/places/파일명.jpg" } // 없으면 빈 문자열 → 사진 자리는 조용히 비워둔다

   ⚠ 좌표는 지명 기준 근사값이다. 실제 작업 지점으로 바꾸면 지도가 정확해진다.
   ⚠ 133 중 아래 목록에 있는 것만 지도에 뜬다. 나머지는 추가되는 대로 이 배열에 넣는다. */

const PLACES_TOTAL = 133;      // 프로젝트 전체 장소 수(계획)
const VIDEOS_TOTAL = 133;      // 영상 기록 편수

const PLACES = [
  { en:"Seongsan Ilchulbong",        ko:"성산일출봉",        lat:33.4580, lng:126.9425, video:"", img:"" },
  { en:"Baekdamsa",                  ko:"백담사",            lat:38.1697, lng:128.3606, video:"", img:"" },
  { en:"Gwongeumseong, Seoraksan",   ko:"권금성",            lat:38.1770, lng:128.4600, video:"", img:"" },
  { en:"Soyanggang Dam",             ko:"소양강댐",          lat:37.9469, lng:127.8125, video:"", img:"" },
  { en:"Homigot",                    ko:"호미곶",            lat:36.0764, lng:129.5686, video:"", img:"" },
  { en:"Uljin — Tower of Freedom",   ko:"울진 자유수호의 탑", lat:36.9930, lng:129.4000, video:"", img:"" },
  { en:"Gyeongpodae",                ko:"경포대",            lat:37.7955, lng:128.8964, video:"", img:"" },
  { en:"Sokcho",                     ko:"속초",              lat:38.2070, lng:128.5918, video:"", img:"" },
  { en:"Donghae",                    ko:"동해",              lat:37.5247, lng:129.1143, video:"", img:"" },
  { en:"Samcheok",                   ko:"삼척",              lat:37.4500, lng:129.1650, video:"", img:"" },
  { en:"Pohang City Hall",           ko:"포항시청",          lat:36.0190, lng:129.3435, video:"", img:"" },
  { en:"Garosu-gil, Seoul",          ko:"가로수길",          lat:37.5209, lng:127.0230, video:"", img:"" }
];
