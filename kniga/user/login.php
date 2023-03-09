<?php
	session_start();
	?>

	<?php require_once("includes/connection.php"); ?> 
	<?php
	
	if(isset($_SESSION["session_email"])){
	// вывод "Session is set"; // в целях проверки
	header("Location: intropage.php");
	}

	if(isset($_POST["login"])){

	if(!empty($_POST['email']) && !empty($_POST['password'])) {
	$email=htmlspecialchars($_POST['email']);
	$password=htmlspecialchars($_POST['password']);
	$n1=mysqli_connect("localhost","root","","knigabynew");
	$query =mysqli_query($n1, "SELECT * FROM users WHERE email='".$email."' AND pass='".$password."'");
	$numrows=mysqli_num_rows($query);
	if($numrows!=0)
 {
while($row=mysqli_fetch_assoc($query))
 {
	$dbemail=$row['email'];
  $dbpassword=$row['pass'];
 }
  if($email == $dbemail && $password == $dbpassword)
 {
	// старое место расположения
	//  session_start();
	 $_SESSION['session_email']=$email;	 
 /* Перенаправление браузера */
   header("Location: intropage.php");
	}
	} else {
	//  $message = "Invalid email or password!";
	
	echo  "Invalid email or password!";
 }
	} else {
    $message = "All fields are required!";
	}
	}
	?>
<!DOCTYPE html>
	<html lang="en">
	<head>
<meta charset="utf-8">
<title> Как с помощью PHP и MySQL создать систему регистрации и авторизации пользователей</title>
<link href="./css/register.css" media="screen" rel="stylesheet">
<link href= 'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
</head> 
<body>
<div class="container mlogin">
<div id="login">
<h1>Вход</h1>
<form action="" id="loginform" method="post"name="loginform">
<p><label for="user_login">Почта<br>
<input class="input" id="email" name="email"size="20"
type="text" value=""></label></p>
<p><label for="user_pass">Пароль<br>
 <input class="input" id="password" name="password"size="20"
  type="password" value=""></label></p> 
	<p class="submit"><input class="button" name="login"type= "submit" value="Log In"></p>
	<p class="regtext">Еще не зарегистрированы?<a href= "register.php">Регистрация</a>!</p>
   </form>
 </div>
  </div>
<footer>
© 2014 <ahref="http://www.1stwebdesigner.com/">1stwebdesigner</a>. Все права защищены.

</footer>
</body>
</html>