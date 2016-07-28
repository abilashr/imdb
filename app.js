

angular.module('movieApp',['ui.router'])
  .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('/' , {
      url: '/',
      templateUrl: 'search.html',
      controller: ['$q','$scope', '$http', function($q, $scope, $http){

        var searchMovie = $scope.searchMovie;

        $scope.fetch = function(searchTxt){
          var q = $q.defer();
          console.log(searchTxt);
          $http.post('http://www.omdbapi.com/?t='+ searchTxt)
          .success(function(res){
            //console.log(res);
            q.resolve(res);
            $scope.title = res.Title;
            $scope.poster = res.Poster;
            $scope.plot = res.Plot;

          }).error(function(err){
              q.reject({
                error: err
              })
            })
            return q.promise;
        }
        
      }]
    });

}]);


