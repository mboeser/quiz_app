//var myApp = angular.module('myApp', []);

//SET UP A ROUTER, PULL FROM PREVIOUS CLASS EXAMPLES
//THIS MAY MEAN THAT YOU NEED MULTIPLE CONTROLLERS
//EACH CONTROLLER WILL NEED TO SAVE THINGS TO 'A FACTORY'
//BUT TO SET THINGS UP, YOU CAN USE A SINGLE CONTROLLER
//JUST KNOW EACH TIME YOU LOAD A VIEW, THE CONTROLLER RESETS, SO INFORMATION DOES NOT CARRY FROM VIEW TO VIEW
//WHICH IS WHY WE USE A FACTORY

//1. SET UP ROUTING
//2. JUST GET CONSOLE LOGS TO FIRE EACH TIME A VIEW IS LOADED
//3. START WITH A BASIC FACTORY THAT GETS LOADED INTO THE CONTROLLER


myApp.controller("QuizController",['$scope', '$http', '$location', 'EditButton', function($scope, $http, $location, EditButton) {

    //console.log('loaded app controller');

    //$scope.multipleBtn = true;
    //$scope.trueFalseBtn = true;
    //$scope.questionBtn = true;
    //$scope.updateBtn = false;
    //$scope.submitBtn = true;

    $scope.question = {};
    $scope.answer = [];
    $scope.quiz = [];

    //$scope.id ='';

    //$scope.multiBtnType = function(){
    //    console.log('multi pass');
    //    $scope.question = {questionType: "Multiple Choice"};
    //};
    //
    //$scope.booleanBtnType = function(){
    //    console.log('bool pass');
    //    $scope.question = {questionType: "True or False"};
    //};

    //Cancel Button
    $scope.cancelButton = function () {
        $scope.question = {};
        //$scope.submitBtn = false;
        //$scope.updateBtn = true;
    };

    //Edit

    $scope.preEditQuestion = function (foo) {

        EditButton.setData(foo);


        return (foo.quiz.questionType === "Multiple Choice") ? $location.path('/multipleChoice') : $location.path('/trueFalse');
    };

    $scope.editQuestion = function () {


        var foo = EditButton.getData();

        console.log(foo.hasOwnProperty('quiz'));

        if (foo.hasOwnProperty('quiz') === false) {
            $scope.updateBtn = true;
            $scope.submitBtn = false;
        } else {
            $scope.updateBtn = false;
            $scope.submitBtn = true;

            if (foo.quiz.questionType === "Multiple Choice") {

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

            } else {

                //$location.path('/trueFalse');

                //$scope.trueFalseBtn = false; //SHOW True or False form
                $scope.question = {
                    question: foo.quiz.question,
                    correct: foo.quiz.correct,
                    id: foo._id,
                    questionType: "True or False"

                };

            }
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

        //$scope.updateBtn = false; // hides Update Btn after clicking the update btn.
        //$scope.submitBtn = true;


        console.log($scope.id);
      $http.put('/admin', kittyFooFoo).then(function(response){
          $scope.getQuestions();
          $location.path('/dashboard');
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
    //console.log(ans);

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
myApp.controller('ModalCtrl',['$scope', '$uibModal', '$log',  function ($scope, $uibModal, $log) {

    //console.log('add clicked logged');

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.open2 = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent2.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.open2();

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

