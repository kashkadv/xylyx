const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const keys = urlParams.keys(),
  values = urlParams.values(),
  entries = urlParams.entries();

console.log(keys);

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelector('.filters');
  if (!filters) return;

  filters.addEventListener('click', () => console.log(123));
});
