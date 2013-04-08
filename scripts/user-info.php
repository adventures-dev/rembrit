<?php

$id = $_SESSION['user'];

$data = mysql_query("SELECT * FROM users WHERE id = '$id'")or die(mysql_error());
while($info = mysql_fetch_array($data)){
	$username = $info['username'];
	$email = $info['email'];
	$firstname = $info['firstname'];
	$lastname = $info['lastname'];
	$image = $info['image'];
	$admin = $info['admin'];
	$facebook = $info['facebook'];

}

$firstname = ucwords($firstname);
$lastname = ucwords($lastname);


if(!$image){
	$image = "../assets/img/default_pic.png";
}else if(!$facebook){
    $image = "../uploads/profile/small/".$image;
}


?>