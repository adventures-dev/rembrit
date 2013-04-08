<!--IF USER IS NOT LOGGED IN-->
<div id="<?php if(!$_SESSION['user']){echo "menu-right";}?>" class="sidemenu <?php if($_SESSION['user']){echo "hidden";}?>">

	   <div class="menu-item">
              <p>
                Menu
              </p>
       </div>
          <ul>
            <a href="../#section_one" class="nav_one"><li>Welcome</li></a>
            <a href="../#section_two" class="nav_two"><li>Config</li></a>    
            <a href="../#section_three" class="nav_three"><li>Create Table</li></a>

          </ul>
        <div class="menu-item">
            <p>Sign In</p>
        </div>

        <ul>
            <a href="javascript:void(0)" id="loginbutton"><li>Sign In</li></a>

            <?php include("../snippets/side-login-form.php");?>
                                                    
            		<!-- FACEBOOK LOGIN BUTTON-->
                    <a href="javascript:void(0);" onclick="login();" class="<?php if($use_facebook != true){echo "hidden";}?>"><li>Facebook Sign In</li></a>

                    <a href="../forgot"><li>Forgot Password</li></a>
                   <a href="../register"><li>Register</li></a>

        </ul>
          



</div>


<!--IF USER IS LOGGED IN-->

<div id="<?php if($_SESSION['user']){echo "menu-right";}?>" class="sidemenu <?php if(!$_SESSION['user']){echo "hidden";}?>">

	   <div class="menu-item">
              <p>
                Menu
              </p>
       </div>
          <ul>
            <a href="../post" class="nav_one"><li>Sample Page</li></a>          
            <a href="../responsive" class="nav_two"><li>Responsive</li></a>
            <a href="../facebook" class="nav_two"><li>Facebook</li></a>
            <a href="../admin" class="nav_two <?php if($admin != true){echo "hidden";};?>"><li>Admin</li></a>

          </ul>
       <div class="menu-item">
              <p>
                <?php echo $username; ?>
              </p>
       </div>
          <ul>
          
              <a href="../profile" class="nav_logout"><li>My Profile</li></a>          
              <a href="../settings" class="nav_logout"><li>Settings</li></a>          
              <a href="../scripts/logout.php" class="nav_logout"><li>Sign Out</li></a>


          </ul>


</div>
