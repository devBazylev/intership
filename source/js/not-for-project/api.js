// обработчик на появление и исчезание попапа
const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';

const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [httpMethod.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [httpMethod.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

async function request(url, method = httpMethod.GET, body = null) {
  const response = await fetch(url, { method, body });
  if(!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
}

const loadPictures = async () => request(SERVER_URL + serverRoute.GET_DATA);

const sendPictures = async (pictureData) => request(SERVER_URL + serverRoute.SEND_DATA, httpMethod.POST, pictureData);

export { loadPictures, sendPictures };
