(function(){
	var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&' +
            'generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&' +
            'pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

  function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  function submit(e) {
    e.preventDefault();
    var results = document.getElementById('results');
    results.innerHTML = '';
    var search = document.getElementById('search').value;
    var query = document.getElementById('query');
    jsonp(url + search + '&callback=?', function(data) {
      // success
      if (data.query) {
        for (var item in data.query.pages) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          var h3 = document.createElement('h3');
          var p = document.createElement('p');
          a.href = 'http://en.wikipedia.org/?curid=' + item;
          a.target = '_blank';
          h3.textContent = data.query.pages[item].title;
          p.textContent = data.query.pages[item].extract;
          a.appendChild(h3);
          a.appendChild(p);
          li.appendChild(a);
          results.appendChild(li);
        }
        query.textContent = search;
        query.parentElement.style.display = 'block';
        results.style.display = 'block';
        // error
      } else {
        results.textContent = 'Could not find anything from ' + search;
        results.style.display = 'block';
      }
    });
    document.getElementById('search').blur();
  }

  function autocomplete(e) {
    var el = e.target;
    if (el.value.length > 3) {
      var search = document.getElementById('search').value;
      var list = document.getElementById('complete');
      jsonp(url + search + '&callback=?', function(data) {
        if (data.query) {
          for (var item in data.query.pages) {
            var option = document.createElement('option');
            option.setAttribute('value', data.query.pages[item].title);
            list.appendChild(option);
          }
        }
      });
    }
  }

  window.addEventListener('DOMContentLoaded', ready, false);
  function ready() {
    document.getElementById('wikiForm').addEventListener('submit', submit, false);
    document.getElementById('search').addEventListener('keyup', autocomplete, false);
  }
}());