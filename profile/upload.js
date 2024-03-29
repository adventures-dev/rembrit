$(document).ready(function () {
    $('#image').on('change', function () {
        $("#imageform").append('<i class="icon-spinner icon-spin"></i>');
        
        var data = {
	        child:current_kid
        }
        $("#imageform").ajaxForm({
        	data:data,
        	clearForm: true,
        	success: function(res){
        	console.log(res);
        	 $('#new_photo_box').animate({
                'top': '-1000px'
            }, 500, function () {
	            
                current_photo = res;
                var date =  new Date();
                var date = (date.getMonth()+1) +"/"+date.getDate()+"/"+date.getFullYear();
                $("#date_change").val(date);
                $('#new_photo_box').animate({
                    'top': '-1000px'
                }, 500, function () {
                
                	var question = questions[Math.floor(Math.random()*questions.length)];	
                	$("#question_textarea").attr("placeholder", question[1]);
                	$("#question_value").val(question[0]);

                    $('#add_text_box').animate({
                        'top': '160px'
                    }, 500);
                });


                $("#imageform div").remove(".spinner");

            });

	        	
        	}
        
        }).submit();
    });
});


$(function () {

    var dropbox = $('#new_photo_dropbox'),
        message = $('.message', dropbox);

    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'pic',
        maxfiles: 1,
        maxfilesize: 5,
        url: 'post_file.php',
        data: {
            child: function () {
                return current_kid;
                
            },
        },
        uploadFinished: function (i, file, response) {
            $(".progressHolder").remove();

            $('#new_photo_box').animate({
                'top': '-1000px'
            }, 500, function () {

                current_photo = response;
                var date =  new Date();
                var date = (date.getMonth()+1) +"/"+date.getDate()+"/"+date.getFullYear();
                $("#date_change").val(date);
                $('#new_photo_box').animate({
                    'top': '-1000px'
                }, 500, function () {
                       	var question = questions[Math.floor(Math.random()*questions.length)];	

                	$("#question_textarea").attr("placeholder", question[1]);
                	
                	$("#question_value").val(question[0]);
                    $('#add_text_box').animate({
                        'top': '160px'
                    }, 500);
                });


                $("#new_photo_dropbox").children(".preview").remove();
                message.show();

            });

        },

        error: function (err, file) {
            switch (err) {
            case 'BrowserNotSupported':
                showMessage('Your browser does not support HTML5 file uploads!');
                break;
            case 'TooManyFiles':
                alert('Too many files! Please select 1 at most!');
                break;
            case 'FileTooLarge':
                alert(file.name + ' is too large! Please upload files up to 5mb.');
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
        var box = $("#new_photo_dropbox");

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