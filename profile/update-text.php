<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	$text = $_POST['text'];
	$milestone = $_POST['milestone'];
	$date = $_POST['date'];
		$date = date("Y-m-d", strtotime($date));
	
	mysql_query("UPDATE profile SET text = '".mysql_real_escape_string($text)."', milestone = '$milestone', date = '$date' WHERE id = '$id'")or die(mysql_error());
	
	echo true;

?>