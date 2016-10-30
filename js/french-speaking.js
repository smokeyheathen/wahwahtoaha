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

var phrasesToSay = ["Je ne sais pas", "Je ne comprends pas", "Je voudrais prendre un verre"];

/*
 * FUNCTION: printPhrase(text)
 * output the specified text in the translation field
 */
function printPhrase(text) {
console.log($('#translation'));
$('#translation').text(text);
}

// this is different from the listening function, so let's keep it here for now
function skipNextPhrase(){
	console.log('skip');
			incorrectAnswerCount=0;
			$('#translation').text("");
			// Clear the text input
			$('#usersays').val("");
			e.defaults.current_phrase = e.functions.get_new_phrase(e.defaults.current_exercise);
			printPhrase(e.defaults.current_phrase);
}

$(document).ready(function() {
skipNextPhrase();
});