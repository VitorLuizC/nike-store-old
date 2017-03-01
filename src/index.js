import './style/index.styl';
import './view/index.pug';
import loadProducts from './load-products.js';
import toggleMenu from './load-products.js';

const toggler = document.querySelector('.menu > .toggler');
const menu = document.querySelector('.menu');

toggleMenu(menu, toggler);
loadProducts();
