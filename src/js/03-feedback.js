import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const message = document.querySelector('.feedback-form textarea');
const email = document.querySelector('.feedback-form input');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onTextareaInput, 500));
populateTextarea();

const formData = {};

function onSubmitForm(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedMessage) {
    email.value = savedMessage.email;
    message.value = savedMessage.textarea;
  }
}
