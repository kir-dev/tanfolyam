function makeItRed() {
    window.document.body.style.backgroundColor = "tomato";
}

function writeMeSomeNumbers() {
    var numbersDiv = window.document.getElementById('numbers');
    numbersDiv.innerHTML = '';
    for (var i = 0; i < 15; i++) {
        var p = window.document.createElement('p');
        p.innerHTML = i;
        numbersDiv.appendChild(p);
    };
}