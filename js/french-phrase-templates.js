/*
*	Array template
*/
var Array_template =
	[
	["French", "English"],
	["", ""],
	["", ""],
	["", ""],
	["", ""]
	];

/*
* Return a random phrase within a category
*
* 1. Figure out how many random elements there are.
* 2. Figure out how long each random element array is.
* 3. Generate a random number for each random element array.
* 4. Return phrase with random elements.
*
* Each phrase will may be male or female, as well as
* singular/plural
* le balle rouge, les balles rouges
*
*/

function gp_year(){
/* I was born in 1980
  He left in 1990
	THeir first child was born in 1990, their second child was born in 1991
	She graduated in 2012
	I've been working since 1998
	They have been world champions since 2003
	It has been popular since 1992
	My car was made in 1984
	I went on holiday to France in 2012
	They won in 1995, 1999 and 2003
	The company was founded in
	*/
}

function gp_date_recent(){
	return gn_random_integer(1,28);

}

// generate_phrase_random_integer
function gn_random_integer(minimum,maximum){
	var year = Math.floor(Math.random() * (maximum-minimum)) + minimum;
	return year;
}

// Return a very common year, likely to be in the news or similar
function gn_year_recent(){
	var year = gn_random_integer(1990,2020);
	return year;
}

// Return a year used in historical contexts
function gn_year_historical(){
		var year = gn_random_integer(100,1800);
		return year;
}

// Return a typical human age
function gn_age_human(){
		var age = gn_random_integer(1,115);
		return age;
}

// Return an amount of money for cafe or restaurant
function gn_money_cafe_restaurant(){
	var money = gn_random_integer(2,99) + " euros " + gn_random_integer(2,99);
	return money;
}

function get_random_array_element(somearray){
	var arrayrow;
	var arraymaxrow = arrayrow.length() - 1;
	arrayrow = gn_random_integer(0,arraymaxrow);
	return somearray(arrayrow);
}


var phrases_days =
	[
	["Lundi", "Monday"],
	["Mardi",  "Tuesday"],
	["Mercredi",  "Wednesday"],
	["Jeudi",  "Thursday"],
	["Vendredi", "Friday"],
	["Samedi", "Saturday"],
	["Dimanche",  "Sunday"]
	];

var phrases_months =
[
["janvier", "January"],
["fevrier",  "February"],
["mars",  "March"],
["avril",  "April"],
["mai", "May"],
["juin", "June"],
["juillet",  "July"],
["aout",  "August"],
["septembre",  "September"],
["octobre",  "October"],
["novembre",  "November"],
["decembre",  "December"]
];


var phrases_telling =
	[
	["Je vous dis", "I tell you"],
	["Je te dis",  "I tell you"],
	["Je lui dis",  "I tell him"],
	["Je leur dis",  "I tell them"],
	["Tu me dis", "You tell me"],
	["Vous me dites", "You tell me"],
	["Vous lui dites",  "You tell him"],
	["Tu lui dis",  "You tell her"],
	["Tu leur dis",  "You tell them"],
	["Elle me dit",  "She says to me"],
	["Elle vous dit",  "She says to you"],
	["Elle lui dit",  "She says to him"],
	["Il me dit",  "He says to me"],
	["Il vous dit",  "He says to you"],
	["Il lui dit",  "He says to him"],
	["Ils me disent",  "They say to me"],
	["Ils vous disent",  "They say to you"],
	["Ils lui disent",  "They say to him"],
	["Ils nous disent", "They say to us"],
	["Elles nous disent", "They say to us"]
	];

// Return a phrase about:
// Ordering at a cafe
// [I want / I would like / Give me ]
// {1-4 items}:
// [a black coffee / a white coffee / a latte / an espresso / a tea / an assam tea / an earl grey tea / a chai latte / a peppermint tea]
//

