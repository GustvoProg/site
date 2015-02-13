$(document).ready(function() {
  $('.site-input').on('click', '#test', function() {
    var reg = /(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g;
    if (!reg.test($('#website').val())) {
      alert('Por favor, digite um endereço URL válido! Ex: http://www.meusite.com.br');
    } else {
      $('#last-call').replaceWith($('footer'));
      $('iframe').attr('src', $('#website').val());
      //$('.site-input').children('h3').fadeIn(300);
      $('#results').show(300);
    };
  }).on('focus', '#website', function() {
    $('#website').val('http://');
  });
});