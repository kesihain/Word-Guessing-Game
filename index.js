let startGameButton = document.getElementById("start-game");
let guessBox = document.getElementById("guess-box");
let guessSpace = document.getElementById("guess-space")

function showGuessBox(){
    guessBox.style.display = "block"
}

let words = ["apple","orange","pear","durian","pineapple","banana","kiwi"]

function selectWord(){
    word = words[Math.floor(Math.random()*words.length)]
    return word
}

function buildSpace(word){
    space = ""
    for(i=0;i<word.length;i++){
        space += "_"
    }
    return space
}

startGameButton.addEventListener("click",()=>{
    showGuessBox();
    let word = selectWord();
    guessSpace.innerHTML = buildSpace(word);
    space = buildSpace(word);
})

let submitButton = document.getElementById("submit");
let input = document.getElementById("input-letter");
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let guessedWords = "";

function addGuessedLettersHTML(){
    let guessedListElement = document.querySelector("#guessed-list");
    guessedList = guessedWords.split();
    guessedListElement.innerHTML = "";
    for(let letter of guessedList){
        let listItem =document.createElement("li");
        listItem.innerHTML = letter;
        guessedListElement.appendChild(listItem)
    }
}
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

function wordChecker(letter,word){
    for(i=0;i<word.length;i++){
        if(word[i]==letter){
            space = replaceAt(space,i,letter);
            guessSpace.innerHTML = space;
        }
    }
}

let guessesLeft = 10;
let guessesLeftElement = document.getElementById("guesses-left");

function reduceGuessesRemaining(){
    guessesLeft -=1;
    guessesLeftElement.innerHTML = guessesLeft;
}

function resetGuesses(){
    guessesLeft =10;
    guessesLeftElement.innerHTML = guessesLeft;
}

function outOfGuesses(){
    window.alert("Sorry you are out of Guesses. Please Try again");
    let word = selectWord();
    guessSpace.innerHTML = buildSpace(word);
    space = buildSpace(word);
    guessedWords = "";
    addGuessedLettersHTML();
    resetGuesses();
}

submitButton.addEventListener("click",(event)=>{
    event.preventDefault();
    if(input.value.length !=1 || !alphabet.includes(input.value)){
        window.alert("Please input a single letter between a-z")
    }else if(guessedWords.includes(input.value)){
        window.alert("Please guess a new letter!")
    }else{
        guessedWords += input.value;
        addGuessedLettersHTML();
        wordChecker(input.value,word);
        reduceGuessesRemaining();
    }
    if(!space.includes("_")){
        window.alert("Congratulations!! You found the right word. Please play again")
        let word = selectWord();
        guessSpace.innerHTML = buildSpace(word);
        space = buildSpace(word);
        guessedWords = "";
        addGuessedLettersHTML();
        resetGuesses();
    }else if (guessesLeft==0){
        outOfGuesses();
    }
    document.querySelector("form").reset();
})
