<?php
session_start();
include('dbconnect.php');

$username  = $_POST['username'];
$firstname = $_POST['firstname'];
$lastname  = $_POST['lastname'];
$image  = $_POST['image'];

if ($username && $firstname && $lastname) {
	$username = strtolower($username);

	$query = mysql_query("SELECT id FROM users WHERE username = '$username' AND facebook = 1") or die(mysql_error());

	$numrows = mysql_num_rows($query);

	if ($numrows != 0) {
		
		while($info = mysql_fetch_array($query)){
			$_SESSION['user'] = $info['id'];
		}
		
		echo true;
		
	} else {

			$data = mysql_query("INSERT INTO users (username, firstname, lastname, image, facebook)
                VALUES ('$username','$firstname','$lastname', '$image', '1')") or die(mysql_error());

			$_SESSION['user'] = mysql_insert_id();

			echo true;
		

	}
} else {
	$error = "Please enter all information";
	echo $error;
}



?>
