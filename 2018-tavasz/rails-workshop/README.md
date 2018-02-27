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
Legyen egy `/items/buy/:id` route ami renderkor egy `@item` változóban adja tovább az aktuálisan vásárolandó itemet a view-nak. Az Item modelnek legyen egy description függvénye ami emberi formában írja le a terméket (pl.: "Geritől a 1320 szobából Kétalmás íző dohány").

## 5. Vásárlás megerősítése
Hozzatok létre egy `POST /items/buy/:id` route-ot `confirm` [névvel](http://guides.rubyonrails.org/routing.html#overriding-the-named-helpers), ami egy quantity paramétert vár, és az adott itemből levesz a quantitynek megfelelő mennyiséget

-----

## 6. Uj dohany felvetele
Adj hozza az application.html.erb-hez egy uj menupontot, ami a new_falvor_path-re mutat.
Hozz letre egy formot (form_helper), ahol megadhatod a felvetendo uj dohany izt.
A formot POST method-dal a /flavors cimre kuld el.

## 7. Dohany izek listazasa
A /view/flavors/index.html.erb-ben hozz letre egy tablazatot ahol megjelenited a megkapott dohanyok (@flavors) neveit es markajukat.

## 8. Uj termek felvetele FIX
Jelenleg nem lehet uj termeket felvenni, mert korabban a dohany iz nevet szovegesen taroltuk, most pedig a Dohany iz tablaban hivatkozunk egy elemre.
A feladat az, hogy modositsuk az /item/new view-t ugy, hogy az iznel, a beviteli mezo helyett, egy legordulo lista szerepeljen az osszes dohanny izzel.

## 9. Elfogyott termekek listazasa
A views/items/unavaliable fajlban listazd ki az elfogyott termekeket (`@out_of_items`)
Legyen az oldalon egy gomb ami meghivja a `DELETE /items/unavaliable` cimet, es kitorli az osszes olyan termeket, aminek a darabszama 0.
(a view-t es a controller fv-t is neked kell megirni)

## 10. Kaminari gem hasznalálata
Állítsd be, hogy a termekek listazasakor, alapbol 3 termek jelenjen meg, es lehessen lapozni a tovabbi termekek kozott.
URL parameterben meg lehessen adni, hogy egy oldalon mennyi termek jelenjen meg.


