var cart = {};
let delivery = 0;
function loadCart() {
  //проверяю есть ли в localStorage запись cart
  if (localStorage.getItem('cart')) {
      // если есть - расширфровываю и записываю в переменную cart
      cart=JSON.parse(localStorage.getItem('cart'));
          
      showCart();
     
      }
  else {
      $('.yourOrder').html('Корзина пуста!');
  }
}
function showCart() {
  //вывод корзины
  if (!isEmpty(cart)) {
      $('.yourOrder').html('Корзина пуста!');
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
          for (var id in cart) {   

            price = cart[id] * books[id].price;
            total += price;
            
            quantityBooks += cart[id];
            discount = total/10;
          }
          out += '<h2>Ваш заказ</h2>'
            out += '<div class="main-cart-total">'
             
                  out += `<p>Товаров на <b>${total} руб.</b></p>`;
                    out += `<p>Скидка <b>-${(total - (total - discount)).toFixed(2)} руб.</b></p>`;
                    out += `<p>Доставка: <b>${delivery} руб.</b></p>`;
                    out += `<p class="result">Итого: <b>${total - discount + delivery} руб.</b></p>`;
                    out += `<a href="#" class="checkout">Оформить заказ</a>`;
            out += '</div>'
            $('.yourOrder').html(out);
        });
        
    }
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
 
  $(".radio-btn").click(function (event) {
    let radio = $('.radio-btn');

    if (radio[0].checked) {
      delivery = 0;
      $('.pickup').css('display', 'flex');
      $('.courier').css('display', 'none');
      $('.europost').css('display', 'none');
      $('.delivery').css('max-height', '400px');
    }
    else if(radio[1].checked) {
      delivery = 2;
      $('.pickup').css('display', 'none');
      $('.courier').css('display', 'flex');
      $('.europost').css('display', 'none');
      $('.delivery').css('max-height', '400px');
    }
    else {
      delivery = 3;
      $('.pickup').css('display', 'none');
      $('.courier').css('display', 'none');
      $('.europost').css('display', 'flex');
      $('.delivery').css('max-height', '550px');
    }
    loadCart();
  });
  $(".radioPay").click(function (event) {
    let radio = $('.radioPay');

    if (radio[0].checked) {
      $('.cash').css('display', 'flex');
      $('.paymentCard').css('display', 'none');
      $('.pay').css('max-height', '250px');
    }
    else {
      $('.cash').css('display', 'none');
      $('.paymentCard').css('display', 'flex');
      $('.pay').css('max-height', '300px');
    }
  });
  console.log(delivery)
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