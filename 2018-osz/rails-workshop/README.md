
## Feladatok:

### 1. feladat:
Generálj **User** modelt, controllert es view-kat scaffold-dal, a következő mezőkkel: _name_: string, _date_of_birth_: date, _introduce_: text


### 2.feladat:
Készíts egy helper metódust az application controller-be `current_user` névvel, ahol egy osztály szintű változoban tárold el az adatbazisban tárolt első User-t
Helyezz fel a menübe a bejelentkezés gombot, aminek a megnyomására sütiben tárold el, hogy melyik user-rel vagy bejelentkezve.

### 3.feladat:
Generálj le egy **Group** modelt, controllert es view-kat scaffold-dal, a következő mezőkkel:
name: string, description: text
Generálj le egy **Membership** modelt es controllert ami legyen egy kapcsoló tábla a **User** es a **Groups** táblák között és a következő mezője legyen: _admin_: boolean

### 4.feladat:
Módosítsd a route file-t úgy, hogy a membership a group-ba ágyazott resource legyen. (Nested resource)

### 5.feladat:
Módosítsd a Group controller megfelelo metódusát úgy, hogy amikor létrejön egy group, akkor az aktuális user tagja legyen adminként a group-nak (Membership)

### 6.feladat:
Hozz létre egy Csatlakozás gombot a Group oldalon.
A gombra kattintva hozz látre egy Membership-et a Group es a User között úgy, hogy az ne legyen admin.

### 7.feladat:
A Group oldalán, a jelentkezés gomb csak akkor jelenjen meg, ha az aktuális user még nem tagja annak.

### 8.feladat:
Generálj egy Post-ot scaffold-dal, ami a Grouphoz tartozzon.

### 9.feladat:
Post-ot csak ahoz a Group-hoz hozzhass létre aminek a tagja vagy.

### 10.feladat:
Egy Post-ot csak a hozzá tartozó Group adminja törölhessen.

