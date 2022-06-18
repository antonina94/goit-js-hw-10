import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1'

 export function fetchCountries(name){
    const url = 'name,capital,population,flags,languages';
    return fetch(`${BASE_URL}/name/${name}?fields=${url}`)
    .then(response => {
      if(!response.ok){
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json()
    }
      )
}

// export function fetchCountries(name) {
//   const BASE_URL = 'https://restcountries.com/v3.1';
//   const url = 'name,capital,population,flags,languages';
//   return fetch(`${BASE_URL}/name/${name}?fields=${url}`).then(response =>
//     response.json()
//   );
// }
