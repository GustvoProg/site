$(document).ready(function() {
  var min = 0;
  var sec = 0;
  var count = 0;
  var running = false;
  
  $('.timer').html(min + ':' + sec);
  
  $('#start').on('click', function() {
    running = true;
    checkTimer();
  });
  
  function startPomodoro() {
    setTimeout(function() {
      running = true;
      if (min === 0 && sec === 0) {
        running = false;
      }
      if (running) {
        if (sec === 0) {
          sec = 59;
          min -= 1;
        }
        else {
          sec--;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        $('.timer').html(min + ':' + sec);
        sec = Number(sec);
        startPomodoro();
      }
      else {
        document.getElementById('play').play();
        checkTimer();
      }
    }, 1000);
  }
  
  function checkTimer() {
    var pomos = [25,5,25,5,25,5,25,15];
    if (count <= pomos.length) {
      min = pomos[count];
      getNow();
      count++;
      startPomodoro();
    }    
  }
  
  function getNow() {
    var d = new Date();
    var hourNow = d.getHours();
    var minuteNow = d.getMinutes();
    var tableRow = $('#pomo' + count).addClass('done');
    var cel = tableRow.children('.started');
    var t = hourNow + ':' + minuteNow;
    cel.html(t);
  }
});



















