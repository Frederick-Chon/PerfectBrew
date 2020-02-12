// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = '/src/images/beer.svg';

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
        // console.log(data);
        // console.log(`status: ${data.status}`)
        container.textContent = ''; // Clear container before next query
        data.forEach(beer => {
            // Create div with card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = beer.name;

            const img = document.createElement('img');
            img.src = `${beer.image_url}`;

            const p = document.createElement('p');
            p.textContent = beer.description;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(img);
            card.appendChild(p);

            
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