export { fetchCountries };
import Notiflix from 'notiflix';
import renderList from '../index';
import { zeroingHTML } from '../index';

const input = document.querySelector('#search-box');
let name = null;

const URL = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
  name = input.value.trim();

  if (name.length === 0) {
    zeroingHTML();
    return;
  }

  fetch(`${URL}${name}?fields=name,capital,population,flags,languages`)
    .then(r => {
      if (!r.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        zeroingHTML();
      }
      return r.json();
    })
    .then(renderList);
}
