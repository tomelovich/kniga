function init() {
    var hash = window.location.hash.substring(1);
    console.log(hash);
    // $.getJSON("book.json", booksOut);
    $.post(
      "admin/core.php",
      {
        "action": "loadSingleBooks", 
        "id": hash
      },
      booksOut
    )
}

function booksOut(data) {
  if (data!=0){
    data = JSON.parse(data);
    let out =''; 
    out +='<div class="catalog-book__item">'
      out +='<div class="catalog-book__product">'
        out +='<div class="book_image">'
          out +=`<img src="${data.img}" alt="" class="product__img">`;
          out +=`<button type="submit" class="later" data-id="${data.id}">Добавить в избранное</button>`;
        out +=`</div>`;
        out +='<div class="product__content">'
          out +=`<h3 class="product__title">${data.name}</h3>`;
          out +=`<p class="product__description">${data.author}</p>`;
          out +=`<span class="product__price-value">${data.price} BYN</span>`;
          out +=`<button type="submit" class="add-to-cart" data-id="${data.id}"></button>`;
          out +=`<p class="description-book">${data.description}</p>`;
      
        out +=`</div>`;
      out +=`</div>`;
    out +=`</div>`;
    $('.catalog-book').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.later').on('click', addToLatter);
  }
  else{
    $('.catalog-book').html('Товара не существует!');
  }
  
}
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Читать больше";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Читать меньше";
    moreText.style.display = "inline";
  }
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
  alert("Добавлено в Избранное");
  var id = $(this).attr('data-id');
  later[id] = 1;
  localStorage.setItem('later', JSON.stringify(later)); //корзину в строку
}

function saveCart() {
    //сохраняю корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
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
  function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
  }
  
  $("#newUser").click(function(){
    $(".reg").text("Регистрация");
   
    $("#login-form").fadeOut(200);
    $("#registration-form").delay(300).fadeIn(500);
    $(".other-options").fadeOut(200);
  });
  
  $("#signup-btn,#getpass-btn").click(function(){
    $(".reg").text("Авторизация");
    
  
    $("#registration-form,#fpass-form").fadeOut(200);
    $("#login-form").delay(300).fadeIn(500);
    $(".other-options").fadeIn(300);
  });
  
  $("#fPass").click(function(){
    $(".reg").text("Восстановление пароля");
    
  
    $("#login-form").fadeOut(200);
    $("#fpass-form").delay(300).fadeIn(500);
    $(".other-options").fadeOut(200);
  });
  
  function newUser() {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    var email = $('#email').val();
    var epassword = $('#epassword').val();
    var erepassword = $('#erepassword').val();
    if(email!='' && epassword!='' && erepassword!=''){
      if (isEmailValid(email)) {
        if (erepassword==epassword){
          $.post (
            "/admin/core.php",
              {
                  "action" : "registration",
                  "email": email,
                  "epassword": epassword
              },
            
          function (data) {
            console.log(data)
          }        
          );
      }
      else {
        alert("Пароли не совпадают");
      }
    }
      else {
        alert("Введён не правильный email");
      }
      function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }
    }
      
    else {
      alert ("Заполните поля")
    }
  }
  function signIn() {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    var email = $('#logEmail').val();
    var epassword = $('#logEpassword').val();
    
    if(email!='' && epassword!=''){
      if (isEmailValid(email)) {
        
          $.post (
            "/admin/core.php",
              {
                  "action" : "authorization",
                  "email": email,
                  "epassword": epassword
              },
            
          function (data) {
            console.log(data)
          }        
          );
      }
    
      else {
        alert("Введён не правильный email");
      }
      function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }
    }
      
    else {
      alert ("Заполните все поля")
    }
  }
$(document).ready(function () {
    init();
    loadCart();
    $('#signup-btn').on('click', newUser);
  $('#signin-btn').on('click', signIn);
  $("a.myLinkModal").click(function (event) {
    event.preventDefault();
    $("#myOverlay").fadeIn(297, function () {
        $("#registrationModal")
            .css("display", "block")
            .animate({ opacity: 1 }, 198);
    });
});

$("#myModal__close, #myOverlay").click(function () {
    $("#registrationModal").animate({ opacity: 0 }, 198, function () {
        $(this).css("display", "none");
        $("#myOverlay").fadeOut(297);
    });
});
});
