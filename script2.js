'use strict';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
    //// Promise.all short circuit one a promise is rejected

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital[0]));
  } catch (error) {
    console.warn(error.message);
  } finally {
    console.log('End of execution...');
  }
};

get3Countries('nigeria', 'ghana', 'russia');

/*
-- Promise combinators
-Promise.all
-Promise.race
-Promise.allSettled
-Promise.any
*/

//// Promise.race

(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/nigeria`),
    getJSON(`https://restcountries.com/v3.1/name/ghana`),
    getJSON(`https://restcountries.com/v3.1/name/russia`),
  ]);

  console.log(response[0].capital);
})();

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, seconds * 1000);
  });
};

// (async function () {
//   try {
//     await timeout(3);
//   } catch (error) {
//     console.warn(error.message);
//   }
// })();

//// Promise.race real life application
(async function () {
  try {
    const response = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/nigeria`),
      timeout(0.7),
    ]);

    console.log(response[0].capital);
  } catch (err) {
    console.warn(err.message);
  }
})();

//// Promise.allSettled
/*
Promise.allSettled doesn't short circuit
*/
(async function () {
  try {
    const response = await Promise.allSettled([
      Promise.resolve('Resolved 1'),
      Promise.reject('Error'),
      Promise.resolve('Resolved 2'),
    ]);

    console.log(response);
  } catch (error) {
    console.warn(error);
  }
})();
