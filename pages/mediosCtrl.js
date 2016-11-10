app.controller('mediosCtrl', function($scope, ngDialog, $modal, ServicioBackend) {
    
	$scope.objeto = {alcance:null, url:null, nombre:null, descripcion:null};
	$scope.filtro = {alcance:null, nombre:null}
	
	$scope.tiposAlcance = [{id:1, descripcion:"Local"}, {id:2, descripcion:"Regional"}, {id:3, descripcion:"Nacional"}];
	$scope.lista = null; //[];
	
	function obtenerTareas() {
		$scope.tarea = {accion:"get"};
		$scope.tarea.filtro = $scope.filtro;
		$scope.lista = null;

		ServicioBackend.obtener('model/medios.php', $scope.tarea).then(function (respuesta) {
			if (respuesta.resultado === 'error') {
				console.log("error");
			} else if (respuesta != 'null') {
				$scope.lista = respuesta;
			}
		});
	}
		
	$scope.guardar = function() {
		$scope.tarea.accion = "add";
		$scope.tarea.objeto = $scope.objeto;
		
		ServicioBackend.obtener('model/medios.php', $scope.tarea).then(function (respuesta) {
		if (respuesta.resultado === 'error') {
			console.log("error");
		} else if (respuesta != 'null') {
			$scope.lista = respuesta;
			obtenerTareas();
		}
	});
	}
	
	
	$scope.editar = function (row) {
		var dialog = ngDialog.open({
			template: 'pages/modal/medios/edit.html',
			controller: 'mediosEditCtrl',
			className: 'ngdialog-theme-default',
			$scope: $scope,
			resolve: {
				row: function () {
					return row;
				}
			}
		});
		dialog.closePromise.then(function (data) {
			//Acción para cuando se cierra la ventana modal
		});
	};
	
	$scope.borrar = function(row) {
        var modalInstance = $modal.open({
            templateUrl: 'pages/modal/medios/delete.html',
			controller: 'mediosDeleteCtrl',
            resolve: {
				row: function () {
					return row;
				}
			}
        });
		
		modalInstance.result.then(function(){
            //on ok button press 
			obtenerTareas();
          },function(){
            //on cancel button press
          });
		  
	}	
	
	$scope.limpiarFiltro = function() {
		$scope.filtro = {alcance:null, nombre:null}
		obtenerTareas();
	}
	
	$scope.search = function() {
		obtenerTareas();
	}
	
	
	obtenerTareas();
	
});