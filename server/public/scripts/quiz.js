(function () {

    'use strict';

    var app = angular.module('myQuiz', []);

    app.controller('QuizController', ['$scope', '$http', function ($scope, $http) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        $scope.selectAnswer = function (qIndex, aIndex) {
            console.log(qIndex, aIndex);

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
            $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(0);
        };

        $http.get('/admin').then(function (quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
            console.log($scope.myQuestions);
        });


        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };
        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function () {
            return $scope.activeQuestion += 1;
        }

    }]);


})();