## API

GET kérésekre JSON választ vár a frontend, POST kérésekre pedig egy egyszerű HTTP 200-at.
Hiba esetén egy

	{
		error: "Már létezik ilyen felhasználónév"
	}

struktúrájú hibaüzenet legyen a válasz.

### Események kilistázása

	GET /event

Válasz:
	
	[
		{
			id: 5
			title: "Kir-Dev gyűlés",
			start: 2016-04-05T18:00:00Z,
			end: 2016-04-05T19:30:00Z,
			location: {
				id: 51,
				title: "Szakkoli iroda",
				address: "Schönherz Zoltán Kollégium, 1320-as szoba"
			}
		}
	]

### Új esemény felvétele

	POST /event/create

Kérés törzse:

	{
		title: "Ruby meetup",
		start: 2016-03-30T19:00:00Z,
		end: 2016-03-30T21:00:00Z,
		location: 23
	}

##### Lehetséges hibák:

* Nem létezik a megadott id-val helyszín
* A kezdés később van, mint a befejezés
* Az adott helyszínen van ütköző esemény

### Esemény frissítése

	POST /event/update/:id

Kérés törzse:

	{
		title: "Ruby meetup",
		start: 2016-03-30T19:00:00Z,
		end: 2016-03-30T21:00:00Z,
		location: 23
	}

##### Lehetséges hibák:

Ugyanaz, mint az esemény létrehozásánál

### Helyszínek kilistázása

	GET /location

Példaválasz:

	[
		{
			id: 3,
			title: "Prezi HQ",
			address: "Budapest, Nagymező u. 54."
		}
	]

### Egy helyszínen lévő események lekérése

	GET /location/:id

Válasz:

	[
		{
			id: 1
			title: "Körvacsora",
			start: 2016-05-05T16:00:00Z,
			end: 2016-05-05T22:30:00Z,			
		}
	]

### Bejelentkezés

	POST /login

Kérés törzse:

	{
		username: "salierri",
		password: "jelszo123"
	}

##### Lehetséges hibák:

* Már létezik az adott felhasználónév
* Túl rövid a jelszó (8 karakter)