var phrases_weather =
	[
	["Bonjour a tous", "Hello everyone"],
	["La semaine a venir s'annonce plutot fraiche", "The week ahead promises to be rather cool"],
	["le quart sud-est apportant un petit peu de neige par haute-montagne", "the southeast quarter bringing a little bit of high-mountain snow"],
	["la corse est un petit peu a l'ecart de ce mauvais temps et profite de quelques eclaircies", "Corsica is a little bit away from this bad weather and will enjoy some clouds"],
	["les temperatures a commence a baisser surtout sur la moitie sud", "the temperatures begin to drop especially over the southern half"],
	["cet apres-midi jusqu'a 13 degres du cote de paris", "this afternoon up to 13 degrees towards Paris"],
	["tres belles eclaircies sont de retour par les regions du nord", "very cloudy back in the northern regions"],
	["une masse d'air qui se rafraichit le temps", "a mass of air that cools the weather"],
	["Tres beau soleil sures le quart sud-est", "very reliable sunshine in the southeast area"],
	["donc les temperatures qui continuent leur baisse", "So the temperatures continue to fall"],
	["et pour mercredi du tres beau soleil sur la moitie nord du pays", "and wednesday has very beautiful sunshine in the northern half of the country"],
	["ce sera une tres belle journee", "it will be a beautiful day"],
	["mais avec des temperatures qui passe tres legerement sous les normales de saison", "but with temperatures going very slightly below the seasonal normal"],
	["je vous souhaite une tres bonne journee et a bientot", "I wish you a very good day and see you soon"]
	];

var Phrases_i =
	[
	["Je ne sais pas", "I don't know"],
	["Je ne comprends pas", "I don't understand"],
	["Je voudrais prendre un verre", "I would like a drink"]
	];


var verbs_i =
	[
	["j'aime", ""],
	["je frappe", ""],
	["je veux", ""],
	["je voudrais", ""]
	];

// NEEDS M/F and Plural Variants!
var words_colours =
	[
	["rouge", "red"],
	["jaune", "yellow"],
	["vert", "green"],
	["bleu", "blue"],
	["blanc", "white"],
	["noir", "black"]
	];

// NEEDS M/F and Plural Variants!
var words_objects =
[
	["balle", "ball"],
	["crayon", "pencil"],
	["stylo", "pen"],
	["voiture", "car"]
	];


var words_locations =
[
	["l'eglise", "ball"],
	["le chateau", "pencil"],
	["le magasin", "pen"]
	];


/*
Languages
*/
var phrases_languages =
  [
  ["", "What languages do you speak?"],
  ["", "What language(s) do people speak in your country?"],
  ["", "What language(s) are you learning?"],
  ["", "Why are you learning a language?"],
  ["", "What do you do to learn a language?"],
  ["","What's hardest when learning a language?"],
  ["","What are your best tips for someone learning a language?"],
  ["","Are there any other languages that you'd like to learn?"],
  ["","What's the most beautiful language?"],
  ["",""]
  ];


/*
Family
*/
var phrases_family =
  [
  ["","Describe your family members"],
  ["","Do you have any children?"],
  ["","Would you like to have children?"],
  ["","How are things different today than they were when you were a child?"],
  ["","Do you prefer big families or small families?"],
  ["","How often do you see your extended family?"],
  ["","Do you get along well with your parents / siblings?"],
  ["","What's your best childhood memory?"]
];


/*
Animals
*/
var phrase_animals =
  [
    ["","Is it common to have pets in your country?"],
    ["","Do you have any pets?"],
    ["","If you don't, would you like to?"],
    ["","Did you have any pets as a child?"],
    ["","What's your favourite animal?"],
    ["","What kind of wild animals are there in your country?"],
    ["","How do you feel about zoos?"],
    ["","If you could choose to be an animal, which one would you like to be?"],
    ["","Do you think that animals have emotions?"]
  ];

