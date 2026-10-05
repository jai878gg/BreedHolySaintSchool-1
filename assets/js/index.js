// Small shared interactions for the static school website.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Keep search useful without a server by taking visitors to the matching page.
  const searchRoutes = [
    { terms: ["about", "history", "vision", "mission", "principal", "values"], url: "about.html" },
    { terms: ["academic", "class", "grade", "curriculum", "subject", "facility", "library", "lab", "playground", "teaching"], url: "academics.html" },
    { terms: ["gallery", "achievement", "sports", "event", "photos", "activities", "award"], url: "gallery.html" },
    { terms: ["admission", "apply", "contact", "phone", "email", "address", "enquiry", "enquiry"], url: "admissions.html" }
  ];

  document.querySelectorAll("[data-site-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = form.querySelector('input[type="search"]').value.trim().toLowerCase();
      if (!query) return;

      const route = searchRoutes.find((item) => item.terms.some((term) => query.includes(term)));
      window.location.href = route ? route.url : "index.html";
    });
  });

  document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.galleryFilter;
      document.querySelectorAll("[data-gallery-filter]").forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.hidden = category !== "all" && item.dataset.category !== category;
      });
    });
  });

  const enquiryForm = document.querySelector("#enquiry-form");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      enquiryForm.classList.add("was-validated");

      if (!enquiryForm.checkValidity()) {
        enquiryForm.querySelector(":invalid")?.focus();
        return;
      }

      const notice = enquiryForm.querySelector("[data-form-notice]");
      notice.textContent = "Thank you. Your details are ready, but this demo form does not transmit them. Please contact the school directly to submit your enquiry.";
      notice.hidden = false;
      enquiryForm.reset();
      enquiryForm.classList.remove("was-validated");
    });
  }
});
