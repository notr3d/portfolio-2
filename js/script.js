$(document).ready(function(){
	
//navigation-----------------------------------------------------------

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
	toggleModalDescription();
});
	
//скрываем боковое меню если его не видно
var toggleModalDescription = function(){
	var activeSlide = modalItem.filter('.' + modalItemActiveClass);
	var modalDescription = activeSlide.find('.modal__col--right');
	var modalDescriptionHeight = modalDescription.outerHeight();
	var modalScrollUpButton = modal.find('.modal__button--slide-up');
	var modalScrollUpButtonActiveClass = 'visible';
	modalScrollUpButton.click(function(){
		activeSlide.animate({scrollTop: 0});
	});
	activeSlide.scroll(function(){	
		var modalScrollHeight = activeSlide.scrollTop();
		var modalColumnHiddenClass = 'modal__col--hidden';
		if (modalScrollHeight > modalDescriptionHeight) {
			modalDescription.addClass(modalColumnHiddenClass);
			modalScrollUpButton.addClass(modalScrollUpButtonActiveClass);
		} else if (modalScrollHeight < modalDescriptionHeight) {
			modalDescription.removeClass(modalColumnHiddenClass);
			modalScrollUpButton.removeClass(modalScrollUpButtonActiveClass);
		}
	});
}
	
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
	toggleModalDescription();
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
};

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