const menuButton=document.querySelector(".header__button"),menuContainer=document.querySelector(".site-navigation"),header=document.querySelector(".header--nojs"),burgerButton=document.querySelector(".menu-button"),mapContainer=document.querySelector(".contacts__map"),mapFallback=document.querySelector(".contacts__map-fallback");function menuToggle(){menuContainer.classList.toggle("site-navigation--opened")}function buttonToggle(){burgerButton.classList.toggle("menu-button--open")}menuContainer.classList.remove("site-navigation--nojs"),header.classList.remove("header--nojs"),mapContainer.classList.remove("contacts__map--nojs"),mapFallback.classList.remove("contacts__map-fallback--nojs"),menuButton.addEventListener("click",menuToggle),burgerButton.addEventListener("click",buttonToggle);