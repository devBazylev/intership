import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const body = document.querySelector('.page__body');
const overlay = body.querySelector('.page__overlay');
const header = body.querySelector('.header');
const toggler = header.querySelector('.header__toggler');
const dropButtons = header.querySelectorAll('.header__button');

const onMissClick = (evt) => {
  if (!isTargetClick(evt, '.header__nav') && !isTargetClick(evt, '.header__toggler')) {
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

const onBurger = () => {
  toggleClass(toggler, 'header__toggler--opened');
  if (toggler.classList.contains('header__toggler--opened')) {
    addClass(body, 'page__body--no-scroll');
    addClass(overlay, 'page__overlay--active');
    addListener(document, 'keydown', onDocument);
    addListenerArray(dropButtons, 'click', onDropButton);
    addListener(document, 'click', onMissClick);
  } else {
    closeBurger();
  }
};

function closeBurger () {
  removeClass(body, 'page__body--no-scroll');
  removeClass(overlay, 'page__overlay--active');
  removeListener(document, 'click', onMissClick);
  removeListener(document, 'keydown', onDocument);
  removeListenerArray(dropButtons, 'click', onDropButton);
}

addListener(toggler, 'click', onBurger);
