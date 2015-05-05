(function() {
'use strict';

/* Services */
/*
var statServices = angular.module('statServices', ['ngResource']);

statServices.factory('Dominios',Dominios);

Dominios.$inject = ['$resources'];

function Dominios($resources) {
    return $resource('api/:file.json', {}, {
      query: {method:'GET', params:{file:'dominios',series:$scope.selection.serie}, isArray:false}
    });
  };
*/

var statServices = angular.module('statServices', ['ngResource']);

statServices.factory('Dominios',Dominios);
statServices.factory('Dimensoes',Dimensoes);
statServices.factory('Indicador',Indicador);
statServices.factory('Texto', Texto);

Dominios.$inject = ['$resource'];
Dimensoes.$inject = ['$resource'];
Indicador.$inject = ['$resource'];
Texto.$inject = ['$resource'];

function Dominios($resource){
	return $resource('http://cgptazrbdp01.cloudapp.net:5000/Portal.svc/dominio',{},{
    //return $resource('http://localhost:5000/Portal.svc/dominio',{},{
    query: {method:'GET', 
            params:{},  
          isArray:true}
  });
};

function Dimensoes($resource){
  return $resource('http://cgptazrbdp01.cloudapp.net:5000/Portal.svc/dimensao/info', {}, {
  //return $resource('http://localhost:5000/Portal.svc/dimensao/info', {}, {
    query: {method:'GET', isArray:false}
  });
};

function Indicador($resource){
  return $resource('http://cgptazrbdp01.cloudapp.net:5000/Portal.svc/indicador/:id',{id:'@id'}, {
    //return $resource('http://localhost:5000/Portal.svc/indicador/:id',{id:'@id'}, {
    query: {method:'GET',
    isArray:false}
  });
};

function Texto($resource){
    return $resource('http://cgptazrbdp01.cloudapp.net:5000/Portal.svc/texto/:id', { id: '@id' }, {
    //  return $resource('http://localhost:5000/Portal.svc/texto/:id', { id: '@id' }, {
    query: {method:'GET',
        isArray: false
    },
    saveNew: {method:'PUT',
        isArray: false
    }
  });
};



})();
