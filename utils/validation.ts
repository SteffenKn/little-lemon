const letterRegex = /[a-zA-Z]/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateName(name: string): boolean {
  const nameIsEmpty = !name || name.trim().length === 0;
  if (nameIsEmpty) {
    return false;
  }

  const everyCharacterIsALetter = name.split('').every((character) => {
    return letterRegex.test(character);
  });

  return everyCharacterIsALetter;
}

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

export const Validator = {
  validateName,
  validateEmail,
};
