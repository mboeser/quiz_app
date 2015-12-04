myApp.controller("QuizController",['$scope', '$http', '$location', 'EditButton', 'CheckUser', function($scope, $http, $location, EditButton, CheckUser) {



    $scope.user = {};

    $scope.dataService = CheckUser;

    if($scope.dataService.userData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.userData();
            console.log($scope.user._id);
        });
    } else {
        $scope.user = $scope.dataService.userData();
    }


    $scope.question = {};
    $scope.answer = [];
    $scope.quiz = [];


    //Cancel Button
    $scope.cancelButton = function () {
        $scope.question = {};
        EditButton.resetData();
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
                    questionType: "Multiple Choice",
                    userId: $scope.user._id
                };
            } else {

                $scope.question = {
                    question: foo.quiz.question,
                    correct: foo.quiz.correct,
                    id: foo._id,
                    questionType: "True or False",
                    userId: $scope.user._id


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

        console.log($scope.id);
      $http.put('/admin', kittyFooFoo).then(function(response){
          $scope.getQuestions();
          $location.path('/dashboard')
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
          $scope.quiz = response.data;
          console.log(response.data);
      });
    };

    //POST
    $scope.submitQuestion = function(kittyFooFoo){

        if (kittyFooFoo.questionType === 'Multiple Choice') {

            kittyFooFoo.userId = $scope.user._id;
            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": kittyFooFoo.answerA},
                {"id": 1, "text": kittyFooFoo.answerB},
                {"id": 2, "text": kittyFooFoo.answerC},
                {"id": 3, "text": kittyFooFoo.answerD}
            ]
        } else {
            kittyFooFoo.userId = $scope.user._id;
            kittyFooFoo.quizAnswer = [
                {"id": 0, "text": 'TRUE'},
                {"id": 1, "text": 'FALSE'}
            ]
        }

        //kittyFooFoo.quizAnswer = $scope.answer;
        $scope.quiz.push(kittyFooFoo);
        $scope.question = {};
        $scope.answer = [];

        //console.log($scope.quiz);
        $http.post('/admin', kittyFooFoo).then(function(response){
        });
    };



    $scope.columnAnswer = function(ans, type){

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

    $scope.getQuestions();

}]);



myApp.controller('ModalCtrl',['$scope', '$uibModal', '$log', '$http', '$location',  function ($scope, $uibModal, $log, $http, $location) {

    $scope.getQuestions = function() {
        $http.get('/admin').then(function(response){
            $scope.quiz = response.data;
        });
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../views/routes/multipleChoice.html',
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
            $location.path('/dashboard');

            //$scope.getQuestions();
            //console.log($scope.getQuestions);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.open2 = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'templates/myModalContent3.html',
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


    $scope.open4 = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent4.html',
            //controller: 'ModalInstanceCtrl',
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

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

myApp.controller('ModalInstanceCtrl',['$scope', '$http', '$uibModalInstance', function ($scope, $http, $uibModalInstance, items) {

    //$scope.question = {};
    //$scope.answer = [];
    //$scope.quiz = [];


    //$scope.items = items;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