/*
Your Region

Describe your country or region: geography, languages, food, weather, services, etc.
What's the best thing about your country?
What's the worst thing about your country?
If I were coming to visit you for a week, what would we do and see?
Do you live in a big city or a small town?
Do you have any favourite places?
How long have you lived in your region?
Have you ever lived anywhere else?
Would you like to live anywhere else?
*/

/*
Jobs

Where do you work?
What do you do?
Describe a typical day.
What's the best thing about your job?
What's the worst thing about your job?
How did you become qualified for your job?
Describe your very first job.
If you had to change jobs, what would you do?
What's your dream job?
Describe the best / worst job you've ever had.
Have you ever made a big mistake at work?


*/


/*

What's your favourite...

...tv show?
...food?

...sport?

...hobby?

...music?

...movie?

...colour?

...animal?

...season?

...book?
*/

/*
Health

Do you think that you're a healthy person?
What do you do to take care of your health?
Do you have any bad habits?
Do you think that people in general are healthy now?
What do you think is important for health?
What is health care like in your country?
What are some health issues in your area?
How do you deal with stress?
Have you ever had to stay in the hospital?
What one thing could you do to be healthier?
*/

/*
Cars and Transportation

Do you have a car?
Do you need a car to get around in your region?
Is there public transportation where you live?
Have you ever travelled by boat / plane / train / etc?
What's your favourite mode of transportation?
Do you like to fly, or does it scare you?
What's the longest trip you've ever taken?
What was your worst transportation experience?
*/



/*
Inventions

What machines do you use often at home or at work?
Which ones would you not want to live without?
What do you think is history's most important invention?
What do you think is the most useless invention?
What invention would you like to see in the next five, ten, hundred years?
If you were going to invent something, what would it be?

*/

/*

Would you rather...
...live in the country or live in the city?
...be very rich or very good-looking?
...be able to visit the past or the future?
...have a boring job that pays more or an interesting job that pays less?
...give up your internet connection or your car?
...be too cold or be too hot?
...be abducted by aliens or chased by zombies?
...have a year off with pay or work for a year for double pay?

*/

/*

Holidays and Gift-Giving

What holidays do you celebrate?
What's your favourite holiday?
What's your least favourite holiday?
Describe a childhood holiday memory.
Are holidays now different than they were when you were a child?
How does gift-giving work in your culture?
What was the best gift that you ever received?
What was the best gift that you ever gave?
Have you ever received a funny or terrible gift?
Have you ever given a funny or terrible gift?
*/

/*
Five Senses

What scents do you love? Hate?
What sounds do you love? Hate?
What flavours do you love? Hate?
What textures do you love? Hate?
What views do you love? Hate?
What do you think is your most important sense? Least important?
If you had to give up one of your senses, which one would it be?
If you could strengthen one of your senses, which one would you choose?

*/

/*
Books

Do you like to read?
What kind of books do you like to read?
Do you have a favourite book?
What's your favourite reading spot?
Do you ever reread books?
What's the last good book that you read?
If you hate a book, do you still finish it?
Do you prefer ebooks or paper books?
Do you prefer books or movies?
Did you have a favourite book as a child?
Do you think that reading is important?

*/

/*

School

Did you like school as a child?
Did you ever get in trouble?
Who was your favourite / least favourite teacher?
What was your best / worst subject?
What's the school system like in your country?
Did you go to college / university?
Would you like to go back to school?
Were (are) you a good student?
Do you think that education is important?
Do you think that uniforms are a good idea?

*/

