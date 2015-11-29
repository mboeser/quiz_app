var myApp = angular.module('myApp', []);

myApp.controller("QuizController",['$scope', '$http', function($scope, $http){

    $scope.multipleBtn = true;
    $scope.trueFalseBtn = true;
    $scope.questionBtn = true;
    $scope.updateBtn = true;

    $scope.question = {};
    $scope.answer = [];
    $scope.quiz = [];

    //$scope.id ='';

    $scope.multiBtnType = function(){
        $scope.question = {questionType: "Multiple Choice"};
    };

    $scope.booleanBtnType = function(){
        $scope.question = {questionType: "True or False"};
    };

    //Cancel Button
    $scope.cancelButton = function() {
        $scope.question = {};
        $scope.submitBtn = false;
        $scope.updateBtn = true;
    };

    //Edit

    $scope.editQuestion = function(foo) {
        console.log('this is the edit console',foo);
        $scope.updateBtn = false;
        $scope.submitBtn = true;

        //$scope.id = foo._id;


        if (foo.quiz.questionType === "Multiple Choice") {

            $scope.multipleBtn = false; // SHOW Multiple Choice form

            $scope.question = {
                question: foo.quiz.question,
                answerA: foo.quiz.quizAnswer[0].text,
                answerB: foo.quiz.quizAnswer[1].text,
                answerC: foo.quiz.quizAnswer[2].text,
                answerD: foo.quiz.quizAnswer[3].text,
                correct: foo.quiz.correct,
                id: foo._id,
                questionType: "Multiple Choice"
            };

        } else if (foo.quiz.questionType === "True or False") {


            $scope.trueFalseBtn = false; //SHOW True or False form
            $scope.question = {
                question: foo.quiz.question,
                correct: foo.quiz.correct,
                id: foo._id,
                questionType: "True or False"

            };
        }
    };

    $scope.updateQuestion = function(kittyFooFoo){
            console.log('this is update console', kittyFooFoo);
        if (kittyFooFoo.questionType === 'Multiple Choice') {


            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": kittyFooFoo.answerA},
                {"id": 1, "text": kittyFooFoo.answerB},
                {"id": 2, "text": kittyFooFoo.answerC},
                {"id": 3, "text": kittyFooFoo.answerD}
            ]
        } else {

            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": 'TRUE'},
                {"id": 1, "text": 'FALSE'}
            ]
        }

        $scope.updateBtn = true; // hides Update Btn after clicking the update btn.
        $scope.submitBtn = false;


        console.log($scope.id);
      $http.put('/admin', kittyFooFoo).then(function(response){
          $scope.getQuestions();
      });
    };

    //Delete
    $scope.deleteQuestion = function(zoom){
        var result = confirm("Are you sure you want to DELETE the question?");
        if (result) {
            console.log(zoom);
            $http.delete('/admin', {params: {id: zoom._id}}).then(function (response) {
                $scope.getQuestions();
            });
        }
    };

    //GET
    $scope.getQuestions = function() {
      $http.get('/admin').then(function(response){
          //console.log(response.data);
          $scope.quiz = response.data;
      });
    };

    //POST
    $scope.submitQuestion = function(kittyFooFoo){
        //$scope.answer.push(kittyFooFoo.answer);

        if (kittyFooFoo.questionType === 'Multiple Choice') {

            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": kittyFooFoo.answerA},
                {"id": 1, "text": kittyFooFoo.answerB},
                {"id": 2, "text": kittyFooFoo.answerC},
                {"id": 3, "text": kittyFooFoo.answerD}
            ]
        } else {
            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": 'TRUE'},
                {"id": 1, "text": 'FALSE'}
            ]
        }

        //kittyFooFoo.quizAnswer = $scope.answer;
        console.log(kittyFooFoo.quizAnswer);
        $scope.quiz.push(kittyFooFoo);
            $scope.question = {};
            $scope.answer = [];

        console.log($scope.quiz);
        $http.post('/admin', kittyFooFoo).then(function(response){
            $scope.getQuestions();
        });
    };

    $scope.columnAnswer = function(ans, type){
    console.log(ans);

    if (type === 'Multiple Choice'){
        switch (ans){
            case '0':
                return 'A';
            case '1':
                return 'B';
            case '2':
                return 'C';
            case '3':
                return 'D'
        }
    }
        else {

        switch (ans) {
            case '0':
                return 'True';
            case '1':
                return 'False'
        }
    }
    };

    $scope.submitQuiz = function() {

    };

    $scope.getQuestions();
}]);
