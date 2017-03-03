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
 * Saved products.
 * @type {Products}
 */
let saved = {};

/**
 * Fetch products and save* them.
 * @returns {Promise.<Products>}
 */
function load() {
  const url = 'http://www.raphaelfabeni.com.br/rv/data.json';

  return fetch(url)
    .then(response => {
      if (response.status !== 200)
        throw new Error(`Response to "${url}" has status ${response.status}.`);
      return response.json();
    })
    .then(products => {
      saved = products;
      return Promise.resolve(products);
    })
    .catch(error => console.error(error));
}

/**
 * @callback FilterProducts
 * @param {Product} product
 * @returns {boolean}
 */

/**
 * Filter products.
 * @param {FilterProducts} callback
 * @returns {Products}
 */
function filter(callback) {
  return {
    'best-sellers': saved['best-sellers'].filter(callback),
    'releases': saved['releases'].filter(callback)
  };
}

export { filter, load };
