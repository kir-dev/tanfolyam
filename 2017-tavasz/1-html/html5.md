# HTML 5 Slides

## slide 2 (HTML)
- Előre definiált **tagekből** áll, melyek leírják a dokumentum **tartalmát** pl.: `<html>`
- A HTML dokumentumokat weboldalnak szoktuk hívni, ezt látjuk a böngészőben
- A tagek kulcsszavak, amit kacsacsőrbe (angle brackets) írunk

## slide 3 (HTML)
- Itt egy példa egy html oldalra
- Pár fontosabb dolog:
  - `<!DOCTYPE html>`
  - `<meta charset="utf-8" />`

## slide 5 (Block element)
- Olyan elemek, melyek új sorban kezdődnek és azt teljes egészében kitöltik.

## slide 6 (Inline element)
- Olyan elemek, melyek sorban is kezdődhetnek, nem kezdenek új sort.

## slide 7 (None element)
- A block és inline elemeken kívül létezik egy harmadik 'none' is, melyeket nem jelenítünk meg.

## slide 8 (CSS manipuláció)
- CSS-ben lehet változtatni az elemek viselkedését

## slide 10 (HTML5 újításai)
- Új szemantikus tagek
- Új form attribútum típusok
- Új multimédiás elemek
- Új grafikus tag-ek
- Új API-k

## slide 12 (HTML5 szemantikus web)
- Az oldalak nagy része `<div>`-eket használt a struktúra felépítéséhez
- Mi lenne ha az id/class-ok helyett maga a tag neve jellemezné a bekerülő tartalmat

## slide 14 (HTML5 form input)
- Adatközlés fromokon keresztül történik
- Hiányoztak sokszor alapvetőnek hitt típusok

## slide 16 (HTML5 multimédia)
- Új multimédiás elemek jelentek meg, mint az audio, video és iframe (youtube)

## slide 17 (HTML5 vs flash)
- sokáig flashhel oldották meg a multimédiát
- lassú, nem biztonságos, már Adobe sem ajánlja
- mobil eszközök már nem is támogatják

## slide 20 (HTML5 grafika)
- valós idejű grafika megjelenítésére
- javascriptből manipulálható
- svg-ben pedig svg képeket tudunk megjeleníteni

## slide 21 (HTML5 canvas)
(DEMOs)
```js
// draw line
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(600,400);
ctx.stroke();
```

```js
// draw circle
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
```

## slide 22 (HTML5 APIs)

- HTML Geolocation
  - lehetőség nyílik a felhasználó helyzetének lekérésére
  - lehet net alapú, vagy GPS
  - user jóváhagyás szükséges
- HTML Drag and Drop
- HTML Local Storage
  - korábbi cookie-k helyett
  - nagyobb (5MB), jól kezeli a nagy adathalmazt, biztonságosabb
- HTML Application Cache
  - könnyen lehet offline alkalmazásokat készíteni vele
- HTML Web Workers
  - háttérben futtatható js szálak
  - nem a főszálat terheli, nem rontja a felhasználói élményt
- HTML SSE
  - Server-Sent Events
  - automatikusan frissíti az oldalt
  - eddig is volt rá lehetőség, csak eddig folyamatosan le kellett kérdezni
