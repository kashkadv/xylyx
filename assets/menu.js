document.addEventListener('click', (e) => {
  const toggle = document.querySelector('.menu-toggle');

  if (!toggle) return;

  const nav = toggle.parentElement;

  e.target.matches('.menu-toggle') ? nav.classList.toggle('active') : nav.classList.remove('active');
});
