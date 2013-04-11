<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	$text = $_POST['text'];
	$milestone = $_POST['milestone'];
	
	mysql_query("UPDATE profile SET text = '".mysql_real_escape_string($text)."', milestone = '$milestone' WHERE id = '$id'")or die(mysql_error());
	
	echo true;

?>