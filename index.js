// MODEL ////////////////////////////////////////////////////////////////////////////////
const app = document.getElementById('app');

let colorArray = [
    "yellow",
    "blue",
    "red",
    "green",
]

let randomColorSequence = [];
let playerColorSequence = [];
let points = 0;

// VIEW /////////////////////////////////////////////////////////////////////////////////
updateView()
function updateView() {
let html = /*HTML*/ `
    <div class="color-btn-container">
        <div class="color-btn" id="yellow" onclick="addToPlayerColorSequence(this.id), blink(this.id)"></div><br>
        <div class="color-btn" id="blue" onclick="addToPlayerColorSequence(this.id), blink(this.id)"></div>
    </div>
    <div class="color-btn-container">
        <div class="color-btn" id="red" onclick="addToPlayerColorSequence(this.id), blink(this.id)"></div>
        <div class="color-btn" id="green" onclick="addToPlayerColorSequence(this.id), blink(this.id)"></div>
    </div>
    <button onclick="addToRandomColorSequence()">PLAY</button>
    <button onclick="checkIfCorrect()">CHECK IF CORRECT</button><br>
    <h1>SCORE: ${points}</h1>
`
app.innerHTML = html
}

// CONTROLLER ///////////////////////////////////////////////////////////////////////////

// Adds a color to RANDOM color sequence
function addToRandomColorSequence() {
    let randomNum = Math.floor(Math.random() * colorArray.length)
    randomColorSequence.push(colorArray[randomNum])
    
    for (let i = 0; i < randomColorSequence.length; i++) {
        (function(i) {
            setTimeout(function() {
                blink(randomColorSequence[i]);
            }, i * 750);
        })(i);
    }
}
// Adds a color to PLAYER color sequence
function addToPlayerColorSequence(element) {
    playerColorSequence.push(element)
}


// Goes through the random sequence and compares it to the player's guessed sequence.
// Adds a "point" for each correct guess to see if player got each one right.
function checkIfCorrect() {
    var correctClicks = 0;
    for (let i = 0; i < randomColorSequence.length; i++) {
        if (playerColorSequence[i] == randomColorSequence[i]) {
                correctClicks++
            }
        } 
    if (correctClicks == randomColorSequence.length) {
        points++
        addToRandomColorSequence()
    } else if (correctClicks != randomColorSequence.length) {
        points--
    }
    playerColorSequence = [];
    correctClicks = 0;
    updateView()
}



function blink(colorId) {
    var element = document.getElementById(colorId);
    
    setTimeout(function() {
        blinkOn(element);
    }, 0);
    setTimeout(function() {
        blinkOff(element);
    }, 500);
    
    blinkOn(element)
    blinkOff(element)
}

// Changes opacity to create "blink" effect. Purely cosmetic
function blinkOn(element) {
    element.style.opacity = "1";
}
function blinkOff(element) {
        element.style.opacity = "0.4";
}