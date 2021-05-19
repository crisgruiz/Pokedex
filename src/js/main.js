"use strict";

const inputElement = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-searchBtn");

const searchPrevent = document.querySelector(".js-form");
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
        image: data.sprites.front_default,
        type: data.types.map((type) => type.type.name),
        imageType: data.types.map((type) => type.type.url),
        weight: data.weight,
        height: data.height,
      };

      return pokemon;
    });
};

//Botón buscar

const handleSearchInput = () => {
  getDataFromApi(inputElement.value).then((x) => console.log(x));
};

btnSearch.addEventListener("click", handleSearchInput);
