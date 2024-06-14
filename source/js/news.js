import Swiper from 'swiper';
import { Navigation, Pagination, Manipulation, Grid, Mousewheel, FreeMode } from 'swiper/modules';
import { addClass, cloneSlides, removeClassArray, addListenerArray, getRandomInteger, setDataId } from './util';

const mob = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
const tab = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
const desk = window.matchMedia('(min-width: 1440px)');
const news = document.querySelector('.news');
const slider = news.querySelector('.news__slider');
const slides = news.querySelectorAll('.news__slide');
const tabs = news.querySelectorAll('.news__tab');

function onTab () {
  removeClassArray(tabs, 'news__tab--active');
  addClass(this, 'news__tab--active');
}

const clones = [];

cloneSlides(slider, slides, clones);
cloneSlides(slider, slides, clones);
cloneSlides(slider, slides, clones);

const tabsMenu = new Swiper('.news__wrapper', {
  modules: [Mousewheel, FreeMode],
  init: false,
  autoplay: false,
  observer: true,
  watchSlidesProgress: true,
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
      width: 690,
      spaceBetween: 6,
    },
    1440: {
      width: 1240,
      spaceBetween: 14,
    },
  },
});

const swiper = new Swiper('.news__container', {
  modules: [Navigation, Pagination, Manipulation, Grid],
  init: false,
  autoplay: false,
  watchSlidesProgress: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  slideActiveClass: 'news__slide--active',
  slideNextClass: 'news__slide--next',
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
      slideVisibleClass: 'news__slide--full',
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
      slideVisibleClass: 'news__slide--full',
      grid: {
        rows: 2,
        fill:	'row',
      },
    },
    1440: {
      width: 1240,
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 32,
      simulateTouch: false,
      slideVisibleClass: 'news__slide--full',
      grid: {
        rows: 1,
        fill:	'column',
      },
    },
  },
});

tabsMenu.init();
swiper.init();

const resizeSlides = () => {
  const slidesWithClones = Array.from(news.querySelectorAll('.news__slide'));
  setDataId(slidesWithClones);

  if (mob.matches) {
    slidesWithClones.forEach((slide) => {
      const index = slidesWithClones.indexOf(slide);
      const image = slide.querySelector('.news__image');
      if (index % 2) {
        slide.style.width = '290px';
        slide.style.height = '240px';
        image.style.height = slide.style.height;
      } else {
        slide.style.width = '290px';
        slide.style.height = '330px';
        image.style.height = slide.style.height;
      }
    });
  }
  if (tab.matches) {
    slidesWithClones.forEach((slide) => {
      const image = slide.querySelector('.news__image');
      slide.style.width = '324px';
      slide.style.height = '350px';
      image.style.height = slide.style.height;
    });
  }
  if (desk.matches) {
    slidesWithClones.forEach((slide) => {
      const index = slidesWithClones.indexOf(slide);
      const image = slide.querySelector('.news__image');
      if (index % 3) {
        slide.style.width = '286px';
        slide.style.height = '400px';
        image.style.height = slide.style.height;
      } else {
        slide.style.width = '604px';
        slide.style.height = '400px';
        image.style.height = slide.style.height;
      }
      while (slidesWithClones.length % 3) {
        const random = getRandomInteger(0, slides.length - 1);
        const clone = slides[random].cloneNode(true);
        clone.setAttribute('aria-hidden', true);
        clones.push(clone);
        slidesWithClones.push(clone);
        slider.appendChild(clone);
        setDataId(slidesWithClones);
        // const dataId = clone.getAttribute('data-id');
        // clone.style.order = dataId;
      }
    });
  }
};

const renderPagination = () => {
  const pagination = news.querySelector('.news__pagination');
  const bullets = pagination.querySelectorAll('.news__bullet');
  setDataId(bullets);
  const activeBullet = pagination.querySelector('.news__bullet--active');
  const activeBulletId = +activeBullet.getAttribute('data-id');
  if (activeBulletId > 2 && activeBulletId < bullets.length - 1) {
    const indexBeforeActive = activeBulletId - 3;
    const indexAfterActive = activeBulletId + 1;
    bullets[indexBeforeActive].classList.remove('news__bullet--active-main');
    bullets[indexAfterActive].classList.add('news__bullet--active-main');
  }
  if (!activeBulletId < 1 && activeBulletId < bullets.length - 3) {
    const indexBeforeActive = activeBulletId - 1;
    const indexAfterActive = activeBulletId + 3;
    bullets[indexBeforeActive].classList.add('news__bullet--active-main');
    bullets[indexAfterActive].classList.remove('news__bullet--active-main');
  }
  if (mob.matches) {
    pagination.style.width = '128px';
  }
  if (tab.matches) {
    pagination.style.width = '160px';
  }
  if (desk.matches) {
    pagination.style.width = '160px';
  }
};

swiper.on('slidesUpdated', resizeSlides);
swiper.on('paginationUpdate', renderPagination);

addListenerArray(tabs, 'click', onTab);
