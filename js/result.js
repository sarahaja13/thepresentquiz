/* ==========================================
   RESULT PAGE
========================================== */

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbys6vkzVeHXt1T1kzl9mEnAWN2nDhdLRbyBD8aBAwpy7kvaEmrRdSfj81L28HK7Oth1/exec";

const TOTAL_SCORE = 300;
const TOTAL_QUESTIONS = questions.length;

const studentName =
document.getElementById("studentName");

const studentNameHero =
document.getElementById("studentNameHero");

const studentClass =
document.getElementById("studentClass");

const scoreText =
document.getElementById("score");

const percentageText =
document.getElementById("percentage");

const badgeName =
document.getElementById("badgeName");

const feedbackTitle =
document.getElementById("feedbackTitle");

const feedbackText =
document.getElementById("feedbackText");

const progressCircle =
document.getElementById("progressCircle");

/* ==========================================
   LOAD SESSION
========================================== */

const fullname =
sessionStorage.getItem("fullname") || "Student";

const kelas =
sessionStorage.getItem("class") || "-";

const score =
parseInt(sessionStorage.getItem("score")) || 0;

const answers =
JSON.parse(
sessionStorage.getItem("answers")
) || [];

const timeRemaining =
parseInt(
sessionStorage.getItem("timeRemaining")
) || 0;

studentName.innerText = fullname;

studentNameHero.innerText =
fullname.split(" ")[0];

studentClass.innerText = kelas;

/* ==========================================
   SCORE
========================================== */

scoreText.innerText = score;

const percentage =
Math.round(
(score / TOTAL_SCORE) * 100
);

percentageText.innerText =
percentage + "%";

/* ==========================================
   CALCULATE
========================================== */

let correct = 0;
let wrong = 0;
let unanswered = 0;

questions.forEach((question,index)=>{

    if(answers[index]==null){

        unanswered++;

    }

    else if(
        answers[index]===question.answer
    ){

        correct++;

    }

    else{

        wrong++;

    }

});

document.getElementById(
"correctCount"
).innerText = correct;

document.getElementById(
"wrongCount"
).innerText = wrong;

document.getElementById(
"unansweredCount"
).innerText = unanswered;

/* ==========================================
   PERFORMANCE DETAIL
========================================== */

const correctPercent =
((correct / TOTAL_QUESTIONS) * 100).toFixed(1);

const wrongPercent =
((wrong / TOTAL_QUESTIONS) * 100).toFixed(1);

const unansweredPercent =
((unanswered / TOTAL_QUESTIONS) * 100).toFixed(1);

document.getElementById("correctPercent").innerText =
`${correct} (${correctPercent}%)`;

document.getElementById("wrongPercent").innerText =
`${wrong} (${wrongPercent}%)`;

document.getElementById("unansweredPercent").innerText =
`${unanswered} (${unansweredPercent}%)`;

/* ==========================================
   TIME
========================================== */

const totalTime = 1200;

const used =
totalTime-timeRemaining;

const minute =
Math.floor(used/60);

const second =
used%60;

document.getElementById(
"timeTaken"
).innerText =
`${String(minute).padStart(2,"0")}:${String(second).padStart(2,"0")}`;

/* ==========================================
   BADGE
========================================== */

let badge="";

let title="";

let message="";

if(percentage>=90){

    badge="🏆";

    title="Movie Master";

    message=
    "Outstanding! You mastered the quiz.";

}

else if(percentage>=75){

    badge="🥇";

    title="Movie Expert";

    message=
    "Excellent work!";

}

else if(percentage>=60){

    badge="🥈";

    title="Movie Explorer";

    message=
    "Nice job! Keep practicing.";

}

else{

    badge="🥉";

    title="Movie Beginner";

    message=
    "Every expert starts somewhere.";

}

badgeName.innerText =
title;

document.querySelector(
".badge-icon"
).innerText = badge;

feedbackTitle.innerText =
title;

feedbackText.innerText =
message;

/* ==========================================
   RING
========================================== */

const radius = 85;

const circumference =
2*Math.PI*radius;

progressCircle.style.strokeDasharray =
circumference;

const offset =
circumference -
(
percentage/100
)*circumference;

setTimeout(()=>{

progressCircle.style.strokeDashoffset =
offset;

},400);

/* ==========================================
   CONFETTI
========================================== */

const canvas =
document.getElementById(
"confettiCanvas"
);

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const confetti=[];

for(let i=0;i<120;i++){

confetti.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height-canvas.height,

r:Math.random()*8+4,

dx:Math.random()*4-2,

dy:Math.random()*3+2

});

}

function drawConfetti(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

confetti.forEach(c=>{

ctx.beginPath();

ctx.arc(
c.x,
c.y,
c.r,
0,
Math.PI*2
);

ctx.fillStyle=
`hsl(${Math.random()*360},80%,60%)`;

ctx.fill();

c.y+=c.dy;

c.x+=c.dx;

if(c.y>

canvas.height){

c.y=-20;

}

});

requestAnimationFrame(
drawConfetti
);

}

