// https://github.com/htmlacademy/html2-basic-template/
// git config core.autocrlf false;

function getTextNodesIn(elem, optionFilter) {
  let textNodes = [];
  if (elem) {
    for (let nodes = elem.childNodes, i = nodes.length; i--;) {
      const node = nodes[i],
        nodeType = node.nodeType;
      if (nodeType === 3) {
        if (!optionFilter || optionFilter(node, elem)) {
          if (node.data.trim() !== '') {
            textNodes.push(node.data.trim() !== '' ? node : '');

          }
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        textNodes = textNodes.concat(getTextNodesIn(node, optionFilter));
      }
    }
  }
  return textNodes;
}

getTextNodesIn(document.body).forEach((item) => {
  item.textContent = 'У меня есть несколько клиентов, которые записались ко мне на стрижку, не успев даже зайти в салон.';
});

const toggleDisabled = (button, flag) => {
  button.disabled = flag;
  button.textContent = flag ? 'Отправляем...' : 'Отправить';
};

function extractNumber(arg) {
  const string = arg.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result,10);
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//задержка в отправке
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { toggleDisabled, extractNumber, getRandomPositiveInteger, createRandomIdFromRangeGenerator, debounce };
