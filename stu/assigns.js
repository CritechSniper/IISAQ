document.addEventListener("DOMContentLoaded", () => {
  // div click
  document.querySelectorAll(".assignsdiv").forEach(div => {
    div.addEventListener("click", () => {
      const id = div.dataset.id;
      window.location.href = `/as/details.html?id=${id}`;
    });
  });

  // start btn
  document.querySelectorAll(".sb").forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = button.dataset.id;
      window.location.href = `/as/start.html?id=${id}`;
    });
  });
});
