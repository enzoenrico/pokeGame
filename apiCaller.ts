const apiUrl: string = "https://pokeapi.co/api/v2/pokemon/";

type poketype = {
  name: string;
  id: number;
  moves: pokeAttack[];
  fatness: number;
};

type pokeAttack = {
  name: string;
  url: string;
};

//first async function that calls the pokeApi
async function getPokemon(pokemonName: string) {
  const res = await fetch(apiUrl + pokemonName);
  const data = await res.json();
  return data;
}
//async function to format data to poke type
async function formatPokemon(pokemonData: any): Promise<poketype> {
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

async function processPokemon(userInput: string): Promise<poketype> {
  const pokemonData = await getPokemon(userInput);
  const processedPokemon: poketype = await formatPokemon(pokemonData);
  console.log(processedPokemon);
  return processedPokemon;
}

async function getRandomPoke(howmany: number): Promise<Array<poketype>> {
  let pokemonList:Array<poketype> = [];
  for (let i = 0; i < howmany; i++) {
    let pokeId: number = Math.floor(Math.random() * 1000);
    console.log(`[SYSTEM]PokeID: ${pokeId}`)
    const pokeData = await getPokemon(pokeId.toString());
    const pokemonReturned = await formatPokemon(pokeData);
    // console.log(pokemonReturned);
    pokemonList.push(pokemonReturned)
  }
  console.table(pokemonList)
  return pokemonList;
}

// processPokemon("ditto")
getRandomPoke(10);
