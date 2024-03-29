$(function () {

    var dropbox = $('#new_kid_dropbox'),
        message = $('.message', dropbox);

    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'pic',
        maxfiles: 1,
        maxfilesize: 10,
        url: 'post_new_kid_file.php',
        data:{
	      child:function(){
		      return current_kid;
	      }, 
        },
        uploadFinished: function (i, file, response) {

            $(".progressHolder").remove();
            
            $('#new_kid_photo_box').animate({'top':'-1000px'},500,function(){
           			 $('#overlay').fadeOut('fast');
           			 
	           		 $("#feed").prepend('<div class="center spinner"><i class="icon-spinner icon-spin icon-2x"></i></div>');
	                  number = 0;
	                  console.log(response);
	                  current_kid = response;	
	                  getChildData();
	                  
	                  
	                  $("#new_kid_dropbox").children(".preview").remove();

              
           			 
            });

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

    function createImage(file) {
        var box = $("#new_kid_dropbox");

        var preview = $(template),
            image = $('img', preview);

        var reader = new FileReader();


      $(".image-container img").load(function () {
               		 adjustImages();
               	});

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