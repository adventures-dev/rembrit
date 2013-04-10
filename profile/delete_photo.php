<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	
	$data = mysql_query("SELECT location, location_small, location_thumb FROM profile WHERE id = '$id'")or die(mysql_error());
	
	while($info = mysql_fetch_array($data)){
		
		$location = $info['location'];
		$location_small = $info['location_small'];
		$location_thumb = $info['location_thumb'];
		
		unlink($location);
		unlink($location_small);
		unlink($location_thumb);
		
	}
	
	mysql_query("DELETE FROM profile WHERE id = '$id'")or die(mysql_error());
	
	echo true;

?>