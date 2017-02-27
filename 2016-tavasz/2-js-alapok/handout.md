# JavaScript alapok

A JavaScript egy szkriptnyelv, aminek eredeti célja interaktivitást vinni a weboldalakba. Interpretált nyelv, az értelmező akár soronként is képes értelmezni.
Dinamikusan típusos, tehát a változók típusa futási időben dől el. 
Emellett gyengén típusos is, ami azt jelenti, hogy keverhetők a típusok. Pl. '2' - 1 == 1; De vigyázni kell ezzel, mert lehet, hogy más lesz az eredmény, mint amire számítunk, pl. '1' + 1 == 11;

## Szintaktika, nyelvi elemek (ezeknek a jelentése ugyanaz, mint pl. C-ben)

* **Aritmetikai operátorok:**
  * +,-,*,/, %, ++, --

* **Értékadás operátorok:**
  * =, +=, -=, *=, /=, %=

* **Bitenkénti operátorok:**
  * &, |, ^, ~, <<, >>, >>>

* **Feltétel vizsgálat:**
  * if...else, switch...case (break, default), .. ? .. : ..

* **Ciklusok:**
  * for, while, do..while, break, continue

* **Nyelvi elemek:**
  * tömb, objektum, függvény (ezekről majd később bővebben)

* **Logikai operátorok, értékadás operátorok:**
  * ||, &&, ==, !=, ===, !==, <, >, =<, >=

Az eddigiek közül a legtöbb ismerős lehet, viszont a hármas egyenlőségjellel valószínűleg nem találkoztatok még. Ez csak annyiban különbözik a kettős egyenlőségjeltől, hogy csak akkor értékelődik ki igazra, ha a két oldalán található változó típusa is megegyezik. Tehát pl. 1 == '1' // true, de 1 === '1' // false

## Truthy, Falsey
JS-ben nem csak a boolean, vagy int típusokkal lehet feltételt vizsgálni, bármilyen típust használhatunk erre. 
False-ra értékelődik:  
* false 
* 0
* ""
* NaN
* undefined

Minden más true (pl. -1 is, üres tömb, üres objektum is!)

## Nyelvi elemek részletesen:
### Függvények
  JS-ben a függvények is elsőrendű nyelvi elemek
  Úgy lehet elképzelni őket, mint C-ben a függvénypointereket, csak egyszerűbb a szintaktika
  
  Lehet nevesített:
~~~javascript
  function f(object o){ 
  console.log("Hello World!"); 
  };
~~~
  Lehet névtelen:
~~~javascript
  var f = function(object o) { console.log("Hello World!"); };
~~~
### Tömbök
    -Méretük dinamikusan változik
    
    -Elemei nem kell, hogy ugyanabból a típusból kerüljenek ki
    
    -Használható stack-ként is (push, pop)
    
~~~javascript
  //Tömbök létrehozása javascriptben
  var array1 = []; //üres
  var array2 = [1,2,3];
  var array3 = [1, "hello"];
~~~
#### Bejárás 
- for ciklussal, a beépített length attribútum segítségével
~~~javascript
  for (int i = 0; i < array1.length; i++) { 
    array1[i] += 1; 
  }
~~~
- forEach-el, megadva a függvényt, ami meghívódik minden elemre
~~~javascript
      array1.forEach( 
        function(element){ 
          element.doStuff(); 
      });
~~~	

### Objektumok

	-Kulcs-érték párokat tárol
    -A kulcs akármilyen típus lehet
  
  pl. 

~~~javascript
	var o1 = {};
	var o2 = { hello: "world"};
	var o3 = {
		property1 = "hello",
		property2 = 42
	}
	//Egymásba is ágyazhatók:
	var circle = {
		radius: 2,
		center: {
			x: 1,
			y: 1
		}
	};
~~~
  String kulcsokhoz tartozó értékek így is elérhetőek:
~~~javascript
  var answer = o3.property2; // 42
~~~
