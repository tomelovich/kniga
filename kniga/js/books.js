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
        
            out +='<div class="catalog__item">'
                out +='<div class="catalog__product">'
                out +=`<img src="${data.img}" alt="" class="product__img">`;
                out +='<div class="product__content">'
                    out +=`<h3 class="product__title">${data.name}</h3>`;
                    out +=`<p class="product__description">${data.author}</p>`;
                out +=`</div>`;
                out +='<footer class="product__footer">';
                    out +='<div class="product__bottom">';
                    out +='<div class="product__price">';
                        out +=`<span class="product__price-value">${data.price} BYN</span>`;
                    out +=`</div>`;
                    out +='<div class="product-buttons">';
                        out +=`<button type="submit" class="add-to-cart" data-id="${data.id}">`;
                        out +='<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>';
                        out +=`</button>`;
                        out +=`<button type="submit" class="later" data-id="${data.id}">`;
                        out +='<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>';
                        out +=`</button>`;
                    out +=`</div>`;
                    out +=`</div>`;
                out +=`</footer>`;
                out +=`</div>`;
            out +=`</div>`;
            out +=`<textarea>${data.description}</textarea>`;
        $('.catalog').html(out);
        $('.add-to-cart').on('click', addToCart);
        $('.later').on('click', addToLatter);
    }
    else{
        $('.catalog').html('Товара не существует!');
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
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
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
