# Feladatok

### Fejlesztés

* Klónozd le a tanfolyam repót
* Installáld a csomagokat `npm install` paranccsal
* Az alkalmazást `npm start`-al tudod indítani

### API

* A szerver-kliens kommunikáció JSON formában történik
 * Figyeljetek a válaszok stringify-okására!
* A workshopon még nem használunk adatbázisokat, így a middleware/module.js `posts` tömbjében fogjuk tárolni a posztokat

### 1. Feladat

#### Poszt hozzáadása

    POST /board/add

Request törzsében érkezik json:

    {
        "name": "Geri",
        "message": "Szeretem a Javascriptet!"
    }

### 2. Feladat

#### Posztok kilistázása

	GET /board

Elvárt struktúra:

	[
		{
	        id : 3,
	        name: "Krisztián",
	        message: "Node rocks!",
	        date: "2016.03.28. 16:10.",
	        likes: 0,
	        comments: [{
	        	name: "Geri",
	        	comment: "Indeed."
	        }]
	    }
    ]

### 3. Feladat:

#### Poszt 'likeolása'

	POST /board/like

Body:

    {
        "postId": 5
    }

### 4. Feladat

#### Poszt-ra kommentelés

	POST /board/comment

Body:

    {
    	postId: 5,
    	name: "Geri",
    	comment: "Indeed."
    }

### 5. Feladat

#### Poszt törlése

	DELETE /board/delete/:postId

Válasz:

	Deleted post: {postId}

### 6. Feladat

#### Felhasználónév megjegyzése

	POST /login

Body:

    {
    	username: "Geri",
    }

Ehhez a feladathoz létre kell hoznotok egy új struktúrát (itt is tömb ajánlott), amiben a felhasználókat tudjátok tárolni

    GET /logout


    GET /who


Válasz:

`username` szövegként
