
# MongoDB workshop feladatok

A feladat a már meglévő frontendhez egy adatbázisra épülő szervert írni. Az
elvárt API a README.mb fájlban található

Elsődleges feladat, hogy egy működő program kerüljön ki a kezetek közül. Nem
baj, ha nem minden részfeladat készül el, de amit megcsináltok, azt jól
csináljátok meg. Figyeljetek arra, hogy az elkészült kód igényes legyen.
Próbáljátok meg strukturálni és egységbe szervezni az összetartozó részeket.
Valamint a hibakezelésről se feledkezzetek meg - ne csak az egy jó utat vegyétek
számításba.

## Feladatok

### 1. Események lekérdezése

Készítsétek el az események tárolására az adatbázis-sémát. A megfelelő kérésre a szerver adja vissza az összes eseményt (még a helyszínekkel nem kell foglalkozni).

Ezt a feladatot _közösen_ oldjuk meg.

### 2. Helyszínek lekérdezése

Készítsétek el a helyszínek sémáját is. A helyszínek lekérésre a szerver adja vissza az összes helyszínt. Az eseményeknél pedig az API leírásnak megfelelően helyettesítse be a location helyére.

Helyszíneket nem lehet a felületről létrehozni, így erről a mongo console-ban gondoskodjatok.

### 3. Új esemény létrehozása

Újonnan létrehozott esemény mentése adatbázisba. Figyeljetek rá, hogy a kezdés előbb legyen, mint a befejezés, és a megadott helyszín létezzen! Az ütközésekkel még nem kell foglalkozni.

### 4. Egy helyszín eseményeinek kilistázása

Egy adott ID-jú helyszínen lévő összes esemény visszaadása. Figyeljetek rá, hogy a válasz mindig tömb legyen!

### 5. Bejelentkezés

Felhasználónévvel és jelszóval történő bejelentkezés.
Regisztráció még nincs, így a felhasználók felvitele is console-ból történik.
Figyeljetek a megfelelő hibaüzenetekre!

Opcionális feladat: Jelszavak hash-elve tárolása

### 6. Ütköző események vizsgálata

Eseményt létrehozni (és frissíteni) csak úgy lehessen, hogyha az az adott helyszínen nem ütközik más eseménnyel.

Próbáljátok kódismétlés nélkül megoldani!