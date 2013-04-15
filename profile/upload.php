<?php

session_start();

include("../scripts/dbconnect.php");

$name = $_FILES['image']['name'];
$size = $_FILES['image']['size'];
$tmp = $_FILES['image']['tmp_name'];
$id = $_SESSION['user'];
$child = $_POST['child'];

	$path = "../uploads/profile/images/";
	
	$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
	{
		$name = $_FILES['image']['name'];
		$size = $_FILES['image']['size'];
		
		list($width, $height) = getimagesize($_FILES['image']['tmp_name']);
		
		if(strlen($name))
		{
			if($width > 362 || $height > 362){
		
			list($txt, $ext) = explode(".", $name);
			if(in_array($ext,$valid_formats))
			{
	
					$datetime = date("Y-m-d-H-i-s");
					$actual_image_name = $id."-".$datetime.".".$ext;
					$tmp = $_FILES['image']['tmp_name'];
					if(move_uploaded_file($tmp, $path.$actual_image_name))
					{
						
						
						
						include('../scripts/SimpleImage.php');
						 $image = new SimpleImage();
						 $image->load("../uploads/profile/images/".$actual_image_name);
						
						if($width > $height){
							  $image->resizeToHeight(362);
						   $image->save("../uploads/profile/images/small/".$actual_image_name);
						   $image->resizeToHeight(100);
						   $image->save("../uploads/profile/images/thumb/".$actual_image_name);
						 
							
						}else{
							  $image->resizeToWidth(362);
						   $image->save("../uploads/profile/images/small/".$actual_image_name);
						   $image->resizeToWidth(100);
						   $image->save("../uploads/profile/images/thumb/".$actual_image_name);
						 
							
						}
						$datetime = date("Y-m-d H:i:s");
						$date = date("Y-m-d");
						mysql_query("INSERT INTO profile (user, datetime, location, location_small, location_thumb, child, date) VALUES ('".mysql_real_escape_string($id)."', '".mysql_real_escape_string($datetime)."','".mysql_real_escape_string("../uploads/profile/images/".$actual_image_name)."','".mysql_real_escape_string("../uploads/profile/images/small/".$actual_image_name)."','".mysql_real_escape_string("../uploads/profile/images/thumb/".$actual_image_name)."', '$child', '$date')")or die(mysql_error());
						
						$image_id =  mysql_insert_id();
						
						mysql_query("UPDATE children SET image = '$image_id', date_updated = '$datetime' WHERE id = '$child'")or die(mysql_error());
						
						echo $image_id;

						
						
					
						
						
						
					}
					else
						echo "failed";
	
			}
			else
				echo "Invalid file format..";
		}else
			echo "image must be greater than 400px";
		
		
		
		}
		else
			echo "Please select image..!";
		exit;
	}


?>