import { addClass, addListener, addListenerArray, removeListener, removeListenerArray, isKeydown, toggleClass, isTarget, removeClass, setDataId } from './util';

const body = document.querySelector('.page__body');
const form = document.querySelector('.form__template');
const label = form.querySelector('.form__label--city');
const select = form.querySelector('.form__select');
const selectHidden = select.querySelector('.form__hidden');
const optionHidden = select.querySelector('.form__option');
const cityShown = select.querySelector('.form__city');
const cities = select.querySelectorAll('.form__item');
const checkboxHidden = form.querySelector('.form__checkbox');
const checkboxBackup = form.querySelector('.form__check');
const submitButton = form.querySelector('.form__submit');

let activeCityId;

setDataId(cities);

const onClickSubmitButton = () => {
  if (!form.classList.contains('form__template--validation')) {
    addClass(form, 'form__template--validation');
  }
  removeListener(submitButton, 'click', onClickSubmitButton);
};

const onSelectHidden = () => {
  cityShown.focus();
};

const onDocumentFocusSelect = (evt) => {
  if (!isTarget(evt, '.form__select')) {
    removeClass(select, 'form__select--opened');
  }
};

const onSelectMissClick = (evt) => {
  if (!isTarget(evt, '.form__select') && !isTarget(evt, '.form__label--city')) {
    removeClass(body, 'page__body--no-scroll');
    removeClass(select, 'form__select--opened');
    removeListener(document, 'click', onSelectMissClick);
    removeListener(document, 'focusin', onDocumentFocusSelect);
  }
};

const toggleSelect = () => {
  toggleClass(select, 'form__select--opened');
  addListener(document, 'click', onSelectMissClick);
};

const onSelectClick = () => {
  toggleSelect();
  addClass(body, 'page__body--no-scroll');
  addListener(document, 'focusin', onDocumentFocusSelect);
  addListenerArray(cities, 'click', onCityClick);
  addListenerArray(cities, 'keydown', onCityKeydownEnter);
  addListenerArray(cities, 'keydown', onCityKeydownArrowUp);
  addListenerArray(cities, 'keydown', onCityKeydownArrowDown);
};

const onSelectKeydown = (evt) => {
  if (isKeydown(evt, 'Enter')) {
    toggleSelect();
    cities[0].focus();
    addClass(body, 'page__body--no-scroll');
    addListener(document, 'focusin', onDocumentFocusSelect);
    addListenerArray(cities, 'click', onCityClick);
    addListenerArray(cities, 'keydown', onCityKeydownEnter);
    addListenerArray(cities, 'keydown', onCityKeydownArrowUp);
    addListenerArray(cities, 'keydown', onCityKeydownArrowDown);
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
  removeClass(body, 'page__body--no-scroll');
  removeClass(select, 'form__select--opened');
  removeListener(document, 'click', onSelectMissClick);
  removeListener(document, 'focusin', onDocumentFocusSelect);
  removeListenerArray(cities, 'click', onCityClick);
  removeListenerArray(cities, 'keydown', onCityKeydownEnter);
  removeListenerArray(cities, 'keydown', onCityKeydownArrowUp);
  removeListenerArray(cities, 'keydown', onCityKeydownArrowDown);
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
    removeClass(body, 'page__body--no-scroll');
    removeClass(select, 'form__select--opened');
    removeListener(document, 'click', onSelectMissClick);
    removeListener(document, 'focusin', onDocumentFocusSelect);
    removeListenerArray(cities, 'click', onCityClick);
    removeListenerArray(cities, 'keydown', onCityKeydownEnter);
    removeListenerArray(cities, 'keydown', onCityKeydownArrowUp);
    removeListenerArray(cities, 'keydown', onCityKeydownArrowDown);
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

const clickCheckbox = (evt) => {
  if (isKeydown(evt, ' ')) {
    checkboxHidden.click();
  }
};

const onCheckbox = (evt) => {
  clickCheckbox(evt);
};

const onSubmit = async (evt) => {
  form.submit();
  evt.preventDefault();
  form.reset();
};

const onSubmitKeydown = (evt) => {
  if (form.checkValidity() === true && isKeydown(evt, 'Enter') && isTarget(evt, '.form__template')) {
    onSubmit(evt);
  }
};

addListener(form, 'submit', onSubmit);
addListener(form, 'keydown', onSubmitKeydown);
addListener(submitButton, 'click', onClickSubmitButton);
addListener(label, 'click', onLabel);
addListener(selectHidden, 'focusin', onSelectHidden);
addListener(cityShown, 'click', onSelectClick);
addListener(cityShown, 'keydown', onSelectKeydown);
addListener(checkboxBackup, 'keydown', onCheckbox);

// removeListener(form, 'submit', onSubmit);
// removeListener(form, 'keydown', onSubmitKeydown);
// removeListener(submitButton, 'click', onClickSubmitButton);
// removeListener(label, 'click', onLabel);
// removeListener(selectHidden, 'focusin', onSelectHidden);
// removeListener(cityShown, 'click', onSelectClick);
// removeListener(cityShown, 'keydown', onSelectKeydown);
// removeListener(checkboxBackup, 'keydown', onCheckbox);
