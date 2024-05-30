import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Grid } from 'swiper/modules';
import { cloneSlides } from './util';
// import { setDataId, addClass, addClassArray, resetClassArray, addListener, isKeydown } from './util';

const news = document.querySelector('.news');
const slider = news.querySelector('.news__slider');
const slides = news.querySelectorAll('.news__slide');

const clones = [];

cloneSlides(slider, slides, clones);

new Swiper('.news', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Grid],
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
    dynamicBullets: true,
    renderBullet: function (index, className) {
      // return `<span class="${className}"> + ${index} + </span>`;
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  },
  grid: {
    rows: 2,
    fill:	'column',
  },
  breakpoints: {
    320: {
      autoHeight: true,
      spaceBetween: 15,
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
