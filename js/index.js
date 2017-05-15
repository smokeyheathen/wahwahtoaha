$(document).ready(function() {
	e.functions.init();
});


$(document).keydown(function(event){
   if(event.keyCode == 13){
		// Check what page we're on.
		if (window.location.pathname == "/speaking"){
				e.defaults.page = "speaking";
				var userInput = $('#usersays').val();
				// Check then answer, then play audio if listening exercise
				e.functions.checkTextInput(userInput);
		}
	 }
});
