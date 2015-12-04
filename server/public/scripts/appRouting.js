var myApp = angular.module("myApp", ['ngRoute','ngAnimate', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/home', {
        templateUrl: "/views/routes/home.html",
        controller: "QuizController"
    }).
    when('/selectQuestionType', {
        templateUrl: "/views/routes/selectQuestionType.html",
        controller: "QuizController"
    }).
    when('/dashboard', {
        templateUrl: "/views/templates/quizTable.html",
        controller: "QuizController"
    }).
    when('/multipleChoice', {
        templateUrl: "/views/routes/multipleChoice.html",
        controller: "QuizController"
    }).
    when('/trueFalse', {
        templateUrl: "/views/routes/trueFalse.html",
        controller: "QuizController"
    }).
    otherwise({
        redirectTo: 'dashboard'
    })
}]);