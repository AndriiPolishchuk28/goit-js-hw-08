import throttle from 'lodash.throttle';
const FORM_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
};

let data = JSON.parse(localStorage.getItem(FORM_KEY)) || {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(saveToStorage, 500));


showTheData();

function onFormSubmit(e) {
  e.preventDefault();
  const { email, message } = refs.form;

  if (!email.value || !message.value) {
    return alert('Fill all forms')
}
  e.currentTarget.reset();
  localStorage.removeItem(FORM_KEY)
  console.log(data);
}

function saveToStorage(e) {
  data[e.target.name] = e.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(data));
}

function showTheData() {
  const { email, message } = refs.form;
  if (data) {
    email.value = data.email || '', 
    message.value = data.message || ''
  }
}
