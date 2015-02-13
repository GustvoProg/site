$(document).ready(function() {
  
  
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
  });

  
  $('#header').waypoint('sticky');
  
  $('#header').on('click', '#menu', function() {
    $('#hidden-menu').toggleClass('hidden');
  }).on('click', '#hidden-menu', function() {
    $('#hidden-menu').toggleClass('hidden');
  });
  
  /*
  $('.thumbnail').hover(function() {
    $(this).fadeOut(300);
    $(this).fadeIn(300);
  });
  */
  
  $('#parallax').on('click', '#responsive', function() {
    if (innerWidth <=  1040) {
      $('#responsive-modal').modal();
      this.href = 'javascript:void(0)';
    }
  });
});

