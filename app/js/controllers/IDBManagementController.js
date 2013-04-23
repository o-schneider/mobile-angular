smurAngular.controller("IDBManagementController", 
	function IDBManagementController($scope, $http, Mission, Staff, Event, Vehicle) {
		$scope.deleteMission = function() {
			Mission.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.deleteStaff = function() {
			Staff.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.deleteEvent = function() {
			Event.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.deleteVehicle = function() {
			Vehicle.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.clearMission = function() {
			Mission.getStore().then(function(store){
				store.clear(function() {
					console.log("Mission cleared");
				});
			});
		};

		$scope.clearStaff = function() {
			Staff.getStore().then(function(store){
				store.clear(function() {
					console.log("Staff cleared");
				});
			});
		};

		$scope.clearEvent = function() {
			Event.getStore().then(function(store){
				store.clear(function() {
					console.log("Event cleared");
				});
			});
		};

		$scope.clearVehicle = function() {
			Vehicle.getStore().then(function(store){
				store.clear(function() {
					console.log("Vehicle cleared");
				});
			});
		};

		$scope.populateStaff = function() {
			$http.get('/resources/persons.json').success(function(data){
				var count = 0;
				Staff.getStore().then(function(store){
					store.clear();
				});
				var recursivePut = function(count, data){
					var element = data[count];
					var dbObject = {
						"firstname": element.firstname,
						"lastname": element.lastname,
						"function": {
							store: "function",
							id: element.function
						}  
					};
					Staff.getStore().then(function(store){
						store.put(dbObject, function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
						});
					});
				};
				recursivePut(count, data);
			});
		};

		$scope.populateVehicle = function() {
			$http.get('/resources/vehicles.json').success(function(data){
				var count = 0;
				Vehicle.getStore().then(function(store){
					store.clear();
				});
				var recursivePut = function(count, data){
					var element = data[count];
					var dbObject = {
						"name": element.name,
						"type": element.type
					}  
					Vehicle.getStore().then(function(store){
						store.put(dbObject, function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
						});
					});
				};
				recursivePut(count, data);
			});
		};

	});