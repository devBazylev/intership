const addClass = (elem, classs) => {
  elem.classList.add(classs);
};

const addClassArray = (elems, classs) => {
  elems.forEach((elem) => {
    addClass(elem, classs);
  });
};

const addListener = (elem, action, callback) => {
  elem.addEventListener(action, callback);
};

const addListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.addEventListener(action, callback);
  });
};

const changeText = (array, text) => {
  array.forEach((elem) => {
    elem.textContent = text;
  });
};

const cloneSlides = (parent, elems, array) => {
  elems.forEach((elem) => {
    const clone = elem.cloneNode(true);
    clone.setAttribute('aria-hidden', true);
    array.push(clone);
    parent.appendChild(clone);
  });
};

const isKeydown = (evt, keydown) => evt.key === keydown;

const isTarget = (evt, selector) => evt.target.closest(selector);

const removeClass = (elem, classs) => {
  elem.classList.remove(classs);
};

const removeClassArray = (array, classs) => {
  array.forEach((elem) => {
    if (elem.classList.contains(classs)) {
      elem.classList.remove(classs);
    }
  });
};

const removeListener = (elem, action, callback) => {
  elem.removeEventListener(action, callback);
};

const removeListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.removeEventListener(action, callback);
  });
};

const resetClassArray = (array, classs, id) => {
  removeClassArray(array, classs);
  array[id].classList.add(classs);
};

const setDataId = (elems) => {
  for (let i = 0; i < elems.length; i++) {
    elems[i].dataset.id = i;
  }
};

const toggleClass = (elem, classs) => {
  elem.classList.toggle(classs);
};

export {
  addClass,
  addClassArray,
  addListener,
  addListenerArray,
  changeText,
  cloneSlides,
  isKeydown,
  isTarget,
  removeClass,
  removeClassArray,
  resetClassArray,
  removeListener,
  removeListenerArray,
  setDataId,
  toggleClass,
};
