# Feladatok

## 0. Termékek kilistázása
Hozzatok létre egy route-ot, ahol az összes terméket kilistázzuk. Az index view egy `@items` változóban várja a termékeket. Az alkalmazás root-ja is mutasson ide.

## 1. Új termék felvétele
Hozzatok létre egy route-ot (`GET /items/new`), ami az új termék felvételére mutat ('new' view), majd egy másikat ahol el lehet menteni a létrehozott terméket (`POST /items`). Elmentés után irányítson vissza a főoldalra, és [Flash notice-ben](http://api.rubyonrails.org/classes/ActionDispatch/Flash.html) szóljon hogy sikeres volt a mentés.

## 2. Validációk
Hiába kapcsoljuk ki a 'dohány íze' mezőt, ha hamarabb írunk bele (és egyéb trükkökkel) szénnek is tudunk ízt adni. Erre csináljatok egy ellenőrzést. Továbbá legyen ellenőrzés a szobaszámra is, csak Schönherzben létező szobaszámokat lehessen beírni. Hiba esetén irányítson vissza a létrehozás oldalra, és flash errorban szóljon a hibáról.

## 3. Név és szobaszám megjegyzése
Mentéskor jegyezze meg (cookie-ban `:name` és `:room_number`) a nevedet és a szobaszámodat, hogy a következő létrehozáskor automatikusan ki tudja tölteni.

## 4. Vásárlás felülete
Legyen egy `/items/buy/:id` route ami renderkor egy @item változóban adja tovább az aktuálisan vásárolandó itemet a view-nak. Az Item modelnek legyen egy description függvénye ami emberi formában írja le a terméket (pl.: Geritől a 1320 szobából Kétalmás íző dohány).

## 5. Vásárlás megerősítése
Hozzatok létre egy `POST /items/buy/:id` route-ot `confirm` névvel, ami egy quantity paramétert vár, és az adott itemből levesz a quantitynek megfelelő mennyiséget
