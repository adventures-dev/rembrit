<?php

// If you want to ignore the uploaded files, 
// set $demo_mode to true;
session_start();
include("../scripts/dbconnect.php");

$allowed_ext = array('jpg','jpeg','png','gif', "mov", "mp4", "ogg", "webm");
$name = $_FILES['pic']['name'];
$size = $_FILES['pic']['size'];
$tmp = $_FILES['pic']['tmp_name'];
$id = $_SESSION['user'];
$order = $_POST['order'];

$path = "../uploads/images/";
$video_path = "../uploads/videos/";
	
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
	$video_formats = array("mov", "mp4", "ogg", "webm");

	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
	{
		$name = $_FILES['pic']['name'];
		$size = $_FILES['pic']['size'];
		
		list($width, $height) = getimagesize($_FILES['pic']['tmp_name']);
		
		if(strlen($name))
		{
					
			list($txt, $ext) = explode(".", $name);
			if(in_array($ext,$valid_formats))
			{
				if($width > 200 || $height > 200){

			
		
					$datetime = date("Y-m-d-H-i-s");
					$actual_image_name = $id."-".$datetime.".".$ext;
					$tmp = $_FILES['pic']['tmp_name'];
					if(move_uploaded_file($tmp, $path.$actual_image_name))
					{
					
						include('../scripts/SimpleImage.php');
						 $image = new SimpleImage();
						 $image->load("../uploads/images/".$actual_image_name);
						
						if($width > $height){
							
						   $image->resizeToWidth(200);
						   $image->save("../uploads/images/small/".$actual_image_name);
						   $image->resizeToWidth(100);
						   $image->save("../uploads/images/thumb/".$actual_image_name);
							
						}else{
							
						   $image->resizeToHeight(200);
						   $image->save("../uploads/images/small/".$actual_image_name);
						   $image->resizeToHeight(100);
						   $image->save("../uploads/images/thumb/".$actual_image_name);
							
						}
						$datetime = date("Y-m-d H:i:s");

						mysql_query("INSERT INTO posts (user, datetime, media, location, location_small, location_thumb, my_order) VALUES ('".mysql_real_escape_string($id)."', '".mysql_real_escape_string($datetime)."', '1', '".mysql_real_escape_string("../uploads/images/".$actual_image_name)."','".mysql_real_escape_string("../uploads/images/small/".$actual_image_name)."','".mysql_real_escape_string("../uploads/images/thumb/".$actual_image_name)."', '$order')")or die(mysql_error());
						
						
						
										echo mysql_insert_id();
					}
					else
						exit_status("failed");
		
			}else
				exit_status(  "image must be greater than 200px");
			}else if(in_array($ext,$video_formats))
			{
				$datetime = date("Y-m-d-H-i-s");
					$actual_image_name = $id."-".$datetime.".".$ext;
					$tmp = $_FILES['pic']['tmp_name'];

						if(move_uploaded_file($tmp, $video_path.$actual_image_name)){

								$datetime = date("Y-m-d-H-i-s");
								$actual_image_name = $id."-".$datetime.".".$ext;
								$tmp = $_FILES['pic']['tmp_name'];
				
								$datetime = date("Y-m-d H:i:s");

								mysql_query("INSERT INTO posts (user, datetime, video, location, my_order) VALUES ('".mysql_real_escape_string($id)."', '".mysql_real_escape_string($datetime)."', '1', '".mysql_real_escape_string("../uploads/videos/".$actual_image_name)."', '$order')")or die(mysql_error());

										echo mysql_insert_id();
										
						}else{
							exit_status("failed");

						}

			}
			else
				exit_status(  "Invalid file format..");
		
		
		
		
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