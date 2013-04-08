  var nodata = false; //this tells the program if there is no more data to display
  var loading = false; //this tells the program if the ajax is currently running
  var number = 0; //number used to determine location of tables in database
  var high = 0;
  
function prettyDate(time){

	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
	
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}



  $(document).ready(function () {
  
            var visitortime = new Date();
            var visitortimezone = "GMT " + -visitortime.getTimezoneOffset()/60;
            $.ajax({
                type: "GET",
                url: "timezone.php",
                data: 'time='+ visitortimezone,
                success: function(){
                
                }
            });
  
      getData();
  });

  $(window).scroll(function () {

      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100 && loading != true && nodata != true) {
          getData();
      }

  });

  function getData() {

      loading = true;
      var data = {
          ///include all post data in this array
          number: number
      };

      //insert loading icon here
      $("#feed1").append('<div class="center spinner"><i class="icon-spinner icon-spin icon-2x"></i></div>');

      $.ajax({
          type: "POST",
          url: "posts-data.php", //example script can be anything
          data: data,
          success: function (res) {
              res = $.parseJSON(res);
              $("#feed1 div").remove(".spinner"); //remove loading icon here
              for (var i = 0; i < res.length; i++) {
                  //use this section to display all the data, use some .append() or something


                  var hover_area = '<div class="row-fluid edit_text_wrapper hide">' +
                      '<div class="span12">' +
                      '<form class="text_form" data-internalid="' + res[i]["id"] + '" method="post"><textarea class="edit_text input-block-level" name="text" id="text_' + res[i]["id"] + '">' + res[i]['text'] + '</textarea>' +
                      '<input type="submit" class="btn btn-warning pull-left edit_submit hide" value="save">' +
                      '</form>' +
                      '</div>' +
                      '</div>';

                  var buttons = '<div class="buttons"><a href="" class="delete_button" data-internalid="' + res[i]["id"] + '"><i class="icon-minus-sign"></i> delete</a></div>';
                  	var now = new Date(res[i]["datetime"]); 
						  var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          	var	date = prettyDate(then);
                  
                  
                  
                  
                  var top = '<div class="top">posted ' + date + '</div>';

                  if (res[i]['media'] == true) {
                      var html = '<div class="image-wrapper" data-internalid="' + res[i]["id"] + '" data-order="'+res[i]['my_order']+'">' + top +
                          '<div class="preview">' +
                          '<span class="imageHolder">' +
                          '<img src = "' + res[i]['location'] + '">' +
                          '</span>' +
                          '</div>' + hover_area + buttons +

                      '</div>';
                  } else if (res[i]['video'] == true) {
                      var html = '<div class="image-wrapper" data-internalid="' + res[i]["id"] + '" data-order="'+res[i]['my_order']+'">' + top +
                          '<div class="preview">' +
                          '<span class="imageHolder">' +
                          '<video controls><source src = "' + res[i]['location'] + '" type="video/mp4"><source src = "' + res[i]['location'] + '" type="video/mov"><source src = "' + res[i]['location'] + '" type="video/ogg"><source src = "' + res[i]['location'] + '" type="video/webm"></video>' +
                          '</span>' +
                          '</div>' + buttons +

                      '</div>';
                  } else {
                      var html = '<div class="text-wrapper" data-internalid="' + res[i]["id"] + '" data-order="'+res[i]['my_order']+'">' + top +
                          '<div class="thetext">' +
                          res[i]['text'] +
                          '</div>' +
                          buttons +
                          '</div>';

                  }
                  
                  if (i % 2 == 0) {
                      $("#feed2").append(html);
                  } else {
                      $("#feed1").append(html);
                  }
                  
                  if(high < res[i]['my_order']){high = res[i]['my_order'];}


                  number++;
              }

              triggerStuff();


              if (res.length == 0) { //no date left :( sad day
                  //display error message here
                  //$("#feed1").append("<li><h4>no data</h4></li>");
                  nodata = true;
              }


              loading = false;
          }
      });
  }

  function triggerStuff() {

      $(".image-wrapper").hoverIntent(function () {
          $(this).children(".edit_text_wrapper").fadeIn();
      }, function () {
          $(this).children(".edit_text_wrapper").fadeOut();

      });

      $('.edit_text').bind('input propertychange', function () {
          $(this).siblings(".edit_submit").fadeIn();

      });

      $('.text_form').submit(function (event) {
          event.preventDefault();

          $(this).children(".edit_submit").fadeOut();

          var text = $(this).children(".edit_text").val();
          var id = $(this).attr("data-internalid");

          var data = {
              id: id,
              text: text
          };
          $.ajax({
              type: "POST",
              url: "edit_text.php",
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


      $("#feed2").sortable({
          connectWith: ['#feed1'],
          items: ".image-wrapper, .text-wrapper",
          opacity: 0.8,
          cursor: 'move',
          update: function () {
          		resort();


          }
      });
      $("#feed1").sortable({
          connectWith: ['#feed2'],
          items: ".image-wrapper, .text-wrapper",
          opacity: 0.8,
          cursor: 'move',
          update: function () {
          		resort();
          }

      });


  }
  
  function resort(){
	  var order_string = "";
          	var order_number = high;
          	
          	var full_array = [];
          	
          	var feed_one_order = [];
          	$("#feed1 .image-wrapper, #feed1 .text-wrapper").each(function(){
	          	var id = $(this).attr("data-internalid");
	          	
	          	feed_one_order.push(id);
	          	
	          	//order_number--;
	          	//order_string = order_string + id +"="+new_order+"&";
	          	
          	});
          	
          	 var feed_two_order = [];
          	$("#feed2 .image-wrapper, #feed2 .text-wrapper").each(function(){
	          	var id = $(this).attr("data-internalid");
	          	var new_order = order_number;
	          	
	          	var stuff = [id, new_order];
	          	feed_two_order.push(stuff);
	      
	          	
          	});
          	
          	while (feed_one_order.length != 0 || feed_two_order.length != 0){
			  
				  if(feed_two_order[0] != null){
					  full_array.push(feed_two_order[0]);
					  feed_two_order.remove(0);
				  }
				  if(feed_one_order[0] != null){
					  full_array.push(feed_one_order[0]);
					  feed_one_order.remove(0);
				  }
			  
			  }
			  
			  for(var i=0; i<full_array.length; i++){
				  var id = full_array[i];
				  var new_order = order_number;
	          	
				  order_number--;
				  order_string = order_string + id +"="+new_order+"&";
			  }
          	
         var data = {
              order_string:order_string
          };
          $.ajax({
              type: "POST",
              url: "update_order.php",
              data: data,
              success: function (res) {
                 console.log(res);

              }
          });
          
  }

  $(document).ready(function () {
      function slideout() {
          setTimeout(function () {
              $("#response").slideUp("slow", function () {});

          }, 2000);
      }
      
      Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

      $("#response").hide();
      $(function () {

      });
  });