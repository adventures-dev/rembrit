<?php
session_start();

$id = $_SESSION['user'];

include("../scripts/dbconnect.php");

//include post varibles here 
$child = $_POST['child'];
$number = $_POST['number']; //required
$limitnumber = 24; //edit limitnumber if you wish to load more

if(isset($_POST['year']) && $_POST['year'] != null && $_POST['year'] != ""){
	$month = $_POST['month'];
	$year = $_POST['year']."-".$month."-31";


	$data = mysql_query("SELECT * FROM profile WHERE user = '$id' AND child = '$child' AND date < '$year' ORDER BY date DESC, datetime DESC LIMIT " . $number . ", $limitnumber") or die(mysql_error());

}else{
	$data = mysql_query("SELECT * FROM profile WHERE user = '$id' AND child = '$child' ORDER BY date DESC, datetime DESC LIMIT " . $number . ", $limitnumber") or die(mysql_error());

}


$array = array();
while ($row = mysql_fetch_array($data)) {
    $array[] = $row;
}

if (count($array) == 0) {
    echo false;
}

$js_array = json_encode($array);
echo $js_array;


?>