<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	$text = $_POST['text'];
	$milestone = $_POST['milestone'];
	$date = $_POST['date'];
	$date = date("Y-m-d", strtotime($date));
	
	mysql_query("UPDATE profile SET text = '".mysql_real_escape_string($text)."', milestone = '$milestone', date = '$date' WHERE id = '$id'")or die(mysql_error());
	
	
	
	$question = $_POST['question'];
	$answer = $_POST['answer'];
	$datetime = date("Y-m-d H:i:s");
	$child = $_POST['child'];
	
	if($answer != "" && $answer != null){
	
	mysql_query("INSERT INTO answers (child, question, answer, date) VALUES ('$child', '$question', '".mysql_real_escape_string($answer)."', '$datetime')")or die(mysql_error());
	}
	echo true;

?>