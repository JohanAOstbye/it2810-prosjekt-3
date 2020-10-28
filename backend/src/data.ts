function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon:object) {
        //putpokemon
        //`https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
      });
    });
}
