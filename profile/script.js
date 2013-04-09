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
          url: "profile_data.php", //example script can be anything
          data: data,
          success: function (res) {
              res = $.parseJSON(res);
              $("#feed div").remove(".spinner"); //remove loading icon here
              for (var i = 0; i < res.length; i++) {
                  //use this section to display all the data, use some .append() or something

                 

                      var html = '<div class="image-wrapper" data-internalid="' + res[i]["id"] + '">'+
                          '<div class="preview">' +
                          '<span class="imageHolder">' +
                          '<img class="image" data-internalid="' + res[i]["id"] + '" src = "' + res[i]['location'] + '">' +
                          '</span>' +
                          '</div>'+
                      '</div>';
    
                  
                      
                
                      
                    var now = new Date(res[i]["datetime"]); 
					var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          	var	date = prettyDate(then);
                    var buttons = '<div class="buttons"><a href="" class="edit_button" data-internalid="' + res[i]["id"] + '"><i class="icon-edit"></i> edit</a> <a href="" class="delete_button" data-internalid="' + res[i]["id"] + '"><i class="icon-minus-sign"></i> delete</a></div>';
                   var sidehtml = '<div class="text-wrapper" data-internalid="' + res[i]["id"] + '">'+
                      			'<p>posted '+date+'</p><div class="text" data-internalid="' + res[i]["id"] + '"><p>'+ res[i]["text"] + '</p></div></p>'+buttons+
                      
                   				'</div><hr>';
          
                   			

                   				    $("#feed").append("<div class='row-fluid item' data-internalid='" + res[i]["id"] + "'><div class='span4 '>"+sidehtml+"</div><div class='span8'>"+html+"</div></div>");
                  number++;
              }
              triggerStuff();


              if (res.length == 0) { //no date left :( sad day

                  nodata = true;
              }


              loading = false;
          }
      });
  }
  
  
  
  function triggerStuff() {
  
	  
  
          
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
                      
                      $(".item").each(function(){
	                     	if($(this).attr("data-internalid") === id){
		                     	
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
  