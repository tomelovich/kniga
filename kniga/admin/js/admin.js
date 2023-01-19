function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showBooks
    );
}

function showBooks(data) {
    data = JSON.parse(data);
    var out='<select>';
    out +='<option data-id="0">Новый товар</option>';
    for (var id in data) {
        out +=`<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    
    var startText = '/img/obl/';
    var gimg = $('.gimg');

    gimg.focus(function(){
		if(gimg.val() === '') {
    	gimg.val('').val(startText);
    }
    gimg.blur(function(){
        if (gimg.val() === startText){
            gimg.val('');
        }
    });
    gimg.on('input change', function(){
        console.log(gimg.val());
      var oldValue = gimg.val();
      var newValue = startText;
      if (oldValue.length > startText.length) {
        for (var i = startText.length; i <= oldValue.length; i++) {
            if (typeof oldValue[i] !== 'undefined') {
              newValue = newValue + oldValue[i];
          }
        }
      }
      gimg.val(newValue);
    });
});
    $('.books-out').html(out);
    $('.books-out select').on('change', selectBooks);
}

function selectBooks(){
    var id = $('.books-out select option:selected').attr('data-id');
    $.post(
        "core.php",
        {
            "action": "selectOneBooks",
            "gid": id
        },
        function(data){
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gauthor').val(data.author);
            $('#gprice').val(data.price);
            $('#gdescr').val(data.description);
            $('#gorder').val(data.ord);
            $('#gimg').val(data.img);
            $('#gtype').val(data.type);
            $('#gnumb').val(data.numb);
            $('#gid').val(data.id);
            if (data == 1) {
                alert("Информация обновлена")
                init();
            }
            else {
                console.log(data);
            }
           
        }
    )
}
function deleteBooks() {
    
    var id = $('#gid').val();
    if (id!="") {
        $.post(
            "core.php",
            {
                "action" : "deleteBoods",
                "gid" : id
            },
            function (data) {
                if (data==1) {
                    alert('Товар удалён');
                    init();
                }
                else {
                    console.log(data);
                }
            }
        )
    }
    else {
        console.log(data);
    }
}
function saveToDb(){
    var id = $('#gid').val();
    
        $.post(
            "core.php",
            {
                "action": "newBooks",
                "id": 0,
                "gname": $('#gname').val(),
                "gauthor":$('#gauthor').val(),
                "gprice":$('#gprice').val(),
                "gdescr":$('#gdescr').val(),
                "gorder":$('#gorder').val(),
                "gimg":$('#gimg').val(),
                "gtype":$('#gtype').val(),
                "gnumb":$('#gnumb').val(),
                "gid":$('#gid').val()
            },
            function(data){
                if (data == 1) {
                    alert('Запись добавлена')
                    init();
                }
                else {
                    console.log(data);
                }
            }
        );
    
}
function updateDb() {
    var id = $('#gid').val();
    $.post(
        "core.php",
        {
            "action": "updateBooks",
            "id": id,
            "gname": $('#gname').val(),
            "gauthor":$('#gauthor').val(),
            "gprice":$('#gprice').val(),
            "gdescr":$('#gdescr').val(),
            "gorder":$('#gorder').val(),
            "gimg":$('#gimg').val(),
            "gtype":$('#gtype').val(),
            "gnumb":$('#gnumb').val(),
            "gid":$('#gid').val()
        },
        function(data){
            if (data == 1) {
                alert('Информация обновлена')
                init();
            }
            else {
                console.log(data);
            }
        }
    )
}

$(document).ready(function () {
   init();
   $('.add-to-db').on('click', saveToDb);
   $('.delete-from-db').on('click', deleteBooks);
   $('.update').on('click', updateDb);
});