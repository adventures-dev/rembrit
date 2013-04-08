<?php
	session_start();
	include("dbconnect.php");
	
	$admin = $_POST['admin'];
	$password = $_POST['password'];
	
	
	mysql_query("CREATE TABLE users( 
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id),
	username VARCHAR(50),
	firstname VARCHAR(50),
	lastname VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(50),
	image VARCHAR(50),
	admin BOOL NOT NULL,
	facebook BOOL NOT NULL)")or die(mysql_error());
	
	$salt     = sha1(md5($password));
    $password = md5($password . $salt);
	
	mysql_query("INSERT INTO users (username, password, admin) VALUES ('".mysql_real_escape_string($admin)."', '".mysql_real_escape_string($password)."', 1)")or die(mysql_error());
	
	$_SESSION['user'] = mysql_insert_id();
	

	echo true;

?>