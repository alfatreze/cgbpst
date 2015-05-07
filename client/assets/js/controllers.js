'use strict';

/* Controllers */
var statControllers = angular.module('statControllers',['statServices','ngResource','dndLists']);

statControllers.controller('DomainsController', DomainsController);
statControllers.controller('HeaderController', HeaderController);
statControllers.controller('ConteudoController', ConteudoController);
statControllers.controller('DragDropController', DragDropController);
statControllers.controller('EstatisticasTreeController', EstatisticasTreeController);

DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','filterFilter','dominiosModel', '$stateParams'];
HeaderController.$inject = ['$scope'];
ConteudoController.$inject = ['$scope','$state', '$window','Texto','Dominios','TextoAll'];
DragDropController.$inject = ['$scope'];
EstatisticasTreeController.$inject = ['$scope', '$state', '$window', 'DominioHierarquia'];

function EstatisticasTreeController($scope, $state, $window, DominioHierarquia) {
	function calculateEstatisticasLevels(estatisticasTreeItem, parentLevel)	{
		var currentLevel = parentLevel + 1;
		var subdominioItem;
		
		for (var i = 0; i < estatisticasTreeItem.subdominios.length; i++) {
			subdominioItem = estatisticasTreeItem.subdominios[i];
			
			subdominioItem.level = currentLevel;
			
			calculateEstatisticasLevels(subdominioItem, currentLevel);
		}
	}
	
    $scope.estatisticasTreeInitTree = function () {
		//$scope.EstatisticasTreeItems = {"dominio":[{"id":1,"nome":"Balança de Pagamentos","dados_fonte":[{"id":1,"nome":"Principais componentes","link":""},{"id":2,"nome":"Balança corrente - crédito","link":""}],"subdominios":[]},{"id":2,"nome":"Teste1","dados_fonte":[],"subdominios":[{"id":3,"nome":"Teste2","dados_fonte":[],"subdominios":[]},{"id":4,"nome":"Teste3","dados_fonte":[{"id":3,"nome":"SérieTeste","link":""}],"subdominios":[]}]},{"id":12,"nome":"Teste4","dados_fonte":[],"subdominios":[{"id":13,"nome":"Teste5","dados_fonte":[],"subdominios":[{"id":14,"nome":"Teste6","dados_fonte":[],"subdominios":[{"id":15,"nome":"Teste7","dados_fonte":[{"id":4,"nome":"SerieX","link":"teste.html"}],"subdominios":[]}]}]}]}]};
		
		$scope.EstatisticasTreeItems = {};
		
		DominioHierarquia.query(function (data) {
			$scope.EstatisticasTreeItems = data;
			
			var currentLevel = 1;
			var estatisticasTreeItem;
			
			for (var i = 0; i < $scope.EstatisticasTreeItems.dominio.length; i++) {
				estatisticasTreeItem = $scope.EstatisticasTreeItems.dominio[i];
				
				estatisticasTreeItem.level = currentLevel;
				
				calculateEstatisticasLevels(estatisticasTreeItem, currentLevel);
			}
		}, function (error) {
			//definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
			alert('Erro:' + JSON.stringify(error));
			$scope.EstatisticasTreeItems = {};
		});		

    }
}


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

