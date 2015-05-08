'use strict';

/* Controllers */
var statControllers = angular.module('statControllers',['statServices','ngResource','dndLists']);

statControllers.controller('DomainsController', DomainsController);
statControllers.controller('HeaderController', HeaderController);
statControllers.controller('ConteudoController', ConteudoController);
statControllers.controller('DragDropController', DragDropController);
statControllers.controller('EstatisticasTreeController', EstatisticasTreeController);

DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','NotificationFactory','filterFilter','dominiosModel'];
//DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','NotificationFactory','filterFilter','dominiosModel','Observacao'];
HeaderController.$inject = ['$scope'];
ConteudoController.$inject = ['$scope','$state', '$window','Texto','Dominios','TextoAll'];
DragDropController.$inject = ['$scope'];
EstatisticasTreeController.$inject = ['$scope', '$state', '$window', 'DominioHierarquia','dominiosModel'];

function EstatisticasTreeController($scope, $state, $window, DominioHierarquia,dominiosModel) {
    
    $scope.dominiosModel = dominiosModel;
      
    function calculateEstatisticasLevels(estatisticasTreeItem, parentLevel)	{
		var currentLevel = parentLevel + 1;
		var subdominioItem;
		
		for (var i = 0; i < estatisticasTreeItem.subdominios.length; i++) {
			subdominioItem = estatisticasTreeItem.subdominios[i];
			
			subdominioItem.level = currentLevel;
			
			calculateEstatisticasLevels(subdominioItem, currentLevel);
		}
	}
	
    $scope.selectLink = function(value,action,cols,rows){
 
        if ($scope.dominiosModel.link != value){
          $scope.dominiosModel.reset();
          
          $scope.dominiosModel.link = value;
          $scope.dominiosModel.action = action;
          $scope.dominiosModel.cols = cols;
          $scope.dominiosModel.rows = rows;
        }
    }
    
    $scope.estatisticasTreeInitTree = function () {
		
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

//function DomainsController($scope, $state, $window,Dominios,Dimensoes,Indicador,NotificationFactory,filterFilter,dominiosModel, Observacao){
function DomainsController($scope, $state, $window,Dominios,Dimensoes,Indicador,NotificationFactory,filterFilter,dominiosModel){

/* para apagar ***************************
   $scope.setActive = function(selecao){
	 $scope.active=selecao;
	 console.log(active);
 }; 
   $scope.showPivotTable = function() {
    pivotTable();
  }

*/
    
    $scope.dominios = Dominios.query();
    $scope.dominiosModel = dominiosModel;

    $scope.$watch('dominiosModel.link', function(newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
        if (newValue != {})
            $scope.init();
    });

    function reset() {
        $scope.dominiosModel.reset();
        
        $scope.choice = {};
        $scope.choice.dimensao = {};
        $scope.choice.membros =[];
        $scope.indicador = {};
    };

   function notificationError(title,content){
        var notifSet = new NotificationFactory({position: 'top'});
        notifSet.addNotification({
            title: title,
            content: content,
            color: 'error',
            autoclose : 5000
        });                
    }    
 
    function notificationWarn(title,content){
        var notifSet = new NotificationFactory({position: 'top'});
        notifSet.addNotification({
            title: title,
            content: content,
            color: 'warning',
            autoclose : 5000
         });                
    }
 
    function pivotTable (pivotData,pivotMembers){
      var derivers = $.pivotUtilities.derivers;
      $("#output").pivot(pivotData,pivotMembers)
    };

    function pivotTableUI (pivotData,pivotMembers){
       var derivers = $.pivotUtilities.derivers;
       $("#output").pivotUI(pivotData,pivotMembers)
    };

    function validateData() {
      
      if (!$scope.dominiosModel.sel.membros)
        $scope.dominiosModel.sel.membros = [];
       
       if ($scope.dominiosModel.rows == [] || $scope.dominiosModel.cols == [])
            $scope.dominiosModel.init();
      
    }
  
    function getData(action) {
        if (jQuery.isEmptyObject($scope.indicador)) { 
    
            //VALIDA DATA PARA PIVOTTABLE
			//console.log($scope.dominiosModel);
			//console.log($scope.dominiosModel.sel.membros);
            //$scope.indicador = Observacao.query({"id_membros":$scope.dominiosModel.sel.membros},function(res) {
            $scope.indicador = Indicador.save({"id_membros":$scope.dominiosModel.sel.membros},function(res) { 
			$scope.indicador = res.toJSON();
    
                if (jQuery.isEmptyObject($scope.indicador)) { 
                    notificationWarn("Observações","Sem resultados...");
                    delete $scope.indicador;
                    return;
                }
                
                _value = jQuery.map($scope.indicador.observacao, function(v, k){ return v;});
                
                if (jQuery.isEmptyObject(_value)) { 
                    notificationWarn("Observações","Sem resultados...");
                    delete $scope.indicador;
                    return;
                }
                
                $scope.dominiosModel.dimensoes = [];
                
                var a = [];       
                var b = [];   
                _.each(_value[0],function(value,key,field){
                   if (key != 'valor') {
                        a.push(key);
                        $scope.dominiosModel.dimensoes = a;
                        b = b.concat(_.chain(_value).pluck(key).unique().value());
                   }
                });
    
                $scope.dominiosModel.sel.membros1 = b;
                $scope.dominiosModel.sel.membros2 = b.slice(0);
                $scope.indicador._value = _value;
   console.log($scope.dominiosModel.dimensoes);                     
                /* hack table */
                if (action == 'Tab') {        
                    var sum = $.pivotUtilities.aggregatorTemplates.sum;
                    var numberFormat = $.pivotUtilities.numberFormat;
                    var intFormat = numberFormat({digitsAfterDecimal: 0});
                    var pivotMembers = {
                              rows: $scope.dominiosModel.rows,
                              cols: $scope.dominiosModel.cols,
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
                } else {
                
                    var sum = $.pivotUtilities.aggregatorTemplates.sum;
                    var numberFormat = $.pivotUtilities.numberFormat;
                    var intFormat = numberFormat({digitsAfterDecimal: 0});
                    var pivotMembers = {
                                  rows: $scope.dominiosModel.rows,
                                  cols: $scope.dominiosModel.cols,
                                    aggregatorName : "Nome do indicador",
                                    aggregator: sum(intFormat)(["valor"]),
                                    //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                                    rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                                    renderer: $.pivotUtilities.renderers["Line Chart"]
                    };
                    /* hack */
                    pivotTable($scope.indicador._value,pivotMembers);                
                }
                
            /* error getting indicador */   
            }, function (error) {
                    notificationError("Observações",JSON.stringify(error));
                    delete $scope.indicador;               
            });
        } else {
            if (action == 'Tab') {    
                    var sum = $.pivotUtilities.aggregatorTemplates.sum;
                    var numberFormat = $.pivotUtilities.numberFormat;
                    var intFormat = numberFormat({digitsAfterDecimal: 0});
                    var pivotMembers = {
                              rows: $scope.dominiosModel.rows,
                              cols: $scope.dominiosModel.cols,
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
                } else {
                    var sum = $.pivotUtilities.aggregatorTemplates.sum;
                    var numberFormat = $.pivotUtilities.numberFormat;
                    var intFormat = numberFormat({digitsAfterDecimal: 0});
                    var pivotMembers = {
                                  rows: $scope.dominiosModel.rows,
                                  cols: $scope.dominiosModel.cols,
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
    } /*** End getData() ***/
    
    /******************
     *  init()
     */ 
    $scope.init = function() {
        console.log("init:: Read Dominios")
        
        if ($scope.dominiosModel.link == {})
            return;
        
        $scope.choice = {};
        $scope.choice.dimensao = {};
        $scope.choice.membros =[];
        $scope.indicador = {};
        $scope.dominiosModel.sel = {};
        $scope.dominiosModel.sel.membros = [];
        
		//------------------------------------
		//COMENTÁRIOS DE DEBUG
		//------------------------------------
		// console.log('link:'+$scope.dominiosModel.link);
		// console.log('dominiosModel:');
		// console.log($scope.dominiosModel);
		
		
        // if ($scope.dominiosModel.link){
			// //------------------------------------
			// //Se existir uma variável no localStorage com o identificador "link"+link
			// //por exemplo "link15", ele devolve o conteudo armazenado em localStorage
			// //caso contrário faz a chamada ao WS
			// //sendo que o link é o identificador do dominiosModel
			// //------------------------------------
			// if(localStorage['link'+$scope.dominiosModel.link]){			
				// //console.log('iflinktrue');
				// //console.log(localStorage['link'+$scope.dominiosModel.link]);
				// $scope.dimensoes = localStorage['link'+$scope.dominiosModel.link];
				// getData($scope.dominiosModel.action);
			// }else {
				// //console.log('iflinkfalse');
				// Dimensoes.query({"link":$scope.dominiosModel.link},function(res) {
				// $scope.dimensoes = res.toJSON();
				// localStorage['link'+$scope.dominiosModel.link] = $scope.dimensoes;
				// getData($scope.dominiosModel.action);
			  // });
			// }
		  
		// }
		if ($scope.dominiosModel.link)
          Dimensoes.query({"link":$scope.dominiosModel.link},function(res) {
            $scope.dimensoes = res.toJSON();
            getData($scope.dominiosModel.action);
          });
        
    }
    
    /******************
    * getData()
    */
    $scope.getData = function(action) {    
        validateData();
        getData(action);
    }
    
    /******************
     *  metadata()
     */
    $scope.getMetadata = function (){
       console.log($scope.dominios);
       console.log($scope.dominios.dominio);
       console.log($scope.dominios.dominio);
       
    };

    /*******************
     * showMembros()
     */
    $scope.showMembros = function (){
        if (!$scope.choice.dimensao)
            return;
        var a = filterFilter($scope.dimensoes.dimensao,{id:$scope.choice.dimensao});
        $scope.choice.membros = a[0];
    }
  
  
    /*******************
     * selectLink()
     */
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

/******************* 
    $scope.getTable = function() {

    var m =  _.groupBy($scope.dominiosModel.sel.membros, function(val){ return val.dimensao});
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
            
            /* hack table --
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
                          --
                        //todo: definir filtro com _.where
                        return true;
                      }
            };
   
   
            /* hack --
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
                         -- 
                        //todo: definir filtro com _.where
                        return true;
                      }
            };
   
            /* hack --
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
    
          /* hack --
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

          /* hack --
          pivotTable($scope.indicador._value,pivotMembers);
        });
    } else {
          /* hack --
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

          /* hack --
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

        /* hack --
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
        /* hack --

        pivotTableUI($scope.indicador._value,pivotMembers);
      });
  };
*******/
}



/**************************************************************
 *  Models 
 **************************************************************/

statControllers.factory('dominiosModel',function(){
  var dominiosModel= {};

  dominiosModel.reset = function() {
    dominiosModel.link = {};
    dominiosModel.cols = ["tipo_operacao"];
    dominiosModel.rows = ["periodo"];
    dominiosModel.action = "Tab";

    dominiosModel.sel = {};
    dominiosModel.sel.dimensoes = [];
    dominiosModel.sel.membros = [317000015,317000035];
  };
  
  dominiosModel.init = function() {
    dominiosModel.cols = ["tipo_operacao"];
    dominiosModel.rows = ["periodo"];
    dominiosModel.action = "Tab";

    dominiosModel.sel = {};
    dominiosModel.sel.dimensoes = [];
    dominiosModel.sel.membros = [317000015,317000035];
  };
  
  return dominiosModel;
});

/**************************************************************
 *  Filters 
 **************************************************************/

statControllers.filter('selectedMembers', function() {

    return function(input, arrFilter) {
    
        var output=[];
        var a = [];
        angular.forEach(input,function(v){
            console.log(JSON.stringify(input));
            a = [];
            if (arrFilter.indexOf(v.id) != -1) {
                a.nome = v.nome;
                a.id = v.id;
                output.push(a);
            }  
        });
        return output;
    }
});

/**************************************************************
 *  Directives 
 **************************************************************/
  
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
