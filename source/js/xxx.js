import Swiper from 'swiper';
import { Mousewheel, FreeMode } from 'swiper/modules';

const swiper = new Swiper('.news__wrapper', {
  modules: [Mousewheel, FreeMode],
  init: false,
  autoplay: false,
  watchSlidesProgress: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  resizeObserver: true,
  updateOnWindowResize: true,
  slideVisibleClass: 'news__tab--visible',
  slidesPerView: 'auto',
  mousewheel: {
    enabled: true,
    sensitivity: 1,
    eventsTarget: '.news__wrapper',
  },
  freeMode: {
    enabled: true,
    momentum: false,
    momentumBounce: false,
  },
  breakpoints: {
    320: {
      width: 290,
      spaceBetween: 10,

    },
    768: {
      width: 678,
      spaceBetween: 6,
    },
    1440: {
      width: 1240,
      spaceBetween: 14,
    },
  },
});

swiper.init();
