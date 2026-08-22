/* 133 Places — 장소·그린 낱말·좌표.
   여기 한 곳만 고치면 지도·목록·집계가 전부 따라온다(app.js 가 세어 쓴다).

   한 줄 형식:
     { en:"Roman name", ko:"한글 이름",
       word:"그 자리에서 그린 낱말(영문)",  wordKo:"그 낱말의 한글",
       lat:00.0000, lng:000.0000,
       video:"https://youtu.be/...",        // 없으면 빈 문자열
       img:"assets/places/파일명.jpg" }     // 없으면 빈 문자열 → 사진 자리는 조용히 비워둔다

   ⚠ 낱말(word)의 출처는 「KENT KIM — ARTIST MATERIALS (EN)」(2026-08-20) 이다.
     그 문서에 적힌 것만 넣었다. **없는 것은 비워 둔다 — 지어내지 않는다.**
     · 원문의 「Gyeongpodae, Sokcho, Donghae, Samcheok, Pohang City Hall — Steel」 은
       Steel 이 다섯 곳 전부인지 포항시청 하나인지 문장만으로는 갈린다.
       포항(제철)에만 넣고 나머지 넷은 비워 뒀다. **대표님 확인 후 채운다.**
   ⚠ wordKo 는 실제로 화폭에 쓴 한글을 모르므로 비워 뒀다. 번역해서 채우지 말 것 —
     대표님이 그린 글자가 정답이다.
   ⚠ 좌표는 지명 기준 근사값이다. 실제 작업 지점으로 바꾸면 그만큼 정확해진다.
   ⚠ 133 중 아래 목록에 있는 것만 지도에 뜬다. 나머지는 추가되는 대로 여기에 넣는다. */

const PLACES_TOTAL = 133;      // 완성한 그림 수 (2023-09 ~ 2024)
const VIDEOS_TOTAL = 133;      // 영상 기록 편수

const PLACES = [
  { en:"Seongsan Ilchulbong",      ko:"성산일출봉",        word:"Sunrise · Voyage · Start", wordKo:"", lat:33.4580, lng:126.9425, video:"", img:"" },
  { en:"Baekdamsa",                ko:"백담사",            word:"Seorak · Spirit",          wordKo:"", lat:38.1697, lng:128.3606, video:"", img:"" },
  { en:"Gwongeumseong",            ko:"권금성",            word:"Peak",                     wordKo:"", lat:38.1770, lng:128.4600, video:"", img:"" },
  { en:"Soyang River Dam",         ko:"소양강댐",          word:"Chuncheon · Abundance",    wordKo:"", lat:37.9469, lng:127.8125, video:"", img:"" },
  { en:"Homigot",                  ko:"호미곶",            word:"Ocean · Sea · Beginning of the World", wordKo:"", lat:36.0764, lng:129.5686, video:"", img:"" },
  { en:"Uljin — Tower for the Defence of Freedom", ko:"울진 자유수호의 탑", word:"Freedom", wordKo:"", lat:36.9930, lng:129.4000, video:"", img:"" },
  { en:"Gyeongpodae",              ko:"경포대",            word:"",                         wordKo:"", lat:37.7955, lng:128.8964, video:"", img:"" },
  { en:"Sokcho",                   ko:"속초",              word:"",                         wordKo:"", lat:38.2070, lng:128.5918, video:"", img:"" },
  { en:"Donghae",                  ko:"동해",              word:"",                         wordKo:"", lat:37.5247, lng:129.1143, video:"", img:"" },
  { en:"Samcheok",                 ko:"삼척",              word:"",                         wordKo:"", lat:37.4500, lng:129.1650, video:"", img:"" },
  { en:"Pohang City Hall",         ko:"포항시청",          word:"Steel",                    wordKo:"", lat:36.0190, lng:129.3435, video:"", img:"" },
  { en:"Garosu-gil, Seoul",        ko:"가로수길",          word:"",                         wordKo:"", lat:37.5209, lng:127.0230, video:"", img:"" }
];
