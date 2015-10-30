(function(){
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

  function getClickInput (e) {
    var t = e.target;
    if (t.nodeName.toLowerCase() === 'button') {
      if (t.innerHTML === 'CE') {
        c.clearLastEntry(result);
      } else if (t.innerHTML === 'CA') {
        c.clearAll(result);
      } else if (t.innerHTML === '=') {
        if (result.innerHTML === '') {
          result.innerHTML = '';
        } else {
          result.innerHTML = eval(result.innerHTML);  
        }
      } else {
        result.innerHTML += t.innerHTML;
      }
    }
  }

  function getKeyInput (e) {
    if ((e.charCode >= 42 && e.charCode <= 57) || 
       (e.charCode >= 96 && e.charCode <= 111) ||
        e.charCode === 190 || e.charCode === 171) {
      result.innerHTML += e.key;
    } else if (e.keyCode === 13 || e.charCode === 61) {
      if (result.innerHTML === '') {
        result.innerHTML = '';
      } else {
        result.innerHTML = eval(result.innerHTML);  
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