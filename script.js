document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for Navigation ---
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector(".header");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = header.offsetHeight;
        const elementPosition =
          targetSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // --- Highlight active nav link on scroll ---
  window.addEventListener("scroll", () => {
    let current = "";
    const headerHeight = header.offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 30;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Set initial active link on page load
  if (window.location.hash === "" || window.location.hash === "#home") {
    document
      .querySelector('.nav-links a[href="#home"]')
      .classList.add("active");
  }
});
