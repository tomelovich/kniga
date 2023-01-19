var cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart=JSON.parse(localStorage.getItem('cart'));
            
        showCart();
       
        }
    else {
        $('.main-cart').html('Корзина пуста!');
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
    saveCart();
    showCart();
}
function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
       
        $.post(
        "admin/core.php", 
              
        { 
            "action" : "loadBooks"      
        },
        function(data) {
            var books = JSON.parse(data);
            console.log(books);
            var out = '';
            let price;
            let total = 0;
            let quantityBooks = 0;
            let discount;
            out += '<div class="cart-items">'
            for (var id in cart) {   
                price = cart[id] * books[id].price;   
                
                out += '<div class="main-cart-item">'
                    out += `<img src="${books[id].img}">`;
                    out += '<div class="description">'
                        out += '<div class="main-cart-item-description">'
                            out += `<h4><a href="books.html#${id}">${books[id].name}</a></h4>`;
                            out += `<p class="price">${price} руб.</p>`;
                            out += '<div class="amount">'
                                out += `<button data-id="${id}" class="minus-books">-</button>`; 
                                out += `<p>${cart[id]}</p>`;
                                out += `<button data-id="${id}" class="plus-books">+</button>`;
                            out += '</div>';
                        out += '</div>'
                        out += `<button data-id="${id}" class="del-books">Удалить товар</button>`;
                    out += '</div>'    
                out += '</div>'
                
                total += price;
                quantityBooks += cart[id];
                discount = total/10;
            }
            out += '</div>'
            out += '<div class="main-cart-total">'
                out += '<h2>Ваш заказ</h2>'
                out += `<p>Стоимость товара (${quantityBooks} шт.)  <b>${total} руб.</b></p>`;
                out += `<p>Скидка KNIGA SHOP <strong><b>-${discount} руб.</strong></b></p>`
                out +='<div class="go-design">'
                    out += `<p>Итого: <b>${total - discount} руб.</b></p>`;
                    out += `<a href="/order.html" class="checkout">Перейти к оформлению</a>`;
                    out += '<span>Доступные способы доставки и оплаты<br>можно выбрать при оформлении заказа</span>'
                out += '</div>'
            out += '</div>'
            $('.main-cart').html(out);
            $('.del-books').on('click', delBooks);
            $('.plus-books').on('click', addToCart);
            $('.minus-books').on('click', minusBooks);
        });
        
    }
}
 
function delBooks() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusBooks() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusBooks() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
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
})