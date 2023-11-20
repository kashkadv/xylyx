const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const keys = urlParams.keys(),
  values = urlParams.values(),
  entries = urlParams.entries();

let options;
let groups;
let clearBtns;

document.addEventListener('DOMContentLoaded', () => {
  options = document.querySelectorAll('[data-filter-option]');
  groups = document.querySelectorAll('.block__options');
  clearBtns = document.querySelectorAll('.clear-filter-group');

  clearBtns?.forEach((btn) => btn.addEventListener('click', (e) => handleFilterGroupClear(e)));

  if (!options) return;
  buildFilters();
  updateFilterGroups();
});

function buildFilters() {
  options?.forEach((option) => {
    if (urlParams.has(option.dataset.key, option.dataset.target)) option.classList.add('selected');
    option.addEventListener('click', handleOptionClick);
  });

  checkFilters();
}

function updateFilterGroups() {
  groups.forEach((group) => {
    const hasSelected = group.querySelectorAll('.selected');
    hasSelected.length ? group.classList.add('active') : group.classList.remove('active');
  });
}

function handleFilterGroupClear(e) {
  const group = e.target.closest('.block__options');
  const options = group?.querySelectorAll('[data-filter-option]');

  options?.forEach((option) => {
    option.classList.remove('selected');
    urlParams.delete(option.dataset.key, option.dataset.target);
  });

  updateUrl();
  checkFilters();
  updateFilterGroups();
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
        product.classList.add('active');
      } else {
        product.classList.remove('shown');
        product.classList.remove('active');
        product.classList.add('hidden');
      }
    });
  } else {
    products.forEach((product) => {
      product.classList.remove('hidden');
      product.classList.remove('active');
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
  updateFilterGroups();
}

function updateUrl() {
  let url = new URL(document.URL);
  url.search = urlParams.toString();
  window.history.pushState('', '', url.href);
}
