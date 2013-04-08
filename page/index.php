<?php session_start();if(!$_SESSION['user']){header('Location: ../');}?>

<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<?php include("../snippets/menu-left.php");?>
<div id="mainpage">
<?php include("../snippets/nav.php");?>


<!--body goes here-->
	<div class="white-bg">
		<div class="container">
			<div class="row-fluid">
				<!--delete this text to get the full sample page-->
				<h2>Sample Page</h2>
				<p>This page gives you a good starting point for a page in Davestrap.  Davestrap uses <a href="http://twitter.github.com/bootstrap">Twitter Bootstrap's</a> Grid System in order to make fast, responsive, and good looking web-pages.  If you do not understand this Grid System I recommend <a href="http://twitter.github.com/bootstrap/scaffolding.html">reading up on the documentation</a>.  It's pretty handy.  Anyway, here is what a sample page of Davestrap looks like:</p>
				
				
<div class="row-fluid"><div class="span6"><pre><code>&#60;?php session_start();if(!$_SESSION['user']){header('Location: ../');}?&#62;
&#60;?php include("../snippets/header.php");?&#62;
&#60;?php include("../scripts/dbconnect.php");?&#62;
&#60;?php include("../scripts/user-info.php");?&#62;
&#60;?php include("../snippets/menu-left.php");?&#62;
&#60;div id="mainpage"&#62;
&#60;?php include("../snippets/nav.php");?&#62;

&#60;!--body goes here--&#62;
	&#60;div class="white-bg"&#62;
		&#60;div class="container"&#62;
			&#60;div class="row-fluid"&#62;
				&#60;!--content--&#62;

			&#60;/div&#62;
		&#60;/div&#62;
	&#60;/div&#62;
&#60;!-- end of body --&#62;

&#60;/div&#62;&#60;!--main page--&#62;
&#60;?php include("../snippets/javascripts.php");?&#62;
&#60;!--other scripts here--&#62;
&#60;script&#62;

&#60;/script&#62;
&#60;?php include("../snippets/footer.php");?&#62;
</code></pre></div></div>	
			
				<p>Whoa, that's a lot of code, huh?  Well not really, considering how powerful it is.  Let me explain a bit of what each piece does.</p>
				<h4>Session and Header</h4>
				
				<p>At the top of the code you will first notice this: <code>&#60;?php session_start();if(!$_SESSION['user']){header('Location: ../');}?&#62;</code>.  But wait, this doesn't look like the Davebits I'm used to!  I know, chill.  This little line of code detect whether or not the user is logged in.  If they are not, it redirects them back to the landing page.  This is done using <code>$_SESSION</code> variables.  If you know anything about PHP, you'll know what this means.  If not, you can just pretend like it doesn't exist until it becomes such a problem that you have to deal with it.  I'm not here to teach you PHP.  I'm here to teach you Davestrap.</p>
				<p>Up next, we have this little guy: <code>&#60;?php include("../snippets/header.php");?&#62;</code>.  This includes all the things found in the header of the html page.  It includes things like the <code>&#60;meta&#62;</code> tags, the <code>&#60;title&#62;</code> tags, as well as links to all the css stylesheets used for Davestrap.  You know, all the boring stuff.  If you wish to add more css or maybe <a href="http://www.google.com/analytics/">Google Analytics</a> to your webpage.  Put it in the <code>../snippets/header.php</code> Davebit.</p>
				
				<h4>Database and User Info</h4>
				<p>Check out the next couple Davebits:</p>
<div class="row-fluid"><div class="span6"><pre><code>&#60;?php include("../scripts/dbconnect.php");?&#62;
&#60;?php include("../scripts/user-info.php");?&#62;
</code></pre></div></div>
				<p>Now you already know what <code>&#60;?php include("../scripts/user-info.php");?&#62;</code> does.  Unless you did something crazy like not read my documentation in the right order.  But I know you would never do that.  What I didn't tell you, is that it teams up with the other Davebit: <code>&#60;?php include("../scripts/dbconnect.php");?&#62;</code> to get you all the user information.  The <code>../scripts/dbconnect.php</code> Davebit connects your repulsive webpage to your database using the information you entered in the <code>config.php</code> file.  Pretty cool, huh?  This allows the <code>../scripts/user-info.php</code> Davebit to access the database with no issues.  You only need to use <code>../scripts/dbconnect.php</code> once for all Davebits to have access to it.</p>
				
				<h4>Responsive and Navigation</h4>
				<p>Next we have our website navigation.  Take a look at the following:</p>
