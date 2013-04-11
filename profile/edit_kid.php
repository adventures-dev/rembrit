<?php
	include("../scripts/dbconnect.php");
	
	$child = $_POST['child'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$birthday = $_POST['birthday'];
	$birthday = date('Y-m-d', strtotime($birthday));
	$datetime = date("Y-m-d H:i:s");
	
	
	mysql_query("UPDATE children SET firstname = '".mysql_real_escape_string($firstname)."', lastname = '".mysql_real_escape_string($lastname)."', birthday = '".mysql_real_escape_string($birthday)."' WHERE id = '$child'")or die(mysql_error());


	echo true;

?>