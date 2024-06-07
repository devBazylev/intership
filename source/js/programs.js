import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Autoplay } from 'swiper/modules';
import { cloneSlides } from './util';

const desk = window.matchMedia('(min-width: 1440px)');
const programs = document.querySelector('.programs');
const slider = programs.querySelector('.programs__slider');
const slides = programs.querySelectorAll('.programs__slide');

const clones = [];

const swiper = new Swiper('.programs', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Autoplay],
  init: false,
  autoplay: false,
  watchSlidesProgress: true,
  slideFullyVisibleClass: 'programs__slide--visible',
  navigation: {
    prevEl: '.programs__button--prev',
    nextEl: '.programs__button--next',
  },
  pagination: {
    el: '.programs__pagination',
    clickable: true,
    type: 'progressbar',
    draggable: true,
    progressbarFillClass: 'programs__progressbar',
  },
  // scrollbar: {
  //   el: '.programs__pagination',
  //   dragClass: 'programs__progressbar',
  //   draggable: true,
  //   hide: false,
  // },
  breakpoints: {
    320: {
      width: 290,
      autoHeight: true,
      spaceBetween: 15,
      slidesPerView: 1,
    },
    768: {
      width: 678,
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    1440: {
      width: 1240,
      spaceBetween: 32,
      slidesPerView: 3,
      slidesPerGroup: 1,
      simulateTouch: false,
    },
  },
  on: {
    breakpoint: function () {
      if (!desk.matches && clones.length > 0) {
        clones.forEach((clone) => {
          clone.remove();
        });
      }
      if (desk.matches) {
        cloneSlides(slider, slides, clones);
        clones[2].remove();
      }
    },
  },
});

swiper.init();

// const onProgramsTouch = () => {
//   swiper.init();
//   removeListener(programs, 'touchstart', onProgramsTouch);
// };

// const onProgramsClick = (evt) => {
//   if (isTargetClick(evt, '.programs')) {
//     swiper.init();
//   }
//   removeListener(programs, 'click', onProgramsClick);
// };

// const onProgramsKey = () => {
//   swiper.init();
//   removeListener(programs, 'keyup', onProgramsKey);
// };

// const setListenersForPrograms = () => {
//   addListener(programs, 'touchstart', onProgramsTouch);
//   addListener(programs, 'click', onProgramsClick);
//   addListener(programs, 'keyup', onProgramsKey);
// };

// export { setListenersForPrograms };
