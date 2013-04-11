<?php session_start(); if($_SESSION[ 'user']){ header( 'Location: profile'); } //checks if the user is logged in ?> 

<!-- THIS IS THE LANDING PAGE FOR YOUR WEBSITE.  WE CAN USE SOME TEMPLATES HERE, BUT FOR THE MOST PART EVERYTHING HAS TO BE CODED SPECIFICALLY FOR THE LANDING PAGE.  DON'T ASK WHY, YOU DON'T WANT TO KNOW.-->

<!DOCTYPE html>
<html lang="en">
    
    <head><!-- head, title and shiz go here-->
        <meta charset="utf-8">
        <title>Davestrap</title>
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

        
        <!-- this is a left sliding menu for responsive cases-->
        <div id="menu-left" class="sidemenu">
            <div class="menu-item">
                <p>Menu</p>
            </div>
            <ul>
                <a href="javascript:void(0)" class="nav_one">
                    <li>Welcome</li>
                </a>
                <a href="javascript:void(0)" class="nav_two">
                    <li>Config</li>
                </a>
                <a href="javascript:void(0)" class="nav_three">
                    <li>Create Table</li>
                </a>
            </ul>
            <div class="menu-item">
                <p>Sign In</p>
            </div>
            <ul>
                <a href="javascript:void(0)" id="loginbutton">
                    <li>Sign In</li>
                </a>
                <?php include( "snippets/side-login-form.php");?>
                <!-- FACEBOOK LOGIN BUTTON-->
                <a href="javascript:void(0);" onclick="login();" class="<?php if($use_facebook != true){echo " hidden ";}?>">
                    <li>Facebook Sign In</li>
                </a>
                <a href="forgot">
                    <li>Forgot Password</li>
                </a>
                <a href="register">
                    <li>Register</li>
                </a>
            </ul>
        </div><!--end menu-left-->
        
           <div id='wrap'><!-- actually I'll tell you what they do if you want.  These combined with the davestrap css allows a sticky footer (a footer that sticks to the f&*@ing bottom)-->
                <div id='main'><!-- just make sure you close them out before the <footer>-->
                   
        <div id="mainpage"><!-- this is the content that slides over during responsive cases-->
        
        	<!--don't worry about the next two divs.  just make sure you use them in every single webpage you make for the rest of your life. nbd-->
 
                    <header><!-- top-nav -->
                        <div class="container">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div id="logo" class="pull-left"><!--logo-->
                                        <a href="javascript:void(0)" id="invokeMenu-left" class="pull-left"><i class="icon-reorder"></i></a>
                                        <a href="../" class="pull-left">
                                            <img id="logo-image" src="assets/img/logo.png"> <span>davestrap</span>
                                        </a>
                                    </div><!-- end logo-->
                                    <div class="nav-collapse" id="nav-items"><!--right buttons:  these will scroll down to their appropriate sections (see javascript at bottom).  You can also have them go to sub pages as well.  It's your website do what you wan-->
                                        <ul id="nav" class="pull-right">
                                            <li>
                                                <a href="javascript:void(0)" class="nav_one">Welcome</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" class="nav_two">Config</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" class="nav_three">Create Table</a>
                                            </li>                                            
                                            <li class="dropdown pull-right" data-dropdown="dropdown">
                                                <a class="dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown">Sign In<i class="icon-caret-down"></i>

                                                </a>
                                                <div class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; padding-bottom: 15px;"><!--dropdown menu-->
                                                    <?php include( "snippets/login-form.php");?>
                                                    
                                                    <!-- FACEBOOK LOGIN BUTTON -->
                                                    <a href="javascript:void(0);" onclick="login();" class="input-block-level <?php if($use_facebook != true){echo " hidden ";}?>">
                                                        <img src="assets/img/facebook_button.png">
                                                    </a><!--end facebook button -->
                                                    
                                                    <a style="font-size:.7em" href="forgot">Forgot your password?</a>
                                                    <a style="font-size:.7em" href="register">Register</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div><!--end right buttons-->
                                </div>
                            </div>
                        </div>
                    </header><!-- end-top-nav -->
                    
       
    
                    <div class="white-bg" id="section_three"> <!--section three-->
                        <div class="container">
                            <div class="row-fluid">
                            	<p> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            	<p> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            	<p> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                </div><!--end of main-->
            </div> <!--end-of-wrap-->
           
        </div><!--end-of-main-page-->
        
        <footer><!--this is your footer.  if anyone stays long enough on your p of s website to get to the bottom, that's when you know you've man it-->
        	<div class="container">
	       	 <p>&copy; Davestrap Inc.  (That's not a real thing. It just looks cool at the bottom)</p>
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
        
        	//buttons on buttons on buttons
            $(".nav_one").click(function () {
                $('html, body').animate({
                    scrollTop: $("#section_one").offset().top
                }, 1000);
            });
            $(".nav_two").click(function () {
                $('html, body').animate({
                    scrollTop: $("#section_two").offset().top
                }, 1000);
            });
            $(".nav_three").click(function () {
                $('html, body').animate({
                    scrollTop: $("#section_three").offset().top
                }, 1000);
            });
            $("#loginbutton").click(function () {
                if ($("#side-login").hasClass("hide")) {
                    $("#side-login").slideDown();
                    $("#side-login").removeClass("hide");
                } else {
                    $("#side-login").slideUp();
                    $("#side-login").addClass("hide");

                }
            });

        
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

            //side login validation (used for responsive) 
            $("#side-login-form").validate({
                rules: {
                    username: "required",
                    password: "required"

                },
                messages: {
                    username: "<font style='color:red;'>Please enter a username</font>",
                    password: "<font style='color:red;'>Please enter a password</font>"
                },
                submitHandler: function (form) {
                    $("#side-login-form").append('<div style="color:white;" class="center spinner"><i class="icon-spinner icon-spin"></i></div>');

                    ///ajax here::::
                    $("#side-login-error").empty();
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
                            $("#side-login-form div").remove(".spinner"); //remove loading icon here

                            if (res == true) {
                                window.location = "profile";
                            } else {

                                $("#side-login-error").append('<font style="color:white;">' + res + '</font>');
                            }


                        }
                    });

                }
            });
        </script><!-- end of other scripts -->
        
        <?php if($use_facebook){include( "scripts/facebook-js.php");}?> <!-- used for facebook controls, if you don't want to use facebook just ignore-->
        
    </body>

</html>