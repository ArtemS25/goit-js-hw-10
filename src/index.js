import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
export { zeroingHTML };
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
countryList.style.listStyle = 'none';
const countryInfo = document.querySelector('.country-info');
countryInfo.style.listStyle = 'none';
const input = document.querySelector('#search-box');

function zeroingHTML() {
  countryList.innerHTML = ' ';
  countryInfo.innerHTML = ' ';
}

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

export default function renderList(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (data.length > 2 && data.length <= 10) {
    zeroingHTML();
    const markupCoutryList = data
      .map(
        ({ flags, name }) =>
          `<li class = "list__item"><img src="${flags.svg}"alt ="flags ${name}" width = 20> ${name}</li>`
      )
      .join('');
    countryList.insertAdjacentHTML('afterbegin', markupCoutryList);
  }
  if (data.length == 1) {
    zeroingHTML();
    const markupCoutryList = data
      .map(
        ({ flags, name }) =>
          `<li class = "list__item"><img src="${flags.svg}"alt ="flags ${name}" width = 20> ${name}</li>`
      )
      .join('');
    countryList.insertAdjacentHTML('afterbegin', markupCoutryList);
    const markupCoutryInfo = data.map(
      ({
        capital,
        population,
        languages,
      }) => `<li class= "list__item">Capital:${capital}</li>
            <li class= "list__item">Population:${population}</li>
            <li class= "list__item">Languages:${languages[0].name}</li>`
    );
    countryInfo.insertAdjacentHTML('afterbegin', markupCoutryInfo);
  }
}
