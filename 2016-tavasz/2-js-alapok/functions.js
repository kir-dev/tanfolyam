function sum(a, b) {
    return a + b;
}

var multiply = function (a, b) {
    return a * b;
};

var join = function () {
    var joined = "";
    for (var i = 0; i < arguments.length; i++) {
        joined = joined + arguments[i].toString();
    }

    return joined;
};

var each = function (array, f) {
    for (var i = 0; i < array.length; i++) {
        f(array[i]);
    };
};

// functions + object

var greeter = {
    name: "World",
    greet: function (name) {
        return "Hello, " + (name || this.name) + "!";
    }
}

// console.log(greeter.greet("Tomi"));
// console.log(greeter.greet());