# Tematika

A gyűlésen, listán és ircen megbeszéltek alapján jelenleg a következő a tanfolyam állapota:

* 3+1 alkalom (3 előadás + 1 egész napos workshop)
* html+css+js témakör
* hangsúly a programozáson és nem a sitebuild/dizájn részen lesz
* js-t emeljük ki főleg (elkövetkezendő pék node.js fejlesztés miatt is)
* workshopon főleg önálló (párokban) munka lesz, ehhez egy apit kell biztosítani
* közösségi események a tanfolyam alatt
    * sörözés az újoncokkal (minél többet)
    * körös szakmai összejövetel, feltehetőleg szerverfirssítés, nagyobb pék release
* az elsőt kivéve minden alkalom gyakorlat orientált

## Általános

Az előadások legyenek egymás utáni heteken. A lezáró workshop attól függően, hogy a hét elején vagy a végén van az előadás időpontja, lehet akár az utolsó előadással egy héten is. A cél, hogy megközelítőleg 1 hét legyen az alkalmak között - a rendszeresség fontos.

Előadók: szerintem jobb, ha kevesebb előadó van. Amúgy nincs sok alkalom (lényegében 4), ezzel két ember is könnyen megbírkózik.

## Előadások

### Sorrend:

1. Bevezető
2. JavaScript alapok
3. HTML+CSS bevezető (csak hogy el tudjanak indulni)

### 1. Bevezető (60 perc, utána sörözés)

Mesélős főleg. Érdeklődés felkeltés.

Témák:

* A tanfolyamról: mi ez, miért jó, mit kapsz, mit nem kapsz, ilyesmi
* mi az a web
* chrome mint fullos dev környezet
    * demó: flickr kép letöltés, lájkolós oldal átverése (olyan oldalra gondolok, ahol csak lájk után nézheted meg a tartalmat)
* http alapok (hálózat nem kell, esetleg a címekről érdemes 2 szót mondani -- még jó hogy régeteges a felépítés. :))
    * network panel

### 2. JS alapok (90 perc)

TBA

### 3. HTML + CSS (90 perc)

Itt is lehet egy egyszerű file servert futtatni mindenkinél localban, és akkor a html formokat is megismerhetik és van eredménye is annak, amit csinálnak.

Szabi kidolgozza majd. :)

## Workshop

Egész napos. Veszünk némi üdítőt és aprósüteményt (pogácsát), ebédre pedig rendelünk pizzát. Erre jó lenne pénzt okosítani. Ez a code-retreaten is jól működött.

### Program

* Résztvevők érkezése 9:30
* Kezdés 10 óra
* 1. blokk (~12ig): picit haladóbb js, jquery
* ebéd (12-13 között)
* 2. blokk (13-15): önálló munka #1
* szünet (15-15:30)
* 3. blokk (15:30-17): önálló munka #2 és összegzés

Picit hosszú a program, de nem lesz feszített tempó. Közben lehet enni, inni, beszélgetni. Főleg az önálló munka alatt, én azt teljesen kötetlenül képzelem. Ott vagyunk minél többen a körből is, ha elakadnak segítünk. Valahogy úgy nagyjából, ahogy a code-retreaten is volt. Nekem az a forma kifejezetten szimpatikus volt.

A délelőtti blokkot lehet picit meghúzni, több infót beletolni. Délutánra már lazulás kell. A délelőtti blokk alatt vezetnénk fel az önálló feladatot is. Közösen kezdjük megoldani.

### Önálló feladat

Úgy kell kitalálni, hogy nagyon alap tudással is max 2-2 és fél óra legyen megoldani - tehát jó esetben az ügyesebbek már a 2. blokk alatt végeznek vele. Készülni kell extra feladattal is, ami már picit gondolkodósabb. Az önálló részt párban kell megoldaniuk.

Az önálló feladathoz kell egy referencia megoldás is. Az extra feladathoz már nem feltétlenül. Ott lehet, hogy elég ha csak vázlatosan van meg, hátha valaki otthon is foglalkozik vele. (^^ végtelen optimizmus)

A feladat egy egyszerű fórum alkalmazás lesz felhasználókezelés nélkül. A szervert megírjuk go-ban, így mindenki futtathatja a saját példányát localban és így többek között a same-origin kérdés is egycsapásra megoldódik.