drawConfetti();

window.addEventListener(
"resize",
()=>{

canvas.width=
window.innerWidth;

canvas.height=
window.innerHeight;

});

/* ==========================================
   QUESTION REVIEW
========================================== */

const reviewList =
document.getElementById("reviewList");

let expanded = false;

function generateReview(showAll = false, filter = "all"){

    reviewList.innerHTML="";

    const limit =
    showAll ? questions.length : 6;

    const reviewData = [];

    questions.forEach((question, index) => {

        const userAnswer = answers[index];

        let status = "correct";

        if (userAnswer == null) {

            status = "unanswered";

        } else if (userAnswer !== question.answer) {

            status = "wrong";

        }

        if (
            filter === "all" ||
            filter === status
        ) {

            reviewData.push({
                question,
                index,
                status,
                userAnswer
            });

        }

    });

    const display =
    showAll
    ? reviewData
    : reviewData.slice(0,6);

    display.forEach(item=>{

        const question = item.question;
        const index = item.index;
        const userAnswer = item.userAnswer;
        let status = item.status;

        let icon = "✔";
        let score = "+10";

        if(status==="wrong"){

            icon="✖";
            score="0";

        }

        if(status==="unanswered"){

            icon="—";
            score="0";

        }

        reviewList.innerHTML +=`

<div class="review-item">

<div class="status-icon ${status}">

${icon}

</div>

<div class="question-number">

${index+1}

</div>

<div>

<strong>

${question.question}

</strong>

</div>

<div class="question-score">

${score}

</div>

<button
class="review-btn"
onclick="reviewQuestion(${index})">

Review

</button>

</div>

`;

    });

}

function reviewQuestion(index){

    const q = questions[index];

    const user = answers[index];

    let message = `Question ${index + 1}

${q.question}

--------------------------------

Your Answer:
${user == null
    ? "No Answer"
    : q.choices[user]}

Correct Answer:
${q.choices[q.answer]}`;

    alert(message);

}

const viewBtn =
document.getElementById("viewAllBtn");

generateReview();

const filterAll =
document.getElementById("filterAll");

const filterCorrect =
document.getElementById("filterCorrect");

const filterWrong =
document.getElementById("filterWrong");

let currentFilter = "all";

function activateFilter(button){

    document
        .querySelectorAll(".review-filter button")
        .forEach(btn=>btn.classList.remove("active"));

    button.classList.add("active");

}

filterAll.addEventListener("click",()=>{

    currentFilter="all";

    activateFilter(filterAll);

    generateReview(expanded,currentFilter);

});

filterCorrect.addEventListener("click",()=>{

    currentFilter="correct";

    activateFilter(filterCorrect);

    generateReview(expanded,currentFilter);

});

filterWrong.addEventListener("click",()=>{

    currentFilter="wrong";

    activateFilter(filterWrong);

    generateReview(expanded,currentFilter);

});

viewBtn.addEventListener("click",()=>{

expanded=!expanded;

generateReview(
    expanded,
    currentFilter
);

viewBtn.innerHTML=
expanded ?

'Show Less <i class="fa-solid fa-angle-up"></i>'

:

'View All Questions <i class="fa-solid fa-angle-down"></i>';

});

document
.getElementById("homeBtn")
.addEventListener("click",()=>{

window.location.href="index.html";

});

document
.getElementById("retakeBtn")
.addEventListener("click",()=>{

if(confirm(
"Retake this quiz?"
)){

sessionStorage.removeItem("score");

sessionStorage.removeItem("answers");

sessionStorage.removeItem("timeRemaining");

sessionStorage.removeItem("resultSubmitted");

window.location.href="instruction.html";

}

});

function showToast(message){

const toast=
document.getElementById("toast");

toast.innerText=
message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast(
"🎉 Congratulations!"
);

},900);

});

/* ==========================================
   SUBMIT RESULT TO GOOGLE SHEETS
========================================== */

async function submitResult(){

    const data={

        action:"submitResult",

        name:fullname,

        nim: sessionStorage.getItem("studentid"),

        class:kelas,

        score:score,

        percentage:percentage,

        correct:correct,

        wrong:wrong,

        unanswered:unanswered,

        time:document.getElementById("timeTaken").innerText

    };

    try{

        const response=await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

        const result=await response.json();

        if(result.success){

            console.log("✅ Result berhasil disimpan.");

        }else{

            console.log(result.message);

        }

    }catch(err){

        console.error("Submit Result Error:",err);

    }

}

window.addEventListener("load",()=>{

    if(!sessionStorage.getItem("resultSubmitted")){

        submitResult();

        sessionStorage.setItem(
            "resultSubmitted",
            "true"
        );

    }

});

document
.getElementById("homeBtn")
.addEventListener("click",()=>{

    sessionStorage.removeItem("score");
    sessionStorage.removeItem("answers");
    sessionStorage.removeItem("timeRemaining");
    sessionStorage.removeItem("resultSubmitted");

    window.location.href="index.html";

});