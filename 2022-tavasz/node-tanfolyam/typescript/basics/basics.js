var array = [
    { name: "Cirmos", age: 1, color: 'brown' },
    { name: "Foltos", age: 3 }
];
// functions
var funnyLog = function (element, index) {
    var logText = "".concat(index, " - ").concat(element.name, ": ").concat(element.age, ".");
    console.log(logText);
};
var funnyConvert = function (element, index) {
    return "".concat(index, " - ").concat(element.name, ": ").concat(element.age, ".");
};
console.log('Old way:');
for (var i = 0; i < array.length; ++i) {
    funnyLog(array[i], i);
}
console.log('\nArray function way:');
array.forEach(function (element, index) {
    funnyLog(element, index);
});
console.log('\nMapping way: (common method in React!)');
var newArray = array.map(function (element, index) {
    return funnyConvert(element, index);
});
console.log(newArray);
