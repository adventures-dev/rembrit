<header>
    <div class="container">
        <div class="row-fluid">
            <div class="span12">
                <div id="logo" class="pull-left">
                	<a href="javascript:void(0)" id="invokeMenu-left" class="pull-left"><i class="icon-reorder"></i></a>
                    <a href="../" class="pull-left">
                       <img id="logo-image" src="../assets/img/logo.png"> <span>davestrap</span>

                    </a>
                   <!--uncomment for a right sliding menu <a href="javascript:void(0)" id="invokeMenu-right" class="pull-right"><i class="icon-reorder"></i></a>-->

                </div>
                
                <!--IF USER IS NOT LOGGED IN-->
                <div class="nav-collapse <?php if($_SESSION['user']){echo "hide";} ?>" id="nav-items">
                    <ul id="nav" class="pull-right">
        
                        				<li class="dropdown pull-right" data-dropdown="dropdown">
                                            <a class="dropdown-toggle" href="#" data-toggle="dropdown">Sign In<i class="icon-caret-down"></i></a>

                                            <div class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; padding-bottom: 15px;">
                                                <?php include("../snippets/login-form.php");?>
                                                
                                                <!-- FACEBOOK LOGIN BUTTON-->
                                                <a href="javascript:void(0);" onclick="login();" class="input-block-level <?php if($use_facebook != true){echo "hidden";}?>"><img src="../assets/img/facebook_button.png"></a>
                                                                                             
                                                <a style="font-size:.7em" href="../forgot">Forgot your password?</a> <a style="font-size:.7em" href="../register">Register</a>
                                            </div>
                                        </li>

                    </ul>
                    <!-- nav -->
                </div>

                 <!--IF USER IS LOGGED IN-->
                <div class="nav-collapse <?php if(!$_SESSION['user']){echo "hide";} ?>" id="nav-items">
                    <ul id="nav" class="pull-right">
                        <li>
                        		<li class="dropdown pull-right" data-dropdown="dropdown">
                                                <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Login <i class="icon-caret-down"></i></button>
		                           
										<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; padding-bottom: 15px;">
											<li><a href="../profile">My Profile</a></li>
											<li><a href="../settings">Settings</a></li>
											<li><a href="../scripts/logout.php">Sign Out</a></li>
										</ul>
		                        </li>

                        </li>
                        

                    </ul>
                    <!-- nav -->

                </div>

            </div>
            <!-- gride 12 -->
        </div>
        <!-- row -->
    </div>
</header>