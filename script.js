// ==================== LANGUAGE NAVIGATION ====================
function openLevel(lang) {
    localStorage.setItem("language", lang);
    window.location.href = "level.html";
}

function openQuiz(level) {
    localStorage.setItem("level", level);
    window.location.href = "quiz.html";
}

// Set language title on level page
if (document.getElementById("languageTitle")) {
    let lang = localStorage.getItem("language") || "english";
    document.getElementById("languageTitle").innerText = lang.toUpperCase();
}

// ==================== SPEAK FUNCTION (WORKING) ====================
function speak(text, langCode) {
    if (!text || text.trim() === "") return;
    
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        let utterance = new SpeechSynthesisUtterance(text);
        let langMap = { "en": "en-US", "es": "es-ES", "fr": "fr-FR", "hi": "hi-IN" };
        utterance.lang = langMap[langCode] || "en-US";
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// ==================== CHECK ANSWER FUNCTION ====================
function checkTypedAnswer(correct, inputId, resultId) {
    let userAns = document.getElementById(inputId).value.trim().toLowerCase();
    let result = document.getElementById(resultId);
    
    if (!userAns) {
        result.innerText = "⚠️ Please type your answer!";
        result.style.color = "orange";
        return;
    }
    
    let correctLower = correct.toLowerCase();
    if (userAns === correctLower || correctLower.includes(userAns) || userAns.includes(correctLower.split(" ")[0])) {
        result.innerText = "✅ Correct! Great job!";
        result.style.color = "#4CAF50";
    } else {
        result.innerText = "❌ Incorrect. Correct answer: " + correct;
        result.style.color = "#f44336";
    }
}

// ==================== SPEECH PRACTICE ====================
function startSpeechPractice(text) {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Speech recognition not supported in this browser. Please use Chrome.");
        return;
    }
    
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    
    recognition.onresult = function(event) {
        let spoken = event.results[0][0].transcript.toLowerCase();
        let expected = text.toLowerCase();
        
        if (spoken.includes(expected.split(" ")[0]) || expected.includes(spoken.split(" ")[0])) {
            alert("🎉 Good pronunciation!");
        } else {
            alert("❌ Try again!\nYou said: " + spoken + "\nExpected: " + text);
        }
    };
    
    recognition.onerror = function() {
        alert("Speech recognition error. Please check your microphone.");
    };
}

