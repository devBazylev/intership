import Swiper from 'swiper';
import { setDataId, addClass, addClassArray, resetClassArray, addListener, isKeydown } from './util';

const hero = document.querySelector('.hero');
const paginationsAll = Array.from(hero.querySelectorAll('.hero__pagination'));

const createBullets = () => {
  paginationsAll.forEach((pagination) => {
    const fragmentBullets = document.createDocumentFragment();
    for (let i = 0; i < paginationsAll.length; i++) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('tabindex', '0');
      newDiv.setAttribute('aria-label', 'Переключите слайд');
      addClass(newDiv, 'hero__bullet');
      fragmentBullets.appendChild(newDiv);
    }
    pagination.append(fragmentBullets);
    addClass(pagination.children[0], 'hero__bullet--active');
  });
};

createBullets();

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
      paginationsAll.forEach((pagination) => {
        const bullets = pagination.querySelectorAll('.hero__bullet');
        setDataId(bullets);
        for (let i = 0; i < bullets.length; i++) {
          const onBulletClick = () => {
            this.slideTo(i);
          };
          const onBulletKey = (evt) => {
            if (isKeydown(evt, 'Enter')) {
              this.slideTo(i);
            }
          };
          addListener(bullets[i], 'click', onBulletClick);
          addListener(bullets[i], 'keydown', onBulletKey);
        }
      });
    },
    transitionEnd: function () {
      const bulletsAll = hero.querySelectorAll('.hero__bullet');
      const slideIndex = document.querySelector('.hero__slide--active').getAttribute('data-swiper-slide-index');
      const bulletsToActivate = hero.querySelectorAll(`[data-id="${slideIndex}"]`);
      resetClassArray(bulletsAll, 'hero__bullet--active');
      addClassArray(bulletsToActivate, 'hero__bullet--active');
    },
  },
});
