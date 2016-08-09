var workItem = $('.work__inner');
workItem.click(function(){
	var popup = $(this).next();
	if (!popup.hasClass('popup--visible')) {
		popup.addClass('popup--visible');
	};
	popup.click(function(){
		popup.removeClass('popup--visible');
	});
	popup.find('.popup__inner').click(function(e) {
		e.stopPropagation();
	});
	var popupClose = popup.find('.popup__close');
	popupClose.click(function(){
		popup.removeClass('popup--visible');
	});
})

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
        $('.popup--visible').removeClass('popup--visible');
    }
});

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