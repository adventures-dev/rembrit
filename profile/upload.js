$(function () {

    var dropbox = $('.dropbox'),
        message = $('.message', dropbox);

    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'pic',
        data:{
	      order:function(){
	      		var new_high = parseInt(high)+1;
		      return new_high;
	      }, 
        },
        maxfiles: 1,
        maxfilesize: 50,
        url: 'post_file.php',

        uploadFinished: function (i, file, response) {
            $(".progressHolder").remove();
            high++;
            if ($("#dropbox1").is(":visible")) {
                $("#dropbox1").hide();
               
                $("#dropbox1").children(".preview").remove();

                if (file.type.match(/^video\//)) {
                    displayVideo(file, $("#feed1"), response);

                } else {
                    displayImage(file, $("#feed1"), response);

                }
                $("#feed2").prepend($("#dropbox2"));
 	            $("#feed2").prepend($("#textbox2"));
               
                $("#dropbox2").fadeIn();
                
                message.show();

            } else {

                $("#dropbox2").hide();
                $("#dropbox2").children(".preview").remove();
                if (file.type.match(/^video\//)) {
                    displayVideo(file, $("#feed2"), response);
                } else {
                    displayImage(file, $("#feed2"), response);

                }

                $("#feed1").prepend($("#dropbox1"));
 	                           $("#feed1").prepend($("#textbox1"));
               
                $("#dropbox1").fadeIn();


                message.show();



            }

            // response is the JSON object that post_file.php returns
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
            if (!file.type.match(/^image\//) && !file.type.match(/^video\//)) {
                alert('Only images are allowed!');

                // Returning false will cause the
                // file to be rejected
                return false;
            }
        },

        uploadStarted: function (i, file, len) {

            if (file.type.match(/^image\//)) {
                var image = createImage(file);

            } else if (file.type.match(/^video\//)) {
                var image = createVideo(file);


            }


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
    var videoPreview = '<div class="preview">' +
        '<span class="imageHolder">' +
        '<video controls><source src="video/mp4"><source src="video/mov"><source src="video/ogg"><source src="video/webm"></video>' +
        '<span class="uploaded"></span>' +

    '</span>' +
        '<div class="progressHolder">' +
        '<div class="progress"></div>' +
        '</div>' +
        '</div>';







    function displayVideo(file, feed, id) {
     var buttons = '<div class="buttons"><a href="" class="delete_button" data-order="'+high+'" data-internalid="'+id+'"><i class="icon-minus-sign"></i> delete</a></div>';
     					var now = new Date(); 
						  var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          		var date = prettyDate(then);

	                      		 var top = '<div class="top">posted '+date+'</div>';
     
    var videoTemplate = '<div class="image-wrapper" data-internalid="'+id+'" data-order="'+high+'">' +top+
        '<div class="preview">' +
        '<span class="imageHolder">' +
        '<video controls><source src="video/mp4"><source src="video/mov"><source src="video/ogg"><source src="video/webm"></video>' +
        '</span>' +
        '</div>' +buttons+

    '</div>';

        var preview = $(videoTemplate),
            video = $('video', preview),
            source = $('source', video);

        var reader = new FileReader();

        reader.onload = function (e) {

            // e.target.result holds the DataURL which
            // can be used as a source of the image:

            source.attr('src', e.target.result);
        };

        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(file);

        feed.prepend(preview)
        // Associating a preview container
        // with the file, using jQuery's $.data():
       triggerStuff();

        $.data(file, video);
    }

    function displayImage(file, feed, id) {
    
    
    	          			var now = new Date(); 
						  var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          		var date = prettyDate(then);

	                      		 var top = '<div class="top">posted '+date+'</div>';
	   var buttons = '<div class="buttons"><a href="" class="delete_button" data-internalid="'+id+'"><i class="icon-minus-sign"></i> delete</a></div>';

        var hover_area = '<div class="edit_text_wrapper hide">' +
            '<form class="text_form" data-internalid="' + id + '" method="post"><textarea class="edit_text input-block-level" name="text" id="text_' + id + '"></textarea>' +
            '<input type="submit" class="btn btn-warning pull-left edit_submit hide" value="save">'+
        '</form>' +
            '</div>';

        var imageTemplate = '<div class="image-wrapper" data-internalid="'+id+'" data-order="'+high+'">' +top+
            '<div class="preview">' +
            '<span class="imageHolder">' +
            '<img />' +
            '</span>' +
            '</div>'+hover_area +buttons+ 

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

        feed.prepend(preview)

       triggerStuff();
        // Associating a preview container
        // with the file, using jQuery's $.data():

        $.data(file, image);
    }

    function createVideo(file) {
        var box;
        if ($("#dropbox1").is(":visible")) {
            box = $("#dropbox1");
        } else {
            box = $("#dropbox2");

        }
        var preview = $(videoPreview),
            video = $('video', preview),
            source = $('source', video);

        var reader = new FileReader();

        reader.onload = function (e) {

            // e.target.result holds the DataURL which
            // can be used as a source of the image:

            source.attr('src', e.target.result);
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



    function createImage(file) {
        var box;
        if ($("#dropbox1").is(":visible")) {
            box = $("#dropbox1");
        } else {
            box = $("#dropbox2");

        }
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