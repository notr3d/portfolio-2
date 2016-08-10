//popup window

var workItem = $('.work__inner');
workItem.click(function(){
	var popup = $(this).next();
	if (!popup.hasClass('popup--visible')) {
		popup.addClass('popup--visible');
	};
	$('.popup--visible').click(function(){
		$(this).removeClass('popup--visible');
	});
	$('.popup__inner').click(function(e) {
		e.stopPropagation();
	});
	var popupClose = $('.popup__close');
	popupClose.click(function(){
		$('.popup--visible').removeClass('popup--visible');
	});
	var slideButton = $('.popup__slide');
	slideButton.click(function(e){
		e.stopPropagation();
		$('.popup--visible').removeClass('popup--visible');
		var currentWorkItem = $(this).parents('.work__item');
		if ($(this).hasClass('popup__slide--left')) {
			if (currentWorkItem.is(':first-child')) {
				currentWorkItem = currentWorkItem.parent().children().last();
			} else {
				currentWorkItem = currentWorkItem.prev();
			};			
		} else if ($(this).hasClass('popup__slide--right')) {
			if (currentWorkItem.is(':last-child')) {
				currentWorkItem = currentWorkItem.parent().children().first();
			} else {
				currentWorkItem = currentWorkItem.next();
			};
		};
		currentWorkItem.children('.popup').addClass('popup--visible');
	});
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
        $('.popup--visible').removeClass('popup--visible');
    }
});


//navigation
var navItem = $('.site-nav').children();
var pages = $('.page-container').children(); 
navItem.click(function(){
	$(this).addClass('site-nav__item--active');
	$(this).siblings().removeClass('site-nav__item--active');
	var id = $(this).index();
	var currentPage = pages.eq(id);
	currentPage.addClass('page--active');
	currentPage.siblings().removeClass('page--active');
});


//header
var siteHeader = $('.site-header');
var siteHeaderActiveState = 0;
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	if (scrollTop > siteHeaderActiveState) {
		siteHeader.addClass('site-header--fixed');
	} else {
		siteHeader.removeClass('site-header--fixed')
	};
});