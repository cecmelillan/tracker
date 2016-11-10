// main
app.controller('homeEditCtrl', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

app.controller('homeDeleteCtrl', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

// faq
app.controller('faqEditCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:'edit', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/faq.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
});

app.controller('faqDeleteCtrl', function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:'delete', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/faq.php', $scope.tarea).then(function (respuesta) {
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
});

// Materia
app.controller('materiasEditCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:'edit', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/materias.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
});

app.controller('mediosDeleteCtrl', function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:'delete', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/medios.php', $scope.tarea).then(function (respuesta) {
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
});

// Materia
app.controller('mediosEditCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:'edit', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/medios.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
});

app.controller('materiasDeleteCtrl', function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:'delete', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/materias.php', $scope.tarea).then(function (respuesta) {
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
});

// free
app.controller('freeEditCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:'edit', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/free.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
	$scope.cancelar = function() {
		ngDialog.close();
	}
});

app.controller('freeDeleteCtrl', function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:'delete', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/free.php', $scope.tarea).then(function (respuesta) {
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
});

// free
app.controller('tagEditCtrl', function($scope, ServicioBackend, ngDialog, row) {
	$scope.row = row;
	$scope.tarea = {accion:'edit', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/tag.php', $scope.tarea).then(function (respuesta) {
		if (respuesta == false) {
			console.log("error");
		} else if (respuesta) {
			ngDialog.close();
		}
	});
	}
	$scope.cancelar = function() {
		ngDialog.close();
	}
});

app.controller('tagDeleteCtrl', function($scope, $modalInstance, row, ServicioBackend) {
	
	$scope.row = row;
	
	$scope.tarea = {accion:'delete', objeto:null};

	$scope.guardar = function() {
		$scope.tarea.objeto = $scope.row;
		
		ServicioBackend.obtener('model/tag.php', $scope.tarea).then(function (respuesta) {
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
});