const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const keys = urlParams.keys(),
  values = urlParams.values(),
  entries = urlParams.entries();

let options;

document.addEventListener('DOMContentLoaded', () => {
  options = document.querySelectorAll('[data-filter-option]');
  if (!options) return;
  buildFilters();
});

function buildFilters() {
  options?.forEach((option) => {
    if (urlParams.has(option.dataset.key, option.dataset.target)) option.classList.add('selected');
    option.addEventListener('click', handleOptionClick);
  });

  checkFilters();
}

function checkFilters() {
  let targets = false;
  const checked = document.querySelectorAll('.selected[data-filter-option]');
  if (checked) targets = [...checked].map((item) => item.dataset.target);
  showProducts(targets);
}

function showProducts(targets) {
  const products = document.querySelectorAll('[data-product]');

  if (targets.length) {
    products.forEach((product) => {
      if (targets.includes(product.id)) {
        product.classList.remove('hidden');
        product.classList.add('shown');
      } else {
        product.classList.remove('shown');
        product.classList.add('hidden');
      }
    });
  } else {
    products.forEach((product) => {
      product.classList.remove('hidden');
      product.classList.add('shown');
    });
  }
}

function handleOptionClick(e) {
  const option = e.target;

  if (option.matches('.selected')) {
    option.classList.remove('selected');
    urlParams.delete(option.dataset.key, option.dataset.target);
  } else {
    option.classList.add('selected');
    urlParams.append(option.dataset.key, option.dataset.target);
  }

  updateUrl();
  checkFilters();
}

function updateUrl() {
  let url = new URL(document.URL);
  url.search = urlParams.toString();
  window.history.pushState('', '', url.href);
}
