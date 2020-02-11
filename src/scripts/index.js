// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = '/src/images/beer.svg';

const h1 = document.createElement('h1');
h1.textContent = `Perfect Brew`;

const container = document.createElement('div');
container.setAttribute('class', 'container');

const search = document.createElement('div');
search.setAttribute('class', 'search')

const searchField = document.createElement('input');
searchField.setAttribute('class', 'searchField');
searchField.setAttribute('type', 'text');
searchField.setAttribute('placeholder', 'Search for your favorite food pairings!');

const searchBtn = document.createElement('button');
searchBtn.setAttribute('class', 'searchBtn');
searchBtn.setAttribute('type', 'submit');

const searchBtnImg = document.createElement('img');
searchBtnImg.setAttribute('class', 'searchBtnImg')
searchBtnImg.src = '/src/images/search.svg';



app.appendChild(logo);
app.appendChild(h1);
app.appendChild(container);
app.appendChild(search);
search.appendChild(searchField);
search.appendChild(searchBtn);
searchBtn.appendChild(searchBtnImg);



fetch('https://api.punkapi.com/v2/beers?food=sushi')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })