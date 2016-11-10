app.controller('faqCtrl', function($scope, ngDialog, $modal, ServicioBackend) {
    $scope.message = 'Preguntas frecuentes.';
	
	function obtenerTareas() {
		$scope.tarea = {accion:"get"};

		ServicioBackend.obtener('model/faq.php', $scope.tarea).then(function (respuesta) {
			if (respuesta.resultado === 'error') {
				console.log("error");
			} else if (respuesta != 'null') {
				$scope.lista = respuesta;
			}
		});
	}
	
	$scope.objeto = {consulta:null, respuesta:null, descripcion:null};
	
	$scope.guardar = function() {
		$scope.tarea.accion = "add";
		$scope.tarea.objeto = $scope.objeto;
		
		ServicioBackend.obtener('model/faq.php', $scope.tarea).then(function (respuesta) {
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
			template: 'pages/modal/faq/edit.html',
			controller: 'faqEditCtrl',
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
			console.log("faq");
		});
	};
	
	$scope.borrar = function(row) {
        var modalInstance = $modal.open({
            templateUrl: 'pages/modal/faq/delete.html',
			controller: 'faqDeleteCtrl',
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
	
	obtenerTareas();
	
});