/* ==========================================
   Movie Quiz Challenge
   instruction.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENTS
    ====================================== */

    const musicBtn = document.getElementById("musicToggle");
    const bgm = document.getElementById("bgm");
    const welcome = document.getElementById("welcomeName");
    const startBtn = document.getElementById("startQuiz");
    const countdown = document.getElementById("countdown");

    /* ======================================
       SHOW STUDENT NAME
    ====================================== */

    const fullname = sessionStorage.getItem("fullname");

    if (fullname) {
        welcome.innerHTML = `Welcome, ${fullname} 👋`;
    }

    /* ======================================
       MUSIC TOGGLE
    ====================================== */

    let musicPlaying = false;

    musicBtn.addEventListener("click", () => {

        if (!musicPlaying) {

            bgm.volume = 0.2;
            bgm.play();

            musicBtn.innerHTML = "🔊 Music";

            musicPlaying = true;

        } else {

            bgm.pause();

            musicBtn.innerHTML = "🎵 Music";

            musicPlaying = false;

        }

    });

    /* ======================================
       START QUIZ BUTTON
    ====================================== */

    startBtn.addEventListener("click", () => {

        startBtn.disabled = true;

        startBtn.innerHTML = "Preparing Quiz...";

        setTimeout(() => {

            showCountdown();

        }, 600);

    });

    /* ======================================
       COUNTDOWN
    ====================================== */

    function showCountdown() {

        countdown.classList.remove("hidden");

        const text = countdown.querySelector("div");

        const number = ["3", "2", "1", "GO!"];

        let index = 0;

        text.innerHTML = number[index];

        const timer = setInterval(() => {

            index++;

            if (index < number.length) {

                text.innerHTML = number[index];

            } else {

                clearInterval(timer);

                document.body.style.transition = "opacity .6s";

                document.body.style.opacity = "0";

                setTimeout(() => {

                    window.location.href = "quiz.html";

                }, 700);

            }

        }, 900);

    }

    /* ======================================
       FADE IN
    ====================================== */

    document.body.style.opacity = "0";

    window.addEventListener("load", () => {

        document.body.style.transition = "opacity .6s ease";

        document.body.style.opacity = "1";

    });

});