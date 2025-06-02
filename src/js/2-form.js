const formData = {
  email: '',
  message: '',
};

const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', FormInput);
form.addEventListener('submit', FormSubmit);

function FormInput(event) {
  if (!['email', 'message'].includes(event.target.name)) return;

  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(storageKey);
  if (!savedData) return;

  const parsed = JSON.parse(savedData);

  if (parsed.email) {
    form.elements.email.value = parsed.email;
    formData.email = parsed.email;
  }

  if (parsed.message) {
    form.elements.message.value = parsed.message;
    formData.message = parsed.message;
  }
}

function FormSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('All form fields must be filled in');
    return;
  }

  console.log(formData);

  localStorage.removeItem(storageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
}

populateForm();
