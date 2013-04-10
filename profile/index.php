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
				<div class="span3"></div>
				<div class="span6">
						<div class="dropbox" id="dropbox">
							
							<span class="message"><i class="icon-plus-sign"></i> Drag files to upload</span>
							</div>
				</div>
				<div class="span3"></div>

			</div>
		<div class="row-fluid">
			<div class="span9">
		
					<div class="feed" id='feed'>	
						
					</div>
			</div>
			<div class="span3">
				
				<h4>Info</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><hr>
				
				<h4>Info</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><hr>
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
<script src="../assets/js/image-container.js"></script>	
  


<script>


</script>
<?php include("../snippets/footer.php");?>





