const STORAGE_KEY = 'feedback-msg';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let arr = [];

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();
  const data = { email, message };
  saveToLS(STORAGE_KEY, data);
});

function initPage() {
  const formData = loadFromLS(STORAGE_KEY);
  refs.form.elements.email.value = formData?.email || '';
  refs.form.elements.message.value = formData?.message || '';
}

initPage();

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();
  const data = { email, message };
  console.log(data);
  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}