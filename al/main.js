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