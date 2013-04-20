'use strict';

angular.module('assetsApp')
    .controller('RecipesCtrl', function ($scope, $http) {
        $http.get('http://home.iitk.ac.in/~pankajm/recipes.json').success(function(data) {
            $scope.recipes = data;
    });
    });
