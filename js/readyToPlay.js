// funcion que genera la combina

// new board style
let containerR = document.getElementById("containerR");
// Definimod un contador para agregarle un identificador a cada fila
let rowCounter = 1;

const createMyFills = () => {
  let fila = document.createElement("div");
  fila.className = "fila";
  fila.id = "fila-" + rowCounter;

  for (let i = 0; i < 4; i++) {
    let squareR = document.createElement("div");
    squareR.className = "squareR";
    fila.appendChild(squareR);
  }

  let grid = document.createElement("div");
  grid.className = "grid";
  fila.appendChild(grid);

  for (let i = 0; i < 4; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    grid.appendChild(gridItem);
  }
  rowCounter += 1;
  containerR.appendChild(fila);
};

let dificultad = sessionStorage.getItem("forLevel");
if (dificultad === "beginnerRow") {
  for (let i = 0; i < 10; i++) {
    createMyFills();
  }
} else if (dificultad === "mediumRow") {
  for (let i = 0; i < 8; i++) {
    createMyFills();
  }
} else if (dificultad === "advancedRow") {
  for (let i = 0; i < 6; i++) {
    createMyFills();
  }
}
// Tomamos el valor que anteriormente guardamos en el sessionStorage.
const colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));
console.log(
  "Estos son los colores que devuelve el sessionStorage:",
  colorsFromLocalStorage
);
// Esto nos devuelve un objeto tipo { B: "color", B1: "color2" ... }.
// Te recomiendo solo guardar un array de colores en el sessionStorage, tipo ["color1", "color2", ...].
// Para crear un array de todos los valores de ese objeto, usamos lo siguiente.
const colors = Object.values(colorsFromLocalStorage);

// Este es el contenedor donde se van a agregar los colores en el HTML.
const myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");

// Ya que tenemos los colores disponibles los crearmos y los agregamso al HTML.
colors.map((color, index) => {
  const selectedColor = document.createElement("div");
  selectedColor.classList.add("circleC-myColor");
  selectedColor.id = "selectedColorsOfPicker" + index;
  selectedColor.style.backgroundColor = color;
  myColorsForPlayElement.appendChild(selectedColor);
});

// Generamos la combinación secreta de colores
let randomColors = [];

const secretAnswerColor = () => {
  let transformToArrayColors = Object.values(colorsFromLocalStorage);
  let indexArray = [...Array(transformToArrayColors.length).keys()];
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * indexArray.length);
    let randomColorIndex = indexArray[randomIndex];
    randomColors.push(transformToArrayColors[randomColorIndex]);
    indexArray.splice(randomIndex, 1);
  }
};

secretAnswerColor();

document.getElementById("secretColorAnswer1").style.backgroundColor =
  randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor =
  randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor =
  randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor =
  randomColors[3];

// revisar si esta bien declarado el click, por que quiero que me funcione en cada linea
const firstRowSquares = document.querySelectorAll(".fila:first-child .squareR");

firstRowSquares.forEach((square) => {
  square.addEventListener("click", () => {
    let currentColorIndex = colors.indexOf(square.style.backgroundColor);
    let nextColorIndex = (currentColorIndex + 1) % colors.length;
    let nextColor = colors[nextColorIndex];
    square.style.backgroundColor = nextColor;
  });
});

// Aquí empieza la comprobación

let currentRow = 1;
let gridItems = document.querySelectorAll(".grid-item");

const checkMyAnswer = () => {
    let squareElements = document.querySelectorAll(`#fila-${currentRow} .squareR`);
    let yourCombination = Array.from(squareElements, (el) => el.style.backgroundColor);
    let matchedColors = [];
    let matchedPositions = [];

    for (let i = 0; i < randomColors.length; i++) {
        if (randomColors[i] === yourCombination[i]) {
            matchedPositions.push(i);
        } else if (yourCombination.includes(randomColors[i])) {
            matchedColors.push(i);
        }
    }

    gridItems.forEach((gridItem, index) => {
        if (index < 4) {
            if (matchedPositions.includes(index)) {
                gridItem.style.backgroundColor = "red";
            } else if (matchedColors.includes(index)) {
                gridItem.style.backgroundColor = "white";
            } else {
                gridItem.style.backgroundColor = "transparent";
            }
        }
    });

    let correctAnswerSecretChoice = Array.from(squareElements, (el) => el.style.backgroundColor);

    if (JSON.stringify(correctAnswerSecretChoice) == JSON.stringify(randomColors)) {
        window.location.href = "./winner.html";
    } else {
        // Clonamos y reemplazamos los squares de la fila para quitarles el eventListener
        squareElements.forEach((square) => {
            let clonedSquare = square.cloneNode(true);
            square.parentNode.replaceChild(clonedSquare, square);
        })
        currentRow++;
        // if (currentRow){
        //     let nextFill = document.getElementById(`fila${currentRow}`);
        //     console.log(currentRow);
        //     let  nextSquareElements = nextFill.querySelectorAll(".squareR");
        //     nextSquareElements.forEach(square => {
        //         square.style.backgroundColor = "transparent";
        //     });
        //     nextFill.addEventListener("click", checkMyAnswer);

        //     } else {
        //         console.log("se acabo!!!!!");
        //     }
        }
    };