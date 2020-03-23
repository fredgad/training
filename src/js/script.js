/**
* Ajax form
*/

// ======= Ajax Submit Form Plugin =======
(function($) {
  $.fn.simpleSendForm = function(options) {
      // Options
      options = $.extend({
          successTitle: "Спасибо, что выбрали нас!",
          successText: "Мы свяжемся с Вами в ближайшее время.",
          errorTitle: "Сообщение не отправлено!",
          errorSubmit: "Ошибка отправки формы!",
          errorNocaptcha: "Вы не заполнили каптчу",
          errorCaptcha: "Вы не прошли проверку каптчи",
          mailUrl: "/form-submit/submit.php",
          autoClose: false,
          autoCloseDelay: 5000,
          debug: false,
          captcha: false,
          captchaPublicKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
      }, options);

      if(options.captcha) {
          window.onload = function () {
              var addScriptCaptcha = document.createElement('script');
              addScriptCaptcha.src = 'https://www.google.com/recaptcha/api.js';
              document.body.appendChild(addScriptCaptcha);
          };
      }

      // Submit function
      var make = function() {
          var $this = $(this),
              form = $this.find('.form__form'),
              btn = $this.find('.btn-submit'),
              captcha = $this.find('.recaptcha');

          if(options.captcha) {
              captcha.append('<div class="g-recaptcha" data-sitekey="' + options.captchaPublicKey + '"></div>')
          }

          $(this).submit(function() {
              var data = $(this).serialize();
              function errorRes(errorMessage) {
                  btn.parents(form).removeClass('sending');
                  $this.append('<div class="form__error alert alert-danger text-center">' + errorMessage + '</div>');
                  setTimeout(function() {
                      $this.find('.form__error').remove();
                  }, 5000);
              }
              $.ajax({
                  url: options.mailUrl,
                  type: "POST",
                  data: data,
                  beforeSend: function() {
                      btn.parents(form).addClass('sending');
                  },
                  success: function(res) {
                      if (res == 1) {
                          $this[0].reset();
                          if(options.captcha) {
                              grecaptcha.reset();
                          }
                          $this.find('.form__hide-success').slideUp().delay(5000).slideDown();
                          btn.parents('.form__form').removeClass('sending');
                          $this.find('.form__hide-success').after('<div class="form__sys-message alert alert-success text-center"></div>');
                          $this.find('.form__sys-message').html('<h4 class="form__success-title">' + options.successTitle + '</h4><p class = "form__success-text" >' + options.successText + '</p>');
                          setTimeout(function() {
                              $this.find('.form__sys-message').fadeOut().delay(3000).remove();
                              if (options.autoClose) {
                                  $.magnificPopup.close();
                              }
                          }, options.autoCloseDelay);
                      } else if (res == 2) {
                          errorRes(options.errorNocaptcha);
                      } else if (res == 3) {
                          errorRes(options.errorCaptcha);
                      } else {
                          errorRes(options.errorSubmit);
                      }
                      if(options.debug) {
                          console.log(res);
                      }
                  },
                  error: function() {
                      errorRes(options.errorSubmit);
                  }
              });
              return false;
          });
      };

      return this.each(make);
  };
})(jQuery);

/**
* Initializations scripts file
*/

jQuery(document).ready(function($) {

  // ======= Init form =======
  $('#feedbackForm').simpleSendForm({
      successTitle: "Спасибо! Ваша подписка на Training успешно оформлена.",
      successText: "",
      captcha: false,
      mailUrl: "/mail/training/form-submit/submit.php"
  });

  // ======= Init form =======
  $('#feedbackForm2').simpleSendForm({
      successTitle: "<span style='color:white;'>Спасибо! Ваша подписка на Training успешно оформлена.</span>",
      successText: "",
      captcha: false,
      mailUrl: "/mail/training/form-submit/submit.php",
  });

  // ======= Init form =======
  $('#feedbackForm3').simpleSendForm({
      successTitle: "<span style='color:white;'>Спасибо! Ваша подписка на новости успешно оформлена.</span>",
      successText: "",
      captcha: false,
      mailUrl: "/mail/training/form-submit/submit.php",
  });

  // ======= Init form =======
  $('#feedbackForm4').simpleSendForm({
      successTitle: "<span style='color:white;'>Выполнено. Вы отписались от рассылки.</span>",
      successText: "",
      captcha: false,
      mailUrl: "/mail/training/form-submit/submit.php",
  });

  // ===== Init modal form ====
  $('#callbackForm').simpleSendForm({
      successTitle: "Ваша заявка принята!",
      successText: "Наш сотрудник свяжется с Вами в самое ближайшее время.",
      autoClose: true,
      autoCloseDelay: 3000,
      mailUrl: "/mail/training/submit.php",
      captcha: false
  });

  // ======= Init magnific popup ======= 
  $('.modal-popup').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'mfp-top-up'
  });

}); // end ready





// Custom events
$(function() {

$('.unsub__button').on('click', ()=> { 
  $('footer').toggleClass('mooved')
  setTimeout(()=> {
    $('html, body').animate({scrollTop: document.body.scrollHeight},"slow");
  }, 150)
});

$(window).on('wheel', (e)=> {
  if(e.originalEvent.wheelDelta > 0) {
    $('footer').removeClass('mooved')
  }
});

$(window).on('scroll', (e)=> {
  $('#toTop').addClass('mooved')
  setTimeout(()=> {
    $('#toTop').removeClass('mooved')
  }, 100)
});

$('#toTop').on('click', ()=> {
  $('html, body').animate({ scrollTop: 0 }, 800);
});













// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call($('a[href*="#"]')),
      animationTime = 300, 
      framesCount = 20;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  $(item).on('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector($(item).attr('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});


});
