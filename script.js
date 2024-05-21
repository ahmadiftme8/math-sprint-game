

// Header
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header h1');

// Splash page
const splashPage = document.getElementById('splash-page');
const startForm = document.getElementById('start-form');
const selectionContainer = document.querySelector('.selection-container');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('.radio-input');
const labels = document.querySelectorAll('.label-radio');
const bestScores = document.querySelectorAll('.best-score');
const bestScoreTexts = document.querySelectorAll('.best-score span');
const bestScoreValues = document.querySelectorAll('.best-score-value');
const selectionFooter = document.querySelector('.selection-footer');
const startButton = document.querySelector('.start');

// Countdown page
const countdownPage = document.getElementById('countdown-page');
const countdown = document.querySelector('.countdown');

// Game Page
const gamePage = document.getElementById('game-page');
const itemContainer = document.querySelector('.item-container');
const itemFooter = document.querySelector('.item-footer');
const wrongButton = document.querySelector('.wrong');
const rightButton = document.querySelector('.right');

// Score page
const scorePage = document.getElementById('score-page');
const scoreContainer = document.querySelector('.score-container');
const title = document.querySelector('.title');
const finalTime = document.querySelector('.final-time');
const baseTime = document.querySelector('.base-time');
const penaltyTime = document.querySelector('.penalty-time');
const scoreFooter = document.querySelector('.score-footer');
const playAgainButton = document.querySelector('.play-again');


//equations
let questionAmount = 0;
let equationsArray = [];

//Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];



// dispalay game page
function showGamePage(){
    gamePage.hidden=false;
    countdownPage.style.display = 'none';
}

//get random number up to a max number
function getRandomInt(max){
       return Math.floor(Math.random() * Math.floor(max));
}

// Creat correct/Incorrect Random Equations
function createEquations(){

    // Randomly choose how many CORRECT equations there should be
    const correctEquations = getRandomInt(questionAmount);
    console.log('correct equ :', correctEquations);
    // Randomly choose how many WRONG equations there should be
    const wrongEquations = questionAmount - correctEquations;
    console.log('wrong equ :', wrongEquations);

    //loop through, multiply random numbers up to 9, push to array

    for(let i = 0; i< correctEquations; i++){
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber ;
        const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationObject = {value: equation, evaluated: 'true'};
        equationsArray.push(equationObject);
    }

    //loop through, mess with the equation results, push to array

    for(let i = 0; i<wrongEquations; i++){
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber ;
        wrongFormat[0] = `${firstNumber} X ${secondNumber + 1} = ${equationValue}`;

        wrongFormat[1] = `${firstNumber} X ${secondNumber + 1} = ${equationValue - 1}`;

        wrongFormat[2] = `${firstNumber + 1} X ${secondNumber + 1} = ${equationValue}`;

        const formatChoice = getRandomInt(3);
        const equation = wrongFormat[formatChoice];
        equationObject = {value: equation, evaluated:'false'};
        equationsArray.push(equationObject);
    }
    shuffle(equationsArray);
    
}


// generta the equsition as html through DOM
function equationsToDOM(){
    equationsArray.forEach((equation)=>{
        //item
        const item = document.createElement('div');
        item.classList.add('item');
        // equation text 
        const equationText = document.createElement('h1');
        equationText.textContent= equation.value;
        //append 
        item.appendChild(equationText);
        itemContainer.appendChild(item);

    })
}



// dispaly 3.2.1.go
function countdownStart(){
    
    let count = 2;
    countdown.textContent = `3`;
    let countdownSetInterval = setInterval(function() {
        if(count > 0) {
            countdown.textContent = `${count}`;
            count--;
            
        } else {
            countdown.textContent = 'GO!';
            clearInterval(countdownSetInterval);
        }
    }, 1000);

}

// navigate from splash page to countdown page
function showCountdown(){

    if(questionAmount){
        countdownPage.hidden = false;
        splashPage.hidden=true;
        countdownStart();
        populateGamePage();
        setTimeout(showGamePage, 4000);
    }else{
        alert('choose an item')
    }
    
}

//get the value from our selcted radio btn
function getRadioValue(){
    let radioValue;
    radioInputs.forEach((radioInput)=>{
        if(radioInput.checked){
            radioValue = radioInput.value;
            return radioValue;
        }
    })
return radioValue;
}

// form tha decide amount of questions
function selectQuestionAmount(e){
    e.preventDefault();
    questionAmount = getRadioValue();
    console.log('question amount:', questionAmount);
    showCountdown();
}





// Get all the radio-container elements
let containers = document.querySelectorAll('.radio-container');

// Add a click event listener to each container
containers.forEach(container => {
    container.addEventListener('click', function(e) {
        // Stop if the event was triggered programmatically
        if (e.isTrusted === false) return;

        // Get the label inside the clicked container
        let label = this.querySelector('.label-radio');

        // Create a new click event
        let clickEvent = new MouseEvent('click', {
            'view': window,
            /* 'bubbles': true, */
            'cancelable': false
        });

        // Dispatch the click event on the label
        label.dispatchEvent(clickEvent);

        // Remove the 'selected-label' class from all containers
        containers.forEach(c => c.classList.remove('selected-label'));

        // Add the 'selected-label' class to the clicked container
        this.classList.add('selected-label');
    });
});



//Event Listenes
startForm.addEventListener('submit', selectQuestionAmount);


