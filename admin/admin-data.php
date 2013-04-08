<?php
include("../scripts/dbconnect.php");

//include post varibles here 
$number = $_POST['number']; //required
$limitnumber = 25; //edit limitnumber if you wish to load more

$data = mysql_query("SELECT * FROM users WHERE admin != 1 ORDER BY username LIMIT " . $number . ", $limitnumber") or die(mysql_error());

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