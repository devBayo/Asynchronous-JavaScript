// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforebegin', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  console.log(data);
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${Number(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span>${
        data.currencies[Object.keys(data.currencies)[0]].name
      }</p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

////////////////////////////////////////
/* Old way of fetching data */
/*

const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${Number(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span>${
        data.currencies[Object.keys(data.currencies)[0]].name
      }</p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('nigeria');
getCountryData('gb');
getCountryData('france');
// getCountryData('germany');

*/

////////////////////////////
// Call back hell

/*

const getCountryAndNeighbour = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    const [neighbour] = data.borders;

    if(!neighbour) return;

    console.log(neighbour);

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('nigeria');
getCountryAndNeighbour('usa');

// Typical call back hell structure
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/

////////////////////////////
// Promise and fetch API

// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.com/v3.1/name/nigeria');
// request.send()

//////////// Expanded form
// const getCountryData = function (countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };

/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

//////////// Compressed form
const getCountryData = function (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

// getCountryData('nigeria');

const getCountryAndNeighbour = function (countryName) {
  getJSON(
    `https://restcountries.com/v3.1/name/${countryName}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders ? data[0].borders[0] : undefined;
      // const neighbour = 'ssssssss';

      if (!neighbour) throw new Error('No neighbour found');

      // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(err.message + '!!');
      renderError(err.message + '!!');
    })
    .finally(() => (countriesContainer.style.opacity = 1));
  // Flat chain of promises
};

bt
n.addEventListener('click', function () {
  // getCountryAndNeighbour('spain');
  getCountryAndNeighbour('australia');
  // getCountryAndNeighbour('dfdfdfdfdf');
});
*/

/*

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=692147774437302351127x20223`)
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error("Couldn't find your location");
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Couldn't find your Country ${response.status}`);
        return response.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.log(err.message))
      .finally((countriesContainer.style.opacity = 1));
    };
    
    btn.addEventListener('click', function () {
      whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
});

*/

//// Buidling a simple Promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  const lottery = Math.random();
  setTimeout(function () {
    if (lottery >= 0.5) {
      resolve('You WIN, :) ' + lottery.toFixed(2));
    } else {
      reject(new Error('You lose, LOL!!! ' + lottery.toFixed(2)));
    }
  }, 0);
});

lotteryPromise
.then(response => console.log(response))
.catch(err => console.error(err.message + '.'));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));
  
  Promise.resolve('1').then(res => console.log(res));
  Promise.reject('error').catch(err => console.log(err));  
  */

////////////
// Promisifying Geolocation API

/*
console.log('Getting Position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(res => console.log(res));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=692147774437302351127x20223`
      );
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error("Couldn't find your location");
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Couldn't find your Country ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(err.message))
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);

*/

////////
//Challenge 2

let img;
const images = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error("Couldn't fetch image"));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

createImage('img/img-1.jpg')
  .then(res => {
    console.log(res, 'Image 1');
    return wait(2);
  })
  .then(() => {
    img.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(res => {
    console.log(res, 'Image 2');
    return wait(2);
  })
  .then(() => {
    img.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(res => {
    console.log(res, 'Image 3');
    return wait(2);
  })
  .catch(err => console.error(err.message));
