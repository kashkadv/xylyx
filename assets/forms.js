document.addEventListener('DOMContentLoaded', () => {
  const subscriptionForm = document.getElementById('subscription-form');
  subscriptionForm?.addEventListener('submit', (e) => handleFormSubmit(e));
});

async function handleFormSubmit(e) {
  e.preventDefault();

  console.log('submit form');

  // const data = new FormData(e.target);

  // const req = await fetch('https://wp-dev.space/craftandroot/xylyxbio/master/', {
  //   method: 'post',
  //   data: data,
  // });

  // const res = await req.text();

  // console.log(res);

  // e.target.reset();
}
