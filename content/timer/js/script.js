//TODO: Portar para Angular
$(document).ready(function() {
  var min = 0,
      sec = 0,
      count = 0,
      running = false,
      pomos = [],
      start = document.getElementById('start');

  function startEvent () {
    running = true;
    checkTimer();
    start.removeEventListener('click', startEvent, false);
  }

  start.addEventListener('click', startEvent, false)
  
  $('.timer').html(min + ':' + sec);
  
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
        
        if (min < 10) {
          min = '0' + min;
        }
        $('.timer').html(min + ':' + sec);
        sec = Number(sec);
        min = Number(min);
        startPomodoro();
      }
      else {
        document.getElementById('play').play();
        checkTimer();
      }
    }, 1000);
  }
  
  function checkTimer() {
    pomos = [25,5,25,5,25,5,25,15];
    if (count != pomos.length) {
      min = pomos[count];
      getNow();
      count++;
      startPomodoro();
    }    
  }
  
  function getNow() {
    var d = new Date();
    //TODO: Filter AngularJS
    var hourNow = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minuteNow = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var tableRow = $('#pomo' + count).addClass('done');
    var cel = tableRow.children('.started');
    var t = hourNow + ':' + minuteNow;
    cel.html(t);
  }
});



















