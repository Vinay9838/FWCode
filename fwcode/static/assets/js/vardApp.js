var app = angular.module('vardApp', []);

// generate csrf token
var csrfcookie = function() {
    var cookieValue = null,
        name = 'csrftoken';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

// string interpolation
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[{');
    $interpolateProvider.endSymbol('}]');
})
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    $httpProvider.defaults.headers.post['X-CSRFToken'] = csrfcookie();
}]);




app.controller('commentCtrl', function($scope, $http){

    $scope.get_self_appraisal = function(appraisal_id){
        $http.get('/comment/'+appraisal_id)
        .then(function(data) {
            console.log(data)
            return data.data
        })

    }
});