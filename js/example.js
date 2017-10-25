angular.module('app', ['ui.bootstrap']);
var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = false;


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yyyy'",
    'month-format': "'MMM'",
    'starting-day': 1,
    'datepicker-mode':"'month'",
    'min-mode':"month"
  };

}; 