
## Feladatok:

### 1. feladat:
Generalj **User** modelt, controllert es view-kat scaffold-dal, a kovetkezo
mezokkel: name: string, date_of_birth: date, introduce: text


### 2.feladat:
Keszits egy helper metodust az application controller-be `current_user` nevvel, ahol egy osztaly szintu valtozoban tarold el az adatbazisban tarolt elso User-t
Helyezz fel a menube a bejelentkezes gombot, aminek a megnyomasara sutiben tarold el, hogy melyik user-rel vagy bejelentkezve.

### 3.feladat:
Generalj le egy **Group** modelt, controllert es view-kat scaffold-dal, a kovetkezo mezokkel:
name: string, description: text
Generalj le egy **Membership** modelt es controllert ami legyen egy kapcsolo tabla a **User** es a **Groups** tablak kozott es a kovetkezo mezoi legyenek: admin: boolean,

### 4.feladat:
Modositsd a route file-t ugy, hogy a membership a group-ba agyazott resource legyen. (Nested resource)

### 5.feladat:
Modositsd a Group controller megfelelo metodusat ugy, hogy amikor letrejon egy kor, akkor az aktualis user tagja legyen adminkent a kornek (Membership)

### 6.feladat:
Hozz letre egy Csatlakozas gombot a Group oldalon.
A gombra kattintva hozz letre egy Membership-et a Group es a User kozott ugy az ne legyen admin.

### 7.feladat:
A Group oldalan, a jelentkezes gomb csak akkor jelenjen meg, ha az aktualis user meg nem tagja annak.

### 8.feladat:
Generalj egy Article-t scaffold-dal, ami a Grouphoz tartozzon.

### 9.feladat:
Egy Article-t csak a hozza tartozo Group adminja torolhessen.

