var cart = {};


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