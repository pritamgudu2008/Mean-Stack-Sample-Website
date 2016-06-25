function AppCtrl($scope, $http){
	console.log("Hello world from controller")

var refresh = function(){
	$http.get('/contactlist').success(function(response){
		console.log("I got the data I requested");
		$scope.contactlist = response;
		$scope.contacts = "";
	});
};

refresh();

	$scope.addContact = function(){
		console.log($scope.contacts);
		$http.post('/contactlist', $scope.contacts).success(function(response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/'+ id).success(function(response){
			$scope.contacts = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contacts._id);
		$http.put('/contactlist/' + $scope.contacts._id, $scope.contacts).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contacts="";
	};
}