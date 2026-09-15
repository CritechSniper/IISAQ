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


const ls = localStorage.getItem("lcds?t=t")
const lsData = JSON.parse(ls)
if (!ls) { window.location.href = "../login.html?t=t" }
const username = lsData.data.name
document.getElementById("username").innerText = `${username}`
document.querySelector(".welcomeText").innerHTML = `Welcome <span class="username">${username}</span>.`
console.log(ls)

document.getElementById("classInCharge").textContent = `${lsData.data.class.grade} ${lsData.data.class.section}`;;
document.getElementById("subject").textContent = lsData.data.subject.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()); // this for the capialization


console.log(`%c${lsData.data.subject}`, "color:red; font-family:Segoe UI");
console.log(`%c${lsData.data.subject}`, "color:red; font-family:Segoe UI");