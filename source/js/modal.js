import { addClass, removeClass, addListener, addListenerArray, removeListener, removeListenerArray, isTargetClick, isKeydown, toggleClass } from './util';

const body = document.querySelector('.page__body');
const overlay = body.querySelector('.page__overlay');
const hero = body.querySelector('.hero');
const heroButtons = hero.querySelectorAll('.hero__button');
const modal = hero.querySelector('.modal');
const inputName = document.querySelector('.modal__name');
const inputPhone = document.querySelector('.modal__phone');
const submitButton = modal.querySelector('.modal__submit');
const cancelButton = modal.querySelector('.modal__cancel');
const checkboxInvisible = modal.querySelector('.modal__checkbox');
const checkboxBackup = modal.querySelector('.modal__check');
const select = modal.querySelector('.modal__select');
const selectHidden = select.querySelector('.modal__hidden');
const optionHidden = select.querySelector('.modal__option');
const city = select.querySelector('.modal__city');
const cities = select.querySelectorAll('.modal__item');
const label = modal.querySelector('.modal__label--city');

const onPhone = (evt) => {
  if (inputPhone.checkValidity() === true && isKeydown(evt, 'Enter')) {
    city.focus();
  }
};

const clickCheckbox = (evt) => {
  if (isKeydown(evt, ' ')) {
    checkboxInvisible.click();
  }
};

const onSubmit = async (evt) => {
  modal.submit();
  evt.preventDefault();
  modal.reset();
  closeModal();
};

const onClick = () => {
  if (!modal.classList.contains('modal--validation')) {
    modal.classList.add('modal--validation');
  }
};

const onCancelButton = () => {
  closeModal();
};

const onDocument = (evt) => {
  if (modal.classList.contains('hero__form--opened') && isKeydown(evt, 'Escape')) {
    closeModal();
  }
};

const onMissClick = (evt) => {
  if (!isTargetClick(evt, '.modal') && !isTargetClick(evt, '.hero__button')) {
    closeModal();
  }
};

const onCheckbox = (evt) => {
  clickCheckbox(evt);
  // submitButton.focus();
};

const onSelectMissClick = (evt) => {
  if (!isTargetClick(evt, '.modal__select') && !isTargetClick(evt, '.modal__label--city')) {
    removeClass(select, 'modal__select--opened');
    removeListener(document, 'click', onSelectMissClick);
  }
};

const toggleSelect = () => {
  toggleClass(select, 'modal__select--opened');
  addListener(document, 'click', onSelectMissClick);
};

const onSelectClick = () => {
  toggleSelect();
};

const onSelectKeydown = (evt) => {
  if (isKeydown(evt, 'Enter')) {
    toggleSelect();
    cities[0].focus();
  }
};

function onCityClick () {
  selectHidden.value = this.getAttribute('data-city');
  optionHidden.value = this.getAttribute('data-city');
  if (!optionHidden.selected) {
    optionHidden.setAttribute('selected', 'selected');
  }
  optionHidden.removeAttribute('selected', 'selected');
  city.textContent = this.textContent;
  removeClass(select, 'modal__select--opened');
}

function onCityKeydown (evt) {
  if (isKeydown(evt, 'Enter')) {
    selectHidden.value = this.getAttribute('data-city');
    optionHidden.value = this.getAttribute('data-city');
    if (!optionHidden.selected) {
      optionHidden.setAttribute('selected', 'selected');
    }
    optionHidden.removeAttribute('selected', 'selected');
    city.textContent = this.textContent;
    removeClass(select, 'modal__select--opened');
    checkboxBackup.focus();
  }
}

const onLabel = () => {
  toggleSelect();
  city.focus();
};

const onHeroButton = () => {
  addClass(body, 'page__body--no-scroll');
  addClass(modal, 'hero__form--opened');
  addClass(overlay, 'page__overlay--active');
  addListener(inputPhone, 'keydown', onPhone);
  addListener(modal, 'submit', onSubmit);
  addListener(submitButton, 'click', onClick);
  addListener(cancelButton, 'click', onCancelButton);
  addListener(document, 'keydown', onDocument);
  addListener(document, 'click', onMissClick);
  addListener(checkboxBackup, 'keydown', onCheckbox);
  addListener(label, 'click', onLabel);
  addListener(city, 'click', onSelectClick);
  addListener(city, 'keydown', onSelectKeydown);
  addListenerArray(cities, 'click', onCityClick);
  addListenerArray(cities, 'keydown', onCityKeydown);
  // addListener(modal, 'blur', closeModal);
  inputName.focus();
};

function closeModal () {
  removeClass(body, 'page__body--no-scroll');
  removeClass(modal, 'hero__form--opened');
  removeClass(overlay, 'page__overlay--active');
  removeListener(inputPhone, 'keydown', onPhone);
  removeListener(modal, 'submit', onSubmit);
  removeListener(submitButton, 'click', onClick);
  removeListener(cancelButton, 'click', onCancelButton);
  removeListener(document, 'keydown', onDocument);
  removeListener(document, 'click', onMissClick);
  removeListener(checkboxBackup, 'keydown', onCheckbox);
  removeListener(label, 'click', onLabel);
  removeListener(city, 'click', onSelectClick);
  removeListener(city, 'keydown', onSelectKeydown);
  removeListenerArray(cities, 'click', onCityClick);
  removeListenerArray(cities, 'keydown', onCityKeydown);
  removeClass(select, 'modal__select--opened');
}

addListenerArray(heroButtons, 'click', onHeroButton);
