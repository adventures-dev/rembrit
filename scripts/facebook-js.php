<div id="fb-root"></div>

<script>
  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '<?php echo $facebook_key;?>', // App ID
      channelUrl : '//<?php echo $facebook_domain;?>/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here
    FB.getLoginStatus(function(response) {
	    if (response.status === 'connected') {
		    // connected
		   
		} else if (response.status === 'not_authorized') {
			// not_authorized
			
    	} else {
	    	// not_logged_in
	    	
	    }
	});
  };
  
  function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            facebookajax();
        } else {
            // cancelled
        }
    });
  }
  function logout() {
    FB.logout();
  }
  
  function facebookajax() {

  
    FB.api('/me', function(response) {
    	var imageurl = 'https://graph.facebook.com/'+response.id+'/picture';
    	
        var data = {
            username: response.username,
            firstname: response.first_name,
            lastname: response.last_name,
            image: imageurl
        };
                        
        $.ajax({
            type: "POST",
            url: "../scripts/facebook-login.php",
            data: data,
            success: function (res) {
           		 window.location = "../profile";
            }
        });
 
    });
    }

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>