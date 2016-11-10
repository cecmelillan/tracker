// Creación del módulo
var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'ngDialog', 'ngSanitize']);

app.service('ServicioBackend', ['$http', '$timeout', '$location', '$q', '$rootScope', function ($http, $timeout, $location, $q, $rootScope) {

                /**
                 * Busca información de la sesión actual en el server. El uso básico de esta funcion es tratar de determinar si el usuario
                 * ya estaba logueado cuando arrancó la app
                 * NOTA PARA PROGRAMADORES DEL BACKEND:
                 * El backend debe verificar si el usuario está logueado y devolver en caso positivo un objeto similar al del login.
                 * Si el usuario no está logueado puede devolver un mensaje u otra cosa, pero nada con "id" ya que es ese atributo el que chequeamos
                 * para saber si está logueado.
                 * @param {type} datos
                 * @returns {$q@call;defer.promise}
                 */
                this.obtener = function (route, datos) {
                    return $http.post(route, datos).then(function exitoso(respuesta) {
                        if (respuesta.data) {
                            return respuesta.data;
                        }
                    });
                };
}]); //Principal
// ---------------------------

// Configuración de las rutas
app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainCtrl'
        })
        .when('/faq', {
            templateUrl : 'pages/faq.html',
            controller  : 'faqCtrl'
        })
        .when('/materias', {
            templateUrl : 'pages/materias.html',
            controller  : 'materiasCtrl'
        })
        .when('/medios', {
            templateUrl : 'pages/medios.html',
            controller  : 'mediosCtrl'
        })
        .when('/programacion/free', {
            templateUrl : 'pages/programacion/free.html',
            controller  : 'freeCtrl'
        })
        .when('/programacion/tag', {
            templateUrl : 'pages/programacion/tag.html',
            controller  : 'tagCtrl'
        })
        .when('/programacion/unicode', {
            templateUrl : 'pages/programacion/unicode.html',
            controller  : 'unicodeCtrl'
        })
        .when('/programacion/twitter', {
            templateUrl : 'pages/programacion/twitter.html',
            controller  : 'twitterCtrl'
        })
        .when('/programacion/facebook', {
            templateUrl : 'pages/programacion/facebook.html',
            controller  : 'facebookCtrl'
        })
        .when('/cnrt/sitios', {
            templateUrl : 'pages/cnrt/sitios.html',
            controller  : 'sitiosCtrl'
        })
        .when('/cnrt/presentismo', {
            templateUrl : 'pages/cnrt/presentismo.html',
            controller  : 'presentismoCtrl'
        })
        .when('/cnrt/licencias', {
            templateUrl : 'pages/cnrt/licencias.html',
            controller  : 'licenciasCtrl'
        })
        .when('/cnrt/areas', {
            templateUrl : 'pages/cnrt/areas.html',
            controller  : 'areasCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
});

app.filter('dateformatter', function($filter) {
    return function(input)
    {
        if(input == null){ return ""; }
        var _date = $filter('date')(new Date(input), 'dd MM yyyy @ HH:mm:ss'); // $filter('datetmUTC')( date )
        return _date.toUpperCase();
    };
});