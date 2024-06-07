import { addClass, addListener, removeListener, isKeydown } from './util';

const form = document.querySelector('.form__template');
const submitButton = form.querySelector('.form__submit');
const checkboxInvisible = form.querySelector('.form__checkbox');
const checkboxBackup = form.querySelector('.form__check');

const onSubmit = async (evt) => {
  form.submit();
  evt.preventDefault();
  form.reset();
};

const onClick = () => {
  if (!form.classList.contains('form__template--validation')) {
    addClass(form, 'form__template--validation');
  }
  removeListener(submitButton, 'click', onClick);
  addListener(form, 'submit', onSubmit);
};

const clickCheckbox = (evt) => {
  if (isKeydown(evt, ' ')) {
    checkboxInvisible.click();
  }
};

const onCheckbox = (evt) => {
  clickCheckbox(evt);
};

addListener(submitButton, 'click', onClick);
addListener(checkboxBackup, 'keydown', onCheckbox);
