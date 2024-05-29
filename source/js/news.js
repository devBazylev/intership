import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation } from 'swiper/modules';
// import { setDataId, addClass, addClassArray, resetClassArray, addListener, isKeydown } from './util';

new Swiper('.news', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation],
  init: true,
  autoplay: false,
  watchSlidesProgress: true,
  observer: true,
  slideActiveClass: 'news__slide--active',
  loopAddBlankSlides: false,
  loopAdditionalSlides: 0,
  observeParents: true,
  resizeObserver: true,
  updateOnWindowResize: true,
  navigation: {
    prevEl: '.news__button--prev',
    nextEl: '.news__button--next',
  },
  pagination: {
    el: '.news__pagination',
    bulletActiveClass: 'news__bullet--active',
    bulletClass: 'news__bullet',
    type: 'bullets',
    bulletElement: 'div',
    clickable: true,
  },
  breakpoints: {
    320: {
      autoHeight: true,

    },
    768: {
      spaceBetween: 30,

    },
    1440: {
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
});
