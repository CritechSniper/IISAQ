function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggle-btn");

  if (!sidebar || !toggleButton) {
    console.error("Sidebar or toggle button not found!");
    return;
  }

  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-btn");
  if (toggleButton) {
    toggleButton.onclick = toggleSidebar;
  }
});
['contextmenu', 'selectstart', 'dragstart'].forEach(e => document.addEventListener(e, x => x.preventDefault()));
const loader = document.getElementById('welcomeLoader');

if (loader) {
  loader.addEventListener('click', () => {
      loader.classList.add('exit');
      
      setTimeout(() => {
          loader.remove();
      }, 600);
  });
}
const usernames = document.querySelectorAll('.username');
const nameRegex = /\b(muhammed|mohammed|muhammad|mohammad)\b/gi;
usernames.forEach(element => {
  element.textContent = element.textContent.replace(nameRegex, 'M.');
});