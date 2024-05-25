import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addClass, addClassArray, resetClassArray, addListener } from './util';
// import { addClass, removeClass, toggleClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown } from './util';

const hero = document.querySelector('.hero');
const paginations = Array.from(hero.querySelectorAll('.hero__pagination'));

new Swiper('.hero', {
// const swiper = new Swiper('.hero', {
  modules: [Pagination],
  loop: true,
  watchSlidesProgress: true,
  slideActiveClass: 'hero__slide--active',
  autoHeight: true,
  // pagination: {
  //   el: paginationActive,
  //   bulletActiveClass: 'hero__bullet--active',
  //   bulletClass: 'hero__bullet',
  //   type: 'bullets',
  //   bulletElement: 'div',
  //   clickable: true,
  // },
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
      paginations.forEach((elem) => {
        const bullets = elem.querySelectorAll('.hero__bullet');
        addClass(bullets[0], 'hero__bullet--active');
        bullets.forEach((bullet) => {
          bullet.setAttribute('aria-label', 'Переключите слайд');
          bullet.setAttribute('tabindex', '0');
        });
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].dataset.id = i;
          const changeBullet = () => {
            const bulletsAll = hero.querySelectorAll('.hero__bullet');
            const xxx = hero.querySelectorAll('[data-id="' + i + '"]');
            // console.log(xxx);
            resetClassArray(bulletsAll, 'hero__bullet--active');
            this.slideTo(i);
            addClassArray(xxx, 'hero__bullet--active');
          };
          addListener(bullets[i], 'click', changeBullet);
        }
      });
    },
  },
});
// accordId = +this.getAttribute('data-id');
