$(function () {

    var dropbox = $('.dropbox'),
        message = $('.message', dropbox);

    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'pic',
        maxfiles: 1,
        maxfilesize: 10,
        url: 'post_file.php',

        uploadFinished: function (i, file, response) {
        
            $(".progressHolder").remove();
            console.log(response);
               
                $("#dropbox").children(".preview").remove();

    
                 displayImage(file, $("#feed"), response);

        message.show();

        },

        error: function (err, file) {
            switch (err) {
                case 'BrowserNotSupported':
                    showMessage('Your browser does not support HTML5 file uploads!');
                    break;
                case 'TooManyFiles':
                    alert('Too many files! Please select 1 at most! (configurable)');
                    break;
                case 'FileTooLarge':
                    alert(file.name + ' is too large! Please upload files up to 50mb (configurable).');
                    break;
                default:
                    break;
            }
        },

        // Called before each upload is started
        beforeEach: function (file) {
            if (!file.type.match(/^image\//)) {
                alert('Only images are allowed!');

                // Returning false will cause the
                // file to be rejected
                return false;
            }
        },

        uploadStarted: function (i, file, len) {
          var image = createImage(file);
        },

        progressUpdated: function (i, file, progress) {
            $.data(file).find('.progress').width(progress);

        }

    });

    var template = '<div class="preview">' +
        '<span class="imageHolder">' +
        '<img />' +
        '<span class="uploaded"></span>' +
        '</span>' +
        '<div class="progressHolder">' +
        '<div class="progress"></div>' +
        '</div>' +
        '</div>';


    function displayImage(file, feed, id) {
    

        var imageTemplate = '<div class="image-wrapper" data-internalid="'+id+'">'+
            '<span class="imageHolder">' +
            '<img />' +
            '</span>' +
        '</div>';




        var preview = $(imageTemplate),
            image = $('img', preview);

        var reader = new FileReader();

        reader.onload = function (e) {
            // e.target.result holds the DataURL which
            // can be used as a source of the image:
            image.attr('src', e.target.result);
            
        };
        
        
        
        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(file);

        
        // Associating a preview container
        // with the file, using jQuery's $.data():

        $.data(file, image);
        
           			var now = new Date(); 
					var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          	var	date = prettyDate(then);
                     var buttons = '<div class="buttons"><a href="" class="edit_button" data-internalid="' + id + '"><i class="icon-edit"></i> edit</a> <a href="" class="delete_button" data-internalid="' + id + '"><i class="icon-minus-sign"></i> delete</a></div>';

                        var text = "<div class='side_text' data-internalid='" + id + "'><p></p></div>";
                    var textbox = "<div class='side_textbox hide' data-internalid='" + id + "'><textarea class='input-block-level side_textarea' data-internalid='" + id + "'></textarea><button class='btn side_textbutton' data-internalid='" + id + "'>Edit</button></div>";

                   var sidehtml = '<div class="text-wrapper" data-internalid="' + id + '">'+
                      			'<p>posted '+date+'</p>'+text+textbox+buttons+
                      
                   				'</div><hr>';

                  $("#feed").prepend("<div class='row-fluid item' data-internalid='"+id+"'><div class='span4'>"+sidehtml+"</div><div class='span8 main_image' data-internalid='" + id+ "'></div></div>");

                  $(".main_image").each(function(){
	                  if($(this).attr("data-internalid") === id.toString()){
		                  $(this).append(preview);
	                  }
                  })
                   				
                   triggerStuff();
        
    }

    function createImage(file) {
        var box = $("#dropbox");

        var preview = $(template),
            image = $('img', preview);

        var reader = new FileReader();

        image.width = 100;
        image.height = 100;

        reader.onload = function (e) {

            // e.target.result holds the DataURL which
            // can be used as a source of the image:

            image.attr('src', e.target.result);
        };

        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(file);

        message.hide();
        preview.appendTo(box);

        // Associating a preview container
        // with the file, using jQuery's $.data():

        $.data(file, preview);
    }

    function showMessage(msg) {
        message.html(msg);
    }

});