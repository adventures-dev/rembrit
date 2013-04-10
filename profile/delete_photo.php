<?php
	include("../scripts/dbconnect.php");
	$id = $_POST['id'];
	$child = $_POST['child'];
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

	$profile_pic_data = mysql_query("SELECT image FROM children WHERE id='$child' AND image = '$id'")or die(mysql_error());
	
	$num_rows = mysql_num_rows($profile_pic_data);
	
	if($num_rows != 0){
		$more_data = mysql_query("SELECT id FROM profile WHERE child = '$child' ORDER BY datetime DESC LIMIT 1")or die(mysql_error());
		$more_data_num_rows = mysql_num_rows($more_data);
			if($more_data_num_rows != 0){
				while($info = mysql_fetch_array($more_data)){
					$new_image = $info['id'];
					
				}
				mysql_query("UPDATE children SET image = '$new_image' WHERE id = '$child'")or die(mysql_error());

			}else{
				mysql_query("UPDATE children SET image = '0' WHERE id = '$child'")or die(mysql_error());
				
				
			}
		
	}
	
	
	
	echo true;

?>