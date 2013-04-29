<?php
	
	include("../config.php");
	include("../scripts/dbconnect.php");
	include("../scripts/contact.php");
	
	$data = mysql_query("SELECT email, firstname, lastname FROM users")or die(mysql_error());

	while($info = mysql_fetch_array($data)){
		
		$user_email = $info['email'];
		$firstname = $info['firstname'];
		$lastname = $info['lastname'];
		
		$user_subject = 'Rembr.it Weekly Reminder';
		$user_body = "<h1>Rembr.it Weekly Reminder</h1>
                		<p>Rembr.it Weekly Reminder for ".$firstname." ".$lastname.".</p>               	
                		<p>Log in to <a href='http://rembr.it'>Rembr.it</a> and Update us on your child.</p>
                		<p>-Rembr.it Team</p>";
		contact($user_subject, $user_body, $user_email);
		
	}

?>