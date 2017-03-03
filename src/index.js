import './style/index.styl';
import './view/index.pug';
import { loadProducts, filterProducts } from './load-products.js';
import toggleMenu from './load-products.js';
import animateParallaxBanner from './animate-parallax-banner.js';

const toggler = document.querySelector('.menu > .toggler');
const menu = document.querySelector('.menu');
const banner = document.querySelector('#just-do-it > .container');
const image = document.querySelector('#just-do-it > .container > .image');
const clean = document.querySelector('#clean-filters');

clean.addEventListener('clean', cleanFilters);

animateParallaxBanner(banner, image, percent => -(percent * .15));
toggleMenu(menu, toggler);
loadProducts();
checkboxFilter('#high-top-filter', product => product['high-top']);
checkboxFilter('#not-high-top-filter', product => !product['high-top']);
checkboxFilter('#field-filter', product => product.category === 'campo');
checkboxFilter('#society-filter', product => product.category === 'society');

function checkboxFilter(selector, filter) {
  let element = document.querySelector(selector);

  element.addEventListener('change', () => {
    cleanFilters();

    if (element.checked)
      filterProducts(filter);
  });
}

function cleanFilters() {
  filterProducts(() => true);
}
