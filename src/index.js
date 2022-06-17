import './css/styles.css';
import './//css//fetchCountries.css';
import  {fetchCountries} from './/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const containerCountry = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  event.preventDefault();
  const inputCountry = event.target.value.trim();
  fetchCountries(inputCountry).then(response => {
    renderCountries(response);
    if (response.length > 1 && response.length <= 10) {
      renderCountries(response);
    }
    if (response.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (response.length === 1) {
      renderCountryInfo(response);
      clearInput();
    }
  }
  )
    .catch(error =>{
        console.log(error)
    });
  if(inputCountry === ""){
    countryList.innerHTML = ''
    containerCountry.innerHTML = ''
  }
}


function renderCountries(response){
  const murkup = response
    .map(country => {
      return `
                <li class = 'contry-item'>
                    <div class = 'country-container'>
                        <img src = ${country.flags.svg} alt = '${country.name}' width = 50, heigh = 20/>
                        <h1 class = 'country-title'>${country.name.official}</h1>
                    </div>
                </li>`;
    })
    .join('');
  countryList.innerHTML = murkup;
}

function renderCountryInfo(response) {
  const murkup = response
    .map(country => {
      return `
        <li class = 'contry-item'>
                    <div class = 'country-container'>
                        <img src = ${country.flags.svg} alt = '${
        country.name
      }' width = 50, heigh = 20/>
                        <h1 class = 'country-title'>${
                          country.name.official
                        }</h1>
                    </div>
                </li>
        <p class = 'country-capital'> Capital:${country.capital}
        </p>
        <p class = 'country-population'> Population:${country.population}
        </p>
        <p class = 'country-languages'> Languages:${Object.values(
          country.languages
        )}
        </p>
            `;
    })
    .join('');
  containerCountry.innerHTML = murkup;
}

function clearInput() {
  if (renderCountryInfo) {
    countryList.innerHTML = '';
  }
}
