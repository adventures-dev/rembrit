<?php

session_start();
include("../scripts/dbconnect.php");
$id = $_SESSION['user'];
$timezone = $_SESSION['time'];
date_default_timezone_set($timezone);

$datetime = date("Y-m-d H:i:s");
$text = $_POST['text'];
$order = $_POST['order'];

mysql_query("INSERT INTO posts (user, datetime, text, my_order) VALUES ('".mysql_real_escape_string($id)."', '".mysql_real_escape_string($datetime)."','".mysql_real_escape_string($text)."', '$order')")or die(mysql_error());

echo mysql_insert_id();


?>