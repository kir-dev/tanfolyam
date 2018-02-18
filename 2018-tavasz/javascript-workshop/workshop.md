Kir-Dev tanfolyam workshop
==========================

Feladatok leírása
----------
### 1. Dohánytermékek listázása

Listázzátok ki a dohánytermékeket egy oldalon.

hint: $.get('url').then(...);

### 1.2

Gombra kattintva legyen lehetőség "vásárolni" a termékből. (lásd API leírás)

hint: frissítse a listát

### 2. Szenek listázása

Az előző feladathoz hasonlóan a szeneket is listázzátok ki, anélkül hogy az oldalt újratöltenétek. 

### 3. Új dohánytermék felvétele

Az eladás gombra kattintva navigáljon el az eladás oldalra, ahol egy form segítségével lehet új terméket felvinni. Minden mező legyen kötelező.

### 3.2 Ízek listázása

A form-ban lévő üres select tag-et töltsétek fel a lehetséges ízekkel.

### 4. Új szén felvétele

Az oldal újratöltése/oldalról elnavigálás nélkül jelenjen meg a szén eladására szolgáló form, a dohányé ne legyen közben látható.

### 5. Új íz felvétele

Az új íz felvétele gombra kattintva lehetőség legyen új ízt küldeni a szerverre.



API leírás
----------

Szerver IP címe: 152.66.211.46:3335

Az API minden válaszban JSON-t küld. A válasz JSON-ben a HTTP státusz kód mindig
benne van.

Hiba esetén a válasz törzsének a szerkezete mindig a következőképpen alakul:

    {
        "status_code": HTTP-STATUS-CODE,
        "message": "a hiba leírása"
    }

Használt státusz kódok:

* 400: rosszul formázott kérés (pl id vagy a kérés törzsében a json rossz formátumú)
* 404: erőforrás nem található
* 500: belső hiba

### Dohánytermékek listázása

    GET /dohany

Egy példaválasz:

~~~javascript
    [
        {
            "_id": "5a8977b571af7e1c58bb69d9",
            "owner": "Fenyike",
            "roomNumber": 916,
            "taste": {
                "_id": "5a86c1e95d721520bc9f8867",
                "name": "Almás",
                "createdAt": "2018-02-16T11:35:05.249Z",
                "updatedAt": "2018-02-16T11:35:05.249Z",
                "__v": 0
            },
            "price": 499,
            "count": 10,
            "createdAt": "2018-02-18T12:55:17.970Z",
            "updatedAt": "2018-02-18T13:07:54.352Z",
            "__v": 0
        },
        {
            "_id": "5a8977b871af7e1c58bb69da",
            "owner": "Zsoltika",
            "roomNumber": 1605,
            "taste": {
                "_id": "5a86c1e95d721520bc9f8867",
                "name": "Mentás",
                "createdAt": "2018-02-16T11:35:05.249Z",
                "updatedAt": "2018-02-16T11:35:05.249Z",
                "__v": 0
            },
            "price": 399,
            "count": 5,
            "createdAt": "2018-02-18T12:55:20.676Z",
            "updatedAt": "2018-02-18T14:55:19.648Z",
            "__v": 0
        }
    ]
~~~
### Dohányízek listázása

    GET /iz

Egy példaválasz:

~~~javascript
    [
        {
            "_id": "5a898f395b59a6657cff1371",
            "name": "Almás",
            "createdAt": "2018-02-18T14:35:37.349Z",
            "updatedAt": "2018-02-18T14:35:37.349Z",
            "__v": 0
        },
        {
            "_id": "5a898f405b59a6657cff1372",
            "name": "Citromos",
            "createdAt": "2018-02-18T14:35:44.585Z",
            "updatedAt": "2018-02-18T14:35:44.585Z",
            "__v": 0
        }
    ]
~~~
### Szenek listázása

    GET /szen

Egy példaválasz:

~~~javascript
    [
        {
            "_id": "5a8967348be64e19a830d6d2",
            "owner": "Fenyike",
            "roomNumber": 916,
            "price": 400,
            "count": 10,
            "createdAt": "2018-02-18T11:44:52.837Z",
            "updatedAt": "2018-02-18T11:44:52.837Z",
            "__v": 0
        },
        {
            "_id": "5a8968bb8be64e19a830d6d4",
            "owner": "Zsolika",
            "roomNumber": 1605,
            "price": 250,
            "count": 10,
            "createdAt": "2018-02-18T11:51:23.043Z",
            "updatedAt": "2018-02-18T11:51:23.043Z",
            "__v": 0
        }
    ]
~~~
### Új szén hozzáadása

    POST /dohany

A kérés törzse legyen JSON és tartalmazza a következő adatokat:

~~~javascript
    {
            "name": "Fenyike",
            "roomNumber": 1605,
            "price": 350,
            "count": 6,
            "taste": "5a8941df5dd36f31f4e6a9d4"  //Egyedi ID
    }
~~~javascript
### Új íz hozzáadása

    POST /iz

    {
            "tasteName": "Almás-Fahéjas",
    }
~~~
### Új szén hozzáadása

    POST /szen
~~~javascript
    {
            "name": "Fenyike",
            "roomNumber": 1605,
            "price": 350,
            "count": 6,
    }
~~~
### Dohány vásárlás

    POST /dohany/{id}/vasarlas

### Szén vásárlás

    POST /szen/{id}/vasarlas

### Dohány/Szén/Íz törlése

    DELETE /dohany/{id}
    DELETE /iz/{id}
    DELETE /szen/{id}
