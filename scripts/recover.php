<?php

function generatePassword ($length=8 ) { // code to generate new password
	$password="" ;
	$possible="2346789bcdfghjkmnpqrtvwxyzBCDFGHJKLMNPQRTVWXYZ" ;
	$maxlength = strlen($possible);

	if ($length > $maxlength) {
		$length = $maxlength;
	}

	$i = 0;

	while ($i < $length) {

		$char = substr($possible, mt_rand(0, $maxlength-1), 1);

		if (!strstr($password, $char)) {
			$password .= $char;
			$i++;
		}

	}

	return $password;

}


function recover_password($username, $email){

	include("dbconnect.php");
	
	$data = mysql_query("SELECT * FROM users WHERE email = '$email ' AND username = '$username'") or die(mysql_error());

	if(mysql_num_rows($data) > 0){

		$password = generatePassword();
		$hashpassword = $password;
		$salt     = sha1(md5($hashpassword));
		$hashpassword = md5($hashpassword . $salt);

		mysql_query("UPDATE users SET password='".mysql_real_escape_string($hashpassword)."' WHERE username = '$username'") or die(mysql_error());
		
		$subject = "davestrap Password Reset";
		$body = "<h1>davestrap Password Reset</h1>
                <p>davestrap Password Reset for ".$username.".</p><p>  You have reset your password.  Here is your new temporary password:</p>
                		<h3>".$password."</h3>
                		<p>Please go to http://davestrap.com and sign in with this password.  Once you are in, you can change your password in the settings section to one of you choosing.</p> <p>Thanks!</p>
                		<p>-davestrap Team</p>";
                		
        include("contact.php");                		
        contact($subject, $body, $email);

       return "<p>An email has been sent to you with your new password.  Check your email to continue.<p>";

	}else{
		return "<p>No user found for this username and email.  Try again.</p>";
	}

	
}

?>