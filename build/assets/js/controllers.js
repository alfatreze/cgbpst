(function () {
    'use strict';

    angular.module('application', [
    // Angular libraries
    'ui.router',
    'ngAnimate',
    'dndLists',
    // App Modules
    'controllers',
    // Foundation UI components
    'foundation',
    // Routing with front matter
    'foundation.dynamicRouting',
    // Transitioning between views
    'foundation.dynamicRouting.animations',
    //services
    'statServices',
    //controllers
    'statControllers'
    ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider'];

    function config($urlProvider, $locationProvider) {

        // Default to the index view if the URL loaded is not found
        $urlProvider.otherwise('/home');

        // Use this to enable HTML5 mode
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        // Use this to set the prefix for hash-bangs
        // Example: example.com/#!/page
        $locationProvider.hashPrefix('!');
    }

    function run() {
        // Enable FastClick to remove the 300ms click delay on touch devices
        FastClick.attach(document.body);
    }





})();


(function () {

    // CONTROLLER MODULE

    var app = angular.module('controllers', ['statServices', 'ngResource']);

    // CONTROLLERS
    // --------------------------------------------------

    // HEADER

/*
    function bdpMenu_FilterMenuLinksBySection(menuLinks, menuSectionKey) {
        var newMenuLinks = new Array();

        var menuLink;

        for (var i = 0; i < menuLinks.length; i++) {
            menuLink = menuLinks[i];

            if (menuLink['section'] == menuSectionKey) {
                newMenuLinks[newMenuLinks.length] = menuLink;
            }
        }

        return newMenuLinks;
    }

    function bdpMenu_GetSection(menuSectionKey) {
        var menuSection;
        var menuSectionToReturn;

        for (var i = 0; i < menuSections.length; i++) {
            menuSection = menuSections[i];

            if (menuSection['section'] == menuSectionKey) {
                menuSectionToReturn = menuSection;
                break;
            }
        }

        return menuSectionToReturn;
    }


    var menuSections = [
        {
            name: 'Backoffice',
            order: 1,
            section: 'BO',
            uiSref: 'backoffice',
        },
        {
            name: 'Frontoffice',
            order: 2,
            section: 'FO',
            uiSref: 'home',
        }
    ];

    var mainLinks = [
        {
        name: 'Front Office',
        order: 1,
        section: 'FO',
        uiSref: 'home',
        },
        {
            name: 'Ajuda',
            order: 2,
            section: 'FO',
            uiSref: 'Ajuda',
        },
        {
            name: 'Ajuda',
            order: 2,
            section: 'BO',
            uiSref: 'Ajuda_BO',
        },
        {
            name: '-',
            order: 3,
            section: 'FO',
            uiSref: 'Menu',
        },
    ];

    var subLinks = [
        {
            name: 'Gestão de Conteúdos',
            order: 1,
            section: 'BO',
            uiSref: 'GestaoConteudos',
            enabled: true,
        },
        {
            name: 'Gestão de Publicações',
            order: 2,
            section: 'BO',
            uiSref: 'GestaoPublicacoes',
            enabled: 'disabled',
        },
        {
            name: 'Gestão da Pesquisa',
            order: 3,
            section: 'BO',
            uiSref: 'GestaoPesquisa',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Utilizadores',
            order: 4,
            section: 'BO',
            uiSref: 'GestaoUtilizadores',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Contactos',
            order: 5,
            section: 'BO',
            uiSref: 'GestaoContactos',
            enabled: 'disabled',
        },
        {
            name: 'Monitorização',
            order: 6,
            section: 'BO',
            uiSref: 'Monitorizacao',
            enabled: 'disabled',
        },
        {
            name: 'Estatistica',
            order: 1,
            section: 'FO',
            uiSref: 'DomainEstatistica',
            enabled: '',
        },
        {
            name: 'Domain 2',
            order: 2,
            section: 'FO',
            uiSref: 'Domain2',
            enabled: '',
        },
    ];
*/
    // SIDEBAR


})();

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
  //return $resource('api/:file.json', {}, {
    return $resource('http://localhost:5000/Portal.svc/dominio',{},{
    query: {method:'GET', 
            params:{},  
          isArray:true}
  });
};

function Dimensoes($resource){
  return $resource('http://localhost:5000/Portal.svc/dimensao/info', {}, {
    query: {method:'GET', isArray:false}
  });
};

function Indicador($resource){
  return $resource('http://localhost:5000/Portal.svc/indicador/:id',{id:'@id'}, {
    query: {method:'GET',
    isArray:false}
  });
};

function Texto($resource){
    return $resource('http://localhost:5000/Portal.svc/texto/:id', { id: '@id' }, {
    query: {method:'GET',
        isArray: false
    },
    saveNew: {method:'PUT',
        isArray: false
    }
  });
};



})();

