/* ==========================================
   Movie Quiz Login
   login.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENT
    ====================================== */

    const form = document.getElementById("loginForm");

    const musicBtn = document.getElementById("musicToggle");

    const bgm = document.getElementById("bgm");

    const continueBtn = document.querySelector(".continue-btn");

    /* ======================================
       MUSIC
    ====================================== */

    let musicOn = false;

    musicBtn.addEventListener("click", () => {

        if (!musicOn) {

            bgm.volume = 0.2;

            bgm.play();

            musicBtn.innerHTML = `
                🔊 Music
            `;

            musicOn = true;

        } else {

            bgm.pause();

            musicBtn.innerHTML = `
                🎵 Music
            `;

            musicOn = false;

        }

    });

    /* ======================================
       TOAST NOTIFICATION
    ====================================== */

    function showToast(message, type = "error") {

        const toast = document.createElement("div");

        toast.className = `toast ${type}`;

        toast.innerHTML = message;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        }, 50);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 2500);

    }

    /* ======================================
       FORM SUBMIT
    ====================================== */

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const studentid =
            document.getElementById("studentid").value.trim();

        const studentClass =
            document.getElementById("class").value;

        /* ==============================
           VALIDATION
        ============================== */

        if (fullname === "") {

            showToast("Please enter your full name.");

            return;

        }

        if (studentid === "") {

            showToast("Please enter your Student ID.");

            return;

        }

        if (studentClass === "") {

            showToast("Please choose your class.");

            return;

        }

        /* ==============================
           SAVE SESSION
        ============================== */

        sessionStorage.setItem(
            "fullname",
            fullname
        );

        sessionStorage.setItem(
            "studentid",
            studentid
        );

        sessionStorage.setItem(
            "class",
            studentClass
        );

        /* ==============================
           BUTTON LOADING
        ============================== */

        continueBtn.disabled = true;

        continueBtn.innerHTML = `
            <span class="loader"></span>
            Loading...
        `;

                /* ==============================
           FADE OUT
        ============================== */

        document.body.style.transition =
            "opacity .6s ease";

        document.body.style.opacity = ".35";

        /* ==============================
           REDIRECT
        ============================== */

        setTimeout(() => {

            window.location.href =
                "instruction.html";

        }, 1200);

    });

    /* ======================================
       AUTO FILL
    ====================================== */

    const savedName =
        sessionStorage.getItem("fullname");

    const savedID =
        sessionStorage.getItem("studentid");

    const savedClass =
        sessionStorage.getItem("class");

    if (savedName) {

        document.getElementById("fullname").value =
            savedName;

    }

    if (savedID) {

        document.getElementById("studentid").value =
            savedID;

    }

    if (savedClass) {

        document.getElementById("class").value =
            savedClass;

    }

    /* ======================================
       ENTER KEY
    ====================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            const active =
                document.activeElement;

            if (
                active.tagName === "INPUT" ||
                active.tagName === "SELECT"
            ) {

                e.preventDefault();

                form.requestSubmit();

            }

        }

    });

    /* ======================================
       AUTO NEXT INPUT
    ====================================== */

    const inputs =
        document.querySelectorAll(
            "input, select"
        );

    inputs.forEach((input, index) => {

        input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                e.preventDefault();

                if (index < inputs.length - 1) {

                    inputs[index + 1].focus();

                }

            }

        });

    });

    /* ======================================
       PAGE FADE IN
    ====================================== */

    document.body.style.opacity = "0";

    window.addEventListener("load", () => {

        document.body.style.transition =
            "opacity .8s ease";

        document.body.style.opacity = "1";

    });

});