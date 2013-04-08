<?php session_start();if(!$_SESSION['user']){header('Location: ../');}?>

<?php include("../snippets/header.php");?>


<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<div id="mainpage">
<?php include("../snippets/nav.php");?>


<!--body goes here-->
<div class="white-bg">
	<div class="container">
			<div class="row-fluid">
				<div class="span4"></div>
				<div class="span8">
						<div class="dropbox" id="dropbox">
							
							<span class="message"><i class="icon-plus-sign"></i> Drag files to upload</span>
							</div>
				</div>
			</div>
		<div class="row-fluid">
		<div class="span4 off-white-bg">
			<div id="sidefeed">
			</div>
			
		</div>
			<div class="span8 off-white-bg">
					<div class="feed" id='feed'>	
						
					</div>
			</div>
		</div>
	
	
	</div>

</div>
			
				

<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="script.js"></script>
<script src="jquery.filedrop.js"></script>	
<script src="upload.js"></script>
  


<script>


</script>
<?php include("../snippets/footer.php");?>





