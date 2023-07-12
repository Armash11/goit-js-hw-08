import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const message = document.querySelector('textarea[name="message"]');
const email = document.querySelector('input[name="email"]');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onTextareaInput, 500));

const formData = {
  email: '',
  message: '',
};
populateTextarea();

function onSubmitForm(evt) {
  evt.preventDefault();

  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};
  evt.currentTarget.reset(); // метод очистки форми(сбрасує всі поля в початкове значення)
  localStorage.removeItem(LOCAL_STORAGE_KEY); // очистка локалсториджа
  console.log(formData);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  console.log(savedMessage);
  if (savedMessage === null) {
    return;
  }
  email.value = savedMessage.email || '';
  message.value = savedMessage.message || '';
  formData.email = savedMessage.email || '';
  formData.message = savedMessage.email || '';
}
