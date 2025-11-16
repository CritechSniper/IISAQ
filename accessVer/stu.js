var stuA = localStorage.getItem("stuA")
let warnbox = document.getElementById("warnbox")
let warnsubtext = document.getElementById("warnsubtext")
if (stuA == true) {
    warnbox.style.display = "block"
    setTimeout(() => {
        warnbox.style.display = "none"
        window.location.href = "../index.html"
    }, 10000);
}