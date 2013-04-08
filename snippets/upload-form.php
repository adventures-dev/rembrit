<form id="imageform" class="<?php if($facebook){echo "hide";}?>" method="post" enctype="multipart/form-data" action='../scripts/upload.php'>
Profile Image: <input type="file" name="image" id="image" />
</form>

<div id='preview'>
	
	<img src="<?php echo $image;?>" class="preview">
</div>