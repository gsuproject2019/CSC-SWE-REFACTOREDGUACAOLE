
$(function(){
	'use strict';
	var windowWidth = $(window).width();
	//js for nav icon 
	var clickMenubtn = $('#nav-icon1');
	clickMenubtn.on('click', function(){
		$(this).toggleClass('open');
	});
	//js for tabs
	var tabsClick = $('.tabs .tab-links a, .tab-links-2 a, .tab-links-3 a');
	var multiItem = $('.slick-multiItem');
	var multiItem2 = $('.slick-multiItem2');
	tabsClick.on('click', function(e)  {
		var currentAttrValue = $(this).attr('href');
		var tabsCurrent = $('.tabs ' + currentAttrValue);
		// Show/Hide Tabs
		tabsCurrent.show().siblings().hide();
		// Change/remove current tab to active
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		e.preventDefault();
		//reset position for tabs
		multiItem.slick('setPosition');
		multiItem2.slick('setPosition');
	});
	// js for time count down
	function getTimeRemaining(endtime) {
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor((t / 1000) % 60);
	  var minutes = Math.floor((t / 1000 / 60) % 60);
	  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	  var days = Math.floor(t / (1000 * 60 * 60 * 24));
	  return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	function initializeClock(id, endtime) {
	  var clock = document.getElementById(id);
	  if( clock != null){
		var daysSpan = clock.querySelector('.days');
		var hoursSpan = clock.querySelector('.hours');
		var minutesSpan = clock.querySelector('.minutes');
		var secondsSpan = clock.querySelector('.seconds');
		var updateClock = function() {
	    var t = getTimeRemaining(endtime);

	    daysSpan.innerHTML = t.days;
	    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	    if (t.total <= 0) {
	      clearInterval(timeinterval);
	    }
	  }
	  updateClock();
	  var timeinterval = setInterval(updateClock, 1000);
	  }
	}
	var deadline = new Date(Date.parse(new Date()) + 25 * 24 * 60 * 60 * 1000);
	initializeClock('clockdiv', deadline);

	//js for twitter
	var tweets = jQuery(".tweet");
	jQuery(tweets).each( function( t, tweet ) { 
    var id = jQuery(this).attr('id');
    twttr.widgets.createTweet(
      id, tweet, 
      {
        conversation : 'none',    // or all
        cards        : 'hidden',  // or visible 
        linkColor    : 'default', // default is blue
        theme        : 'light'    // or dark
      });
    }); 


    // close popup for mobile
    var closebt = $(".close");
   	closebt.on('click', function(e){
		e.preventDefault();
		var overlay = $(".overlay");
		overlay.removeClass("openform");
	});	
    //js for multi selected
    var multiselect = $(".ui.fluid.dropdown");
    multiselect.dropdown({
		allowLabels:true
	})
	multiselect.dropdown({'set selected': 'Role1,Role2'});
	//== scroll function for single page
	$(window).scroll(function(event) {
		/* Act on the event */
		var scrollPos = $(window).scrollTop(),
		header = $('header');
		//sticky for menu
		if(scrollPos > 300){
			header.addClass('sticky');
		}else{
			header.removeClass('sticky');
		}
	});		
	//back to top js
	var backtotop = $('#back-to-top');
    backtotop.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

   // scroll down landing page
	var scrolldownlanding = $('#discover-now');
    scrolldownlanding.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(document).height()-$(window).height()
        }, 700);
    });

	//sticky sidebar
	if(windowWidth > 1200){
		console.log('sds')
		var stickySidebar = $('.sticky-sb');
		var mainCt = $('.main-content');
		if (stickySidebar.length > 0) {	
			var stickyHeight = stickySidebar.height(),
			sidebarTop = stickySidebar.offset().top;
		}
		// on scroll move the sidebar
		$(window).scroll(function () {
		  if (stickySidebar.length > 0) {	
		    var scrollTop = $(window).scrollTop();
		            
		    if (sidebarTop < scrollTop) {
		      stickySidebar.css('top', scrollTop - sidebarTop+ 80);

		      // stop the sticky sidebar at the footer to avoid overlapping
		      var sidebarBottom = stickySidebar.offset().top + stickyHeight,
		        stickyStop = mainCt.offset().top + mainCt.height();
		      if (stickyStop < sidebarBottom) {
		        var stopPosition = mainCt.height() - stickyHeight + 130;
		        stickySidebar.css('top', stopPosition);
		      }
		    }
		    else {
		      stickySidebar.css('top', '0');
		    } 
		  }
		});
		$(window).resize(function () {
		  if (stickySidebar.length > 0) {	
		    stickyHeight = stickySidebar.height();
		  }
		});
	}
	// $(window).on('load',function() {

	// });

});
