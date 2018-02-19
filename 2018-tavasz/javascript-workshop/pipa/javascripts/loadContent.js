$(onTabaccoButtonClicked);

function onTabaccoButtonClicked() {
    var itemContainer = document.getElementById('item-container');
    itemContainer.innerHTML = '';
    
    document.getElementById('tobaccoButton').classList.add('active');
    document.getElementById('coalButton').classList.remove('active');
    $.get('http://localhost:3000/dohany').then(data => {
        data.forEach(item => {
            var node = document.createElement('div');
            node.setAttribute('class', 'caption-full');

            var price = document.createElement('h4');
            price.classList.add('pull-right');
            price.innerText = item.price + 'HUF/Tömés';
            node.appendChild(price);

            var taste = document.createElement('h4');
            taste.style.color = '#337ab7';
            taste.innerText = item.taste.name;
            node.appendChild(taste);
            
            var button = document.createElement('button');
            button.textContent = 'Veszek egyet';
            button.className = 'btn btn-success pull-right';
            button.addEventListener('click', () => onBuyTobacco(item._id));
            node.appendChild(button);
            
            var owner = document.createElement('p');
            owner.innerText = item.owner;
            node.appendChild(owner);
            
            var room = document.createElement('p');
            room.innerText = item.roomNumber;
            node.appendChild(room);
            
            var count = document.createElement('p');
            count.innerText = item.count;
            node.appendChild(count);

            itemContainer.appendChild(node);
        });
    }).fail(error => {
        console.log(error);
    });
}

function onBuyTobacco(_id) {
    $.post('http://localhost:3000/dohany/' + _id + '/vasarlas').then(data => {
        onTabaccoButtonClicked();

    }).fail(error => {
        console.log(error);
    });
}

function onCoalButtonClicked() {
    var itemContainer = document.getElementById('item-container');
    itemContainer.innerHTML = '';
    
    document.getElementById('coalButton').classList.add('active');
    document.getElementById('tobaccoButton').classList.remove('active');

    $.get('/szen').then(data => {

        data.forEach(item => {
            var node = document.createElement('div');
            node.setAttribute('class', 'caption-full');
            node.innerHTML = Coal(item._id, item.owner, item.price, item.roomNumber, item.count);

            itemContainer.appendChild(node);
        });
    }).fail(error => {
        console.log(error);
    });
}

function Coal(id, owner, price, roomNumber, count) {
    return `<div class="caption-full">
            <h4 class="pull-right">${price} HUF/tömés</h4>
            <h4>
                <a href="#">${owner}</a>
            </h4>
            <button id="${id}" onclick="onBuyCoal(this.id)"  class="btn btn-success pull-right">Veszek egyet</button>
            <p>
                Szobaszám: ${roomNumber}</p>
            <p>Készleten: ${count} tömés</p>
        </div>`
}

function onBuyCoal(_id) {
    $.post('/szen/' + _id + '/vasarlas').then(data => {
        onCoalButtonClicked();
    }).fail(error => {
        console.log(error);
    });
}