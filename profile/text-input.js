var isLoading = false;
$(".dropbox").click(function(){
	if($(this).siblings(".textbox").attr("id") == "textbox1"){
		$(this).hide();
		$("#textbox1").show();
		$("#area1").focus();
		$("#area1").focusout();

	}else{
		$(this).hide();
		$("#textbox2").show();
		$("#area2").focus();
		
	}
});

$(".textbox").mouseout(function(){
	if(isLoading != true){
		if($(this).is(":visible")){
			if($(this).siblings(".dropbox").attr("id") == "dropbox1"){
				$(this).hide();
				$("#dropbox1").show();
				$("#area1").trigger('focusout');
		
			}else{
				$(this).hide();
				$("#dropbox2").show();
				$("#area2").trigger('focusout');
				
			}
		}
	}
});

$("#area1").focus(function(){
	
	$('#area1').keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            high++;
            var text = $("#area1").val();
            if(text != "" && text != null && isLoading != true && $("#area1").is(":visible")){
            	isLoading = true;
	            var data = {
		            text: text,
		            order: high
	            };
	            $.ajax({
	                 type: "POST",
	                 url: "post-text.php",
	                 data: data,
	                 success: function (res) {
	                      var id = res;
	                      		$("#textbox1").hide();
	                      		 var buttons = '<div class="buttons"><a href="" class="delete_button" data-internalid="'+id+'"><i class="icon-minus-sign"></i> delete</a></div>';
	                      		 	var now = new Date(); 
						  var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
						      console.log(then);
    	          		var date = prettyDate(then);
	                      		 var top = '<div class="top">posted '+date+'</div>';
	                      		var html = "<div class='text-wrapper'  data-internalid='"+id+"' data-order='"+high+"'>"+top+"<div class='thetext'>"+text+"</div>"+buttons+"</div>";
	                            $("#feed1").prepend(html);
	                           $("#feed2").prepend($("#dropbox2"));
	                           $("#feed2").prepend($("#textbox2"));
	
	                           $("#dropbox2").fadeIn();
	                           $("#area1").val("");
	                           
	                             triggerStuff();
	                             isLoading = false;
	            
	                 }
	            });
            
            }
            
        }
    });
	
});

$("#area2").focus(function(){
	
	$('#area2').keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            high++;

            var text = $("#area2").val();
            if(text != "" && text != null && isLoading != true && $("#area2").is(":visible")){
	            isLoading = true;
	            var data = {
		            text: text,
		            order: high
		           
	            };
	            $.ajax({
	                 type: "POST",
	                 url: "post-text.php",
	                 data: data,
	                 success: function (res) {
	                       var id = res;
	
	                      		$("#textbox2").hide();
	                      		var buttons = '<div class="buttons"><a href="" class="delete_button" data-internalid="'+id+'"><i class="icon-minus-sign"></i> delete</a></div>';
	                      			var now = new Date(); 
						  var then = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDay(); 
						      then += 'T'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"Z"; 
    	          		var date = prettyDate(then);
	                      		 var top = '<div class="top">posted '+date+'</div>';
	                      		var html = "<div class='text-wrapper' data-internalid='"+id+"' data-order='"+high+"'>"+top+"<div class='thetext'>"+text+"</div>"+buttons+"</div>";
	                            $("#feed2").prepend(html);
	                           $("#feed1").prepend($("#dropbox1"));
	                           $("#feed1").prepend($("#textbox1"));
	                           
	                           $("#dropbox1").fadeIn();
	                           	$("#area2").val("");

	                           	triggerStuff();
	                             isLoading = false;
	            
	                 }
	            });
            
            }
            
        }
    });
	
});