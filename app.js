

angular.module('movieApp',['ui.router'])
.constant('myconfig', {
  "url": 'http://www.omdbapi.com/'
})
  .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('/' , {
      url: '/',
      templateUrl: 'search.html',
      controller: ['$q','$scope', '$http', 'myconfig', function($q, $scope, $http, myconfig){

        var searchMovie = $scope.searchMovie;

        $scope.fetch = function(searchTxt){
          var q = $q.defer();
          console.log(searchTxt);
          $http.post(myconfig.url+'?t='+ searchTxt)
          .success(function(res){
            //console.log(res);
            q.resolve(res);
          }).error(function(err){
              q.reject({
                error: err
              })
            })
            q.promise.then(function(res){
              $scope.detail = res;
            });
        }
        
      }]
    });

}]);


