myApp.service('EditButton', [function(){

    var formData = {};

    return {
        getData: function () {
            //You could also return specific attribute of the form data instead
            //of the entire data
            return formData;
        },
        setData: function (newFormData) {
            //You could also set specific attribute of the form data instead
            formData = newFormData
        },
        resetData: function () {
            //To be called when the data stored needs to be discarded
            formData = {};
        }
    };


}]);
