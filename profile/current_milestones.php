<?php

include("../scripts/dbconnect.php");

$child = $_POST['child'];

$data = mysql_query("SELECT milestone, id FROM profile WHERE child='$child' ORDER BY datetime DESC") or die(mysql_error());

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