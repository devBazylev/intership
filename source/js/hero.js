import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const body = document.querySelector('.page__body');
const overlay = body.querySelector('.page__overlay');
const hero = body.querySelector('.hero');
const header = body.querySelector('.header');
const toggler = header.querySelector('.header__toggler');
const dropButtons = header.querySelectorAll('.header__button');
const heroButtons = hero.querySelectorAll('.hero__button');
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
    addClass(body, 'page__body--no-scroll');
    addClass(overlay, 'page__overlay--active');
    addListener(document, 'keydown', onDocumentEscNav);
    addListenerArray(dropButtons, 'click', onDropButton);
    addListener(document, 'click', onMissNav);
  } else {
    removeClass(body, 'page__body--no-scroll');
    removeClass(overlay, 'page__overlay--active');
    removeListener(document, 'keydown', onDocumentEscNav);
    removeListenerArray(dropButtons, 'click', onDropButton);
    removeListener(document, 'click', onMissNav);
  }
};

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
addListenerArray(heroButtons, 'click', onHeroButton);
