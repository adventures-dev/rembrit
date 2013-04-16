<?php session_start(); if($_SESSION[ 'user']){ header( 'Location: profile'); } //checks if the user is logged in ?> 

<!-- THIS IS THE LANDING PAGE FOR YOUR WEBSITE.  WE CAN USE SOME TEMPLATES HERE, BUT FOR THE MOST PART EVERYTHING HAS TO BE CODED SPECIFICALLY FOR THE LANDING PAGE.  DON'T ASK WHY, YOU DON'T WANT TO KNOW.-->

<!DOCTYPE html>
<html lang="en">
    
    <head><!-- head, title and shiz go here-->
        <meta charset="utf-8">
        <title>Rembr.it</title>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <!-- Le styles -->
        <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
        <link href="assets/css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="assets/css/smoothness/jquery-ui-1.10.2.custom.min.css " rel="stylesheet" type="text/css">
        <link href="assets/css/davestrap.css" rel="stylesheet" type="text/css">
         <link href="assets/css/style.css" rel="stylesheet" type="text/css">
       
        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
            <script src="assets/js/html5shiv.js"></script>
        <![endif]-->
        <!-- Fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
        <link rel="shortcut icon" href="assets/ico/favicon.png">
    </head>
    
    <body>
        <?php include( "config.php");?><!-- configurations!!-->
        <?php include( "scripts/dbconnect.php");?><!-- connect to yo database-->

           <div id='wrap'><!-- actually I'll tell you what they do if you want.  These combined with the davestrap css allows a sticky footer (a footer that sticks to the f&*@ing bottom)-->
                <div id='main'><!-- just make sure you close them out before the <footer>-->
                   
        <div id="mainpage-main"><!-- this is the content that slides over during responsive cases-->
        
        	<!--don't worry about the next two divs.  just make sure you use them in every single webpage you make for the rest of your life. nbd-->

                    
        	<div class="container" id='top-nav'>
        		     <div class="dropdown pull-right" data-dropdown="dropdown">
                    <button class="dropdown-toggle btn btn-primary log-button" href="javascript:void(0)" data-toggle="dropdown">Log In <i class="icon-caret-down"></i>

                    </button>
                    <div class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; padding-bottom: 15px;"><!--dropdown menu-->
                        <?php include( "snippets/login-form.php");?>
                        
                        <!-- FACEBOOK LOGIN BUTTON -->
                        <a href="javascript:void(0);" onclick="login();" class="input-block-level <?php if($use_facebook != true){echo " hidden ";}?>">
                            <img src="assets/img/facebook_button.png">
                        </a><!--end facebook button -->
                        
                        <a style="font-size:.7em" href="forgot">Forgot your password?</a>
                        <a style="font-size:.7em" href="register">Register</a>
                    </div>
                </div>
        	
        	</div>
    
                    <div class="top-bg" id="section_three"> <!--section three-->
                        <div class="container">
                        
                            <div class="row-fluid">
	                            <div class="span12 center">
	                            	<h1>Rembr.it</h1>
	                            	<h3>Because you know they<br>grow up too quick.</h3>
	                            	
	                            	
	                            </div>
                        
                            </div>
                            <div class="row-fluid">
                            	<div class="span4"></div>
                            	<div class="span4">
	                            	<div class="register-form">
		                            	<?php include("snippets/register-form.php");?>
	                            	</div>
                            	</div>
                            	<div class="span4"></div>

                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="white-bg">
                    	<div class="container">
                    		<div class="row-fluid">
                    		<div class="span1"></div>
                    		<div class="span10">
                    			<div class="row-fluid">
                    			<div class="span4">
                    				<h4>Easy:</h4>
                    				<p>You are busier than ever and do not have time to spend hours organizing your digital memories.  GIve us 2 minutes a week and Rembr.it will make sure you will be able to look back and remember your kids as they grow up.</p>
                    			</div>
                    			<div class="span4">
                    				<h4>Private:</h4>
                    				<p>While we live most of our digital lives on Facebook and Twitter those are not necessarily the places you want to post all of your families private memories.  Rembr.it is a private place to store all of those little moments that you never want to forget.</p>
                    			</div>
                    			<div class="span4">
                    				<h4>Secure:</h4>
                    				<p>Don't worry about your computer or phone breaking and loosing all of your memories.  Rembr.it is cloud based and always backed up so your memories will be safe.</p>
                    			</div>
                    			</div>
                    		</div>
                    		<div class="span1"></div>
                    		
                    		</div>
                    	</div>
                    
                    </div>
                    
                    
                    
                   </div><!--end-of-main-page-->
         
                </div><!--end of main-->
            </div> <!--end-of-wrap-->
            
           
        
        <footer><!--this is your footer.  if anyone stays long enough on your p of s website to get to the bottom, that's when you know you've man it-->
        	<div class="container">
	       	 <p></p>
	        <div>
        </footer><!-- end of foooooooter -->
        
        
        <!-- Le javascript-->
	    <!-- Placed at the end of the document so the pages load faster -->
	    <!--davestrap comes with a bunch of really sweet js files to use.  below are the basics that should be in every single webpage you ever make-->
        <script src="assets/js/jquery-1.9.0.js" type="text/javascript"></script>
        <script src="assets/js/bootstrap.js" type="text/javascript"></script>
        <script src="assets/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
        <script src="assets/js/jquery.validate.js" type="text/javascript"></script>
        <script src="assets/js/mobile-menu-slider.js" type="text/javascript"></script>
        <script src="assets/js/hide-address-bar.js" type="text/javascript"></script>
        <!-- end of basics-->
                
        
        <!--other scripts: (if you think you are too good for my scripts you should right your own down here-->
        <script type="text/javascript">
        
        
            //login validation
            $("#login-form").validate({

                rules: {
                    username: "required",
                    password: "required"

                },
                messages: {
                    username: "<font style='color:red;'>Please enter a username</font>",
                    password: "<font style='color:red;'>Please enter a password</font>"
                },
                submitHandler: function (form) {
                    $("#login-form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');

                    ///ajax here::::
                    $("#login-error").empty();

                    var user_username = $(form).children(".user_username").val();
                    var user_password = $(form).children(".user_password").val();

                    var data = {
                        username: user_username,
                        password: user_password,
                    };

                    $.ajax({
                        type: "POST",
                        url: "scripts/login.php",
                        data: data,
                        success: function (res) {
                            $("#login-form div").remove(".spinner"); //remove loading icon here

                            if (res == true) {
                                window.location = "profile";
                            } else {

                                $("#login-error").append('<font style="color:red;">' + res + '</font>');
                            }
                        }
                    });

                }
            });

            

                //form validation rules
                $("#register-form").validate({
                
                
                    rules: {
                        username: {
                            required: true
                        },
                        firstname: {
                            required: true
                        },
                        lastname: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 5
                        },
                        password2: {
                            equalTo: "#pass",
                            required: true

                        }
                    },
                    messages: {
                        username: {
                            required: "<font style='color:red;'>Please enter a username</font>"

                        },
                        firstname: {
                            required: "<font style='color:red;'>Please enter a first name</font>"

                        },
                        lastname: {
                            required: "<font style='color:red;'>Please enter a last name</font>",

                        },
                        password: {
                            required: "<font style='color:red;'>Please enter a password</font>",

                            minlength: "<font style='color:red;'>Your password must be at least 5 characters long</font>"
                        },
                        password2: {
                            required: "<font style='color:red;'>Please confirm your password</font>",

                            equalTo: "<font style='color:red;'>Your passwords must match</font>"
                        },
                        email: {
                            required: "<font style='color:red;'>Please enter a vaild email address</font>",
                            email: "<font style='color:red;'>Please enter a valid email address</font>"


                        }
                        
                    },
                    submitHandler: function (form) {
	                    $("#register-form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');

                        ///ajax here::::
                        $("#error").empty();
                        
                        var username = document.getElementById('username').value;
                        var password = document.getElementById('pass').value;
                        var firstname = document.getElementById('firstname').value;
                        var lastname = document.getElementById('lastname').value;
                        var email = document.getElementById('email').value;


                        var data = {
                            username: username,
                            password: password,
                            firstname: firstname,
                            lastname: lastname,
                            email: email
                        }; 

                        $.ajax({
                            type: "POST",
                            url: "scripts/register.php",
                            data: data,
                            success: function (res) {
                            
                            	$("#register-form div").remove(".spinner");//remove loading icon here

                            	if (res == true) {
                                        window.location = "../profile";    
                                 } else {
                                        
                                        $("#error").append('<font style="color:red;">' + res + '</font>');
                                 }

                            

                            }
                        });
                    }
                });

        </script><!-- end of other scripts -->
        
        <?php if($use_facebook){include( "scripts/facebook-js.php");}?> <!-- used for facebook controls, if you don't want to use facebook just ignore-->
        
    </body>

</html>