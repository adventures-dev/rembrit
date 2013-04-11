<?php

include("../scripts/dbconnect.php");

$data = mysql_query("SELECT * FROM milestones ORDER BY name") or die(mysql_error());

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