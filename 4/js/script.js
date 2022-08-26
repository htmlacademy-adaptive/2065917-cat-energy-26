const menuButton = document.querySelector(".header__button");
const menuContainer = document.querySelector(".site-navigation");
const header = document.querySelector(".header--nojs")

// скрытие меню по-умолчанию
menuContainer.classList.remove("site-navigation--nojs")
header.classList.remove("header--nojs")

// переключатель состояния меню
function menuToggle() {
  menuContainer.classList.toggle("site-navigation--opened");
}

// открытие/закрытие меню по кнопке
menuButton.addEventListener("click", menuToggle);
