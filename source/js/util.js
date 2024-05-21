const setDataId = (elems) => {
  for (let i = 0; i < elems.length; i++) {
    elems[i].dataset.id = i;
  }
};

const addClass = (elem, classs) => {
  elem.classList.add(classs);
};

const removeClass = (elem, classs) => {
  elem.classList.remove(classs);
};

const toggleClass = (elem, classs) => {
  elem.classList.toggle(classs);
};

const addClassArray = (elems, classs) => {
  elems.forEach((elem) => {
    addClass(elem, classs);
  });
};

const resetClassArray = (array, classs) => {
  array.forEach((elem) => {
    if (elem.classList.contains(classs)) {
      elem.classList.remove(classs);
    }
  });
};

const setClassArray = (array, classs, id) => {
  resetClassArray(array, classs);
  array[id].classList.add(classs);
};

const changeText = (array, text) => {
  array.forEach((elem) => {
    elem.textContent = text;
  });
};

const setListener = (elem, action, callback) => {
  elem.addEventListener(action, callback);
};

const removeListener = (elem, action, callback) => {
  elem.removeEventListener(action, callback);
};

const setListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.addEventListener(action, callback);
  });
};

const removeListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.removeEventListener(action, callback);
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

export { setDataId, addClass, removeClass, toggleClass, addClassArray, resetClassArray, setClassArray, changeText, setListener, removeListener, setListenerArray, removeListenerArray, cloneSlides };
