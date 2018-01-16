/*
Item name: Full Screen Navigation
Author: http://codecanyon.net/user/marcoarib
License: http://codecanyon.net/licenses
*/

;(function ( $, window, document, undefined ) {

	$.FSNav = function(element, options) {

        var defaults = {
            showSpeed: 300,
			hideSpeed: 300,
			animation: "zoom",
            onShow: function() {},
			onHide: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;
		var contentDefaultPaddingTop = $(element).find(".full-screen-nav-content").css("padding-top");

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            
			buttonHideNav();
			$(window).resize(function(){
				adjustMenuPadding();
			});
        }
		
		plugin.showNav = function() {
            $(element).addClass(plugin.settings.animation).fadeIn(plugin.settings.showSpeed, function(){
				if(options !== undefined){
					plugin.callback("onShow");
				}
			});
			adjustMenuPadding();
        }
		
		plugin.hideNav = function() {
            $(element).removeClass(plugin.settings.animation).fadeOut(plugin.settings.hideSpeed);
			if(options !== undefined){
				plugin.callback("onHide");
			}
        }
		
		plugin.setShowSpeed = function(speed) {
            plugin.settings.showSpeed = speed;
        }
		
		plugin.setHideSpeed = function(speed) {
            plugin.settings.hideSpeed = speed;
        }
		
		plugin.setAnimation = function(animation) {
            plugin.settings.animation = animation;
        }
		
        var buttonHideNav = function() {
            $(element).children(".full-screen-nav-close").on("click touchstart", function(){
				plugin.hideNav();
			});
        }

		var adjustMenuPadding = function() {
			var contentHeight = $(element).find(".full-screen-nav-content").innerHeight();
			var innerElementsHeight = $(element).find(".full-screen-nav-menu, .full-screen-nav-lists, .full-screen-nav-boxes, .full-screen-nav-circles, .full-screen-nav-general").innerHeight();
			if(innerElementsHeight > contentHeight){
				$(element).find(".full-screen-nav-content").css("padding-top", contentDefaultPaddingTop);
			}
			else{
				$(element).find(".full-screen-nav-content").css("padding-top", (contentHeight - innerElementsHeight) / 2);
			}
        }

		plugin.callback = function(func) {
			if (options[func] !== undefined) {
				options[func].call(element);
			}
		}

        plugin.init();

    }

    $.fn.FSNav = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('FSNav')) {
                var plugin = new $.FSNav(this, options);
                $(this).data('FSNav', plugin);
            }
        });
    }

	
})( jQuery, window, document );
