<?php
session_start();

if(!$_SESSION['user']){
	header('Location: ../');
}
?>
<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<?php include("../snippets/menu-left.php");?>
<div id="mainpage">
<?php include("../snippets/nav.php");?>

<!--body goes here-->
	<div class="white-bg" id="section_one">
		<div class="container">
			<div class="row-fluid">
					<div class="span7">
						<p>Did you read the <a href="../page">Sample Page</a> yet?  I think you should before you read this.</p>
						<h2>Settings</h2>
						<p>Some of these pages you should probably just leave.  This is one of them.  It works pretty good in my opinion.  But I'll tell you how it works if it pleases you.  Again, look at the source code and see how everything is structured to get an idea of what I'm talking about.</p>
						
						<h4>Image Upload</h4>
						
						<p>This is a very cool Davebit.  Check it out:</p>
						<div class="row-fluid"><div class="span12"><pre><code>&#60;?php include("../snippets/upload-form.php");?&#62;</code></pre></div></div>				
						<p>This Davebit allows users to upload a photo for there profile without even leaving the page(*Note: if a user logged in with Facebook, there profile picture will show instead).  If you know anything about file uploading you got to know this is a huge time saver.  I know you don't, but I had to give you the benefit of the doubt.<p>
						<p>There are a few requirements for this function to work however.  You must include both <code>&#60;?php include("../scripts/dbconnect.php");?&#62;</code> and <code>&#60;?php include("../scripts/user-info.php");?&#62;</code> at the top of your page.  If you follow the <a href="../page">Sample Page</a> you know that this is standard, anyway.  Also, you should include <code>&#60;script src="../assets/js/ajax-upload.js"&#62;&#60;/script&#62;</code> in the other scripts area.  (see the source code!).  Each Davebit will tell you what exactly is required for it to work in the comments.  It's a pretty awesome system.</p>
						
						<h4>Settings Form</h4>
						<p>Let's take a look at the other Davebit this page utilizes:</p>
						<div class="row-fluid"><div class="span12"><pre><code>&#60;?php include("../snippets/settings-form.php");?&#62;</code></pre></div></div>
						<p>This form also needs <code>&#60;?php include("../scripts/dbconnect.php");?&#62;</code> and <code>&#60;?php include("../scripts/user-info.php");?&#62;</code> to work.  It also needs <code>&#60;script src="../assets/js/settings-validation.js"&#62;&#60;/script&#62;</code> at the bottom.  A user can edit all there information.  As long as the usernames and email do not conflict, the information changes automatically in the database (Again, this form will look different if the user logged in with facebook).  If you want more data for the user other than what is shown, you'll have to change the code yourself.  Check out the source code to see how everything works.</p>				

					</div>
					<div class="span5">
						<?php include("../snippets/upload-form.php");?>
						<?php include("../snippets/settings-form.php");?>
					</div>
				</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/menu-right.php");?>
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script src="../assets/js/settings-validation.js"></script>
<script src="../assets/js/ajax-upload.js"></script>

<script>

</script>
<?php include("../snippets/footer.php");?>