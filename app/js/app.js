'use strict';

angular.module('mobileAngular', ['ngResource', '$strap.directives', 'angular-gestures']);

angular.module('mobileAngular').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'partials/missions.html',
            controller: 'MissionsController'
        });
    $routeProvider.when('/mission/new',
        {
            templateUrl: 'partials/missions/new.html',
            controller: 'NewMissionController'
        });
    $routeProvider.when('/mission/:missionId',
        {
            templateUrl: 'partials/mission-container.html',
            controller: 'MissionContainerController',
            reloadOnSearch: false
        });
    $routeProvider.when('/mission/:missionId/events/new',
        {
            templateUrl: 'partials/mission/events/form.html',
            controller: 'EditEventController'
        });
    $routeProvider.when('/mission/:missionId/event/:eventId/edit',
        {
            templateUrl: 'partials/mission/events/form.html',
            controller: 'EditEventController'
        });

    $routeProvider.when('/mission/:missionId/staff/new',
        {
            templateUrl: 'partials/mission/staff/new.html',
            controller: 'NewStaffController'
        });
    $routeProvider.when('/mission/:missionId/vehicle/new',
        {
            templateUrl: 'partials/mission/vehicles/new.html',
            controller: 'NewVehicleController'
        });
    $routeProvider.when('/storagemanagement',
        {
            templateUrl: 'partials/misc/configuration.html',
            controller: 'StorageManagementController'
        });
    $routeProvider.when('/accelerometer',
        {
            templateUrl: 'partials/misc/accelerometer.html',
            controller: 'AccelerometerController'
        });
    $routeProvider.when('/gestures',
        {
            templateUrl: 'partials/misc/gestures.html',
            controller: 'GesturesController'
        });
    $routeProvider.when('/commands/',
        {
            templateUrl: 'partials/misc/command-list.html',
            controller: 'CommandController'
        });
    $routeProvider.when('/cube/',
        {
            templateUrl: 'partials/misc/cube.html'
        });
    $routeProvider.when('/launch',
        {
            templateUrl: 'partials/launch.html'
        });
    $routeProvider.when('/init',
        {
            templateUrl: 'partials/init.html',
            controller: 'BootstrapController'
        });
    $routeProvider.otherwise({redirectTo: '/'});
}]);

//default for datepicker
angular.module('mobileAngular').value('$strap.config', {
    datepicker: {
        format: 'dd/mm/yyyy'
    }
});

// initialization and background job run
angular.module('mobileAngular').run(
    function ($rootScope, $window, CommandSender, SystemNotificationService) {
        CommandSender.run();

        $rootScope.scrollX = $window.scrollX;

        angular.element($window).bind('scroll', function () {
            $rootScope.scrollX = $window.scrollX;
            $rootScope.$apply('scrollX');
        });

        angular.element($window).bind('deviceorientation', function (data) {
            $rootScope.orientationData = data;
            $rootScope.$apply('orientationData');
        });
    });
