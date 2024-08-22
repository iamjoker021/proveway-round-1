const data = [
    {
        offerPercent: 30,
        offerBuy: 'Buy 1 Get 2',
        price: 18,
        priceSlashed: 24,
        items: [
            {
                size: 'S',
                color: 'black'
            },
            {
                size: 'M',
                color: 'blue'
            }
        ],
        trending: ''
    },
    {
        offerPercent: 30,
        offerBuy: 'Buy 2 Get 4',
        price: 24,
        priceSlashed: 36,
        items: [
            {
                size: 'L',
                color: 'black'
            },
            {
                size: 'M',
                color: 'blue'
            }
        ],
        trending: 'Most Trending'
    },
    {
        offerPercent: 10,
        offerBuy: 'Buy 3 Get 6',
        price: 36,
        priceSlashed: 48,
        items: [
            {
                size: 'X',
                color: 'violet'
            },
            {
                size: 'M',
                color: 'blue'
            }
        ],
        trending: '',
        expanded: true
    }
]

const createCard = (offer, index=(Math.random()*10)) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const offerPercent = document.createElement('div');
    offerPercent.textContent = `${offer.offerPercent}% Off`;
    card.appendChild(offerPercent);

    const flexInfo = document.createElement('div');
    flexInfo.classList.add('flex-info');
    card.appendChild(flexInfo);

    const radioBtn = document.createElement('input');
    radioBtn.setAttribute('type', 'radio');
    radioBtn.setAttribute('name', `radio${index}`);
    radioBtn.checked = true;
    flexInfo.appendChild(radioBtn);

    const info = document.createElement('div');
    flexInfo.appendChild(info);

    const offerName = document.createElement('p');
    offerName.textContent = offer.offerBuy;
    info.appendChild(offerName);

    const price = document.createElement('p');
    price.classList.add('bold');
    price.textContent = `$${offer.price.toFixed(2)} USD`;
    info.appendChild(price);

    const trending = document.createElement('div');
    trending.textContent = offer.trending;
    card.appendChild(trending);

    return card;
}

const createCardExpanded = (offer, index=(Math.random()*10)) => {
    const cardExpanded = document.createElement('div');
    cardExpanded.classList.add('card-expanded');

    // Create the first inner div
    const offerInfo = document.createElement('div');
    cardExpanded.appendChild(offerInfo);

    // Create flex-info div
    const flexInfo = document.createElement('div');
    flexInfo.classList.add('flex-info');
    offerInfo.appendChild(flexInfo);

    // Create radio input
    const radioBtn = document.createElement('input');
    radioBtn.setAttribute('type', 'radio');
    radioBtn.setAttribute('name', `radio${index}`);
    radioBtn.checked = true;
    flexInfo.appendChild(radioBtn);

    // Create offer details div
    const offerDetails = document.createElement('div');
    flexInfo.appendChild(offerDetails);

    const offerText = document.createElement('p');
    offerText.innerHTML = `<span>${offer.offerBuy}</span> <span class="offer-highlight">${offer.offerPercent}% Off</span>`;
    offerDetails.appendChild(offerText);

    const priceText = document.createElement('p');
    priceText.innerHTML = `<span class="bold">$${offer.price.toFixed(2)} USD</span> <span class="strike-out">$${offer.priceSlashed.toFixed(2)} USD</span>`;
    offerDetails.appendChild(priceText);

    // Create table
    const table = document.createElement('table');
    offerInfo.appendChild(table);

    // Create table head
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = '<th></th><th>Size</th><th>Color</th>';
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    offer.items.forEach((item, index) => {
        const row = document.createElement('tr');
        tbody.appendChild(row);

        const sNo = document.createElement('th');
        sNo.textContent = `#${index+1}`;
        row.appendChild(sNo);

        const sizeCell = document.createElement('td');
        sizeCell.innerHTML = `<select name="size${index}" id="size${index}"><option value="${item.size}">${item.size}</option></select>`;
        row.appendChild(sizeCell);

        const colorCell = document.createElement('td');
        colorCell.innerHTML = `<select name="color${index}" id="color${index}"><option value="${item.color}">${item.color}</option></select>`;
        row.appendChild(colorCell);
    })

    const trending = document.createElement('div');
    trending.textContent = offer.trending;
    cardExpanded.appendChild(trending);

    return cardExpanded;
}

const resetExpanded = (data) => {
    data.forEach(el => {
        el.expanded = false
    })
}

const updateCards = () => {
    const cards = document.querySelector('.cards');
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }

    data.forEach((offer, index) => {
        let card;
        if (offer.expanded) {
            card = createCardExpanded(offer, index);
        }
        else {
            card = createCard(offer, index);
        }
        card.addEventListener('click', e => {
            const expMemory = data[index].expanded;
            resetExpanded(data);
            data[index].expanded = !expMemory;
            updateCards(data);
        })
        document.querySelector('.cards').appendChild(card);
    });    
}

updateCards(data);