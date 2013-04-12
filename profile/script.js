  var nodata = true; //this tells the program if there is no more data to display
  var loading = false; //this tells the program if the ajax is currently running
  var number = 0; //number used to determine location of tables in database
  var current_kid;
  var current_photo;
  var milestones;
  var selected_year;
  var selected_month;
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
  
  function getTimeLine(){
	  
	  var data = {
		  child: current_kid
	  };
	  $.ajax({
	       type: "POST",
	       url: "timeline.php",
	       data: data,
	       success: function (res) {
	            var current_date = new Date();
	            
	            var current_year = current_date.getFullYear();
	            var current_month = current_date.getMonth()+1;

	            var old_date = new Date(res);
	            var old_year = old_date.getFullYear();

	            if(selected_year == null){
		            selected_year = current_year;
	            }
	            if(selected_month == null){
		            selected_month = current_month;
	            }
	            
	            $("#timeline").empty();
	            
	          	            		
	            for(var i = current_year; i>=old_year; i--){
	            
	            	  var months = "<div class='months hide'><a href='' class='month_button' data-month='11' data-year='"+i+"'><li>December</li></a>"+
	            	  	"<a href='' class='month_button' data-month='11' data-year='"+i+"'><li>November</li></a>"+
	            		"<a href='' class='month_button' data-month='10' data-year='"+i+"'><li>October</li></a>"+
	            		"<a href='' class='month_button' data-month='9' data-year='"+i+"'><li>September</li></a>"+
	            		"<a href='' class='month_button' data-month='8' data-year='"+i+"'><li>August</li></a>"+
	            		"<a href='' class='month_button' data-month='7' data-year='"+i+"'><li>July</li></a>"+
	            		"<a href='' class='month_button' data-month='6' data-year='"+i+"'><li>June</li></a>"+
	            		"<a href='' class='month_button' data-month='5' data-year='"+i+"'><li>May</li></a>"+
	            		"<a href='' class='month_button' data-month='4' data-year='"+i+"'><li>April</li></a>"+
	            		"<a href='' class='month_button' data-month='3' data-year='"+i+"'><li>March</li></a>"+

		            		"<a href='' class='month_button' data-month='2' data-year='"+i+"'><li>Febuary</li></a>"+
            		"<a href='' class='month_button' data-month='1' data-year='"+i+"'><li>January</li></a></div>";
	            
		            if(i == selected_year){
			            $("#timeline").append("<div class='year'><a href='' class='year_button' data-year='"+i+"'><li class='active year'>"+i+"</li></a>"+months+"</div>");
		            }else{
			            $("#timeline").append("<div class='year'><a href='' class='year_button' data-year='"+i+"'><li class='year'>"+i+"</li></a>"+months+"</div>");

		            }
		            
	            }
	            	triggerStuff();
	            	
	            	  $(".image-container").each(function () {
	                  $(this).load(function () {
	                      adjustImages();
	                  });
	
	              });

	            
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
                  var child_id = res[i]['id'];
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
                                  $("#all_kids").append("<a href='' class='child_button' data-internalid='" + child_id + "'><div class='image-container' style='width:50px;height:50px;'><img src='../assets/img/default_pic.png'></div></a>");
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
                      $("#all_kids").append("<a href='' class='child_button' data-internalid='" +child_id + "'><div class='image-container' style='width:50px;height:50px;'><img src='../assets/img/default_pic.png'></div></a>");



                  }




              }



          }
      });


  }



  function getChildData() {
      $("#all").fadeOut("fast", function () {

          var data = {
              child: current_kid,
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

                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:white;"></div></div><div class="span8"><div style="width:100%;height:362px;float:left; background:white;"></div></div></div>');
                      $("#all_kids").html('<div style="width:50px;height:50px;float:left; margin-right:5px;  background:white;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:white;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:white;"></div><div style="width:50px;height:50px;float:left; margin-right:5px;  background:white;"></div>');
                      $("#profile_pic").html('<div style="background:white;height:100%; width:100%"></div>');


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
                          
                          getTimeLine();
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
          child: current_kid,
           year: selected_year,
           month:selected_month

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
                      '<a href="" class="image_button" data-image="' + res[i]["location"] + '"><div class="image-container" style="width:362px; height:362px;">' +
                      '<img class="image" data-internalid="' + res[i]["id"] + '" src = "' + res[i]['location_small'] + '">' +
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
                  var text = "<div class='side_text' data-internalid='" + res[i]["id"] + "'><p><i class='icon-time'></i> " + date + "</p><p>" + res[i]["text"] + "</p><p>"+milestone_icon+"</p></div>";
                  var textbox = "<div class='side_textbox hide' data-internalid='" + res[i]["id"] + "'><select class='side_milestones input-block-level' data-internalid='" + res[i]["id"] + "'>"+milestones+"</select><input class='input-block-level edit_date_change' data-internalid='" + res[i]["id"] + "' type='text' name='edit_date_change' placeholder='(mm/dd/yyyy)' value='"+formated_date+"'><textarea class='input-block-level side_textarea' data-internalid='" + res[i]["id"] + "'>" + res[i]["text"] + "</textarea><button class='btn side_textbutton' data-internalid='" + res[i]["id"] + "'>Edit</button></div>";

                  var sidehtml = '<div class="text-wrapper" data-internalid="' + res[i]["id"] + '">' +
                      text + textbox + buttons +

                  '</div>';



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
	     $( ".edit_date_change" ).datepicker();

              if (res.length == 0) { //no date left :( sad day

                  nodata = true;
                  if (number == 0) {
                      $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");
                      
                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:white;"></div></div><div class="span8"><div style="width:100%;height:362px;float:left; background:white;"></div></div></div>');
                  }
              }

              $("#all").fadeIn("fast");

              loading = false;
          }
      });
  }



  function triggerStuff() {
  			             
                      	var new_number;
                      	if(number != 0)
	                      	new_number = number *(362+5);        
                      	else
	                      	new_number = 362+5;          
  			  $("#line").attr("y2", new_number);
          $("#bottom_circle").attr("cy", new_number);
          $("#myline").css("height", new_number+20);
                      
  	$(".year_button").unbind("click");

      $(".year_button").click(function(event) {
            event.preventDefault();

              if ($(this).siblings(".months").is(":visible")){
	              $(this).siblings(".months").slideUp();

              }else{
                            
			      $(this).siblings(".months").slideDown();

 
              }
              
              });
  
  
  	 	$(".month_button").unbind("click");

      $(".month_button").click(function (event) {
          event.preventDefault();
          selected_year = $(this).attr("data-year");
          selected_month = $(this).attr("data-month");

          number = 0;
          getChildData();

      });
  
  
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
              
                                current_kid = id;
                  number = 0;
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

                              $(this).fadeOut(function () {
                              
                      number--;
                      
                      	var new_number;
                      	if(number != 0)
	                      	new_number = number *(362+5);        
                      	else
	                      	new_number = 362+5;        
                      	
  			  $("#line").attr("y2", new_number);
          $("#bottom_circle").attr("cy", new_number);
          $("#myline").css("height", new_number+20);

                              
                              
                               if (number == 0) {
                                      $("#profile_pic").html("<img src='../assets/img/default_pic.png'>");
                                      $("#child_name").empty();
                                      $("#child_birthday").empty();

                                      $("#feed").html('<div class="row-fluid"><div class="span4"><div style="width:100%;height:150px;float:left; background:white;"></div></div><div class="span8"><div style="width:100%;height:362px;float:left; background:white;"></div></div></div>');
		                                  }
		                              });
		                          }
		                      });



                     
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