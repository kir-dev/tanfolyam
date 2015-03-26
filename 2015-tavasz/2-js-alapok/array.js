// deklaráció
console.log("**** deklaracio ****");
var a = [];
var b = [1,2,3,4];
var b2 = [1, "a", [], true];
console.log(a,b,b2); // [] [1, 2, 3, 4] [1, "a", Array[0], true]

// dinamikus
console.log("**** dinamikus ****");
var c = [5,6,7,8];
c[4] = 9;
console.log(c); // [5,6,7,8,9]

// bárhol indexelhető
console.log("**** barhol indexelheto ****");
c[10] = 10;
console.log(c); // [5, 6, 7, 8, 9, undefined × 5, 10]

// length
console.log("**** length tulajdonsag ****");
console.log("length", b.length); // 4

// bejárást
console.log("**** iteralas tombon ****");
var numbers = [1, 2, 3, 4, 5];
var sum = 0;
for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
};
console.log(sum);

// stackként
console.log("**** stackkent is viselked ****");
var days = ['H', 'K', 'Sze', 'Cs', 'P'];
days.push('Szo');
console.log(days);
console.log(days.pop());
console.log(days);
