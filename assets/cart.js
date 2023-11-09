document.addEventListener('DOMContentLoaded', () => {
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  addToCartForms.forEach((form) => {
    form.addEventListener('submit', (e) => handleAddToCartFormSubmit(e, form));
  });

  document.addEventListener('click', handleCartClick);
});

async function handleAddToCartFormSubmit(e, form) {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.classList.add('loading');

  await fetch('/cart/add', {
    method: 'post',
    body: new FormData(form),
  });

  const res = await fetch('/cart.json');
  const cart = await res.json();

  btn.classList.remove('loading');

  updateCartTotal(cart);
  UpdateCart();
}

function updateCartTotal(cart) {
  const cartCountLabels = document.querySelectorAll('.cart-count-label');
  cartCountLabels.forEach((cartCountLabel) => {
    cartCountLabel.textContent = cart.item_count;
  });
}

function showCart() {
  const cart = document.querySelector('.cart-drawer');
  cart.classList.add('active');
}

function hideCart() {}

function toggleCart() {
  const cart = document.querySelector('.cart-drawer');
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  const header = document.querySelector('.header__wrapper');

  if (!cart) return;

  cart.classList.toggle('active');

  if (cart.matches('.active')) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    header.style.width = `calc(100% - ${scrollbarWidth}px)`;
  } else {
    setTimeout(() => {
      document.body.style.paddingRight = 0;
      document.body.style.overflow = 'visible';
      header.style.width = '100%';
    }, 300);
  }
}

async function UpdateCartPage() {
  const res = await fetch('/?section_id=cart-items');
  const text = await res.text();
  const html = document.createElement('div');
  html.innerHTML = text;

  const renderedSection = html.querySelector('#cartPage_form').innerHTML;

  const curentSection = document.querySelector('#cartPage_form');

  curentSection.innerHTML = renderedSection;
}

async function UpdateCart(quite = false) {
  const res = await fetch('/?section_id=cart-drawer');
  const text = await res.text();
  const html = document.createElement('div');
  html.innerHTML = text;
  const cartDrawer = html.querySelector('.cart-drawer').innerHTML;

  const cart = document.querySelector('.cart-drawer');
  cart.innerHTML = cartDrawer;

  if (quite) return;

  setTimeout(() => {
    if (!cart.matches('.active')) toggleCart();
  }, 100);
}

function handleCartClick(e) {
  const target = e.target;

  const cart = document.getElementById('cart_form');
  const cartPage = document.getElementById('cartPage_form');

  if (target.matches('.cart-toggle') || target.matches('.cart-drawer')) toggleCart();
  if (target.matches('.plus') || target.matches('.minus') || target.matches('.remove-product')) {
    if (!cart.contains(target) && !cartPage.contains(target)) return;
    changeCartQuantity(target);
  }
}

function getProductKey(target) {
  const key = target.closest('.cart-product').dataset.key;
  return key;
}

async function changeCartQuantity(target) {
  const key = getProductKey(target);
  let quantity = 0;

  if (!target.matches('.remove-product')) {
    quantity = +target.closest('.input-quantity').querySelector('input[name="quantity"]').value;
  }

  if (target.matches('.plus')) quantity += 1;
  if (target.matches('.minus') && quantity > 1) quantity -= 1;

  const res = await fetch('/cart/change.js', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity, id: key }),
  });

  const json = await res.json();

  const cartPage = document.getElementById('cartPage_form');

  if (cartPage) {
    updateCartTotal(json);
    UpdateCartPage();
    UpdateCart(true);
  } else {
    updateCartTotal(json);
    UpdateCart();
  }
}

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('[data-qty]')) handleQty(target);
});

function handleQty(target) {
  const wrapper = target.parentElement;
  const input = wrapper.querySelector('input');
  const currentValue = +input.value;

  if (target.matches('.plus')) {
    input.value = currentValue + 1;
  }

  if (target.matches('.minus') && currentValue > 1) {
    input.value = currentValue - 1;
  }
}
