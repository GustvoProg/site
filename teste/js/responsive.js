$(document).ready(function() {
  $('.site-input').on('click', '#test', function () 
    {
      $('iframe').attr('src', $('#website').val());
      $('.site-input').children('h3').fadeIn(300);
      $('#results').show(300);
    }).on('focus', '#website', function () {
      $('#website').val('http://');
  });
});