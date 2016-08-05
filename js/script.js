var workItem = $('.work__inner');
workItem.click(function(){
	var popup = $(this).next();
	if (!popup.hasClass('popup--visible')) {
		popup.addClass('popup--visible');
	};
	var popupClose = popup.find('.popup__close');
	popupClose.click(function(){
		popup.removeClass('popup--visible');
	});
	popup.click(function(){
		popup.removeClass('popup--visible');
	});
	popup.find('.popup__inner').click(function(e) {
		e.stopPropagation();
	});
})

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('.popup--visible').removeClass('popup--visible');
    }
});

$('.popup--visible').click(function(){
	alert(1)
});
