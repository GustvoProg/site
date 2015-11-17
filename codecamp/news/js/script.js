angular.module('newsApp', ['angularMoment'])
.controller('noticeCtrl', ['$scope', '$http', function($scope, $http) {
  
  //$scope.news = {id: 32};
  $scope.placeholder = 'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png';

  $http.get('http://www.freecodecamp.com/news/hot').success(function(data) {
  	console.log(data);
    $scope.news = data;
  	//$scope.news = data;
  });
}]);
