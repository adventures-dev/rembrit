<?php

include("../scripts/dbconnect.php");
$id = $_POST['id'];

mysql_query("UPDATE users SET admin = 1 WHERE id = '$id'")or die(mysql_error());

echo true;

?>