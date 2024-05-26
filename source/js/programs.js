import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import { setDataId, addClass, addClassArray, resetClassArray, addListener, isKeydown } from './util';

new Swiper('.programs', {
  modules: [Navigation, Pagination, Scrollbar],
  watchSlidesProgress: true,
  slideActiveClass: 'programs__slide--active',
  navigation: {
    prevEl: '.programs__button--prev',
    nextEl: '.programs__button--next',
  },
  pagination: {
    el: '.programs__pagination',
    bulletActiveClass: 'programs__bullet--active',
    bulletClass: 'programs__bullet',
    type: 'bullets',
    bulletElement: 'div',
    clickable: true,
  },
  breakpoints: {
    320: {
      autoHeight: true,
      spaceBetween: 15,
      slidesPerView: 1,
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    1440: {
      spaceBetween: 32,
      slidesPerView: 3,
      slidesPerGroup: 1,
      simulateTouch: false,
    },
  },
  // on: {

  // },
});
