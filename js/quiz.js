/* ==========================================
   Movie Quiz Challenge
   Quiz Engine
========================================== */

let currentQuestion = 0;

let score = 0;

let userAnswers = new Array(questions.length).fill(null);

let timer = QUIZ_CONFIG.totalTime;

let timerInterval = null;

let isAnimating = false;

let lockedQuestions = new Array(questions.length).fill(false);

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbys6vkzVeHXt1T1kzl9mEnAWN2nDhdLRbyBD8aBAwpy7kvaEmrRdSfj81L28HK7Oth1/exec";

/* ==========================================
   ELEMENTS
========================================== */

const studentName = document.getElementById("studentName");

const studentClass = document.getElementById("studentClass");

const currentQuestionText =
document.getElementById("currentQuestion");

const totalQuestion =
document.getElementById("totalQuestion");

const progressFill =
document.getElementById("progressFill");

const progressText =
document.getElementById("progressText");

const scoreText =
document.getElementById("score");

const timerText =
document.getElementById("timer");

const questionGrid =
document.getElementById("questionGrid");

const questionTitle =
document.getElementById("questionText");

const answerContainer =
document.getElementById("answerContainer");

const categoryBadge =
document.getElementById("categoryBadge");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

/* ==========================================
   LOAD STUDENT
========================================== */

studentName.textContent =
sessionStorage.getItem("fullname") || "Student";

studentClass.textContent =
sessionStorage.getItem("class") || "-";

/* ==========================================
   TOTAL QUESTION
========================================== */

totalQuestion.textContent =
questions.length;

/* ==========================================
   CREATE SIDEBAR
========================================== */

function createQuestionGrid(){

    questionGrid.innerHTML="";

    questions.forEach((q,index)=>{

        const button=document.createElement("button");

        button.className="question-number";

        button.innerText=index+1;

        button.onclick=()=>{

            currentQuestion=index;

            animateQuestion();

        };

        questionGrid.appendChild(button);

    });

}

/* ==========================================
   UPDATE SIDEBAR
========================================== */

function updateSidebar(){

    const buttons=document.querySelectorAll(".question-number");

    buttons.forEach((button,index)=>{

        button.className="question-number";

        if(index===currentQuestion){

            button.classList.add("current");

        }

        if(lockedQuestions[index]){

            if(userAnswers[index]===questions[index].answer){

                button.classList.add("correct");

            }else{

                button.classList.add("wrong");

            }

        }

    });

}
/* ==========================================
   LOAD QUESTION
========================================== */

function loadQuestion(){

    updateSidebar();

    const question=

    questions[currentQuestion];

    currentQuestionText.innerText=

    currentQuestion+1;

    categoryBadge.innerText=

    question.category;

    questionTitle.innerText=

    question.question;

    answerContainer.innerHTML="";

    const difficulty = document.getElementById("questionDifficulty");
    const points = document.getElementById("questionPoints");

    if(difficulty){
        difficulty.innerText = question.difficulty;
    }

    if(points){
        points.innerText = `+${question.points} pts`;
    }
    question.choices.forEach((choice,index)=>{

        const card=document.createElement("div");

        card.className="answer-card";

        card.innerHTML=
            `

            <div class="letter">

            ${String.fromCharCode(65+index)}

            </div>

            <p>

            ${choice}

            </p>

            <div class="check">

            ✔

            </div>

            `;

        if(userAnswers[currentQuestion]===index){

            card.classList.add("selected");

            if(lockedQuestions[currentQuestion]){

                card.classList.add("locked");

            }

        }

        card.onclick = ()=>{

            if(!lockedQuestions[currentQuestion]){

                selectAnswer(index);

            }

        };

        if(lockedQuestions[currentQuestion]){

            card.style.cursor = "default";

        }

        answerContainer.appendChild(card);

    });

    updateProgress();

    scoreText.innerText=score;

    prevBtn.disabled = currentQuestion===0;

    nextBtn.disabled = userAnswers[currentQuestion]==null;

}

/* ==========================================
   UPDATE PROGRESS
========================================== */

function updateProgress(){

    const percent =
    ((currentQuestion+1)/questions.length)*100;

    progressFill.style.width = percent + "%";

    progressText.innerHTML =
    Math.round(percent) + "%";

}

/* ==========================================
   PREVIOUS BUTTON
========================================== */

prevBtn.addEventListener("click",()=>{

    if(currentQuestion>0){

        currentQuestion--;

        animateQuestion();

    }

});

