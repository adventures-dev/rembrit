<?php
include("../scripts/dbconnect.php");
$child = $_POST['child'];

$data = mysql_query("SELECT date FROM profile WHERE child='$child' ORDER BY date ASC LIMIT 1")or die(mysql_error());

while($info = mysql_fetch_array($data)){
	$date = $info['date'];
}

echo $date;

?>