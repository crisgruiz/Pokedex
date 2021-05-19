"use strict";

const inputElement = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-searchBtn");

const searchPrevent = document.querySelector(".js-form");
function handleForm(ev) {
  ev.preventDefault();
}
searchPrevent.addEventListener("submit", handleForm);

//Llamada al API
const getDataFromApi = () => {
  const inputValue = inputElement.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const pokemon = {
        pokemonName: data.name,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
        weight: data.weight,
        height: data.height,
      };
      console.log(pokemon);
      return pokemon;
    });
};

//Botón buscar

btnSearch.addEventListener("click", getDataFromApi);
