import Swiper from 'swiper';
import { addClass, addClassArray, resetClassArray, addListener } from './util';

const hero = document.querySelector('.hero');
const paginationsAll = Array.from(hero.querySelectorAll('.hero__pagination'));
const bulletsAll = hero.querySelectorAll('.hero__bullet');

new Swiper('.hero', {
  loop: true,
  watchSlidesProgress: true,
  slideActiveClass: 'hero__slide--active',
  autoHeight: true,
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
      paginationsAll.forEach((paginationSingleCopy) => {
        const bulletsSingleCopy = paginationSingleCopy.querySelectorAll('.hero__bullet');
        addClass(bulletsSingleCopy[0], 'hero__bullet--active');
        bulletsSingleCopy.forEach((bullet) => {
          bullet.setAttribute('aria-label', 'Переключите слайд');
          bullet.setAttribute('tabindex', '0');
        });
        for (let i = 0; i < bulletsSingleCopy.length; i++) {
          bulletsSingleCopy[i].dataset.id = i;
          const changeBullet = () => {
            const bulletsToActivate = hero.querySelectorAll(`[data-id="${i}"]`);
            resetClassArray(bulletsAll, 'hero__bullet--active');
            this.slideTo(i);
            addClassArray(bulletsToActivate, 'hero__bullet--active');
          };
          addListener(bulletsSingleCopy[i], 'click', changeBullet);
        }
      });
    },
    transitionEnd: function () {
      const slideIndex = document.querySelector('.hero__slide--active').getAttribute('data-swiper-slide-index');
      const bulletsToActivate = hero.querySelectorAll(`[data-id="${slideIndex}"]`);
      resetClassArray(bulletsAll, 'hero__bullet--active');
      addClassArray(bulletsToActivate, 'hero__bullet--active');
      // console.log('achtung');
    },
  },
});

