<?php
session_start();

$id = $_SESSION['user'];

include("../scripts/dbconnect.php");

//include post varibles here 
$child = $_POST['child'];
$number = $_POST['number']; //required
$limitnumber = 10; //edit limitnumber if you wish to load more

if(isset($_POST['year']) && $_POST['year'] != null && $_POST['year'] != ""){
	$month = $_POST['month'];
	$year = $_POST['year']."-".$month."-31";
	
	$data = mysql_query("SELECT profile.*, questions.question_text, answers.answer FROM profile LEFT JOIN answers ON answers.post = profile.id LEFT JOIN questions ON questions.id = answers.question WHERE profile.user = '$id' AND profile.child = '$child' AND profile.date < '$year' ORDER BY profile.date DESC, profile.datetime DESC LIMIT " . $number . ", $limitnumber") or die(mysql_error());

}else{
	$data = mysql_query("SELECT profile.*, questions.question_text, answers.answer FROM profile LEFT JOIN answers ON answers.post = profile.id LEFT JOIN questions ON questions.id = answers.question WHERE profile.user = '$id' AND profile.child = '$child'  ORDER BY profile.date DESC, profile.datetime DESC LIMIT " . $number . ", $limitnumber") or die(mysql_error());

}


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