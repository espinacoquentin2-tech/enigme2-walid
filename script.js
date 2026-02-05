const solution = "EVGWALIDMAIPARIS";
const wordLengths = [3, 5, 3, 5]; 

window.addEventListener("load", () => {
    createSlots();
    document.getElementById("answer").focus();
});

document.addEventListener("click", () => {
    document.getElementById("bgm").play().catch(()=>{});
    document.getElementById("answer").focus();
});

function createSlots() {
    wordLengths.forEach((len, wordIdx) => {
        const wordDiv = document.getElementById(`word${wordIdx + 1}`);
        for (let i = 0; i < len; i++) {
            const span = document.createElement("span");
            span.className = "letter-slot";
            wordDiv.appendChild(span);
        }
    });
}

document.getElementById("answer").addEventListener("input", (e) => {
    const val = normalize(e.target.value);
    const slots = document.querySelectorAll(".letter-slot");
    slots.forEach((slot, index) => {
        slot.innerText = val[index] || "";
    });
});

function normalize(txt) {
    return txt.toUpperCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              .replace(/[^A-Z]/g, "");
}

function checkAnswer() {
    const inputVal = normalize(document.getElementById("answer").value);
    const container = document.getElementById("gba-container");
    const content = document.getElementById("screen-content");
    const resultMsg = document.getElementById("result");

    if (inputVal === solution) {
        document.getElementById("successSound").play();
        content.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; width:100%;">
                <h2 style="font-size: 12px; color: #fff; margin-bottom:15px;">FÉLICITATIONS !</h2>
                <p style="font-size: 8px; line-height: 1.6; margin-bottom: 15px;">
                    Prépare tes billets de train pour Paris vendredi 29 mai !<br><br>
                    Retour lundi 01 juin !
                </p>
                <p style="font-size: 7px; opacity: 0.7; font-style: italic;">
                    D'autres énigmes suivront pour que tu en apprennes plus ...
                </p>
            </div>
        `;
    } else {
        container.classList.add("shake");
        resultMsg.innerText = "❌ CODE ERRONÉ";
        resultMsg.classList.add("gameover");
        setTimeout(() => {
            container.classList.remove("shake");
            resultMsg.innerText = "";
        }, 1000);
    }
}

// Pokémon en fond (sprites aléatoires)
for(let i=0; i < 40; i++){
    spawnPokemon();
}

function spawnPokemon(){
    const id = Math.floor(Math.random() * 151) + 1;
    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    img.className = "pokemon";
    img.style.left = Math.random() * window.innerWidth + "px";
    img.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(img);
    setInterval(() => {
        img.style.left = Math.random() * (window.innerWidth - 80) + "px";
        img.style.top = Math.random() * (window.innerHeight - 80) + "px";
    }, 5000);
}