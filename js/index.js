$(document).ready(function() {
	
	// parse the pathname to get page and subpage
	var pathname = window.location.pathname.split('/');
	var page = 'home';
	var subpage = '';
	if (typeof pathname[1] !== 'undefined' && pathname[1] !='') {
    page = pathname[1];
  }
	if (typeof pathname[2] !== 'undefined' && pathname[2] !='') {
    subpage = pathname[2];
  }
	console.log('page:' + page + ' - subpage: ' + subpage);
		
	// load page into main content area
	$('#main').html($('#'+page).text());
	
	// update menu
	$('#navbar li').removeClass('active');
	$('#navbar li#'+page+'-menu').addClass('active');
	console.log('#navbar li#'+page+'-menu');

	//Check for browser support
	if ('speechSynthesis' in window) {
		$('#msg').html('Your browser <strong>supports</strong> speech synthesis.');
	} else {
		$('#msg').html('Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
		$('#msg').addClass('not-supported');
	}
	
	// get language from local storage if available
	var base = localStorage.getItem( 'language_base' );
	var target = localStorage.getItem( 'language_target' );
	if (!base || !target) {
		base = e.defaults.language_base;
		target = e.defaults.language_target;
  }
	e.functions.setLanguageBase(base);
	e.functions.setLanguageTarget(target);
		
	// load phrases from json
	e.functions.loadPhrases(e.defaults.language_base,e.defaults.language_target);
	
	// change handlers for language selects:
	$('#base-language').change(function() {
		var base = $('#base-language').val();
		e.functions.setLanguageBase(base);
	});
	$('#target-language').change(function() {
		var target = $('#target-language').val();
		e.functions.setLanguageTarget(target);
	});
});

e.defaults.current_phrase = e.functions.getNewPhrase(e.defaults.current_exercise);

// Execute e.functions.loadVoices.
e.functions.loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(event) {
  e.functions.loadVoices();
};

$(document).keydown(function(event){
   if(event.keyCode == 13){
		// Check current input text with previous spoken phrase

		// Get the text input element.
		var speechMsgInput = $('#speech-msg').val();
		lowerCaseInput = speechMsgInput.toLowerCase();
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
			$('#speech-msg').val("");
			e.defaults.current_phrase = e.functions.getNewPhrase(e.defaults.current_exercise);
			e.functions.speak(e.defaults.current_phrase);
		}
		else
		{
			e.functions.speak(e.defaults.current_phrase);
			e.defaults.incorrectAnswerCount++;
			if (e.defaults.incorrectAnswerCount > 3){
			}
			if (e.defaults.incorrectAnswerCount > 5){
				$('#help').text(e.defaults.current_phrase);
			}
		}
   }
});

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
			e.defaults.current_phrase = e.functions.getNewPhrase(e.defaults.current_exercise);
			printPhrase(e.defaults.current_phrase);
}

//$(document).ready(function() {
//skipNextPhrase();
//});