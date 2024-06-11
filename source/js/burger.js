import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTarget, isKeydown } from './util';

const body = document.querySelector('.page__body');
const header = body.querySelector('.header');
const toggler = header.querySelector('.header__toggler');
const dropButtons = header.querySelectorAll('.header__button');

const onMissClick = (evt) => {
  if (!isTarget(evt, '.header__nav') && !isTarget(evt, '.header__toggler')) {
    removeClass(toggler, 'header__toggler--opened');
    closeBurger();
  }
};

const onDocument = (evt) => {
  if (toggler.classList.contains('header__toggler--opened') && isKeydown(evt, 'Escape')) {
    toggleClass(toggler, 'header__toggler--opened');
    closeBurger();
  }
};

const onDropButton = function () {
  toggleClass(this, 'header__button--opened');
};

const onDocumentFocus = (evt) => {
  if (!isTarget(evt, '.header__nav') && !isTarget(evt, '.header__toggler')) {
    closeBurger();
    toggleClass(toggler, 'header__toggler--opened');
  }
};

const onBurger = () => {
  toggleClass(toggler, 'header__toggler--opened');
  if (toggler.classList.contains('header__toggler--opened')) {
    addClass(body, 'page__body--no-scroll');
    addClass(body, 'page__overlay');
    addListener(document, 'click', onMissClick);
    addListener(document, 'keydown', onDocument);
    addListener(document, 'focusin', onDocumentFocus);
    addListenerArray(dropButtons, 'click', onDropButton);
  } else {
    closeBurger();
  }
};

function closeBurger () {
  removeClass(body, 'page__body--no-scroll');
  removeClass(body, 'page__overlay');
  removeListener(document, 'click', onMissClick);
  removeListener(document, 'keydown', onDocument);
  removeListener(document, 'focusin', onDocumentFocus);
  removeListenerArray(dropButtons, 'click', onDropButton);
}

addListener(toggler, 'click', onBurger);
