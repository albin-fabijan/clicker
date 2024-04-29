let total_money_spent = 0
let shiny = false
let luck = 0

let show = false
let count = 0
let setup_bool = true

let money = null
let num = null
let money_num = null

let interval_click = null
let interval_luck = null

function setup(){
    if (setup_bool){
        //pokemon
        let pokemon_num_text = document.getElementById("pokemon_num")
        let pkmn_num = 0
        if (localStorage.getItem("num_pkmn") != null){
            pkmn_num = parseInt(localStorage.getItem("num_pkmn"))
        }
        pokemon_num_text.innerText = pokemon_num_text.innerText.split(": ")[0] + ": " + (parseInt(pkmn_num))
        let img = document.getElementById("enemy_img")
        let evolve_price = document.getElementById("evolve_price")
        if (pkmn_num < 649){
            img.src = "sprites/black-white/" + (parseInt(pkmn_num)+1) + ".png"
            evolve_price.innerText = "$" + Math.floor(100*(parseInt(pkmn_num)+1)*(parseInt(pkmn_num)+1)**((pkmn_num/100)+1))
        }

    
        let lvl_text = document.getElementById("auto_click_lvl")
        let click_price = document.getElementById("auto_click_price")
        let lvl = 0
        if (localStorage.getItem("auto") != null){
            lvl = localStorage.getItem("auto")
        }
        lvl_text.innerText = lvl_text.innerText.split("lvl ")[0] + "lvl " + lvl
        if (lvl < 30){
            lvl++
            click_price.innerText = "$" + 10*((lvl)**2)
            lvl--
        }
        else{
            price = localStorage.getItem("lastPrice")
            click_price.innerText = "$" + Math.floor(price*1.2)
        }
        if (lvl > 0){
            interval_click = setInterval(() => {
                if (5000/(lvl**2) > 10){
                    money_num += 1
                    localStorage.setItem("money", parseInt(money_num))
                    money.innerText = "$" + getNumAbreviation(money_num) + ""
                }
                else{
                    money_num += parseInt(lvl-22) * Math.floor(Math.floor(((lvl-22)**2)/lvl) + 1)
                    localStorage.setItem("money", parseInt(money_num))
                    money.innerText = "$" + getNumAbreviation(money_num) + ""
                }
            }, 5000/(lvl**2));
        }

        //click
        let incr_text = document.getElementById("incr_num")
        let incr_price = document.getElementById("click_incr_price")
        let incr = 0
        if (localStorage.getItem("incr") != null){
            incr = localStorage.getItem("incr")
        }
        incr_text.innerText = incr_text.innerText.split("lvl ")[0] + "lvl " + incr
        incr++
        incr_price.innerText = "$" + 10*((incr)**2)
        incr--

        //luck
        let luck_price = document.getElementById("luck_price")
        if (localStorage.getItem("luck") != null){
            luck = localStorage.getItem("luck")
        }
        luck++
        luck++
        luck_price.innerText = "$" + 10**(luck)
        luck--
        luck--
        
        //money
        money = document.getElementById("money_text")
        num = money.innerText.split('$')[1]
        money_num = parseInt(num)
        if (localStorage.getItem("money") != null){
            money_num = parseInt(localStorage.getItem("money"))
        }
        money.innerText = "$" + getNumAbreviation(money_num) + ""
        
        setup_bool = false
    }    
}

function reset(){
    //money
    money_num = 0
    money.innerText = "$" + getNumAbreviation(money_num) + ""

    //storage
    localStorage.clear()

    //pokemon
    let pokemon_num_text = document.getElementById("pokemon_num")
    pokemon_num_text.innerText = pokemon_num_text.innerText.split(": ")[0] + ": 0"
    let img = document.getElementById("enemy_img")
    img.src = "sprites/black-white/1.png"
    let evolve_price = document.getElementById("evolve_price")
    evolve_price.innerText = "$100"

    //auto
    clearInterval(interval_click)
    let click_price = document.getElementById("auto_click_price")
    click_price.innerText = "$10"
    let lvl_text = document.getElementById("auto_click_lvl")
    lvl_text.innerText = lvl_text.innerText.split("lvl ")[0] + "lvl 0"

    //click
    let incr_price = document.getElementById("click_incr_price")
    incr_price.innerText = "$10"
    let incr_text = document.getElementById("incr_num")
    incr_text.innerText = incr_text.innerText.split("lvl ")[0] + "lvl 0"

    //luck
    clearInterval(interval_luck)
    let luck_price = document.getElementById("luck_price")
    luck_price.innerText = "$100"
    luck = 0
}

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

function getNumAbreviation(n){
    if (n > 1000){
        let letter = "k"
        let biggerNum = 1000
        if (n > 1000000){
            letter = "M"
            biggerNum = 1000000
            if (n > 1000000000){
                letter = "B"
                biggerNum = 1000000000
                if (n > 1000000000000){
                    letter = "T"
                    biggerNum = 1000000000000
                }
            }
        }
        let smallerNums = Math.floor((n%biggerNum)/(biggerNum/1000))
        if (smallerNums < 100){
            smallerNums = "0" + smallerNums
            if (smallerNums < 10){
                smallerNums = "0" + smallerNums
            }
        }
        print_num = Math.floor(n/biggerNum) + "." + smallerNums + letter
        return print_num
    }
    else{
        return n
    }
}