function ConteudoController($scope, $state, $window, Texto, Dominios, TextoAll) {

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

	$scope.conteudoUniforme = new Array();
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
		var dados;
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
        // return $scope.textoQueryResult;
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

        return $scope.conteudosGraficos;
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
        if (conteudoTexto.id == 0) {
            TextoAll.saveNew({
                "id": conteudoTexto.id, "titulo": conteudoTexto.titulo,
                "subtitulo": conteudoTexto.subtitulo,
                "conteudo": conteudoTexto.conteudo,
                "posicao": conteudoTexto.posicao
            }, function (data) {
                console.log("put ");

				$scope.conteudoTextoEditOn = false;

				$scope.textosLoaded = false;
				$scope.getTextos();
                //$scope.textos = data;
                //$scope.textos = JSON.stringify(data));
                //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro: ' + JSON.stringify(error));
                $scope.textos = {};
            });
        } else {
            Texto.save({
                "id": conteudoTexto.id, "titulo": conteudoTexto.titulo,
                "subtitulo": conteudoTexto.subtitulo,
                "conteudo": conteudoTexto.conteudo,
                "posicao": conteudoTexto.posicao
            }, function (data) {
				$scope.conteudoTextoEditOn = false;

				$scope.textosLoaded = false;
				$scope.getTextos();
                //$scope.textos = data;
                //$scope.textos = JSON.stringify(data));
                //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro ' + JSON.stringify(error));
                $scope.textos = {};
            });
        }
    }

    $scope.deleteConteudoTexto = function (conteudoTexto) {
        Texto.delete({ "id": conteudoTexto.id }, function (data) {
            console.log("deleted ");

            $scope.textosLoaded = false;
            $scope.getTextos();
            //$scope.textos = data;
            //$scope.textos = JSON.stringify(data));
            //console.log("Textos: " + JSON.stringify($scope.textos));
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro ' + JSON.stringify(error));
                $scope.textos = {};
            });
    }

    $scope.ordenarConteudoTexto = function (conteudoTexto,ordem) {
        /*conteudoTexto.ordem = conteudoTexto.posicao + ordem;

        if (conteudoTexto.posicao < 1) {
            conteudoTexto.posicao = 1;
        }

        $scope.saveConteudoTexto(conteudoTexto);*/
		if(ordem>0){
			if(conteudoTexto.posicao!=1)conteudoTexto.posicao--;
		}
		else if(ordem<0){
			conteudoTexto.posicao++;
		}
		
		return $scope.saveConteudoTexto(conteudoTexto);
    }
	
	$scope.ordenarConteudoGrafico = function (conteudoGrafico,ordem) {
        /*conteudoTexto.ordem = conteudoTexto.posicao + ordem;

        if (conteudoTexto.posicao < 1) {
            conteudoTexto.posicao = 1;
        }

        $scope.saveConteudoTexto(conteudoTexto);*/
		if(ordem>0){
			if(conteudoGrafico.order!=1)conteudoTexto.order--;
		}
		else if(ordem<0){
			conteudoGrafico.order++;
		}
		
		return $scope.saveConteudoGrafico(conteudoGrafico);
    }

    $scope.saveConteudoGrafico = function (conteudoGrafico) {
        var conteudoToSave = $scope.conteudosGraficos[conteudoGrafico.index];
		console.log($scope.conteudosGraficos);
        conteudoToSave.title = conteudoGrafico.title;

        $scope.conteudosGraficos[conteudoGraficos.index] = conteudoToSave;

        localStorage.setItem("BDP_ConteudoGraficosTeste", JSON.stringify(conteudoGraficos));
    }

    $scope.conteudoTextoInitEditor = function (textareaId) {
        //CKEDITOR.replace(textareaId);
    }
	
	$scope.getTodoConteudo = function (){
		var textos = $scope.getTextos(),
			graficos = $scope.getGraficos();
		console.log(textos);
		console.log(graficos);
		
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

    $scope.activeLinks = bdpMenu_FilterMenuLinksBySection(mainLinks, $scope.activeSection);
    $scope.activeSubLinks = bdpMenu_FilterMenuLinksBySection(subLinks, $scope.activeSection);

}

