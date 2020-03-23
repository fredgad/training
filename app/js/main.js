$(document).ready(function() {

	$('.offer__btn').on('click', function(e) {
		e.preventDefault();
		elementCick = $(this).attr('href');
		destination = $(elementCick).offset().top;
		$('body, html').animate({scrollTop: destination}, 800);
	});

	$('.programm__point').on('click', function() {
		$(this).find('.programm__btn').toggleClass('programm__btn_active');
		$('.programm__point').not(this).find('.programm__btn').removeClass('programm__btn_active');
		$(this).next().slideToggle(500);
		$('.programm__point').not(this).next().slideUp(500);
	});
});


