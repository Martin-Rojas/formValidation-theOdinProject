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
function validateField(field, message, event) {
  if (!field.validity.valid) {
    field.setCustomValidity(message);
    field.reportValidity();
    event.preventDefault(); // stops form submission
    return false; // this field is invalid
  }
  return true; // this field passed
}

form.addEventListener("submit", (event) => {
  if (!validateField(email, "Email can't leave blank", event)) {
    return; // stop here if email invalid
  }
  if (!validateField(country, "Country can't leave blank", event)) {
    return; // stop here if country invalid
  }
  if (!validateField(postalCode, "Postal code can't leave blank", event)) {
    return; // stop here if postal code invalid
  }
  if (!validateField(password, "Password can't leave blank", event)) {
    return; // stop here if password invalid
  }
  if (
    !validateField(confirmPassword, "Confirm password can't leave blank", event)
  ) {
    return; // stop here if confirm password invalid
  }
});
