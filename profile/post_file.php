<?php

// If you want to ignore the uploaded files, 
// set $demo_mode to true;
session_start();
include("../scripts/dbconnect.php");

$allowed_ext = array('jpg','jpeg','png','gif');
$name = $_FILES['pic']['name'];
$size = $_FILES['pic']['size'];
$tmp = $_FILES['pic']['tmp_name'];
$id = $_SESSION['user'];
$child = $_POST['child'];

$path = "../uploads/profile/images/";
	
if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}

if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){
	
	$pic = $_FILES['pic'];

	if(!in_array(get_extension($pic['name']),$allowed_ext)){
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}	

	// Move the uploaded file from the temporary 
	// directory to the uploads folder:

	$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");

	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
	{
		$name = $_FILES['pic']['name'];
		$size = $_FILES['pic']['size'];
		
		list($width, $height) = getimagesize($_FILES['pic']['tmp_name']);
		
		if(strlen($name))
		{
					
			list($txt, $ext) = explode(".", $name);

				if($width > 362 || $height > 362){

			
		
					$datetime = date("Y-m-d-H-i-s");
					$actual_image_name = $id."-".$datetime.".".$ext;
					$tmp = $_FILES['pic']['tmp_name'];
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
						exit_status("failed");
		
			}else
				exit_status(  "image must be greater than 362px");

		
		
		
		}
		else
			exit_status( "Please select image..!");
		exit;
	}



	
}

exit_status('Something went wrong with your upload!');


// Helper functions

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}

function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}
?>