/* 133 Places — 그림 133점과 그 그림을 그린 장소.

   ★ 구조가 두 층이다. 「133」은 장소 수가 아니라 **그림 수**다.
     한 장소에서 여러 점을 그렸다 (가로수길 5점 · 호미곶 5점 …).
     그래서 WORKS(그림) 가 PLACES(장소) 를 id 로 가리킨다.

   WORKS 한 줄:
     { n:133,                 // 몇 번째 그림인가 (대표님 목록의 번호 그대로)
       place:"garosugil",     // 아래 PLACES 의 id
       word:"위대할 태",       // 화폭에 쓴 말 — **대표님이 적어 준 그대로. 고치지 않는다**
       en:"",                 // 영어 독자를 위한 뜻풀이. 확실한 것만 채운다. 모르면 빈칸
       video:"https://…",     // 유튜브
       img:"" }               // 작품 사진 (assets/places/…). 없으면 빈칸 → 조용히 비워둔다

   PLACES 한 줄:
     { id, en, ko, lat, lng } // 좌표는 지명 기준 근사값

   ⚠ en(뜻풀이) 중 다음은 「ARTIST MATERIALS (EN)」 문서에서 확인된 것이다:
     개벽=Beginning of the World · 자유=Freedom · 정기=Spirit · 설악=Seorak ·
     춘천=Chuncheon · 풍요=Abundance · 일출=Sunrise · 항해=Voyage
   ⚠ 다음 넷은 **제가 넣지 않았다 — 대표님 확인 필요**:
     「위대할 태」(한자 太의 새김) · 「철 (한자)」 · 「산」 · 「석가모니」.
     지명(호미곶·속초·동해…)은 로마자 표기라 그대로 뒀다.
   ⚠ 119번 줄은 원문이 「119번째 그림: 삼척」 한 토막이라 **낱말을 비워 뒀다.**
     장소만 삼척인지, 「삼척」을 쓴 것인지 확인되면 채운다. 추측해서 넣지 않는다. */

const WORKS_TOTAL = 133;   // 프로젝트 전체 그림 수 (2023-09 ~ 2024)

const PLACES = [
  { id:"ddp",             en:"Dongdaemun Design Plaza, Seoul",      ko:"서울 동대문디자인플라자(DDP)", lat:37.5665, lng:127.0092 },
  { id:"jamsil",          en:"Olympic Park, Jamsil, Seoul",         ko:"서울 잠실 올림픽",          lat:37.5159, lng:127.0728 },
  { id:"starfield",       en:"Starfield Library, COEX, Seoul",      ko:"서울 코엑스 별마당도서관",   lat:37.5100, lng:127.0600 },
  { id:"myeongdong",      en:"Myeong-dong, Seoul",                  ko:"서울 명동",                lat:37.5636, lng:126.9827 },
  { id:"coex",            en:"COEX, Seoul",                         ko:"서울 코엑스",              lat:37.5115, lng:127.0595 },
  { id:"bongeunsa",       en:"Bongeunsa Temple, Seoul",             ko:"서울 봉은사",              lat:37.5150, lng:127.0577 },
  { id:"cheonan",         en:"Cheonan",                             ko:"천안",                    lat:36.8151, lng:127.1139 },
  { id:"kintex",          en:"KINTEX, Ilsan",                       ko:"일산 킨텍스",              lat:37.6663, lng:126.7452 },
  { id:"gwangju-kdj",     en:"Kim Dae-jung Convention Center, Gwangju", ko:"광주 김대중컨벤션센터", lat:35.1420, lng:126.8390 },
  { id:"mudeungsan",      en:"Mudeungsan, Gwangju",                 ko:"광주 무등산",              lat:35.1340, lng:126.9886 },
  { id:"gwangju-univ",    en:"Gwangju University",                  ko:"광주대학교",               lat:35.1090, lng:126.8760 },
  { id:"gwangju-cityhall",en:"Gwangju City Hall",                   ko:"광주시청",                 lat:35.1600, lng:126.8514 },
  { id:"garosugil",       en:"Garosu-gil, Seoul",                  ko:"서울 가로수길",            lat:37.5209, lng:127.0230 },
  { id:"homigot",         en:"Homigot, Pohang",                    ko:"포항 호미곶",              lat:36.0764, lng:129.5686 },
  { id:"pohang-cityhall", en:"Pohang City Hall",                   ko:"포항시청",                 lat:36.0190, lng:129.3435 },
  { id:"uljin-tower",     en:"Tower for the Defence of Freedom, Uljin", ko:"울진 자유수호의 탑",  lat:36.9930, lng:129.4000 },
  { id:"samcheok",        en:"Samcheok",                           ko:"삼척",                     lat:37.4500, lng:129.1650 },
  { id:"donghae",         en:"Donghae",                            ko:"동해",                     lat:37.5247, lng:129.1143 },
  { id:"gyeongpodae",     en:"Gyeongpodae, Gangneung",             ko:"강릉 경포대",              lat:37.7955, lng:128.8964 },
  { id:"gwongeumseong",   en:"Gwongeumseong, Outer Seoraksan",     ko:"설악산 외설악 권금성",     lat:38.1770, lng:128.4600 },
  { id:"seorak-entrance", en:"Outer Seoraksan, the approach",      ko:"설악산 외설악 초입",       lat:38.1900, lng:128.4650 },
  { id:"sokcho-port",     en:"Sokcho Port",                        ko:"강원도 속초항",            lat:38.2070, lng:128.5918 },
  { id:"baekdamsa",       en:"Baekdamsa, Inner Seoraksan",         ko:"설악산 내설악 백담사",     lat:38.1697, lng:128.3606 },
  { id:"hwajinpo",        en:"Hwajinpo, Goseong",                  ko:"강원도 고성 화진포",       lat:38.4560, lng:128.4470 },
  { id:"soyang-dam",      en:"Soyang River Dam, Chuncheon",        ko:"강원도 춘천 소양강댐",     lat:37.9469, lng:127.8125 },
  { id:"seongsan",        en:"Seongsan Ilchulbong, Jeju",          ko:"제주 성산일출봉",          lat:33.4580, lng:126.9425 }
];

