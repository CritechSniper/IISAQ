const AUTH_KEY = "lcds?t=t";
const REDIRECT_DELAY_MS = 10000;
const REDIRECT_URL = "../index.html";

let warnbox = document.getElementById("warnbox");
let blurOverlay = document.getElementById("blur-overlay");
let warnsubtext = document.getElementById("warnsubtext");
let countdownEl = document.getElementById("countdown");
const insts = document.getElementById("instn");
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


const ls = localStorage.getItem("lcds?t=t");

if (!ls) {
    window.location.href = "../login.html?t=t";
} else {
    const lsData = JSON.parse(ls)?.data || {};

    const usernameEl = document.getElementById("username");
    const welcomeText = document.querySelector(".welcomeText");
    const classInChargeEl = document.getElementById("classInCharge");
    const subjectEl = document.getElementById("subject");

    const formattedSubject = lsData.subject 
        ? lsData.subject.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) 
        : '';

    if (usernameEl) usernameEl.innerText = lsData.name || '';
    if (welcomeText) welcomeText.innerHTML = `Welcome <span class="username">${lsData.name || ''}</span>.`;
    if (classInChargeEl) classInChargeEl.textContent = `${lsData.class?.grade || ''} ${lsData.class?.section || ''}`;
    if (subjectEl) subjectEl.textContent = formattedSubject;

    const logStyle = "color: white; font-family: Segoe UI;";
    console.log(`%cTeacher Name: ${lsData.name}`, logStyle);
    console.log(`%cSubject: ${lsData.subject}`, logStyle);
    console.log(`%cClass: ${lsData.class?.grade}-${lsData.class?.section}`, logStyle);
    console.log(`%cNumber of Students: ${lsData.class?.nstu}`, logStyle);
}