let total_money_spent = 0
let shiny = false
let luck = 0

let show = false
let count = 0

let konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === konami[count]){
            count++
        }
        else{
            count = 0
        }

        if (count == 10){
            show = true
        }

        if (show){
            show = false
            count = 0
            lucky()
        }
    });
})

function nextPokemon(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let img = document.getElementById("enemy_img")
    let src = img.src + ""
    let slice1 = src.split('black-white/')[1] + ""
    let id = ""
    if (!slice1.includes("shiny")){
        id = slice1.split('.')[0]
    }
    else{
        let slice2 = slice1.split('shiny/')[1] + ""
        id = slice2.split('.')[0]
    }

    let evolve_price = document.getElementById("evolve_price")
    price = evolve_price.innerText.split('$')[1]
    
    if (parseInt(num) >= price){
        if (parseInt(id)+1 <= 649 && !shiny){
            img.src = "sprites/black-white/" + (parseInt(id)+1) + ".png"
            evolve_price.innerText = "$" + Math.floor(100*(parseInt(id)+1)*(parseInt(id)+1)**((id/100)+1))
        }
        else if (parseInt(id) == 649 && !shiny){
            shiny = true
            img.src = "sprites/black-white/shiny/1.png"
            evolve_price.innerText = "$" + 100*(parseInt(id)+1)*(parseInt(id)+1)*(parseInt(id))
        }
        else{
            img.src = "sprites/black-white/shiny/" + (parseInt(id)+1) + ".png"
            evolve_price.innerText = "$" + 100*(parseInt(id)+650)**(Math.floor(id/10)+1)
        }
        money.innerText = "$" + (parseInt(num) - price) + ""
        total_money_spent += price

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
let interval_luck = null

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

        if (lvl < 30){
            click_price.innerText = "$" + 10*((lvl+1)**2)
        }
        else{
            click_price.innerText = "$" + price*(lvl-28)**Math.floor(((lvl*2)/60))
        }

        clearInterval(interval_click)

        interval_click = setInterval(() => {
            lvl = lvl_text.innerText.split("lvl ")[1]

            let money = document.getElementById("money_text")
            let num = money.innerText.split('$')[1]

            if (5000/(lvl**2) > 10){
                money.innerText = "$" + (parseInt(num) + 1) + ""
            }
            else{
                money.innerText = "$" + (parseInt(num) + parseInt(lvl-22) * Math.floor(Math.floor(((lvl-22)**2)/lvl) + 1)) + ""
            }
        }, 5000/(lvl**2));
    }
}

async function next_luck(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    let luck_price = document.getElementById("luck_price")
    price = luck_price.innerText.split('$')[1]

    if (parseInt(num) >= price){
        money.innerText = "$" + (parseInt(num) - price) + ""

        luck++
        
        luck_price.innerText = "$" + 10**(luck+2)

        clearInterval(interval_luck)

        interval_luck = setInterval(() => {
            const array = new Uint32Array(1);
            self.crypto.getRandomValues(array);
        
            console.log(array[0]%4000)
        
            if (array[0]%4000 <= luck){
                lucky()
            }
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
        if (i < 649){
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
        else{
            let div = document.createElement("div")
            div.setAttribute("id", "button_pokedex")

            let pokemon_img = document.createElement("img")
            pokemon_img.src = "sprites/black-white/shiny/" + (i-648) + ".png"
            if (i == array.length-1){
                pokemon_img.style.filter = "grayscale(100%)"
            }
            pokemon_img.setAttribute("id", "img_pokedex")

            let name = await getPokemonNameFromAPI(i-648)

            let span = document.createElement("span")
            span.innerText = "#" + (i-648) + "\u25ca" + "\u02da" + " Shiny " + name
            span.setAttribute("id", "name_pokedex")

            div.appendChild(pokemon_img)
            div.appendChild(span)

            pokedex_div = document.getElementById("pokedex_div")
            pokedex_div.appendChild(div)
        }
    }
}

async function getPokemonNameFromAPI(id){
    let response = await fetch('https://tyradex.vercel.app/api/v1/pokemon/'+id)
    let obj = await response.json()
    return obj.name.en
}

function lucky(){
    let button = document.createElement("button")
    button.setAttribute("id", "lucky_button")
    button.style.position = "absolute"
    const array = new Uint32Array(2);
    self.crypto.getRandomValues(array);
    button.style.top = array[0]%90 + "%"
    button.style.left = array[1]%90 + "%"
    button.onclick = lucky_clicked
    
    let img = document.createElement("img")
    img.src = "sprites/coin1.png"
    button.appendChild(img)

    document.body.appendChild(button)

    let interval_luck_gone = null

    clearInterval(interval_luck_gone)

    let timer = 0
    
    fadeIn(img)

    interval_luck_gone = setInterval(() => {
        if (timer < 5){
            timer++
        }
        else{
            timer = 0
            button.remove()
            clearInterval(interval_luck_gone)
        }
    }, 1000);
}

function lucky_clicked(){
    let money = document.getElementById("money_text")
    let num = money.innerText.split('$')[1]

    money.innerText = "$" + parseInt(num)*2 + ""
    
    let button = document.getElementById("lucky_button")
    button.remove()
}

function fadeIn(el) {
    el.style.opacity = 0;
    var tick = function () {
        el.style.opacity = +el.style.opacity + 0.005;
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
    };
    tick();
}