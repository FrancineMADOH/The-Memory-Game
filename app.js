//first we select all the memory cards in a variable called allCards

/*this variable has to be const type because this number is not 
going to change in our case*/

const allCards = document.querySelectorAll('.memory-card');
const cardGrid = document.querySelector('#container');

function onStart() {
    const shuffledCard = shuffle(Array.from(allCards));
    for (let newCards of shuffledCard) {
        newCards.className = 'memory-card';
        cardGrid.appendChild(newCards);
    }

}

/*make the cards moves all over the grids by calling a function on  the container
then  we call an event listener  wich shuffle the cards when the page loads
onStart() . Shuffle function from http://stackoverflow.com/a/2450976*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

onStart();

//we make sure that every time a card is clicked individually it fire an event base on the playing function
allCards.forEach(card => card.addEventListener('click', playing));

//the game logic

//we declare 3 variable to set the game logic

let clickedCard = false;
let card1, card2;

//let's define the playing function
function playing() {
    this.classList.toggle('flip');
    if (!clickedCard) {
        clickedCard = true;
        card1 = this;

        // the player has clicked the first card

    } else {
        clickedCard = false;
        card2 = this;

        /*the player has clicked a second card
        checking if the cards match*/
        if (card1.dataset.name === card2.dataset.name) {

            card1.removeEventListener('click', playing);
            card2.removeEventListener('click', playing);

            //wow the cards match

        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');

                //the clicked cards do not match

            }, 1000);
        }
        //moves += 1; we add move in countMove() already
        countMove();
        score.innerHTML = moves;
        console.log('timer');
    };
}

//we call an event on the play again function

let replay = document.querySelector('.playagain');
replay.addEventListener('click', onStart);


//display the number of moves in the score panel

let score = document.querySelector('.move');
let moves = 0;
score.innerHTML = moves;
function countMove() {
    moves++;
    score.innerHTML = moves;
    
//start timer on first move

    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

}

//we call a function wich make the time begging to count when the player clicked the first card

let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0sec";

let interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};

