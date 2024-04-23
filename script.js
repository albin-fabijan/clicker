let pokemon_num = 0

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
        evolve_price.innerText = "$" + 100*(parseInt(id)+1)*(parseInt(id)+1)

        let pokemon_num_text = document.getElementById("pokemon_num")
        pokemon_num = pokemon_num_text.innerText.split(": ")[1]
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
    price = click_price.innerText.split('$')[1]

    if (parseInt(num) >= price){
        money.innerText = "$" + (parseInt(num) - price) + ""

        let lvl_text = document.getElementById("auto_click_lvl")
        let lvl = lvl_text.innerText.split("lvl ")[1]
        lvl++
        lvl_text.innerText = lvl_text.innerText.split("lvl ")[0] + "lvl " + lvl
        
        click_price.innerText = "$" + 10*((lvl+1)**2)

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
        }, 5000/(lvl**2));
    }
}

function getPokedex(){
    let pokedex_div = document.getElementById("pokedex_div")
    pokedex_div.innerHTML = ""

    let array = new Array(parseInt(pokemon_num))

    for (let i = 0; i < array.length; i++){
        let button = document.createElement("button")

        let pokemon_img = document.createElement("img")
        pokemon_img.src = "sprites/black-white/" + (i+1) + ".png"

        button.appendChild(pokemon_img)

        pokedex_div = document.getElementById("pokedex_div")

        pokedex_div.appendChild(button)
    }
}