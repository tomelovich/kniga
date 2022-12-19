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
    $sql = "SELECT id, name FROM books";
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
function loadManga(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM books WHERE type = 'manga' ";
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
function loadAll(){
    $conn = connect();
    $sql = "SELECT id, name FROM books WHERE type = 'book' OR type = 'manga' OR type = 'comics'";
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
    $sql = "SELECT id, name FROM books WHERE type = 'book' ";
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
function loadComics(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM books WHERE type = 'comics' ";
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
function selectOneBooks(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM books WHERE id= '$id'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $out[$row["id"]] = $row;
        
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
    $sql = "UPDATE books SET name = '$name', author = '$author', price = '$price', ord = '$ord', description = '$descr', img = '$img', type = '$type' WHERE id='$id' ";
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
    $sql = "INSERT INTO books (name, author, price, ord, description, img, type) VALUES ('$name', '$author', '$price', '$ord', '$descr','$img',  '$type')";

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

    $sql = "DELETE FROM books WHERE id = '$id' ";

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
            $out[$row["id"]] = $row;
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
    $sql = "SELECT * FROM books WHERE id='$id' ";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
;}



