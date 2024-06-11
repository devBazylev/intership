import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Grid } from 'swiper/modules';
import { cloneSlides } from './util';

const news = document.querySelector('.news');
const slider = news.querySelector('.news__slider');
const slides = news.querySelectorAll('.news__slide');

const clones = [];

cloneSlides(slider, slides, clones);
cloneSlides(slider, slides, clones);

const swiper = new Swiper('.news__container', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Grid],
  init: false,
  autoplay: false,
  watchSlidesProgress: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  slideFullyVisibleClass: 'news__slide--full',
  slideActiveClass: 'news__slide--active',
  slideToClickedSlide: true,
  loopAddBlankSlides: false,
  loopAdditionalSlides: 0,
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
    dynamicMainBullets: 4,
    renderBullet: function (index, className) {
      return `<button class="${className}" type="button" tabindex="0" aria-label="Переключите группу слайдов.">${index + 1}</button>`;
    }
  },

  breakpoints: {
    320: {
      width: 290,
      slidesPerView: 1,
      spaceBetween: 15,
      grid: {
        rows: 2,
        fill:	'column',
      },
    },
    768: {
      width: 678,
      slidesPerView: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
        fill:	'column',
      },
    },
    1440: {
      width: 1240,
      slidesPerView: 3,
      // slidesPerView: 'auto',
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
  //   enabled: true,
  //   eventsTarget: '.programs__pagination',
  // }
});

swiper.init();
