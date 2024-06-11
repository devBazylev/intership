import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Grid } from 'swiper/modules';
import { cloneSlides } from './util';

const mob = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
const tab = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
const desk = window.matchMedia('(min-width: 1440px)');
const news = document.querySelector('.news');
const slider = news.querySelector('.news__slider');
const slides = news.querySelectorAll('.news__slide');

const clones = [];

cloneSlides(slider, slides, clones);
cloneSlides(slider, slides, clones);

const resizeSlides = () => {
  const slidesWithClones = news.querySelectorAll('.news__slide');
  const slideActive = news.querySelector('.news__slide--active');
  if (mob.matches) {
    slidesWithClones.forEach((slide) => {
      slide.style.width = '290px';
      slide.style.height = '240px';
    });
    slideActive.style.width = '290px';
    slideActive.style.height = '330px';
  }
  if (tab.matches) {
    slidesWithClones.forEach((slide) => {
      slide.style.width = '324px';
      slide.style.height = '350px';
    });
  }
  if (desk.matches) {
    slidesWithClones.forEach((slide) => {
      slide.style.width = '286px';
      slide.style.height = '400px';
    });
    slideActive.style.width = '604px';
    slideActive.style.height = '400px';
  }
};

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
      slidesPerGroup: 1,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill:	'column',
      },
    },
    768: {
      width: 678,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
        fill:	'column',
      },
    },
    1440: {
      width: 1240,
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
  on: {
    resize: resizeSlides,
    slideChangeTransitionStart: resizeSlides,
    slideChangeTransitionEnd: resizeSlides,
  },
});

swiper.init();
swiper.on('slidesUpdated', resizeSlides);

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
