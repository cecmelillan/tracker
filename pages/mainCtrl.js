app.controller('mainCtrl', ['$scope', '$http', '$modal', 'ngDialog', function($scope, $http, $modal, ngDialog, ServicioBackend) {

// -----------------------------------
	
	// ServicioBackend.buscarInfoDeLaSesion(function(respuesta) {
        // // Deliberate choice to not update respond to further updates.
        // $scope.respuesta = respuesta;
    // });
/*
	ServicioBackend.buscarInfoDeLaSesion({"fecha":"2016-06-01","descripcion":null,"accion":"get"}).then(function (respuesta) {
		$scope.respuesta = respuesta;
	});
*/
// -----------------------------------
	
	var date = new Date();

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	if(month.toString().length == 1){
		month = "0"+month;
	}
	$scope.lista = [];
	// ----------------------------
	$scope.filtro = {anio:year, mes: month, dia:day}
	// ----------------------------
	var f = $scope.filtro.anio+'-'+$scope.filtro.mes+'-'+$scope.filtro.dia;
    $scope.tarea = {fecha: f, descripcion: null, accion:null};

	$scope.tarea.accion = "get";
	
	$http.post('model/trackTema.php', {accion:"get"}).then(function exitoso(respuesta) {
			if (respuesta.data.resultado === 'error') {
				console.log("error");
			} else if (respuesta.data != 'null') {
				$scope.lista = respuesta.data;
			}
		});
		
	obtenerTareas();
    function obtenerTareas() {
		
		var f = $scope.filtro.anio+'-'+$scope.filtro.mes+'-'+$scope.filtro.dia;
		$scope.tarea.fecha = f;
		$scope.tarea.accion = "get";
        var data = $scope.tarea;


		$http.post('model/app.php', data).then(function exitoso(respuesta) {
			if (respuesta.data.resultado === 'error') {
				console.log("error");
			} else if (respuesta.data != 'null') {
				$scope.lista = respuesta.data;
			}
		});

    }
	
	$scope.search = function() {
		obtenerTareas();
	}
	
    $scope.sendPost = function() {
		$scope.tarea.accion = "add";
		$scope.tarea.fecha = getHora($scope.tarea.fecha);
        var data = $scope.tarea;
        $http.post("model/app.php", data).success(function(data, status) {
            $scope.hello = data;
			$scope.tarea = {fecha: f, descripcion: null, accion:null};
			obtenerTareas();
        })
    }

	
	function getHora(f) {
	
		var date = new Date();

		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		
		return f+' '+hour+':'+min+':'+sec;
	}
	
	$scope.editar = function (row) {
		var dialog = ngDialog.open({
			template: 'pages/modal/edit.html',
			controller: 'editCtrl',
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
            templateUrl: 'pages/modal/delete.html',
			controller: 'deleteCtrl',
            resolve: {
				row: function () {
					return row;
				}
			}
        });
	}
	
}]);