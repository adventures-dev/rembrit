<?php session_start();
if(!$_SESSION['user']){
header('Location: ../');
}?>

<?php include("../snippets/header.php");?>

<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<div id="mainpage">
<?php include("../snippets/nav.php");?>

<div id="all" class="hide">
<div class="overlay" id="overlay" style="display:none;"></div>
 
<div class="box" id="new_kid_box">
	 <a class="boxclose" id="new_kid_close"></a>
	 <h2>New Kid</h2>
	 <div class="row-fluid">
	 	<div class="span6">
	 		<h4>You've been busy?</h4>
	 		<p>A new kid and a new journey.  Add your child's basic information here.</p>
	 	</div>
	 	<div class="span6">
	 		
	 		<form action="" method="POST" id="new_kid_form">
	 		<div id="new_kid_form_error"></div>
	 			<input class="input-block-level" type="text" id="firstname" name="firstname" placeholder="First Name">
	 			<input class="input-block-level" type="text" id="lastname" name="lastname" placeholder="Last Name">
	 			<input class="input-block-level" type="text" id="birthday" name="birthday" placeholder="Birthday (mm/dd/yyyy)">
	 			
	 			<input class="btn btn-success" type="submit" value="Add">
	 		</form>
	 	</div>
	 </div>
</div>
 
<div class="box" id="edit_kid_box">
	 <a class="boxclose" id="edit_kid_close"></a>
	 <h2>Edit Kid</h2>
	 <div class="row-fluid">
	 	<div class="span6">
	 		<p>Sometimes kids change their name, sometimes you forget their birthday. Either way we got you.  You can even get rid of your kids when you're tired of them.</p>
	 						<button class="btn btn-danger btn-large input-block-level" id ="delete_kid_button">Delete Kid</button>

	 	</div>
	 	<div class="span6">
	 		
	 		<form action="" method="POST" id="edit_kid_form">
	 		<div id="edit_kid_form_error"></div>
	 			<input class="input-block-level" type="text" id="edit_firstname" name="edit_firstname" placeholder="First Name">
	 			<input class="input-block-level" type="text" id="edit_lastname" name="edit_lastname" placeholder="Last Name">
	 			<input class="input-block-level" type="text" id="edit_birthday" name="edit_birthday" placeholder="Birthday (mm/dd/yyyy)">
	 			
	 			<input class="btn btn-success" type="submit" value="Edit">
	 		</form>
	 	</div>
	 </div>
</div>


<div class="box" id="new_photo_box">
	 <a class="boxclose" id="new_photo_close"></a>
	 <h2>Add Photo</h2>
	 <div class="row-fluid">
	 	<div class="span6">
	 		<h4>Upload</h4>
	 		<p>Select a photo to upload!</p>
	 		<form id="imageform" method="post" enctype="multipart/form-data" action='upload.php'>
		 		Image: <input type="file" name="image" id="image" />
		 	</form>

	 		
	 		
	 	</div>
	 	<div class="span6">
	 	
	 		<div class="dropbox" id="new_photo_dropbox">		
				<span class="message"><i class="icon-plus-sign"></i> Drag file to upload</span>
			</div>
	 		
	 		
	 	</div>
	 </div>
</div>

<div class="box" id="add_text_box">
	 <a class="boxclose" id="text_close"></a>
	 <h2>Add Text</h2>
	 <div class="row-fluid">
	 	<div class="span6">
	 		<p>Tell us what happened!  A picture is worth a thousand words, but write something anyway.</p>
	 	</div>
	 	<div class="span6">
	 	<!--<select id='milestone_select' class="input-block-level" name='milestone'></select>-->
	 	<input class="input-block-level" type="text" id="date_change" name="date_change" placeholder="(mm/dd/yyyy)">


	 	<textarea class='input-block-level'id="question_textarea" placeholder=""></textarea>
	 	<input type="hidden" id="question_value">
	 	<textarea class='input-block-level'id="add_textarea" placeholder="What is your kid doing?"></textarea><button class='btn' id="add_text_button">Add Story</button></div>
	 	
	 		
	 		
	 	</div>
</div>


<div class="box" id="image_box">
	 <a class="boxclose" id="image_box_close"></a>
	 <div class="row-fluid">
	 	 	<div id="display_image" class="center" style="width:100%;">
	 	 	
	 	 	</div>
	 </div>
</div>

<!--body goes here-->
<div class="white-bg">
	<div class="container">

		<div class="row-fluid">
		<div class="span1" id='timeline'></div>
		<div class="span1" id='myline'>
			
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<circle id='top_circle' cx='30' cy='18' r='7'stroke-width='2' fill='#24595f' /> 
				<line id='line' x1="30" y1="20" x2="30" y2="362"/>
				<circle id='bottom_circle' cx='30' cy='362' r='7'stroke-width='2' fill='#24595f' />

  			</svg>
			
		</div>
		
			<div class="span7">
		
					<div class="feed" id='feed'>	

						
					</div>
			</div>
			<div class="span3" id='info' >
	

				
									<div class="row-fluid">

					<div class="span6">
					<div class="image-container" id='profile_pic' style="width:100px;height:100px;">
						

						
					</div>
					</div>
					<div class="span6">
						<div id='child_name'></div>
						<div id='child_birthday'></div>

					</div>
					</div>
														<div class="row-fluid">
															<div class="span12">
						<div id="all_kids">
		
						</div>
			
						
						
						</div>
														</div>
														
																								<div class="row-fluid">
															<div class="span12">
		
							<div id="all_milestones">
		
						</div>
							<div id="recent_questions">
		
						</div>
						
						</div>
														</div>

			
			
				<hr>		
				
	</div>

		</div>
	
	
	</div>

</div>
</div>
				

<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="../assets/js/image-container.js"></script>	

<script src="jquery.filedrop.js"></script>
<script src="script.js"></script>

<script src="upload.js"></script>




<script>


</script>
<?php include("../snippets/footer.php");?>





