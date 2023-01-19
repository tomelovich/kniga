function init() {
  // $.getJSON("book.json", booksOut);
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    booksOut
  )
}


/* Слайдер */
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 4,
    
  });
const swiperAuthor = new Swiper('.swiper-author', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 4,

});


function booksOut(data) {
  data = JSON.parse(data);
  let out =''; 
  for (var key in data) {
    
      out +='<div class="swiper-slide">'
        out +='<div class="product-wrap">'
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
                    out +=`<a href="books.html#${key}">Подробнее...</a>`
                  out +=`</div>`;
                out +=`</div>`;
              out +=`</footer>`;
            out +=`</div>`;
          out +=`</div>`;
        out +=`</div>`;
      out +=`</div>`;
  
  }
  $('.swiper-wrapper').html(out);
}

function openbox(id) {
  var all = document.querySelectorAll(".open-block");
  for (var i = 0; i < all.length; i++) {
    if (all[i].id == id) {
      all[i].style.display = (all[i].style.display == 'none')? 'block' : 'none';
    } else {
      all[i].style.display = 'none';
    }
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