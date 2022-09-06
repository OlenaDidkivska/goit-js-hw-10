import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function oninputHendler(event) {
  const input = inputEl.value.trim();
  if (input) {
    fetchCountries(input).then(verificationInfo).catch(onFetchError);
  }
}

function renderCountriesCard(countries) {
  const marcup = countries.reduce(
    (acc, { flags, name }) =>
      acc +
      `<li><img class = 'flag' alt = ${name.official} src = ${flags.svg} height = 20 style = 'margin-right: 10px'><span class = "nameCountry" style = 'font-weight: 600'>${name.official}</span></img></li>`,
    ''
  );
  return marcup;
}

function renderAddInfo(countries) {
  const countryEl = countries.reduce(
    (acc, { flags, name, capital, population, ...languages }) =>
      acc +
      `<li><img class = 'flag' alt = ${name.official} src = ${flags.svg} height = 40 style = 'margin-right: 20px'><span class = "nameCountry" style="margin-right: 20px; font-weight: 600; text-align: center; font-size: 40px">${name.official}</span></img></li>
        <li><span style="font-weight: 600; margin: 20px; line-height: 2">Capital:</span> ${capital}</li>
        <li><span style="font-weight: 600; margin: 20px; line-height: 2">Population:</span> ${population}</li>
        <li><span style="font-weight: 600; margin: 20px; line-height: 2">Languages:</span> ${languages}</li>`,
    ''
  );
  return countryEl;
}

function verificationInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.textContent = '';
    countryList.textContent = '';
  } else {
    countryList.innerHTML = renderCountriesCard(countries);
    countryInfo.textContent = '';
  }
  if (countries.length === 1) {
    countryList.textContent = '';
    countryInfo.innerHTML = renderAddInfo(countries);
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

inputEl.addEventListener('input', debounce(oninputHendler, DEBOUNCE_DELAY));

countryList.style.listStyle = 'none';
countryInfo.style.listStyle = 'none';
