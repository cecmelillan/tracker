app.controller('editCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:null, objeto:null};

	$scope.guardar = function() {
		$scope.tarea.accion = "edit";
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/app.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
	
});
