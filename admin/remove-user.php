<?php

include("../scripts/dbconnect.php");
$id = $_POST['id'];

mysql_query("DELETE FROM users WHERE id = '$id'")or die(mysql_error());


echo true;

?>