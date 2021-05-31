"use strict";
const inputElement = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-searchBtn");
const searchPrevent = document.querySelector(".js-form");
const searchContainer = document.querySelector(".searchContainer");
const pokemonContainer = document.querySelector(".js-pokemonDetailContainer");
const pokemonDetail = document.querySelector(".js-pokemonDetail");
const closeDetail = document.querySelector(".js-close");

function handleForm(ev) {
  ev.preventDefault();
}
searchPrevent.addEventListener("submit", handleForm);

//Llamada al API
const getDataFromApi = (pokemon) => {
  const inputValue = pokemon.toLowerCase();
  return fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemon = {
        pokemonName: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        type: data.types.map((type) => type.type.name),
        weight: data.weight,
        height: data.height,
      };
      console.log(data);
      return pokemon;
    });
};

const paintDetails = (pokemon) => {
  let htmlCode = "";
  // htmlCode += `<h3 class="pokemonDetail__title">${pokemon.pokemonName}</h3>`;
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
  getDataFromApi(inputElement.value).then((x) => {
    pokemon = x;
    paintDetails(x);
    searchContainer.classList.add("hidden");
    pokemonContainer.classList.remove("hidden");
  });
};

btnSearch.addEventListener("click", handleSearchInput);

const handleCloseDetail = () => {
  let htmlCode = "";
  const isOpen = searchContainer.classList.contains("hidden");
  if (isOpen) {
    searchContainer.classList.remove("hidden");
    pokemonDetail.innerHTML = htmlCode;
    pokemonContainer.classList.add("hidden");
  } else {
    paintDetails();
    searchContainer.classList.add("hidden");
    pokemonContainer.classList.remove("hidden");
  }
};

if (closeDetail) {
  closeDetail.addEventListener("click", handleCloseDetail);
}
