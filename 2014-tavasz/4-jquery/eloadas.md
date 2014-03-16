# JS hálózatkezelés és DOM: jQuery

## Ismétlő kérdések

- function elsőrendű nyelvi elem-e?
- mi számít `false` értéknek
- css selectorok
- hogyan hozunk létre tömböt és objectet (array, object literal)

## Prototípusok

- http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
- a js prototípusos nyelv
- prototype chain
    - egy objektum lényegében csak kulcs-érték párok halmaza (ezt már láttuk az előző eloadáson)
    - amikor egy tulajdonságot akarunk elérni, akkor a prototype chain-en lépkedünk felfel míg meg nem találjuk (null van prototype helyett)
    (itt érdemes rajzolni a táblára)
    - `Object.create(null)` tényleg üres objektum létrehozása, nincs prototípusa
    - protípus lánc szemlétetése

            var person = Object.create(null);
            person.fullName = function () {
                return this.firstName + ' ' + this.lastName;
            };

            var man = Object.create(person);
            man.sex = 'male';

            var me = Object.create(man);
            me.firstName = 'Tamás';
            me.lastName = 'Michelberger';

            console.log(me.fullName()); // => Tamás Michelberger
            console.log(me.sex); // => male

    - object literal (`{}`): prototípusként mindig az `Object.prototype`-ot állítja be

            var blog = { title: 'Kir-Dev blog', address: 'https://kir-dev.sch.bme.hu' };

            // nagyjából a következőnek felel meg
            var blog2 = Object.create(Object.prototype);
            blog2.title = 'Kir-Dev blog';
            blog2.address = 'https://kir-dev.sch.bme.hu';

    - prototípusokkal hozunk létre "osztályokat" (constructor function)

            var Animal = function (name) { this.name = name; };
            Animal.prototype.sayHi = function () { return "Hi, my name is " + this.name; };

            var piglet = new Animal("Piglet");
            console.log(piglet.sayHi());

## DOM

- document object model (html előadásról)
- javascriptből is elérhető
- `document.getElementById` és társai
    - egy-egy node kikeresése és változtatása
    - példa: dom.html
- új dom elem hozzáadása

        var text = document.createTextNode("hello world");
        var p = document.createElement("p");
        p.style.color = "white"
        p.appendChild(text);
        var container = document.getElementById("container");
        container.appendChild(p);

- események
    - button.html
    - onxxx property (html attr és javascript)
    - `addEventListener`
    - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
    - `addEventListener` előnyös: nagyobb kontroll és több eseménykezelő is regisztrálható
    - event bubbling (bubbles.html)
    - http://themousepotatowebsite.co.za/javascript-events-capturing-and-bubbling/

## jQuery

- http://jquery.com/
- library DOM manipulációhoz és eseménykezelés (és még sok más)
- document ready
- `$(document)` jquery objektummá alakítás (minden dom elementre megy)
- függvények paraméter nélkül általában lekérdezést jelentenek

### jQuery DOM bejárás

- css selectorok, kicsit kiegészítve
- http://api.jquery.com/category/selectors/
- `$()` függvény a belépési pont
- `$('li')` minden `li` elem az egész oldalon
- `$('.post')`
- `$('#container')`
- `$('.post.active')` az olyan elemek, amiknek post **és** active class-a is van
- tetszőleges kombinálhatóak: `$(ul#menu li a)`
- pszeudo selectorok `:checked, :visible`
- `text()`, `html()`
- form elemekhez: `val()`

### DOM manipuláció

- selectorral kiválasztott elemeket egyszerre lehet
- jquery.html
- `$('.post').show()/hide()`
- `$('.post').css('background-color, 'tomato')`
- `$('.post:first').text('hello world')`
- `$('.post:nth-child(2)').html('<span>hello world</span>')`
- `remove()`, `append()`
- új dom elem
- fade, slide, és egyedi animációk
- class hozzáadás, elvétel
- attr, prop

### Események

- `on('event', handler)` és `off('event')`
- direct vs delegated (selectorral)
- `trigger('event')`
- rövidítés: `click(handler)`, `mouseenter(handler)`, stb
- paraméter nélkül esemény elsütése
- még nem létező elemekhez is lehet eseményt regisztrálni
- eseménykezelőben
    - event paraméter: csomagolt natív event
    - this a fogadó elemre mutat

## Ajax

## XMLHttpRequest

## jQuery.ajax

## Limitációk és jsonp