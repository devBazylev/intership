import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Manipulation, Autoplay } from 'swiper/modules';
import { addListener, isTargetClick, removeListener } from './util';

const programs = document.querySelector('.programs');

const swiper = new Swiper('.programs', {
  modules: [Navigation, Pagination, Scrollbar, Manipulation, Autoplay],
  // init: false,
  autoplay: false,
  watchSlidesProgress: true,
  slideActiveClass: 'programs__slide--active',
  navigation: {
    prevEl: '.programs__button--prev',
    nextEl: '.programs__button--next',
  },
  pagination: {
    el: '.programs__pagination',
    clickable: true,
    type: 'progressbar',
    draggable: true,
    // progressbarOppositeClass: 'swiper-pagination-progressbar-fill',
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
});

const onProgramsTouch = () => {
  swiper.init();
  removeListener(programs, 'touchstart', onProgramsTouch);
};

const onProgramsClick = (evt) => {
  if (isTargetClick(evt, '.programs')) {
    swiper.init();
  }
  removeListener(programs, 'click', onProgramsClick);
};

const onProgramsKey = () => {
  swiper.init();
  removeListener(programs, 'keyup', onProgramsKey);
};

const setListenersForPrograms = () => {
  addListener(programs, 'touchstart', onProgramsTouch);
  addListener(programs, 'click', onProgramsClick);
  addListener(programs, 'keyup', onProgramsKey);
};

export { setListenersForPrograms };