<div class="row-fluid"><div class="span6"><pre><code>&#60;?php include("../snippets/menu-left.php");?&#62;
&#60;div id="mainpage"&#62;
&#60;?php include("../snippets/nav.php");?&#62;
</code></pre></div></div>
				<p>The first two lines of code (<code>&#60;?php include("../snippets/menu-left.php");?&#62;</code> and <code>&#60;div id="mainpage"&#62;</code>) deal with responsive issues.  They're a little bit complicated so we'll ignore them for now.  <a href="../responsive">Click here</a> to read more about them.  Anyway, the last line is what we're interested in: <code>&#60;?php include("../snippets/nav.php");?&#62;</code>  This Davebit inserts a navigation bar at the top of your page.  But let's say you hate the navigation bar I made (yeah right) and want to make your own.  Well that's the beauty of Davestrap.  You can do whatever the f@&$ you want.  I can't stop you.  You can edit my navigation bar, or create your very own Davebit with your own nav bar!  How crazy is that?</p>

				<h4>Rock Your Body</h4>
				<p>Are you getting the feel for this layout yet?  Check it out:</p>
							
<div class="row-fluid"><div class="span6"><pre><code>&#60;!--body goes here--&#62;
	&#60;div class="white-bg"&#62;
		&#60;div class="container"&#62;
			&#60;div class="row-fluid"&#62;
				&#60;!--content--&#62;

			&#60;/div&#62;
		&#60;/div&#62;
	&#60;/div&#62;
&#60;!-- end of body --&#62;
</code></pre></div></div>

				<p>This is where you put your mediocre content for your webpage.  The html <code>div</code> tags outline what I use as a section for my website.  You'll notice (as long as you read the documentation like I said) that it utilizes a Twitter Bootstrap type layout.  Now, you don't have to structure your sections like this.  But why would you ever want to think for yourself?  You don't have any good ideas.  I would just stick to the above layout if I were you.</p>
				
				<h4>Closing out the page</h4>
				<p>We're almost done!  We just have to finish up the page by adding the following:</p>
<div class="row-fluid"><div class="span6"><pre><code>&#60;?php include("../snippets/javascripts.php");?&#62;
&#60;!--other scripts here--&#62;
&#60;script&#62;

&#60;/script&#62;
&#60;?php include("../snippets/footer.php");?&#62;
</code></pre></div></div>
				<p>Now this is some more boring stuff, but it's necessary.  This first Davebit, <code>&#60;?php include("../snippets/javascripts.php");?&#62;</code>, adds all of the required javascript files we need in order to run the page.  This includes <code>jquery.js</code>, <code>bootstrap.js</code>, and other fun javascript libraries that make our lives easier.  You can find out more about what libraries are included by looking through the comments of the Davebit.</p>
				<p>If you didn't already know, it's good practice to put all of your javascript at the bottom of the page so it loads faster.  So since I'm nice I left you a little spot to put your own javascript code in the webpage.  Just put your code in between the <code>&#60;script&#62;</code> tags.  You might not ever use this part of Davestrap because you are incompetent, but I still have faith in you.</p>
				<p>Finally comes the <code>&#60;?php include("../snippets/footer.php");?&#62;</code> Davebit.  You can edit this Davebit to be whatever you need it to be.  I just wanted a fake copyright statement in mine.</p>
				
				<h4>Put it all together and what do you get</h4>
				<p>So you see, there is a lot of power behind this little bit of code.  Each Davebit has it's own purpose, and the coolest thing is you can reuse them throughout your website!  You didn't even have to write any of the code either.  I did it for you.  You are so lucky you have me.</p>
				<p>What you need to do now is take the source code from this page and delete all the documentation in the body.  Then use the template as a sample page for your "website".  I even put comments in the source code of what you should delete.  Again, you are so lucky you have me.</p>
				
					
				<!--stop deleting-->					
			</div>
		</div>
	</div>
<!-- end of body -->
</div><!--main page-->
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script>

</script>
<?php include("../snippets/footer.php");?>





