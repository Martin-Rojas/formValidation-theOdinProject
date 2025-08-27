import "./styles.css";
//  Get values from the form
const form = document.getElementById(`form`);
const email = document.getElementById(`email`);
const country = document.getElementById(`country`);
const postalCode = document.getElementById(`postal-code`);
const password = document.getElementById(`password`);
const confirmPassword = document.getElementById(`confirm-password`);

// Validate each field value
const formInputs = [email, country, postalCode, password, confirmPassword];

email.addEventListener(`input`, () => {
  email.setCustomValidity(``);
  if (email.validity.typeMismatch) {
    email.classList.add(`invalid`);
    email.setCustomValidity("I am expecting an email address!");
  }

  if (email.validity.valueMissing) {
    email.classList.add(`invalid`);
    email.setCustomValidity("Can't leave blank");
  }
  // Trigger browser validation popup (and show our custom msg if invalid)
  if (email.reportValidity()) {
    return null; // stop if invalid
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    email.setCustomValidity("Can't leave blank");
    email.reportValidity();
    event.preventDefault();
  }
});
