import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Grid } from 'swiper/modules';
import { cloneSlides } from './util';
// import { setDataId, addClass, addClassArray, resetClassArray, addListener, isKeydown } from './util';

const news = document.querySelector('.news');
const slider = news.querySelector('.news__slider');
const slides = news.querySelectorAll('.news__slide');

const clones = [];

cloneSlides(slider, slides, clones);
// cloneSlides(slider, slides, clones);

new Swiper('.news', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Grid],
  init: true,
  autoplay: false,
  watchSlidesProgress: true,
  observer: true,
  slideActiveClass: 'news__slide--active',
  slideToClickedSlide: true,
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
      return `<button class="${className}" type="button" tabindex="0" aria-label="Переключите группу слайдов.">${index + 1}</button>`;
      // return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  },
  // grid: {
  //   rows: 2,
  //   fill:	'column',
  // },
  breakpoints: {
    320: {
      // autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 15,
      grid: {
        rows: 2,
      },
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
  // mousewheel: {
  //   sensitivity: 1,
  //   eventsTarget: '.news',
  // }
});


