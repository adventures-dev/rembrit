<?php
session_start();

if($_SESSION['user']){
	header('Location: ../profile');
}
?>

<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>
<?php include("../snippets/menu-left.php");?>

<div id="mainpage">

<?php include("../snippets/nav.php");?>

<!--body goes here-->
	<div class="white-bg" id="section_one">
		<div class="container">
			<div class="row-fluid">
				<div class="span7">
					<h2>Password Recovery</h2>
					<p>As I said on the landing page, you need to use <a href="http://aws.amazon.com/ses/">Amazon's Simple Email Service</a> in order for Password Recovery to work.  If you are a cheapskate and cannot afford 1 cent per email, just delete this page and don't talk to me again.  F&%@ your user's passwords.  They don't need them.</p>
					
					<h4>Just one Davebit</h4>
					<p>If you've been browse around the documentation, you probably get the gist of it.  This page uses only one unique Davebit:
					<div class="row-fluid"><div class="span12"><pre><code>&#60;?php include("../snippets/recover-form.php");?&#62;</code></pre></div></div>			
					<p>Just make sure you include: <code>&#60;?php include("../scripts/dbconnect.php");?&#62;</code> at the top of the page to make it work.</p>
				</div>
				<div class="span5">
					<?php include("../snippets/recover-form.php");?>
				</div>
			</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="../assets/js/login-validation.js" type="text/javascript"></script>
<?php if($use_facebook){ include("../scripts/facebook-js.php");}?>

<script>
	 $("#loginbutton").click(function(){
        if($("#side-login").hasClass("hide")){
            $("#side-login").slideDown();
            $("#side-login").removeClass("hide");
        }else{
            $("#side-login").slideUp();
            $("#side-login").addClass("hide");

        }
    });
    

</script>
<?php include("../snippets/footer.php");?>