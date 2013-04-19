<header id='topbar'>
    <div class="container" >
        <div class="row-fluid">
            <div class="span12 ">
            	<div >
                <div id="logo" class="pull-left">
                    <a href="../" class="pull-left">
                       <h4>Rembr.it</h4>

                    </a>
                   <!--uncomment for a right sliding menu <a href="javascript:void(0)" id="invokeMenu-right" class="pull-right"><i class="icon-reorder"></i></a>-->

                </div>
                

                 <!--IF USER IS LOGGED IN-->
                    <ul id="nav" class="pull-right">
                    					<li class="top-button" ><a id ="edit_kid_button"><i class='icon-cogs icon-2x'></i></a>	</li>
                    					<li class="top-button" ><a id ="new_kid_button"><i class='icon-plus-sign icon-2x'></i></a></li>
                    					<li class="top-button" ><a id ="new_photo_button"><i class='icon-picture icon-2x'></i></a></li>

                    
                        		<li class="dropdown pull-right top-button log" data-dropdown="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown"><?php echo $username;?> <i class="icon-caret-down"></i></a>
		                           
										<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; padding-bottom: 15px;">
											<li><a href="../profile">My Profile</a></li>
											<li><a href="../settings">Settings</a></li>
											<li><a href="../scripts/logout.php">Sign Out</a></li>
										</ul>
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