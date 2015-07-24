(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("/api/v1/people.json").then(function(response) {
        $scope.people = response.data;
      });

      $scope.orderAttribute = 'name';
    }

    $scope.sortBy = function(attribute) {
      if(attribute != $scope.orderAttribute) {
        $scope.descending = false;
        } else {
          $scope.descending = !$scope.descending;
        }
      
      $scope.orderAttribute = attribute;
    };
    
    

    $scope.toggleBio = function(person) {
      person.bioVisible = !person.bioVisible;
    };

    $scope.addPerson = function(name, bio) {
      var person = {
        name: name,
        bio: bio,
        bioVisible: false
      };

      $http.post('/api/v1/people.json', person).then(function(response){
        $scope.people.push(person);
      }, function(error) {
        $scope.errors = error.data.errors;
      });

    };

    $scope.deletePerson = function(person) {
      var index = $scope.people.indexOf(person);
      $scope.people.splice(index, 1);
    };

    window.scope = $scope;
  });

}());