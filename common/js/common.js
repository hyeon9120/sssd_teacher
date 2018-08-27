(function($) {
    'use strict';

    /**
    * Pages.
     * @constructor
     * @property {string}  VERSION      - Build Version.
     * @property {string}  AUTHOR       - Author.
     * @property {string}  SUPPORT      - Support Email.
     * @property {string}  pageScrollElement  - Scroll Element in Page.
     * @property {object}  $body - Cache Body.
     */
    var Pages = function() {
        this.VERSION = "3.0.0";
        this.AUTHOR = "Revox";
        this.SUPPORT = "support@revox.io";

        this.pageScrollElement = 'html, body';
        this.$body = $('body');

        this.setUserOS();
        this.setUserAgent();
		this.setUserAgent();
		
    }

    /** @function setUserOS
    * @description SET User Operating System eg: mac,windows,etc
    * @returns {string} - Appends OSName to Pages.$body
    */
    Pages.prototype.setUserOS = function() {
        var OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

        this.$body.addClass(OSName);
    }

    /** @function setUserAgent
    * @description SET User Device Name to mobile | desktop
    * @returns {string} - Appends Device to Pages.$body
    */
    Pages.prototype.setUserAgent = function() {
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            this.$body.addClass('mobile');
        } else {
            this.$body.addClass('desktop');
            if (navigator.userAgent.match(/MSIE 9.0/)) {
                this.$body.addClass('ie9');
            }
        }
    }
	
	Pages.prototype.getColor = function(color, opacity) {
        opacity = parseFloat(opacity) || 1;
        var elem = $('.pg-colors').length ? $('.pg-colors') : $('<div class="pg-colors"></div>').appendTo('body');
        var colorElem = elem.find('[data-color="' + color + '"]').length ? elem.find('[data-color="' + color + '"]') : $('<div class="bg-' + color + '" data-color="' + color + '"></div>').appendTo(elem);
        var color = colorElem.css('background-color');
        var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var rgba = "rgba(" + rgb[1] + ", " + rgb[2] + ", " + rgb[3] + ', ' + opacity + ')';
        return rgba;
    }
	
	Pages.prototype.initSwitcheryPlugin = function(context) {
		// Switchery - ios7 switch
		window.Switchery && $('[data-init-plugin="switchery"]', context).each(function() {
			var el = $(this);
			new Switchery(el.get(0), {
				color: (el.data("color") != null ?  $.Pages.getColor(el.data("color")) : $.Pages.getColor('success')),
				size : (el.data("size") != null ?  el.data("size") : "default")
			});
		});
	}
	Pages.prototype.initScrollBarPlugin = function(context) {
        $.fn.scrollbar && $('.scrollable', context).scrollbar({
            ignoreOverlay: false
        });
    }
	Pages.prototype.initNotificationCenter = function() {
        $('body').on('click', '.notification-list .dropdown-menu', function(event) {
            event.stopPropagation();
        });
        $('body').on('click', '.toggle-more-details', function(event) {
            var p = $(this).closest('.heading');
            p.closest('.heading').children('.more-details').stop().slideToggle('fast', function() {
                p.toggleClass('open');
            });
        });
    }
	Pages.prototype.init = function() {
        this.initSwitcheryPlugin();
		this.initScrollBarPlugin();
		this.initNotificationCenter();
    }

    $.Pages = new Pages();
    $.Pages.Constructor = Pages;
})(window.jQuery);


var animationTimer;

