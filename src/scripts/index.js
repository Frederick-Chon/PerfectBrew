// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';

import axios from 'axios';

// Sample api call for testing


let doSearch = async function () {
    try {
        const res = await axios('https://api.punkapi.com/v2/beers/1');
        // this.result = res.data.id;
        console.log(res.data);
    }

    catch (error) {
        console.log(error);
    }
}

doSearch();