/*

Food

What's your favourite food?
Is there anything that you can't stand to eat?
Do you like to cook?
If you were preparing a special meal for someone, what would it be?
Do you prefer to eat out or at home?
Where do you buy food?
If you had to choose a national food, what would it be?
Do you have a garden?
What was your favourite meal as a child?

*/
/*

Outer Space

Does your country have a space program?
Do you think that space programs are important?
Do you like to look at the night sky?
What qualities do you think astronauts need?
If you could, would you like to travel to outer space for a vacation?
Do you believe in extraterrestrial life?
Do you like science fiction books or movies?
Do you think that humans will ever colonize another planet? Do you think that they should?

*/
/*

Talents and Hobbies

Do you:
...play any sports?
...play any musical instruments?
...draw or paint?
What are you good at?
What are you trying to get better at?
What would you like to learn how to do?
What did you like to do when you were a child?
If you could be really good at anything, what would you choose?
Is there anything that you're really bad at?


*/
/*
Homes

Describe your home.
Are people in your area more likely to live in houses or apartments?
What kind of home did you grow up in?
Describe your dream home.
Are people in your area more likely to rent or to buy a home?
Is it difficult to buy a home?
Describe your first home after you moved out of your parents' home.
What's important to you in a neighbourhood?


*/

/*
Guilty Pleasures

Is there a song that you love – even though you'd never admit it?
Do you have any habits that you love, even though they're bad for you?
Do you like reality television?
What food do you always overeat?
Is there anything that you love to do – but only
if there's no one else around?
Is there anything that you spend too much money on?
Do you spend too much time on the computer?

*/
/*

Money, Money, Money

What do you like spending money on?
What do you hate spending money on?
What's the last thing you bought?
What would you do with one thousand dollars?
What would you do with a million dollars?
Do you think that money is the most important thing when choosing a job?
Is debt a big problem in your area?
Did you get an allowance as a child?
Have you ever regretted buying something?
What big purchase would you like to make?

*/

/*
Ouch!

Describe a time that you got hurt.
Have you ever broken any bones?
Have you ever stayed overnight at the hospital?
Have you ever been in a car accident?
Are you accident prone?
Did you ever do anything dangerous as a child?
Do you think that people are too safety-conscious now? Or not enough?
Have you ever embarrassed yourself by falling or knocking something down?
Have you ever gotten in a physical fight?
*/

/*
Travel

What was your best / worst travel experience?
If you could go anywhere in the world, where would you go?
Is there a place that you wouldn't want to visit?
Have you ever lived in another country?
Do you like all-inclusive vacations?
Would you rather travel independently or on a tour?
Would you rather visit a city or a wild area?
What do tourists come to your country to see?
Have you ever travelled all by yourself?
*/

/*
Fears and Phobias

Are you afraid of spiders or insects?
...snakes?
...storms?
...flying?
...germs?
...heights?
What scares you most?
Do you have any fears that you know are silly?
What scared you most as a child?
How do you deal with things that scare you?
Do you sometimes like feeling scared?
*/


/*
Chores and Housework

Are you a tidy or a messy person?
Do you clean all at once or a little bit at a time?
What chore do you hate the most?
Do you prefer to clean the house or work in the yard?
In your area, are chores divided by gender?
How is housework shared in your family?
Did you have to do chores as a child?
What chores do you think children should be responsible for?
Would you pay someone to clean your house?


*/

/*

Goals


What are some goals that you've made in the past?
What would you like to achieve in the next month? Year? Five years? Ten years?
Are you good at sticking to your goals?
Have you ever failed to achieve a goal?
Do you prefer short term or long term goals?
What are you working on right now?
Do you think that it's important to set goals?
Do you make New Year's Resolutions?
What does success mean to you?

*/


/*
Weather

Does it get very hot or very cold in your country?
How many seasons are there in your country?
What's your favourite / least favourite season?
Is extreme weather common in your country?
Does your country experience snow / hurricanes / tornadoes / frost / etc?
Have you ever experienced a natural disaster?
What climate would you prefer for a vacation?
Do you think that the weather is changing?
Is there talk of climate change in your area?

*/
/*

Habits
Do you have any bad habits?
Do you have any good habits that make your life easier?
Are you usually early or late?
Are you a tidy or a messy person?
What bad habits annoy you in other people?
How can a person get rid of a bad habit?
How can a person develop a good habit?
Do you think that it's possible to change?
How do your habits affect your life?
What habits are very common in your country?
*/
