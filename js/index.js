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

e.defaults.current_phrase = e.functions.get_new_phrase(e.defaults.current_exercise);
var frenchPhraseList = ["",""];
frenchPhraseList = phrases_telling;

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

document.getElementById('speech-msg').onkeydown = function(event){
   if(event.keyCode == 13){
		// Check current input text with previous spoken phrase
		var lowerCaseInput = speechMsgInput.value;
		lowerCaseInput = lowerCaseInput.toLowerCase();
		var lowerCasePhrase = "" + e.defaults.current_phrase;
		var lowerCasePhraseEnglish = "" + e.defaults.current_phrase;

		lowerCasePhrase = lowerCasePhrase.toLowerCase();
		lowerCasePhraseEnglish = lowerCasePhraseEnglish.toLowerCase();

		console.log("LOWER Case Phrase: " + lowerCasePhrase);
		console.log("REMOVE DIACRITICS Phrase: " + e.functions.removeDiacritics(lowerCasePhrase));

		lowerCasePhrase = e.functions.removeDiacritics(lowerCasePhrase);
		lowerCasePhraseEnglish = e.functions.removeDiacritics(lowerCasePhraseEnglish);

		if ((lowerCasePhrase == lowerCaseInput)||(lowerCasePhraseEnglish == lowerCaseInput)) {
			e.defaults.incorrectAnswerCount=0;
			console.log ("Correct!");
			// Clear the text input
			document.getElementById('speech-msg').value = "";
			e.defaults.current_phrase = e.functions.get_new_phrase(e.defaults.current_exercise);
			e.functions.speak(e.defaults.current_phrase);
		}
		else
		{
			e.functions.speak(e.defaults.current_phrase);
			e.defaults.incorrectAnswerCount++;
			if (e.defaults.incorrectAnswerCount > 3){
			}
			if (e.defaults.incorrectAnswerCount > 5){
				document.getElementById('help').innerHTML = e.defaults.current_phrase;
			}
		}
   }
};