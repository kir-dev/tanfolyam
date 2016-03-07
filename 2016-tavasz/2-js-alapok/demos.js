
//Típusos demó

console.log("hello world:", typeof "hello world");
console.log("42:", typeof 42);
console.log("12.2:", typeof 12.2);
console.log("true:", typeof true);
console.log("null:", typeof null);
console.log("undefined:", typeof undefined);
console.log("typeof 42:", typeof typeof 42); // typeof eredménye mindig string
console.log("console.log:", typeof console.log);
console.log("array:", typeof []); // és minden más is

//Tömbök demó

console.log("**** deklaracio ****");
var a = [];
var b = [1,2,3,4];
var b2 = [1, "a", [], true];
console.log(a,b,b2); // [] [1, 2, 3, 4] [1, "a", Array[0], true]

console.log("**** dinamikus ****");
var c = [5,6,7,8];
c[4] = 9;
console.log(c); // [5,6,7,8,9]

console.log("**** barhol indexelheto ****");
c[10] = 10;
console.log(c); // [5, 6, 7, 8, 9, undefined × 5, 10]

console.log("**** length tulajdonsag ****");
console.log("length", b.length); // 4

console.log("**** iteralas tombon ****");
var numbers = [1, 2, 3, 4, 5];
var sum = 0;
for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
};
console.log(sum);

console.log("**** stackkent is viselkedik ****");
var days = ['H', 'K', 'Sze', 'Cs', 'P'];
days.push('Szo');
console.log(days);
console.log(days.pop());
console.log(days);

//Függvény demók

function sum(a, b) {
    return a + b;
}

var each = function (array, f) {
    for (var i = 0; i < array.length; i++) {
        f(array[i]);
    };
};

