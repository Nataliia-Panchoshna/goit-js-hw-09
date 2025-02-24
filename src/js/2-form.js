const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = { email: '', message: '' };

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key) {
  const lSData = localStorage.getItem(key);
  try {
    const data = JSON.parse(lSData);
    return data;
  } catch (error) {
    return lSData;
  }
}

function fillInitForm() {
  const { email = '', message = '' } = getFromLS(refs.localKey) || {};
  refs.form.elements.email.value = email;
  refs.form.elements.message.value = message;
  formData.email = email;
  formData.message = message;
}

function onSubmitPress(evt) {
  evt.preventDefault();
  const email = evt.currentTarget.elements.email.value.trim();
  const message = evt.currentTarget.elements.message.value.trim();
  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  evt.target.reset();
  localStorage.removeItem(refs.localKey);
  formData.email = '';
  formData.message = '';
}

fillInitForm();

refs.form.addEventListener('input', evt => {
  const email = evt.currentTarget.elements.email.value.trim();
  const message = evt.currentTarget.elements.message.value.trim();
  formData.email = email;
  formData.message = message;
  saveToLS(refs.localKey, formData);
});
refs.form.addEventListener('submit', onSubmitPress);