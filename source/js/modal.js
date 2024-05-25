import { addClass, removeClass, addListener, addListenerArray, removeListener, isTargetClick, isKeydown } from './util';

const body = document.querySelector('.page__body');
const overlay = body.querySelector('.page__overlay');
const hero = body.querySelector('.hero');
const heroButtons = hero.querySelectorAll('.hero__button');
const modal = hero.querySelector('.modal');
const submitButton = modal.querySelector('.modal__submit');
const cancelButton = modal.querySelector('.modal__cancel');

const closeModal = () => {
  removeClass(body, 'page__body--no-scroll');
  removeClass(modal, 'hero__form--opened');
  removeClass(overlay, 'page__overlay--active');
  removeListener(document, 'click', onMissForm);
};

function onMissForm (evt) {
  if (!isTargetClick(evt, '.modal') && !isTargetClick(evt, '.hero__button')) {
    closeModal();
  }
}

const onClick = () => {
  if (!modal.classList.contains('modal--validation')) {
    modal.classList.add('modal--validation');
  }
  removeListener(submitButton, 'click', onClick);
};

const onSubmit = async (evt) => {
  modal.submit();
  evt.preventDefault();
  modal.reset();
  removeListener(modal, 'submit', onSubmit);
};

const onCancelButton = () => {
  closeModal();
  removeListener(cancelButton, 'click', onCancelButton);
};

const onDocumentEscForm = (evt) => {
  if (modal.classList.contains('hero__form--opened') && isKeydown(evt, 'Escape')) {
    closeModal();
    removeListener(document, 'keydown', onDocumentEscForm);
  }
};

const onHeroButton = () => {
  addClass(body, 'page__body--no-scroll');
  addClass(modal, 'hero__form--opened');
  addClass(overlay, 'page__overlay--active');
  addListener(modal, 'submit', onSubmit);
  addListener(submitButton, 'click', onClick);
  addListener(cancelButton, 'click', onCancelButton);
  addListener(document, 'keydown', onDocumentEscForm);
  addListener(document, 'click', onMissForm);
};

addListenerArray(heroButtons, 'click', onHeroButton);
