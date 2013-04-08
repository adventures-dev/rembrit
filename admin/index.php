<?php session_start(); if(!$_SESSION[ 'user']){ header('Location: ../'); } ?>
<?php include("../snippets/header.php");?>
<?php include("../scripts/dbconnect.php");?>
<?php include("../scripts/user-info.php");?>
<?php include("../snippets/menu-left.php");?>
<div id="mainpage">
    <?php include("../snippets/nav.php");?>
    <!--body goes here-->
    <div class="white-bg">
        <div class="container">
            <div class="row-fluid">
                <div class="span6">
                    	<h2>Admin</h2>

                    <p>
	                    Welcome to the admin page.  Honestly I would just leave this page how it is, because you'll probably mess it up... Basically it just gives you an endless feed of all your users.  With these users you can make them admin and even remove them.  But, don't abuse your power.  You have to be a fair and kind admin.  If you don't see anything on the right it's probably because you don't have any users yet, duh.  	                    
                    </p>
                    
                    <p>This doesn't really use and Davebits but instead just uses some combined jquery and php scripts I created to give you a cool admin panel.  I may make them into Davebits in a later version if you're lucky.  If you are curious to how they work you can check them out in the source code of this page.  I commented them very nice for you so It should be easy to understand.</p>
                </div>
                <div class="span6">
                    <div id="feed"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- end of body -->
</div>
<!--main page-->
<?php include("../snippets/menu-right.php");?>
<?php include("../snippets/javascripts.php");?>
<!--other scripts here-->
<script>
    var nodata = false; //this tells the program if there is no more data to display
    var loading = false; //this tells the program if the ajax is currently running
    var number = 0; //number used to determine location of tables in database
    $(document).ready(function () {
        getData();
    });

    $(window).scroll(function () {

        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && loading != true && nodata != true) {
            getData();
        }

    });

    function makeAdmin(ele, id) {

        if (confirm('Are you sure you want to give this user admin controls?')) {
            var data = {
                id: id
            };
            $.ajax({
                type: "POST",
                url: "make-admin.php",
                data: data,
                success: function (res) {
                    if (res == true) {
                        //success action
                        ele.remove();

                    } else {
                        //failure action
                    }

                }
            });

        }
    }

    function removeUser(ele, id) {

        if (confirm('Are you sure you want to remove this user?')) {

            var data = {
                id: id
            };
            $.ajax({
                type: "POST",
                url: "remove-user.php",
                data: data,
                success: function (res) {
                    if (res == true) {
                        //success action
                        ele.remove();

                    } else {
                        //failure action
                    }
                }
            });
        }

    }

    function getData() {

        loading = true;
        var data = {
            ///include all post data in this array
            number: number
        };

        //insert loading icon here
        $("#feed").append('<div class="center spinner"><i class="icon-spinner icon-spin icon-2x"></i></div>');

        $.ajax({
            type: "POST",
            url: "admin-data.php", //example script can be anything
            data: data,
            success: function (res) {
                res = $.parseJSON(res);

                $("#feed div").remove(".spinner"); //remove loading icon here
                $("#feed").append("<ul>");
                for (var i = 0; i < res.length; i++) {
                    //use this section to display all the data, use some .append() or something

                    $("#feed").append("<li id='" + res[i]['id'] + "'><div class='row-fluid'><div class='span4'>" + res[i]["username"] + "</div><div class='span4'><a href='#' class='adminbutton'>Make Admin</a></div><div class='span4'><a href='#' class='removebutton'>Remove User</a></div></div></li>");
                    number++;
                }
                $("#feed").append("</ul>");

                if (res.length == 0) { //no date left :( sad day
                    //display error message here
                    $("#feed").append("<li><h4>no data</h4></li>");
                    nodata = true;
                }

                $(".adminbutton").click(function () {
                    //action here
                    makeAdmin($(this).parent().parent().parent(), $(this).parent().parent().parent().attr('id'));

                });

                $(".removebutton").click(function () {
                    //action here
                    removeUser($(this).parent().parent().parent(), $(this).parent().parent().parent().attr('id'));

                });


                loading = false;
            }
        });
    }
</script>
<?php include( "../snippets/footer.php");?>