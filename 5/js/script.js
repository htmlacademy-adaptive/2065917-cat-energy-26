const menuButton = document.querySelector(".header__button");
const menuContainer = document.querySelector(".site-navigation");
const header = document.querySelector(".header--nojs")
const burgerButton = document.querySelector(".menu-button");

// скрытие меню по-умолчанию
menuContainer.classList.remove("site-navigation--nojs")
header.classList.remove("header--nojs")

// переключатель состояния меню
function menuToggle() {
  menuContainer.classList.toggle("site-navigation--opened");
}

// открытие/закрытие меню по кнопке
menuButton.addEventListener("click", menuToggle);

// переключатель кнопки меню
function buttonToggle() {
  burgerButton.classList.toggle("menu-button--open");
}

burgerButton.addEventListener("click", buttonToggle);
