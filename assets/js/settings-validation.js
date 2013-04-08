
                        //form validation rules
                        $("#settings-form").validate({
                            rules: {
                                username: {
                                    required: false,
                                },
                                email: {
                                    required: false,
                                    email: true,
                                },
                                 firstname: {
                                    required: false
                                },
                                 lastname: {
                                    required: false
                                },
                                password: {
                                    minlength: 5
                                },
                                password2: {
                                    equalTo: "#pass"

                                },
                                oldpassword: "required"
                            },
                            messages: {
                                username: {
                                    notEqual: "<font style='color:red;'>Please enter a new username</font>",

                                },
                                firstname: {
                                    notEqual: "<font style='color:red;'>Please enter a new first name</font>",

                                },
                                lastname: {
                                    notEqual: "<font style='color:red;'>Please enter a new last name</font>",

                                },
                                password: {
                                    minlength: "<font style='color:red;'>Your password must be at least 5 characters long</font>"
                                },
                                password2: {
                                    equalTo: "<font style='color:red;'>Your passwords must match</font>"
                                },
                                email: {
                                    notEqual: "<font style='color:red;'>Please enter a new email address</font>",
                                    email: "<font style='color:red;'>Please enter a valid email address</font>",

                                },
                                oldpassword: "<font style='color:red;'>Please enter your password to continue</font>"
                            },
                            submitHandler: function (form) {

                               	$("#settings-form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');
                                $("#error").empty();
                                
                                var username = document.getElementById('username').value;
                                var email = document.getElementById('email').value;
                                var newpassword = document.getElementById('pass').value;
                                var oldpassword = document.getElementById('oldpass').value;
                                var firstname = document.getElementById('firstname').value;
                                var lastname = document.getElementById('lastname').value;


                                var data = {
                                    username: username,
                                    email: email,
                                    newpassword: newpassword,
                                    oldpassword: oldpassword,
                                    firstname: firstname,
                                    lastname: lastname

                                };
                                 ///ajax here::::
                                $.ajax({
                                    type: "POST",
                                    url: "../scripts/update-info.php",
                                    data: data,
                                    success: function (res) {
                                    	$("#settings-form div").remove(".spinner");//remove loading icon here

                                        if (res == true) {
                                             
                                             
                                             if($("#firstname").val() != ""){
	                                              $("#firstname").attr("placeholder", firstname);

                                             }
                                             if($("#lastname").val() != ""){
                                             	$("#lastname").attr("placeholder", lastname);

                                             }
                                             if($("#username").val() != ""){
                                             	$("#username").attr("placeholder", username);

                                             }
                                             if($("#email").val() != ""){
                                             	$("#email").attr("placeholder", email);

                                             }
                               

                                           $("#error").append('<h4>Your information has been saved</h4>');


                                        } else {
                                        	
                                            $("#error").append('<font style="color:red;">' + res + '</font>');
                                        }

                                    }
                                });
                            }
                        });
