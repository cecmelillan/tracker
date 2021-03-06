app.controller('tagCtrl', function($scope, ngDialog, $modal, ServicioBackend) {
    
	$scope.objeto = {tag:null, descripcion:null};
	$scope.filtro = {tag:null, descripcion:null}
	
	$scope.lista = null; //[];
	
	function obtenerTareas() {
		$scope.tarea = {accion:"get"};
		$scope.tarea.filtro = $scope.filtro;
		$scope.lista = null;

		ServicioBackend.obtener('model/tag.php', $scope.tarea).then(function (respuesta) {
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
		
		ServicioBackend.obtener('model/tag.php', $scope.tarea).then(function (respuesta) {
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
			template: 'pages/modal/programacion/tag/edit.html',
			controller: 'tagEditCtrl',
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
			//console.log("...");
		});
	};
	
	$scope.borrar = function(row) {
        var modalInstance = $modal.open({
            templateUrl: 'pages/modal/programacion/tag/delete.html',
			controller: 'tagDeleteCtrl',
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
       //     console.log("Modal Closed");
          });
		  
	}	
	
	$scope.limpiarFiltro = function() {
		$scope.filtro = {tag:null, descripcion:null}
		obtenerTareas();
	}
	
	$scope.search = function() {
		obtenerTareas();
	}
	
	obtenerTareas();
	
});