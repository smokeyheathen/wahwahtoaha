/*
 * French Speaking exercises
 * -
 * Display or say a sentence or phrase in English
 * Accept input in French only
 * Initial input can be text, but ultimately spoken is wanted.
 * Will need various translations to be ok eventually.
 * Ideally get to the point of generating simple conversation
 */

/*
 * Check for browser support
 */
var supportMsg = document.getElementById('msg');

if ('speechSynthesis' in window) {
	supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
} else {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
	supportMsg.classList.add('not-supported');
}

var phrasesToSay = ["Je ne sais pas", "Je ne comprends pas", "Je voudrais prendre un verre"];
var frenchPhraseList = ["",""];
frenchPhraseList = phrases_telling;
var incorrectAnswerCount = 0;
var randomNumber = Math.floor((Math.random() * 3));
var listLength = frenchPhraseList.length;

// Get the 'speak' button
var button = document.getElementById('speak');

// Get the text input element.
var speechMsgInput = document.getElementById('speech-msg');

// Get the attribute controls.
//var voiceSelect = document.getElementById('voice');
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');

// Execute e.functions.loadVoices.
e.functions.loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(event) {
  e.functions.loadVoices();
};

var current_exercise = "";

// define the current exercise
current_exercise = "number_year_recent";


current_phrase = get_new_phrase(current_exercise);


/*
 * FUNCTION: excerciseTypeChanged()
 */
function exerciseTypeChanged() {
		switch (document.getElementById('exercise').value) {
			case "sayingandtelling":
				frenchPhraseList =  phrases_telling;
			break;
			case "givingandreceiving":
				frenchPhraseList =  phrases_telling;
			break;
			case "weatherforecasts":
				frenchPhraseList =  phrases_weather;
			break;
			case "directions":
				frenchPhraseList =  phrases_telling;
			break;
			}

			listLength = frenchPhraseList.length;
			randomNumber = Math.floor((Math.random() * (listLength)));
			speak(frenchPhraseList[randomNumber][1]);

}


/*
 * FUNCTION: speak(text)
 * Create a new utterance for the specified text and add it to the queue.
 */
function speak(text) {
   // Set the text.
	msg.text = text;
	// Queue this utterance.
	console.log ("Msg: " + msg.text);
	document.getElementById('translation').innerHTML = text;
}




function recordVoiceAnswer() {
	var voiceRecognition = new webkitSpeechRecognition();
	voiceRecognition.lang = "fr-FR";
	voiceRecognition.onresult = function(event) {
		console.log("I heard this: " + event.results[0][0].transcript);
		var spokenInput = event.results[0][0].transcript;
		var spokenInputConfidence = event.results[0][0].confidence;
		//document.getElementById('usersays').innerHTML = "" + spokenInput;
		document.getElementById('usersays').value = "" + spokenInput;

		checkAnswer(spokenInput);
	}
	voiceRecognition.onerror = function(e) {
        console.log ("Recognition stopped! (error) " + e.error);
				voiceRecognition.stop();
  }
	voiceRecognition.start();
	console.log ("recognition started");
}

function checkAnswer (inputPhrase) {
		// Check current input text with previous spoken phrase
		//var lowerCaseInput = speechMsgInput.value;
		var lowerCaseInput = inputPhrase
		lowerCaseInput = lowerCaseInput.toLowerCase();
		//var lowerCasePhrase = frenchPhraseList[randomNumber][0];
		var lowerCasePhrase = "" + current_phrase;

		lowerCasePhrase = lowerCasePhrase.toLowerCase();

		console.log("LOWER Case Phrase: " + lowerCasePhrase);
		console.log("REMOVE DIACRITICS Phrase: " + removeDiacritics(lowerCasePhrase));

		lowerCasePhrase = removeDiacritics(lowerCasePhrase);

		if (lowerCasePhrase == lowerCaseInput) {
			incorrectAnswerCount=0;
			document.getElementById('translation').innerHTML = "";
			console.log ("Correct!");
			// Clear the text input
			//document.getElementById('usersays').innerHTML = "";
				document.getElementById('usersays').value = "";
			//randomNumber = Math.floor((Math.random() * (listLength)));
			//speak(frenchPhraseList[randomNumber][1]);
			skipNextPhrase();
		}
		else
		{
			//speak(frenchPhraseList[randomNumber][1]);
			speak(current_phrase);
			incorrectAnswerCount++;
			if (incorrectAnswerCount > 3){
				//document.getElementById('translation').innerHTML = frenchPhraseList[randomNumber][1];
				document.getElementById('translation').innerHTML = current_phrase;

			}
			if (incorrectAnswerCount > 5){
				//document.getElementById('help').innerHTML = frenchPhraseList[randomNumber][0];
				document.getElementById('help').innerHTML = current_phrase;
			}
		}
}

//document.getElementById('phrasefile').addEventListener('change', handleFileSelect, false);


function skipNextPhrase(){
			incorrectAnswerCount=0;
			document.getElementById('translation').innerHTML = "";
			// Clear the text input
			//document.getElementById('usersays').innerHTML = "";
			document.getElementById('usersays').value = "";
			//randomNumber = Math.floor((Math.random() * (listLength)));
			current_phrase = get_new_phrase(current_exercise);
			speak(current_phrase);
}


function set_exercise_type(new_exercise) {
	current_exercise = new_exercise;
	get_new_phrase(current_exercise);
	speak(current_phrase);
}


skipNextPhrase();


/*
// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {
	if (speechMsgInput.value.length > 0) {
		//speak(speechMsgInput.value);
		speak(phrasesToSay[randomNumber]);
	}
});
*/
