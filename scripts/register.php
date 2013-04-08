<?php
session_start();
include('dbconnect.php');

$username  = $_POST['username'];
$password  = $_POST['password'];
$firstname = $_POST['firstname'];
$lastname  = $_POST['lastname'];
$email     = $_POST['email'];



if ($username && $password && $firstname && $lastname && $email) {
	$username = strtolower($username);

	$query = mysql_query("SELECT * FROM users WHERE username = '$username'") or die(mysql_error());

	$numrows = mysql_num_rows($query);

	if ($numrows != 0) {

		$error = "Username already taken";
		echo $error;
	} else {
		$email = strtolower($email);

		$query = mysql_query("SELECT * FROM users WHERE email = '$email'") or die(mysql_error());

		$numrows = mysql_num_rows($query);

		if ($numrows != 0) {

			$error = "Email already in use";
			echo $error;
		}else{


			$salt     = sha1(md5($password));
			$password = md5($password . $salt);

			$data = mysql_query("INSERT INTO users (username, password, firstname, lastname, email)
                VALUES ('$username','$password','$firstname','$lastname', '$email')") or die(mysql_error());

			$_SESSION['user'] = mysql_insert_id();
			
			/* //OPTIONAL MAILCHIMP FORM
			include("../scripts/mailchimp.php");
			mailchimp($firstName, $lastName, $email);
			*/
			echo true;
		}

	}
} else {
	$error = "Please enter all information";
	echo $error;
}



?>
