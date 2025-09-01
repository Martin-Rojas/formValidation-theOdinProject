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

// reset custom message and remove class "invalid"
function resetInput(input) {
  input.setCustomValidity(``);
  input.classList.remove(`invalid`);
}

// Validate email
email.addEventListener(`input`, () => {
  resetInput(email);

  if (email.validity.typeMismatch) {
    email.classList.add(`invalid`);
    email.setCustomValidity("I am expecting an email address!");
  } else if (email.validity.valueMissing) {
    email.classList.add(`invalid`);
    email.setCustomValidity("Email can't leave blank");
  }
  // Trigger browser validation popup (and show our custom msg if invalid)
  if (!email.reportValidity()) {
    return null; // stop if invalid
  }
});

// Validate country
country.addEventListener(`input`, () => {
  resetInput(country);

  // Regex: only letters and spaces
  const regex = /^[A-Za-z\s]+$/;

  if (country.validity.valueMissing) {
    country.classList.add(`invalid`);
    country.setCustomValidity("Country is required!");
  } else if (!regex.test(country.value)) {
    country.setCustomValidity("Country can only contain letters and spaces.");
    country.classList.add("invalid");
  }

  // Trigger browser validation popup (and show our custom msg if invalid)
  if (!country.reportValidity()) {
    return null; // stop if invalid
  }
});

// validate postal code
postalCode.addEventListener(`input`, () => {
  resetInput(postalCode);

  const onlyNumberRegex = /^\d{5}(-\d{4})?$/;

  if (postalCode.validity.valueMissing) {
    postalCode.classList.add(`invalid`);
    postalCode.setCustomValidity("Postal Code is required!");
  } else if (!onlyNumberRegex.test(postalCode.value)) {
    postalCode.setCustomValidity("Postal code examples 12345, 12345-6789.");
    postalCode.classList.add("invalid");
  }

  // Trigger browser validation popup (and show our custom msg if invalid)
  if (!postalCode.reportValidity()) {
    return null; // stop if invalid
  }
});
// Validate the password
password.addEventListener(`input`, () => {
  resetInput(password);

  // rule one regx at least 8 chars, 1 letter, 1 number
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (password.validity.valueMissing) {
    password.setCustomValidity("Password is required!");
    password.classList.add("invalid");
  } else if (!strongPasswordRegex.test(password.value)) {
    password.setCustomValidity(
      "Password must be at least 8 characters, include a letter and a number."
    );
    password.classList.add("invalid");
  }

  // Trigger browser validation popup (and show our custom msg if invalid)
  if (!password.reportValidity()) {
    return null; // stop if invalid
  }
});

// validate consfirm password
confirmPassword.addEventListener(`input`, () => {
  resetInput(confirmPassword);

  if (confirmPassword.validity.valueMissing) {
    confirmPassword.setCustomValidity("Please confirm your password!");
    confirmPassword.classList.add("invalid");
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Passwords do not match!");
    confirmPassword.classList.add("invalid");
  }

  // Trigger browser validation popup (and show our custom msg if invalid)
  if (!confirmPassword.reportValidity()) {
    return null; // stop if invalid
  }
});

/* Validate the field after click the submit btn
   if one of the fields is invalid it will throw an error message to 
   the user*/
form.addEventListener("submit", (event) => {
  let isValid = true;
  if (!email.validity.valid) {
    email.setCustomValidity("Email can't leave blank");
    email.reportValidity();
    isValid = false;
    event.preventDefault();
    return;
  }
  if (!country.validity.valid) {
    country.setCustomValidity("Country can't leave blank");
    country.reportValidity();
    isValid = false;
    event.preventDefault();
    return;
  }
  if (!postalCode.validity.valid) {
    postalCode.setCustomValidity(`Postal code can't be blank`);
    postalCode.reportValidity();
    isValid = false;
    event.preventDefault();
    return;
  }

  if (!password.validity.valid) {
    password.setCustomValidity(`Pasword can't be blank`);
    password.reportValidity();
    isValid = false;
    event.preventDefault();
    return;
  }

  if (!confirmPassword.validity.valid) {
    confirmPassword.setCustomValidity(`Confirm password  can't be blank`);
    confirmPassword.reportValidity();
    isValid = false;
    event.preventDefault();
    return;
  }
});
