<?php
	include("../scripts/dbconnect.php");
	$child = $_POST['child'];
	
	$data = mysql_query("SELECT location, location_small, location_thumb FROM profile WHERE child = '$child'")or die(mysql_error());
	
	while($info = mysql_fetch_array($data)){
		
		
		
		$location = $info['location'];
		$location_small = $info['location_small'];
		$location_thumb = $info['location_thumb'];
		
		unlink($location);
		unlink($location_small);
		unlink($location_thumb);
		

		
	}
	mysql_query("DELETE FROM profile WHERE child = '$child'")or die(mysql_error());
	mysql_query("DELETE FROM children WHERE id = '$child'")or die(mysql_error());

	
	echo true;

?>