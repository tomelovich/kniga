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
function books() {
  $.post(
    "admin/core.php",
    {
      "action": "loadBooks"
    },
    loadBooks
  )
}
function loadBooks (data) {
  data = JSON.parse(data);
  let out =''; 
  for (var key in data) {
    out += `<a class="link_search" href="books.html#${key}">${data[key].name}</a>`      
  
  }
  $('.search_book').html(out);
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
 const liTagMe = document.querySelector('.search_book');
document.querySelector("#search_book").onfocus = function() {
  
  liTagMe.classList.add('show')
}
document.querySelector("#search_book").onblur = function() { 
  liTagMe.classList.remove('show'); 
};




document.querySelector("#search_book").oninput = function() {
  let val = this.value.trim();
  console.log(val);
  let bookItems = document.querySelectorAll('.link_search');
  console.log(bookItems);
  if (val != '') {
    bookItems.forEach(function(elem) {
      if (elem.innerText.search(RegExp(val,"gi")) == -1) {
        elem.classList.add('hide');
      }
      else {
        elem.classList.remove('hide');
      }
    });
  }
  else {
    bookItems.forEach(function(elem) {
      elem.classList.remove('hide');
    });
  }
}

$(document).ready(function () {
  init();
  books()
});