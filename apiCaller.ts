const url: string = "https://pokeapi.co/api/v2/pokemon/"

async function callApi(api:string, pokemon:string){
    const newUrl = api + pokemon
    console.log(newUrl);
    
    const res = await fetch(newUrl, {
        method: 'GET'
    }).then(async(p) =>{
        const data = await p.json()
        console.log(data)
    })
}

callApi(url, "ditto")