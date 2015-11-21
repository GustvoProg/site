(function () {
  window.addEventListener('DOMContentLoaded', ready, false);

  var Game = function() {
    // audio configs
    var self = this;
    var on = false;
    var count = document.getElementById('count');
    var sequence = [];
    var clickNo = 0;
    var strict = false;
    var interval;
    var lightTimeout;
    var errorTone;
    var waitRestart;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // E blue 3 = 329.628
    // C yellow 2 = 277.18
    // A red 1 = 440
    // E green 0 = 659.255
    // error = 800
    var frequencies = [659.255, 440, 277.18, 329.628, 800];
    var allowClick = false;

    var oscillators = frequencies.map(function(value) {
      var oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = value;
      oscillator.start(0);
      return oscillator;
    });

    var gainNodes = oscillators.map(function(value) {
      var gainNode = audioCtx.createGain();
      value.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.value = 0;
      return gainNode;
    });

    // turn on/off
    this.onOff = function() {
      on = !on;
      count.classList.toggle('disabled');
      blink();
      reset();
      resetTimers();
      self.stopTone();
    };

    this.playTone = function(index) {
      console.log('index', index);
      if (index)
      gainNodes[index].gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
    };

    this.stopTone = function() {
      gainNodes.forEach(function(g) {
        g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      });
    };

    // blink display
    function blink() {
      count.classList.toggle('blink');
    }

    function getMove() {
      // Math.floor(Math.random() * (max - min + 1) + min);
      sequence.push(Math.floor(Math.random() * (3 + 1)));
      addCount();
      lightSequence();
      clickNo = 0;
    }

    function setSpeed(step) {
      var speed = [1200, 900, 750, 500];
      if (step < 4) {
        return speed[0];
      }
      if (step < 8) {
        return speed[1];
      }
      if (step < 12) {
        return speed[2];
      }
      return speed[3];
    }

    function addCount() {
      count.textContent = sequence.length;
    }

    function lightSequence() {
      var i = 0;
      allowClick = false;
      document.querySelector('.colorsWrapper').classList.toggle('disableClick');

      document.getElementById(sequence[i]).classList.add('light');
      self.playTone(sequence[i]);
      // time that light keeps on
      interval = setInterval(function() {
        if (document.getElementById(sequence[i])) {
          document.getElementById(sequence[i]).classList.remove('light');
        }
        self.stopTone();
        // time between on/off
        lightTimeout = setTimeout(function() {
          if (document.getElementById(sequence[i])) {
            document.getElementById(sequence[i] + '').classList.add('light');
          }
          self.playTone(sequence[i]);
        }, setSpeed(sequence.length) / 3);
        i++;
        if (i === sequence.length) {
          resetTimers();
          allowClick = true;
          document.querySelector('.colorsWrapper').classList.toggle('disableClick');
        }
      }, setSpeed(sequence.length));
    }

    function reset() {
      sequence = [];
      clickNo = 0;
      count.textContent = '--';
      resetTimers();
      clearBoard();
    }

    function resetTimers() {
      clearInterval(interval);
      clearTimeout(lightTimeout);
      clearTimeout(errorTone);
      clearTimeout(waitRestart);
    }

    // clear the lights in case of stop
    function clearBoard() {
      if (document.querySelectorAll('.light')[0]) {
        document.querySelectorAll('.light')[0].classList.remove('light');
      }
    }

    this.checkInput = function(input) {
      if (!allowClick) {
        return false;
      }
      if (sequence[clickNo] == input) {
        clickNo++;
        if (clickNo === sequence.length) {
          // check if winner with 20 points
          if (clickNo === 20) {
            message('win');
            setTimeout(function() {
              self.start();
            }, 3000);
          } else {
            setTimeout(function() {
              getMove();
            }, 300);
          }
        }
      } else {
        message('!!');
        clickNo = 0;
        self.playTone(4);
        errorTone = setTimeout(function() {
          self.stopTone();
          waitRestart = setTimeout(function() {
            if (!strict) {
              message(sequence.length);
              lightSequence();
            } else {
              self.start();
            }
          }, 100);
        }, 1000);
      }
    };

    function message(content) {
      count.textContent = content;
      blink();
    }

    // start game; reset board.
    this.start = function() {
      if (on) {
        reset();
        getMove();
      }
    };

    this.strict = function() {
      strict = !strict;
    };
  };

  var simon = new Game();

  function clickEvent(e) {
    var el = e.target;

    // change button state
    if (el.nodeName.toLowerCase() === 'button' && !el.classList.contains('start')) {
      el.classList.toggle('active');
    }

    // get switch click. turn on/off
    if (el.classList.contains('switch')) {
      simon.onOff();
    }

    // start
    if (el.classList.contains('start')) {
      simon.start();
    }

    // strict
    if (el.classList.contains('strict')) {
      simon.strict();
    }

    // user color click
    if (el.classList.contains('colors')) {
      //simon.checkInput(el.id);
    }
  }

  function mouseDownEvent(e) {
    var el = e.target;
    if (el.classList.contains('colors')) {
      simon.playTone(el.id);
    }
  }

  function mouseUpEvent(e) {
    var el = e.target;
    if (el.classList.contains('colors')) {
      simon.stopTone(el.id);
      simon.checkInput(el.id);
    }
  }

  function ready() {
    // mobile events
    window.addEventListener('touchstart', mouseDownEvent, false);
    window.addEventListener('touchend', mouseUpEvent, false);

    window.addEventListener('click', clickEvent, false);
    window.addEventListener('mousedown', mouseDownEvent, false);
    window.addEventListener('mouseup', mouseUpEvent, false);
  }
})();