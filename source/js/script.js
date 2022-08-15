const menuButton = document.querySelector(".site-navigation__button");
const menuContainer = document.querySelector(".site-navigation__list");

// переключатель состояния меню
function menuToggle() {
  menuContainer.classList.toggle("site-navigation__list--opened");
}

// открытие/закрытие меню по кнопке
menuButton.addEventListener("click", menuToggle);
