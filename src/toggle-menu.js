/**
 * Append event to toggler. On click toggle menu and toggler active class.
 * @param {HTMLElement} menu
 * @param {HTMLElement} toggler
 */
function toggleMenu(menu, toggler) {
  toggler.addEventListener('click', event => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
  });
}

export default toggleMenu;
