const apiUrl: string = "https://pokeapi.co/api/v2/pokemon/";

interface pokeInterface {
  name: string;
  id: number;
  moves: pokeAttack[];
  fatness: number;
}

interface pokeAttack {
  name: string;
  url: string;
}

//first async function that calls the pokeApi
async function getPokemon(pokemonName: string) {
  let res = await fetch(apiUrl + pokemonName);
  let data = await res.json();
  return data;
}
//async function to format data to pokeInterface
async function formatPokemon(pokemonData: any) {
  const name = pokemonData.forms[0].name;
  const id = pokemonData.id;
  let moves: pokeAttack[] = [];
  pokemonData.abilities.forEach((attack: any) => {
    moves.push({ name: attack.ability.name, url: attack.ability.url });
  });

  const weight = pokemonData.weight;
  return { name: name, id: id, moves: moves, fatness: weight };
}

//call getPokemon to then format it (surely there's a better way to write this)
// getPokemon("pikachu").then((res_) => {
//   formatPokemon(res_).then((pk) =>{
//     console.log(pk)
//   })
// });

async function processPokemon(userInput: string) {
  const pokemonData = await getPokemon(userInput);
  const processedPokemon = await formatPokemon(pokemonData);
  console.log(processedPokemon);
  return processedPokemon;
}

processPokemon("ditto")
