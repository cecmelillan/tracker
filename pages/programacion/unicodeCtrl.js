app.controller('unicodeCtrl', function($scope, ngDialog, $modal, ServicioBackend) {
    
	$scope.objeto = {materia:null, termino:null, detalle:null};
	$scope.rango = {desde:0, hasta:100, celdas:10}
	
	$scope.tiposMateria = [{id:1, descripcion:"Matematica"}, {id:2, descripcion:"Fisica"}];
	$scope.lista = null; //[];	
	
	function obtenerTareas() {
		if($scope.rango.desde !=null && $scope.rango.hasta !=null) {
			var tabla = [];
			var fila = [];
			var i = $scope.rango.desde;
			// loop sobre el rango de valores
			while(i <= $scope.rango.hasta) {
//				var fila = [];
				//loop sobre el array fila
				for(var f = 0; f <= $scope.rango.celdas; f++) {
					fila.push({nro:i, unicode:"&#"+i+";"});
					i++;
console.log(fila.length);
				} // end for
				tabla.push(fila);
				fila = [];
console.log("while "+i);
			} //end while
			 $scope.lista = tabla;
console.log("fin");
		} // endif
	}
	
	$scope.limpiarFiltro = function() {
		$scope.rango = {desde:null, hasta:null};
		obtenerTareas();
	}
	
	$scope.search = function() {
		obtenerTareas();
	}
	
	
	obtenerTareas();
	
});