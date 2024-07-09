import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Autoplay } from 'swiper/modules';
import { cloneSlides, isDesk } from './util';

const reviews = document.querySelector('.reviews');
const slider = reviews.querySelector('.reviews__slider');
const slides = reviews.querySelectorAll('.reviews__slide');

const clones = [];

const swiper = new Swiper('.reviews', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Autoplay],
  init: false,
  autoplay: false,
  loop: false,
  watchSlidesProgress: true,
  slidesPerGroup: 1,
  slideFullyVisibleClass: 'reviews__slide--visible',
  slideActiveClass: 'reviews__slide--active',
  navigation: {
    prevEl: '.reviews__button--prev',
    nextEl: '.reviews__button--next',
  },
  pagination: {
    el: '.reviews__pagination',
    clickable: true,
    type: 'progressbar',
    draggable: true,
    progressbarFillClass: 'reviews__progressbar',
  },
  breakpoints: {
    320: {
      width: 290,
      spaceBetween: 15,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      width: 678,
      spaceBetween: 30,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
    },
    1440: {
      width: 1240,
      spaceBetween: 32,
      slidesPerView: 2,
      slidesPerGroup: 1,
      simulateTouch: false,
    },
  },
  on: {
    breakpoint: function () {
      if (!isDesk() && clones.length > 0) {
        clones.forEach((clone) => {
          clone.remove();
        });
      }
      if (isDesk()) {
        cloneSlides(slider, slides, clones);
      }
    },
  },
});

swiper.init();
