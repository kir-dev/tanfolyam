Kir-Dev tanfolyam workshop
==========================

Fejlesztés
----------

A feladatokhoz klónozd le ezt a repositoryt, amit a `git clone https://github.com/kir-dev/tanfolyam.git` paranccsal tudsz megtenni.
Ezután a **tanfolyam/2017-tavasz/alap** mappában találod a kiinduló programkódot.

A webszervert a **stewie.sch.bme.hu** címen éritek el (ezen belül a `/api/topics/` 
route-okat kell majd használni)

A chrome-ban fejlesztéshez ki kell kapcsolni a Same-Oigin-Policy-t, hogy el tudd érni a 
szervert localhostról. Ehhez speciális paraméterekkel kell indítani a Chrome-ot az alábbiak alapján:

Linux:

`google-chrome --disable-web-security --user-data-dir="/akarmi"`

OSX:

`open -a Google\ Chrome --args --disable-web-security --user-data-dir="/akarmi"`

Windows: A chrome mappájából (C:\Program Files (x86)\Google\Chrome\Application)

`chrome.exe --disable-web-security --user-data-dir="C:/akarmi"`

Ha jól csináltad, a chrome szólni fog hogy instabil és nem biztonságos ilyet művelni.

Ha más böngészőt szeretnél használni, Firefox-ban az `about:config` oldalon a `security.fileuri.strict_origin_policy` bejegyzést kell `false`-ra állítani, Safariban pedig a _Settings>Advanced>Show Development In Menu Bar_, majd _Disable Cross-Origin Restrictions_

API leírás
----------

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

### Témák listázása

    GET /api/topics[?page=num]

A listázásnál opcionálisan megadhatjuk, hogy melyik oldalt akarjuk lekérni.

Egy példaválasz:

    {
      "status_code": 200,
      "topics": [
        {
          "id": 1,
          "title": "Kir-Dev",
          "description": "Kir-Dev szakmai kibeszélő",
          "last_post_date": "2014-03-19T19:17:04.441315438+01:00"
        },
        {
          "id": 2,
          "title": "Tanfolyam",
          "description": "Tanfolyam vélemények",
          "last_post_date": "2014-03-18T19:17:04.441315438+01:00"
        },
        {
          "id": 3,
          "title": "Macskás gif",
          "description": "Macskás gifek minden alkalomra",
          "last_post_date": "2014-03-19T20:17:04.441315438+01:00"
        }
      ]
    }

### Egy téma lekérdezése

    GET /api/topics/{id}[?page=num]

A kért téma adataival együtt a témához tartozó hozzászólások is benne vannak a
válaszban. A hozzászólások lapozásához a `page` paraméter opcionálisan megadható.

A válasz felépítése:

* status_code: minden válaszban jelen van, siker esetén 200
* posts: egy tömb a hozzászólások részleteivel (hozzászólás részleteit lásd lejjebb)
* topic: a téma részletei

Egy példa:

    {
      "status_code": 200,
      "topic": {
        "id": 1,
        "title": "Kir-Dev",
        "description": "Kir-Dev szakmai kibeszélő"
      },
      "posts": [
        {
          "id": 1,
          "timestamp": "2014-03-19T19:17:04.441315438+01:00",
          "author": "me",
          "content": "lorem ipsum dolor sit amet",
          "reply_to": 0
        }
      ]
    }

### Új téma hozzáadása

    POST /api/topics/new

A kérés törzse legyen JSON és tartalmazza a következő adatokat:

    {
        "title": "téma címe",
        "description": "téma rövid leírása"
    }

201-es statuszú válasz jön siker esetén

### Egy hozzászólás lekérdezése

    GET /api/topics/{topicId}/posts/{postId}

Egyetlen hozzászólás lekérdezése id alapján.

Egy hozzászólása adatai:

* id: a hozzászólás azonosítója, >= 1
* timestamp: a hozzászólás létrehozásának az időpontja
* author: a hozzászólás szerzője
* content: a hozzászólás tartalma
* reply_to: annak a hozzászólásnak az azonosítója, amelyikre válaszként
    érkezett ez a hozzászólás. Ha ilyen nincs, akkor az értéke 0.

Egy példa válasz:

    {
      "status_code": 200,
      "post": {
        "id": 1,
        "timestamp": "2014-03-19T19:17:04.441315438+01:00",
        "author": "me",
        "content": "lorem ipsum dolor sit amet",
        "reply_to": 0
      }
    }

### Új hozzászólás

    POST /api/topics/{topicId}/posts/new

Új hozzászólás egy témához. A POST kérés törzse a következő JSON tartalmazza:

    {
        "author": "hozzászólás szerzője",
        "content": "hozzászólás tartalma",
        "reply_to": "opcionálisan annak a hozzászólásnak az id-ja, amire válaszolunk"
    }

201-es statuszú válasz jön siker esetén
