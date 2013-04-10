<?php
session_start();

$id = $_SESSION['user'];
$child = $_POST['child'];
include("../scripts/dbconnect.php");

$data = mysql_query("SELECT * FROM children WHERE user = '$id' AND id != '$child' ORDER BY birthday") or die(mysql_error());

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