// ==================== QUIZ PAGE LOGIC ====================
if (document.getElementById("quizTitle")) {
    let lang = localStorage.getItem("language") || "english";
    let level = localStorage.getItem("level") || "basic";
    
    let langCode = (lang === "spanish") ? "es" : (lang === "french") ? "fr" : "en";
    
    // ==================== BASIC LEVEL - WORDS ONLY (NO QUIZ) ====================
    if (level === "basic") {
        document.getElementById("quizTitle").innerHTML = `${lang.toUpperCase()} - BASIC LEVEL (Vocabulary)`;
        
        let wordsData = {
            french: [
                ["Hello", "Bonjour"], ["Good Morning", "Bonjour"], ["Good Evening", "Bonsoir"],
                ["Thank You", "Merci"], ["Please", "S'il vous plaît"], ["Sorry", "Désolé"],
                ["Yes", "Oui"], ["No", "Non"], ["How are you?", "Comment ça va ?"],
                ["I am fine", "Je vais bien"], ["Welcome", "Bienvenue"], ["Good night", "Bonne nuit"],
                ["Excuse me", "Excusez-moi"], ["See you", "À bientôt"], ["Friend", "Ami"],
                ["Love", "Amour"], ["Happy", "Heureux"], ["Sad", "Triste"], ["Big", "Grand"],
                ["Small", "Petit"], ["Good", "Bon"], ["Bad", "Mauvais"], ["Beautiful", "Beau"],
                ["Ugly", "Laid"], ["Fast", "Rapide"], ["Slow", "Lent"], ["Hot", "Chaud"],
                ["Cold", "Froid"], ["New", "Nouveau"], ["Old", "Vieux"], ["Young", "Jeune"],
                ["Work", "Travail"], ["School", "École"], ["House", "Maison"], ["Car", "Voiture"],
                ["Water", "Eau"], ["Food", "Nourriture"], ["Family", "Famille"], ["Mother", "Mère"],
                ["Father", "Père"], ["Brother", "Frère"], ["Sister", "Sœur"]
            ],
            spanish: [
                ["Hello", "Hola"], ["Good Morning", "Buenos días"], ["Good Evening", "Buenas noches"],
                ["Thank You", "Gracias"], ["Please", "Por favor"], ["Sorry", "Lo siento"],
                ["Yes", "Sí"], ["No", "No"], ["How are you?", "¿Cómo estás?"],
                ["I am fine", "Estoy bien"], ["Welcome", "Bienvenido"], ["Good night", "Buenas noches"],
                ["Excuse me", "Perdón"], ["See you", "Hasta luego"], ["Friend", "Amigo"],
                ["Love", "Amor"], ["Happy", "Feliz"], ["Sad", "Triste"], ["Big", "Grande"],
                ["Small", "Pequeño"], ["Good", "Bueno"], ["Bad", "Malo"], ["Beautiful", "Hermoso"],
                ["Ugly", "Feo"], ["Fast", "Rápido"], ["Slow", "Lento"], ["Hot", "Caliente"],
                ["Cold", "Frío"], ["New", "Nuevo"], ["Old", "Viejo"], ["Young", "Joven"],
                ["Work", "Trabajo"], ["School", "Escuela"], ["House", "Casa"], ["Car", "Coche"],
                ["Water", "Agua"], ["Food", "Comida"], ["Family", "Familia"], ["Mother", "Madre"],
                ["Father", "Padre"], ["Brother", "Hermano"], ["Sister", "Hermana"]
            ],
            english: [
                ["Hello", "नमस्ते"], ["Good Morning", "सुप्रभात"], ["Good Evening", "शुभ संध्या"],
                ["Thank You", "धन्यवाद"], ["Please", "कृपया"], ["Sorry", "माफ़ कीजिए"],
                ["Yes", "हाँ"], ["No", "नहीं"], ["How are you?", "आप कैसे हैं?"],
                ["I am fine", "मैं ठीक हूँ"], ["Welcome", "स्वागत है"], ["Good night", "शुभ रात्रि"],
                ["Excuse me", "क्षमा करें"], ["See you", "फिर मिलेंगे"], ["Friend", "मित्र"],
                ["Love", "प्यार"], ["Happy", "खुश"], ["Sad", "उदास"], ["Big", "बड़ा"],
                ["Small", "छोटा"], ["Good", "अच्छा"], ["Bad", "बुरा"], ["Beautiful", "सुंदर"],
                ["Ugly", "बदसूरत"], ["Fast", "तेज़"], ["Slow", "धीमा"], ["Hot", "गरम"],
                ["Cold", "ठंडा"], ["New", "नया"], ["Old", "पुराना"], ["Young", "जवान"],
                ["Work", "काम"], ["School", "स्कूल"], ["House", "घर"], ["Car", "गाड़ी"],
                ["Water", "पानी"], ["Food", "खाना"], ["Family", "परिवार"], ["Mother", "माँ"],
                ["Father", "पिता"], ["Brother", "भाई"], ["Sister", "बहन"]
            ]
        };
        
        let words = wordsData[lang];
        let table1 = document.getElementById("table1");
        let table2 = document.getElementById("table2");
        let mid = Math.ceil(words.length / 2);
        
        function fill(table, data) {
            table.innerHTML = "";
            data.forEach(w => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${w[0]}</td>
                    <td>${w[1]} <button onclick="speak('${w[1].replace(/'/g, "\\'")}', '${langCode}')">🔊</button></td>
                `;
                table.appendChild(row);
            });
        }
        
        fill(table1, words.slice(0, mid));
        fill(table2, words.slice(mid));
        
        // Hide other sections
        if (document.getElementById("sentenceSection")) {
            document.getElementById("sentenceSection").style.display = "none";
        }
        if (document.getElementById("questionsSection")) {
            document.getElementById("questionsSection").style.display = "none";
        }
        if (document.getElementById("quizSection")) {
            document.getElementById("quizSection").style.display = "none";
        }
    }
    
    // ==================== INTERMEDIATE LEVEL - SENTENCES ONLY (NO QUIZ) ====================
    else if (level === "intermediate") {
        document.getElementById("quizTitle").innerHTML = `${lang.toUpperCase()} - INTERMEDIATE LEVEL (Sentences)`;
        
        let sentenceData = {
            french: [
                ["How are you?", "Comment ça va ?"], ["I am fine", "Je vais bien"],
                ["What are you doing?", "Que fais-tu ?"], ["Where are you going?", "Où vas-tu ?"],
                ["I am learning French", "J'apprends le français"], ["Please help me", "S'il vous plaît aidez-moi"],
                ["I don't understand", "Je ne comprends pas"], ["Can you repeat?", "Pouvez-vous répéter ?"],
                ["Nice to meet you", "Enchanté"], ["See you later", "À plus tard"],
                ["I am hungry", "J'ai faim"], ["I am tired", "Je suis fatigué"],
                ["Let's go", "Allons-y"], ["Wait a moment", "Attendez un moment"],
                ["What is your name?", "Comment vous appelez-vous ?"],
                ["Where is the station?", "Où est la gare ?"], ["How much?", "Combien ?"],
                ["I love you", "Je t'aime"], ["Good luck", "Bonne chance"]
            ],
            spanish: [
                ["How are you?", "¿Cómo estás?"], ["I am fine", "Estoy bien"],
                ["What are you doing?", "¿Qué estás haciendo?"], ["Where are you going?", "¿A dónde vas?"],
                ["I am learning Spanish", "Estoy aprendiendo español"], ["Please help me", "Por favor ayúdame"],
                ["I don't understand", "No entiendo"], ["Can you repeat?", "¿Puedes repetir?"],
                ["Nice to meet you", "Mucho gusto"], ["See you later", "Hasta luego"],
                ["I am hungry", "Tengo hambre"], ["I am tired", "Estoy cansado"],
                ["Let's go", "Vamos"], ["Wait a moment", "Espera un momento"],
                ["What is your name?", "¿Cómo te llamas?"],
                ["Where is the station?", "¿Dónde está la estación?"], ["How much?", "¿Cuánto?"],
                ["I love you", "Te quiero"], ["Good luck", "Buena suerte"]
            ],
            english: [
                ["How are you?", "आप कैसे हैं?"], ["I am fine", "मैं ठीक हूँ"],
                ["What are you doing?", "आप क्या कर रहे हैं?"], ["Where are you going?", "आप कहाँ जा रहे हैं?"],
                ["I am learning English", "मैं अंग्रेजी सीख रहा हूँ"], ["Please help me", "कृपया मेरी मदद करें"],
                ["I don't understand", "मुझे समझ नहीं आया"], ["Can you repeat?", "क्या आप दोहरा सकते हैं?"],
                ["Nice to meet you", "आपसे मिलकर खुशी हुई"], ["See you later", "फिर मिलेंगे"],
                ["I am hungry", "मुझे भूख लगी है"], ["I am tired", "मैं थक गया हूँ"],
                ["Let's go", "चलो चलते हैं"], ["Wait a moment", "एक मिनट रुकिए"],
                ["What is your name?", "आपका नाम क्या है?"],
                ["Where is the station?", "स्टेशन कहाँ है?"], ["How much?", "कितना?"],
                ["I love you", "मैं तुमसे प्यार करता हूँ"], ["Good luck", "शुभकामनाएँ"]
            ]
        };
        
        let sentences = sentenceData[lang];
        let table1 = document.getElementById("sentenceTable1");
        let table2 = document.getElementById("sentenceTable2");
        let mid = Math.ceil(sentences.length / 2);
        
        function fill(table, data) {
            table.innerHTML = "";
            data.forEach(s => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${s[0]}</td>
                    <td>${s[1]} <button onclick="speak('${s[1].replace(/'/g, "\\'")}', '${langCode}')">🔊</button></td>
                `;
                table.appendChild(row);
            });
        }
        
        fill(table1, sentences.slice(0, mid));
        fill(table2, sentences.slice(mid));
        
        // Hide other sections
        if (document.querySelector(".word-section")) {
            document.querySelector(".word-section").style.display = "none";
        }
        if (document.getElementById("questionsSection")) {
            document.getElementById("questionsSection").style.display = "none";
        }
        if (document.getElementById("quizSection")) {
            document.getElementById("quizSection").style.display = "none";
        }
    }
    
    // ==================== ADVANCED LEVEL - QUIZ IS IN quiz.html ====================
    else if (level === "advanced") {
        document.getElementById("quizTitle").innerHTML = `${lang.toUpperCase()} - ADVANCED LEVEL (Quiz)`;
        // Quiz content is already in quiz.html
    }
}

// ==================== BROWSER SPEECH SUPPORT CHECK ====================
if ('speechSynthesis' in window) {
    console.log("✅ Browser supports speech synthesis");
} else {
    console.log("⚠️ Browser does not fully support speech synthesis");
}

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    console.log("✅ Browser supports speech recognition");
} else {
    console.log("⚠️ Browser does not support speech recognition");
}