function DomainsController($scope, $state, $window,Dominios,Dimensoes,Indicador,filterFilter,dominiosModel, $stateParams){

  $scope.domainsLink = $stateParams.link;

  //$scope.selectLink($stateParams.link,'Graph');

  $scope.dominios = Dominios.query();
  $scope.dominiosModel = dominiosModel;
  var active;

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
   $scope.indicador = {};
 };
 
 $scope.setActive = function(selecao){
	 $scope.active=selecao;
	 console.log(active);
 };


 function pivotTable (pivotData,pivotMembers){
      var derivers = $.pivotUtilities.derivers;
      $("#output").pivot(pivotData,pivotMembers)
  };

  function pivotTableUI (pivotData,pivotMembers){
       var derivers = $.pivotUtilities.derivers;
       $("#output").pivotUI(pivotData,pivotMembers)
   };
   
   $scope.getMetadata = function (){
	   console.log($scope.dominios);
	   console.log($scope.dominios.dominio);
	   console.log($scope.dominios.dominio);
	   
   };


  $scope.showMembros = function (){
    if (!$scope.choice.dimensao)
        return;
    var a = filterFilter($scope.dimensoes.dimensao,{id:$scope.choice.dimensao});
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

    var m =   _.groupBy($scope.dominiosModel.sel.membros, function(val){ return val.dimensao});
    var d= [];
    _.each(m,function(v,k,o) {
        var res = {id:k,value:_.pluck(v,'membro')};
        d.push(res);
    });
       
    if (jQuery.isEmptyObject($scope.indicador)) { 
        // todo: testar como POST quando existir ligação ao servico REST
        $scope.indicador = Indicador.save({"id_membros":$scope.dominiosModel.sel.membros},function(res) {
            $scope.indicador = res.toJSON();
            //amp Dimensoes
            _key = jQuery.map($scope.indicador.observacao, function(v, k){ return k;});
        
            //map Membros
            _value = jQuery.map($scope.indicador.observacao, function(v, k){ return v;});
            $scope.indicador._key = _key;
            $scope.indicador._value = _value;
            
            /* hack table */
            var sum = $.pivotUtilities.aggregatorTemplates.sum;
            var numberFormat = $.pivotUtilities.numberFormat;
            var intFormat = numberFormat({digitsAfterDecimal: 0});
            var pivotMembers = {
                      rows: ["tipo_operacao"],
                      cols: ["periodo"],
                      aggregator: sum(intFormat)(["valor"]),
                      filter : function(filter) {
                          /*var aaa = [];aaa.push(filter);
                          var bbb = $scope.dominiosModel.sel.membros;
                          _.each(bbb, function (val){
                              delete val.dimensao;
                              console.log(val);
                              console.log(_.where(aaa,val));    
                          });
                          */
                        //todo: definir filtro com _.where
                        return true;
                      }
            };
   
   
            /* hack */
            pivotTable($scope.indicador._value,pivotMembers);
        });
    } else {
            var sum = $.pivotUtilities.aggregatorTemplates.sum;
            var numberFormat = $.pivotUtilities.numberFormat;
            var intFormat = numberFormat({digitsAfterDecimal: 0});
            var pivotMembers = {
                      rows: ["tipo_operacao"],
                      cols: ["periodo"],
                      aggregator: sum(intFormat)(["valor"]),
                      filter : function(filter) {
                          /*var aaa = [];aaa.push(filter);
                          var bbb = $scope.dominiosModel.sel.membros;
                          _.each(bbb, function (val){
                              delete val.dimensao;
                              console.log(val);
                              console.log(_.where(aaa,val));    
                          });
                          */
                        //todo: definir filtro com _.where
                        return true;
                      }
            };
   
            /* hack */
            pivotTable($scope.indicador._value,pivotMembers);
    }
   }

  $scope.getGraph = function() {
      
    if (jQuery.isEmptyObject($scope.indicador)) {       
        // todo: testar como POST quando existir ligação ao servico REST
        $scope.indicador = Indicador.save({"id_membros":$scope.dominiosModel.sel.membros},function(res) {
            $scope.indicador = res.toJSON();
            //amp Dimensoes
            _key = jQuery.map($scope.indicador.observacao, function(v, k){ return k;});
            //map Membros
            _value = jQuery.map($scope.indicador.observacao, function(v, k){ return v;});
            $scope.indicador._key = _key;
            $scope.indicador._value = _value;
    
          /* hack */
          var sum = $.pivotUtilities.aggregatorTemplates.sum;
          var numberFormat = $.pivotUtilities.numberFormat;
          var intFormat = numberFormat({digitsAfterDecimal: 0});
          var pivotMembers = {
                          rows: ["tipo_operacao"],
                          cols: ["periodo"],
                            aggregatorName : "Nome do indicador",
                            aggregator: sum(intFormat)(["valor"]),
                            //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                            rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                            renderer: $.pivotUtilities.renderers["Line Chart"]
            };

          /* hack */
          pivotTable($scope.indicador._value,pivotMembers);
        });
    } else {
          /* hack */
          var sum = $.pivotUtilities.aggregatorTemplates.sum;
          var numberFormat = $.pivotUtilities.numberFormat;
          var intFormat = numberFormat({digitsAfterDecimal: 0});
          var pivotMembers = {
                          rows: ["tipo_operacao"],
                          cols: ["periodo"],
                            aggregatorName : "Nome do indicador",
                            aggregator: sum(intFormat)(["valor"]),
                            //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                            rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                            renderer: $.pivotUtilities.renderers["Line Chart"]
            };

          /* hack */
          pivotTable($scope.indicador._value,pivotMembers);        
    }
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
 
 
/* hack... todo: pass key and id insted of dimensao:scope.choice dimensao */
statControllers.directive("checkboxGroup-hack", function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {

                //check model
                if (!scope.$eval(attrs.cbModel))
                  scope.$eval(attrs.cbMode) = [];

                // Determine initial checked boxes
                var a = {"dimensao":scope.choice.dimensao,"membro":scope.$eval(attrs.cbId)}
                //if (scope.$eval(attrs.cbModel).indexOf(scope.$eval(attrs.cbId)) !== -1) {
                if (_.findIndex(scope.$eval(attrs.cbModel), a) !== -1) {
                    elem[0].checked = true;
                }

                // Update array on click
                elem.bind('click', function() {
                    var a = {"dimensao":scope.choice.dimensao,"membro":scope.$eval(attrs.cbId)}
                   //var index = scope.$eval(attrs.cbModel).indexOf(scope.$eval(attrs.cbId));
                   var index = _.findIndex(scope.$eval(attrs.cbModel), a);
                    // Add if checked
                    if (elem[0].checked) {
                        if (index === -1) {
                          var a = {"dimensao":scope.choice.dimensao,"membro":scope.$eval(attrs.cbId)}
                          //scope.$eval(attrs.cbModel).push(scope.$eval(attrs.cbId));
                          scope.$eval(attrs.cbModel).push(a);
                        }
                    }
                    // Remove if unchecked
                    else {
                        if (index !== -1) {
                          
                            scope.$eval(attrs.cbModel).splice(index, 1);
                        }
                    }
                    // Sort and update DOM display
                    scope.$apply(scope.$eval(attrs.cbModel).sort(function(a, b) {
                        return a - b
                    }));
                });
            }
        }
    });
