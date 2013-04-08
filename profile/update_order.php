<?php

include("../scripts/dbconnect.php");

$order_string = $_POST['order_string'];

$order_array = explode("&", $order_string);

for($i = 0; $i<count($order_array); $i++){
	
	
	list($id, $order) = explode("=" , $order_array[$i]);
	
	mysql_query("UPDATE posts SET my_order = '$order' WHERE id='$id'")or die(mysql_error());
	
	
}



?>