//Array of word choices
var wildAnimals = [
	"AARDVARK", "ALLIGATOR", "ANACONDA", "ANTELOPE", "BABOON",
	"BISON", "CAMEL", "CHEETAH", "CHIMPANZEE", "DINGO",
	"ELEPHANT", "EMU", "FLAMINGO", "GIRAFFE", "GORILLA",
	"HIPPOPOTAMUS", "JAGUAR", "KANGAROO", "KOALA", "LEMUR",
	"LEOPARD", "LION", "MEERKAT", "MONGOOSE", "OSTRICH",
	"PANDA", "PORCUPINE", "RHINOCEROS", "SLOTH", "TIGER",
	"TORTOISE", "VULTURE", "WALRUS", "WOLF", "ZEBRA"];

//Array of letters
var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I", "J", "K", "L", "M", 
               "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


//Declare variables
var gameStarted = false;
var currentWord;
var wordDashes;
var guessesRemaining;
var lettersGuessed;
var wins = 0;
var losses = 0;
var nextWord;
var wordChoice; 
var correctLetters;
var wordArray = [];
var dashesArray = [];

//Function to start the game
function startGame() {
	gameStarted = true;
	lettersGuessed = [];
	correctLetters = 0;
	wordChoice = Math.floor(Math.random() * 35); //35 word choices in the wildAnimals array
	currentWord = wildAnimals[wordChoice];			
	guessesRemaining = 16 - currentWord.length;  //# of guesses will depend on the length of the word
	wordDashes = makeIntoDashes(currentWord);	
	wordArray = currentWord.split('');			
	dashesArray = wordDashes.split('');		
	document.getElementById("currentWord").innerHTML = wordDashes;
	document.getElementById("lettersGuessed").innerHTML = "---";
	document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
}

//Function to transform letters from the chosen word into dash placeholders
function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

//Function to manage user keystrokes
function playGame(letter) {
	var letter = letter.toUpperCase();

	//Verify that the user keystroke is a letter
	if (letters.indexOf(letter) > -1) {
		if (wordArray.indexOf(letter) > -1) {
			correctLetters++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesRemaining--;
				document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
				if (guessesRemaining == 0) {
					alert("Sorry - You Lose! The correct answer is " + currentWord);
					startGame();
					losses++;
					document.getElementById("losses").innerHTML = losses;
				}
			}
		}
	}
}

//Function to display the keyed letter on the screen if it's in the current word
function displayLetter(letter) {
	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordArray[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

//Function to check if the game has been won by looking for dashes
function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("Congrats - You WIN! The correct answer is " + currentWord);
		wins++;
		document.getElementById("wins").innerHTML = wins;
		startGame();
	}
}

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("playGame").innerHTML = "";
		startGame();
		document.getElementById("currentWord").innerHTML = wordDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}