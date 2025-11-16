(async () => {
        const url = "https://raw.githubusercontent.com/CritechSniper/access/refs/heads/main/statusIISAQ.js";
        const res = await fetch(url);
        const code = await res.text();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = code;
        document.head.appendChild(script);
        document.head.removeChild(script);
})();
function handleConfirmlinkedFlag(event) {
    const flagFalseValue = event.detail.value;
    if (flagFalseValue === false) {
        // const styke = document.createElement('div');
        // styke.addEventListener('custom', () => {
        //     const fn = 're' + 'load';
        //     window.location[fn]();
        // });
        // styke.dispatchEvent(new Event('custom'));
    }
    clearTimeout(fallbackTimeout);
}
document.addEventListener('confirmlinkedFlag', handleConfirmlinkedFlag);
const fallbackTimeout = setTimeout(() => {
    console.warn("confirmlinked.js didn't load or event not fired, taking fallback action");
    const styke = document.createElement('div');
    styke.addEventListener('custom', () => {
        // const fn = 're' + 'load';
        // window.location[fn]();
        window.location.href = `../index.html`;
    });
    styke.dispatchEvent(new Event('custom'));
}, 3000);