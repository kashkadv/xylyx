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
