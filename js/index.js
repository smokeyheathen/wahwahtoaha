$(document).ready(function() {
	e.functions.init();

});


$(document).keydown(function(event){
   if(event.keyCode == 13){
		// Check current input text with previous spoken phrase
		//
		console.log ("enterkeydown!");
		// Check what page we're on.
		console.log ("Pathname: " + window.location.pathname);
		if (window.location.pathname == "/listening"){
				e.defaults.page = "listening";
				var userInput = $('#speech-msg').val();
		}

		if (window.location.pathname == "/speaking"){
				e.defaults.page = "speaking";
				var userInput = $('#usersays').val();
		}

		// Check then answer, then play audio if listening exercise
		e.functions.checkAnswer(userInput);


	 }
});
