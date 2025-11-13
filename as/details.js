document.addEventListener("DOMContentLoaded", () => {
  const idElem = document.getElementById("aID");
  const headElem = document.getElementById("aHead");
  const dueElem = document.getElementById("aDue");
  const startBtn = document.getElementById("aStart");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    idElem.textContent = `Assignment ID: ${id}`;
    headElem.textContent = `Assignment #${id}`;
    dueElem.textContent = `Due date: (coming soon)`;
    startBtn.textContent = `Start Assignment`;

    startBtn.addEventListener("click", () => {
      const name = prompt("Enter your name:");
      if (!name) return alert("Name is required to start.");

      const dob = prompt("Enter your date of birth (YYYY-MM-DD):");
      if (!dob) return alert("DOB is required to start.");

      const teacher = prompt("Enter your teacher’s name:");
      if (!teacher) return alert("Teacher name is required to start.");

      // encodeURIComponent ensures safe URL values
      const url = `start.html?id=${id}&name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}&teacher=${encodeURIComponent(teacher)}`;
      window.location.href = url;
    });

  } else {
    idElem.textContent = "No assignment ID provided.";
    headElem.textContent = "Unknown Assignment";
    dueElem.textContent = "No details available.";
    startBtn.style.display = "none";
  }
});
