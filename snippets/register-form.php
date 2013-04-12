 
    <form action="" method="post" id="register-form" novalidate="novalidate">
        <div id="form-content">
            <fieldset>
                <div id="error"></div>
                <div class="fieldgroup">
                    <input id="username" type="text" name="username" class="input-block-level" placeholder="Username">
                </div>
                <div class="fieldgroup">
                                <div class="row-fluid">
	                                <div class="span6">
                    <input id="firstname" type="text" name="firstname" class="input-block-level" placeholder="First Name">
	                                </div>
	                                <div class="span6">
                    <input id="lastname" type="text" name="lastname" class="input-block-level" placeholder="Last Name">
	                                </div></div>
                </div>
                <div class="fieldgroup">
                    <input id="email" type="text" name="email" class="input-block-level" placeholder="Email" value="<?php echo $email;?>">
                </div>
                <div class="fieldgroup">
                    <input id="pass" type="password" name="password" class="input-block-level" placeholder="Password">
                </div>
                <div class="fieldgroup">
                    <input type="password" name="password2" class="input-block-level" placeholder="Confirm Password">
                </div>            
                
                <div class="fieldgroup">
                    <button type="submit"class="submit btn register-button input-block-level">Register</button>
                </div>
            </fieldset>
        </div>
    </form>

