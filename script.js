document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-links a");

  // --- Theme Toggle Functionality ---
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === "dark-theme") {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  } else {
    // Default to light theme if no preference is found
    body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark-theme");
    }
  });

  // --- Smooth Scrolling for Navigation ---
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = document.querySelector(".header").offsetHeight;
        const elementPosition =
          targetSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- Highlight active nav link on scroll ---
  const sections = document.querySelectorAll("section");
  const headerHeight = document.querySelector(".header").offsetHeight;

  window.addEventListener("scroll", () => {
    let current = "";
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

  if (window.location.hash === "" || window.location.hash === "#home") {
    document
      .querySelector('.nav-links a[href="#home"]')
      .classList.add("active");
  }
});
