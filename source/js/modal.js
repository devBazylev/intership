import { addClass, removeClass, addListener, addListenerArray, removeListener, removeListenerArray, isTarget, isKeydown, toggleClass, setDataId, toggleDisabled } from './util';

const body = document.querySelector('.page__body');
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

let activeCityId;

setDataId(cities);

const onClick = () => {
  if (!modal.classList.contains('modal--validation')) {
    modal.classList.add('modal--validation');
  }
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

const onSelectHidden = () => {
  cityShown.focus();
};

const clickCheckbox = (evt) => {
  if (isKeydown(evt, ' ')) {
    checkboxHidden.click();
  }
};

const onCheckbox = (evt) => {
  clickCheckbox(evt);
};

const onSubmit = async (evt) => {
  toggleDisabled(submitButton, true);
  modal.submit();
  evt.preventDefault();
  modal.reset();
  toggleDisabled(submitButton, false);
  closeModal();
};

const onSubmitKeydown = (evt) => {
  if (modal.checkValidity() === true && isKeydown(evt, 'Enter') && !isTarget(evt, '.modal__cancel')) {
    onSubmit(evt);
  }
};

const onCancelButton = () => {
  closeModal();
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
  if (!optionHidden.selected) {
    optionHidden.setAttribute('selected', 'selected');
  }
  selectHidden.value = this.textContent;
  cityShown.textContent = this.textContent;
  optionHidden.textContent = this.textContent;
  optionHidden.value = this.textContent;
  this.click();
  removeClass(select, 'modal__select--opened');
  removeListener(document, 'click', onSelectMissClick);
}

function onCityKeydownEnter (evt) {
  if (isKeydown(evt, 'Enter')) {
    if (!optionHidden.selected) {
      optionHidden.setAttribute('selected', 'selected');
    }
    selectHidden.value = this.textContent;
    cityShown.textContent = this.textContent;
    optionHidden.textContent = this.textContent;
    optionHidden.value = this.textContent;
    this.click();
    removeClass(select, 'modal__select--opened');
    removeListener(document, 'click', onSelectMissClick);
    if (checkboxHidden.checkValidity() === false) {
      checkboxBackup.focus();
    } else {
      cityShown.focus();
    }
  }
}

function onCityKeydownArrowUp (evt) {
  if (isKeydown(evt, 'ArrowUp')) {
    activeCityId = this.getAttribute('data-id');
    if (activeCityId > 0) {
      activeCityId--;
    }
    cities[activeCityId].focus();
  }
}

function onCityKeydownArrowDown (evt) {
  if (isKeydown(evt, 'ArrowDown')) {
    activeCityId = this.getAttribute('data-id');
    if (activeCityId < cities.length) {
      activeCityId++;
    }
    cities[activeCityId].focus();
  }
}

const onLabel = () => {
  toggleSelect();
  cityShown.focus();
};

const onDocumentFocusModal = (evt) => {
  if (!isTarget(evt, '.modal')) {
    closeModal();
  }
};

const onDocumentFocusSelect = (evt) => {
  if (!isTarget(evt, '.modal__select')) {
    removeClass(select, 'modal__select--opened');
  }
};

const onHeroButton = () => {
  addClass(body, 'page__body--no-scroll');
  addClass(modal, 'hero__form--opened');
  addClass(body, 'page__overlay');
  addListener(document, 'click', onMissClick);
  addListener(document, 'focusin', onDocumentFocusModal);
  addListener(document, 'focusin', onDocumentFocusSelect);
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
  addListenerArray(cities, 'keydown', onCityKeydownEnter);
  addListenerArray(cities, 'keydown', onCityKeydownArrowUp);
  addListenerArray(cities, 'keydown', onCityKeydownArrowDown);
  inputName.focus();
};

function closeModal () {
  removeClass(body, 'page__body--no-scroll');
  removeClass(modal, 'hero__form--opened');
  removeClass(body, 'page__overlay');
  removeListener(document, 'click', onMissClick);
  removeListener(document, 'focusin', onDocumentFocusModal);
  removeListener(document, 'focusin', onDocumentFocusSelect);
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
  removeListenerArray(cities, 'keydown', onCityKeydownEnter);
  removeListenerArray(cities, 'keydown', onCityKeydownArrowUp);
  removeListenerArray(cities, 'keydown', onCityKeydownArrowDown);
  removeClass(select, 'modal__select--opened');
}

addListenerArray(heroButtons, 'click', onHeroButton);
