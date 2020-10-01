var questionIndex = 0;
var timerInterval;
var highscores = JSON.parse(localStorage.getItem("highscores")) || []; 
var questions = [
    {
        question: "Commonly used data type DO NOT include:", 
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correct: 2
    },

    {
        question: "The condition in an if / else statement is enclosed within _____.", 
        choices: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        correct: 2
    },
    
    {
        question: "Arrays in JavaScript can be used to store _____.", 
        choices: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        correct: 3
    },    
    
    {
        question: "String values must be enclosed within _____ when being assigned to variables.", 
        choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
        correct: 2
    }, 
    
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        choices: ["1. JavaScript", "2. Terminal / Git Bash", "3. For loops", "4. Console.log"],
        correct: 3
    },
]

$(".quiz-intro").show();

// The "Start Quiz" button will hide the introduction, reveal the questions, and start the timer

var timeEl = $(".timer");
var secondsLeft = 100
var startQuiz = $("#start-quiz")
startQuiz.on("click", function(){
    $(".quiz-intro").hide();
    $(".question-section").removeClass("d-none");
    showQuestion();
    setTime();
})

function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft --;
        timeEl.text(secondsLeft);
            
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            // revealScore();
        }
    }, 1000);
    
}
$("#choices .btn").on("click", function(){
    if($(this).data("correct")){
        alert("Correct!");
    } else {
        alert("Wrong!");
        secondsLeft = secondsLeft - 10;
    }
    showQuestion();
})

$("#submit-score").on("click", function(){
    var name = $(".user-initials");
    if(name.val() == ""){
        $(".user-initials").addClass("border-danger");
        return false;
    }
    highscores.push(name.val() + " - " + secondsLeft);
    localStorage.setItem("highscores",  JSON.stringify(highscores));
    for(i = 0;i < highscores.length; i++){
        $("#highscores .btn:first").before("<p class=\"score\">"+ (i + 1) + ". " + highscores[i] +"</p>")
    }
    $("#results").addClass("d-none");
    $("#highscores").removeClass("d-none");
})

function clearScores() {
    localStorage.removeItem("highscores");
    $("#highscores .score").remove();
}

function showScores() {
    for(i = 0;i < highscores.length; i++){
        $("#highscores .btn:first").before("<p class=\"score\">"+ (i + 1) + ". " + highscores[i] +"</p>")
    }
    $("main>div").hide();
    $("#highscores").removeClass("d-none").show();
}

function showQuestion() {
    if(questionIndex > 4){
        getScore();
        return;
    }
    $(".questions").text(questions[questionIndex].question);
    for(var i=0; i < $("#choices .btn").length; i++) {
        $("#choices .btn:eq("+ i +")").val(questions[questionIndex].choices[i]);
    }

    $("#choices .btn:eq("+ questions[questionIndex].correct +")").data('correct', true);

    questionIndex = questionIndex + 1;
}

function getScore() {
    clearInterval(timerInterval);
    $(".question-section").addClass("d-none");
    $("#results").removeClass("d-none");
    $(".final-score").text("Your final score is " + secondsLeft);
    
}

// function quizResults() {
//     var results = localStorage.getItem("#results");
//     var initials = localStorage.getItem("initials");
//     var listEl = localStorage.getItem(listEl)
//     var newListing = document.createElement("li");
//     newListing.textContent = score.initials + "-" + score.score;
    
// }

var quizResults = document.getElementById('results');

// function revealScore() {
//     timeEl.textContent = secondsLeft;
//     alert("Your final score is " + secondsLeft);
// }

// if/else statement for making choices, timer decreases with wrong answers
var select = document.querySelector('#choices')