/* ==========================================
   NEXT BUTTON
========================================== */

nextBtn.addEventListener("click",()=>{

    if(userAnswers[currentQuestion] == null){

        alert("Please select an answer first.");

        return;

    }

    lockedQuestions[currentQuestion] = true;

    const isCorrect =
        userAnswers[currentQuestion] === questions[currentQuestion].answer;

    updateLiveScore();

    updateSidebar();

    updateStatistics();

    showToast(isCorrect ? "correct" : "wrong");

    saveQuiz();

    if(currentQuestion < questions.length - 1){

        setTimeout(()=>{

            currentQuestion++;

            animateQuestion();

        },800);

    }else{

        setTimeout(()=>{

            finishQuiz();

        },800);

    }

});

/* ==========================================
   TIMER
========================================== */

function startTimer(){

    timerInterval = setInterval(()=>{

        timer--;

        saveQuiz();

        const minute = Math.floor(timer/60);
        const second = timer%60;

        timerText.innerText =
        `${String(minute).padStart(2,"0")}:${String(second).padStart(2,"0")}`;

        if(timer<=300){

            timerText.style.color="#FF9800";

        }

        if(timer<=60){

            timerText.style.color="#FF3B30";

            timerText.classList.add("blink");

        }

        if(timer<=0){

            clearInterval(timerInterval);

            finishQuiz();

        }

    },1000);

}

/* ==========================================
   CALCULATE SCORE
========================================== */

function calculateScore(){

    score = 0;

    questions.forEach((question,index)=>{

        if(userAnswers[index]===question.answer){

            score += question.points;

        }

    });

    scoreText.innerHTML = score;

}

/* ==========================================
   FINISH QUIZ
========================================== */

function finishQuiz(){

    sessionStorage.removeItem("quizProgress");

    clearInterval(timerInterval);

    updateLiveScore();

    sessionStorage.setItem("score",score);

    sessionStorage.setItem(

        "answers",

        JSON.stringify(userAnswers)

    );

    sessionStorage.setItem(

        "timeRemaining",

        timer

    );

    sessionStorage.removeItem("quizProgress");

    window.location.href="result.html";

}

/* ==========================================
   START QUIZ
========================================== */

loadSavedQuiz();

createQuestionGrid();

animateQuestion();

updateStatistics();

updateLiveScore();

startTimer();

/* ==========================================
   UPDATE LIVE SCORE
========================================== */

function updateLiveScore(){

    let newScore = 0;

    questions.forEach((question,index)=>{

        if(userAnswers[index]===question.answer){

            newScore += question.points;

        }

    });

    score = newScore;

    scoreText.textContent = score;

}

document.addEventListener("keydown",(e)=>{

    const key=e.key.toUpperCase();

    const map={

        "A":0,

        "B":1,

        "C":2,

        "D":3

    };

    if(

    map[key]!=undefined &&

    userAnswers[currentQuestion]==null

    ){

        selectAnswer(map[key]);

    }

});

/* ==========================================
   SELECT ANSWER
========================================== */

function selectAnswer(answerIndex){

    if(lockedQuestions[currentQuestion]) return;

    userAnswers[currentQuestion] = answerIndex;

    loadQuestion();

    nextBtn.disabled = false;

    saveQuiz();

}

/* ==========================================
   TOAST
========================================== */

function showToast(type){

    const toast=document.getElementById("toast");

    toast.className="";

    toast.offsetHeight;

    if(type==="correct"){

        toast.classList.add("correct");

        toast.innerHTML="✔ Correct! +10 pts";

    }else{

        toast.classList.add("wrong");

        toast.innerHTML=
        `✖ Incorrect<br>
        Correct Answer :
        ${questions[currentQuestion].choices[
            questions[currentQuestion].answer
        ]}`;

    }

    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout=setTimeout(()=>{

    toast.classList.remove("show");

    },1800);

}

function updateStatistics(){

const answered=

userAnswers.filter(

a=>a!==null

).length;

const correct=

userAnswers.filter(

(answer,index)=>

answer===questions[index].answer

).length;

document.getElementById(

"answeredCount"

).innerText=answered;

document.getElementById(

"remainingCount"

).innerText=

questions.length-answered;

document.getElementById(

"correctCount"

).innerText=

correct;

}

