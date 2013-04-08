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


<style>
	.image-container{
		width: 100px;
		height: 100px;
		text-align: center;
	}

</style>

<!--body goes here-->
	<div class="white-bg">
		<div class="container">
			<div class="row-fluid">
				<div class="span6">
				
				<h2>Congrats!</h2>
				<p>You made it to your profile!  That means a.) you've set up your database tables and b.) you created an admin for your site!  And you did it all by yourself, too.  No help whatsoever...</p>
				
				<h4>Profile Page</h4>
				<p>This is the where people will be directed to when they are logged in.  It is located in the <code>index.php</code> within the <code>/profile</code> folder in the Davestrap contents.  To the right I am displaying your basic information.  If you are just creating this site you can see many fields are blank.  You can change/add these on the <a href="../settings">settings page</a>.</p>
				  
				<p>I am just displaying basic information.  You can obviously put whatever you want here.  You got all the freedom in the world.  Let's see Wordpress do that!</p>
				
				<h4>User Information and Davebits</h4>
				<p>Go ahead and skim through the source code for this page.  The comments should help it make sense.  Towards the top of the you should notice this line of code:</p>
<div class="row-fluid"><div class="span12"><pre><code>&#60;?php include("../scripts/user-info.php");?&#62;</code></pre></div></div>				
				<p>Davestrap works by using a php <code>include</code> in order to use bits of code located in both the <code>/scripts</code> folder and the <code>/snippets</code> folder.  Let's call these things Davebits.  This Davebit, for example, gives the page access to all of the current user's information with just a few variables.  You can output these variables through the page with the following code:</p>
				<ul>
					<li><code>&#60;?php echo $username;?&#62;</code> outputs the username of the current user</li>
					<li><code>&#60;?php echo $firstname;?&#62;</code> outputs the first name of the current user</li>
					<li><code>&#60;?php echo $firstname;?&#62;</code> outputs the first name of the current user</li>
					<li><code>&#60;?php echo $email;?&#62;</code> outputs the email of the current user</li>					
				</ul>
				
				
				<p>There is a bit more to this Davebit, but I'll let you find out yourself.  Each Davebit will explain what it does within the comments of the code.</p>
				<p>Btw, I didn't make a sarcastic comment or bad joke in that entire section, so you should be proud of me.  It was really hard.</p>
				
				</div>
				<div class="span6">
						<table class="table table-bordered table-striped ">
							<thead>
								<tr>
							    	<td><div class="image-container"><img src="<?php echo $image;?>"></div></td>
							    </tr>
							</thead>
							<tbody>
							    <tr>
							      <th>username:</th>
							      <td><?php echo $username;?></td>
							    </tr>				   
							    <tr>
							      <th>name:</th>
							      <td><?php echo $firstname." ".$lastname;?></dt>
							    </tr>
								<tr>
							      <th>email:</th>
							      <td><?php echo $email;?></dt>
							    </tr>
						    </tbody>
						</table>
					
					
				</div>
			</div>
		</div>
	</div>
	<div class="off-white-bg">
		<div class="container">
			<div class="row-fluid">
				<h2>The Tour</h2>
				<p>So, you are finally starting to get the feel of this Davestrap thing, huh?  You want to learn more about it, huh?  Well, I've included many pages within the contents of Davestrap that tell exactly how to use the features of davestrap.  Each page is located in the top navigation (which btw the Davebit for is <code>&#60;?php include("../snippets/nav.php");?&#62;</code> The more you know!), or in the side panel if you are viewing this from a mobile phone or something (Wait, Davestrap is responsive?!?! OMFFFG!).</p>
				<p>Go ahead and view each page to learn more.  I would start out with the <a href="../page">Sample Page </a>Also, make sure you look at the comments within the source code of each page and Davebit.  They'll really help you out, I promise.</p>
			</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/menu-right.php");?>
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script type="text/javascript" src="../assets/js/image-container.js"></script>
<?php include("../snippets/footer.php");?>
