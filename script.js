/* =========================================
   Brew & Bean — small interactive behaviors
   ========================================= */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const sections = document.querySelectorAll("main section[id]");

/* Open and close the mobile navigation menu */
function setMenuOpen(isOpen) {
  navMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => {
  const isOpen = !navMenu.classList.contains("open");
  setMenuOpen(isOpen);
});

/* Close the mobile menu after a nav link is clicked */
navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

/* Highlight the nav item that matches the section currently in view */
function updateActiveLink() {
  const scrollPosition = window.scrollY + 120;
  let currentId = "home";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

/* Simple front-end form check. This demo does not send data to a server. */
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  formStatus.classList.remove("success", "error");

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields before sending.";
    formStatus.classList.add("error");
    return;
  }

  if (!emailLooksValid) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = `Thanks, ${name}! We received your message and will be in touch soon.`;
  formStatus.classList.add("success");
  contactForm.reset();
});
