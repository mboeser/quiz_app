myApp.factory('CheckUser', ['$http', function($http){

    var data = undefined;

    console.log('check user fact');

    var checkUser = function () {
        var promise = $http.get('/user').then(function (response) {
            console.log(response.data);
            data = response.data;
        });
        return promise;
    };

    //checkUser();

    var userStatus = {
        retrieveData: function(){
            return checkUser();
        },
        userData: function(){
            return data;
        }
    };

    return userStatus;

}]);