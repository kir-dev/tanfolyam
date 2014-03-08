# HTML és CSS alapok
======

## Bevezetés
------

Az interneten nagyon sok tartalom megtalálható, ezek általában weboldalakon vannak elhelyezve. Az internet látható része többnyire ezekből a weboldalakból áll. 
A folyamat egyszerű. Jön a megrendelő egy ötlettel és vázolja az elgondolását. Miután minden lényeges információt kihúztunk belőle, ráállítjuk a grafikusunkat,
hogy csináljon valami szépet. Ezután jön a sitebuilder aki a kapott grafikát feldarabolja, és weboldalt készít belőle. Eközben, pedig a többi fejlesztő folyamatosan
reszeli a háttérben a back-endet, ami a kész oldalt megtölti majd tartalommal. Ez a tartalom nem lehet rendszerezetlen, ezért kell egy struktúrált nyelv ami 
gondoskodik arról, hogy megfelelően leírja, hogy a böngésző, meg tudja jeleníteni ezt a tartalmat. A HTML (Hyper Text Markup Language) egy ilyen nyelv. 
Leírja a szükséges struktúrát ahhoz, hogy a böngésző a számunkra megfelelő módon tudja megjeleníteni a tartalmat. Egymagában sajnos nem elegendő a HTML nyelv
mivel csak a struktúránkat írja le. Ha azt szeretnénk, hogy az oldalunk szép is legyen, akkor be kell vessük a CSS-t (Cascading Style Sheet), ami az oldal stílusát írja le. 

## HTML - HyperText Markup Language
------

### A dokumentum struktúrája
------

~~~html
<!DOCTYPE html>
<html>
<head>
    <title> Hi, this is my first website</title>
    <meta charset="utf-8"/>
</head>
<body>

</body>
</html>
~~~

Az első sor jelenti, a dokumentum verzióját. Habár a böngésző enélkül is megérti, hogy mit jelentenek a tagek érdemes kiírni a dokumentum elejére.
A `<html>` tagek között található maga a dokumentum, ami két részből áll. Az egyik a fejrész `<head>` a másik pedig a törzse `<body>`. A fejrészben
tudunk megadni mindenféle metaadatot, itt tudunk linkelni `.css` és `.js` fájlokat is. A `<title>` pedig az oldal címét jelenti, amit a böngésződ a
címsorában megjelenít. Az oldal további tényleges tartalmi mindig a `<body>` részen belülre kerül, így a továbbiakban ismertetett tageket ide bemásolva, tesztelhetitek a `.html` dokumentumot a böngészőtökben.
Vegyük észre, hogy két féle képpen tudunk tageket zárni. Az egyik a hagyományos nyitó és záró tages megoldás pl.: `<title></title>`, a másik pedig az önmagát lezáró tag pl.: `<meta/>`.

### Az alapvető HTML tagek
------

#### Címek

~~~html
<h1>Ez egy fontos cím</h1>
<h2>Ez egy cím</h2>
<h3>Ez egy cím</h3>
<h4>Ez egy cím</h4>
<h5>Ez egy cím</h5>
<h6>Ez annyira nem fontos cím</h6>
~~~

A fent lévő kódnak az eredménye a következő:

<h1>Ez egy fontos cím</h1>
<h2>Ez egy cím</h2>
<h3>Ez egy cím</h3>
<h4>Ez egy cím</h4>
<h5>Ez egy cím</h5>
<h6>Ez annyira nem fontos cím</h6>

#### Bekezdés

~~~html
    <p>
        The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.
    </p>
~~~

