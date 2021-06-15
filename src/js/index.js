"use strict";
const inputElement = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-searchBtn");
const searchPrevent = document.querySelector(".js-form");
const searchContainer = document.querySelector(".searchContainer");
const modal = document.querySelector(".modalContainer");
const pokemonDetail = document.querySelector(".js-pokemonDetail");
const closeDetail = document.querySelector(".js-close");
const span = document.getElementsByClassName("close")[0];
const body = document.getElementsByTagName("body")[0];
const error = document.querySelector(".js-error");

function handleForm(ev) {
  ev.preventDefault();
}
searchPrevent.addEventListener("submit", handleForm);

const getJsonResponse = (response) => {
  let htmlCode = "";
  if (response.status === 200) {
    response.json().then((a) => {
      let pokemonObject = transformPokemonObject(a);
      paintDetails(pokemonObject);
      modal.style.display = "block";
      body.style.position = "static";
      body.style.height = "100%";
      body.style.overflow = "hidden";
    });
  } else {
    htmlCode += `<p class="error__text">No existe ningún pokemon con ese nombre. Vuelve a intentarlo</p>`;
  }
  error.innerHTML = htmlCode;
};

const transformPokemonObject = (data) => {
  const pokemon = {
    pokemonName: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    type: data.types.map((type) => type.type.name),
    weight: data.weight,
    height: data.height,
  };
  return pokemon;
};

//Llamada al API
const getDataFromApi = (pokemon) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
  ).then(getJsonResponse);
};

const paintDetails = (pokemon) => {
  let htmlCode = "";
  htmlCode += `<img class="pokemonDetail__img js-image" src="${pokemon.image}">`;
  htmlCode += `<h3 class="pokemonDetail__type">Type:</h3>`;
  for (let i = 0; i < pokemon.type.length; i++) {
    htmlCode += `<p class="pokemonDetail__type--title""> ${pokemon.type[i]}</p>`;
  }
  htmlCode += `<div class="row">`;
  htmlCode += `<div class="col col-6">`;
  htmlCode += `<p class="pokemonDetail__height">Height:</p>`;
  htmlCode += `<p class="pokemonDetail__weight">${pokemon.height}"</p>`;
  htmlCode += `</div>`;
  htmlCode += `<div class="col col-6">`;
  htmlCode += `<p class="pokemonDetail__weight">Weight:</p>`;
  htmlCode += `<p class="pokemonDetail__weight">${pokemon.weight} lbs</p>`;
  htmlCode += `</div>`;
  htmlCode += `</div>`;
  pokemonDetail.innerHTML = htmlCode;
};
let pokemon = {};

const handleSearchInput = () => {
  getDataFromApi(inputElement.value);
};

btnSearch.addEventListener("click", handleSearchInput);

const handleCloseDetail = () => {
  modal.style.display = "none";
  body.style.position = "inherit";
  body.style.height = "auto";
  body.style.overflow = "visible";
};

if (closeDetail) {
  closeDetail.addEventListener("click", handleCloseDetail);
}
