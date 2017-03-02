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
 * Render products in a container.
 * @param {HTMLElement} container
 * @param {Product} product
 */
function renderProduct(container, product) {
  const item = document.createElement('div');

  /**
   * Format value to R$.
   * @param {number} price
   * @returns {string}
   */
  const format = price => price.toFixed(2).replace('.', ',');

  item.classList.add('product');
  item.innerHTML = `
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
  `;

  item.addEventListener('click', () => {

  });

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
  const bestSellers = document.querySelector('#best-sellers-shelf');
  const releases = document.querySelector('#releases-shelf');

  products["best-sellers"].forEach(product => renderProduct(bestSellers, product));
  products["releases"].forEach(product => renderProduct(releases, product));
}

/**
 * Render a simple message box with a default error message.
 * @param {Error} error
 */
function renderError(error) {
  const container = document.querySelector('#error');

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
