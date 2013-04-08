<?php
session_start();

$id = $_SESSION['user'];

include("../scripts/dbconnect.php");

//include post varibles here 
$number = $_POST['number']; //required
$limitnumber = 24; //edit limitnumber if you wish to load more

$data = mysql_query("SELECT * FROM posts WHERE user = '$id' ORDER BY my_order DESC LIMIT " . $number . ", $limitnumber") or die(mysql_error());

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