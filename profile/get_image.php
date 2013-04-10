<?php
	include("../scripts/dbconnect.php");

	$image_id = $_POST['image_id'];
	$data = mysql_query("SELECT * FROM profile WHERE id = '$image_id'")or die(mysql_error());
	
$num_rows = mysql_num_rows($data);
		
if($num_rows != 0){
	
	$array = array();
	while ($row = mysql_fetch_array($data)) {
	    $array[] = $row;
	}
	
	if (count($array) == 0) {
	    echo false;
	}
	
	$js_array = json_encode($array);
	echo $js_array;
	
}else{
	echo "false";
}
	
?>