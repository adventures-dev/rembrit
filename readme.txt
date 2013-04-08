Welcome to davestrap!

This is like twitter bootstrap, but it was made by dave, so it's called davestrap, duh.
Davestrap allows you to easily start your website with user access.  Just follow the following steps to begin:

1.) drag the contents of the davestrap folder into your root folder of your webpage.  nice job!

2.) now open the scripts/dbconnect.php file and enter the appropriate configurations.  These include database name, username, and password.  If you don't know what these are, you probably are not ready for davestrap.

3.) speaking of databases, go a ahead and create a "Users" table in your database.  Use phpmyadmin to do so, it's a lot easier than creating it in the terminal like those nerds do.  Your table should include the following: 

	id (primary key), 
	username, 
	firstname, 
	lastname, 
	password, 
	email, 
	and whatever you'd like to store 


Maybe someday I'll create a function that creates all of these tables for you… maybe 
(*note if want to register more, make sure you edit snippets/register-form.php and assets/js/register-validation.js appropriately).

4.) that's one sweet table.  davestrap includes many types of functions for you to play with, however, many require api keys and certain changes made in order to work.  Some of these include:

	STRIPE:
	-snippets/payment_form.php (may require more work have not tested properly)
	-scripts/charge.php
	MAILCHIMP:
	-scripts/mailchimp.php
	AMAZON SIMPLE EMAIL SERVICE:
	-scripts/contact.php
	ENDLESS SCROLLING:
	-script/endless-data.php
	-assets/js/endless-scroll.js
	MOBILE MENU SLIDER:
	-assets/mobile-menu-slider.js (this requires css work in order to function.  see comments in file)
	BLOG:
	-blog/ (this is a normal wordpress blog setup)

	AND MORE TO COME (if dave would get his shit together)

5.)And that's it just add content and and bunch more stuff and you'll probably have a website.  Hopefully this makes it a little easier than usual.  Probably not though

-Dave