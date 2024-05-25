import Swiper from 'swiper';
import { addClass, addClassArray, resetClassArray, addListener } from './util';

const hero = document.querySelector('.hero');
const paginations = Array.from(hero.querySelectorAll('.hero__pagination'));

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
            const bulletsToActivate = hero.querySelectorAll(`[data-id="${i}"]`);
            resetClassArray(bulletsAll, 'hero__bullet--active');
            this.slideTo(i);
            addClassArray(bulletsToActivate, 'hero__bullet--active');
          };
          addListener(bullets[i], 'click', changeBullet);
        }
      });
    },
  },
});
// accordId = +this.getAttribute('data-id');
