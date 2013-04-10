
function adjustImages(){


	$('.image-container').each(function(i, obj) {
		var image = $(obj).children();
		if(image.width() > image.height()){
		    var width = image.width();
			var height = image.height();
			var ratio = width/height;
		    image.css("height", "100%");
		    
		   var newheight = image.height();
		   var newwidth = newheight*ratio;
		   
		   
		  // image.css("min-width", newwidth);
		   var new_left_margin = parseInt((width-newwidth)/2);
		   	
		   //image.css("margin-left", new_left_margin);
		   if(image.css('margin-left') === "0px"){
			   image.css("margin-left", new_left_margin);

		   }
		
		   
			  image.css("min-width", newwidth);
			  
			  
			 

		   
	    }else if(image.width() != image.height()){
		     var width = image.width();
			var height = image.height();
			var ratio = height/width;

		    image.css("width", "100%");
		    
		   var newwidth= image.width();	
		   var newheight = newwidth*ratio;
		   image.css("min-height", newheight);
		   
		   	var new_top_margin = parseInt((height-newheight)/2);
		   	if(image.css('margin-top') === "0px"){
			   image.css("margin-top", new_left_margin);

		   }
		   

	    }

		
		
    });

    

		
}