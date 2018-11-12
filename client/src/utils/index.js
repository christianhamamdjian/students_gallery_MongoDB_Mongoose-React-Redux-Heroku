export function validate(firstName, lastName) {
  return {
    firstName:
      firstName.length < 2 || /^[a-zäöA-ZÄÖ]+$/.test(firstName) === false,
    lastName: lastName.length < 2 || /^[a-zäöA-ZÄÖ]+$/.test(lastName) === false
  };
}
