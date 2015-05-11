(function () {
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
    
    // AZURE SERVER
    const serverServices = 'http://cgptazrbdp01.cloudapp.net:5000';
    
    // VMWARE SERVER
    // const serverServices = 'http://83.240.151.253:5000'; 
    
    // LOCALHOST
    // const serverServices = 'http://localhost:5000'; 
    
    var statServices = angular.module('statServices', ['ngResource']);
    statServices.factory('Dominios', Dominios);
    statServices.factory('Dimensoes', Dimensoes);
    statServices.factory('Indicador', Indicador);
    statServices.factory('Texto', Texto);
    statServices.factory('Generico', Generico);
    statServices.factory('TextoAll', TextoAll);
    statServices.factory('DominioHierarquia', DominioHierarquia);
    statServices.factory('DashboardUtilizador', DashboardUtilizador);
    statServices.factory('Observacao', Observacao);
    statServices.factory('DominioHierarquia', DominioHierarquia);
    statServices.factory('Dominio', Dominio);
    statServices.factory('DadosFonte', DadosFonte);
    statServices.factory('DadosFonteAll', DadosFonteAll);
    statServices.factory('DominioDadosFonte', DominioDadosFonte);
    Dominios.$inject = ['$resource'];
    Dimensoes.$inject = ['$resource'];
    Indicador.$inject = ['$resource'];
    Texto.$inject = ['$resource'];
    Generico.$inject = ['$resource'];
    DashboardUtilizador = ['$resource'];
    TextoAll.$inject = ['$resource'];
    DominioHierarquia.$inject = ['$resource'];
    Dominio.$inject = ['$resource'];
    Observacao.$inject = ['$resource'];
    DadosFonte.$inject = ['$resource'];
    DadosFonteAll.$inject = ['$resource'];
    DominioDadosFonte.$inject = ['$resource'];

    function Dominios($resource) {

        return $resource(serverServices + '/Portal.svc/dominio', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dominio',{},{
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    };

    function Dimensoes($resource) {
        return $resource(serverServices + '/Portal.svc/dimensao/info', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dimensao/info', {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    };

    function Indicador($resource) {
        //return $resource('/api/indicador_1.json',{},{
        return $resource(serverServices + '/Portal.svc/observacao', {
            id: '@id'
        }, {
            //return $resource('http://localhost:5000/Portal.svc/indicador/:id',{id:'@id'}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    };

    function Observacao($resource) {
        //return $resource('/api/indicador_1.json',{},{
        return $resource(serverServices + '/Portal.svc/observacao', {}, {
            //return $resource('http://localhost:5000/Portal.svc/indicador/:id',{id:'@id'}, {
            query: {
                method: 'POST',
                isArray: false
            }
        });
    };

    function Texto($resource) {
        return $resource(serverServices + '/Portal.svc/texto/:id', {
            id: '@id'
        }, {
            //  return $resource('http://localhost:5000/Portal.svc/texto/:id', { id: '@id' }, {
            query: {
                method: 'GET',
                isArray: false
            },
            save: {
                method: 'PUT',
                isArray: false
            }
        });
    };

    function TextoAll($resource) {
        return $resource(serverServices + '/Portal.svc/texto', {}, {
            //  return $resource('http://localhost:5000/Portal.svc/texto/:id', { id: '@id' }, {
            query: {
                method: 'GET',
                isArray: true
            },
            saveNew: {
                method: 'POST',
                isArray: false
            }
        });
    };

    function DominioHierarquia($resource) {

        return $resource(serverServices + '/Portal.svc/dominio/hierarquia', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dominio/hierarquia',{},{
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    };

    function Generico($resource) {

        return $resource(serverServices + '/Portal.svc/dashboard/generico', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dashboard/generico',{},{
            query: {
                method: 'GET',
                isArray: false
            }
        });
    };

    function DashboardUtilizador($resource) {
        return $resource(serverServices + '/Portal.svc/dashboard/utilizador', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dashboard/utilizador',{},{
            query: {
                method: 'GET',
                isArray: false
            }
        });
    };

    function Dominios($resource) {

        return $resource(serverServices + '0/Portal.svc/dominio', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dominio',{},{
            query: {
                method: 'GET',
                params: {},
                isArray: false
            },
            saveNew: {
                method: 'POST',
                isArray: false
            }
        });
    };

    function Dominio($resource) {

        return $resource(serverServices + '/Portal.svc/dominio/:id', {
            id: '@id'
        }, {
            //return $resource('http://localhost:5000/Portal.svc/dominio',{},{
            query: {
                method: 'GET',
                params: {},
                isArray: false
            },
            save: {
                method: 'PUT',
                isArray: false
            }
        });
    };

    function DominioHierarquia($resource) {

        return $resource(serverServices + '/Portal.svc/dominio/hierarquia', {}, {
            //return $resource('http://localhost:5000/Portal.svc/dominio/hierarquia',{},{
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    };

    function DadosFonte($resource) {
        return $resource(serverServices + '/Portal.svc/dados_fonte/:id', {
            id: '@id'
        }, {
            //  return $resource('http://localhost:5000/Portal.svc/dados_fonte/:id', { id: '@id' }, {
            query: {
                method: 'GET',
                isArray: false
            },
            save: {
                method: 'PUT',
                isArray: false
            },
            delete: {
                method: 'DELETE',
                isArray: false
            }
        });
    };

    function DadosFonteAll($resource) {
        return $resource(serverServices + '/Portal.svc/dados_fonte', {}, {
            //  return $resource('http://localhost:5000/Portal.svc/dados_fonte/', { id: '@id' }, {
            query: {
                method: 'GET',
                isArray: false
            },
            saveNew: {
                method: 'POST',
                isArray: false
            }
        });
    };

    function DominioDadosFonte($resource) {

        return $resource(serverServices + '/Portal.svc/dominio/:idDominio/dados_fonte/:idFonte', {
            idDominio: '@idDominio',
            idFonte: '@idFonte'
        }, {
            query: {
                method: 'GET',
                isArray: false
            },
            save: {
                method: 'POST',
                isArray: false
            }
        });
    };

})();