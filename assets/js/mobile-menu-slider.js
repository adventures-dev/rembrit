/* this function removes touch delay*/
(function ($) {
    $.fn.touchMe = function (handler) {
        return $(this).each(function () {
            $.FastButton($(this)[0], handler);
        });
    };
    $.FastButton = function (element, handler) {
        var startX, startY;
        var reset = function () {
            $(element).unbind('touchend');
            $("body").unbind('touchmove.fastClick');
        };
        var onClick = function (event) {
            event.stopPropagation();
            reset();
            handler.call(this, event);
            if (event.type === 'touchend') {
                $.clickbuster.preventGhostClick(startX, startY);
            }
        };
        var onTouchMove = function (event) {
            if (Math.abs(event.originalEvent.touches[0].clientX - startX) > 10 || Math.abs(event.originalEvent.touches[0].clientY - startY) > 10) {
                reset();
            }
        };
        var onTouchStart = function (event) {
            event.stopPropagation();
            $(element).bind('touchend', onClick);
            $("body").bind('touchmove.fastClick', onTouchMove);
            startX = event.originalEvent.touches[0].clientX;
            startY = event.originalEvent.touches[0].clientY;
        };
        $(element).bind({
            touchstart: onTouchStart,
            click: onClick
        });
    };
    $.clickbuster = {
        coordinates: [],
        preventGhostClick: function (x, y) {
            $.clickbuster.coordinates.push(x, y);
            window.setTimeout($.clickbuster.pop, 2500);
        },
        pop: function () {
            $.clickbuster.coordinates.splice(0, 2);
        },
        onClick: function (event) {
            var x, y, i;
            for (i = 0; i < $.clickbuster.coordinates.length; i += 2) {
                x = $.clickbuster.coordinates[i];
                y = $.clickbuster.coordinates[i + 1];
                if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        }
    };
    $(function () {
        document.addEventListener('click', $.clickbuster.onClick, true);
    });
}(jQuery));


//#invokeMenu-left => button to press for left slider
//#invokeMenu-right => button to press for right slider
//#mainpage => main view
//#menu-left => left side menu
//#menu-right => right side menu


/*
	also make sure to include this in the css
	
#mainpage {
    float: left;
    width: 100%;
    left: 0;
     -webkit-transition-duration: 350ms;

}

#menu-right {
    width: 40%;
    float: right;
    height: 100%;
    -webkit-transform: translate3d(100%,0,0);
    position: absolute;
    right: 0;
    -webkit-perspective: 1000px;
	-webkit-transition-duration: 350ms;

}

#menu-left {
    width: 40%;
    float: right;
    height: 100%;
    -webkit-transform: translate3d(-100%,0,0);
    position: absolute;
    left: 0;
    -webkit-perspective: 0px;
    -webkit-transition-duration: 350ms;

}

*/


$(window).resize(function() {

			$('#mainpage').css({
           		'-webkit-transform': 'translate3d(0%, 0, 0)',
           		'-webkit-transition-duration': '0ms'

            });
        	$('#menu-left').css({
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            '-webkit-transition-duration': '0ms'
            }).removeClass('menuOpened');
             $('#menu-right').css({
            '-webkit-transform': 'translate3d(100%, 0, 0)',
            '-webkit-transition-duration': '0ms'

            }).removeClass('menuOpened');	
});


$(function () {
    $('#invokeMenu-left').touchMe(openMenu_left);
});
$(function () {
    $('#invokeMenu-right').touchMe(openMenu_right);
});

function openMenu_left() {

    if ($('#menu-left').hasClass('menuOpened')) {
        $('#mainpage').css({
            '-webkit-transform': 'translate3d(0%, 0, 0)',
            '-webkit-transition-duration': '350ms'

        });
        $('#menu-left').css({
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        }).removeClass('menuOpened');
    } else {
        $('#mainpage').css({
            '-webkit-transform': 'translate3d(40%, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        });
        $('#menu-left').css({
            '-webkit-transform': 'translate3d(0, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        }).addClass('menuOpened');
    }

}

function closeMenu_left() {
    $('#mainpage').css({
        '-webkit-transform': 'translate3d(0%, 0, 0)',
            '-webkit-transition-duration': '350ms'
        
    });
    $('#menu-left').css({
        '-webkit-transform': 'translate3d(100%, 0, 0)',
            '-webkit-transition-duration': '350ms'
        
    });

}

function openMenu_right() {

    if ($('#menu-right').hasClass('menuOpened')) {
        $('#mainpage').css({
            '-webkit-transform': 'translate3d(0%, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        });
        $('#menu-right').css({
            '-webkit-transform': 'translate3d(100%, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        }).removeClass('menuOpened');
    } else {
        $('#mainpage').css({
            '-webkit-transform': 'translate3d(-40%, 0, 0)',
            '-webkit-transition-duration': '350ms'
            
        });
        $('#menu-right').css({
            '-webkit-transform': 'translate3d(0, 0, 0)',
            '-webkit-transition-duration': '350ms'

        }).addClass('menuOpened');
    }

}


function closeMenu_right() {

    $('#mainpage').css({
        '-webkit-transform': 'translate3d(0%, 0, 0)',
            '-webkit-transition-duration': '350ms'

    });
    $('#menu-right').css({
        '-webkit-transform': 'translate3d(100%, 0, 0)',
            '-webkit-transition-duration': '350ms'

    });
    localStorage.setItem('invoked-right', true)

}