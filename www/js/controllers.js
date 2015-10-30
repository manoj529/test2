angular.module('todo.controllers', [])
	.controller('IndexCtrl', function($scope, $ionicModal, $localForage) {
		$scope.items = [];
		$localForage.getItem('__TASKS__').then(function(tasks) {
			if (tasks) {
				$scope.items = tasks;
			}
		});
		
		// Initialize the dialog window
		$ionicModal.fromTemplateUrl('task-prompt.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});	

		$scope.showTaskPrompt = function() {
			var newTask = {
				title: '',
				description: '',
				isComplete: null
			};	

			$scope.newTask = newTask;
			$scope.modal.show();
		};

		$scope.saveTask = function() {
			$scope.items.push($scope.newTask);
			$localForage.setItem('__TASKS__', $scope.items).then(function() {
				$scope.modal.hide();
			});
		};

		$scope.cancelTask = function() {
			$scope.modal.hide();
		};

		$scope.completeItem = function(item) {
			$scope.removeItem(item);
		};

		$scope.ignoreItem = function(item) {
			$scope.removeItem(item);
		};

		$scope.removeItem = function(item) {
			var i = -1;
			angular.forEach($scope.items, function(task, key) {
				if (item === task) {
					i = key;
				}
     		});		

			if (i >= 0) {
				$scope.items.splice(i, 1);
				$localForage.setItem('__TASKS__', $scope.items);
				return true;
			}
			return false;
		};
	})
;
