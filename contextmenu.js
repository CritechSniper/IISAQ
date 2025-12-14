// contextmenu.js

// --- 1. CSS Styles as a string ---
const contextMenuCSS = `
.menu{
    width: auto;
    height: auto;
    background-color: var(--hover-clr);
    color: var(--secondary-text-clr);
    border: 1px solid var(--line-clr);
    /* box-shadow: 2px 2px 2px #999; */
    border-radius: 0.2rem;
    list-style: none;
    position: fixed;
    z-index: 1000;
}
.menu.off{
    top: -200%;
    left: -200%;
}
.menu-item{
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    /* font-weight: 500; */
    margin: 10px 10px;
    cursor: pointer;
}
.menu-item:hover,
.menu-item:active{
    color: var(--text-clr);
    /* font-weight: 500; */
} 
`;

// --- 2. Core Menu Logic ---
let menu = null;

// Function to inject CSS styles into the document
function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function(){
    // Inject the CSS first
    injectCSS(contextMenuCSS);
    
    // Select the menu element
    menu = document.querySelector('.menu');
    
    // Proceed only if the menu element is found
    if (menu) {
        // 1. Hide the menu initially
        menu.classList.add('off');
        
        // 2. Add the right click listener to the whole document
        document.addEventListener('contextmenu', showmenu);
        
        // 3. Disable context menu for elements with the 'noCon' class
        const noConElements = document.querySelectorAll('.noCon');
    
        noConElements.forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault(); // Stop the default browser menu
                hidemenu();         // Hide the custom menu
            });
        });          
        
        // 4. Add a listener for leaving the menu and hiding it
        menu.addEventListener('mouseleave', hidemenu);
        
        // 5. Add the listeners for the menu items
        addMenuListeners();
    }
});

function addMenuListeners(){
    const defText = document.getElementById('defText');
    if(defText) defText.addEventListener('click', hidemenu);

    const reload = document.getElementById('reload');
    if(reload) reload.addEventListener('click', ()=>{hidemenu();location.reload();});

    const stLog = document.getElementById('stLog');
    if(stLog) stLog.addEventListener('click', ()=>{hidemenu();window.location.href = `/login.html?t=s`;});

    const teLog = document.getElementById('teLog');
    if(teLog) teLog.addEventListener('click', ()=>{hidemenu();window.location.href = `/login.html?t=t`;});
}

function showmenu(ev){
    // Stop the real right click menu
    ev.preventDefault(); 
    
    if (menu) {
        // Show the custom menu at cursor position
        console.log( ev.clientX, ev.clientY );
        menu.style.top = `${ev.clientY}px`;
        menu.style.left = `${ev.clientX}px`;
        menu.classList.remove('off');
    }
}

function hidemenu(ev){
    if (menu) {
        menu.classList.add('off');
        menu.style.top = '-200%'; 
        menu.style.left = '-200%';
    }
}