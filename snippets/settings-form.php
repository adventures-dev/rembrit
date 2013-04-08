<form action="" method="post" id="settings-form" novalidate="novalidate">
            <div id="form-content">
                <fieldset>
                    <div id="error"></div>
                    <div class="fieldgroup">
                        <label for="username">Username</label>
                        <input id="username" type="text" name="username" class="input-block-level" placeholder="<?php echo $username;?>" <?php if($facebook){echo "readonly";}?>>
                    </div>
                    <div class="fieldgroup">
                        <label for="email">Email</label>
                        <input id="email" type="text" name="email" class="input-block-level" placeholder="<?php echo $email;?>">
                    </div>
                    <div class="fieldgroup">
                        <label for="firstname">First Name</label>
                        <input id="firstname" type="text" name="firstname" class="input-block-level" placeholder="<?php echo $firstname;?>" <?php if($facebook){echo "readonly";}?>>
                    </div>
                    <div class="fieldgroup">
                        <label for="lastname">Last Name</label>
                        <input id="lastname" type="text" name="lastname" class="input-block-level" placeholder="<?php echo $lastname;?>" <?php if($facebook){echo "readonly";}?>>
                    </div>
                    <div class="fieldgroup <?php if($facebook){echo "hide";}?>">
                        <label for="password">New Password</label>
                        <input id="pass" type="password" name="password" class="input-block-level">
                    </div>
                    <div class="fieldgroup <?php if($facebook){echo "hide";}?>">
                        <label for="password">Confirm Password</label>
                        <input type="password" name="password2" class="input-block-level">
                    </div>
                    <div class="fieldgroup <?php if($facebook){echo "hide";}?>">
                        <label for="password">Old Password</label>
                        <input id="oldpass" type="password" name="oldpassword" class="input-block-level">
                    </div>
                    <br>
                    <div class="fieldgroup">
                        <input type="submit" value="Save" class="submit btn">
                    </div>
                </fieldset>
            </div>
</form>