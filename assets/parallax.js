const parallax = (elem, point) => {
  if (!document.querySelector(elem)) return;
  const initScrollTop = window.scrollY;
  const parallaxEl = document.querySelector(elem);

  parallaxEl.style.top = `${initScrollTop / point}%`;

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    parallaxEl.style.top = `${scrollTop / point}%`;
  });
};

const footerHeight = () => {
  if (!document.querySelector('.footer') && !document.querySelector('.footer__section')) return;
  const footerSection = document.querySelector('.footer__section');
  document.querySelector('.footer').style.height = footerSection.offsetHeight + 'px';
  return footerSection.offsetHeight;
};

const footerHeightResize = () => {
  if (!document.querySelector('.footer') && !document.querySelector('.footer__section')) return;
  const sectionFooterHeight = document.querySelector('.footer__section').offsetHeight;
  document.querySelector('.footer').style.height = sectionFooterHeight + 'px';
  return sectionFooterHeight;
};

const showFooter = () => {
  const footerSection = document.querySelector('.footer__section');
  if (!footerSection) return;

  const scrollCoeff =
    ((footerSection.offsetHeight - 300) * (document.body.scrollHeight - (window.scrollY + window.innerHeight))) /
    window.innerHeight;
  const opacityCoeff = Math.floor(
    (window.innerHeight -
      (document.querySelector('main').getBoundingClientRect().bottom + footerSection.offsetHeight)) *
      -1
  );
  const opacity = 1 - opacityCoeff / footerSection.offsetHeight;

  if (footerSection.offsetHeight < window.innerHeight) {
    footerSection.style.position = 'fixed';
    if (opacity > 0) footerSection.style.opacity = opacity;
    document.querySelector('.footer__wrapper').style.transform = `translateY(${scrollCoeff}px)`;
  } else {
    footerSection.style.position = 'static';
    footerSection.style.opacity = 1;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  parallax('.main-hero__image', 25);
  parallax('.main-hero__image', 25);

  setTimeout(() => {
    footerHeight();
  }, 350);
});

window.addEventListener('resize', () => {
  footerHeightResize();
});

document.addEventListener('scroll', function () {
  showFooter();
});
