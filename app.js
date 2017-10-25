(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ui.bootstrap', 'ngCookies', 'ivml', 'uiGmapgoogle-maps',
							'angularUtils.directives.dirPagination','ngSanitize'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'UserDataController',
                templateUrl: 'view/home.view.html',
                controllerAs: 'vm'
            })

             .when('/admin', {
                controller: 'formController',
                templateUrl: 'view/adminhome.view.html',
                controllerAs: 'vm'
            })
        
            /*.when('/userdata', {
                controller: 'UserDataController',
                templateUrl: 'view/profile.view.html',
                controllerAs: 'vm'
            })*/
           
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'view/login.view.html',
                controllerAs: 'vm'
            })
           
          

            
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.displayList = $cookieStore.get('displayList') || {};
        $rootScope.sessionIds = $cookieStore.get('sessionIds') || {};
        /*$rootScope.xaxisLength = $cookieStore.get('xaxisLength') || {};*/
        $rootScope.currentSession = $cookieStore.get('currentSession') || {};
                
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/resetpassword','/register','/resetpasswordmailsent','/afterregister','/setnewpassword']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();