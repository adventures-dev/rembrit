<?php
function contact($subject, $body, $email)
{
    include("config.php");
    
    $from    = $sesemail;
 
    include_once('ses.php');
    $con = new SimpleEmailService($accesskey, $secretkey);
    $con->listVerifiedEmailAddresses();
    
    $m = new SimpleEmailServiceMessage();
    $m->addTo($email);
    $m->setFrom($from);
    $m->setSubject($subject);
    $m->setMessageFromString(null, $body);
    $con->sendEmail($m);
    
    return true;
}
?>
