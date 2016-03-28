title: Javascript alapok
output: javascript.html
theme: sudodoki/reveal-cleaver-theme

--

# Javascript alapok
## **2016, Kir-Dev**
## Gulyás Gergely
#### g.gergely314@gmail.com

--

### Ismétlö kérdések

- Mi az a DOM?
- Mik azok a css selectorok?
- Mire jók a media queryk?

--

### Általános

- Eredeti célja: interaktivitást vinni a weboldalakba
- ECMAScript 5, ECMASscript 6
- Böngészőnként külön implementáció
- Interpretált nyelv
- Van Garbage Collector :)

--

### Szintaxis

- C nyelvcsaládból: `{}, if, else, for, while, switch, case, //, /* */`
- Vannak C-ből ismeretlen kulcsszavak is: `function, typeof, var, try, catch`
- Aritmetikai, bit, logikai operátorok megegyeznek
- Szokásos összehasonlító operátorok,  extra a _hármas egyenlőség_
    - `===` és `!==`
- Hasonlóság a C-vel a szintaxisban ki is merül

--

### Típusok

- Dinamikus: típusok csak futásidőben derülnek ki
    - Nem a változónak, hanem a benne tárolt adatnak van típusa ~ minden változó `void*`
- Gyengén típusos: a típusok keverhetőek, de vigyázni kell
    * `'1' + 1 == 11`
    * `'2' - 1 == 1`
- `typeof` kulcsszó
- Alaptípusok: undefined, number, string, boolean, object, function
- Összetett típusok: object, tömb (array)

--

### Tömbök

~~~javascript
var a = [];
var b = [1,2,3,4];
~~~

- `[]`: üres tömböt hoz létre (array literal)
- Dinamikus a mérete
- A tartalma nem kell, hogy egy típusból kerüljön ki
- Nem létező indexre `undefined` a válasz
- `length` tulajdonság
- Bejárható for ciklussal (forEach is használható a modern böngészőkben)
- Stacként is használható: `push` és `pop`

--

### Objektumok

~~~javascript
var o1 = {};
var o2 = { hello: "world"};
~~~

- Kulcs-érték párok
- Kulcs is lehet bármilyen típus (ezáltal érték is)
- String kulcsokhoz tartozó értékek pont (`.`) operátorral is elérhetőek
- JSON: javascript object notation

        {
            property1: "hello world",
            property2: 42
        }

- `JSON.stringify` és `JSON.parse`

--

### Logikai kifejezések

- Truthy és falsy: nem csak a `true` és a `false` számít igaznak vagy hamisnak
- False-ra kiértékelődő kifejezések:
    - false
    - 0 (nulla szám, + és - is)
    - "" (üres string)
    - null
    - undefined
    - NaN
- Fentebb felsoroltakon kívül minden más kifejezés true-ra értékelődik ki

--

### Hármas egyenlöség vizsgálat:

- `==` és `!=` operátorokat ismerjük C-ből
- Mellékhatása, hogy az értékek típusát megpróbálja egyeztetni összehasonlítás előtt

        1 == '1' // => true

- Ez lehet, hogy nem kívánt hatásokhoz vezet
- A `===` és `!==` típus is vizsgál és csak akkor igaz az értéke, ha a két
kifejezés típusa is megegyezik

        1 === '1' // => false

--

### Függvények

- Függvény elsőrendű érték
    - Lényegében: tárolhatom változóban, tehát úgy is viselkedik, átadhatom paraméterként
    - C-s függvénypointer, csak egyszerűbb szintaxis
- Lehet nevesített

        function f() { console.log("hello world"); }

- Lehet névtelen (a végén a pontosvesszőre figyeljünk!)

        var f = function () { console.log("hello world"); };

- Explicit `return` nélkül `undefined` a visszatérési érték

--

### HTML + JavaScript

- Script tag
    - Inline
    - Src attribútum
- Azonnal lefut

--

# Szünet

--

### Ismétlés

- Hogyan hozunk létre tömböt és objectet?
- Mi számít `false` értéknek?
- `function` elsőrendű nyelvi elem-e?

--

### DOM

- Javascriptből is elérhető
- Egy-egy node kikeresése és változtatása
- Új dom elem hozzáadása

--

### Események

- onxxx property (html attr és javascript)
- `addEventListener`
- `addEventListener` előnyös: nagyobb kontroll és több eseménykezelő is regisztrálható
- Event bubbling
- http://themousepotatowebsite.co.za/javascript-events-capturing-and-bubbling/

--

### jQuery

- http://jquery.com/
- Library DOM manipulációhoz és eseménykezeléshez (és még sok más)
- `$(document)` jquery objektummá alakítás (minden dom elementre megy)
- Függvények paraméter nélkül általában lekérdezést jelentenek
- Paraméterrel pedig értékadás
- `$(document).ready(...)`

--

### jQuery DOM bejárás

- Css selectorok, kicsit kiegészítve
- http://api.jquery.com/category/selectors/
- `$()` függvény a belépési pont
- `$('li')` minden `li` elem az egész oldalon
- `$('.post')`
- `$('#container')`
- `$('.post.active')` az olyan elemek, amiknek post **és** active class-a is van
- Tetszőleges kombinálhatóak: `$(ul#menu li a)`
- Pszeudo selectorok `:checked, :visible`
- `text()`, `html()`
- Form elemekhez: `val()`

--

### DOM manipuláció

- Selectorral kiválasztott elemeket egyszerre lehet
    - `$('.post').show()/hide()`
    - `$('.post').css('background-color, 'tomato')`
    - `$('.post:first').text('hello world')`
    - `$('.post:nth-child(2)').html('<span>hello world</span>')`
- `remove()`, `append()`
- Új dom elem
- Fade, slide, és egyedi animációk
- Class hozzáadás, elvétel
- attr, prop

--

### Események

- `on('event', handler)`
- Rövidítés: `click(handler)`, `mouseenter(handler)`, stb
- Még nem létező elemekhez is lehet eseményt regisztrálni
- `this` a fogadó elemre mutat

--

### Ajax

- Asynchronous JavaScript and XML
- Ma már szinte mindig JSON
- Háttérben, az oldal teljes újratöltése nélkül lehet a szerverhez fordulni
- Aszinkron működést biztosít
- Azt az érzetet kelti a felhasználóban, hogy gyorsabb az oldal
- XMLHttpRequest

--

## jQuery.ajax

- Alapvetően a jQuery.ajax hívás
- Vannak rövidítések
    - get, post, getJSON, getScript
    - Nem annyira flexibilisek

            $.ajax({
                url: '/users',
                success: function (data) {
                    console.log(data);
                }
            });

- data: adat amit küldeni szeretnénk, automatikusan feldolgozza
- dataType: válasz tartalmát előre feldolgozza (json, xml)
- type: HTTP verb,
    - GET, POST mindenhol támogatott
    - A többi (PUT, DELETE) nem biztos, böngészőfüggő

--

### Callbackek

- success: siker
- error: hiba (alkalmazás szintű is, pl 404, 500)
- complete: mindig lefut a kérés után
- Alternatíva:

    `$.ajax({url: '/users'}).done(...).fail(...).always(...)`

--

### Limitációk és jsonp

- Bookmarkolhatóság
- Web crawlers
- Böngésző history inkonzisztencia (HTML5 előtt)
- Same origin policy
    - Megoldás: CORS (cross-origin resource sharing), JSONP

--

# Köszönöm a figyelmet!