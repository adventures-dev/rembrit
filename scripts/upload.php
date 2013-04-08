<?php

session_start();

include("dbconnect.php");

$name = $_FILES['image']['name'];
$size = $_FILES['image']['size'];
$tmp = $_FILES['image']['tmp_name'];
$id = $_SESSION['user'];

	$path = "../uploads/profile/";
	
	$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
	{
		$name = $_FILES['image']['name'];
		$size = $_FILES['image']['size'];
		
		list($width, $height) = getimagesize($_FILES['image']['tmp_name']);
		
		if(strlen($name))
		{
			if($width > 500 || $height > 400){
		
			list($txt, $ext) = explode(".", $name);
			if(in_array($ext,$valid_formats))
			{
				if($size<(1024*1024)) // Image size max 1 MB
					{
					$actual_image_name = $id.".".$ext;
					$tmp = $_FILES['image']['tmp_name'];
					if(move_uploaded_file($tmp, $path.$actual_image_name))
					{
						mysql_query("UPDATE users SET image = '$actual_image_name' WHERE id ='$id'")or die(mysql_error());
						
						
						
						include('SimpleImage.php');
						 $image = new SimpleImage();
						 $image->load("../uploads/profile/".$actual_image_name);
						
						if($width > $height){
							
						   $image->resizeToWidth(400);
						   $image->save("../uploads/profile/small/".$actual_image_name);
						   $image->resizeToWidth(200);
						   $image->save("../uploads/profile/thumb/".$actual_image_name);
							
						}else{
							
						   $image->resizeToHeight(400);
						   $image->save("../uploads/profile/small/".$actual_image_name);
						   $image->resizeToHeight(200);
						   $image->save("../uploads/profile/thumb/".$actual_image_name);
							
						}
					
						
						
						
						echo "<img src='../uploads/profile/small/".$actual_image_name."' class='preview'>";
					}
					else
						echo "failed";
				}
				else
					echo "Image file size max 1 MB";
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