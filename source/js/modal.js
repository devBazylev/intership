import { addClass, removeClass, addListener, addListenerArray, removeListener, removeListenerArray, isTarget, isKeydown, toggleClass } from './util';

const body = document.querySelector('.page__body');
const overlay = body.querySelector('.page__overlay');
const hero = body.querySelector('.hero');
const heroButtons = hero.querySelectorAll('.hero__button');
const modal = hero.querySelector('.modal');
const inputName = modal.querySelector('.modal__name');
const submitButton = modal.querySelector('.modal__submit');
const cancelButton = modal.querySelector('.modal__cancel');
const checkboxHidden = modal.querySelector('.modal__checkbox');
const checkboxBackup = modal.querySelector('.modal__check');
const select = modal.querySelector('.modal__select');
const selectHidden = select.querySelector('.modal__hidden');
const optionHidden = select.querySelector('.modal__option');
const cityShown = select.querySelector('.modal__city');
const cities = select.querySelectorAll('.modal__item');
const label = modal.querySelector('.modal__label--city');

const onSelectHidden = () => {
  cityShown.focus();
};

const clickCheckbox = (evt) => {
  if (isKeydown(evt, ' ')) {
    checkboxHidden.click();
  }
};

const onSubmit = async (evt) => {
  modal.submit();
  evt.preventDefault();
  modal.reset();
  closeModal();
};

const onSubmitKeydown = (evt) => {
  if (modal.checkValidity() === true && isKeydown(evt, 'Enter') && !isTarget(evt, '.modal__cancel')) {
    onSubmit(evt);
  }
};

const onClick = () => {
  if (!modal.classList.contains('modal--validation')) {
    modal.classList.add('modal--validation');
  }
};

const onCancelButton = () => {
  closeModal();
};

const onDocumentEscape = (evt) => {
  if (modal.classList.contains('hero__form--opened') && isKeydown(evt, 'Escape')) {
    closeModal();
  }
};

const onMissClick = (evt) => {
  if (!isTarget(evt, '.modal') && !isTarget(evt, '.hero__button')) {
    closeModal();
  }
};

const onCheckbox = (evt) => {
  clickCheckbox(evt);
  // if (modal.checkValidity() === true) {
  //   submitButton.focus();
  // }
};

const onSelectMissClick = (evt) => {
  if (!isTarget(evt, '.modal__select') && !isTarget(evt, '.modal__label--city')) {
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
  cityShown.textContent = this.textContent;
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
    cityShown.textContent = this.textContent;
    removeClass(select, 'modal__select--opened');
    if (checkboxHidden.checkValidity() === false) {
      checkboxBackup.focus();
    } else {
      cityShown.focus();
    }
  }
}

const onLabel = () => {
  toggleSelect();
  cityShown.focus();
};

const onDocumentFocus = (evt) => {
  if (!isTarget(evt, '.modal')) {
    closeModal();
  }
};

const onHeroButton = () => {
  addClass(body, 'page__body--no-scroll');
  addClass(modal, 'hero__form--opened');
  addClass(overlay, 'page__overlay--active');
  addListener(document, 'click', onMissClick);
  addListener(document, 'focusin', onDocumentFocus);
  addListener(document, 'keydown', onDocumentEscape);
  addListener(modal, 'submit', onSubmit);
  addListener(modal, 'keydown', onSubmitKeydown);
  addListener(submitButton, 'click', onClick);
  addListener(cancelButton, 'click', onCancelButton);
  addListener(selectHidden, 'focusin', onSelectHidden);
  addListener(checkboxBackup, 'keydown', onCheckbox);
  addListener(label, 'click', onLabel);
  addListener(cityShown, 'click', onSelectClick);
  addListener(cityShown, 'keydown', onSelectKeydown);
  addListenerArray(cities, 'click', onCityClick);
  addListenerArray(cities, 'keydown', onCityKeydown);
  inputName.focus();
};

function closeModal () {
  removeClass(body, 'page__body--no-scroll');
  removeClass(modal, 'hero__form--opened');
  removeClass(overlay, 'page__overlay--active');
  removeListener(document, 'click', onMissClick);
  removeListener(document, 'focusin', onDocumentFocus);
  removeListener(document, 'keydown', onDocumentEscape);
  removeListener(modal, 'submit', onSubmit);
  removeListener(modal, 'keydown', onSubmitKeydown);
  removeListener(submitButton, 'click', onClick);
  removeListener(cancelButton, 'click', onCancelButton);
  removeListener(selectHidden, 'focusin', onSelectHidden);
  removeListener(checkboxBackup, 'keydown', onCheckbox);
  removeListener(label, 'click', onLabel);
  removeListener(cityShown, 'click', onSelectClick);
  removeListener(cityShown, 'keydown', onSelectKeydown);
  removeListenerArray(cities, 'click', onCityClick);
  removeListenerArray(cities, 'keydown', onCityKeydown);
  removeClass(select, 'modal__select--opened');
}

addListenerArray(heroButtons, 'click', onHeroButton);
