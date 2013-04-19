<?php

include("../scripts/dbconnect.php");

$child = $_POST['child'];

$data = mysql_query("SELECT answers.answer, questions.question_text FROM answers LEFT JOIN questions ON questions.id = answers.question WHERE answers.child='$child' ORDER BY answers.date DESC LIMIT 5") or die(mysql_error());

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