<?php
session_start();

if($_SESSION['user']){
	header('Location: ../profile');
}
?>

<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>

<div id="mainpage">
<?php include("../snippets/nav.php");?>

<!--body goes here-->
	<div class="white-bg" id="section_one">
		<div class="container">
			<div class="row-fluid">
				<div class="span7">
				</div>
				<div class="span5">
					<?php include("../snippets/register-form.php");?>
				</div>
			</div>
		</div>
	</div>
<!-- end of body -->

</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="../assets/js/login-validation.js"></script>
<script src="../assets/js/register-validation.js"></script>
<script src="../assets/js/ajax-upload.js"></script>
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