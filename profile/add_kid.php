<?php
	session_start();
	include("../scripts/dbconnect.php");
	
	
	$user = $_SESSION['user'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$birthday = $_POST['birthday'];
	$birthday = date('Y-m-d', strtotime($birthday));
	$datetime = date("Y-m-d H:i:s");
	
	
	mysql_query("INSERT INTO children (firstname, lastname, birthday, user, image, date_added, date_updated) VALUES ('".mysql_real_escape_string($firstname)."','".mysql_real_escape_string($lastname)."','".mysql_real_escape_string($birthday)."','".mysql_real_escape_string($user)."', '0', '$datetime', '$datetime')")or die(mysql_error());

	echo mysql_insert_id();

?>