import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function searchGif(search) {
  let request = new XMLHttpRequest();
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=8&offset=0&rating=pg&lang=en&bundle=clips_grid_picker`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
    } else {
      printError(this, response, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getTrending() {
  let request = new XMLHttpRequest();
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=8&offset=0&rating=g&bundle=clips_grid_picker`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrending(response);
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}



// UI Logic

function printError(request, apiResponse, search) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the gif search for ${search}:  ${request.status} ${request.statusText} ${apiResponse.message}`;
}

function printElements(apiResponse, search) {
  document.querySelector('#showResponse').innerHTML = `<h2>${search} GIFS:</h2> 
  <br />`;
  for (let i = 0; i <= apiResponse.data.length; i++){
  
    document.querySelector('#showResponse').innerHTML += 
    `<img src="${apiResponse.data[i].images.fixed_width.url}">`;
  }
}

function printTrending(apiResponse) {
  document.querySelector('#showResponse').innerHTML = `<h2>TRENDING GIFS:</h2> 
  <br />`;  
  for (let i = 0; i<= apiResponse.data.length; i++){
    document.querySelector('#showResponse').innerHTML += 
    `<img src="${apiResponse.data[i].images.fixed_width.url}">`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  searchGif(search);
}

function handleButtonClick() {
  console.log("You clicked me!");
  getTrending();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.getElementById('trending').addEventListener("click", handleButtonClick);
});