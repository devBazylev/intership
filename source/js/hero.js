import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const header = document.querySelector('.header');
const toggler = header.querySelector('.header__toggler');
const dropButtons = header.querySelectorAll('.header__button');
const overlay = document.querySelector('.page__overlay');

const onMissclick = (evt) => {
  if (!isTargetClick(evt, '.header__nav') && !isTargetClick(evt, '.header__toggler')) {
    removeClass(toggler, 'header__toggler--opened');
    removeClass(overlay, 'page__overlay--active');
  }
};

const onDocument = (evt) => {
  if (toggler.classList.contains('header__toggler--opened') && isKeydown(evt, 'Escape')) {
    evt.preventDefault();
    toggleClass(toggler, 'header__toggler--opened');
    removeClass(overlay, 'page__overlay--active');
    removeListener(document, 'keydown', onDocument);
  }
};

const onDropButton = function () {
  toggleClass(this, 'header__button--opened');
};

const onBurger = () => {
  toggleClass(toggler, 'header__toggler--opened');
  if (toggler.classList.contains('header__toggler--opened')) {
    addClass(overlay, 'page__overlay--active');
    addListener(document, 'keydown', onDocument);
    addListenerArray(dropButtons, 'click', onDropButton);
    addListener(document, 'click', onMissclick);
  } else {
    removeClass(overlay, 'page__overlay--active');
    removeListener(document, 'keydown', onDocument);
    removeListenerArray(dropButtons, 'click', onDropButton);
    removeListener(document, 'click', onMissclick);
  }
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
