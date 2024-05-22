import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

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
