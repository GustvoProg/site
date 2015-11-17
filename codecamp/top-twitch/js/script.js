(function() {
  var context = [],
    activePanel,
    radios = document.querySelectorAll('input[type=radio]');

  var linkSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAxklEQVRIie3UPQrCMBjG8b+L1V7EzdHJ2cWTiLN38AjiKi5ORfzuZXRyE1cVqYMZXiRf1RSk9IGHEEj4vUMIVClzBkBm6Ckk1AMWognwLAKSqSsoA+6+UAKkjh6AtkCWCpkAa1/oCtyAi6VDgawEUlN7b2jucS4CNh8IoaEI2GqQoFDDgHTU2gX6v0JNYKdBRo7hckExsNcgruFyQTHvZ61DgkIzCxIUagFjAxIUKuJOSaEz7o9V9vENdMT+oZo6zQtV+a+8AAj/dEHavsd/AAAAAElFTkSuQmCC';

  function ready() {
    window.addEventListener('keyup', search, false);
    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', radio, false);
    };
    // get streams list
    getStreams();
    // set context for search
    activePanel = document.getElementById('panel-home');
    for (var i = 0; i < activePanel.childNodes[0].childNodes.length; i++) {
      context.push(activePanel.childNodes[0].childNodes[i]);
    }
  }

  function radio(e) {
    var el = e.target;
    if (this.value === 'all') {
      showAll();
    } else if (this.value === 'online') {
      showAll();
      hide('offline');
    } else {
      showAll();
      hide('online');
    }
  }

  function showAll() {
    var lis = document.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.display = 'flex';
    }
  }

  function hide(status) {
    var lis = document.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].getAttribute('data-status') === status) {
        lis[i].style.display = 'none';
      }
    }
  }

  function search(e) {
    var el = e.target;
    if (el.id === 'search') {
      var re = new RegExp(el.value.toLowerCase());
      var filtered = context.filter(function(value) {
        var attribute = value.getAttribute('data-name').toLowerCase();
        return re.test(attribute);
      });
      for (var i = 0; i < context.length; i++) {
        context[i].style.display = 'none';
      }
      for (var j = 0; j < filtered.length; j++) {
        filtered[j].style.display = 'flex';
      }
    }
  }

  function getStreams() {
    var channels = ['freecodecamp', 'storbeck', 'terakilobyte', 
                  'habathcx','RobotCaleb','thomasballinger',
                  'noobs2ninjas','beohoff', 'medrybw'];
    var streams = [];
    var doc = document,
      fragment = doc.createDocumentFragment(),
      ul = doc.createElement('ul');

    channels.forEach(function(element, index, array) {
      var obj = {};
      var li = doc.createElement('li');
      li.setAttribute('data-name', element);
      var img = doc.createElement('img');
      var info = doc.createElement('div');
      var userName = doc.createElement('p');
      var description = doc.createElement('p');
      description.className = 'description';
      var viewers = doc.createElement('p');
      var link = doc.createElement('a');
      var linkImage = doc.createElement('img');
      info.className = 'info';
      $.getJSON('https://api.twitch.tv/kraken/streams/' + element).done(function(data) {
        if (data.stream === null) {
          obj.status = 'offline';
          li.setAttribute('data-status', 'offline');
          li.className = 'offline';
          viewers.textContent = 'Offline';
        } else {
          obj.status = data.stream.channel.status;
          li.setAttribute('data-status', 'online');
          description.textContent = data.stream.channel.status;
          viewers.textContent = 'Viewers: ' + data.stream.viewers;
        }
        $.getJSON('https://api.twitch.tv/kraken/users/' + element).done(function(data) {
          img.src = data.logo || './img/placeholder.png';
          img.height = 100;
          img.width = 100;
          link.href = 'http://twitch.tv/' + data.name;
          link.target = '_blank';
          userName.textContent = data.display_name;

          obj.user = data.display_name;
          obj.logo = data.logo;
        });
      }).error(function(data) {
          img.src = '../img/placeholder.png';
          img.height = 100;
          img.width = 100;
          viewers.textContent = data.responseJSON.message;
        }
      );
      linkImage.src = linkSrc;
      streams.push(obj);
      info.appendChild(userName);
      info.appendChild(description);
      info.appendChild(viewers);
      li.appendChild(img);
      li.appendChild(info);
      link.appendChild(linkImage);
      li.appendChild(link);
      fragment.appendChild(li);
    });
    ul.appendChild(fragment);
    doc.getElementById('panel-home').appendChild(ul);
  }

	window.addEventListener('DOMContentLoaded', ready, false);
}());