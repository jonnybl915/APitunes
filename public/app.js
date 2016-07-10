(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
    app.controller('artistController', ['$scope', 'userService', 'songService', function($scope, userService, songService) {

      songService.getArtistSongs();










    }]);
};

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('guestController', ['$scope', 'userService', 'songService', function($scope, userService, songService) {




    $scope.listSongs = function(){
        console.log("get some tunes");
      songService.getAllSongs();
    };


    $scope.like = function(){
      console.log("i like this");
      $http({
        method: 'POST',
        url:'/upVote{id}',
        data: {id},
      }).then(function(response){
        log
      })
    };

    $scope.dislike = function(){
      console.log("i dont like this");
      $http({
        method: 'POST',
        url:'/downVote{id}',
        data: {id},
      }).then(function(response){
        log
      })
    };









    }]);
};

},{}],3:[function(require,module,exports){
module.exports = function(app) {
    app.controller('userController', ['$scope', '$location', 'userService', 'songService', function($scope, $location, userService, songService) {



      // songService.getAllSongs();





      $scope.login = function(){
        console.log(`trying to send ${$scope.userInput} and ${$scope.pass}`);
          // $location.path('/artist')
        userService.serverLogin($scope.userInput,$scope.pass);
      }



    }]);
};

},{}],4:[function(require,module,exports){
let app = angular.module('apiTunes', ['ngRoute']);

// Controllers
require('./controllers/artistController')(app);
require('./controllers/guestController')(app);
require('./controllers/userController')(app);

// Services
require('./services/songService')(app);
require('./services/userService')(app);


//router
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/login',
    })
    .when('/login', {
      controller: 'userController',
      templateUrl: 'templates/loginTemplate.html',
    })
    .when('/guest', {
      controller: 'guestController',
      templateUrl: 'templates/guestTemplate.html',
    })
    .when('/artist', {
      controller: 'artistController',
      templateUrl: 'templates/artistTemplate.html',
    });

}]);

},{"./controllers/artistController":1,"./controllers/guestController":2,"./controllers/userController":3,"./services/songService":5,"./services/userService":6}],5:[function(require,module,exports){
module.exports = function(app){


  app.factory('songService',['$http', function($http){
    let allSongList = [];
    let artistSongList = [];


    return{
      getAllSongs: function(){
        $http({
              method: 'GET',
              url: '/userList',
          }).then(function(response) {
            console.log("all songs",response);
            angular.copy(response.data, allSongList);
          })
      },
      getArtistSongs: function(){
        $http({
              method: 'GET',
              url: '/artistList',
          }).then(function(response) {
            console.log("artist songs", response);
            angular.copy(response.data, artistSongList);
          })
      },
    };
  }]);
};

},{}],6:[function(require,module,exports){
module.exports = function(app){

// this service will handle all user data
  app.factory('userService', ['$http', '$location', function($http, $location){


    return{
      serverLogin: function(user,pass){
        $http({
              method: 'POST',
              url: '/login',
              data: {
                username: user,
                password: pass,
              }
          }).then(function(response) {
            console.log("here is whats coming back", response );
            console.log("got response", response.data.isArtist);

            if(response.data.isArtist === true){
              $location.path('/artist');
            }
          })
      },

    };
  }]);
};

},{}]},{},[4])