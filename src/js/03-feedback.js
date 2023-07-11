import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const message = document.querySelector('textarea[name="message"]');
const email = document.querySelector('input[name="email"]');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

let formData = {};

function onSubmitForm(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));

  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }

  evt.currentTarget.reset(); // метод очистки форми(сбрасує всі поля в начальне значення)

  localStorage.removeItem(LOCAL_STORAGE_KEY); // очистка локалсториджа
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedMessage) {
    form.email.value = savedMessage.email || '';
    form.message.value = savedMessage.message || '';
  }
}
