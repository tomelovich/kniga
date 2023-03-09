<?php

session_start();

if(!isset($_SESSION["session_email"])):
header("location:login.php");
else:
?>
<div id="welcome">
<h2>Добро пожаловать, <span><?php echo $_SESSION['session_email'];?>! </span></h2>
  <p><a href="logout.php">Выйти</a> из системы</p>
</div>
	
	
<?php endif; ?>