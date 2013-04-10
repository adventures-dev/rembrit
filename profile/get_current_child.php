<?php

session_start();
$user = $_SESSION['user'];

include("../scripts/dbconnect.php");


if(isset($_POST['child']) && $_POST['child'] != null && $_POST['child'] != ""){
	$child = $_POST['child'];
	$data = mysql_query("SELECT * FROM children WHERE id = '$child'")or die(mysql_error());
	
}else{
	$data = mysql_query("SELECT * FROM children WHERE user = '$user' ORDER BY date_updated DESC LIMIT 1")or die(mysql_error());

}


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