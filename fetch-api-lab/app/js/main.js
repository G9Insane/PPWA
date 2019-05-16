/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------
//method menampilkan data hasil
function logResult(result) {
  console.log(result);


  result.forEach(function(value,index) {
    const ul = document.getElementById("data-response");
    const li = document.createElement('li');
    const l2 = document.createElement('li');
    ul.appendChild(li);
    ul.appendChild(l2);
    li.innerText = 'Name : ' +value.name;
    l2.innerText = 'Email : ' +value.email;

  });
}
//method menampilkan data error
function logError(error) {
  console.log('Looks like there was a problem:', error);
}
//method validasi jika response tidak = ok maka akan menampilkan
//statusText pada response
//selain itu tampilkan response
function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
//method membaca object dari sebagai json
function readResponseAsJSON(response) {
  return response.json();
}
//method membaca object dari sebagai blob
function readResponseAsBlob(response) {
  return response.blob();
}
//method membaca object dari sebagai text
function readResponseAsText(response) {
  return response.text();
}
//method untuk menampilkan gambar pada halaman
//dalam id 'im-container'
//menambahkan tag <img> pada id tersebut
//dengan src dengan format blob
function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  imgElem.src = URL.createObjectURL(responseAsBlob);
}
//method untuk menampilkan text pada halaman
//dengan id 'message' sebagai selector dan mengubah text
//pada selector tersebut

function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}
//method untuk menampilkan url request
//pada console
//dan ukuran byte
function logSize(response) {
  const url = response.url;
  const size = response.headers.get('content-length');
  console.log(`${url} is ${size} bytes`);
}


// Fetch JSON ----------
// Mengambil data dengan method fetch
// ke pada file animals.json
function fetchJSON() {
  fetch('examples/animals.json')
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
}
// menambahkan event listener pada id json-btn halaman web
// dan jika di click akan mentrigger method fetchJSON
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------
// mengambil data dengan method fetch
// ke file fetching.jpg
function fetchImage() {
  fetch('examples/fetching.jpg')
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then(showImage)
      .catch(logError);
}
// menambahkan event listener pada id img-btn halaman web
// dan jika di click akan mentrigger method fetchImage
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------
// Mengambil data dengan method fetch
// ke pada file words.txt
function fetchText() {
  fetch('examples/words.txt')
      .then(validateResponse)
      .then(readResponseAsText)
      .then(showText)
      .catch(logError);
}
// menambahkan event listener pada id text-btn halaman web
// dan jika di click akan mentrigger method fetchText
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);

// Fetch JSON ----------
// Mengambil data dengan method fetch
// ke pada file animals.json
function fetchData() {
  fetch('http://jsonplaceholder.typicode.com/users')
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
}
// menambahkan event listener pada id json-btn halaman web
// dan jika di click akan mentrigger method fetchJSON
const dataButton = document.getElementById('data-btn');
dataButton.addEventListener('click', fetchData);