var hMenu = $("[data-pages-init='horizontal-menu']");
autoHideLi();
$(document).on('click', '.menu-bar > ul > li', function() {
	if ($(this).children("ul").length == 0) {
		return;
	}
	if ($(this).hasClass('opening')) {
		_hideMenu($(this));
	} else {
		_showMenu($(this));
	}

});
$('body').on('click', function (e) {
	if(!$(e.target).parents().hasClass("open")) { 
		$('.horizontal-menu .bar-inner > ul > li').removeClass('open');
		$('.menu-bar > ul > li').removeClass('open opening').children("ul").removeAttr("style");
		$("body").find(".ghost-nav-dropdown").remove();
	}
});
function autoHideLi() {
	var hMenu = $("[data-pages-init='horizontal-menu']");
	var extraLiHide = parseInt(hMenu.data("hideExtraLi")) || 0
	if (hMenu.length == 0) {
		return
	}
	var hMenuRect = hMenu[0].getBoundingClientRect();
	var liTotalWidth = 0;
	var liCount = 0;
	hMenu.children('ul').children('li.more').remove();
	hMenu.children('ul').children('li').each(function(index) {
		$(this).removeAttr("style");
		liTotalWidth = liTotalWidth + $(this).outerWidth(true);
		liCount++;
	});

	if ($(window).width() < 992) {
		return;
	}

	var possibleLi = parseInt(hMenuRect.width / (liTotalWidth / liCount)) - 1;
	possibleLi = possibleLi - extraLiHide;


}

function createWrapperLI(hMenu) {
	var li = hMenu.children('ul').append("<li class='more'><a href='javascript:;'><span class='title'><i class='pg pg-more'></i></span></a><ul></ul></li>");
	li = hMenu.children('ul').children('li.more');
	return li;
}

function _hideMenu($el) {
	var ul = $($el.children("ul")[0]);
	var ghost = $("<div class='ghost-nav-dropdown'></div>");
	if (ul.length == 0) {
		return;
	}
	var rect = ul[0].getBoundingClientRect();
	ghost.css({
		"top":"10px",
		"width": rect.width + "px",
		"height": rect.height + "px",
		"z-index": "auto"
	})
	$el.append(ghost);
	var timingSpeed = ul.children("li").css('transition-duration');

	timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
	$el.addClass('closing');
	window.clearTimeout(animationTimer);
	animationTimer = window.setTimeout(function() {
		ghost.height(0);
		$el.removeClass('open opening closing');
	}, timingSpeed - 80);
}

function _showMenu($el) {
	var ul = $($el.children("ul")[0]);
	var ghost = $("<div class='ghost-nav-dropdown'></div>");
	$el.children(".ghost-nav-dropdown").remove();
	$el.addClass('open').siblings().removeClass('open opening');
	if (ul.length == 0) {
		return;
	}
	var rect = ul[0].getBoundingClientRect();
	ghost.css({
		"top":"10px",
		"width": rect.width + "px",
		"height": "0px"
	});
	$el.append(ghost);
	ghost.height(rect.height);
	var timingSpeed = ghost.css('transition-duration');

	timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
	window.clearTimeout(animationTimer);
	animationTimer = window.setTimeout(function() {
		$el.addClass('opening');
		ghost.remove()
	}, timingSpeed);
}

(function($) {
    'use strict';
    // Initialize layouts and plugins
    (typeof angular === 'undefined') && $.Pages.init();
})(window.jQuery);

/* Modal 호출 */
$('.modal-show').click(function() {
	var Target_modal = $(this).attr('href');
	$(Target_modal).modal('show');
});
$('.disabled-click').click(function(e) { //td a클릭시 tr이벤트 disabled
	if (!e) var e = window.event;                
    e.cancelBubble = true;                       
    if (e.stopPropagation) e.stopPropagation();  
    console.log('td clicked');
})

function _gnbMove($_depth1) {
	if($_depth1 == 1) {
		location.href="../mn01/클래스등록.html";
	} else if($_depth1 == 2) {
		location.href="../mn01/클래스검수.html";
	} else if($_depth1 == 3) {
		location.href="../mn01/클래스관리.html";
	} else if($_depth1 == 4) {
		location.href="../mn02/매출현황.html";
	} else if($_depth1 == 5) {
		location.href="../mn02/정산신청.html";
	} else if($_depth1 == 6) {
		location.href="../mn02/정산내역.html";
	} else if($_depth1 == 7) {
		location.href="../calendar/달력.html";
	} else {
		return;
	}
}