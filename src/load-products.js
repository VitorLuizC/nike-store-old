import Flickity from 'flickity';
import { filter, load } from './products.js';

const bestSellersShelf = createShelf('#best-sellers > .products');
const releasesShelf = createShelf('#releases > .products');

/**
 * @typedef Installments
 * @property {number} number
 * @property {number} value
 */

/**
 * @typedef Product
 * @property {string} title
 * @property {number} price
 * @property {Installments} installments
 * @property {boolean} high-top
 * @property {('society'|'campo')} category
 * @property {string} image
 */

/**
 * @typedef Products
 * @property {Array.<Product>} best-sellers
 * @property {Array.<Product>} releases
 */



/**
 * Load products and render then on correctly place.
 * @async
 */
function loadProducts() {
  load().then(renderProducts).catch(error => console.error(error));
}

function filterProducts(callback) {
  let products = filter(callback);

  renderProducts(products);
}


/**
 * Render shelfs products and their carousels.
 * @param {Products} products
 */
function renderProducts(products) {
  bestSellersShelf.clean();
  releasesShelf.clean();

  products['best-sellers'].forEach(product => {
    bestSellersShelf.add(renderProduct(product))
  });

  products['releases'].forEach(product => {
    releasesShelf.add(renderProduct(product))
  });
}

function createShelf(selector) {
  const element = document.querySelector(selector);
  const carousel = new Flickity(element, {
    prevNextButtons: false,
    contain: true,
    imagesLoaded: true,
    percentPosition: true
  });

  return {
    element,
    carousel,
    clean() {
      this.carousel.remove(this.element.querySelectorAll('.product'));
    },
    add(element) {
      this.carousel.append(element);
    }
  };
}

/**
 * Render products in a container.
 * @param {Product} product
 */
function renderProduct(product) {
  /**
   * Format value to R$.
   * @param {number} price
   * @returns {string}
   */
  const format = price => price.toFixed(2).replace('.', ',');

  return render(
    `<div class="product">
      <figure class="figure">
        <img class="image" src="${product.image}" alt="${product.title}" title="${product.title}">
      </figure>
      <p class="customize">
        <i class="icon"></i>
        Personalize
      </p>
      <h4 class="title">${product.title}</h4>
      <p class="type">${product['high-top'] ? 'Cano Alto' : 'Cano Baixo'}</p>
      <p class="price">R$ ${format(product.price)}</p>
      <p class="installments">ou ${product.installments.number}X ${format(product.installments.value)} sem juros</p>
      <button class="button -primary" type="button">Comprar</button>
    </div>`
  );
}

/**
 * Render an HTML String.
 * @param {string} html
 * @returns {HTMLElement}
 */
function render(html) {
  const container = document.createElement('div');

  container.innerHTML = html;

  return container.firstChild;
}

export { loadProducts, filterProducts };
