var obj = {};

// uj mező hozzáadása
obj.number = 42;

console.log(obj.number);

// string kulcsok és dot notation
console.log(obj["number"]);
obj["hello"] = "Szia";
console.log(obj.hello);

// kulcs bármilyen típusú lehet
var obj2 = {};
obj2[1] = 10;
obj2[{}] = 42;
obj2[true] = "igaz";

console.log(obj2);
console.log(obj2[{}]);

// JSON

var o = {
    theTruth: 42,
    apple: "alma",
    orange: "narancs"
};

var json = JSON.stringify(o);
console.log(json);
var o2 = JSON.parse(json);
console.log(o2);