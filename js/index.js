$(document).ready(function() {
	e.functions.init();
});

$(document).keydown(function(event){
   if(event.keyCode == 13){
		// Check current input text with previous spoken phrase

		// Get the text input element.
		var speechMsgInput = $('#speech-msg').val();
		lowerCaseInput = speechMsgInput.toLowerCase();
		var lowerCasePhrase = "" + e.defaults.currentPhrase;
		var lowerCasePhraseEnglish = "" + e.defaults.currentPhrase;

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
			$('#speech-msg').val("");
			e.functions.getNewPhrase(e.defaults.currentExercise);
			e.functions.speak();
		}
		else
		{
			e.functions.speak();
			e.defaults.incorrectAnswerCount++;
			if (e.defaults.incorrectAnswerCount > 3){
			}
			if (e.defaults.incorrectAnswerCount > 5){
				$('#help').text(e.defaults.currentPhrase);
			}
		}
   }
});