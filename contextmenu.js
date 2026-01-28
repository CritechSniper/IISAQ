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

let menu = null;

function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function(){
    injectCSS(contextMenuCSS);
    
    menu = document.querySelector('.menu');
    
    if (menu) {
        menu.classList.add('off');
        
        document.addEventListener('contextmenu', showmenu);
        
        const noConElements = document.querySelectorAll('.noCon');
    
        noConElements.forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault(); 
                hidemenu();
            });
        });          
        
        menu.addEventListener('mouseleave', hidemenu);
        
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
    ev.preventDefault(); 
    
    if (menu) {
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