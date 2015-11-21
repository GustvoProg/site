(function() {
  // ready event
  window.addEventListener('DOMContentLoaded', readyEvent, false);

  // avoid retrieving document every time
  var doc = document;
  var startButton = doc.getElementById('start');
  var resetButton = doc.getElementById('reset');
  var moreButton = doc.getElementById('more');

  var Data = function() {
    var self = this;
    this.set = function(field, data) {
      var storedData = self.get(field) ? self.get(field) : [];
      storedData.push(data);
      localStorage.setItem(field, JSON.stringify(storedData));
    };
    this.get = function(field) {
      return JSON.parse(localStorage.getItem(field));
    };
  };

  var Pomodoro = function() {
    var self = this;
    var pomos = [25,5,25,5,25,5,25,15];
    var pomosDone = 0;
    var min = 0;
    var sec = 0;
    var running = false;
    var oneSecondTimeout;
    var data = new Data();

    // get start button click
    this.start = function() {
      running = true;
      showNotification('Pomodoro is now running!', 'Pomodoro');
      checkTimer();
      self.refreshHistory();
      startButton.removeEventListener('click', startClick, false);
    };

    this.reset = function() {
      doc.getElementById('mask').style.height = 0;
      pomosDone = min = sec = 0;
      running = false;
      updateTimer(0, 0);
      clearStarted();
      clearTimeout(oneSecondTimeout);
      startButton.addEventListener('click', startClick, false);
    };

    function showNotification(nBody, nTitle) {
      var options = {
        body: nBody
      };

      if (!('Notification' in window)) {
        return false;
      }

      if (Notification.permission === 'granted') {
        var n = new Notification(nTitle, options);  
        setTimeout(n.close(), 4000);
      } else {
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') {
            var n = new Notification(nTitle, options);
            setTimeout(n.close(), 4000);
          }
        });
      }
      
    }

    // clear started time
    function clearStarted() {
      var started = doc.querySelectorAll('.started');
      for (var i = 0; i < started.length; i++) {
        started[i].innerHTML = '';
      }
    }

    function startPomodoro() {
      oneSecondTimeout = setTimeout(function() {
        running = true;
        if (min === 0 && sec === 0) {
          running = false;
        }
        if (running) {
          updateMask();
          if (sec === 0) {
            sec = 59;
            min -= 1;
          } else {
            sec--;
          }
          if (sec < 10) sec = '0' + sec;
          if (min < 10) min = '0' + min;

          updateTimer(min, sec);
          sec = Number(sec);
          min = Number(min);
          startPomodoro();
        } else {
          doc.getElementById('play').play();
          checkTimer();
        }
      }, 1000);
    }

    function checkTimer() {
      if (pomosDone !== pomos.length) {
        if (pomos[pomosDone] && pomos[pomosDone] !== 25) {
          showNotification('Pomo finished. Time to rest!', 'Pomodoro');
          data.set('pomosHistory', new Date());
          self.refreshHistory();
        }
        min = pomos[pomosDone];
        pomoStartedTime();
        pomosDone++;
        doc.getElementById('mask').style.height = 0;
        startPomodoro();
      }
    }

    this.refreshHistory = function() {
      doc.getElementById('pomosToday').textContent = getPomosMadeToday();
      doc.getElementById('pomosHistory').textContent = data.get('pomosHistory').length;
    };

    function getPomosMadeToday() {
      var p = data.get('pomosHistory');
      var today = toLocalDate(new Date());
      var count = 0;
      var date;
      for (var i = p.length - 1; i >= 0; i--) {
        date = new Date(Date.parse(p[i]));
        if (date.getDate() === today.getDate()) {
          count++;
        }
      }
      return count;
    }

    function toLocalDate(date) {
      var offset = new Date().getTimezoneOffset();
      return new Date(date.getTime() - (offset * 60 * 1000));
    }

    function updateTimer(min, sec) {
      var timer = doc.querySelectorAll('.timer');
      for (var i = 0; i < timer.length; i++) {
        timer[i].textContent = min + ':' + sec;
      }
    }

    // update the time the pomo started
    function pomoStartedTime() {
      var d = new Date();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var cel = doc.querySelectorAll('.started')[pomosDone];
      cel.textContent = hour + ':' + minute;
    }

    function formatPercentageHeight(element) {
      var h = element.style.height;
      return Number(h.substr(0, h.indexOf('%')));
    }

    function updateMask() {
      var pomosHeight = pomos[pomosDone - 1] * 60;
      var move = 100 / pomosHeight;
      var el = doc.getElementById('mask');
      if (el.style.height) {
        el.style.height = formatPercentageHeight(el) + move + '%';
      } else {
        el.style.height = el.style.height + move + '%';
      }
    }
  };

  var timer = new Pomodoro();

  function readyEvent() {
    // register click events
    startButton.addEventListener('click', startClick, false);
    resetButton.addEventListener('click', resetClick, false);
    moreButton.addEventListener('click', moreClick, false);

    timer.refreshHistory();
  }

  function startClick() {
    timer.start();
  }

  function resetClick() {
    timer.reset();
  }

  function moreClick() {
    doc.getElementById('history').classList.toggle('hide');
  }
}());