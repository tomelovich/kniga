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
            for (var id in cart) {
                out += `<button data-id="${id}" class="del-books">x</button>`;
                out += `<img src="${books[id].img}">`;
                out += ` ${books[id].name  }`;
                out += `<button data-id="${id}" class="minus-books">-</button>`;
                out += ` ${cart[id]  }`;
                out += `<button data-id="${id}" class="plus-books">+</button>`;
                out += cart[id] * books[id].price;
                out += '<br>';
       
            }
            $('.main-cart').html(out);
            $('.del-books').on('click', delBooks);
            $('.plus-books').on('click', plusBooks);
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

    
$(document).ready(function () {
   loadCart();
})