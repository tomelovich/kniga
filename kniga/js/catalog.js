let cart = {};//корзина

function init() {
    $.post(
      "admin/core.php",
      {
        "action": "loadBooks"
      },
      booksOut
    )
}
function loadManga() {
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    mangaOut
  )
}
function loadBook() {
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    bookOut
  )
}
function loadComics() {
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    comicsOut
  )
}
function loadAll() {
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    allOut
  )
}
function booksOut(data) {
    data = JSON.parse(data);
    let out =''; 
    out +='<div class="container">'
    out +='<header class="section__header">'
    out +='<h2 class="section__title section__title--accent">Каталог</h2>'
    out +='<nav class="catalog-nav">'
    out +='<ul class="catalog-nav__wrapper">'
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn is-active all"  type="button">все</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn book"  type="button">книги</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn manga" type="button">манга</button></li>`
    out +=`<li class="catalog-nav__item"> <button class="catalog-nav__btn comics"  type="button">комиксы</button></li>`
    out +=`</ul>`;
    out +=`</nav>`;
    out +=`</header>`;
    out +=`</div>`;
    for (var key in data) {
      out +='<div class="catalog__item">'
        out +='<div class="catalog__product">'
          out +=`<img src="${data[key].img}" alt="" class="product__img">`;
          out +='<div class="product__content">'
            out +=`<h3 class="product__title"><a href="books.html#${key}">${data[key].name}</a></h3>`;
            out +=`<p class="product__description">${data[key].author}</p>`;
          out +=`</div>`;
          out +='<footer class="product__footer">';
            out +='<div class="product__bottom">';
              out +='<div class="product__price">';
                out +=`<span class="product__price-value">${data[key].price} BYN</span>`;
              out +=`</div>`;
              out +='<div class="product-buttons">';
                out +=`<button type="submit" class="add-to-cart" data-id="${key}">В корзину`;
                out +=`</button>`;
              out +=`<button type="submit" class="later" data-id="${key}">`;
              out += '<svg width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">';
              out += '<title>Small red heart with transparent background</title>';
              out += '<g>';
              out += '<title>Layer 1</title>';
              out += ' <g id="layer1">';
              out += `<path class="svg_2" data-id="${key}" d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>`;
              out += '</g>';
              out += '</g>';
              out += '</svg>';
      
                out +=`</button>`;
              out +=`</div>`;
            out +=`</div>`;
          out +=`</footer>`;
        out +=`</div>`;
      out +=`</div>`;
    }
  
    $('.catalog').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.later').on('click', addToLatter);
    $('.manga').on('click', loadManga);
    $('.comics').on('click', loadComics);
    $('.book').on('click', loadBook);
    $('.all').on('click', allOut);
}
function allOut(data) {
  // почему-то не работает--------------------------------------------------------------------------------------------
  
  let out =''; 
  out +='<div class="container">'
    out +='<header class="section__header">'
    out +='<h2 class="section__title section__title--accent">Каталог</h2>'
    out +='<nav class="catalog-nav">'
    out +='<ul class="catalog-nav__wrapper">'
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn is-active all"  type="button">все</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn book"  type="button">книги</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn manga" type="button">манга</button></li>`
    out +=`<li class="catalog-nav__item"> <button class="catalog-nav__btn comics"  type="button">комиксы</button></li>`
    out +=`</ul>`;
    out +=`</nav>`;
    out +=`</header>`;
    out +=`</div>`;
  for (var key in data) {
    
      out +='<div class="catalog__item">'
      out +='<div class="catalog__product">'
        out +=`<img src="${data[key].img}" alt="" class="product__img">`;
        out +='<div class="product__content">'
          out +=`<h3 class="product__title"><a href="books.html#${key}">${data[key].name}</a></h3>`;
          out +=`<p class="product__description">${data[key].author}</p>`;
        out +=`</div>`;
        out +='<footer class="product__footer">';
        out +='<div class="product__bottom">';
          out +='<div class="product__price">';
            out +=`<span class="product__price-value">${data[key].price} BYN</span>`;
          out +=`</div>`;
          out +='<div class="product-buttons">';
            out +=`<button type="submit" class="add-to-cart" data-id="${key}">В корзину`;
            out +=`</button>`;
          out +=`<button type="submit" class="later" data-id="${key}">`;
          out += '<svg width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">';
          out += '<title>Small red heart with transparent background</title>';
          out += '<g>';
          out += '<title>Layer 1</title>';
          out += ' <g id="layer1">';
          out += `<path class="svg_2" data-id="${key}" d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>`;
          out += '</g>';
          out += '</g>';
          out += '</svg>';
  
            out +=`</button>`;
          out +=`</div>`;
        out +=`</div>`;
      out +=`</footer>`;
    out +=`</div>`;
  out +=`</div>`;
    }
    
    
  
  $('.catalog').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.later').on('click', addToLatter);
  $('.manga').on('click', loadManga);
  $('.comics').on('click', loadComics);
  $('.book').on('click', loadBook);
  $('.all').on('click', allOut);
}
function mangaOut(data) {
  data = JSON.parse(data);
  let out =''; 
  out +='<div class="container">'
    out +='<header class="section__header">'
    out +='<h2 class="section__title section__title--accent">Каталог</h2>'
    out +='<nav class="catalog-nav">'
    out +='<ul class="catalog-nav__wrapper">'
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn is-active all"  type="button">все</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn book"  type="button">книги</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn manga" type="button">манга</button></li>`
    out +=`<li class="catalog-nav__item"> <button class="catalog-nav__btn comics"  type="button">комиксы</button></li>`
    out +=`</ul>`;
    out +=`</nav>`;
    out +=`</header>`;
    out +=`</div>`;
  for (var key in data) {
    if(data[key].type == "manga"){
      out +='<div class="catalog__item">'
      out +='<div class="catalog__product">'
        out +=`<img src="${data[key].img}" alt="" class="product__img">`;
        out +='<div class="product__content">'
          out +=`<h3 class="product__title"><a href="books.html#${key}">${data[key].name}</a></h3>`;
          out +=`<p class="product__description">${data[key].author}</p>`;
        out +=`</div>`;
        out +='<footer class="product__footer">';
        out +='<div class="product__bottom">';
          out +='<div class="product__price">';
            out +=`<span class="product__price-value">${data[key].price} BYN</span>`;
          out +=`</div>`;
          out +='<div class="product-buttons">';
            out +=`<button type="submit" class="add-to-cart" data-id="${key}">В корзину`;
            out +=`</button>`;
          out +=`<button type="submit" class="later" data-id="${key}">`;
          out += '<svg width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">';
          out += '<title>Small red heart with transparent background</title>';
          out += '<g>';
          out += '<title>Layer 1</title>';
          out += ' <g id="layer1">';
          out += `<path class="svg_2" data-id="${key}" d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>`;
          out += '</g>';
          out += '</g>';
          out += '</svg>';
  
            out +=`</button>`;
          out +=`</div>`;
        out +=`</div>`;
      out +=`</footer>`;
    out +=`</div>`;
  out +=`</div>`;
    }
    else {
      continue;
    }
    
  }
  $('.catalog').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.later').on('click', addToLatter);
  $('.manga').on('click', loadManga);
  $('.comics').on('click', loadComics);
  $('.book').on('click', loadBook);
  $('.all').on('click', allOut);
}
function bookOut(data) {
  data = JSON.parse(data);
  let out =''; 
  out +='<div class="container">'
    out +='<header class="section__header">'
    out +='<h2 class="section__title section__title--accent">Каталог</h2>'
    out +='<nav class="catalog-nav">'
    out +='<ul class="catalog-nav__wrapper">'
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn is-active all"  type="button">все</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn book"  type="button">книги</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn manga" type="button">манга</button></li>`
    out +=`<li class="catalog-nav__item"> <button class="catalog-nav__btn comics"  type="button">комиксы</button></li>`
    out +=`</ul>`;
    out +=`</nav>`;
    out +=`</header>`;
    out +=`</div>`;
  for (var key in data) {
    if(data[key].type == "book"){
      out +='<div class="catalog__item">'
      out +='<div class="catalog__product">'
        out +=`<img src="${data[key].img}" alt="" class="product__img">`;
        out +='<div class="product__content">'
          out +=`<h3 class="product__title"><a href="books.html#${key}">${data[key].name}</a></h3>`;
          out +=`<p class="product__description">${data[key].author}</p>`;
        out +=`</div>`;
        out +='<footer class="product__footer">';
            out +='<div class="product__bottom">';
              out +='<div class="product__price">';
                out +=`<span class="product__price-value">${data[key].price} BYN</span>`;
              out +=`</div>`;
              out +='<div class="product-buttons">';
                out +=`<button type="submit" class="add-to-cart" data-id="${key}">В корзину`;
                out +=`</button>`;
              out +=`<button type="submit" class="later" data-id="${key}">`;
              out += '<svg width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">';
              out += '<title>Small red heart with transparent background</title>';
              out += '<g>';
              out += '<title>Layer 1</title>';
              out += ' <g id="layer1">';
              out += `<path class="svg_2" data-id="${key}" d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>`;
              out += '</g>';
              out += '</g>';
              out += '</svg>';
      
                out +=`</button>`;
              out +=`</div>`;
            out +=`</div>`;
          out +=`</footer>`;
        out +=`</div>`;
      out +=`</div>`;
    }
    else {
      continue;
    }
    
  }
  $('.catalog').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.later').on('click', addToLatter);
  $('.manga').on('click', loadManga);
  $('.comics').on('click', loadComics);
  $('.book').on('click', loadBook);
  $('.all').on('click', allOut);
}
function comicsOut(data) {
  data = JSON.parse(data);
  let out =''; 
  out +='<div class="container">'
    out +='<header class="section__header">'
    out +='<h2 class="section__title section__title--accent">Каталог</h2>'
    out +='<nav class="catalog-nav">'
    out +='<ul class="catalog-nav__wrapper">'
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn is-active all"  type="button">все</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn book"  type="button">книги</button></li>`
    out +=`<li class="catalog-nav__item"><button class="catalog-nav__btn manga" type="button">манга</button></li>`
    out +=`<li class="catalog-nav__item"> <button class="catalog-nav__btn comics"  type="button">комиксы</button></li>`
    out +=`</ul>`;
    out +=`</nav>`;
    out +=`</header>`;
    out +=`</div>`;
  for (var key in data) {
    if(data[key].type == "comics"){
      out +='<div class="catalog__item">'
      out +='<div class="catalog__product">'
        out +=`<img src="${data[key].img}" alt="" class="product__img">`;
        out +='<div class="product__content">'
          out +=`<h3 class="product__title"><a href="books.html#${key}">${data[key].name}</a></h3>`;
          out +=`<p class="product__description">${data[key].author}</p>`;
        out +=`</div>`;
        out +='<footer class="product__footer">';
            out +='<div class="product__bottom">';
              out +='<div class="product__price">';
                out +=`<span class="product__price-value">${data[key].price} BYN</span>`;
              out +=`</div>`;
              out +='<div class="product-buttons">';
                out +=`<button type="submit" class="add-to-cart" data-id="${key}">В корзину`;
                out +=`</button>`;
              out +=`<button type="submit" class="later" data-id="${key}">`;
              out += '<svg width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">';
              out += '<title>Small red heart with transparent background</title>';
              out += '<g>';
              out += '<title>Layer 1</title>';
              out += ' <g id="layer1">';
              out += `<path class="svg_2" data-id="${key}" d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>`;
              out += '</g>';
              out += '</g>';
              out += '</svg>';
      
                out +=`</button>`;
              out +=`</div>`;
            out +=`</div>`;
          out +=`</footer>`;
        out +=`</div>`;
      out +=`</div>`;
    }
    else {
      continue;
    }
    
  }
  $('.catalog').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.later').on('click', addToLatter);
  $('.manga').on('click', loadManga);
  $('.comics').on('click', loadComics);
  $('.book').on('click', loadBook);
  $('.all').on('click', booksOut);
}
function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1

    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}
function addToLatter() {
  var later = {};
  if (localStorage.getItem('later')) {
    
    later = JSON.parse(localStorage.getItem('later'));
  }
  
  var id = $(this).attr('data-id');
  var element = $(`.svg_2[data-id=${id}]`);
  $(element).toggleClass('filled')
  later[id] = 1;
  localStorage.setItem('later', JSON.stringify(later)); //корзину в строку
  
 
  // загорается сердечко, но пропадает при переходе на другую страницу
  
}



function showMiniCart() {
    //показываю мини корзину

  $.post(
    "admin/core.php",           
    { 
      "action" : "loadBooks"      
    },
    function(data) {
      var books = JSON.parse(data); 
      var out = '';
      let price;
      let total = 0;
      for (var id in cart) {   
        price = cart[id] * books[id].price;   
        out += '<div class="mini-cart-item">'
          out += `<img src="${books[id].img}">`;
          out += '<div class="mini-cart-item-description">'
            out += `<h4><a href="books.html#${id}">${books[id].name}</a></h4>`;
            out += `<p>${price} руб.</p>`;
            out += '<div class="amount">'
              out += `<button data-id="${id}" class="minus-books">-</button>`; 
              out += `<p>${cart[id]}</p>`;
              out += `<button data-id="${id}" class="plus-books">+</button>`;
            out += '</div>';
            out += `<button data-id="${id}" class="del-books">Удалить</button>`;
          out += '</div>'
        out += '</div>'
        total += price;
      }
      
      out += '<div class="mini-cart-total">'
          out += `<p>Итого: <b>${total} руб.</b></p>`;
          out += `<button class="checkout">Перейти к оформлению</button>`;
        out += '</div>'
      $('.mini-cart').html(out);
      $('.del-books').on('click', delBooks);
      $('.plus-books').on('click', addToCart);
      $('.minus-books').on('click', minusBooks);
    });
}
function delBooks() {
  //удаляем товар из корзины
  var id = $(this).attr('data-id');
  delete cart[id];
  showMiniCart();
    saveCart();
}

function minusBooks() {
  var id = $(this).attr('data-id');
    if (cart[id]==1) {
      delete cart[id]; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]--; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}    
function saveCart() {
  //сохраняю корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
} 


function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}


$(document).ready(function () {
    init();
    loadCart();
});
