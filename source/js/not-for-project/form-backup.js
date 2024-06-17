const form = document.querySelector('.form');
const inputMail = form.querySelector('.form__mail');
const inputTel = form.querySelector('.form__tel');
const submitButton = form.querySelector('.form__button');

const MAX_LETTERS_COUNT = 50;

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const validateNumbers = (phone) => {
  const reg = /^[^a-zа-яё]*$/i;
  return reg.test(String(phone));
};

const validateLetters = (mail) => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(String(mail));
};

const validateTel = (evt) => {
  const telValue = inputTel.value;

  if (!validateNumbers(telValue)) {
    evt.preventDefault();
    inputTel.classList.add('form__tel--error');
  }
  if (telValue.length > MAX_LETTERS_COUNT) {
    evt.preventDefault();
    inputTel.classList.add('form__tel--error');
  }
  if (telValue.length === 0) {
    evt.preventDefault();
    inputTel.classList.add('form__tel--error');
  }
};

const validateMail = (evt) => {
  const mailValue = inputMail.value;

  if (!validateLetters(mailValue)) {
    evt.preventDefault();
    inputMail.classList.add('form__mail--error');
  }
  if (mailValue.length > MAX_LETTERS_COUNT) {
    evt.preventDefault();
    inputMail.classList.add('form__mail--error');
  }
  if (mailValue.length === 0) {
    evt.preventDefault();
    inputMail.classList.add('form__mail--error');
  }
};

const onSubmit = async (evt) => {
  if (inputTel.classList.contains('form__tel--error')) {
    inputTel.classList.remove('form__tel--error');
  }
  if (inputMail.classList.contains('form__mail--error')) {
    inputMail.classList.remove('form__mail--error');
  }
  toggleSubmitButton(true);
  validateTel(evt);
  validateMail(evt);
  setTimeout(() => {
    toggleSubmitButton(false);
  }, 1000);
};

form.addEventListener('submit', onSubmit);
