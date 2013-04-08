<?php
session_start();
include('dbconnect.php');

$username = $_POST['username'];
$password = $_POST['password'];

if ($username && $password) {
    $username = strtolower($username);
    $query = mysql_query("SELECT * FROM users WHERE username = '$username' AND facebook != 1") or die(mysql_error());
    
    $numrows = mysql_num_rows($query);
    
    if ($numrows != 0) {
        //code to login
        while ($row = mysql_fetch_assoc($query)) {
            $dbusername = $row['username'];
            $dbpassword = $row['password'];
            $id = $row['id'];
        }
        
        $salt     = sha1(md5($password));
        $password = md5($password . $salt);
        //check to see if they match!
        if ($username == $dbusername && $password == $dbpassword) {
            $_SESSION['user'] = $id;
            
            echo true;
            
        } else {
            $error = "Incorrect password!";
            echo $error;
        }
        
    } else {
        $error = "That user doesn't exist!";
        echo $error;
    }
    
} else {
    $error = "Please enter a username and password";
    echo $error;
    
}
?>