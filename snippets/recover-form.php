
<?php 

	if(isset($_POST['username']) && isset($_POST['email'])){
	
		$username = $_POST['username'];
		$email = $_POST['email'];

		include("../scripts/recover.php");
		$result = recover_password($username, $password);
		echo $result;
	}

?>

		<form action="" method="post" id="settings-form" novalidate="novalidate">
            <div id="form-content">
                <fieldset>
                    <div class="fieldgroup" id="error"></div>
                    <div class="fieldgroup">
                        <label for="username">Username</label>
                        <input id="username" type="text" name="username" class="input-block-level" placeholder="username">
                    </div>
                    <div class="fieldgroup">
                        <label for="email">Email</label>
                        <input id="email" type="text" name="email" class="input-block-level" placeholder="email">
                    </div>
                    <div class="fieldgroup">
                        <input type="submit" value="Send" class="submit btn">
                    </div>
                </fieldset>
            </div>
        </form>

