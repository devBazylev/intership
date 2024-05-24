import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const header = document.querySelector('.header');
const toggler = header.querySelector('.header__toggler');
const dropButtons = header.querySelectorAll('.header__button');
const overlay = document.querySelector('.page__overlay');
const hero = document.querySelector('.hero');
const heroButton = hero.querySelector('.hero__button');
const modal = hero.querySelector('.modal');
const submitButton = modal.querySelector('.modal__submit');
const cancelButton = modal.querySelector('.modal__cancel');

const onMissNav = (evt) => {
  if (!isTargetClick(evt, '.header__nav') && !isTargetClick(evt, '.header__toggler')) {
    removeClass(toggler, 'header__toggler--opened');
    removeClass(overlay, 'page__overlay--active');
  }
};

const onDocumentEscNav = (evt) => {
  if (toggler.classList.contains('header__toggler--opened') && isKeydown(evt, 'Escape')) {
    evt.preventDefault();
    toggleClass(toggler, 'header__toggler--opened');
    removeClass(overlay, 'page__overlay--active');
    removeListener(document, 'keydown', onDocumentEscNav);
  }
};

const onDropButton = function () {
  toggleClass(this, 'header__button--opened');
};

const onBurger = () => {
  toggleClass(toggler, 'header__toggler--opened');
  if (toggler.classList.contains('header__toggler--opened')) {
    addClass(overlay, 'page__overlay--active');
    addListener(document, 'keydown', onDocumentEscNav);
    addListenerArray(dropButtons, 'click', onDropButton);
    addListener(document, 'click', onMissNav);
  } else {
    removeClass(overlay, 'page__overlay--active');
    removeListener(document, 'keydown', onDocumentEscNav);
    removeListenerArray(dropButtons, 'click', onDropButton);
    removeListener(document, 'click', onMissNav);
  }
};

const closeModal = () => {
  removeClass(modal, 'hero__form--opened');
  removeClass(overlay, 'page__overlay--active');
};

const onSubmitButton = () => {
  closeModal();
  removeListener(submitButton, 'click', onSubmitButton);
};

const onCancelButton = () => {
  closeModal();
  removeListener(cancelButton, 'click', onCancelButton);
};

const onDocumentEscForm = (evt) => {
  if (modal.classList.contains('hero__form--opened') && isKeydown(evt, 'Escape')) {
    evt.preventDefault();
    closeModal();
    removeListener(document, 'keydown', onDocumentEscForm);
  }
};

const onMissForm = (evt) => {
  if (!isTargetClick(evt, '.modal') && !isTargetClick(evt, '.hero__button')) {
    closeModal();
  }
};

const onHeroButton = () => {
  addClass(modal, 'hero__form--opened');
  addClass(overlay, 'page__overlay--active');
  addListener(submitButton, 'click', onSubmitButton);
  addListener(cancelButton, 'click', onCancelButton);
  addListener(document, 'keydown', onDocumentEscForm);
  addListener(document, 'click', onMissForm);
};

new Swiper('.hero', {
  modules: [Pagination],
  loop: true,
  watchSlidesProgress: true,
  slideActiveClass: 'hero__slide--active',
  autoHeight: true,
  pagination: {
    el: '.hero__slide--active .hero__pagination',
    bulletActiveClass: 'hero__bullet--active',
    bulletClass: 'hero__bullet',
    type: 'bullets',
    bulletElement: 'div',
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 0,
    },
    768: {
      spaceBetween: 10,
    },
    1440: {
      simulateTouch: false,
    },
  }
});

const bullets = document.querySelectorAll('.hero__bullet');
bullets.forEach((bullet) => {
  bullet.setAttribute('aria-label', 'Переключите слайд');
  bullet.setAttribute('tabindex', '0');
});

addListener(toggler, 'click', onBurger);
addListener(heroButton, 'click', onHeroButton);
