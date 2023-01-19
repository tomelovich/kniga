<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "knigaby";

function connect(){
    $conn = mysqli_connect("localhost", "root", "", "knigaby");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT book_id, name FROM books";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["book_id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function loadManga(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT book_id, name FROM books WHERE type = 'manga' ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function loadBook(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT book_id, name FROM books WHERE type = 'book' ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["book_id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function loadComics(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT book_id, name FROM books WHERE type = 'comics' ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["book_id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function selectOneBooks(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM books WHERE book_id= '$id'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $out[$row["book_id"]] = $row;
        
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function updateBooks(){
    $conn = connect();
    $id = $_POST['gid'];
    $name = $_POST['gname'];
    $author = $_POST['gauthor'];
    $price = $_POST['gprice'];
    $ord = $_POST['gorder'];
    $descr = $_POST['gdescr'];
    $img = $_POST['gimg'];
    $type = $_POST['gtype'];
    $numb = $_POST['gnumb'];
  //  $sql = "REPLACE (name = '$name', author = '$author', price = '$price', ord = '$ord', description = '$descr', img = '$img', type = '$type', number = '$type' ) FROM books WHERE book_id='$id' ";
    $sql = "UPDATE books SET name = '$name', author = '$author', price = '$price', ord = '$ord', description = '$descr', img = '$img', type = '$type' number_books = '$numb' WHERE book_id='$id' ";
    if ($conn->query($sql) === TRUE) {
        echo "1";
    } else {
        echo "Ошибка обновления записи: " . $conn->error;
    }
    mysqli_close($conn);
    // writeJSON();
}
function newBooks(){
    $conn = connect();
    $name = $_POST['gname'];
    $author = $_POST['gauthor'];
    $price = $_POST['gprice'];
    $ord = $_POST['gorder'];
    $descr = $_POST['gdescr'];
    $img = $_POST['gimg'];
    $type = $_POST['gtype'];
    $numb = $_POST['gnumb'];
    $sql = "INSERT INTO books (name, author, price, ord, description, img, type, number_books) VALUES ('$name', '$author', '$price', '$ord', '$descr','$img', '$type', '$numb')";

    if (mysqli_query($conn, $sql)) {
    echo "Успешно создана новая запись";
    } else {
    echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
    // writeJSON();
}
function deleteBooks() {
    $conn = connect();
    $id = $_POST['gid'];

    $sql = "DELETE FROM books WHERE book_id = '$id' ";

    if ($conn->query($sql) === TRUE) {
        echo "1";
    } else {
        echo "Ошибка удаления товара: " . $conn->error;
    }

    mysqli_close($conn);
}

function loadBooks() {
    $conn = connect();
    $sql = "SELECT * FROM books";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["book_id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
;}
function loadSingleBooks() {
    $id = $_POST['id'];
    $conn = connect();
    $sql = "SELECT * FROM books WHERE book_id='$id' ";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
;}
function registration(){
    $conn = connect();
    $email = $_POST['email'];
    $password = $_POST['epassword'];
    
    $sql = "INSERT INTO users (email, pass) VALUES ('$email', '$password')";

    if (mysqli_query($conn, $sql)) {
    echo "Успешно создана новая запись";
    } else {
    echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}
function authorization(){
    $conn = connect();
    $email = $_POST['email'];
    $password = $_POST['epassword'];
    
    $sql = 'SELECT*FROM users WHERE email="'.$email.'" AND pass="'.$password.'"';

    $result = mysqli_query($conn, $sql); //ответ базы запишем в переменную $result
	$user = mysqli_fetch_assoc($result);
        if (!empty($user)) {
			echo "Вы авторизованы";
		} else {
			echo "Вы не авторизованы";
		}
    mysqli_close($conn);
}


