"use strict";

const inputElement = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-searchBtn");
const searchPrevent = document.querySelector(".js-form");
const searchContainer = document.querySelector(".searchContainer");
const pokemonDetail = document.querySelector(".js-pokemonDetail");

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

//Botón buscar

const paintDetails = (pokemon) => {
  let htmlCode = "";
  htmlCode += `<h3 class="pokemonDetail__title">${pokemon.pokemonName}</h3>`;
  htmlCode += `<img class="pokemonDetail__img" src="${pokemon.image}">`;
  htmlCode += `<h3 class="pokemonDetail__type">Type:</h3>`;
  for (let i = 0; i < pokemon.type.length; i++) {
    htmlCode += `<p class="pokemonDetail__type--title""> ${pokemon.type[i]}</p>`;
  }
  htmlCode += `<p class="pokemonDetail__height">Height:</p>`;
  htmlCode += `<p class="pokemonDetail__weight">${pokemon.height}"</p>`;
  htmlCode += `<p class="pokemonDetail__weight">Weight:</p>`;
  htmlCode += `<p class="pokemonDetail__weight">${pokemon.weight} lbs</p>`;
  pokemonDetail.innerHTML = htmlCode;
};
let pokemon = {};

const handleSearchInput = () => {
  getDataFromApi(inputElement.value).then((x) => {
    pokemon = x;
    paintDetails(x);
    searchContainer.classList.add("hidden");
  });
};

btnSearch.addEventListener("click", handleSearchInput);
