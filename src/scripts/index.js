// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = '/src/images/beer.svg';
logo.setAttribute('class', 'logo')

const h1 = document.createElement('h1');
h1.textContent = `Perfect Brew`;

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(h1);

const search = document.createElement('div');
search.setAttribute('class', 'search')

const searchField = document.createElement('input');
searchField.setAttribute('class', 'searchField');
searchField.setAttribute('type', 'text');
searchField.setAttribute('placeholder', 'Find your perfect food and beer pairing!');

const searchBtn = document.createElement('button');
searchBtn.setAttribute('class', 'searchBtn');
searchBtn.setAttribute('type', 'submit');

const searchBtnImg = document.createElement('img');
searchBtnImg.setAttribute('class', 'searchBtnImg')
searchBtnImg.src = '/src/images/search.svg';

app.appendChild(search);
search.appendChild(searchField);
search.appendChild(searchBtn);
searchBtn.appendChild(searchBtnImg);

// Event listeners for both button click & enter key
searchBtn.addEventListener('click', () => getResults(searchField.value.toString()));
searchField.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        let searchItem = searchField.value.toString();
        getResults(searchItem);
        console.log(`searchInput is ${searchItem}`);
    }
});

app.appendChild(container);


async function getResults(input) {
    try {
        let result = await fetch(`https://api.punkapi.com/v2/beers?food=${input}`);
        let data = await result.json();
        console.log(data);
        // console.log(`status: ${data.status}`)
        container.textContent = ''; // Clear container before next query
        data.forEach(beers => {
            // Create div with card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const beerName = document.createElement('h1');
            beerName.textContent = beers.name;

            const beerImg = document.createElement('img');
            if (beers.image_url === null) {
                // Fallback for when some results don't have an image
                beerImg.src = '/src/images/not-avail-logo.svg';
                beerImg.alt = 'No photo available icon';
            } else {
                beerImg.src = `${beers.image_url}`;
                beerImg.alt = `Picture of ${beers.name}`
            }
            
            const beerDescription = document.createElement('p');
            beerDescription.textContent = beers.description;

            const beerABV = document.createElement('p');
            beerABV.textContent = `ABV: ${beers.abv}`

            const beerIBU = document.createElement('p');
            beerIBU.textContent = `IBU: ${beers.ibu}`;

            const beerBrewerMsg = document.createElement('p');
            beerBrewerMsg.textContent = `Tips from the brewer: ${beers.brewers_tips}`;

            container.appendChild(card);
            card.appendChild(beerName);
            card.appendChild(beerImg);
            card.appendChild(beerDescription);
            card.appendChild(beerABV);
            card.appendChild(beerIBU);
            card.appendChild(beerBrewerMsg);
        })
    } catch(err) {
        console.log(err);
    }
}



// fetch('https://api.punkapi.com/v2/beers?food=sushi')
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })