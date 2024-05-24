

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
const bestScoresEl = document.querySelectorAll('.best-score');
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
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const scoreFooter = document.querySelector('.score-footer');
const playAgainButton = document.querySelector('.play-again');


//equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoresArray = [];

//Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];


//Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

//refreshspash page best scores
function bestScoresToDOM(){
    bestScoresArray.forEach((bestScore, index) => {
       /* const bestScoreValues = bestScore; */
       bestScoreValues[index].textContent = `${bestScoresArray[index].bestScore}s`;
    });
}

/* bestScoreValues[0].textContent='hi mom'; */







//check local storage for best scoes, set bestscoresArray
function getSavedBestScores(){
    console.log('best sc arr befor:',bestScoresArray);
    if(localStorage.getItem('bestScore')){
        bestScoresArray = JSON.parse(localStorage.bestScore);
        
    }else{
        bestScoresArray = [
            {questions: 10, bestScore: finalTimeDisplay},
            {questions: 25, bestScore: finalTimeDisplay},
            {questions: 50, bestScore: finalTimeDisplay},
            {questions: 99, bestScore: finalTimeDisplay}
        ];
        localStorage.setItem('bestScore', JSON.stringify(bestScoresArray));
        console.log('best sc arr after:',bestScoresArray);
    }
    bestScoresToDOM();
}


//update best score array
function updateBestScore(){
    bestScoresArray.forEach((score, index) => {
        //select correct best score to update
        if(questionAmount == score.questions){
            //return best score as number with one decimal
            const saveBestScore = Number(bestScoresArray[index].bestScore);
            //update if the new final time is less or replacing zero
            if(saveBestScore === 0 || saveBestScore > finalTimeDisplay){
                bestScoresArray[index].bestScore = finalTimeDisplay;
            }
            
        }
    });
    //update splash page
    bestScoresToDOM();
    localStorage.setItem('bestScore', JSON.stringify(bestScoresArray));

}

//reset game
function playAgain(){
    itemFooter.addEventListener('click', startTimer);
    questionAmount = 0;
    scorePage.hidden = true;
    splashPage.hidden = false;
    
    equationsArray = [];
    playerGuessArray = [];
    console.log('questionAmount:',questionAmount);

}

//show the score page
function showScorePage(){
   
    gamePage.hidden = true;
    scorePage.hidden = false;

    scoreFooter.style.opacity = "0";
        scoreFooter.style.visibility = "hidden";
    
    setTimeout(() => {
        scoreFooter.style.opacity = "1";
        scoreFooter.style.visibility = "visible";
    }, 1000);

}

//format and dispaly time in DOM
function scoresToDOM(){
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    updateBestScore();
    showScorePage();

}

// stop timer, process results, go to score page
function checkTime(){
    
    console.log(timePlayed);
    if(playerGuessArray.length == questionAmount){
        
        clearInterval(timer);
        itemFooter.removeEventListener('click', startTimer);
        console.log('player guess array', playerGuessArray);
       //check wrong gueses, add penalty time
        equationsArray.forEach((equation, index) => {
            if(equation.evaluated == playerGuessArray[index]){
               // correct guess, no penalty

            }else{
                //incorrect guess, add penalty
                penaltyTime += 0.5;
                console.log('penaltyTime', penaltyTime);
            }
        });
        finalTime = timePlayed + penaltyTime;
        console.log('final time', finalTime);
        console.log('final time display', finalTimeDisplay);
        console.log('time', timePlayed);
        scoresToDOM();


    }
}

// add tenth of a second to timePlayed
function addTime(){
    timePlayed += 0.1;
    checkTime();
}

//start timer when game page is clicked
function startTimer(){
    //reset times
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    itemFooter.removeEventListener('click', startTimer);
    
}



//store user selection in playerGuessArray

function select(guessedTrue){
    
    // add player guess to array
    
    return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}

//populate each item of the EquationsArray at a time, after clicking right/wrong btn the other equation of the array will appear


let equationIndex = 0;

function populateGamePage(){
    createEquations();
    
    equationsArray.forEach((equation, index) => {
        itemContainer.textContent = `${equation.value}`;
        /* console.log(equationsArray[equationIndex].value);
        console.log(equationsArray); */
        console.log(equation);
        
    })

    

    rightButton.addEventListener('click', function() {

        if(equationIndex > equationsArray.length - 1){
            equationIndex = 0;
        }else{
            itemContainer.textContent = `${equationsArray[equationIndex++].value}`;
        console.log(equationIndex);
        }
        
});

wrongButton.addEventListener('click', function() {
    itemContainer.textContent = `${equationsArray[equationIndex++].value}`;
    console.log(equationIndex);
});


    
}




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
    }, 600);

}

// navigate from splash page to countdown page
function showCountdown(){

    if(questionAmount){
        countdownPage.hidden = false;
        splashPage.hidden=true;
        countdownStart();
        setTimeout(showGamePage, 2400);
        populateGamePage();
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
itemFooter.addEventListener('click', startTimer);

//on load 
getSavedBestScores();




