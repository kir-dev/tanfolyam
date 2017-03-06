title: Web alapozó
output: bevezeto.html
theme: sudodoki/reveal-cleaver-theme

--

## Web alapozó tanfolyam
### Bevezetö elöadás
##### **2017, Kir-Dev**
##### Gulyás Gergely

--

### Kir-Dev
- HTML, CSS, JavaScript
- Ruby on Rails
- Node.js
- Profil és Körök (VIR)
- Üzemeltetés
- Hackathon
- Meetupok, konferenciák
- Sör

--

### Tanfolyam
Két alkalom
- Frontend
  - HTML, CSS
  - JavaScript
- Backend
  - Node.js

https://github.com/kir-dev/tanfolyam

--

### Cél
- Alapok átadása
- Érdeklődés felkeltése
- Irányadás

--

## World Wide Web
### *Mi történik, ha leütöd az Enter billentyüt a böngészödben?*

--

### Kapcsolódás
- DNS: Hosztnév feloldása IP címre
- TCP: Kapcsolódás az IP címre (80/443-as port)
- HTTP üzenetek

--

### Hypertext Transfer Protocol
- Egyszerű, szöveg alapú protokoll
- Kliens-szerver architektúra
  - Kliens kezdeményez, szerver válaszol
- HTTP/1.0 - 1996
- HTTP/1.1 - 1997
- HTTP/2 - 2015

--

### HTTP Kérések
- Három rész
  - Kérés (kérés célja, URL)
  - Fejléc
    - Preferált nyelv, kliens információk
    - Host mező: a kért oldal hosztneve (egy IP cím alatt több oldal is lehet)
  - Opcionális adat (űrlap, feltöltött fájl)

--

### GET és POST
- GET
  - Egyszerű kérés, adatküldés nélkül
  - URL-ben küldhetünk a kéréssel kapcsolatos paramétereket: `/search?query=kir-dev`
- POST
  - Adatküldés (bejelentkezés, feltöltés)


--

### HTTP kérések
```
GET /about/ HTTP/1.1
Host: kir-dev.sch.bme.hu
User-Agent: Mozilla/5.0 (X11; Linux x86_64)
Accept-Language: en-US
```
```
POST /session HTTP/1.1
Host: github.com
Content-Length: 201
User-Agent: Mozilla/5.0 (X11; Linux x86_64)
Accept-Language: en-US

login=geri&password=titkos
```

--

### HTTP válaszok
- Három rész
  - Státusz
  - Fejléc (legutóbbi módosítás, szerver információk)
  - Opcionális adat (HTML oldal, letöltött fájl)
- Státusz
  - 200: siker
  - 301: átirányítás
  - 404: nem talált
  - 500: szerver hiba

--

### HTTP válaszok
```
HTTP/1.1 200 OK
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
Last-Modified: Mon, Feb 29 2016 04:58:08 GMT

<html>
  <body>
    Hello World!
  </body>
</html>
```

--

### HTTP állapottartás
- Állapotmentes, minden kérés független
- Bejelentkezés?
- Bevásárlókosár tartalma?
- Cookie, a HTTP állapotmentességének megkerülése

--

### Cookie
- A szerver a HTTP válasz fejlécében küld egy azonosítót
- A kliens ezek után ezt mindig csatolja a HTTP kéréshez

```
HTTP/1.1 200 OK
Set-Cookie: user=123

<html></html>
```
```
GET / HTTP/1.1
Host: example.org
Cookie: user=123
```

--

### Biztonság
- Egyszerű, szöveges protokoll
- A kliens és a szerver közötti forgalmat bárki láthatja és módosíthatja
- Jelszavak?
- Banki adatok?

--

### HTTPS: HTTP Secure
- Titkosított kapcsolat a kliens és a szerver között
- Ezen belül HTTP

--

### Chrome fejlesztöi eszközök
#### Demó
- HTML/CSS szerkesztés valós időben
- HTML/CSS/JavaScript forrás böngészése
- JavaScript futtatás helyben
- Kérések és válaszok követése
- Teljesítménymérés
- Más böngészőkben is

--

### Összegzés
- Egyszerű, szöveges üzenetek a hálózaton
- GET és POST kérések
- Chrome fejlesztői eszközök fejlesztés közben

--

## Köszönöm a figyelmet!