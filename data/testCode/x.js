document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  const p = document.createElement("p");
  p.textContent = "This is a dynamically added paragraph.";
  root.appendChild(p);
});
