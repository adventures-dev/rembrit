<?php
session_start();

if(!$_SESSION['user']){
	header('Location: ../');
}
?>
<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<div id="mainpage">
<?php include("../snippets/nav.php");?>

<!--body goes here-->
	<div class="white-bg" id="section_one">
		<div class="container">
			<div class="row-fluid">
					<div class="span3"></div>
					<div class="span6">
						<?php include("../snippets/upload-form.php");?>
						<?php include("../snippets/settings-form.php");?>
					</div>
					<div class="span3"></div>

				</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="../assets/js/settings-validation.js"></script>
<script src="../assets/js/ajax-upload.js"></script>

<script>

</script>
<?php include("../snippets/footer.php");?>