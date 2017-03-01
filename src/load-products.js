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
 * @property {string} category
 * @property {string} image
 */

/**
 * Render products in a container.
 * @param {HTMLElement} container
 * @param {Product} product
 */
function renderProduct(container, product) {
  const item = document.createElement('div');
  item.classList.add('product');

  item.innerHTML = `
    <figure class="">
      <img src="${product.image}" alt="${product.title}" title="${product.title}">
    </figure>
  `;

  container.appendChild(item);
}

/**
 * @typedef Products
 * @property {Array.<Product>} best-sellers
 * @property {Array.<Product>} releases
 */

/**
 * Render products in their shelfs.
 * @param {Products} products
 */
function renderProducts(products) {
  const bestSellers = document.querySelector('.store > .best-sellers');
  const releases = document.querySelector('.store > .releases');

  products["best-sellers"].forEach(product => renderProduct(bestSellers, product));
  products["releases"].forEach(product => renderProduct(releases, product));
}

/**
 * Render a simple message box with a default error message.
 * @param {Error} error
 */
function renderError(error) {
  const container = document.querySelector('.store > .error');

  container.classList.add('active');
}

/**
 * Load products and render then on correctly place.
 * @async
 */
function loadProducts() {
  const url = 'http://www.raphaelfabeni.com.br/rv/data.json';

  fetch(url)
    .then(response => {
      if (response.status !== 200)
        throw new Error(`Response to "${url}" has status ${response.status}.`);
      return response.json();
    })
    .then(renderProducts)
    .catch(error => renderError(error));
}

export default loadProducts;
