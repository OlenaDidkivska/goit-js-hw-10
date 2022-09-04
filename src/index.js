import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  const selectedCountries = fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(responce => {
      return responce.json();
    })
    .then(verificationInfo)
    .catch(error => {
      console.log(error);
    });
  console.log(selectedCountries);
}

function oninputHendler(event) {
  const input = event.currentTarget.value.trim();
  console.log(input);
  fetchCountries(input);
}

function renderCountriesCard(countries) {
  const marcup = countries
    .map(
      ({ flags, name }) =>
        `<li><img class = 'flag' alt = ${name.official} src = ${flags.svg} height = 20 style = 'margin-right: 10px'><span class = "nameCountry" style = 'font-weight: 600'>${name.official}</span></img></li>`
    )
    .join('');
  countryList.innerHTML = marcup;
}

function renderAddInfo(countries) {
  const countryEl = countries
    .map(
      ({ flags, name, capital, population, ...languages }) =>
        `<li><img class = 'flag' alt = ${name.official} src = ${flags.svg} height = 40 style = 'font-size: 40px'><span class = "nameCountry" style = 'font-weight: 600'>${name.official}</span></img></li>
        <li><p class = 'capital'>Capital: ${capital}</p></li>
        <li><p class = 'population'>Population: ${population}</p></li>
        <li><p class = 'languages'>Languages: ${languages}</p></li>`
    )
    .join('');
  countryInfo.innerHTML = countryEl;
}

function verificationInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.innerHTML = '';
  } else {
    renderCountriesCard(countries);
  }
  if (countries.length === 1) {
    renderAddInfo(countries);
  }
}

inputEl.addEventListener('input', oninputHendler);

countryList.style.listStyle = 'none';
countryInfo.style.listStyle = 'none';
