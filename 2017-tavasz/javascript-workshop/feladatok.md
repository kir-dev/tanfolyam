# Web alapozó workshop feladatok

A feladat az előre elkészített fórum szoftverhez felhasználói felületet írni. A
szerver által nyújtott API leírása a workshop.md fájlban található.

Elsődleges feladat, hogy egy működő program kerüljön ki a kezetek közül. Nem
baj, ha nem minden részfeladat készül el, de amit megcsináltok, azt jól
csináljátok meg. Figyeljetek arra, hogy az elkészült kód igényes legyen.
Próbáljátok meg strukturálni és egységbe szervezni az összetartozó részeket.
Valamint a hibakezelésről se feledkezzetek meg - ne csak az egy jó utat vegyétek
számításba.

A feladatok megoldása közben figyeljetek a felhasználói élményre is.
Használjátok az előadáson bemutatott HTML és CSS elemeket.

## Feladatok

### 1. Témák listázása

Listázzátok ki a témákat egy oldalon. Az egyes témákról lehessen a témához
tartozó hozzászólásokhoz navigálni.

Ezt a feladatot _közösen_ oldjuk meg. A megoldást a tanfolyam anyagokat tartalmazó
repoban is megtaláljátok.

### 2. Új téma felvitele

Legyen lehetőség egy formon keresztül új témát felvenni. Egy új témához a címét
és a leírását kell megadni. A cím és a leírás megadását tegyük kötelezővé.
Tipp: Az elküldött adatnak JSON.stringify()-olva kell lennie

### 3. Egy téma megjelenítése

Egy téma adatainak és a hozzá tartozó hozzászólásoknak a megjelenítése.

### 4. Új hozzászólás felvitele

Az előző feladatban létrehozott oldalt egészítsük ki egy formmal, ahol új
hozzászólást lehet megadni. Egy hozzászóláshoz a következő adatokat kell
mindenképpen megadni:

* szerző
* tartalom

A fenti két mező kitöltését tedd kötelezővé a felhasználó számára!

### 5. Lapozás

A témákat valamint a hozzászólásokat listázó oldalon lehessen lapozni. Azaz ne
jelenítse meg az oldal az összes témát/hozzászólást egyszerre.

### 6. Válasz a hozzászólásra

Alakítsuk át az új hozzászólás formot úgy, hogy lehessen egy adott hozzászólásra
válaszolni. Valamint a hozzászólások megjelenítésénél jelezzük, hogy az adott
hozzászólás válasz-e vagy sem. És ha igen, akkor melyik hozzászólásra válaszol.

### 7. Szerző megjegyzése

Jegyezzük meg a szerzőt és előre töltsük ki a megfelelő mezőt a formon.


