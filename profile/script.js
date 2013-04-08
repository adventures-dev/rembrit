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
                          '<img src = "' + res[i]['location'] + '">' +
                          '</span>' +
                          '</div>'+

                      '</div>';
    
                      $("#feed").append(html);
          
                  

                  number++;
              }


              if (res.length == 0) { //no date left :( sad day

                  nodata = true;
              }


              loading = false;
          }
      });
  }