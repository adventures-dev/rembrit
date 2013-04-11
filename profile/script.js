  var nodata = true; //this tells the program if there is no more data to display
  var loading = false; //this tells the program if the ajax is currently running
  var number = 0; //number used to determine location of tables in database
  var current_kid;
  var current_photo;
  var milestones;
  $(document).ready(function () {
	  getMilestones();
      getChildData();

  });

  $(window).scroll(function () {

      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && loading != true && nodata != true) {
          getData();
      }

  });
  
  function getMilestones(){
	  
	var data = {};
    $.ajax({
        type: "POST",
        url: "milestones.php",
        data: data,
        success: function (res) {
            res = $.parseJSON(res);
            
            milestones = "<option value='0'>No Milestone</option>";
            
            for (var i = 0; i < res.length; i++) {
                //use this section to display all the data, use some .append() or something
                milestones = milestones + "<option value='" + res[i]['id'] + "'>" + res[i]["name"] + "</option>";
            }
            
            $("#milestone_select").html(milestones);

        }
    });
    
  
    
	  
	  
  }
  
  function getCurrentMilestones(){
  $("#all_milestones").fadeOut("fast", function(){
	  

  
	  $("#all_milestones").empty();
	  	var data = {
		  	child: current_kid
	  	};
    $.ajax({
        type: "POST",
        url: "current_milestones.php",
        data: data,
        success: function (res) {
            res = $.parseJSON(res);
            
            
            for (var i = 0; i < res.length; i++) {
            
            	  var milestone_icon;
                  
                  switch (parseInt(res[i]['milestone']))
					{
					case 1:
					  milestone_icon = "<a href='' class='milestone_button' data-internalid='"+res[i]["id"]+"'><i class='icon-trophy icon-3x'></i></a> ";
					  break;
					case 2:
					  milestone_icon = "<a href='' class='milestone_button' data-internalid='"+res[i]["id"]+"'><i class='icon-star icon-3x'></i></a> ";
					  break;
					default:
					  milestone_icon="";
					}
					
					$("#all_milestones").append(milestone_icon);
            
            
            }
            $("#all_milestones").fadeIn();
            triggerStuff();
        }
    });
	    });
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

                  if (profile_image != 0) {

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
                  } else {
                      $("#all_kids").append("<a href='' class='child_button' data-internalid='" + res[i]["child"] + "'><div class='image-container' style='width:50px;height:50px;'><img src='../assets/img/default_pic.png'></div></a>");



                  }




              }



          }
      });


  }



  function getChildData() {
      $("#all").fadeOut("fast", function () {


          var data = {
              child: current_kid
          };
          $.ajax({
              type: "POST",
              url: "get_current_child.php",
              data: data,
              success: function (res) {
                  res = $.parseJSON(res);
                  if (res == true) {
                      $("#child_name").empty();
                      $("#child_birthday").empty();

                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:whitesmoke;"></div></div><div class="span8"><div style="width:100%;height:409px;float:left; background:whitesmoke;"></div></div></div>');
                      $("#all_kids").html('<div style="width:50px;height:50px;float:left; margin-right:5px;  background:whitesmoke;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:whitesmoke;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:whitesmoke;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:whitesmoke;"></div>');
                      $("#profile_pic").html('<div style="background:whitesmoke;height:100%; width:100%"></div>');


                      $("#all").fadeIn("fast", function () {
                          $('#overlay').fadeIn('fast', function () {
                              $('#new_kid_box').animate({
                                  'top': '160px'
                              }, 500);
                          });
                      });

                  } else {

                      $("#feed").empty();

                      for (var i = 0; i < res.length; i++) {

                          current_kid = res[i]['id'];
                          
                          getAllKids();
                          getCurrentMilestones();

                          var profile_image = res[i]['image'];


                          if (profile_image != 0) {

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

                          } else {
                              $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");
    
                          }
                          var date = res[i]['birthday'];
                          date = date.toString();
                          $("#child_name").html("<h4>" + res[i]['firstname'] + " " + res[i]["lastname"] + "</h4>");
                          $("#child_birthday").html("<p>" + date +"</p>");
                          
                          $("#edit_firstname").val(res[i]["firstname"]);
                           $("#edit_lastname").val(res[i]["lastname"]);
                           $("#edit_birthday").val(res[i]["birthday"]);
                         
                          nodata = false;
                          getData();

                      }


                  }

              }
          });
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
                  
                  var milestone_icon;
                  
                  switch (parseInt(res[i]['milestone']))
					{
					case 1:
					  milestone_icon = "<i class='icon-trophy icon-3x'></i>";
					  break;
					case 2:
					  milestone_icon = "<i class='icon-star icon-3x'></i>";
					  break;
					default:
					  milestone_icon="";
					}
                  

                  var html = '<div class="image-wrapper" data-internalid="' + res[i]["id"] + '">' +
                      '<div class="preview">' +
                      '<a href="" class="image_button" data-image="' + res[i]["location"] + '"><div class="image-container" style="width:409px; height:409px;">' +
                      '<img class="image" data-internalid="' + res[i]["id"] + '" src = "' + res[i]['location'] + '">' +
                      '</div></a>' +
                      '</div>' +
                      '</div>';
                      var dateme = res[i]['date'];
                      var dateArray = dateme.split("-")
                  var now = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
                  //var	date = prettyDate(then);
                  var formated_date = (now.getMonth()+1) +"/"+now.getDate()+"/"+now.getFullYear();
                  var date = now.toDateString();

                  var buttons = '<div class="buttons"><a href="" class="edit_button" data-internalid="' + res[i]["id"] + '"><i class="icon-edit"></i> edit</a> <a href="" class="delete_button" data-internalid="' + res[i]["id"] + '"><i class="icon-minus-sign"></i> delete</a></div>';
                  var text = "<div class='side_text' data-internalid='" + res[i]["id"] + "'><p>" + date + "</p><p>" + res[i]["text"] + "</p><p>"+milestone_icon+"</p></div>";
                  var textbox = "<div class='side_textbox hide' data-internalid='" + res[i]["id"] + "'><select class='side_milestones input-block-level' data-internalid='" + res[i]["id"] + "'>"+milestones+"</select><input class='input-block-level edit_date_change' data-internalid='" + res[i]["id"] + "' type='text' name='edit_date_change' placeholder='(mm/dd/yyyy)' value='"+formated_date+"'><textarea class='input-block-level side_textarea' data-internalid='" + res[i]["id"] + "'>" + res[i]["text"] + "</textarea><button class='btn side_textbutton' data-internalid='" + res[i]["id"] + "'>Edit</button></div>";

                  var sidehtml = '<div class="text-wrapper" data-internalid="' + res[i]["id"] + '">' +
                      text + textbox + buttons +

                  '</div><hr>';

	     $( ".edit_date_change" ).datepicker();


                  $("#feed").append("<div class='row-fluid item' data-internalid='" + res[i]["id"] + "'><div class='span4'>" + sidehtml + "</div><div class='span8'>" + html + "</div></div>");
                  
                  $(".side_milestones").each(function(){
	                  if($(this).attr("data-internalid")==res[i]["id"]){
		                  $(this).val(res[i]["milestone"]);
	                  }
                  })
                  
                  number++;
              }

              $(".image-container").each(function () {
                  $(this).load(function () {
                      adjustImages();
                  });

              });

              triggerStuff();

              if (res.length == 0) { //no date left :( sad day

                  nodata = true;
                  if (number == 0) {
                      $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");
                      
                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:whitesmoke;"></div></div><div class="span8"><div style="width:100%;height:409px;float:left; background:whitesmoke;"></div></div></div>');
                  }
              }

              $("#all").fadeIn("fast");

              loading = false;
          }
      });
  }



  function triggerStuff() {
  
  	 $(".milestone_button").unbind("click");

      $(".milestone_button").click(function (event) {
          event.preventDefault();
          var post_id = $(this).attr("data-internalid");

          $(".item").each(function(){
	          
	         if($(this).attr("data-internalid") == post_id){
		         
		         $('html, body').animate({
		                      scrollTop: $(this).offset().top
		                   }, 1000);
	         } 
          });

      });
  
  

      $(".image_button").unbind("click");

      $(".image_button").click(function (event) {
          event.preventDefault();
          var location = $(this).attr("data-image");
          $("#display_image").html("<img src='" + location + "'>");
          $('#overlay').fadeIn('fast', function () {
              $('#image_box').animate({
                  'top': '160px'
              }, 500);
          });



      });


      $(".child_button").unbind("click");

      $(".child_button").click(function (event) {
          event.preventDefault();

          var id = $(this).attr("data-internalid");
          $(".child_button").each(function () {
              if ($(this).attr("data-internalid") === id) {
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
          var new_milestone_icon;
          var new_milestone;
          var new_date;
          var new_date_formatted;
          $(".side_textbox").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  new_text = $(this).children(".side_textarea").val();
                  new_milestone = $(this).children(".side_milestones").val();
                     new_date = $(this).children(".edit_date_change").val();
               
                     new_date_formatted = new Date(new_date);
                  new_date_formatted = new_date_formatted.toDateString();
                  
                  switch (parseInt(new_milestone))
					{
					case 1:
					  new_milestone_icon = "<i class='icon-trophy icon-3x'></i>";
					  break;
					case 2:
					  new_milestone_icon = "<i class='icon-star icon-3x'></i>";
					  break;
					default:
					  new_milestone_icon="";
					}

                  $(this).slideUp();
              }
          });

          $(".side_text").each(function () {
              if ($(this).attr("data-internalid") === id) {
                  $(this).html("<p>"+new_date_formatted+"</p><p>" + new_text + "</p><p>"+new_milestone_icon+"</p>");                  
                  $(this).slideDown();
              }
          });



          var data = {
              id: id,
              text: new_text, 
              milestone: new_milestone,
              date: new_date
          };
          $.ajax({
              type: "POST",
              url: "update-text.php",
              data: data,
              success: function (res) {
                  if (res == true) {
                      //success action
                      
                                            getCurrentMilestones();

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

      $("#delete_kid_button").unbind("click");

      $('#delete_kid_button').click(function (event) {
          if (confirm("Are you sure you want to delete this child?")) {

              var data = {
                  child: current_kid,
              };
              $.ajax({
                  type: "POST",
                  url: "delete_kid.php",
                  data: data,
                  success: function (res) {
   
                  $('#edit_kid_box').animate({
                      'top': '-1000px'
                  }, 500, function () {
                  		
                  $('#overlay').fadeOut('fast', function () {

                      current_kid = null;

                      number = 0;
                      getChildData();

                  });
                  

                  });
                      
                      
                      
                      

                  }
              });
          } else {
              return false;
          }
      });




      $(".delete_button").unbind("click");
      $('.delete_button').click(function (event) {
          event.preventDefault();
          if (confirm("Are you sure you want to delete this item?")) {

              var id = $(this).attr("data-internalid");
              var button = $(this);

              var data = {
                  id: id,
                  child: current_kid
              };
              $.ajax({
                  type: "POST",
                  url: "delete_photo.php",
                  data: data,
                  success: function (res) {
                      button.parent(".buttons").parent(".image-wrapper").fadeOut();

                      $(".item").each(function () {
                          if ($(this).attr("data-internalid") === id) {

                              $(this).fadeOut("fast", function () {
                                  if (number == 0) {
                                      $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");
                                      $("#child_name").empty();
                                      $("#child_birthday").empty();

                                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:whitesmoke;"></div></div><div class="span8"><div style="width:100%;height:409px;float:left; background:whitesmoke;"></div></div></div>');
                                  }
                              });
                          }
                      });



                      button.parent(".buttons").parent(".text-wrapper").fadeOut();
                      number--;

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
      
           $('#edit_kid_button').click(function () {
          $('#overlay').fadeIn('fast', function () {
              $('#edit_kid_box').animate({
                  'top': '160px'
              }, 500);
          });
      });
      $('#edit_kid_close').click(function () {
          $('#edit_kid_box').animate({
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
      $('#image_box_close').click(function () {
          $('#image_box').animate({
              'top': '-1000px'
          }, 500, function () {
              $('#overlay').fadeOut('fast');
          });
      });

      $('#text_close').click(function () {
          $('#add_text_box').animate({
              'top': '-1000px'
          }, 500, function () {
              $('#overlay').fadeOut('fast', function () {

                  number = 0;
                  getChildData();



              });


          });
      });
      
     $(function() {
	     $( "#birthday" ).datepicker();
	     $( "#edit_birthday" ).datepicker();
	     $( "#date_change" ).datepicker();

    });

  $("#new_kid_form").validate({

      rules: {
          firstname: "required",
          lastname: "required",
          birthday: "required"

      },
      messages: {
          firstname: "<font style='color:red;'>Please enter a first name</font>",
          lastname: "<font style='color:red;'>Please enter a last name</font>",
          birthday: "<font style='color:red;'>Please enter their birthday</font>"
          
      },
      submitHandler: function (form) {
          $("#new_kid_form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');
          $("#new_kid_form_error").empty();

          var firstname = $("#firstname").val();
          var lastname = $("#lastname").val();
          var birthday = $("#birthday").val();

          var data = {
              firstname: firstname,
              lastname: lastname,
              birthday: birthday
          };
          $.ajax({
              type: "POST",
              url: "add_kid.php",
              data: data,
              success: function (res) {


                  $("#new_kid_form div").remove(".spinner");

                  current_kid = res;
                  $('#new_kid_box').animate({
                      'top': '-1000px'
                  }, 500, function () {
                  
                  	
                  $("#firstname").val("");
                  $("#lastname").val("");
                  $("#birthday").val("");
                  
                      $('#new_photo_box').animate({
                          'top': '160px'
                      }, 500);
                  });
              }
          });
      }
  });
  
  
   $("#edit_kid_form").validate({

      rules: {
          firstname: "required",
          lastname: "required",
          birthday: "required"

      },
      messages: {
          firstname: "<font style='color:red;'>Please enter a first name</font>",
          lastname: "<font style='color:red;'>Please enter a last name</font>",
          birthday: "<font style='color:red;'>Please enter their birthday</font>"
          
      },
      submitHandler: function (form) {
          $("#edit_kid_form").append('<div class="center spinner"><i class="icon-spinner icon-spin"></i></div>');
          $("#edit_kid_form_error").empty();

          var firstname = $("#edit_firstname").val();
          var lastname = $("#edit_lastname").val();
          var birthday = $("#edit_birthday").val();

          var data = {
              firstname: firstname,
              lastname: lastname,
              birthday: birthday,
              child: current_kid
          };
          $.ajax({
              type: "POST",
              url: "edit_kid.php",
              data: data,
              success: function (res) {
                  $("#edit_kid_form div").remove(".spinner");

                  $('#edit_kid_box').animate({
                      'top': '-1000px'
                  }, 500, function () {
                  		
                  $('#overlay').fadeOut('fast', function () {


                      number = 0;
                      getChildData();

                  });
                  

                  });
              }
          });
      }
  });

  
  $("#add_text_button").click(function () {
      var text = $("#add_textarea").val();
            var milestone = $("#milestone_select").val();
            var date = $("#date_change").val();

      console.log(current_photo);

      var data = {
          id: current_photo,
          text: text,
          milestone: milestone,
          date: date
          

      };
      $.ajax({
          type: "POST",
          url: "update-text.php",
          data: data,
          success: function (res) {

              $('#add_text_box').animate({
                  'top': '-1000px'
              }, 500, function () {

                  $('#overlay').fadeOut('fast', function () {


                      number = 0;
                      getChildData();
                      $("#add_textarea").val("");
                      $("#milestone_select").val("");
                         $("#date_change").val("");
                   
                      

                  });


              });


          }
      });




  });