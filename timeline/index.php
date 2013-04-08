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
					<div class="span6 feed" id='feed1'>	
					
							<div class="textbox hide" id="textbox1"><textarea id="area1" class="input-block-level" rows="5" name="text" placeholder="input text here"></textarea></div>

							<div class="dropbox" id="dropbox1">
							
							<span class="message"><i class="icon-plus-sign"></i> Drag files to upload<br>or click to type</span>
							</div>
																									

					</div>
					<div class="span6 feed" id='feed2'>	
						<div class="textbox hide" id="textbox2"><textarea id="area2" class="input-block-level" rows="5" name="text" placeholder="input text here"></textarea></div>
			
						<div class="dropbox hide" id="dropbox2">

							<span class="message"><i class="icon-plus-sign"></i> Drag files to upload or click to type<br /></span>

						</div>
					</div>
					
					
				</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="jquery.hoverIntent.minified.js"></script>
<script src="script.js"></script>
 <script src="text-input.js"></script>
<script src="jquery.filedrop.js"></script>	
<script src="upload.js"></script>
  
<script>

</script>
<?php include("../snippets/footer.php");?>

