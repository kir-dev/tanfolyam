
Db setup:

use footballdemo
db.players.insert({team:"Barcelona", name: "Neymar"})
db.players.insert({team:"Barcelona", name: "Messi"})
db.players.insert({team:"Barcelona", name: "Suárez"})
db.players.insert({team:"Real Madrid", name: "Ronaldo"})
db.players.insert({team:"Real Madrid", name: "Pepe"})

Lekérdezések:

show dbs
use footballdemo
show collections
db.players.find()
db.players.count()
db.players.find({team: "Barcelona"})
db.players.findOne({name: "Messi"})
db.players.findOne()

