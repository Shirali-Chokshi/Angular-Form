var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://ang-registration.firebaseIO.com/');


  myApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
      if(error == 'AUTH_REQUIRED'){
        $rootScope.message = 'Sorry, you must login to access Success page';
        $location.path('/login');
      } // AUTH_REQUIRED if Statement
    }); // routeChangeError
  }]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'successController',
      resolve: {
        currentAuth: function(Authentication){
          return Authentication.requireAuth();
        } // currentAuth
      } // resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);




