$(document).ready(function() {
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
});

