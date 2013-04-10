  var nodata = true; //this tells the program if there is no more data to display
  var loading = false; //this tells the program if the ajax is currently running
  var number = 0; //number used to determine location of tables in database
  var current_kid;

  $(document).ready(function () {

      $("#feed").append('<div class="center spinner"><i class="icon-spinner icon-spin icon-2x"></i></div>');

      getChildData();

  });

  $(window).scroll(function () {

      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && loading != true && nodata != true) {
          getData();
      }

  });


  function prettyDate(time) {

      var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
          diff = (((new Date()).getTime() - date.getTime()) / 1000),
          day_diff = Math.floor(diff / 86400);

      if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
          return;
      return day_diff == 0 && (
          diff < 60 && "just now" ||
          diff < 120 && "1 minute ago" ||
          diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
          diff < 7200 && "1 hour ago" ||
          diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
          day_diff == 1 && "Yesterday" ||
          day_diff < 7 && day_diff + " days ago" ||
          day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
  }

  function getAllKids() {
      $("#all_kids").empty();
      var data = {
          child: current_kid
      };
      $.ajax({
          type: "POST",
          url: "all_kids.php",
          data: data,
          success: function (res) {

              res = $.parseJSON(res);
              for (var i = 0; i < res.length; i++) {


                  var profile_image = res[i]['image'];
                  var image_data = {
                      image_id: profile_image
                  };
                  $.ajax({
                      type: "POST",
                      url: "get_image.php",
                      data: image_data,
                      success: function (result) {
                          result = $.parseJSON(result);

                          if (result === "false") {
                              //success action
                              $("#all_kids").append("<a href='' class='child_button' data-internalid='" + result[i]["child"] + "'><div class='image-container' style='width:50px;height:50px;'><img src='../assets/img/default_pic.png'></div></a>");
                          } else {
                              //failure action

                              for (var i = 0; i < result.length; i++) {
                                  $("#all_kids").append("<a href='' class='child_button' data-internalid='" + result[i]["child"] + "'><div class='image-container kid' style='width:50px;height:50px;'><img src='" + result[i]["location_thumb"] + "'></div></a>");
                                  $(".kid img").load(function () {
                                      adjustImages();
                                  });

                              }
                          }

                          triggerStuff();

                      }
                  });




              }



          }
      });


  }



  function getChildData() {
      var data = {
          child: current_kid
      };
      $.ajax({
          type: "POST",
          url: "get_current_child.php",
          data: data,
          success: function (res) {
              res = $.parseJSON(res);
              if (res === "false") {
                  $('#overlay').fadeIn('fast', function () {
                      $('#new_kid_box').animate({
                          'top': '160px'
                      }, 500);
                  });

              } else {
              
                                $("#feed").empty();

                  for (var i = 0; i < res.length; i++) {

                      current_kid = res[i]['id'];
                      getAllKids();


                      var profile_image = res[i]['image'];

                      var image_data = {
                          image_id: profile_image
                      };
                      $.ajax({
                          type: "POST",
                          url: "get_image.php",
                          data: image_data,
                          success: function (result) {
                              result = $.parseJSON(result);

                              if (result === "false") {
                                  //success action
                                  $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");

                              } else {
                                  //failure action

                                  for (var i = 0; i < result.length; i++) {
                                      $("#profile_pic").html("<img src='" + result[i]['location_small'] + "'>");

                                      $("#profile_pic img").load(function () {
                                          adjustImages();
                                      });
                                  }
                              }

                          }
                      });



                      $("#child_name").html("<h4>" + res[i]['firstname'] + " " + res[i]["lastname"] + "</h4>");
                      nodata = false;
                      getData();

                  }


              }

          }
      });

  }



  function getData() {

      loading = true;
      var data = {
          ///include all post data in this array
          number: number,
          child: current_kid
      };

      //insert loading icon here

      $.ajax({
          type: "POST",
          url: "profile_data.php", //example script can be anything
          data: data,
          success: function (res) {
              res = $.parseJSON(res);
              $("#feed div").remove(".spinner"); //remove loading icon here
              for (var i = 0; i < res.length; i++) {
                  //use this section to display all the data, use some .append() or something

                  var html = '<div class="image-wrapper" data-internalid="' + res[i]["id"] + '">' +
                      '<div class="preview">' +
                      '<div class="image-container" style="width:462px; height:462px;">' +
                      '<img class="image" data-internalid="' + res[i]["id"] + '" src = "' + res[i]['location'] + '">' +
                      '</div>' +
                      '</div>' +
                      '</div>';

                  var now = new Date(res[i]["datetime"]);
                  var then = now.toISOString();
                  //var	date = prettyDate(then);

                  var date = now.toDateString();

                  var buttons = '<div class="buttons"><a href="" class="edit_button" data-internalid="' + res[i]["id"] + '"><i class="icon-edit"></i> edit</a> <a href="" class="delete_button" data-internalid="' + res[i]["id"] + '"><i class="icon-minus-sign"></i> delete</a></div>';
                  var text = "<div class='side_text' data-internalid='" + res[i]["id"] + "'><p>" + res[i]["text"] + "</p></div>";
                  var textbox = "<div class='side_textbox hide' data-internalid='" + res[i]["id"] + "'><textarea class='input-block-level side_textarea' data-internalid='" + res[i]["id"] + "'>" + res[i]["text"] + "</textarea><button class='btn side_textbutton' data-internalid='" + res[i]["id"] + "'>Edit</button></div>";

                  var sidehtml = '<div class="text-wrapper" data-internalid="' + res[i]["id"] + '">' +
                      '<p>posted ' + date + '</p>' + text + textbox + buttons +

                  '</div><hr>';



                  $("#feed").append("<div class='row-fluid item' data-internalid='" + res[i]["id"] + "'><div class='span4'>" + sidehtml + "</div><div class='span8'>" + html + "</div></div>");
                  number++;
              }
              
                $(".image-container").each(function(){
	               	$(this).load(function () {
	               		 adjustImages();
	                	});
 
                });
              
              triggerStuff();




              if (res.length == 0) { //no date left :( sad day

                  nodata = true;
              }


              loading = false;
          }
      });
  }



  function triggerStuff() {
      $(".child_button").unbind("click");

      $(".child_button").click(function (event) {
          event.preventDefault();

          var id = $(this).attr("data-internalid");
          $(".child_button").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  $("#feed").prepend('<div class="center spinner"><i class="icon-spinner icon-spin icon-2x"></i></div>');

                  number = 0;
                  current_kid = id;
                  getChildData();
              }
              
          });

      });
    
      $(".side_textbutton").unbind("click");
      $('.side_textbutton').click(function (event) {
          event.preventDefault();

          var id = $(this).attr("data-internalid");
          var new_text = "";
          $(".side_textbox").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  new_text = $(this).children(".side_textarea").val();
                  $(this).slideUp();
              }
          });

          $(".side_text").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  $(this).html("<p>" + new_text + "</p>");
                  $(this).slideDown();
              }
          });



          var data = {
              id: id,
              text: new_text

          };
          $.ajax({
              type: "POST",
              url: "update-text.php",
              data: data,
              success: function (res) {
                  if (res == true) {
                      //success action
                  } else {
                      //failure action
                  }

              }
          });





      });



      $(".edit_button").unbind("click");
      $('.edit_button').click(function (event) {
          event.preventDefault();

          var id = $(this).attr("data-internalid");



          $(".side_text").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  if ($(this).is(":visible"))
                      $(this).slideUp();
                  else
                      $(this).slideDown();
              }
          });
          $(".side_textbox").each(function () {
              if ($(this).attr("data-internalid") === id) {

                  if ($(this).is(":visible"))
                      $(this).slideUp();
                  else
                      $(this).slideDown();
              }
          });



      });


      $(".delete_button").unbind("click");
      $('.delete_button').click(function (event) {
          event.preventDefault();
          if (confirm("Are you sure you want to delete this item?")) {

              var id = $(this).attr("data-internalid");
              var button = $(this);

              var data = {
                  id: id,
              };
              $.ajax({
                  type: "POST",
                  url: "delete_photo.php",
                  data: data,
                  success: function (res) {
                      button.parent(".buttons").parent(".image-wrapper").fadeOut();

                      $(".item").each(function () {
                          if ($(this).attr("data-internalid") === id) {

                              $(this).fadeOut();
                          }
                      });



                      button.parent(".buttons").parent(".text-wrapper").fadeOut();

                      if (res == true) {
                          //success action

                      } else {
                          //failure action
                      }

                  }
              });
          } else {
              return false;
          }

      });



  }

   ////FORMS!!!

  $(function () {
      $('#new_kid_button').click(function () {
          $('#overlay').fadeIn('fast', function () {
              $('#new_kid_box').animate({
                  'top': '160px'
              }, 500);
          });
      });
      $('#new_kid_close').click(function () {
          $('#new_kid_box').animate({
              'top': '-1000px'
          }, 500, function () {
              $('#overlay').fadeOut('fast');
          });
      });
      
      $('#new_photo_button').click(function () {
          $('#overlay').fadeIn('fast', function () {
              $('#new_photo_box').animate({
                  'top': '160px'
              }, 500);
          });
      });
      $('#new_photo_close').click(function () {
          $('#new_photo_box').animate({
              'top': '-1000px'
          }, 500, function () {
              $('#overlay').fadeOut('fast');
          });
      });
      


  });



  $("#new_kid_form").validate({

      rules: {
          firstname: "required",
          lastname: "required"

      },
      messages: {
          firstname: "<font style='color:red;'>Please enter a first name</font>",
          lastname: "<font style='color:red;'>Please enter a last name</font>"
      },
      submitHandler: function (form) {
          $("#new_kid_form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');
          $("#new_kid_form_error").empty();

          var firstname = $("#firstname").val();
          var lastname = $("#lastname").val();

          var data = {
              firstname: firstname,
              lastname: lastname
          };
          $.ajax({
              type: "POST",
              url: "add_kid.php",
              data: data,
              success: function (res) {

                  $("#firstname").val("");
                  $("#lastname").val("");
                  $("#birthday").val("");

                  $("#new_kid_form div").remove(".spinner");

                  current_kid = res;
                  $('#new_kid_box').animate({
                      'top': '-1000px'
                  }, 500, function () {
                      $('#new_photo_box').animate({
                          'top': '160px'
                      }, 500);
                  });



              }
          });


      }
  });