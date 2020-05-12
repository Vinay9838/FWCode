var app = angular.module('myVardApp', []);

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
app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[{');
    $interpolateProvider.endSymbol('}]');
})

app.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
   $httpProvider.defaults.headers.post['X-CSRFToken'] = csrfcookie();
}]);
// http service
app.service('API', function($http, $q){
    //get api
    this.GET = function(url) {
        var deferred = $q.defer();
        $http.get(url)
        .then(function(response){
            deferred.resolve(response)
        })
        .catch(function (e) {
            deferred.reject(e);
        })
        return deferred.promise;
    }
       // post api
   this.POST = function(url, data) {
       var deferred = $q.defer();
       $http.post(url, data)
           .then(function(response) {
               deferred.resolve(response)
           })
           .catch(function(e) {
               deferred.reject(e);
           })
       return deferred.promise;
   }
})


//App controller
app.controller('goalCtrl', function($scope,API){
$scope.show_list=true;
$scope.disable=true
var target = document.getElementById('search_suggestion');
$scope.search = function(query){
$scope.show_list=true
if($scope.category){
 $scope.cat_error = false
 if(query && query.length>3){
 API.GET('/goals/search-goals/'+query+'/'+$scope.category+'/').then(function(result){
 if(result.data.length){
    $scope.result=result
    $scope.disable=true

 }else{
     $scope.show_list=false
     $scope.result=null
     $scope.disable=false
 }

 })
 }
 else{
    $scope.disable = true
    $scope.result=null
 }
 }else{
   $scope.cat_error = true
 }
 }
//toggle description and percentage field on click
$scope.toggle=false
 $scope.show_form = function(goal_id){
   if(goal_id){
   $scope.show_div=goal_id
   if($scope.toggle){
   $scope.toggle=false
   }
   else{
   $scope.toggle=true
   }

   }
   else
   {
     $scope.show_div=-1
   }
 }
//add goal to emp profile
 $scope.save_user_goal = function(user_goal_form,goal_pk){
  data ={
     'goal_pk':goal_pk,
     'description':user_goal_form.description.$modelValue,
     'user_percentage':user_goal_form.user_percentage.$modelValue,
     'weightage':user_goal_form.weightage.$modelValue,
     'period':user_goal_form.period.$modelValue
  }
    API.POST('/goals/user_goal_create/',data).then(function(result){
       if(result.data.status == 'exist'){
        $scope.msg = result.data.status
        $('.toast').toast('show')

       }
       else {
         window.location.href="/"
       }
    })

 }
})


//RMAction controller


app.controller('rmActionCtrl',function($scope,API){
  $scope.rm_action = function(pk){
  data = {
  'action':$scope.rmActionForm.action.$modelValue,
  'rm_comment':$scope.rmActionForm.rm_comment.$modelValue
  }
  API.POST('/goals/rm-action/'+pk+'/',data).then(function(result){
    window.location.reload()

  })
  }
})



