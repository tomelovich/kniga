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
            $('#gid').val(data.id);
        }
    )
}
// function deleteBooks() {
//     var id = $('#gid').val();
//     if (id!="") {
//         $.post(
//             "core.php",
//             {
//                 "action" : "deleteBoods",
//                 "id" : id
//             },
//             function (data) {
//                 if (data==1) {
//                     alert('Запись удалена');
//                     init();
//                 }
//                 else {
//                     console.log(data);
//                 }
//             }
//         )
//     }
//     else {
//         console.log(data);
//     }
// }
function saveToDb(){
    var id = $('#gid').val();
    if (id!=""){
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
        )
    }
    else{
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
}


$(document).ready(function () {
   init();
   $('.add-to-db').on('click',saveToDb);
});