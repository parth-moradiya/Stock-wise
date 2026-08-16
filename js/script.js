// StockWise Retail Solutions - shared site script
// handles: mobile nav toggle, gallery lightbox, contact form validation

// ---------- mobile nav toggle ----------

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // close the menu after a link is clicked (useful on mobile)
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- gallery lightbox ----------

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox-overlay");

if (galleryItems.length > 0 && lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector("figcaption");
      lightboxImg.src = img.getAttribute("data-large") || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : "";
      lightbox.classList.add("active");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeLightbox);

  // click outside the image box closes it
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // escape key closes it
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

// ---------- contact form validation ----------

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const errorSummary = document.querySelector("#error-summary");
  const successBox = document.querySelector("#success-box");

  const fields = [
    { input: contactForm.querySelector("#full-name"), message: "Please enter your full name." },
    { input: contactForm.querySelector("#email"), message: "Please enter a valid email address." },
    { input: contactForm.querySelector("#phone"), message: "Please enter a valid phone number." },
    { input: contactForm.querySelector("#reason"), message: "Please choose a reason for contacting us." },
    { input: contactForm.querySelector("#message"), message: "Message must be at least 10 characters long." },
  ];

  const showFieldError = (field) => {
    const group = field.input.closest(".form-group");
    group.classList.add("invalid");
  };

  const clearFieldError = (field) => {
    const group = field.input.closest(".form-group");
    group.classList.remove("invalid");
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    const problems = [];

    fields.forEach((field) => {
      if (!field.input.checkValidity()) {
        allValid = false;
        showFieldError(field);
        problems.push(field.message);
      } else {
        clearFieldError(field);
      }
    });

    if (!allValid) {
      errorSummary.innerHTML = "<strong>Please fix the following:</strong><ul>" +
        problems.map((p) => `<li>${p}</li>`).join("") +
        "</ul>";
      errorSummary.classList.add("show");
      successBox.classList.remove("show");
      return;
    }

    // everything checks out
    errorSummary.classList.remove("show");
    successBox.textContent = "Thank you, your message has been sent. Our team will get back to you soon.";
    successBox.classList.add("show");
    contactForm.reset();
  });

  // clear the red error state as the user starts fixing a field
  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      if (field.input.checkValidity()) {
        clearFieldError(field);
      }
    });
  });
}
