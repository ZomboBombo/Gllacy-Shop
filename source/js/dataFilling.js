'use strict';

/*
--------------------------------------------
=== МОДУЛЬ ДОБАВЛЕНИЯ ДАННЫХ НА СТРАНИЦУ ===
--------------------------------------------
*/
window.dataFilling = (function () {
  // ========= DOM-элементы =========
  var productsContainer = document.querySelector('#goods-list'); // --- Контейнер для товаров (список элементов)
  var productItemTemplate = document.querySelector('#product-item').content.querySelector('.catalog-list__item'); // --- Шаблон элемента списка с карточкой товара


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Функция для наполнения шаблона данными ***
  var getProductCard = function (cardTemplate) {
    var productCard = productItemTemplate.cloneNode(true); // --- Полное клонирование шаблона карточки товара

    // --- Заполнение шаблона данными ---
    productCard.querySelector('.product-card__image').src = cardTemplate.pictureUrl;
    productCard.querySelector('.product-card__cost').textContent = cardTemplate.cost;
    productCard.querySelector('.product-card__description').textContent = cardTemplate.name;

    return productCard;
  };

  return function (newProducts) {
    var oldProducts = productsContainer.querySelectorAll('.catalog-list__item');

    // --- Удаление каталога от старых товаров со страницы ---
    oldProducts.forEach((element) => {
      element.remove();
    });

    newProducts.forEach((element) => {
      productsContainer.appendChild(getProductCard(element));
    });
  };
})();
