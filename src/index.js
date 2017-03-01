import './style/index.styl';
import './view/index.pug';
import loadProducts from './load-products.js';
import toggleMenu from './load-products.js';
import animateParallaxBanner from './animate-parallax-banner.js';

const toggler = document.querySelector('.menu > .toggler');
const menu = document.querySelector('.menu');

const banner = document.querySelector('#just-do-it > .container');
const image = document.querySelector('#just-do-it > .container > .image');

animateParallaxBanner(banner, image, percent => -(percent * .15));
toggleMenu(menu, toggler);
loadProducts();
