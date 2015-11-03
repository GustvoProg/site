(function(){
	var url = 'https://en.wikipedia.org/w/api.php?' +
				'format=json&action=query&generator=search' + 
				'&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts' +
				'&pilimit=max&exintro&explaintext&exsentences=1' +
				'&exlimit=max&gsrsearch=';

	function ajax(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function(e) {
      // There was a connection error of some sort
      console.warn(e);
      console.warn('url', url);
    };
    request.send();
  }

  function submit(e) {
    e.preventDefault();
    var query = document.getElementById('search').value;
    ajax('http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + query + '&callback=JSON_CALLBACK', function(data) {
      console.log(data);
    });
  }

  window.addEventListener('DOMContentLoaded', ready, false);
  function ready() {
    document.getElementById('wikiForm').addEventListener('submit', submit, false);
  }
}());