'use strict';

/* Controllers */
var statControllers = angular.module('statControllers',['statServices','ngResource','dndLists']);

statControllers.controller('DomainsController', DomainsController);
statControllers.controller('HeaderController', HeaderController);
statControllers.controller('ConteudoController', ConteudoController);
statControllers.controller('DragDropController', DragDropController);

DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','filterFilter','dominiosModel'];
HeaderController.$inject = ['$scope'];
ConteudoController.$inject = ['$scope','$state', '$window','Texto','Dominios'];
DragDropController.$inject = ['$scope'];

function DragDropController($scope) {


     $scope.models = {
        selected: null,
        lists: {"A": [], "B": [], "C": []}
    };

    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
        $scope.models.lists.C.push({label: "Item C" + i});
    }

    // Model to JSON for demo purpose
   $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);



}

function ConteudoController($scope, $state, $window, Texto, Dominios) {

    //this is $scope???

    //tem que devolver uma estrutura do tipo {textos : [{"id":1,"titulo":"titulo1","subtitulo":"subtitulo1","conteudo":"content1","posicao":1,"data":"\/Date(1430131939000+0000)\/"},{"id":2,"titulo":"titulo2","subtitulo":"subtitulo2","conteudo":"content2"]}
    //pedir para alterarem o serviço rest para devolver na estrutura correcta
    /*$scope.texto = Texto.query(function(data){
        $scope.textos = data;
        //$scope.textos = JSON.stringify(data));
        //console.log("Textos: " + JSON.stringify($scope.textos));
    }, function(error){
        //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
        alert(JSON.stringify(error));
        $scope.textos={};
    });*/

    function conteudo_gerarGrafico(graficoId) {
        var chart1 = c3.generate({
            bindto: '#' + graficoId,
            width: 450,
            data: {
                columns: [
                ['data1', 30, 20, 50, 40, 60, 50],
                ['data2', 200, 130, 90, 240, 130, 220],
                ['data3', 300, 200, 160, 400, 250, 250]
                ]
            }
        });
    }

    function conteudo_getShowLinks(textosVisible, graficosVisible) {
        var returnArray = new Array();
        var allVisible = textosVisible && graficosVisible;

        returnArray[returnArray.length] = conteudoShowTextos;
        returnArray[returnArray.length] = conteudoShowGraficos;
        returnArray[returnArray.length] = conteudoShowAll;

        if (textosVisible) {
            returnArray[0].className = conteudoTextosClassLinkActive;
        }
        else {
            returnArray[0].className = conteudoTextosClassLinkInactive;
        }

        if (graficosVisible) {
            returnArray[1].className = conteudoTextosClassLinkActive;
        }
        else {
            returnArray[1].className = conteudoTextosClassLinkInactive;
        }

        if (allVisible) {
            returnArray[2].className = conteudoTextosClassLinkActive;
        }
        else {
            returnArray[2].className = conteudoTextosClassLinkInactive;
        }

        return returnArray;
    }

    var conteudoTextosClassLinkActive = 'LinkConteudoActive';
    var conteudoTextosClassLinkInactive = 'LinkConteudoInactive';

    var conteudoShowTextos = {
        name: 'Apenas textos',
        conteudosToShow: 'textos',
    }

    var conteudoShowGraficos = {
        name: 'Apenas gráficos',
        conteudosToShow: 'graficos',
    }

    var conteudoShowAll = {
        name: 'Ver todos',
        conteudosToShow: 'all',
    }

    var conteudoTextos = [
        { "id": 1, "titulo": "titulo1", "subtitulo": "subtitulo1", "conteudo": "content1", "posicao": 1, "data": "\/Date(1430131939000+0000)\/" },
        { "id": 2, "titulo": "titulo2", "subtitulo": "subtitulo2", "conteudo": "content2", "posicao": 2, "data": "\/Date(1430131949000+0000)\/" },
        { "id": 4, "titulo": "titulo4", "subtitulo": "subtitulo4", "conteudo": "content4", "posicao": 4, "data": "\/Date(1430146232000+0000)\/" },
        { "id": 5, "titulo": "titulo5", "subtitulo": "subtitulo5", "conteudo": "content5", "posicao": 5, "data": "\/Date(1430146239000+0000)\/" }
    ];

    var conteudoGraficos = [
        {
            title: 'This is a title 1',
            order: 1,
            graficoId: 'Graf1',
            person: 'Margarida Rebelo',
            textDate: '20 JUL 2015',
        },
        {
            title: 'This is a title 2',
            order: 1,
            graficoId: 'Graf2',
            person: 'Margarida Rebelo',
            textDate: '20 JUL 2015',
        },
        {
            title: 'This is a title 3',
            order: 1,
            graficoId: 'Graf3',
            person: 'Margarida Rebelo',
            textDate: '20 JUL 2015',
        },

    ];


    $scope.textosVisible = true;
    $scope.graficosVisible = true;
    $scope.textosLoaded = false;
    $scope.graficosLoaded = false;
    $scope.conteudosGraficos = new Array();

    $scope.conteudoTextoEditOn = false;

    $scope.editarConteudoTexto = function (conteudoToEdit) {
        $scope.conteudoTextoToEdit = conteudoToEdit;
        $scope.conteudoTextoEditOn = true;
    }

    $scope.cancelarConteudoTexto = function () {
        $scope.conteudoTextoEditOn = false;
    }

    $scope.novoConteudoTexto = function () {
        var conteudoToSave = { "id": 0, "titulo": "", "subtitulo": "", "conteudo": "", "posicao": 0, "data": "\/Date(1430131939000+0000)\/" };

        conteudoToSave.id = 0;
        conteudoToSave.titulo = '';
        conteudoToSave.subtitulo = '';
        conteudoToSave.conteudo = '';
        conteudoToSave.posicao = 1;
        conteudoToSave.data = new Date();

        $scope.editarConteudoTexto(conteudoToSave);
    }

    $scope.getTextos = function () {
        if (!$scope.textosLoaded) {
            $scope.textoQueryResult = Texto.query(function (data) {
                $scope.textos = data;
                $scope.textosLoaded = true;
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro:' + JSON.stringify(error));
                $scope.textos = {};
            });
        }

        return $scope.conteudosTexto;
    }

    $scope.getGraficos = function () {
        if (!$scope.graficosLoaded) {
            if (localStorage.getItem("BDP_ConteudoGraficosTeste")) {
                conteudoGraficos = JSON.parse(localStorage.getItem("BDP_ConteudoGraficosTeste"));
            }

            $scope.conteudosGraficos = new Array();

            var conteudoGrafico;

            for (var i = 0; i < conteudoGraficos.length; i++) {
                conteudoGrafico = conteudoGraficos[i];
                conteudoGrafico['index'] = i;
                $scope.conteudosGraficos[i] = conteudoGrafico;
            }

            $scope.graficosLoaded = true;
        }

        return this.conteudosGraficos;
    }

    $scope.gerarGrafico = function (graficoId) {
        conteudo_gerarGrafico(graficoId);
    }

    $scope.showLinks = conteudo_getShowLinks($scope.textosVisible, $scope.graficosVisible);

    $scope.showConteudos = function (conteudosToShow) {
        if (conteudosToShow == 'textos' || conteudosToShow == 'all') {
          $scope.textosVisible = true;
        }
        else {
          $scope.textosVisible = false;
        }

        if (conteudosToShow == 'graficos' || conteudosToShow == 'all') {
          $scope.graficosVisible = true;
        } else {
          $scope.graficosVisible = false;
        }

        $scope.showLinks = conteudo_getShowLinks($scope.textosVisible, $scope.graficosVisible);
    }

    $scope.saveConteudoTexto = function (conteudoTexto) {
        if (conteudoTexto.id != 0) {
            Texto.saveNew({
                "id": conteudoTexto.id, "titulo": conteudoTexto.titulo,
                "subtitulo": conteudoTexto.subtitulo,
                "conteudo": conteudoTexto.conteudo,
                "posicao": conteudoTexto.posicao
            }, function (data) {
                alert(data);
                console.log("put ");
                //$scope.textos = data;
                //$scope.textos = JSON.stringify(data));
                //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert(JSON.stringify(error));
                $scope.textos = {};
            });
        } else {
            Texto.save({
                "id": conteudoTexto.id, "titulo": conteudoTexto.titulo,
                "subtitulo": conteudoTexto.subtitulo,
                "conteudo": conteudoTexto.conteudo,
                "posicao": conteudoTexto.posicao
            }, function (data) {
                alert(data);
                console.log("post ");
                //$scope.textos = data;
                //$scope.textos = JSON.stringify(data));
                //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert(JSON.stringify(error));
                $scope.textos = {};
            });
        }

        $scope.conteudoTextoEditOn = false;

        $scope.textosLoaded = false;
        $scope.getTextos();
    }

    this.deleteConteudoTexto = function (conteudoTexto) {
        Texto.delete({ "id": conteudoTexto.id }, function (data) {
            console.log("deleted ");
            //$scope.textos = data;
            //$scope.textos = JSON.stringify(data));
            //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert(JSON.stringify(error));
                $scope.textos = {};
            });

            $scope.textosLoaded = false;
            $scope.getTextos();
    }

    $scope.ordenarConteudoTexto = function (conteudoTexto,ordem) {
        conteudoTexto.ordem = conteudoTexto.posicao + ordem;

        if (conteudoTexto.posicao < 1) {
            conteudoTexto.posicao = 1;
        }

        $scope.saveConteudoTexto(conteudoTexto);
    }

    $scope.saveConteudoGrafico = function (conteudoGrafico) {
        var conteudoToSave = this.conteudosGraficos[conteudoGrafico.index];

        conteudoToSave.title = conteudoGrafico.title;

        this.conteudosGraficos[conteudoGraficos.index] = conteudoToSave;

        localStorage.setItem("BDP_ConteudoGraficosTeste", JSON.stringify(conteudoGraficos));
    }

    function getDataPublicacao() {
        var d = data,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
};

function HeaderController($scope) {

    var menuSections = [
        {
            name: 'Backoffice',
            order: 1,
            section: 'BO',
            uiSref: 'backoffice',
        },
        {
            name: 'Frontoffice',
            order: 2,
            section: 'FO',
            uiSref: 'home',
        }
    ];

    var mainLinks = [
        /*{
        name: 'Front Office',
        order: 1,
        section: 'FO',
        uiSref: 'home',
        },*/
        {
            name: 'Ajuda',
            order: 2,
            section: 'FO',
            uiSref: 'Ajuda',
        },
        {
            name: 'Area Pessoal',
            order: 2,
            section: 'FO',
            uiSref: 'user',
        },
        {
            name: 'Ajuda',
            order: 2,
            section: 'BO',
            uiSref: 'Ajuda_BO',
        },
        {
            name: '-',
            order: 3,
            section: 'FO',
            uiSref: 'Menu',
        },
    ];

    var subLinks = [
        {
            name: 'Gestão de Conteúdos',
            order: 1,
            section: 'BO',
            uiSref: 'GestaoConteudos',
            enabled: true,
        },
        {
            name: 'Gestão de Publicações',
            order: 2,
            section: 'BO',
            uiSref: 'GestaoPublicacoes',
            enabled: 'disabled',
        },
        {
            name: 'Gestão da Pesquisa',
            order: 3,
            section: 'BO',
            uiSref: 'GestaoPesquisa',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Utilizadores',
            order: 4,
            section: 'BO',
            uiSref: 'GestaoUtilizadores',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Contactos',
            order: 5,
            section: 'BO',
            uiSref: 'GestaoContactos',
            enabled: 'disabled',
        },
        {
            name: 'Monitorização',
            order: 6,
            section: 'BO',
            uiSref: 'Monitorizacao',
            enabled: 'disabled',
        },
        {
            name: 'Estatistica',
            order: 1,
            section: 'FO',
            uiSref: 'DomainEstatistica',
            enabled: '',
        },
        {
            name: 'Estatistica Pinto',
            order: 2,
            section: 'FO',
            uiSref: 'Dominios',
            enabled: '',
        },
        {
            name: 'DragDrop',
            order: 3,
            section: 'FO',
            uiSref: 'DragDrop',
            enabled: '',
        }
    ];

    function bdpMenu_FilterMenuLinksBySection(menuLinks, menuSectionKey) {
        var newMenuLinks = new Array();

        var menuLink;

        for (var i = 0; i < menuLinks.length; i++) {
            menuLink = menuLinks[i];

            if (menuLink['section'] == menuSectionKey) {
                newMenuLinks[newMenuLinks.length] = menuLink;
            }
        }

        return newMenuLinks;
    }

    function bdpMenu_GetSection(menuSectionKey) {
        var menuSection;
        var menuSectionToReturn;

        for (var i = 0; i < menuSections.length; i++) {
            menuSection = menuSections[i];

            if (menuSection['section'] == menuSectionKey) {
                menuSectionToReturn = menuSection;
                break;
            }
        }

        return menuSectionToReturn;
    }

    $scope.menuSections = menuSections;
    $scope.activeLinks = mainLinks;
    $scope.activeSubLinks = subLinks;
    $scope.activeSection = 'FO';

    $scope.selectMenuSection = function (menuSectionKey) {
        $scope.activeSection = menuSectionKey;

        $scope.activeLinks = bdpMenu_FilterMenuLinksBySection(mainLinks, menuSectionKey);
        $scope.activeSubLinks = bdpMenu_FilterMenuLinksBySection(subLinks, menuSectionKey);
    }

    $scope.isMenuSectionSelected = function (menuSectionKey) {
        if ($scope.activeSection == menuSectionKey) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.activeLinks = bdpMenu_FilterMenuLinksBySection(mainLinks, this.activeSection);
    $scope.activeSubLinks = bdpMenu_FilterMenuLinksBySection(subLinks, this.activeSection);

}

function DomainsController($scope, $state, $window,Dominios,Dimensoes,Indicador,filterFilter,dominiosModel){

  $scope.dominios = Dominios.query();
  $scope.dominiosModel = dominiosModel;

  var pivotMembers = {
                    rows: ["TipoOperacao"],
                    cols: ["Periodo"],
                    vals:["indicador"],
                    rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers)
  };

 function reset() {
   $scope.dominiosModel.reset();

   $scope.choice = {};
   $scope.choice.dimensao = {};
   $scope.choice.membros =[];
 };

 function pivotTable (pivotData,pivotMembers){
      var derivers = $.pivotUtilities.derivers;
      $("#output").pivot(pivotData,pivotMembers)
  };

  function pivotTableUI (pivotData,pivotMembers){
       var derivers = $.pivotUtilities.derivers;
       $("#output").pivotUI(pivotData,pivotMembers)
   };


  $scope.showMembros = function (){
    if (!$scope.choice.dimensao)
        return;
    var a = filterFilter($scope.dimensoes.dimensao,{nome:$scope.choice.dimensao});
    $scope.choice.membros = a[0];
  }

  $scope.showPivotTable = function() {
    pivotTable();
  }

  $scope.init = function() {
    console.log("init:: Read Dominios")
  }

  $scope.selectLink = function(value,action,cols,rows){
    if ($scope.dominiosModel.link != value){
      reset();
      $scope.dominiosModel.link = value;
      $scope.dominiosModel.action = action;
      $scope.dominiosModel.cols = cols;
      $scope.dominiosModel.rows = rows;

      Dimensoes.query({"link":$scope.dominiosModel.link},function(res) {
        $scope.dimensoes = res.toJSON();
      });
    }
  }

  $scope.getTable = function() {

    // todo: testar como POST quando existir ligação ao servico REST
      $scope.indicador = Indicador.get({"id":$scope.dominiosModel.link,"m":$scope.dominiosModel.sel.membros},function(res) {
      $scope.indicador = res.toJSON();
      //amp Dimensoes
      _key = jQuery.map($scope.indicador, function(v, k){ return k;});
      //map Membros
      _value = jQuery.map($scope.indicador, function(v, k){ return v;});
      $scope.indicador._key = _key;
      $scope.indicador._value = _value;

      /* hack table */
      var sum = $.pivotUtilities.aggregatorTemplates.sum;
      var numberFormat = $.pivotUtilities.numberFormat;
      var intFormat = numberFormat({digitsAfterDecimal: 0});
      var pivotMembers = {
                        rows: ["TipoOperacao"],
                        cols: ["Periodo"],
                        aggregator: sum(intFormat)(["indicador"]),
                        filter : function(d) {
                          //todo: definir filtro com _.where
                          return true;
                        }
      };
      if ($scope.dominiosModel.link == 2)
        pivotMembers.rows.push("TipoValor");
      /* hack */

      pivotTable($scope.indicador._value,pivotMembers);
    });
  }

  $scope.getGraph = function() {

    $scope.indicador = Indicador.query({"id":$scope.dominiosModel.sel.membros},function(res) {
      $scope.indicador = res.toJSON();
      _key = jQuery.map($scope.indicador, function(v, k){ return k;});
      _value = jQuery.map($scope.indicador, function(v, k){ return v;});
      $scope.indicador._key = _key;
      $scope.indicador._value = _value;

      /* hack */
      var sum = $.pivotUtilities.aggregatorTemplates.sum;
      var numberFormat = $.pivotUtilities.numberFormat;
      var intFormat = numberFormat({digitsAfterDecimal: 0});
      var pivotMembers = {
                        rows: ["TipoOperacao"],
                        cols: ["Periodo"],
                        aggregatorName : "Nome do indicador",
                        aggregator: sum(intFormat)(["indicador"]),
                        //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                        rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                        renderer: $.pivotUtilities.renderers["Line Chart"]
      };
      if ($scope.dominiosModel.sel.membros == 2)
        pivotMembers.rows.push("TipoValor");
      /* hack */

      pivotTable($scope.indicador._value,pivotMembers);
    });
  }

  $scope.getTable2 = function() {

      $scope.indicador = Indicador.query({"id":$scope.dominiosModel.sel.membros},function(res) {
        $scope.indicador = res.toJSON();
        _key = jQuery.map($scope.indicador, function(v, k){ return k;});
        _value = jQuery.map($scope.indicador, function(v, k){ return v;});
        $scope.indicador._key = _key;
        $scope.indicador._value = _value;

        /* hack */
        var pivotMembers = {
                          rows: ["TipoOperacao"],
                          cols: ["Periodo"],
                          aggregatorName: "Integer Sum",
                          //rendererName : "Line Chart C3",
                          panelHide : jQuery("#panelHide"),
                          panelCols : jQuery("#panelCols"),
                          panelRows : jQuery("#panelRows"),
                          panelMembers : jQuery("#panelMembers"),
                          vals:["indicador"],
                          //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers)
                          rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers)
        };
        if ($scope.dominiosModel.sel.membros == 2)
          pivotMembers.rows.push("TipoValor");
        /* hack */

        pivotTableUI($scope.indicador._value,pivotMembers);
      });
  };

}



