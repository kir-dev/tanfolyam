function onTabaccoButtonClicked() {
    document.getElementById('tobaccoForm').removeAttribute('hidden');
    document.getElementById('coalForm').setAttribute('hidden', '');
    $('.active').removeClass('active');
    $('#tobaccoButton').addClass('active');
}

function onCoalButtonClicked() {
    document.getElementById('coalForm').removeAttribute('hidden');
    document.getElementById('tobaccoForm').setAttribute('hidden', '');
    $('.active').removeClass('active');
    $('#coalButton').addClass('active');
}

var s = document.getElementById('taste');

$.get('/iz').then(data => {
    data.forEach(taste => {
        s.options[s.options.length] = new Option(taste.name, taste._id);

    })
})