// --------------- color picker

window.addEventListener("load", startup, false);

let picker = document.getElementsByClassName("picker");
let arraypicker = Array.from(picker);
let arrayMyColor = {};

function startup(event) {
    arraypicker.map(
        (element) => {
            element.value = "#FEA1A1";
            element.addEventListener("input", (event) => updateColor(event, element), false);
            element.select();
        }
    )
}

const updateColor = (event, element) => {
    let colorSquare = document.getElementById(`square${element.id}`);
    colorSquare.style.backgroundColor = event.target.value;
    let color = getComputedStyle(colorSquare).backgroundColor;
    arrayMyColor[element.id] = color;
}

const saveMyColor = () => {
    sessionStorage.setItem("myColor", JSON.stringify(arrayMyColor));
    window.location.href = "./readyToPlay.html";
}

let myColor = JSON.parse(sessionStorage.getItem("myColor"));
let transformToArrayColors = [];

let startColorsTransform = () => {
    for ( const property in myColor){
        transformToArrayColors.push(myColor[property]);
    }
}
startColorsTransform();

// ------- Function that save and change screen to Game Board

const screenBeginnerBoard = () => {
    sessionStorage.setItem("forBoard", "beginnerBoard");
    window.location.href = "./readyToPlay.html";
    dificultad = "screenBeginnerBoard";
    
};

const screenMediumBoard = () => {
    sessionStorage.setItem("forBoard", "mediumBoard");
    window.location.href = "./readyToPlay.html";
    dificultad = "screenMediumBoard";
}

const screenAdvancedBoard = () => {
    sessionStorage.setItem("forBoard", "advancedBoard"),
    window.location.href = "./readyToPlay.html";
    dificultad = "screenAdvancedBoard";
};

// -------------- Function that save and change screen of the levels

const screenLevel1 = () => {
    sessionStorage.setItem("forLevel", "beginnerRow");
    window.location.href = "./colors.html";
}

const screenLevel2 = () => {
    sessionStorage.setItem("forLevel", "mediumRow");
    window.location.href = "./colors.html";
}
const screenLevel3 = () => {
    sessionStorage.setItem("forLevel", "advancedRow");
    window.location.href = "./colors.html";
}

let selectThisLevel = sessionStorage.getItem("forLevel");
let selectRes = document.getElementById(selectThisLevel);

if (selectRes){
    selectRes.style.display = "flex";
}

// Here we save to sessionStorage gamer Name

const savePlayerName = () => {

    let player = document.getElementById("name").value;
    if(player != "" && player != null){
        sessionStorage.setItem("playerNameIs", player);
        window.location.href = "../pages/level.html";
    } else {
        alert("Nombre obligatorio!!");
        window.location.href = "../pages/game.html";
    } 
}

let choose = document.getElementById("chooseColors");
let playerNAme = sessionStorage.getItem("playerNameIs");
choose.innerHTML = `Hola ${playerNAme}, escoge un nivel`;

