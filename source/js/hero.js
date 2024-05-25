import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
// import { resetClassArray } from './util';
// import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const paginations = document.querySelectorAll('.hero__pagination');
let pagId = 2;

const paginationActive = paginations[pagId];

new Swiper('.hero', {
// const swiper = new Swiper('.hero', {
  modules: [Pagination],
  loop: true,
  watchSlidesProgress: true,
  slideActiveClass: 'hero__slide--active',
  autoHeight: true,
  pagination: {
    el: paginationActive,
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
  },
  on: {
    init: function () {
      const bullets = document.querySelectorAll('.hero__bullet');
      bullets.forEach((bullet) => {
        bullet.setAttribute('aria-label', 'Переключите слайд');
        bullet.setAttribute('tabindex', '0');
      });
      // this.slideTo(1);
    },
    // slideChange: function () {
    //   pagId = this.clickedIndex;
    //   console.log(this.clickedIndex);
    // },
  },
});
