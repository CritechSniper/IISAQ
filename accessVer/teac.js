var teacA = localStorage.getItem("teacA")
let warnbox = document.getElementById("warnbox")
let warnsubtext = document.getElementById("warnsubtext")
if (teacA == true) {
    warnbox.style.display = "block"
    setTimeout(() => {
        warnbox.style.display = "none"
        window.location.href = "../index.html"
    }, 10000);
}