(function() {
  var clickNumber = 0;
  var lintedResult;
	var c = {
    clearAll: function(field) {
      field.innerHTML = '';
    },
    clearLastEntry: function(field) {
      field.innerHTML = field.innerHTML.slice(0, -1);
    }
  };

  var result = document.getElementById('result'),
    calculator = document.getElementById('calculator');

  function getClickInput(e) {
    var t = e.target;
    if (t.nodeName.toLowerCase() === 'button') {
      if (t.innerHTML === 'CE') {
        c.clearLastEntry(result);
        return false;
      } else if (t.innerHTML === 'CA') {
        c.clearAll(result);
        return false;
      }
      if (clickNumber > 0 && t.classList.contains('operator')) {
        clickNumber = 0;
        if (t.innerHTML === '=') {
          clickNumber++;
          if (result.innerHTML === '') {
            result.innerHTML = '';
          } else {
            lintedResult = lintResult();
            result.innerHTML = eval(lintedResult); 
          }
        } else {
          result.innerHTML += t.innerHTML;
        }
      } else if (!t.classList.contains('operator')) {
        result.innerHTML += t.innerHTML;
        clickNumber++;
      }
    }
  }

  function lintResult() {
    var r = result.innerHTML;
    var regex = /[\d\+\-\/\*=.%]/;
    if (regex.test(r)) return r;
    return 0;
  }

  function getKeyInput(e) {
    if ((e.charCode >= 42 && e.charCode <= 57) || 
       (e.charCode >= 96 && e.charCode <= 111) ||
        e.charCode === 190 || e.charCode === 171) {
      result.innerHTML += e.key;
    } else if (e.keyCode === 13 || e.charCode === 61) {
      if (result.innerHTML === '') {
        result.innerHTML = '';
      } else {
        lintedResult = lintResult();
        result.innerHTML = eval(lintedResult);  
      }
    } else if (e.keyCode === 8) {
      c.clearLastEntry(result);
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    calculator.addEventListener('click', getClickInput, false);
    window.addEventListener('keypress', getKeyInput, false);
  }, false);

}());