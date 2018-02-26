Kir-Dev tanfolyam mongo workshop
==========================

Feladatok leírása
----------
### Adatbázis létrehozása

Hozzatok létre egy adatbázis modelt.

Íz:
    Fajta
Dohány:
    Íz
    Ár
    Mennyiség
    Tulajdonos neve, szobaszáma (Később felhasználó)
Szén:
    Ár
    Mennyiség
    Tulajdonos
Felhasználó:
    Név
    Szobaszám
    E-mail
    jelszó (bcryptjs)

Middleware-ek a lekérdezésekhez.

### Keresés

Lehessen keresni termékeket íz vagy felhasználó alapján.

### Felhasználókezelés

Lehessen regisztrálni az oldalra, bejelentkezni. Aszerint, hogy be van-e jelentkezve módosuljon a view.

Dohány táblán referencia a felhasználóra.

(passport-local)

### Jogosultság

Új terméket csak bejelentkezett felhasználó tudjon felvenni

### Facebook vagy AuthSCH bejelentkezés

https://developers.facebook.com/ (passport-facebook)
https://auth.sch.bme.hu/        (passport-OAuth2)

