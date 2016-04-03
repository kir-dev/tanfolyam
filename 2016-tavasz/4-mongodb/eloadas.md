title: Mongodb
output: eloadas.html
theme: sudodoki/reveal-cleaver-theme

--

# Mongodb és mongoose
## **2016, Kir-Dev**
## Gulyás Gergely
#### g.gergely314@gmail.com

--

### Ismétlö kérdések

- Mi az a DOM?
- Mik azok a css selectorok?
- Mire jók a media queryk?

--

### Adatbázis

Miért jobb, mint egy file-ban tárolni az adatokat?
- Queryk
- Indexelés
- Hálózaton keresztül elérés
- Integritás
- Párhuzamos végrehajtások

--

### SQL

- Adatok tárolása táblákban egy adott sémára illeszkedve
- Alapvető adatbázis nyelv
- Sok féle adatbázis hasznája (MySQL, PostgreSQL, MSSQL, Oracle, stb.)
- Komplex lekérdezésekre tökéletes
- Nagyon érdemes tudni

--

### MongoDB

- Modern NoSQL adatbázis
- Document (javascript object) alapú
- Kezdőbarátabb :)

--

### MongoDB

- Database
- Collection
- Document
- Automatikus létrehozás a documentek alapján

--

### Document

~~~javascript
{ 
    "_id" : ObjectId("57015f268db46d04e6740a58"),
    "short_name" : "Kir-Dev",
    "long_name" : "Kollégiumi információs rendszer fejlesztők és üzemeltetők",
    "members" : [
        ObjectId("57015f268ae46d04e6740a54"),
        ObjectId("57015f263db43604e6740a55"),
        ObjectId("57015f2613546d04e6740a56")
    ]
}
~~~

- Séma nélküli
- Visszatekintés: JSON

--

### Lekérdezések

- Javascript console
- db object a belépési pont
- `db.collection.find()`
- `db.players.find({team: "Barcelona"})` : array
- `db.players.count()`
- `db.players.findOne({name: "Lionel Messi"})` : object
- `db.players.find({team: "Barcelona"}).sort({goals: 1})`
- Nem javascript parancsok
 - `show dbs`
 - `show collections`
 - `use footballdb`

--

### Insert, update

- `db.players.insert({team: "Diósgyőr", name: "Példa Péter"})` - autoindex
- ~~db.players.update({name: "Messi"}, {team: "Fradi"})~~
- `db.players.update({name: "Messi"}, {$set: {team: "Fradi"}})`
- Update 3. 4. paramétere:
 - Upsert
 - Multi
 - lényeg: false, true
 - `db.players.update({team: "Barcelona"}, {$set: {team: "Fradi"}}, false, true)`
- `db.players.remove({name: "Példa Péter"})`

--

### Operators

- Query operátorok
 - `$gt`, `$lt`, `$gte`, `$lte`, `$or`, `$not`, `$type`, `$size`, stb.
- Update operátorok
 - `$set`, `$inc`, `$push`, `$pop`, `$rename`, stb.

--

### Advanced mongodb

- Compound index
- Sparse index
- Replica set
- Sharding

--

# Mongoose

--

### Mongoose

- Node.js framework mongodb object modelingre
- Ad egy pár extrát a mongo console-hoz képest
- NPM (ki emlékszik? :) ) csomagként beszerezhető
- Egy adatbázis-kapcsolat objektum az egész alkalmazásnak (dal)
- Automatikus collection mapping: Player -> players

--

### Van séma

- Kötött hogy milyen mezők és milyen típusok vannak

        new mongoose.Schema({
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: function f() {
                    return new mongoose.Types.ObjectId();
                }
            },
            name: {
                type: String
            },
            goals: {
                type: Number
            },
            team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        });

--

### Update, insert

- `dal.Team.update({name: "Barcelona"}, {website: "http://barcelona.com"});`
- `dal.Player.update({_id: req.params.id}, {team: req.team});`
- Észrevétel: nem kell a $set

- `new dal.Player(name: "Sanyi").save();`
- Save hívással megy adatbázisba
- Itt is automatikus az id

--

### Populate

- SQL 'join'-jának felel meg
- Automatikusan behelyettesíti a dokumentumokba a referált másik dokumentumot
- `dal.Player.find().populate('team')`

        {
            _id: ObjectId("57015f263db43604e6740a55"),
            name: "Messi",
            team: {
                _id: ObjectId("57015f2613546d04e6740a56"),
                name: "Barcelona",
                website: "http://barcelona.com"
            }
        }

--

### Callbackek

- Utolsó paraméter vagy explicit exec() hívás
- MINDIG `err` és `doc` paraméter
- És MINDIG aszinkron!

        dal.Player.find().populate('team').exec(function (err, doc) {
            if(err) {
                res.error(500);
            } else {
                if(!doc) {
                    res.error(404);
                } else {
                    res.json(doc);
                }
            }
        });

        dal.Event.findOneAndUpdate({_id: req.params.id}, newEvent, function (err, doc) {
            if(err) {
                res.error(500);
            } else {
                res.end();
            }
        });

--

### Mit ír ki?

        for(var i = 0; i < 10; i++) {
            new dal.Numbers({num: i}).save(function(err, doc) {
                console.log("Save complete for: " + i);
            });
        }

--

### Helyette

        for(var i = 0; i < 10; i++) {
            new dal.Numbers({num: i}).save(function(err, doc) {
                console.log("Save complete for: " + doc.num);
            });
        }

--

# Kérdések?