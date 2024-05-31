import { toggleClass, addListenerArray, isTargetClick, isKeydown } from './util';

const faq = document.querySelector('.faq');
const tabs = faq.querySelectorAll('.faq__card');

function onTabClick (evt) {
  if (isTargetClick(evt, '.faq')) {
    toggleClass(this, 'faq__card--opened');
  }
}

function onTabKey (evt) {
  if (isKeydown(evt, 'Enter')) {
    toggleClass(this, 'faq__card--opened');
  }
}

addListenerArray(tabs, 'click', onTabClick);
addListenerArray(tabs, 'keydown', onTabKey);

