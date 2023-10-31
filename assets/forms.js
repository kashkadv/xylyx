document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('[data-external-form]');
  forms?.forEach((form) => form.addEventListener('submit', (e) => handleFormSubmit(e)));
});

async function handleFormSubmit(e) {
  e.preventDefault();

  const object = {};
  const formData = new FormData(e.target);

  formData.forEach((value, key) => (object[key] = value));

  const body = JSON.stringify(object);
  const action = e.target.action;

  const res = await submitForm(action, body);

  let message = 'Error while submitting form';
  if (res?.is_valid) {
    message = res.confirmation_message;
  }

  e.target.innerHTML = message;
}

async function submitForm(action, body) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Basic ZGV2ZWxvcGVyX3h5bHl4YmlvOmdwazFST3FIQzNuRE1nOEJnMUZ5cFg3VQ==');
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body,
    redirect: 'follow',
  };

  const req = await fetch(action, requestOptions);
  const res = await req.json();

  return res;
}
