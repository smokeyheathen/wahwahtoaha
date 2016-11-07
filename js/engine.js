e = {
  defaults:{
    // speech api language lookup table
    speechApiLanguages: {
      en: "en-GB",
      fr: "fr-FR",
      de: "de-DE",
      es: "es-ES"
    },
    // ui language file
    lang: {
      en: {
        languages:{
          en: "English",
          fr: "French",
          de: "German",
          es: "Spanish"
        }
      }
    },

    // Set default base (users native) and target (what they want to learn) languages
    languageBase: "en",
    languageTarget: "fr",
    currentPhrase: "",
    previousPhrase: "",
    nextPhrase: "",
    // define the current exercise
    currentExercise: "number_year_recent",
    incorrectAnswerCount: 0,
    speechRate: 1,
    page: "about",
    subpage: "",
  },
  functions: {
    arePhrasesLoaded(){

      if (typeof e.phrases[e.defaults.languageBase] == 'undefined' || typeof e.phrases[e.defaults.languageBase][e.defaults.languageTarget] == 'undefined') {
        return false;
      }
      return true;
    },
    getNewPhrase(currentExercise){
      switch (currentExercise)
      {	case "number_year_recent":
          var currentPhrase = e.functions.gnYearRecent();
        break;
        case "number_year_historical":
          var currentPhrase = e.functions.gnYearHistorical();
        break;
        case "number_age_human":
          var currentPhrase = e.functions.gnAgeHuman();
        break;
        case "number_money_small":
          var currentPhrase = e.functions.gnMoneyCafeRestaurant();
        break;
        case "test_phrases":
          var currentPhrase = e.functions.getTestPhrase();
        break;
        case "verbs":
          var currentPhrase = e.functions.getTestPhrase("verb");
        break;
        case "cafe":
          var currentPhrase = e.functions.getTestPhrase("coffee");
        break;
        default:
          var currentPhrase = "je ne sais pas";
        break;
      }
      e.defaults.currentPhrase = currentPhrase;
    },
    getTestPhrase(tag){
      var phrases = e.phrases[e.defaults.languageBase][e.defaults.languageTarget];
      if (typeof tag !== 'undefined') {
        phrases = e.functions.searchTag(phrases, tag);
      }
      if (typeof phrases == 'undefined') {
        console.error("no phrases");
        return "error - no phrases";
      }
      var phrase = phrases[e.functions.gnRandomInteger(0,phrases.length)];
      return phrase;
    },

    // generate_phrase_random_integer
    gnRandomInteger(minimum,maximum){
      var year = Math.floor(Math.random() * (maximum-minimum)) + minimum;
      return year;
    },

    // Return a very common year, likely to be in the news or similar
    gnYearRecent(){
      var year = e.functions.gnRandomInteger(1990,2020);
      return {base: year, target: year};
    },

    // Return a year used in historical contexts
    gnYearHistorical(){
      var year = e.functions.gnRandomInteger(100,1800);
      return {base: year, target: year};
    },

    // Return a typical human age
    gnAgeHuman(){
      var age = e.functions.gnRandomInteger(1,115);
      return {base: age, target: age};
    },

    // Return an amount of money for cafe or restaurant
    gnMoneyCafeRestaurant(){
      var money = e.functions.gnRandomInteger(2,99) + " euros " + e.functions.gnRandomInteger(2,99);
      return {base: money, target: money};
    },

    handleFileSelect:function(evt) {
       var files = evt.target.files; // FileList object

     // Parse local CSV file
     Papa.parse(files[0], {
       complete(results) {

         /*
         * TEMPORARILY assigning phrases telling to the data, so file select has no effect
         */
         results.data = phrases_telling;

         var listLength = results.data.length;
         var randomNumber = Math.floor((Math.random() * (listLength)));
         //e.functions.speak(phrasesToSay[randomNumber]);
         frenchPhraseList = results.data;
         console.log("frenchPhraseList: " + frenchPhraseList[randomNumber][0]);
       }
     });

   },
    init(){
       // parse the pathname to get page and subpage
       var pathname = window.location.pathname.split('/');
       if (typeof pathname[1] !== 'undefined' && pathname[1] !='') {
         e.defaults.page = pathname[1];
       }
       if (typeof pathname[2] !== 'undefined' && pathname[2] !='') {
         e.defaults.subpage = pathname[2];
       }

       // load page into main content area
       $('#main').html($('#'+e.defaults.page).text());

       // update menu
       $('#navbar li').removeClass('active');
       $('#navbar li#'+e.defaults.page+'-menu').addClass('active');

       //Check for browser support
       if ('speechSynthesis' in window) {
         $('#msg').html('Your browser <strong>supports</strong> speech synthesis.');
       } else {
         $('#msg').html('Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
         $('#msg').addClass('not-supported');
       }

       // get language from local storage if available
       var base = localStorage.getItem( 'languageBase' );
       var target = localStorage.getItem( 'languageTarget' );
       if (!base || !target) {
         base = e.defaults.languageBase;
         target = e.defaults.languageTarget;
       }
       e.functions.setLanguageBase(base);
       e.functions.setLanguageTarget(target);

       // load phrases from json
       e.functions.loadPhrases();

       // change handlers for language selects:
       $('#base-language').change(function() {
         var base = $('#base-language').val();
         e.functions.setLanguageBase(base);
       });
       $('#target-language').change(function() {
         var target = $('#target-language').val();
         e.functions.setLanguageTarget(target);
       });

      e.functions.getNewPhrase(e.defaults.currentExercise);

      if (e.defaults.page == 'speaking') {
        e.functions.skipNextSpeakingPhrase();
      }

      // Execute e.functions.loadVoices.
      e.functions.loadVoices();

      // Chrome loads voices asynchronously.
      window.speechSynthesis.onvoiceschanged = function(event) {
        e.functions.loadVoices();
      };

    },
   loadPhrases(base,target){
      // base and target are optional - use defaults if omitted
      if (typeof base == 'undefined' || typeof target == 'undefined') {
        base = e.defaults.languageBase;
        target = e.defaults.languageTarget;
      }
      var languagePair = base + "-" + target;
      console.log("loading /content/" + languagePair + "/" + languagePair + ".json");
      var jqxhr = $.getJSON( "/content/" + languagePair + "/" + languagePair + ".json")
        .done(function(data) {
          console.log( "loaded "+languagePair );
          if (typeof e.phrases[base] == 'undefined') {
            e.phrases[base] = {};
          }
          e.phrases[base][target] = data;
        })
        .fail(function() {
          console.error( "error loading " + languagePair );
        });
   },

    // Fetch the list of voices and populate the voice options.
    loadVoices () {
      // Fetch the available voices.
      var voices = speechSynthesis.getVoices();

      // Loop through each of the voices.
      voices.forEach(function(voice, i) {
        // Create a new option element.
        var option = document.createElement('option');

        // Set the options value and text.
        option.value = voice.name;
        option.innerHTML = voice.name;
        // Add the option to the voice selector.
        //voiceSelect.appendChild(option);
      });
    },

    /**
     * Remove diacritics (accents) from a string
     * <a href="/param">@param</a> {string} str The input string from which we will remove strings with diacritics
     * @returns {string}
     * @see http://goo.gl/zCBxkM
     */
    removeDiacritics(str) {
        var diacriticsMap = {
            A: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
            AA: /[\uA732]/g,
            AE: /[\u00C6\u01FC\u01E2]/g,
            AO: /[\uA734]/g,
            AU: /[\uA736]/g,
            AV: /[\uA738\uA73A]/g,
            AY: /[\uA73C]/g,
            B: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,
            C: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
            D: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,
            DZ: /[\u01F1\u01C4]/g,
            Dz: /[\u01F2\u01C5]/g,
            E: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,
            F: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g,
            G: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,
            H: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,
            I: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,
            J: /[\u004A\u24BF\uFF2A\u0134\u0248]/g,
            K: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,
            L: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,
            LJ: /[\u01C7]/g,
            Lj: /[\u01C8]/g,
            M: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g,
            N: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,
            NJ: /[\u01CA]/g,
            Nj: /[\u01CB]/g,
            O: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
            OI: /[\u01A2]/g,
            OO: /[\uA74E]/g,
            OU: /[\u0222]/g,
            P: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,
            Q: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g,
            R: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,
            S: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,
            T: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
            TZ: /[\uA728]/g,
            U: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,
            V: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,
            VY: /[\uA760]/g,
            W: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
            X: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g,
            Y: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
            Z: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,
            a: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
            aa: /[\uA733]/g,
            ae: /[\u00E6\u01FD\u01E3]/g,
            ao: /[\uA735]/g,
            au: /[\uA737]/g,
            av: /[\uA739\uA73B]/g,
            ay: /[\uA73D]/g,
            b: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,
            c: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
            d: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,
            dz: /[\u01F3\u01C6]/g,
            e: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,
            f: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g,
            g: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,
            h: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,
            hv: /[\u0195]/g,
            i: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,
            j: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g,
            k: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,
            l: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,
            lj: /[\u01C9]/g,
            m: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g,
            n: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,
            nj: /[\u01CC]/g,
            o: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
            oi: /[\u01A3]/g,
            ou: /[\u0223]/g,
            oo: /[\uA74F]/g,
            p: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,
            q: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g,
            r: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,
            s: /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,
            ss: /[\u00DF]/g,
            t: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,
            tz: /[\uA729]/g,
            u: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,
            v: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,
            vy: /[\uA761]/g,
            w: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,
            x: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g,
            y: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,
            z: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
        };
        for (var x in diacriticsMap) {
            // Iterate through each keys in the above object and perform a replace
            str = str.replace(diacriticsMap[x], x);
        }
        return str;
    },

    replayPhrase() {
      e.functions.speak();
    },
    searchTag(phrasesObj, tag) {
      var results = jQuery.map(phrasesObj, function(obj) {
        if(obj.tags.indexOf(tag) >= 0) {
          return obj; // or return obj.name, whatever.
        }
      });
      return results;
    },

    setExerciseType(newExercise) {
      e.defaults.currentExercise = newExercise;
      e.functions.getNewPhrase(e.defaults.currentExercise);
      if (e.defaults.page == 'speaking') {
        e.functions.skipNextSpeakingPhrase();
      } else if (e.defaults.page == 'listening') {
        e.functions.speak();
      }

    },
    setLanguageBase(base){
      console.log("base language changed to " + base);
      e.defaults.languageBase = base;
      localStorage.setItem( 'languageBase',base );
      $('#base-language').val(base);
      $('#language-pair').text('Language: ' + e.defaults.lang.en.languages[e.defaults.languageTarget] + ' (from ' + e.defaults.lang.en.languages[e.defaults.languageBase] + ')');
      if (!e.functions.arePhrasesLoaded()) {
        e.functions.loadPhrases();
      }
    },
    setLanguageTarget(target){
      console.log("target language changed to " + target);
      e.defaults.languageTarget = target;
      localStorage.setItem( 'languageTarget',target );
      $('#target-language').val(target);
      $('#language-pair').text('Language: ' + e.defaults.lang.en.languages[e.defaults.languageTarget] + ' (from ' + e.defaults.lang.en.languages[e.defaults.languageBase] + ')');
      $('#speech-msg').attr('placeholder', 'Type what you hear in '+e.defaults.lang.en.languages[e.defaults.languageTarget]+' here');
      if (!e.functions.arePhrasesLoaded()) {
        e.functions.loadPhrases();
      }
    },
    setSpeechRate(newSpeechRate){
      e.defaults.speechRate = newSpeechRate;
    },

    skipNextPhrase() {
      e.functions.getNewPhrase(e.defaults.currentExercise);
      $('#speech-msg').val("");
      e.functions.speak();
    },

    // Create a new utterance for the specified text and add it to the queue.
    speak(text) {
      if (typeof text == 'undefined'){
        text = e.defaults.currentPhrase.target;
      }
      // Create a new instance of SpeechSynthesisUtterance.
      var msg = new SpeechSynthesisUtterance();

      // Set the text.
      msg.text = text;

      // Set the attributes.
      msg.volume = 1; // parseFloat(volumeInput.value);
      // Rate needs to be between 0 and 10, default is 1
      msg.rate = parseFloat((Math.random()*0.2)+e.defaults.speechRate);// parseFloat(rateInput.value);
      // Pitch needs to be between 0 and 2, 1 is the default
      msg.pitch = parseFloat((Math.random()*0.2)+0.9); // parseFloat(pitchInput.value);
      console.log ("Rate: " + msg.rate);
      console.log ("Pitch: " + msg.pitch);

      msg.lang = e.defaults.speechApiLanguages[e.defaults.languageTarget];

      // Queue this utterance.
      console.log ("Msg: " + msg.text);
      window.speechSynthesis.speak(msg);

      msg.onstart = function(event) {
          $('#button_play').text("Playing");
          $('#button_play').attr("disabled", "disabled");
      };

      msg.onend = function(event) {
          $('#button_play').text("Play audio");
          $('#button_play').removeAttr("disabled");
      };
    },

    // from french-speaking:

    checkAnswer(inputPhrase) {
        // Check current input text with previous spoken phrase
        var lowerCaseInput = inputPhrase.toLowerCase();
        var lowerCasePhrase = "" + e.defaults.currentPhrase.target;

        lowerCasePhrase = lowerCasePhrase.toLowerCase();

        // remove diacritics
        lowerCasePhrase = e.functions.removeDiacritics(lowerCasePhrase);
        lowerCaseInput =  e.functions.removeDiacritics(lowerCaseInput);

        console.log("LOWER Case Input: " + lowerCaseInput);
        console.log("LOWER Case Phrase: " + lowerCasePhrase);

        if (lowerCasePhrase == lowerCaseInput) {
          e.defaults.incorrectAnswerCount=0;
          $('#translation').text("");
          console.log ("Correct!");

          // Clear the text input
          $('#usersays').val("");
          e.functions.skipNextSpeakingPhrase();
        }
        else
        {
          e.functions.printPhrase(e.defaults.currentPhrase.target);
          e.defaults.incorrectAnswerCount++;
          if (e.defaults.incorrectAnswerCount > 3){
            $('#translation').text(e.defaults.currentPhrase.target);

          }
          if (e.defaults.incorrectAnswerCount > 5){
            $('#help').text(e.defaults.currentPhrase.target);
          }
        }
    },

    /*
     * FUNCTION: printPhrase(text)
     * output the specified text in the translation field
     */
    printPhrase(text) {
      $('#translation').text(text);
    },

    recordVoiceAnswer() {
      var voiceRecognition = new webkitSpeechRecognition();
      voiceRecognition.lang = e.defaults.speechApiLanguages[e.defaults.languageTarget];
      voiceRecognition.onresult = function(event) {
        console.log("I heard this: " + event.results[0][0].transcript);
        var spokenInput = event.results[0][0].transcript;
        var spokenInputConfidence = event.results[0][0].confidence;
        $('#usersays').val("" + spokenInput);

        e.functions.checkAnswer(spokenInput);
      }
      voiceRecognition.onerror = function(event) {
            console.log ("Recognition stopped! (error) " + event.error);
            voiceRecognition.stop();
      }
      voiceRecognition.start();
      console.log ("recognition started");
    },
    // this is different from the listening function, so let's keep it here for now
    skipNextSpeakingPhrase(){
      console.log('skip');
      e.defaults.incorrectAnswerCount=0;
      $('#translation').text("");
      // Clear the text input
      $('#usersays').val("");
      e.functions.getNewPhrase(e.defaults.currentExercise);
      e.functions.printPhrase(e.defaults.currentPhrase.base);
    },
  }, // end functions
  phrases: {}
}
