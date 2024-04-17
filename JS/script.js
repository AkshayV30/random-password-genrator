// alert("helo");

const btnGenrate = document.querySelector(".btn-genrate");
const outputValue = document.getElementById("genrated-pass");

const selectors = document.querySelectorAll(".selector");

let passLength = 4; // Could be 4, 6, 8, or 16
let includeNumbers = true; // Could be true or false
let includeLowerCaseAlphabets = false; // Could be true or false
let includeUpperCaseAlphabets = false; // Could be true or false
let includeSpecialChars = false; // Could be true or false

function updateOptions() {
  selectors.forEach((selector) => {
    if (selector.name === "length" && selector.checked) {
      passLength = parseInt(selector.dataset.length);
    } else if (selector.name === "numbers" && selector.checked) {
      includeNumbers = selector.dataset.include === "true";
    } else if (selector.name === "lowerCaseAlphabets" && selector.checked) {
      includeLowerCaseAlphabets = selector.dataset.include === "true";
    } else if (selector.name === "upperCaseAlphabets" && selector.checked) {
      includeUpperCaseAlphabets = selector.dataset.include === "true";
    } else if (selector.name === "special" && selector.checked) {
      includeSpecialChars = selector.dataset.include === "true";
    }
  });
}

function generateRandomPassword(
  length,
  includeNumbers,
  includeLowerCaseAlphabets,
  includeUpperCaseAlphabets,
  includeSpecialChars
) {
  let charset = "";
  let password = "";

  if (
    !includeNumbers &&
    !includeLowerCaseAlphabets &&
    !includeUpperCaseAlphabets &&
    !includeSpecialChars
  ) {
    return "Warning: Please select at least one option.";
  }

  if (includeNumbers) charset += "0123456789";

  if (includeLowerCaseAlphabets) charset += "abcdefghijklmnopqrstuvwxyz";

  if (includeUpperCaseAlphabets) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (includeSpecialChars) charset += "!@#$%^&*()-_";

  if (
    includeNumbers &&
    includeLowerCaseAlphabets &&
    includeUpperCaseAlphabets &&
    includeSpecialChars
  ) {
    // Ensure at least one character from each category
    password += charset[getRandomNumber(0, 9)]; // Add one number
    password += charset[getRandomNumber(10, 36)]; // Add one LowerCaseAlphabet
    password += charset[getRandomNumber(37, 61)]; // Add one UpperCaseAlphabet
    password += charset[getRandomNumber(62, charset.length - 1)]; // Add one special character
    length -= 3;
  }

  for (let i = 0; i <= length; i++) {
    let randomIndex = getRandomNumber(0, charset.length - 1);
    password += charset[randomIndex];
  }

  return password;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


selectors.forEach((selector) => {
  selector.addEventListener("change", updateOptions);
});

btnGenrate.addEventListener("click", () => {
  const generatedPassword = generateRandomPassword(
    passLength,
    includeNumbers,
    includeLowerCaseAlphabets,
    includeUpperCaseAlphabets,
    includeSpecialChars
  );
  console.log(generatedPassword);
  outputValue.textContent = generatedPassword;
  //intial values
  updateOptions();
});
