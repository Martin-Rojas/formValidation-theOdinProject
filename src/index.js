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

// Validate email
email.addEventListener(`input`, () => {
  email.setCustomValidity(``);
  email.classList.remove(`invalid`);

  if (email.validity.typeMismatch) {
    email.classList.add(`invalid`);
    email.setCustomValidity("I am expecting an email address!");
  } else if (email.validity.valueMissing) {
    email.classList.add(`invalid`);
    email.setCustomValidity("Can't leave blank");
  }
  // Trigger browser validation popup (and show our custom msg if invalid)
  if (email.reportValidity()) {
    return null; // stop if invalid
  }
});

// Validate country
country.addEventListener(`input`, () => {
  country.setCustomValidity(``);
  country.classList.remove(`invalid`);

  // Regex: only letters and spaces
  const regex = /^[A-Za-z\s]+$/;

  if (country.validity.valueMissing) {
    country.classList.add(`invalid`);
    country.setCustomValidity("Country is required!");
  } else if (!regex.test(country.value)) {
    country.setCustomValidity("Country can only contain letters and spaces.");
    country.classList.add("invalid");
  }

  country.reportValidity();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!email.validity.valid) {
    email.setCustomValidity("Can't leave blank");
    email.reportValidity();
    return;
  }
  if (!country.validity.valid) {
    country.setCustomValidity("Can't leave blank");
    country.reportValidity();
    return;
  }
});
