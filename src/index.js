import './css/styles.css';
import './//css//fetchCountries.css';
import { getRefs } from './/refs';
import { fetchCountries } from './/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  event.preventDefault();
  const inputCountry = event.target.value.trim();
  if (inputCountry === '') {
    refs.countryList.innerHTML = '';
    refs.containerCountry.innerHTML = '';
    return;
  }
  fetchCountries(inputCountry)
    .then(response => {
      if (response.length >= 2 && response.length <= 10) {
        renderCountries(response);
      }
      if (response.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (response.length === 1) {
        renderCountryInfo(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
  clearInput();
}

function renderCountries(response) {
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
  refs.countryList.innerHTML = murkup;
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
        <p class = 'country-capital'><span class = 'span-capital'>Capital: </span>${
          country.capital
        }
        </p>
        <p class = 'country-population'><span class = 'span-population'>Population: </span>${
          country.population
        }
        </p>
        <p class = 'country-languages'><span class = 'span-languages'>Languages: </span>${Object.values(
          country.languages
        )}
        </p>
            `;
    })
    .join('');
  refs.containerCountry.innerHTML = murkup;
}

function clearInput() {
  if (refs.input.value != '') {
    refs.countryList.innerHTML = '';
  }
}
