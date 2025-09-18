document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("partials/header.html")
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;

        // Highlight active page
        const currentPage = window.location.pathname.split("/").pop();
        const links = headerContainer.querySelectorAll(".nav-item");
        links.forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });

        // Attach header toggle JS
        const toggleBtn = headerContainer.querySelector("#header-toggle");
        const siteHeader = headerContainer.querySelector(".site-header");
        if (toggleBtn && siteHeader) {
          toggleBtn.addEventListener("click", () => {
            siteHeader.classList.toggle("hidden");
          });
        }
      });
  }
});
