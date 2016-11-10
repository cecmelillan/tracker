app.controller("deleteCtrl", ["$scope", "$modalInstance", "row", "ServicioBackend", function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:null, objeto:null};

	$scope.guardar = function() {
		$scope.tarea.accion = "delete";
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/app.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			//ngDialog.close();
			$modalInstance.close();
		}
	});
	}
	$scope.cancelar = function() {
		$modalInstance.close();
	}
	 
}]);