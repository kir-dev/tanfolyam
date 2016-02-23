# JavaScript alapok

## Általános

* célja: interaktivitást vinni a weboldalakba; mára kinőtte magát.
* [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) 5 -> a nyelv szabványa, modern böngészők támogatják
* minden böngészőnek saját implementációja van
    * kompatibilitási gondok (nagyjából ok, de vannak eltérések pl: `window.chrome`)
    * Chrome: V8
    * Firefox: SpiderMonkey
* interpretált: nincs fordítás, a kódot közvetlenül futtatja a VM
* memória menedzsment a VM dolga (GC = garbage collection)
* [referencia oldal (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Szintaxis

* C nyelvcsaládból: `{}, if, else, for, while, switch, case, //, /* */`
* vannak C-ből ismeretlen kulcsszavak is: `function, typeof, var, try, catch`
* aritmetikai, bit, logikai operátorok megegyeznek
* szokásos összehasonlító operátorok,  extra a _hármas egyenlőség_
    * `===` és `!==`
* hasonlóság a C-vel a szintaxisban ki is merül

## Típusok

Példák a types.js és types.html fájlokban.

* vannak típusok, de nagy részben elrejti előlünk őket a nyelv
* dinamikus: típusok csak futásidőben derülnek ki
    * nem a változónak, hanem a benne tárolt adatnak van típusa ~ minden változó `void*`
* gyengén típusos: a típusok keverhetőek, de vigyázni kell
    * `('1' + 1 == 11) == true`
    * `('2' - 1 == 1) == true`
* `typeof` kulcsszó, ([MDN leírás](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof))
* alaptípusok: undefined, number, string, boolean, object, function

## Összetett típusok

* object
* tömb (array)

### Tömbök

Példák a array.js és array.html fájlokban.

~~~javascript
var a = [];
var b = [1,2,3,4];
~~~

* `[]`: üres tömböt hoz létre (array literal)
* a tartalma nem kell, hogy egy típusból kerüljön ki
* a tömb nem jó kifejezés, valójában egy dinamikus tömb
* nem létező indexre `undefined` a válasz
    * értékadásnál feltölti a köztes értékeket `undefined`-dal

            var a = [];
            a[1] = "hello world"; // a[0] == undefined

* `length` tulajdonság
* bejárható for ciklussal (forEach is használható a modern böngészőkben)
* stacként is használható: `push` és `pop`
    * `push`: új elem a tömb végére fűzése
    * `pop`: utolsó elem visszaadása és törlése
* [Array az MDN-en](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Objektumok

Példák a object.js és object.html fájlokban.

~~~javascript
var o1 = {};
var o2 = { hello: };
~~~

* ~ a C-s struktúrákhoz hasonlítható, csak dinamikusan változhatnak a tagjai
* kulcs-érték párok
* kulcs is lehet bármilyen típus (ezáltal érték is)
    * string kulcsokhoz tartozó értékek pont (`.`) operátorral is elérhetőek (dot notation)

            var obj = {};
            obj["hello"] = "world";
            obj["hello"]; // => "world"
            obj.hello; // => "world"
            obj.hello == obj["hello"] // => true

* JSON: javascript object notation

        {
            property1: "hello world",
            property2: 42
        }

* `JSON.stringify` és `JSON.parse`
* [Objektumokról az MDN-en](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

## Logikai kifejezések

* truthy és falsy: nem csak a `true` és a `false` számít igaznak vagy hamisnak
* false-ra kiértékelődő kifejezések:
    * false
    * 0 (nulla szám, + és - is)
    * "" (üres string)
    * null
    * undefined
    * NaN
* fentebb felsoroltakon kívül minden más kifejezés true-ra értékelődik ki
* feltételes kifejezésként (if, while, for) használható bármilyen érték
* [további olvasmány](http://james.padolsey.com/javascript/truthy-falsey/)

Hármas egyenlőség vizsgálat:

* `==` és `!=` operátorokat ismerjük C-ből
* mellékhatása, hogy az értékek típusát megpróbálja egyeztetni összehasonlítás előtt

        1 == '1' // => true

* ez lehet, hogy nem kívánt hatásokhoz vezet
* a `===` és `!==` típus is vizsgál és csak akkor igaz az értéke, ha a két
kifejezés típusa is megegyezik

        1 === '1' // => false

Logikai kifejezések az `if` fejében:

~~~javascript
if (0) {
    // ide sosem jutunk
}

var a = "hello world";
if (a) {
    console.log("a");
}
~~~

'Vagy' operátor lusta kiértékelése:

~~~javascript
// obj jön valahonnan, különben ReferenceError
var a = obj || "hello world";
~~~

Dupla felkiáltójel boolean-é alakít egy értéket:

~~~javascript
var a = !!"hello world" // => a === true
var b = !!{}; // => b === true
var c = !!""; // => c === false
~~~

## Függvények

Példák a functions.js és functions.html fájlokban.

* függvény elsőrendű érték
    * lényegében: tárolhatom változóban, tehát úgy is viselkedik, átadhatom paraméterként
    * C-s függvénypointer, csak egyszerűbb szintaxis
* lehet nevesített

        function f() { console.log("hello world"); }

* lehet névtelen (a végén a pontosvesszőre figyeljünk!)

        var f = function () { console.log("hello world"); };

* explicit `return` nélkül `undefined` a visszatérési érték
* nincs overloading, de a bemenő paraméterek száma és típusa nincs előre kikötve
* `arguments`
    * tartalmazza az összes átadott paramétert
    * a függvényen belül (implicit) lokális változó
    * tömb szerű (van length tulajdonsága)
    * segítségével lehet változó számú paramétereket fogadó függvényt írni
* [további olvasmány MDN-en](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

### Scope-ok

* function jelenti a scope-ot
* globális és lokális scope
* `window` objektum szerepe
* `var` kulcsszó -> lokális scope-ban deklarál
* [MDN részletes leírás](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions_and_function_scope)

A külső scope változói elérhetőek a belső(bb) scope-okban is.

~~~javascript
var outer = 1;

function f() {
    console.log(outer++);
}

f(); // => 1
f(); // => 2
f(); // => 3
~~~

`var` kulcsszó nélkül a globális scope-ban hozunk létre változókat

~~~javascript
function f() {
    g = 1;
}

f();
console.log(g); // => 1
~~~

Shadowing: változó elfedése scope-on belül. Külső változót a globális (`window`)
objektumon keresztül érhetjük el.

~~~javascript
var x = 1;

function f() {
    var x = 42;

    console.log(x); // => 42
    console.log(window.x); // => 1
}
~~~

### Closures

* zárványok
* kód és környezete tárolódik el
* stack nem szűnik meg, ahogy várnánk

Klasszikus closure példa:

~~~javascript
function f() {
    var x = 42;

    reutrn function () {
        return (x++);
    };
}

var foo = f();
console.log(foo()); // => 42
console.log(foo()); // => 43
~~~

### Self-invoking functions

* önmagát meghívó, anonymous függvény
* névtér szeparációra
* global namespace pollution

Module pattern

~~~javascript
var MyModule = (function () {
    var privat = 42;

    return {
        publikus: function () { return privat + 1; }
    };
})();

MyModule.publikus() // => 43
~~~

## Objektumok és függvények

Továbbra is functions.js és functions.html-ben találhatóak a példák.

* function + receiver = method
* `this` kulcsszó megjelenése
    * másképp működik mint a többi nyelvben
    * _általában_ a hívó objektumra mutat
    * `call`, `apply` és `bind` segítségével beállítható

### new operátor

* constructor function == új objektumot hoz létre, előre definiált tulajdonságokkal
* objektum példányosítás a `new` operátorral
    * függvényt hív
    * beállítja a `this` változót
    * ha nincs visszatérési érték, akkor a `this`-t adja vissza, különben a visszatérési értéket

Írjunk saját `new` megvalósítást!

~~~javascript
function new2(Class) {
    var $this = {};
    $this.__proto__ = Class.prototype;
    $this = Class.apply($this, Array.prototype.slice.call(arguments, 1)) || $this;

    return $this;
}

var Animal = function (name) { this.name = name; };

// ekvivalensek
var a1 = new Animal("zsiráf");
var a2 = new2(Animal, "zsiráf");
~~~

## HTML + JavaScript

* script tag
    * inline
    * src attribútum
* azonnal lefut