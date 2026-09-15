const AUTH_KEY = "lcds?t=s";
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
	blurOverlay.style.display = " block";
	warnbox.style.display = "block";

	if (warnsubtext) {
		warnsubtext.textContent = "Access Denied: Student Key Missing";
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

const ls = localStorage.getItem("lcds?t=s");

if (!ls) { 
    window.location.href = "../login.html?t=s"; 
} else {
    const lsData = JSON.parse(ls)?.data || {};

    const invEL = document.getElementById("username");
    const welcomeText = document.querySelector(".welcomeText");
    const classIn = document.getElementById("class");
    const teacInCharge = document.getElementById("classTeac");

    if (invEL) invEL.innerText = lsData.name || '';
    if (welcomeText) welcomeText.innerHTML = `Welcome <span class="username">${lsData.name || ''}</span>.`;
    
    if (classIn) classIn.textContent = `${lsData.grade || ''} ${lsData.section || ''}`;
    if (teacInCharge) teacInCharge.textContent = lsData.teachName || '';

    const logStyle = "color: white; font-family: Segoe UI;";
    console.log(`%cStudent Name: ${lsData.name}`, logStyle);
    console.log(`%cClass: ${lsData.grade}-${lsData.section}`, logStyle);
    console.log(`%cTeacher In-Charge: ${lsData.teachName}`, logStyle);
}