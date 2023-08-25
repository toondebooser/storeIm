const validationResponse = (valid, userInput) => {
  if (valid) {
    return false;
  } else {
    if (userInput == "") return false;
    return true;
  }
};
const regex = {
  letters: /^[A-Za-z ]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
};
const validateInput = (patternType, userInput) => {
  const regexPattern = regex[patternType];
  const validation = regexPattern.test(userInput);
  return validation;
};

export default function Validation(patternType, userInput) {
  const valid = validateInput(patternType, userInput);
  return validationResponse(valid, userInput);
}
