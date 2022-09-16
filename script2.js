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
/*
Returns the first settled Promise
*/
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
      timeout(2),
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

/*
Promise.any

Promise.any returns only the first resolved promised and ignores all rejected promise 
Similar to Promies.race but ignores rejected Promise

*/
(async function () {
  try {
    const response = await Promise.any([
      Promise.reject('Error'),
      Promise.resolve('Resolved 1'),
      Promise.resolve('Resolved 2'),
    ]);

    console.log(response);
  } catch (error) {
    console.warn(error);
  }
})();

/* Challenge 3 */
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      document.querySelector('.images').append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(Error("Couldn't find image at '" + imgPath + "'"));
    });
  });
};

(async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');
    await wait(2);
    img1.remove();
    await wait(1);
    const img2 = await createImage('img/img-2.jpg');
    await wait(2);
    img2.remove();
    await wait(1);
    await createImage('img/img-3.jpg');
  } catch (error) {
    console.warn(error.message);
  }
})();
