app.controller('twitterCtrl', function($scope, ngDialog, $modal, ServicioBackend) {
    
	$scope.filtro = {user:null, termino:null}
	
	$scope.tiposMateria = [{id:1, descripcion:"Matematica"}, {id:2, descripcion:"Fisica"}, {id:3, descripcion:"IT"}];
	$scope.lista = null; //[];
	
	function obtenerTareas() {
		$scope.tarea = {accion:"get"};
		$scope.tarea.filtro = $scope.filtro;

		ServicioBackend.obtener('model/twitter.php', $scope.tarea).then(function (respuesta) {
			if (respuesta.resultado === 'error') {
				console.log("error");
			} else if (respuesta != 'null') {
				$scope.lista = respuesta;
			}
		});
	}
		
	$scope.dateParse = function(d){
		var d = new Date(d);
		return d.getUTCDate()+ '-' +
			(d.getUTCMonth() + 1)+ '-' +
			d.getUTCFullYear()+ ' ' +
			d.getHours()+ ':' +
			d.getMinutes()+ ':' +
			d.getSeconds()
	}
	
	
	$scope.editar = function (row) {
		var dialog = ngDialog.open({
			template: 'pages/modal/materias/edit.html',
			controller: 'materiasEditCtrl',
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
			console.log("materias");
		});
	};
	
	$scope.borrar = function(row) {
        var modalInstance = $modal.open({
            templateUrl: 'pages/modal/materias/delete.html',
			controller: 'materiasDeleteCtrl',
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
            console.log("Modal Closed");
          });
		  
	}	
	
	$scope.limpiarFiltro = function() {
		$scope.filtro = {materia:null, termino:null};
		obtenerTareas();
	}
	
	$scope.search = function() {
		obtenerTareas();
	}
	
	
	obtenerTareas();
	
});