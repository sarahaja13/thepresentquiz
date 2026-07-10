/* ==========================================================
   MOVIE QUIZ
   LANDING PAGE
   main.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================================
       ELEMENTS
    =========================================== */

    const loader = document.getElementById("loader");

    const musicBtn = document.getElementById("musicToggle");

    const bgm = document.getElementById("bgm");

    const startBtn = document.querySelector(".start-btn");

    const heroVideo = document.querySelector(".hero-video");

    const hero = document.querySelector(".hero");

    /* ===========================================
       LOADER
    =========================================== */

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 2200);

    /* ===========================================
       FADE PAGE
    =========================================== */

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = ".8s";

        document.body.style.opacity = "1";

    }, 200);

    /* ===========================================
       MUSIC BUTTON
    =========================================== */

    let playing = false;

    musicBtn.addEventListener("click", () => {

        if (!playing) {

            bgm.play();

            musicBtn.innerHTML = `
            <i class="fa-solid fa-volume-high"></i>
            <span>ON</span>
            `;

            playing = true;

        }

        else {

            bgm.pause();

            musicBtn.innerHTML = `
            <i class="fa-solid fa-volume-xmark"></i>
            <span>OFF</span>
            `;

            playing = false;

        }

    });

    /* ===========================================
       START BUTTON
    =========================================== */

    startBtn.addEventListener("click", () => {

        startBtn.disabled = true;

        startBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Loading Quiz...
        `;

        document.body.style.opacity = ".2";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1800);

    });

    /* ===========================================
       VIDEO SLOW PLAYBACK
    =========================================== */

    heroVideo.playbackRate = .85;

    /* ===========================================
       CARD HOVER
    =========================================== */

    const cards = document.querySelectorAll(".info-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-12px) scale(1.03)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });

    /* ===========================================
       BUTTON RIPPLE
    =========================================== */

    startBtn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;

        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 700);

    });

    /* ===========================================
       TITLE FLOAT
    =========================================== */

    const title = document.querySelector("h1");

    setInterval(() => {

        title.animate([

            {

                transform: "translateY(0px)"

            },

            {

                transform: "translateY(-6px)"

            },

            {

                transform: "translateY(0px)"

            }

        ], {

            duration: 3000

        });

    }, 3000);

    /* ===========================================
       BADGE PULSE
    =========================================== */

    const badge = document.querySelector(".badge");

    setInterval(() => {

        badge.animate([

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(1.04)"

            },

            {

                transform: "scale(1)"

            }

        ], {

            duration: 1800

        });

    }, 3500);

});

const startBtn = document.getElementById("startQuiz");

startBtn.addEventListener("click", () => {

    document.body.classList.add("fade-out");

    setTimeout(() => {

        window.location.href = "login.html";

    }, 600);

});