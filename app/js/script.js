"use strict";

$(function () {
  $('.unsub__button').on('click', function () {
    $('footer').toggleClass('mooved');
  });
  $(window).on('wheel', function (e) {
    if (e.originalEvent.wheelDelta > 0) {
      $('footer').removeClass('mooved');
    }
  }); // собираем все якоря; устанавливаем время анимации и количество кадров

  var anchors = [].slice.call($('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;
  console.log(anchors);
  anchors.forEach(function (item) {
    // каждому якорю присваиваем обработчик события
    $(item).on('click', function (e) {
      // убираем стандартное поведение
      e.preventDefault(); // для каждого якоря берем соответствующий ему элемент и определяем его координату Y

      var coordY = document.querySelector($(item).attr('href')).getBoundingClientRect().top + window.pageYOffset; // запускаем интервал, в котором

      var scroller = setInterval(function () {
        // считаем на сколько скроллить за 1 такт
        var scrollBy = coordY / framesCount; // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто

        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          // то скроллим на к-во пикселей, которое соответствует одному такту
          window.scrollBy(0, scrollBy);
        } else {
          // иначе добираемся до элемента и выходим из интервала
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        } // время интервала равняется частному от времени анимации и к-ва кадров

      }, animationTime / framesCount);
    });
  });
});