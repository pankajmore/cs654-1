'use strict';

angular.module('assetsApp')
    .controller('RecipesCtrl', function ($scope, $http, $window) {
        var baseUrl = 'http://home.iitk.ac.in/~pankajm/';
        $http.get(baseUrl + 'recipes.json').success(function(data) {
            $scope.recipes = data;
            angular.forEach($scope.recipes, function(recipe){
                $http.get(baseUrl + recipe.filename).success(function(code){
                    recipe.code = code;
                    console.log(code);
                });
            });
        });
        $scope.alert = function() { $window.say("Hooray");};
        $scope.addRecipe = function(code) { $window.say(code);return $window.addRecipe(code); };
        $scope.removeRecipe = function(rid) { $window.recipes.removeRecipe(rid); };

    });