Ebben nincs semmi érdekes, maximum a szöveg. A bekezdéseket általában a `<p></p>` tagek közé szoktuk tenni. Ha kéne valami amivel fel akarjuk tölteni az oldalunk arra van a hagyományos [Lorem Ipsum](http://lipsum.com/) vagy a vagányabb megoldás a [Samuel L. Ipsum](http://slipsum.com/). Bármelyiket használhatjátok, bekezdések generálásának a céljára. (Aki nem látta a ponyvaregényt, miután elolvasta ezt a leírást megy és megnézi! (: ).

#### Szöveg formázió tagek

~~~html
    <p>
        The path of the <b>righteous</b> man is <i>beset on all sides</i> by the <u>iniquities of</u> the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds 
    </p>
~~~

Nem csak CSS-ből van lehetőségünk formázni a kinézetüket a betűknek, minimálisan a HTML nyelv is nyújt rá eszközöket. A `<b></b>` tag félkövérré teszi a közte levő tartalmat. Az `<i></i>` dőlt betűssé, az `<u></u>` pedig aláhúzza a szöveget.

#### Listák

Kétféle listát különböztetünk meg. A számozott (ordered) és a számozatlan lista (unoredered)

~~~html
<ul>
    <li>első elem</li>
    <li>második elem</li>
    <li>harmadik elem</li>
</ul>

<ol>
    <li>első elem</li>
    <li>második elem</li>
    <li>harmadik elem</li>
</ol>
~~~

Ennek a kimenete a következő:

<ul>
    <li>első elem</li>
    <li>második elem</li>
    <li>harmadik elem</li>
</ul>

<ol>
    <li>első elem</li>
    <li>második elem</li>
    <li>harmadik elem</li>
</ol>

Arra is lehetőségünk van, hogy listákat egymásba ágyazzunk.

~~~html
<ul>
    <li>első elem</li>
    <li>második elem</li>
    <li>
        <ul>
            <li>első elem</li>
            <li>második elem</li>
            <li>harmadik elem</li>
        </ul>
    </li>
</ul>
~~~

#### Képek

A képeket az `<img/>` önlezáró taggel tudjuk az oldalunkba beszúrni. Az `src` attribútumban tudjuk megadni a kép elérési útját, az `alt` attribútumban 
pedig azt tudjuk megadni, hogy mi legyen a szöveg ami megjelenik a kép helyén, hogyha a böngésző a képet nem tudja betölteni.

~~~html
<img src="mappa/kep.png" alt="ez egy kép"/>
~~~

#### Hivatkozások

A hivatkozással, vagy linkkel tudunk olyan tageket létrehozni, amelyek kattinthatóak lesznek és egy másik oldalra navigálnak bennünket. A tag `href` attribútumában kell megadni, hogy melyik weboldalra akarunk menni, és a nyitó és záró tag közé pedig azt a szöveget kell beírni, amit meg szeretnénk jeleníteni az oldalon.

~~~html
<a href="http://google.com">link a google oldalára</a>
~~~

Ez így fog számunkra megjelenni:

<a href="http://google.com">link a google oldalára</a>

### Összetett HTML tagek
------

#### Táblázatok

A táblázatokat, nem szeretjük az oldalunkon. Nagyon nehéz őket mobil felületeket megfelelően megjelenítani. Használatuk csak indokolt esetben javasolt.
Bár az előadáson nem fejtettem ki részletesen, lehetséges cellákat összevonni a táblázatban a `rowspan` és a `colspan` attribútumokkal.

~~~html
<table>
    <thead>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2">4</td>
            <td>6</td>
        </tr>
        <tr>
            <td>7</td>
            <td rowspan="2">8</td>
            <td>9</td>
        </tr>
        <tr>
            <td>10</td>
            <td>12</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>13</td>
            <td>14</td>
            <td>15</td>
        </tr>
    </tfoot>
</table>
~~~

Ennek a táblázatnak a megjelenítése így néz ki:

<table>
    <thead>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2">4</td>
            <td>6</td>
        </tr>
        <tr>
            <td>7</td>
            <td rowspan="2">8</td>
            <td>9</td>
        </tr>
        <tr>
            <td>10</td>
            <td>12</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>13</td>
            <td>14</td>
            <td>15</td>
        </tr>
    </tfoot>
</table>

#### Formok

A weboldalakon rengeteg lehetőség van adatok megadására, keresések elindítására. A regisztráció és a bejelentkezés alkalmával is formokat töltünk ki.
Ezeket a formokat a `<form>` taggel nyitjuk meg és a belsejében `<input />` mezőket hozunk létre. A form tagben lévő `method` attribútum mondja meg, hogy a form elküldésekor miként küldjük el a szervernek az adatot. Kétféle értéke lehet, az egyik a `GET`, amely az url mögé fűzi kulcs-érték párokként az `<input />` mezők értékeit, ahol a kulcs az input tag `name` attribútumában megadott érték lesz. A másik pedig a `POST` amely egy HTTP kérést küld el, és annak a törzsébe ágyazza be kulcs-érték párokként a mezők tartalmát. Ezeknek az `<input />` mezőknek több típusa lehet: `text, password, radio, checkbox, submit, reset`.
Az alábbi példában láthattok jópárat belük. A `<label>` címke (felirat) lehet egy mező számára. Meg tudjuk mondani, hogy melyik `<input />`-hoz tartozik, a `for`
attribútum segítségével.

~~~html
<form method="post">
    First name: <input type="text" name="firstname"><br>
    Last name: <input type="text" name="lastname"><br>

    <label for="sex-male">Male: </label><input type="radio" id="sex-male" name="sex" value="male"><br>
    <label for="sex-female">Female: </label><input type="radio" id="sex-female" name="sex" value="female"><br>

    <input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
    <input type="checkbox" name="vehicle" value="Car">I have a car <br>

    <input type="submit" value="Submit">
</form>
~~~

#### Div és span

A HTML dokumentumok jelenlegi talán két legfontosabb eleméről van szó. Az oldalak struktúrájának a felépítésekor ezeket használjuk leginkább. Ezeket a tageket arra használjuk, hogy csoportosítsuk az elemeinket egy struktúrába, beágyazzuk őket egy egységbe, hogy például együtt tudjuk őket mozgatni. Itt kitérnék egy fontos fogalomra mégpedig a `block` és `inline` elemekre. Ha valami blokk szintű elem akkor azt látjuk, hogy előtte és utána is található egy sortörés és ha nem mondjuk meg neki milyen széles legyen, akkor teljes szélességben kitölti a szülő elemet. A `<span>` ezzel ellentétesen inline elem, se előtte és se utána nem láthatunk sortörést és a bongésző egymás után rakja az ilyen elemekben lévő tartalmat. Volt már korábban blokk szintű elemekről szó, ilyenek például a címek, és inline elemekről is volt szó, ilyen például a kép `<img />`. 

## A HTML DOM
-------

A HTML DOM (Document Object Model) egy szabvány amit a W3C (World Wide Web
Consortium) elfogadott és lehetőséget kínál arra, hogy hogyan férjünk hozzá és hogyan
manipuláljuk a HTML dokumentumokat. A DOM maga egy platform és egy nyelv fü̈ggetlen
interfész, ami megengedi a programoknak és a scripteknek, hogy dinamikusan hozzáférjenek
elemekhez, majd pedig frissítsék a tartalmat, struktúrát és a stílust egy dokumentumban.

Ezek közül jelenleg minket a HTML DOM fog érdekelni. A HTML DOM-ban minden elemet
egy NODE reprezentál és az egész struktúrát egy fába rendezve lehet legkönnyebben
szemléltetni.

![html-dom][http://www.w3schools.com/js/pic_htmltree.gif]

A NODE egy doboz az ábrán. Minden egyes HTML tag amit beleírunk a dokumentumba
illetve azok attribútumai és értékei egy ilyen NODE-dá képződnek. Láthatjuk, hogy az
egymásban lévő elemek, hogyan kapcsolódnak egymáshoz.

![navigation][http://www.w3schools.com/js/pic_navigate.gif]

A NODE-ok között különböző kapcsolati viszonyok állhatnak fent. A DOM fa legfelső elemét
gyökérnek nevezzük (root). Ez a három kapcsolati viszony:

* szülő - a szülő NODE-nak lehetnek gyerekei
* gyerek - gyerek - minden egyes gyerek NODE-nak van szülője kivéve a fa gyökerének
* testvér - a testvére azok a NODE-ok amelynek közös a szülőjük

## CSS - Cascading Style Sheet
------

Eddig a weboldalunk stuktúráját írtuk le, a következőkben pedig a megformázásával fogunk foglalatoskodni. A CSS lehet külön fájlba írni, vagy pedig az oldal `<head>` részében egy nyitott `<style type="text/css"></style>` tagek közé is írhatjuk. Ha külön fájlba írjuk akkor azt szintén az oldal `<head>` részében linkelnünk kell. Ezt a következő kód beillesztésével tehetjük meg:

~~~html
<link rel="stylesheet" type="text/css" href="assets/css/main.css"/>
~~~

A fájl elérés utját a már ismert `href` attribútumban adhatjuk meg.

#### A dokumentum elemeinek az elérése

A dokumentum elemeit három féle képpen tudjuk elérni.

* magán a tag nevén, de ez befolyásolja az összes ilyen nevű elemet
* egy (egyedi) azonosítón keresztül, amit attributumként megadhatunk, `id`
* css osztályokon keresztül, amit ha szeretnénk több elemere is definiálhatunk `class`

Példa mindhárom módszerre:

~~~html
<head>
    <style type="text/css">
    
    /*a tag nevén keresztül*/
    p {
        color: red;
    }

    /*id-n keresztül*/
    #header {
        color: red;
    }

    /*class-on keresztül*/
    .post {
        color: red;
    }

    </style>
</head>
<body>
    <p> bekezdés </p>
    <p> bekezdés </p>

    <div id="header">
        az oldal headerje lesz majd
    </div>

    <div class="post">
        egy post az oldalon
    </div>

    <div class="post">
        egy másik post az oldalon
    </div>
</body>
~~~

Innentől kezdve, hogy elérjük a html dokumentumunk elemeit a kapcsos zárójelben megadott tulajdonságok érvényesek lesznek az adott elemre. 
Több kategóriába soroljuk a stílusokat, a következőkben ezeket fogjuk kifejteni.

#### A Szövegformázió stílusok

~~~css
color: #000000; /*a betűk színe, hexadecimálisan, rgb(), rgba(), szín-neve-angolul*/
font-family: Arial, Helvetica; /*a betű típusa (font-face)*/
font-size: 15px; /*a betű mérete*/
font-weight: 400; /*a betű vastagsága 100-tól, 900-ig hasonló a boldhoz*/
font-style: italic; /*a betű stílusa, bold*/
letter-spacing: 15px; /*betűköz*/
line-height: 15px; /*sorköz*/
text-align: center; /*szöveg kizárása, left, right, center, justify*/
text-decoration: underline; /*szöveg dekorálása*/
text-shadow: 0px 1px 2px #000000; /*árnyék, left, top, blur, color*/
text-transform: uppercase; /*csupa nagy betű, kis betű, kapitalizált stb.*/
~~~

#### Háttér és keret formázások

~~~css
background-attachment: fixed; /*görgethető legyen a háttér vagy ne*/
background-color: red; /*háttér színe*/
background-image: url(‘images/ pic.png’); /*háttérkép*/
background-position: left top; /*a háttér pozicioja*/
background-repeat: no-repeat; /*a hatter ismetlese*/
background: transparent url(‘../images/pic_holder.png’) top left norepeat; /*itt megadhatjuk mindezt egyszerre is*/
border-width: 2px; /*border vastagsága*/
border-color: #234f8a; /*border színe*/
border-style: solid; /*stílusa*/
border: 3px solid dashed; /*megadható egyszerre itt is*/
border-top: 3px solid dashed; /*csak felső margó az elemre left, right, bottom is lehetséges*/
border-radius: 2px; /*a sarkok lekerekítése bizonyos sugárral*/
box-shadow: 0px 3px 4px #000000; /*árnyéka az elemnek*/
~~~

### A DOM manipulációja
-----

#### Floatolás

Sokszor szükség van arra, hogy több elem egymás mellé kerüljön. Sajnos ez a blokk szintű elemek esetében nem lehetséges, de ilyenek a listák is. A floatolás segítségével képesek vagyunk egymás mellé lebegtetni az adott elemeket.

~~~css 
li {
    float: left; /*lehetséges jobbra is: right;*/
}
~~~

#### Pozicionálás

Három különböző módon tudunk pozicionálni egy elemet. Az első lehetőség a `fixed` vagyis fix helyzetbe kerül, ezt sok weboldalon láthatjuk pl menük esetében. Amikor görgetsz a menü mindig a képernyő tetején marad. A második megoldás a `relative`


