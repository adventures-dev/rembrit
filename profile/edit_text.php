<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	$text = $_POST['text'];
	
	mysql_query("UPDATE posts SET text = '".mysql_real_escape_string($text)."' WHERE id = '$id'")or die(mysql_error());
	
	echo true;

?>