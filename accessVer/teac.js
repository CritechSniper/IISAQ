const AUTH_KEY = "lcds?t=t";
const REDIRECT_DELAY_MS = 10000;
const REDIRECT_URL = "../index.html";

let warnbox = document.getElementById("warnbox");
let blurOverlay = document.getElementById("blur-overlay");
let warnsubtext = document.getElementById("warnsubtext");
let countdownEl = document.getElementById("countdown");

function startRedirectSequence() {
    if (!warnbox) {
        console.error("Warnbox element not found. Redirecting without warning.");
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, REDIRECT_DELAY_MS);
        return; 
    }
    blurOverlay.style.display = "block";
    warnbox.style.display = "block";
    
    if (warnsubtext) {
        warnsubtext.textContent = "Access Denied: Teacher Key Missing";
    }

    let secondsLeft = REDIRECT_DELAY_MS / 1000;
    
    const interval = setInterval(() => {
        secondsLeft--;
        if (countdownEl) {
            countdownEl.textContent = secondsLeft;
        }

        if (secondsLeft <= 0) {
            clearInterval(interval);
            blurOverlay.style.display = "none";
            warnbox.style.display = "none";
            window.location.href = REDIRECT_URL;
        }
    }, 1000);
}

const authCheck = localStorage.getItem(AUTH_KEY);

if (!authCheck) {
    startRedirectSequence();
}