/****** model *******/

statControllers.factory('dominiosModel',function(){
  var dominiosModel= {};

  dominiosModel.reset = function() {
    dominiosModel.link = {};
    dominiosModel.cols = ["TipoOperacao"];
    dominiosModel.rows = ["Período"];
    dominiosModel.action = "Tabela";

    dominiosModel.sel = {};
    dominiosModel.sel.membros = [];
  }

  return dominiosModel;
});
/***** Directive *****/

statControllers.directive("checkboxGroup", function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {

                //check model
                if (!scope.$eval(attrs.cbModel))
                  scope.$eval(attrs.cbMode) = [];

                // Determine initial checked boxes
                if (scope.$eval(attrs.cbModel).indexOf(scope.$eval(attrs.cbId)) !== -1) {
                    elem[0].checked = true;
                }

                // Update array on click
                elem.bind('click', function() {
                    var index = scope.$eval(attrs.cbModel).indexOf(scope.$eval(attrs.cbId));
                    // Add if checked
                    if (elem[0].checked) {
                        if (index === -1) scope.$eval(attrs.cbModel).push(scope.$eval(attrs.cbId));
                    }
                    // Remove if unchecked
                    else {
                        if (index !== -1) scope.$eval(attrs.cbModel).splice(index, 1);
                    }
                    // Sort and update DOM display
                    scope.$apply(scope.$eval(attrs.cbModel).sort(function(a, b) {
                        return a - b
                    }));
                });
            }
        }
    });