function nextPokemon(){
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
    
    if (parseInt(money_num) >= price){
        if (parseInt(id)+1 <= 649 && !shiny){
            img.src = "sprites/black-white/" + (parseInt(id)+1) + ".png"
            let price_num = Math.floor(100*(parseInt(id)+1)*(parseInt(id)+1)**((id/100)+1))
            evolve_price.innerText = "$" + parseInt(price_num)
        }
        else if (parseInt(id) == 649 && !shiny){
            shiny = true
            img.src = "sprites/black-white/shiny/1.png"
            let price_num = Math.floor(100*(parseInt(id)+1)*(parseInt(id)+1)**((id/100)+1))
            evolve_price.innerText = "$" + parseInt(price_num)
        }
        else{
            img.src = "sprites/black-white/shiny/" + (parseInt(id)+1) + ".png"
            evolve_price.innerText = "$" + 100*(parseInt(id)+650)**(Math.floor(id/10)+1)
        }
        money_num -= price
        localStorage.setItem("money", parseInt(money_num))
        money.innerText = "$" + getNumAbreviation(money_num) + ""
        total_money_spent += price

        if(localStorage.getItem("num_pkmn") != null){
            localStorage.removeItem("num_pkmn")
        }

        let pokemon_num_text = document.getElementById("pokemon_num")
        let pokemon_num = pokemon_num_text.innerText.split(": ")[1]
        localStorage.setItem("num_pkmn", parseInt(pokemon_num)+1)
        pokemon_num_text.innerText = pokemon_num_text.innerText.split(": ")[0] + ": " + (parseInt(pokemon_num)+1)
    }
}

function getMoney(){
    let img = document.getElementById("enemy_img")
    let src = img.src + ""
    let slice1 = src.split('black-white/')[1] + ""
    let id = slice1.split('.')[0]

    let incr_text = document.getElementById("incr_num")
    let incr = incr_text.innerText.split("lvl ")[1]

    money_num += parseInt(id)+parseInt(incr)
    localStorage.setItem("money", parseInt(money_num))
    money.innerText = "$" + getNumAbreviation(money_num) + ""

    // Clone the audio element
    const clickSound = document.getElementById("clickSound");
    const clonedSound = clickSound.cloneNode();
    
    // Play the cloned sound
    clonedSound.play();
}

function next_click_incr(){
    let incr_price = document.getElementById("click_incr_price")
    price = incr_price.innerText.split('$')[1]

    if (money_num >= price){
        money_num -= price
        localStorage.setItem("money", parseInt(money_num))
        money.innerText = "$" + getNumAbreviation(money_num) + ""

        let incr_text = document.getElementById("incr_num")
        let incr = incr_text.innerText.split("lvl ")[1]
        incr++
        localStorage.setItem("incr", parseInt(incr))
        incr_text.innerText = incr_text.innerText.split("lvl ")[0] + "lvl " + incr

        incr_price.innerText = "$" + 10*((incr+1)**2)
    }
}

async function next_auto_click(){
    let click_price = document.getElementById("auto_click_price")
    price = click_price.innerText.split('$')[1]

    if (money_num >= price){
        money_num -= price
        localStorage.setItem("money", parseInt(money_num))
        money.innerText = "$" + getNumAbreviation(money_num) + ""

        let lvl_text = document.getElementById("auto_click_lvl")
        let lvl = lvl_text.innerText.split("lvl ")[1]
        lvl++
        localStorage.setItem("auto", parseInt(lvl))
        lvl_text.innerText = lvl_text.innerText.split("lvl ")[0] + "lvl " + lvl

        if (lvl < 30){
            click_price.innerText = "$" + 10*((lvl+1)**2)
        }
        else{
            localStorage.setItem("lastPrice", price)
            click_price.innerText = "$" + Math.floor(price*1.2)
        }

        clearInterval(interval_click)

        interval_click = setInterval(() => {
            lvl = lvl_text.innerText.split("lvl ")[1]

            if (5000/(lvl**2) > 10){
                money_num += 1
                money.innerText = "$" + getNumAbreviation(money_num) + ""
                localStorage.setItem("money", parseInt(money_num))
            }
            else{
                money_num += parseInt(lvl-22) * Math.floor(Math.floor(((lvl-22)**2)/lvl) + 1)
                money.innerText = "$" + getNumAbreviation(money_num) + ""
                localStorage.setItem("money", parseInt(money_num))
            }
            // Jouer le son à chaque clic
            const clickSound = document.getElementById("autoClickSound");
            const clonedSound = clickSound.cloneNode();
        
            // Jouer le son cloné
            clonedSound.play();
        }, 1000);   
    }
    // Clone the audio element
    const autoClickSound = document.getElementById("autoClickSound");
    const clonedSound = autoClickSound.cloneNode();
            
    // Play the cloned sound
    clonedSound.play();
}

async function next_luck(){
    let luck_price = document.getElementById("luck_price")
    price = luck_price.innerText.split('$')[1]

    if (money_num >= price){
        money_num -= price
        localStorage.setItem("money", parseInt(money_num))
        money.innerText = "$" + getNumAbreviation(money_num) + ""

        luck++
        localStorage.setItem("luck", parseInt(luck))
        
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

    let n = 0

    if(localStorage.getItem("num_pkmn") == null){
        n = 0
    }
    else{
        n = localStorage.getItem("num_pkmn")
    }

    let array = new Array(parseInt(n)+1)

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
    money_num *= 2
    localStorage.setItem("money", parseInt(money_num))
    money.innerText = "$" + parseInt(money_num) + ""
    
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

let musicPlaying = false;

function toggleMusic() {
    let music = document.getElementById("music_player");
    
    if (!musicPlaying) {
        music.play();
        musicPlaying = true;
    } else {
        music.pause();
        musicPlaying = false;
    }
}

