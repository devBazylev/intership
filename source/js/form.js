import { addClass, addListener, removeListener } from './util';

const form = document.querySelector('.form__template');
const submitButton = form.querySelector('.form__submit');

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

addListener(submitButton, 'click', onClick);
