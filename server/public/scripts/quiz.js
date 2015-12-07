(function () {

    'use strict';

    var app = angular.module('myQuiz', []);

    app.controller('QuizController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        $scope.selectAnswer = function (qIndex, aIndex) {
            //console.log(qIndex, aIndex);

            var questionState = $scope.myQuestions[qIndex].questionState,
                correctAnswer = Number($scope.myQuestions[qIndex].quiz.correct);

            console.log(correctAnswer);

            if (questionState !== 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;

                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if (aIndex === correctAnswer) {
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(0);
        };

        $http.get('/admin').then(function (quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
            //console.log($scope.myQuestions);
        });

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };
        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function () {
            return $scope.activeQuestion += 1;
        };

        $scope.createShareLinks = function (percentage) {

            var url = 'http://QuizAdmin.com';

            var emailLink = '<a class="btn email" href="mailto:?subject=Create a Quiz on QuizAdmin&amp;body=I scored a ' + percentage + '% on QuizAdmin. Create a custom quiz at ' + url + ' for free today!">Email a Friend</a>';

            var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I got ' + percentage +'% on a custom quiz at QuizAdmin Create a custom free quiz today!&url=' + url + '&hashtags=quizadmin">Tweet your score</a>';
            var newMarkup = emailLink + twitterLink;

            return $sce.trustAsHtml(newMarkup);

        }

    }]);


})();