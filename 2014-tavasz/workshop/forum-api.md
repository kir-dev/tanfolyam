Kir-Dev tanfolyam workshop
==========================

Ebben a fájlban található a workshopon használt fórum-szerver apijának a
részletes leírása.

Az API minden válaszban JSON-t küld. A válasz JSON-ben a HTTP státusz kód mindig
benne van.

Hiba esetén a válasz törzsének a szerkezete mindig a következőképpen alakul:

    {
        "status_code": HTTP-STATUS-CODE,
        "message": "a hiba leírása"
    }

Használt státusz kódok:

* 400: rosszul formázott kérés (pl id vagy a kérés törzsében a json rossz formátumú)
* 404: erőforrás (pl téma) nem található
* 500: belső hiba

Elérhető végpontok
------------------

### Témák listázása

    GET /topics[?page=num]

A listázásnál opcionálisan megadhatjuk, hogy melyik oldalt akarjuk lekérni.

### Egy téma lekérdezése

    GET /topics/{id}[?page=num]

A kért téma adataival együtt a témához tartozó hozzászólások is benne vannak a
válaszban. A hozzászólások lapozásához a `page` paraméter opcionálisan megadható.

### Új téma hozzáadása

    POST /topics/new

A kérés törzse legyen JSON és tartalmazza a következő adatokat:

    {
        "title": "téma címe",
        "description": "téma rövid leírása"
    }

201-es statuszú válasz jön siker esetén

### Egy hozzászólás lekérdezése

    GET /topics/{topicId}/posts/{postId}

Egyetlen hozzászólás lekérdezése id alapján.

### Új hozzászólás

    POST /topics/{topicId}/posts/new

Új hozzászólás egy témához. A POST kérés törzse a következő JSON tartalmazza:

    {
        "author": "hozzászólás szerzője",
        "content": "hozzászólás tartalma",
        "reply_to": "opcionálisan annak a hozzászólásnak az id-ja, amire válaszolunk"
    }

201-es statuszú válasz jön siker esetén
