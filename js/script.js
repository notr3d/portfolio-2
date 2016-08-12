$(document).ready(function(){
	
//navigation-----------------------------------------------------------
	
/*var navItem = $('.site-nav').children();
var pages = $('.page-container').children(); 
navItem.click(function(){
	$(this).addClass('site-nav__item--active');
	$(this).siblings().removeClass('site-nav__item--active');
	var id = $(this).index();
	var currentPage = pages.eq(id);
	currentPage.addClass('page--active');
	currentPage.siblings().removeClass('page--active');
});
var siteNavButton = $('.site-nav__button');
siteNavButton.click(function(){
	alert(1);
});*/

//header
/*var siteHeader = $('.site-header');
var siteHeaderActiveState = 0;
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	if (scrollTop > siteHeaderActiveState) {
		siteHeader.addClass('site-header--fixed');
	} else {
		//siteHeader.removeClass('site-header--fixed')
	};
});*/

var siteNav = $('.site-nav');
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();	
	var siteNavOffsetTop = siteNav.offset().top;
	if (scrollTop > siteNavOffsetTop) {
		siteNav.addClass('site-nav--fixed');
	} else if (scrollTop < siteNavOffsetTop) {
		siteNav.removeClass('site-nav--fixed');
	};	
	var page = $('.page');
	var heights = [];
	page.each(function(){
		var height = $(this).offset().top;
		heights.push(height);
		for (var i = 0; i < heights.length; i++) {
			if (scrollTop > heights[i]) {
				$('.site-nav__wrapper').children().eq(i).siblings().removeClass('site-nav__item--active');
				$('.site-nav__wrapper').children().eq(i).addClass('site-nav__item--active');
			} else if (scrollTop < heights[0]) {
				$('.site-nav__item').removeClass('site-nav__item--active');
			}
		}
	});	
});
var siteNavItem = $('.site-nav__item');
var pages = $('.page-container').children(); 
siteNavItem.click(function(e){
	e.preventDefault();
	/*$(this).addClass('site-nav__item--active');
	$(this).siblings().removeClass('site-nav__item--active');*/
	var id = $(this).attr('href');
	var id = $(this).index();
	var currentPage = pages.eq(id);
	var currentPage = pages.eq(id);
	currentPage.addClass('page--active');
	currentPage.siblings().removeClass('page--active');
	var id = $(this).attr('href');
	var page = $(id);
	$('body').stop().animate({
        scrollTop: $(id).offset().top + 1
    }, 300);
});

//modal window--------------------------------------------------------

/*var portfolioItem = $('.portfolio__inner');
portfolioItem.click(function(){
	var modal = $(this).next();
	if (!modal.hasClass('modal--visible')) {
		modal.addClass('modal--visible');
	};
	$('.modal--visible').click(function(){
		$(this).removeClass('modal--visible');
	});
	$('.modal__inner').click(function(e) {
		e.stopPropagation();
	});
	var modalClose = $('.modal__close');
	modalClose.click(function(){
		$('.modal--visible').removeClass('modal--visible');
	});
	var slideButton = $('.modal__slide');
	slideButton.click(function(e){
		e.stopPropagation();
		$('.modal--visible').removeClass('modal--visible');
		var currentPortfolioItem = $(this).parents('.portfolio__item');
		if ($(this).hasClass('modal__slide--left')) {
			if (currentPortfolioItem.is(':first-child')) {
				currentPortfolioItem = currentPortfolioItem.parent().children().last();
			} else {
				currentPortfolioItem = currentPortfolioItem.prev();
			};			
		} else if ($(this).hasClass('modal__slide--right')) {
			if (currentPortfolioItem.is(':last-child')) {
				currentPortfolioItem = currentPortfolioItem.parent().children().first();
			} else {
				currentPortfolioItem = currentPortfolioItem.next();
			};
		};
		currentPortfolioItem.children('.modal').addClass('modal--visible');
	});
});*/

	
/*var portfolioItem = $('.portfolio__inner');
portfolioItem.click(function(){
	var index = $(this).parent().index();	
	var modal = $('.modal__item').eq(index);
	modal.addClass('modal__item--active');
})
$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
        $('.modal__item--active').removeClass('modal__item--active');
    }
});*/

var portfolioItem = $('.portfolio__item');
var modalActiveClass = 'modal--active';	
var modalItemActiveClass = 'modal__item--active';	
var body = $('body');
var bodyModalOpenClass = 'modal-open';
var modal = $('.modal');
var modalWrapper = modal.find('.modal__wrapper');
var modalItem = modalWrapper.children();
	
//открываем модальное окно
portfolioItem.click(function(){		
	modal.addClass(modalActiveClass);
	body.addClass(bodyModalOpenClass);
	var portfolioItemNumber = $(this).index();	
	modalWrapper.click(function(){
		closeModal();
	});	
	modalItem.eq(portfolioItemNumber).addClass(modalItemActiveClass);
	var modalInner = modalItem.children();
	modalInner.click(function(e){
		e.stopImmediatePropagation();
	});	
	var modalCloseButton = modal.find('.modal__button--close');
	modalCloseButton.click(function(){
		closeModal();
	});
});

//переключение
var modalSlideButton = modal.find('.modal__button--slide');	
var modalSlideButtonType = '';
modalSlideButton.click(function(){
	if ($(this).hasClass('modal__button--prev')) {
		modalSlideButtonType = 'prev';
	} else if ($(this).hasClass('modal__button--next')) {
		modalSlideButtonType = 'next';
	}
	slideModal(modalSlideButtonType);
});

//закрываем модальное окно
var closeModal = function(){
	$('.' + modalActiveClass).removeClass(modalActiveClass);
	$('.' + modalItemActiveClass).scrollTop(0);
	$('.' + modalItemActiveClass).removeClass(modalItemActiveClass);
	body.removeClass(bodyModalOpenClass);
};	
	
var slideModal = function(){
	var activeSlide = modalItem.filter('.' + modalItemActiveClass);
	activeSlide.scrollTop(0);
	if (modalSlideButtonType == 'prev') {
		if (activeSlide.is(':first-child')) {
			activeSlide = activeSlide.siblings().last();
		} else {
			activeSlide = activeSlide.prev();
		}
	} else if (modalSlideButtonType == 'next') {
		if (activeSlide.is(':last-child')) {
			activeSlide = activeSlide.siblings().first();
		} else {
			activeSlide = activeSlide.next();
		}
	}
	activeSlide.addClass(modalItemActiveClass);
	activeSlide.siblings().removeClass(modalItemActiveClass);
}	

$(document).keyup(function(e) {
    if (e.keyCode == 27) { 
        closeModal();
    };
	if (e.keyCode == 37) {
		modalSlideButtonType = 'prev';
		slideModal(modalSlideButtonType);
	};
	if (e.keyCode == 39) {
		modalSlideButtonType = 'next';
		slideModal(modalSlideButtonType);
	};	
});

});