const WORKS = [
  /* ── 2023년 9월 드로잉쇼 — 대표님 일정표에서 장소와 날짜만 확인된 것들.
        그림 번호와 화폭의 낱말은 아직 모른다. 목록을 받으면 채운다. ── */
  { n:null, date:"2023-08-31", place:"ddp",              word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-01", place:"jamsil",           word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-02", place:"starfield",        word:"", en:"", video:"", img:"assets/places/6A16DF87-C3CE-4BCA-B6BE-98F68CD8B7BD.jpg" },
  { n:null, date:"2023-09-05", place:"myeongdong",       word:"", en:"", video:"", img:"assets/places/IMG_2462.jpg" },
  { n:null, date:"2023-09-06", place:"coex",             word:"", en:"", video:"", img:"assets/places/IMG_2561.jpg" },
  { n:null, date:"2023-09-06", place:"bongeunsa",        word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-09", place:"cheonan",          word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-15", place:"kintex",           word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-16", place:"gwangju-kdj",      word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-17", place:"mudeungsan",       word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-17", place:"gwangju-univ",     word:"", en:"", video:"", img:"" },
  { n:null, date:"2023-09-17", place:"gwangju-cityhall", word:"", en:"", video:"", img:"" },

  { n:133, place:"garosugil",       word:"위대할 태",  en:"",                        video:"https://youtube.com/shorts/TLo_FeH5JXU", img:"" },
  { n:132, place:"garosugil",       word:"밀리버스",   en:"Miliverse",               video:"https://youtube.com/shorts/dg9evF40KuI", img:"" },
  { n:131, place:"garosugil",       word:"EMC",        en:"",                        video:"https://youtube.com/shorts/jVfudFQvc7I", img:"" },
  { n:130, place:"garosugil",       word:"가로수길",   en:"Garosu-gil",              video:"https://youtube.com/shorts/rHkxXkze6JM", img:"" },
  { n:129, place:"garosugil",       word:"BM the Korea", en:"",                      video:"https://youtube.com/shorts/fdt54h_WiV0", img:"" },
  { n:128, place:"homigot",         word:"Ocean",      en:"",                        video:"https://youtube.com/shorts/W_A_xp7d5lo", img:"assets/places/IMG_5624.jpg" },
  { n:127, place:"homigot",         word:"바다",       en:"Sea",                     video:"https://youtube.com/shorts/J7Qmd35hAyo", img:"assets/places/IMG_5632.jpg" },
  { n:126, place:"homigot",         word:"개벽",       en:"Beginning of the World",  video:"https://youtube.com/shorts/MdH7VnCY_Hc", img:"assets/places/IMG_5605.jpg" },
  { n:125, place:"homigot",         word:"East",       en:"",                        video:"https://youtube.com/shorts/ZKY-eN3j3Gc", img:"assets/places/IMG_5615.jpg" },
  { n:124, place:"homigot",         word:"호미곶",     en:"Homigot",                 video:"https://youtube.com/shorts/3MKwD16JXFY", img:"" },
  { n:123, place:"pohang-cityhall", word:"철 (한자)",  en:"",                        video:"https://youtube.com/shorts/3zYHcH6zZgc", img:"assets/places/IMG_5574.jpg" },
  { n:122, place:"pohang-cityhall", word:"Pohang",     en:"",                        video:"https://youtube.com/shorts/cndSVfFTcZQ", img:"assets/places/IMG_5567.jpg" },
  { n:121, place:"pohang-cityhall", word:"Steel",      en:"",                        video:"https://youtube.com/shorts/-c7shK_K4pQ", img:"" },
  { n:120, place:"uljin-tower",     word:"자유",       en:"Freedom",                 video:"https://youtube.com/shorts/9-kcVX8Spfc", img:"assets/places/IMG_4749.jpg" },
  { n:119, place:"samcheok",        word:"삼척",       en:"Samcheok",                        video:"https://youtube.com/shorts/NjEQzEJExMk", img:"assets/places/IMG_5506.jpg" },
  { n:118, place:"uljin-tower",     word:"자유",       en:"Freedom",                 video:"https://youtube.com/shorts/Mdk7LdZaCA8", img:"" },
  { n:117, place:"donghae",         word:"동해",       en:"Donghae — the East Sea",  video:"https://youtube.com/shorts/UP3AFOiB9vc", img:"" },
  { n:116, place:"gyeongpodae",     word:"경포대",     en:"Gyeongpodae",             video:"https://youtube.com/shorts/aPlSUiCu30M", img:"assets/places/IMG_5389.jpg" },
  { n:115, place:"gwongeumseong",   word:"Peak",       en:"",                        video:"https://youtube.com/shorts/WBgoisACCSo", img:"assets/places/IMG_5249.jpg" },
  { n:114, place:"gwongeumseong",   word:"권금성",     en:"Gwongeumseong",           video:"https://youtube.com/shorts/gofiL36XodE", img:"assets/places/IMG_5238.jpg" },
  { n:113, place:"seorak-entrance", word:"석가모니",   en:"",                        video:"https://youtube.com/shorts/8ykTz1gW7NE", img:"assets/places/IMG_5159.jpg" },
  { n:112, place:"seorak-entrance", word:"산",         en:"",                        video:"https://youtube.com/shorts/_8IcUP5RuXM", img:"assets/places/IMG_5158.jpg" },
  { n:111, place:"sokcho-port",     word:"속초",       en:"Sokcho",                  video:"https://youtube.com/shorts/21JRdMbIpdM", img:"" },
  { n:110, place:"baekdamsa",       word:"정기",       en:"Spirit",                  video:"https://youtube.com/shorts/qF4Tsvyim-Q", img:"assets/places/IMG_5148.jpg" },
  { n:109, place:"baekdamsa",       word:"설악",       en:"Seorak",                  video:"https://youtube.com/shorts/DJ2QYL5maEs", img:"assets/places/IMG_5147.jpg" },
  { n:108, place:"hwajinpo",        word:"Eternity",   en:"",                        video:"https://youtube.com/shorts/E57gJ0JOR-E", img:"assets/places/IMG_5068.jpg" },
  { n:107, place:"soyang-dam",      word:"춘천",       en:"Chuncheon",               video:"https://youtube.com/shorts/zvgy_QGm1Qk", img:"" },
  { n:106, place:"soyang-dam",      word:"소양강",     en:"Soyang River",            video:"https://youtube.com/shorts/ZAQA7_bxyrE", img:"" },
  { n:105, place:"soyang-dam",      word:"풍요",       en:"Abundance",               video:"https://youtube.com/shorts/20AK3E2Gmss", img:"" },
  { n:104, place:"seongsan",        word:"START",      en:"",                        video:"https://www.youtube.com/shorts/MtybGxmjbgo", img:"assets/places/IMG_4814.jpg" },
  { n:103, place:"seongsan",        word:"일출",       en:"Sunrise",                 video:"https://www.youtube.com/shorts/Y3HBT-iT3TU", img:"" },
  { n:102, place:"seongsan",        word:"항해",       en:"Voyage",                  video:"https://www.youtube.com/shorts/JnzCh8C0K8U", img:"" }
];
