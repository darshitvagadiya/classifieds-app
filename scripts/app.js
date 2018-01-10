angular
	.module("ngClassifieds", ["ngMaterial"])
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast){

		classifiedsFactory.getClassifieds().then(function(classifieds){
			$scope.classifieds = classifieds.data;
		});

		var contact = {
			name: "Darshit vagadia",
			phone:  "+91-80000-16489",
			email: "darshitvagadiya@yahoo.com"
		}

		$scope.openSidebar = function(){
			$mdSidenav('left').open();
		};
		$scope.closeSidebar = function(){
			$mdSidenav('left').close();
		}		
		$scope.saveClassified = function(classified){
			if(classified){
				classified.contact = contact;
				$scope.classifieds.push(classified);
				$scope.classified = {};
				$scope.closeSidebar();
				$mdToast.show(
					$mdToast.simple()
						.content("Classified Saved!!")
						.position("top, right")
						.hideDelay(3000)
				)
			}
		}
	})

	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
	})

	.directive("helloWorld", function(){
		return {
			template: "<h1>{{ message }}</h1>"
		}
	})
	.factory("classifiedsFactory", function($http){
		function getClassifieds(){
			return $http.get('./data/classified.json');
		}
		return{
			getClassifieds: getClassifieds
		}

	})