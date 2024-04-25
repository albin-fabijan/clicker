let total_money_spent = 0

function nextPokemon(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let img = document.getElementById("enemy_img")
    let src = img.src + ""
    let slice1 = src.split('black-white/')[1] + ""
    let id = slice1.split('.')[0]

    let evolve_price = document.getElementById("evolve_price")
    price = evolve_price.innerText.split('$')[1]
    
    if (parseInt(num) >= price){
        img.src = "sprites/black-white/" + (parseInt(id)+1) + ".png"
        money.innerText = "$" + (parseInt(num) - price) + ""
        total_money_spent += price
        evolve_price.innerText = "$" + 100*(parseInt(id)+1)*(parseInt(id)+1)

        if(localStorage.getItem("num_pkmn") != null){
            localStorage.removeItem("num_pkmn")
        }

        let pokemon_num_text = document.getElementById("pokemon_num")
        pokemon_num = pokemon_num_text.innerText.split(": ")[1]
        localStorage.setItem("num_pkmn", parseInt(pokemon_num)+1)
        pokemon_num_text.innerText = pokemon_num_text.innerText.split(": ")[0] + ": " + (parseInt(pokemon_num)+1)
    }
}

function getMoney(){
    let img = document.getElementById("enemy_img")
    let src = img.src + ""
    let slice1 = src.split('black-white/')[1] + ""
    let id = slice1.split('.')[0]

    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let incr_text = document.getElementById("incr_num")
    let incr = incr_text.innerText.split("lvl ")[1]

    money.innerText = "$" + (parseInt(num)+(parseInt(id)+parseInt(incr))) + ""

    // Cloner l'élément audio
    const clickSound = document.getElementById("clickSound");
    const clonedSound = clickSound.cloneNode();
    
    // Jouer le son cloné
    clonedSound.play();
}

function next_click_incr(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let incr_price = document.getElementById("click_incr_price")
    price = incr_price.innerText.split('$')[1]

    if (parseInt(num) >= price){
        money.innerText = "$" + (parseInt(num) - price) + ""

        let incr_text = document.getElementById("incr_num")
        let incr = incr_text.innerText.split("lvl ")[1]
        incr++
        incr_text.innerText = incr_text.innerText.split("lvl ")[0] + "lvl " + incr

        incr_price.innerText = "$" + 10*((incr+1)**2)
    }
}

let interval_click = null

async function next_auto_click(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let click_price = document.getElementById("auto_click_price")
    let price = click_price.innerText.split('$')[1]

    if (parseInt(num) >= price){
        money.innerText = "$" + (parseInt(num) - price) + ""

        let lvl_text = document.getElementById("auto_click_lvl")
        let lvl = lvl_text.innerText.split("lvl ")[1]
        lvl++
        lvl_text.innerText = lvl_text.innerText.split("lvl ")[0] + "lvl " + lvl
        
        click_price.innerText = "$" + 10*((lvl+1)**2);


        clearInterval(interval_click)

        interval_click = setInterval(() => {
            lvl = lvl_text.innerText.split("lvl ")[1]

            let money = document.getElementById("money_text")
            let num = money.innerText.split('$')[1]

            if (5000/(lvl**2) > 1){
                money.innerText = "$" + (parseInt(num) + 1) + ""
            }
            else{
                money.innerText = "$" + (parseInt(num) + Math.floor(1/(5000/(lvl**2)))) + ""
            }
            // Jouer le son à chaque clic
            const clickSound = document.getElementById("autoClickSound");
            const clonedSound = clickSound.cloneNode();

            // Jouer le son cloné
            clonedSound.play();
        }, 1000);
        
    }
}

async function getPokedex(){
    let pokedex_div = document.getElementById("pokedex_div")
    pokedex_div.innerHTML = ""

    let num = 0

    if(localStorage.getItem("num_pkmn") == null){
        num = 1
    }
    else{
        num = localStorage.getItem("num_pkmn")
    }

    let array = new Array(parseInt(num)+1)

    for (let i = 0; i < array.length; i++){
        let div = document.createElement("div")
        div.setAttribute("id", "button_pokedex")

        let pokemon_img = document.createElement("img")
        pokemon_img.src = "sprites/black-white/" + (i+1) + ".png"
        if (i == array.length-1){
            pokemon_img.style.filter = "grayscale(100%)"
        }
        pokemon_img.setAttribute("id", "img_pokedex")

        let name = await getPokemonNameFromAPI(i+1)

        let span = document.createElement("span")
        span.innerText = "#" + (i+1) + " " + name
        span.setAttribute("id", "name_pokedex")

        div.appendChild(pokemon_img)
        div.appendChild(span)

        pokedex_div = document.getElementById("pokedex_div")
        pokedex_div.appendChild(div)
    }
}

async function getPokemonNameFromAPI(id){
    let response = await fetch('https://tyradex.vercel.app/api/v1/pokemon/'+id)
    let obj = await response.json()
    return obj.name.en
}