

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
                            url: "../scripts/register.php",
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
