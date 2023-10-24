document.addEventListener('DOMContentLoaded', () => {
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  addToCartForms.forEach((form) => {
    form.addEventListener('submit', (e) => handleFormSubmit(e, form));
  });

  document.addEventListener('click', handleCartClick);
});

async function handleFormSubmit(e, form) {
  e.preventDefault();

  await fetch('/cart/add', {
    method: 'post',
    body: new FormData(form),
  });

  const res = await fetch('/cart.json');
  const cart = await res.json();

  updateCartTotal(cart);
  UpdateCart();
}

function updateCartTotal(cart) {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.item_count;
}

function showCart() {
  const cart = document.querySelector('.cart-drawer');
  cart.classList.add('active');
}

function hideCart() {}

function toggleCart() {
  const cart = document.querySelector('.cart-drawer');
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;

  if (!cart) return;

  cart.classList.toggle('active');

  cart.matches('.active')
    ? (document.body.style.paddingRight = `${scrollbarWidth}px`)
    : (document.body.style.paddingRight = 0);
}

async function UpdateCart() {
  const res = await fetch('/?section_id=cart-drawer');
  const text = await res.text();
  const html = document.createElement('div');
  html.innerHTML = text;
  const cartDrawer = html.querySelector('.cart-drawer').innerHTML;
  document.querySelector('.cart-drawer').innerHTML = cartDrawer;

  showCart();
}

function handleCartClick(e) {
  if (e.target.matches('.cart-toggle')) toggleCart();
}
