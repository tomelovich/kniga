<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="utf-8"> 
 <title> Как с помощью PHP и MySQL создать систему регистрации и авторизации пользователей</title>
<link href="./css/register.css" media="screen" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'rel='stylesheet' type='text/css'>
	</head>
	<body>
	<?php require_once("includes/connection.php"); ?>
	<?php
	
	if(isset($_POST["register"])){
	
	if(!empty($_POST['full_name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['password'])) {
  $full_name= htmlspecialchars($_POST['full_name']);
	$email=htmlspecialchars($_POST['email']);
 $password=htmlspecialchars($_POST['password']);
 $phone=htmlspecialchars($_POST['phone']);
 $n1=mysqli_connect("localhost","root","","knigabynew");
 $query =mysqli_query($n1, "SELECT * FROM users WHERE email='".$email."' AND pass='".$password."'");
  $numrows=mysqli_num_rows($query);
if($numrows==0)
   {
	$sql="INSERT INTO users (full_name, email, pass, phone_number)	VALUES('$full_name','$email', '$password', '$phone')";
  $result=mysqli_query($n1, $sql);
 if($result){
	$message = "Account Successfully Created";
} else {
 $message = "Failed to insert data information!";
  }
	} else {
	$message = "That username already exists! Please try another one!";
   }
	} else {
	$message = "All fields are required!";
	}
	}

if (!empty($message)) {
		echo '<p class="error">' . "MESSAGE: ". $message . "</p>";
	} 
 ?>
<div class="container mregister">
<div id="login">
 <h1>Регистрация</h1>
<form action="register.php" id="registerform" method="post"name="registerform">
 <p><label for="user_login">Полное имя<br>
 <input class="input" id="full_name" name="full_name"size="32"  type="text" value=""></label></p>
<p><label for="user_pass">E-mail<br>
<input class="input" id="email" name="email" size="32"type="email" value=""></label></p>
<p><label for="user_pass">Телефон<br>
<input class="input" id="phone" name="phone"size="20" type="text" value=""></label></p>
<p><label for="user_pass">Пароль<br>
<input class="input" id="password" name="password"size="32"   type="password" value=""></label></p>
<p class="submit"><input class="button" id="register" name= "register" type="submit" value="Зарегистрироваться"></p>
	  <p class="regtext">Уже зарегистрированы? <a href= "login.php">Введите имя пользователя</a>!</p>
 </form>
</div>
</div>
<footer>
© 2014 <ahref="http://www.1stwebdesigner.com/">1stwebdesigner</a>. Все права защищены.
 </footer>
</body>
</html>