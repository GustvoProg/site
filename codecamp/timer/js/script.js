$(document).ready(function() {
  var min = 0,
      sec = 0,
      count = 0,
      running = false,
      pomos = [],
      timerID,
      today = new Date(),
      day = today.getDate(),
      start = document.getElementById('start'),
      reset = document.getElementById('reset'),
      pomosToday = document.getElementById('pomosToday'),
      pomosHistory = document.getElementById('pomosHistory');
  
  if (localStorage.getItem('date') && new Date(localStorage.getItem('date')).getDate() === day) {
    if (localStorage.getItem('pomosToday')) {
      pomosToday.innerHTML = localStorage.getItem('pomosToday');
    }
  } else {
    localStorage.setItem('date', new Date());
    localStorage.setItem('pomosToday', 0);
  }

  if (localStorage.getItem('pomosHistory')) {
    pomosHistory.innerHTML = localStorage.getItem('pomosHistory');
  } else {
    localStorage.setItem('pomosHistory', 0);
  }

  function startEvent () {
    running = true;
    checkTimer();
    start.removeEventListener('click', startEvent, false);
  }

  reset.addEventListener('click', function() {
    var started = $('.started');
    var done = $('.done');
    count = min = sec = 0;
    running = false;
    $('.timer').html(0 + ':' + 0);
    for (var i = 0; i < started.length; i++) {
      started[i].innerHTML = '';
    }
    for (var i = 0; i < done.length; i++) {
      done[i].className = '';
    }
    clearTimeout(timerID);
    start.addEventListener('click', startEvent, false);
  },false);

  start.addEventListener('click', startEvent, false);
  
  $('.timer').html(min + ':' + sec);
  
  function startPomodoro() {
    timerID = setTimeout(function() {
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
      if (pomos[count] && pomos[count] !== 25) {
        pomosToday.innerHTML = Number(pomosToday.innerHTML) + 1;
        localStorage.setItem('pomosToday', Number(pomosToday.innerHTML) + 1);
        localStorage.setItem('pomosHistory', Number(localStorage.getItem('pomosHistory')) + 1);
      }
      getNow();
      count++;
      startPomodoro();
    }    
  }
  
  function getNow() {
    var d = new Date();
    var hourNow = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minuteNow = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var tableRow = $('#pomo' + count).addClass('done');
    var cel = tableRow.children('.started');
    var t = hourNow + ':' + minuteNow;
    cel.html(t);
  }
});



