function animateQuestion(){

    if(isAnimating) return;

    isAnimating = true;

    const card=document.querySelector(".quiz-card");

    card.classList.add("slide-out");

    setTimeout(()=>{

        loadQuestion();

        card.classList.remove("slide-out");

        card.classList.add("slide-in");

        setTimeout(()=>{

            card.classList.remove("slide-in");

            isAnimating=false;

        },300);

    },250);

}

/* ==========================================
   SAVE QUIZ
========================================== */

function saveQuiz(){

    sessionStorage.setItem(

        "quizProgress",

        JSON.stringify({

            currentQuestion,

            userAnswers,

            lockedQuestions,

            score,

            timer

        })

    );

}

/* ==========================================
   LOAD SAVED QUIZ
========================================== */

function loadSavedQuiz(){

    const saved = sessionStorage.getItem("quizProgress");

    if(!saved) return;

    const data = JSON.parse(saved);

    currentQuestion = data.currentQuestion || 0;

    userAnswers = data.userAnswers || new Array(questions.length).fill(null);

    lockedQuestions = data.lockedQuestions || new Array(questions.length).fill(false);

    score = data.score || 0;

    timer = data.timer ?? QUIZ_CONFIG.totalTime;

    scoreText.innerText = score;

    timerText.innerText =
        `${String(Math.floor(timer/60)).padStart(2,"0")}:${String(timer%60).padStart(2,"0")}`;

}

window.addEventListener("beforeunload",()=>{

saveQuiz();

});

window.onload = () => {

    const overlay =
    document.getElementById("loadingOverlay");

    if(overlay){

        overlay.style.display = "none";

    }

};

/* ==========================================
   MUSIC
========================================== */

const musicBtn = document.getElementById("musicBtn");
const bgm = document.getElementById("bgm");

musicBtn.innerHTML = "🎵 Music OFF";

musicBtn.addEventListener("click", async () => {

    try{

        if(bgm.paused){

            await bgm.play();

            musicBtn.innerHTML = "🎵 Music ON";

        }else{

            bgm.pause();

            musicBtn.innerHTML = "🎵 Music OFF";

        }

    }catch(error){

        console.error("Music Error:", error);

    }

});

const reportBtn=document.getElementById("reportBtn");

const reportModal=document.getElementById("reportModal");

const cancelReport=document.getElementById("cancelReport");

reportBtn.addEventListener("click",()=>{

    reportModal.classList.add("show");

});

cancelReport.addEventListener("click",()=>{

    reportModal.classList.remove("show");

});

reportModal.addEventListener("click",(e)=>{

    if(e.target===reportModal){

        reportModal.classList.remove("show");

    }

});
/* ==========================================
   END QUIZ MODAL
========================================== */

const endBtn = document.getElementById("endQuizBtn");
const endModal = document.getElementById("endModal");
const cancelEnd = document.getElementById("cancelEnd");
const confirmEnd = document.getElementById("confirmEnd");

endBtn.addEventListener("click", () => {

    endModal.classList.add("show");

});

cancelEnd.addEventListener("click", () => {

    endModal.classList.remove("show");

});

confirmEnd.addEventListener("click", () => {

    endModal.classList.remove("show");

    finishQuiz();

});

endModal.addEventListener("click", (e) => {

    if(e.target === endModal){

        endModal.classList.remove("show");

    }

});

const sendReport =
document.getElementById("sendReport");

sendReport.addEventListener("click", async () => {

    const reason =
        document.getElementById("reportReason").value;

    const notes =
        document.getElementById("reportMessage").value;

    const question =
        questions[currentQuestion];

    const report = {

        action: "report",

        name:
            sessionStorage.getItem("fullname"),

        class:
            sessionStorage.getItem("class"),

        question:
            currentQuestion + 1,

        category:
            question.category,

        reason,

        notes

    };

    sendReport.classList.add("loading");

    try{

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify(report)

        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed");
        }

        reportModal.classList.remove("show");

        showSuccess("🚩 Report submitted successfully.");

        document.getElementById("reportReason").selectedIndex = 0;
        document.getElementById("reportMessage").value = "";

        sendReport.classList.remove("loading");

    }catch(error){

        sendReport.classList.remove("loading");

        alert("Failed to submit report.");

        console.error(error);

    }

});

function showSuccess(message){

    const toast = document.getElementById("toast");

    toast.className = "show correct";

    toast.innerHTML = message;

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

document.getElementById("reportReason").selectedIndex = 0;

document.getElementById("reportMessage").value = "";