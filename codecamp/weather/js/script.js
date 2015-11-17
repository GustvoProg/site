(function() {
  function getLocation(today, forecast) {
    var lat, lon;
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      ajax('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=1e066c632c6269f8c2d6f6d0df8d7b75', today);
      ajax('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&units=metric&cnt=2&appid=1e066c632c6269f8c2d6f6d0df8d7b75', forecast);
    });
  }

  function ajax(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
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
    };
    request.send();
  }

  function convertToF() {
    var min = document.querySelectorAll('.min'),
      max = document.querySelectorAll('.max'),
      today = document.getElementById('temperature-now');

    for (var i = 0; i < min.length; i++) {
      min[i].innerHTML = min[i].getAttribute('data-fahrenheit');
      max[i].innerHTML = max[i].getAttribute('data-fahrenheit');
    }
    today.innerHTML = today.getAttribute('data-fahrenheit');
  }

  function convertToC() {
    var min = document.querySelectorAll('.min'),
      max = document.querySelectorAll('.max'),
      today = document.getElementById('temperature-now');

    for (var i = 0; i < min.length; i++) {
      min[i].innerHTML = min[i].getAttribute('data-celsius');
      max[i].innerHTML = max[i].getAttribute('data-celsius');
    }
    today.innerHTML = today.getAttribute('data-celsius');
  }

  function toFar(value) {
    return value * 1.8 + 32;
  }

  function changeBackground(id) {
    var i = Math.floor(id / 100);
    if (i === 2 || i === 3 || i === 5) {
      return "url('img/rain.jpg')";
    } else if (i === 6) {
      return "url('img/snow.jpg')";
    } else if (id >= 801) {
      return "url('img/sunny.jpg')";
    } else {
      return "url('img/sunny1.jpg')";
    }
  }

  /*
    200, 300, 500 = chuva
    600 = neve
    800 = limpo
    801> = nuvens
    demais = padrão
  */

  var icons = {
    200: 'thunderstorm',
    201: 'thunderstorm',
    202: 'thunderstorm',
    210: 'lightning',
    211: 'lightning',
    212: 'lightning',
    221: 'lightning',
    230: 'thunderstorm',
    231: 'thunderstorm',
    232: 'thunderstorm',
    300: 'sprinkle',
    301: 'sprinkle',
    302: 'rain',
    310: 'rain-mix',
    311: 'rain',
    312: 'rain',
    313: 'showers',
    314: 'rain',
    321: 'sprinkle',
    500: 'sprinkle',
    501: 'rain',
    502: 'rain',
    503: 'rain',
    504: 'rain',
    511: 'rain-mix',
    520: 'showers',
    521: 'showers',
    522: 'showers',
    531: 'storm-showers',
    600: 'snow',
    601: 'snow',
    602: 'sleet',
    611: 'rain-mix',
    612: 'rain-mix',
    615: 'rain-mix',
    616: 'rain-mix',
    620: 'rain-mix',
    621: 'snow',
    622: 'snow',
    701: 'showers',
    711: 'smoke',
    721: 'day-haze',
    731: 'dust',
    741: 'fog',
    761: 'dust',
    762: 'dust',
    771: 'cloudy-gusts',
    781: 'tornado',
    800: 'day-sunny',
    801: 'cloudy-gusts',
    802: 'cloudy-gusts',
    803: 'cloudy-gusts',
    804: 'cloudy',
    900: 'tornado',
    901: 'storm-showers',
    902: 'hurricane',
    903: 'snowflake-cold',
    904: 'hot',
    905: 'windy',
    906: 'hail',
    957: 'strong-wind' 
  };

  window.addEventListener('DOMContentLoaded', ready, false);
  function ready () {
    getLocation(function(today) {
      var day = document.querySelector('.today');
      document.getElementById('icon-today').className = 'wi wi-' + icons[today.weather[0].id];
      document.getElementById('container').style.backgroundImage = changeBackground(today.weather[0].id);
      document.getElementById('city').innerHTML = today.name;
      document.getElementById('temperature-now').innerHTML = Math.round(today.main.temp);
      document.getElementById('temperature-now').setAttribute('data-celsius', Math.round(today.main.temp));
      document.getElementById('temperature-now').setAttribute('data-fahrenheit', Math.round(toFar(today.main.temp)));
      day.getElementsByClassName('min')[0].innerHTML = ' ' + Math.round(today.main.temp_min);
      day.getElementsByClassName('min')[0].setAttribute('data-celsius', Math.round(today.main.temp_min));
      day.getElementsByClassName('min')[0].setAttribute('data-fahrenheit', Math.round(toFar(today.main.temp_min)));
      day.getElementsByClassName('max')[0].innerHTML = ' ' + Math.round(today.main.temp_max);
      day.getElementsByClassName('max')[0].setAttribute('data-celsius', Math.round(today.main.temp_max));
      day.getElementsByClassName('max')[0].setAttribute('data-fahrenheit', Math.round(toFar(today.main.temp_max)));
    }, function(forecast) {
      var days = document.querySelectorAll('.day'),
        today = Date.now(),
        tomorrow = new Date(today + 86400000),
        afterTomorrow = new Date(today + (86400000 * 2)),
        week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // tomorrow
      days[0].getElementsByClassName('icon')[0].className = 'icon wi wi-' + icons[forecast.list[0].weather[0].id];
      days[0].getElementsByClassName('date')[0].innerHTML = week[tomorrow.getDay()];
      days[0].getElementsByClassName('min')[0].innerHTML = ' ' + Math.round(forecast.list[0].temp.min);
      days[0].getElementsByClassName('min')[0].setAttribute('data-celsius', Math.round(forecast.list[0].temp.min));
      days[0].getElementsByClassName('min')[0].setAttribute('data-fahrenheit', Math.round(toFar(forecast.list[0].temp.min)));
      days[0].getElementsByClassName('max')[0].innerHTML = ' ' + Math.round(forecast.list[0].temp.max);
      days[0].getElementsByClassName('max')[0].setAttribute('data-celsius', Math.round(forecast.list[0].temp.max));
      days[0].getElementsByClassName('max')[0].setAttribute('data-fahrenheit', Math.round(toFar(forecast.list[0].temp.max)));
      // after tomorrow
      days[1].getElementsByClassName('icon')[0].className = 'icon wi wi-' + icons[forecast.list[1].weather[0].id];
      days[1].getElementsByClassName('date')[0].innerHTML = week[afterTomorrow.getDay()];
      days[1].getElementsByClassName('min')[0].innerHTML = ' ' + Math.round(forecast.list[1].temp.min);
      days[1].getElementsByClassName('min')[0].setAttribute('data-celsius', Math.round(forecast.list[1].temp.min));
      days[1].getElementsByClassName('min')[0].setAttribute('data-fahrenheit', Math.round(toFar(forecast.list[1].temp.min)));
      days[1].getElementsByClassName('max')[0].innerHTML = ' ' + Math.round(forecast.list[1].temp.max);
      days[1].getElementsByClassName('max')[0].setAttribute('data-celsius', Math.round(forecast.list[1].temp.max));
      days[1].getElementsByClassName('max')[0].setAttribute('data-fahrenheit', Math.round(toFar(forecast.list[1].temp.max)));
    });
    window.addEventListener('click', clickEvent, false);
  }

  function clickEvent (e) {
    var el = e.target;
    if (el.classList.contains('celsius')) {
      convertToC();
      document.querySelectorAll('.active')[0].className = 'unit fahrenheit';
      document.getElementById('celsius').classList.add('active');
    } else if (el.classList.contains('fahrenheit')) {
      convertToF();
      document.querySelectorAll('.active')[0].className = 'unit celsius';
      document.getElementById('fahrenheit').classList.add('active');
    }
    else {
      return false;
    }
  }
}());