(function () {
    'use strict';

    angular.module('application', [
    // Angular libraries
    'ui.router',
    'ngAnimate',
    'dndLists',
    // App Modules
    'controllers',
    // Foundation UI components
    'foundation',
    'foundation.notification',
    // Routing with front matter
    'foundation.dynamicRouting',
    // Transitioning between views
    'foundation.dynamicRouting.animations',
    // Spinner
    'angular-spinkit',
    'cgBusy',
    //services
    'statServices',
    //controllers
    'statControllers'
    ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider'];

    function config($urlProvider, $locationProvider) {

        // Default to the index view if the URL loaded is not found
        $urlProvider.otherwise('/home');

        // Use this to enable HTML5 mode
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        // Use this to set the prefix for hash-bangs
        // Example: example.com/#!/page
        $locationProvider.hashPrefix('!');
    }

    function run() {
        // Enable FastClick to remove the 300ms click delay on touch devices
        FastClick.attach(document.body);
    }


})();


(function () {
    
    

    // CONTROLLER MODULE

    var app = angular.module('controllers', ['statServices', 'ngResource']);

    // CONTROLLERS
    // --------------------------------------------------


    // SIDEBAR


})();


