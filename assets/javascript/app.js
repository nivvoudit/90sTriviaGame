$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Begin Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){

	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){

	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {


		clearInterval(theClock);
		generateWin();
	}
	else {

		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's up dude/dudette!!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/no.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/no.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Excellent work! Here are your results:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What do you call these badboys? <img src='assets/images/jncos.jpg'>", "When you see this image, what emotions do you feel? <img src='assets/images/duckhunt.gif'>", "Who <del>is</del> was this? <img src='assets/images/kurtcobain.jpg'>", "Who was the host of TRL - 'Total Request Live?'' ", "What is this gentleman's real name? <img src='assets/images/screech.jpg'>", "Finish the sentence of this popular 90's TV series: <img src='assets/images/freshprince.jpg'><br>'..West Philadelphia, born and raised...'", "Which of the following is NOT a Ninja Turtle? <img src='assets/images/turtles.jpg'>", "What is Bill Clinton's favorite instrument? <img src='assets/images/billclinton.gif'>"];
var answerArray = [["JNCO Jeans!", "POGS", "CROCS", "Hot wheels"], ["Happiness and joy, because this dog is laughing WITH me","Anger and frustration, because this damn dog is laughing AT me", "I don't care", "My parents didn't let me play Nintendo because it was a gateway to Satan"], ["Burt Coltrane", "Kert Coldbrain", "Kurt Cobain", "Kanye West"], ["Carson Daly", "Seth Rogen", "Matt Pinfield", "Kurt Loder"],["AC Slater","Mark Paul Gosselar",
"Sarah Michelle Gellar","Dustin Diamond"], ["cause baby baby baby OH","..on the playground is where I spent most of my days", "panda panda panda panda", "DEEZ NUTS"],["Leonardo","Donatello","Master Splinter","Raphael"], ["Saxophone", "Piano", "Trombone", "Harmonica"]];
var imageArray = ["<img class='center-block img-right' src='img/1.jpg'>", "<img class='center-block img-right' src='img/2.png'>", "<img class='center-block img-right' src='img/3.png'>", "<img class='center-block img-right' src='img/4.png'>", "<img class='center-block img-right' src='img/5.png'>", "<img class='center-block img-right' src='img/6.png'>", "<img class='center-block img-right' src='img/7.png'>", "<img class='center-block img-right' src='img/8.png'>"];
var correctAnswers = ["A. JNCO Jeans!", "B. Anger and frustration, because this damn dog is laughing AT me", "C. Kurt Cobain", "A. Carson Daly", "D. Dustin Diamond", "B. ..on the playground is where I spent most of my days", "C. Master Splinter", "D. Harmonica"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/sonic.mp3");
