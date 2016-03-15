
//Típusos demó

console.log("hello world:", typeof "hello world");
console.log("42:", typeof 42);
console.log("12.2:", typeof 12.2);
console.log("true:", typeof true);
console.log("null:", typeof null);
console.log("undefined:", typeof undefined);
console.log("variable:", typeof variable);
console.log("console.log:", typeof console.log);
console.log("typeof 42:", typeof typeof 42); // typeof eredménye mindig string
console.log("array:", typeof []); // és minden más is

//Tömbök demó

//Deklaráció
[]
[1,2,3,4]
[1, "a", [], true]

//Dinamikus
var t = [5,6,7,8];
t[4] = 9;
t // [5,6,7,8,9]

//Bárhol indexelhető
t[10] = 10;
t // [5, 6, 7, 8, 9, undefined × 5, 10]

//Length tulajdonság
t.length // 10

//Iterálás for ciklussal

//Stack is
var days = ['H', 'K', 'Sze', 'Cs', 'P'];
days.push('Szo');
days
days.pop()
days

//Objektum demó

var obj = {};
obj.number = 42;
obj.number

obj["number"]
obj["hello"] = "Szia";
obj.hello

var obj2 = {};
obj2[1] = 10;
obj2[{}] = 42;
obj2[true] = "igaz";

obj2

var o = {
    theTruth: 42,
    apple: "alma",
    orange: "narancs"
};

var json = JSON.stringify(o);
json
JSON.parse(json)

//Függvény demók

function sum(a, b) {
    return a + b;
}

sum(1, 2)

var each = function (array, f) {
    for (var i = 0; i < array.length; i++) {
        f(array[i]);
    };
};

each(t, function(e) { console.log(e) })

//Dom manipuláció
//dom.html

document.getElementById("container").style.backgroundColor = "red";

var container = document.getElementById("container");
var text = document.createTextNode("hello world");
container.appendChild(p);
//Ebből csak ennyi, mert nem ezt fogjuk használni

//Eventek
//button.html

document.getElementById('btn2').addEventListener('click', function () {
    document.getElementById('text-area').innerHTML = "button clicked";
});

function mouseover(e) {
    document.getElementById('mouse-over-result').innerHTML = e.target.textContent;
}

document.getElementById('btn1').addEventListener('mouseover', mouseover);
document.getElementById('btn2').addEventListener('mouseover', mouseover);


//Jquery

$('.post').css('background-color', 'tomato');

$("#pass").val()

$('.post').on('click', function () {
    alert($(this).text());
});