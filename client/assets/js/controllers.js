'use strict';

/* Controllers */
var statControllers = angular.module('statControllers',['statServices','ngResource','dndLists']);

statControllers.controller('DomainsController', DomainsController);
statControllers.controller('HeaderController', HeaderController);
statControllers.controller('ConteudoController', ConteudoController);
statControllers.controller('DragDropController', DragDropController);
statControllers.controller('EstatisticasTreeController', EstatisticasTreeController);

DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','NotificationFactory','filterFilter','dominiosModel','DashboardUtilizador'];
//DomainsController.$inject = ['$scope','$state', '$window', 'Dominios','Dimensoes','Indicador','NotificationFactory','filterFilter','dominiosModel','Observacao'];
HeaderController.$inject = ['$scope'];
ConteudoController.$inject = ['$scope','$state', '$window','Texto','Dominios','TextoAll','Generico','Indicador','DashboardUtilizador'];
DragDropController.$inject = ['$scope'];
EstatisticasTreeController.$inject = ['$scope', '$state', '$window', 'DominioHierarquia', 'dominiosModel', 'Dominios', 'Dominio', 'DadosFonte', 'DadosFonteAll','DominioDadosFonte', 'Dimensoes'];

function EstatisticasTreeController($scope, $state, $window, DominioHierarquia,dominiosModel, Dominios, Dominio, DadosFonte, DadosFonteAll, DominioDadosFonte, Dimensoes) {
    
    $scope.dominiosModel = dominiosModel;
      
    $scope.estatisticasTreeEditModeOn = false;
    $scope.estatisticasTreeEditDadosFonteModeOn = false;
    $scope.estatisticasTreeEditDadosFonteVer = false;
    
    function getEstatisticasMaxPosicao(estatisticasTreeItems) {
        var maxPosicao = 1;
        var estatisticasTreeItem;

        /*for (var i = 0; i < estatisticasTreeItems.length; i++) {
            estatisticasTreeItem = estatisticasTreeItems[i];

            if (estatisticasTreeItem.posicao > maxPosicao)
            {
                maxPosicao = estatisticasTreeItem.posicao;
            }
        }*/
        maxPosicao = estatisticasTreeItems.length;

        return maxPosicao;
    }
	
	$scope.getEstatisticasMaxPosicaoDadosFonte = function(estatisticasTreeItems) {
        var maxPosicao = 1;
        var estatisticasTreeItem;

        /*for (var i = 0; i < estatisticasTreeItems.length; i++) {
            estatisticasTreeItem = estatisticasTreeItems[i];

            if (estatisticasTreeItem.posicao > maxPosicao)
            {
                maxPosicao = estatisticasTreeItem.posicao;
            }
        }*/
        maxPosicao = estatisticasTreeItems.dados_fonte.length;

        return maxPosicao;
    }

    function calculateEstatisticasLevels(estatisticasTreeItem, parentLevel)	{
		var currentLevel = parentLevel + 1;
		var subdominioItem;
		var maxPosicao = getEstatisticasMaxPosicao(estatisticasTreeItem.subdominios);
		
		for (var i = 0; i < estatisticasTreeItem.subdominios.length; i++) {
			subdominioItem = estatisticasTreeItem.subdominios[i];
			
			subdominioItem.level = currentLevel;
			subdominioItem.id_pai = estatisticasTreeItem.id;
			subdominioItem.parentItem = estatisticasTreeItem;
			subdominioItem.maxPosicao = maxPosicao;
			
			calculateEstatisticasLevels(subdominioItem, currentLevel);
		}
    }

    function checkEstatisticasTreeDadosFonte(dadosFonteDominio) {
        var dadosFonteAllItem;
        var dadosFonteDominioItem;

        for (var i = 0; i < $scope.EstatisticasTreeDadosFonteAllItems.length; i++) {
            dadosFonteAllItem = $scope.EstatisticasTreeDadosFonteAllItems[i];

            dadosFonteAllItem.checked = false;

            for (var j = 0; j < dadosFonteDominio.length; j++) {
                dadosFonteDominioItem = dadosFonteDominio[j];

                if (dadosFonteAllItem.id == dadosFonteDominioItem.id) {
                    dadosFonteAllItem.checked = true;
                    break;
                }
            }
        }
    }

    $scope.estatisticasTreeStartEdit = function (dominioToEdit) {
        checkEstatisticasTreeDadosFonte(dominioToEdit.dados_fonte);

        $scope.estatisticasTreeDominioToEdit = dominioToEdit;
        $scope.estatisticasTreeEditModeOn = true;
    }
    
    $scope.estatisticasTreeStartVerDadosFonte = function(){
        $scope.estatisticasTreeEditDadosFonteVer = true;
    }
    
    $scope.estatisticasTreeCancelVerDadosFonte = function(){
        $scope.estatisticasTreeEditDadosFonteVer = false;
        
    }
    
    $scope.estatisticasTreeStartEditDadosFonte = function (dadosFonteToEdit, domainToEdit) {
        $scope.domainToSave = domainToEdit;

        $scope.dadosFonteItem = dadosFonteToEdit;
        $scope.estatisticasTreeEditDadosFonteModeOn = true;
    }

    $scope.estatisticasTreeStartEditNew = function () {
        checkEstatisticasTreeDadosFonte(new Array());

        $scope.estatisticasTreeDominioToEdit = { "id": 0, "nome": "", "id_pai": 0 };
        $scope.estatisticasTreeEditModeOn = true;
    }
    

    $scope.estatisticasTreeStartNewDadosFonte = function (domainToSave) {
        $scope.dadosFonteItem = {                       "id": 0,
                                                        "nome": "",
                                                        "link": "",
                                                	    "periodicidade": "",
                                                	    "unidade": "",
                                                	    "descricao": "",
                                                	    "formatacao": {}
                                            };
        $scope.domainToSave= domainToSave;
        $scope.estatisticasTreeEditDadosFonteModeOn = true;
    }

    $scope.estatisticasTreeStartEditNewOnParent = function (parentItem) {
        $scope.estatisticasTreeEditModeOn = true;
        $scope.estatisticasTreeDominioToEdit = { "id": 0, "nome": "", "posicao":1, "id_pai": parentItem.id, "parentItem": parentItem };
    }

    $scope.estatisticasTreeCancelEdit = function () {
        $scope.estatisticasTreeEditModeOn = false;
    }
    
    $scope.estatisticasTreeCancelEditDadosFonte = function () {
        $scope.estatisticasTreeEditDadosFonteModeOn = false;
    }

    $scope.estatisticasTreeOrderDominio = function (dominioToSave, increment) {
        dominioToSave.posicao = dominioToSave.posicao + increment;

        if (dominioToSave.posicao < 1) {
            dominioToSave.posicao = 1;
        }

        Dominio.save({
            "id": dominioToSave.id, "nome": dominioToSave.nome, "id_pai": dominioToSave.id_pai, "posicao": dominioToSave.posicao
        }, function (data) {
            $scope.estatisticasTreeEditModeOn = false;
            $scope.estatisticasTreeInitTree();
        }, function (error) {
            //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
            alert('Erro ' + JSON.stringify(error));
        });
    }
	
	
	$scope.estatisticasTreeOrderDadosFonte = function (dadosFonteToSave,dominioToSave, increment) {
        dadosFonteToSave.posicao = dadosFonteToSave.posicao + increment;

        if (dadosFonteToSave.posicao < 1) {
            dadosFonteToSave.posicao = 1;
        }

        DominioDadosFonte.edit({
            "idDominio": dominioToSave.id, 
            "idFonte": dadosFonteToSave.id
        }, 
        {
            "posicao": dadosFonteToSave.posicao
        }, function (data) {
            $scope.estatisticasTreeInitTree();
        }, function (error) {
            //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
            alert('Erro ' + JSON.stringify(error));
        });
    }
    
    $scope.estatisticasTreeSaveDadosFonte = function (dadoFonteToSave, domainToSave) {

        if (dadoFonteToSave.id == 0) {
            DadosFonteAll.saveNew({
                "nome": dadoFonteToSave.nome,
                "link": dadoFonteToSave.link,
        	    "periodicidade": dadoFonteToSave.periodicidade,
        	    "unidade": dadoFonteToSave.unidade,
        	    "descricao": dadoFonteToSave.descricao
            }, function (data) {
				DominioDadosFonte.save({"idDominio": domainToSave.id, "idFonte":data.id},
                    function (data) {
							$scope.estatisticasTreeEditDadosFonteModeOn = false;
							$scope.estatisticasTreeInitTree();
					}, function (error) {
                        alert('Erro: ' + JSON.stringify(error));
                    });
            }, function (error) {
                alert('Erro: ' + JSON.stringify(error));
            });
        }
        else {
            DadosFonte.save({
                "id": dadoFonteToSave.id, 
                "nome": dadoFonteToSave.nome,
                "link": dadoFonteToSave.link,
        	    "periodicidade": dadoFonteToSave.periodicidade,
        	    "unidade": dadoFonteToSave.unidade,
        	    "descricao": dadoFonteToSave.descricao
            }, function (data) {
                $scope.estatisticasTreeEditDadosFonteModeOn = false;
                $scope.estatisticasTreeInitTree();
            }, function (error) {
                alert('Erro ' + JSON.stringify(error));
            });
        }
    }

    $scope.estatisticasTreeSaveDominio = function (dominioToSave) {
        if (dominioToSave.id == 0) {
            Dominios.saveNew({
                "id": dominioToSave.id, "nome": dominioToSave.nome, "id_pai": dominioToSave.id_pai, "posicao": dominioToSave.posicao
            }, function (data) {
                $scope.estatisticasTreeSaveDominioDadosFonte(dominioToSave);
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro: ' + JSON.stringify(error));
            });
        } else {
            Dominio.save({
                "id": dominioToSave.id, "nome": dominioToSave.nome, "id_pai": dominioToSave.id_pai, "posicao": dominioToSave.posicao
            }, function (data) {
                $scope.estatisticasTreeSaveDominioDadosFonte(dominioToSave);
            }, function (error) {
                //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                alert('Erro ' + JSON.stringify(error));
            });
        }
    }

    $scope.estatisticasTreeSaveDominioDadosFonte = function (dominioToSave) {
        var dadosFonteAllItem;
        var dadosFonteDominioItem;
        var dadosFonteInDominio;

        for (var i = 0; i < $scope.EstatisticasTreeDadosFonteAllItems.length; i++) {
            dadosFonteAllItem = $scope.EstatisticasTreeDadosFonteAllItems[i];

            dadosFonteInDominio = false;

            for (var j = 0; j < dominioToSave.dados_fonte.length; j++) {
                dadosFonteDominioItem = dominioToSave.dados_fonte[j];

                if (dadosFonteAllItem.id == dadosFonteDominioItem.id) {
                    dadosFonteInDominio = true;
                    break;
                }
            }

            if (!dadosFonteAllItem.checked && dadosFonteInDominio)
            {
                DominioDadosFonte.delete({
                    "idDominio": dominioToSave.id, "idFonte": dadosFonteAllItem.id 
                }, function (data) {
                    $scope.estatisticasTreeEditModeOn = false;
                    $scope.estatisticasTreeInitTree();
                }, function (error) {
                    //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                    alert('Erro ' + JSON.stringify(error));
                });
            }

            if (dadosFonteAllItem.checked && !dadosFonteInDominio) {
                DominioDadosFonte.save({
                    "idDominio": dominioToSave.id, "idFonte": dadosFonteAllItem.id
                }, function (data) {
                    $scope.estatisticasTreeEditModeOn = false;
                    $scope.estatisticasTreeInitTree();
                }, function (error) {
                    //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
                    alert('Erro ' + JSON.stringify(error));
                });
            }
        }

    }
    
    $scope.estatisticasTreeDeleteDadosFonte = function (dadosFonteToDelete, domainToDelete) {
        DominioDadosFonte.delete({ "idDominio": domainToDelete.id, "idFonte": dadosFonteToDelete.id }, function (data) {
            $scope.estatisticasTreeInitTree();
        }, function (error) {
            //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
            alert('Erro ' + JSON.stringify(error));
        });
    }	

    $scope.estatisticasTreeDeleteDominio = function (dominioToDelete) {
        Dominio.delete({ "id": dominioToDelete.id }, function (data) {
            $scope.estatisticasTreeEditModeOn = false;
            $scope.estatisticasTreeInitTree();
        }, function (error) {
            //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
            alert('Erro ' + JSON.stringify(error));
        });
    }	
    
    $scope.selectLink = function(obj){
        if ($scope.dominiosModel.link != obj.id){
          $scope.dominiosModel.reset();
          $scope.dominiosModel.link = obj.id;
          if (obj.formatacao.tipo_formato =="Quadro")
            $scope.dominiosModel.action = "Tab";
          else
            $scope.dominiosModel.action = "Gra";
          $scope.dominiosModel.cols = obj.formatacao.colunas;
          $scope.dominiosModel.rows = obj.formatacao.linhas;
          $scope.dominiosModel.sel.membros = obj.formatacao.filtros;
          
        }
    }

    function selectLinkToEdit(obj){
        console.log(obj);
        if ($scope.dominiosModel.link != obj.id){
          $scope.dominiosModel.reset();
          $scope.dominiosModel.link = obj.id;
          if(obj.formatação){
            if (obj.formatacao.tipo_formato =="Quadro")
                $scope.dominiosModel.action = "Tab";
            else
                $scope.dominiosModel.action = "Gra";
            $scope.dominiosModel.cols = obj.formatacao.colunas;
            $scope.dominiosModel.rows = obj.formatacao.linhas;
            $scope.dominiosModel.sel.membros = obj.formatacao.filtros;
          }
        }
        console.log($scope.dominiosModel);
    }
         
    function estatisticasTreeInitAllItems(estatisticasTreeItem) {
        $scope.EstatisticasTreeAllItems[$scope.EstatisticasTreeAllItems.length] = estatisticasTreeItem;
        var subdominioItem;

        for (var i = 0; i < estatisticasTreeItem.subdominios.length; i++) {
            subdominioItem = estatisticasTreeItem.subdominios[i];

            estatisticasTreeInitAllItems(subdominioItem);
        }
    }
    
    $scope.estatisticasTreeInitTree = function () {
		
        $scope.EstatisticasTreeDadosFonteAllItems = {};
		$scope.EstatisticasTreeDimensoes = {};
        
        Dimensoes.query (function (data) {
            $scope.EstatisticasTreeDimensoes = data.dimensao; 
        }, function (error) {
            alert('Erro:' + JSON.stringify(error));
            $scope.EstatisticasTreeDimensoes = {};
        });
		
        DadosFonteAll.query(function (data) {
            $scope.EstatisticasTreeDadosFonteAllItems = data.dados_fonte;
        }, function (error) {
            //definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
            alert('Erro:' + JSON.stringify(error));
            $scope.EstatisticasTreeDadosFonteAllItems = {};
        });

        $scope.EstatisticasTreeItems = {};
        $scope.EstatisticasTreeAllItems = new Array();
		
		DominioHierarquia.query(function (data) {
			$scope.EstatisticasTreeItems = data;
			
			var currentLevel = 1;
			var estatisticasTreeItem;

			$scope.EstatisticasTreeAllItems = new Array();

			var maxPosicao = getEstatisticasMaxPosicao($scope.EstatisticasTreeItems.dominio);

			for (var i = 0; i < $scope.EstatisticasTreeItems.dominio.length; i++) {
				estatisticasTreeItem = $scope.EstatisticasTreeItems.dominio[i];
				
				estatisticasTreeItem.level = currentLevel;
				estatisticasTreeItem.maxPosicao = maxPosicao;
				
				calculateEstatisticasLevels(estatisticasTreeItem, currentLevel);

				estatisticasTreeInitAllItems(estatisticasTreeItem);
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

var graficoSimplificadoShowTooltip = false;
var graficoSimplificadoShowLegend = false;
var graficoSimplificadoShowX = false;
var graficoSimplificadoShowY = false;

function gravarOpcoesGrafSimpl() {
    graficoSimplificadoShowTooltip = document.getElementById("showTooltip").checked;
    graficoSimplificadoShowLegend = document.getElementById("showLegend").checked;
    graficoSimplificadoShowX = document.getElementById("showX").checked;
    graficoSimplificadoShowY = document.getElementById("showY").checked;
}

function ConteudoController($scope, $state, $window, Texto, Dominios, TextoAll, Generico, Indicador, DashboardUtilizador) {

    $scope.graficoSimplificadoShowTooltip = graficoSimplificadoShowTooltip;
    $scope.graficoSimplificadoShowLegend = graficoSimplificadoShowLegend;
    $scope.graficoSimplificadoShowX = graficoSimplificadoShowX;
    $scope.graficoSimplificadoShowY = graficoSimplificadoShowY;

    function getData(cols,rows,members,observacao,obj) {
                /* hack table */
                var sum = $.pivotUtilities.aggregatorTemplates.sum;
                var numberFormat = $.pivotUtilities.numberFormat;
                var intFormat = numberFormat({digitsAfterDecimal: 0});
                var pivotMembers = {
                          rows: rows,
                          cols: cols,
                          vals: ["valor"],
                          aggregator: sum(intFormat)(["valor"]),
                          rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                          renderer:$.pivotUtilities.renderers["Simplified Line Chart C3"],
                          rendererName: "Simplified Line Chart C3",
                          filter : function(filter) {
                            return true;
                          }   
                }

                /* hack */
                $("#" + obj).pivot(observacao,pivotMembers);
    } /*** End getData() ***/

    function conteudo_gerarGrafico(graficoId) {
        //console.log('...................................................................................................................................');
        //console.log(graficoId);
        // $scope.graficosShowLabels é uma variável global que guarda a informação referente a mostrar o gráfico ou mostrar o grafico simplificado
        for(var i = 0; i < $scope.conteudosGraficos.length; i++) {

            if ($scope.conteudosGraficos[i].graficoId === graficoId) {
        //        console.log(graficoId);
                if ($scope.conteudosGraficos[i].ws_data != null && $scope.conteudosGraficos[i].ws_data.formatacao) {
                    if ($scope.conteudosGraficos[i].ws_data.formatacao.linhas != null
                        && $scope.conteudosGraficos[i].ws_data.formatacao.colunas != null
                        && $scope.conteudosGraficos[i].ws_data.formatacao.filtros != null) {

                        getData($scope.conteudosGraficos[i].ws_data.formatacao.linhas,
                            $scope.conteudosGraficos[i].ws_data.formatacao.colunas,
                            $scope.conteudosGraficos[i].ws_data.formatacao.filtros,
							$scope.conteudosGraficos[i].observacao,
                            graficoId);
                    } else {
          //              console.log($scope.conteudosGraficos[i].formatacao);
                    }
                } else {
          //          console.log($scope.conteudosGraficos[i]);
                }

          /*      console.log(graficoId);
                var dados_obs = { id_membros: [] };
                console.log($scope.conteudosGraficos[i].ws_data.formatacao.filtros.length);
                for (var p = 0; p < $scope.conteudosGraficos[i].ws_data.formatacao.filtros.length; p++) {
                    // Preenche a estrutura a enviar ao webservice
                    dados_obs.id_membros.push($scope.conteudosGraficos[i].ws_data.formatacao.filtros[p]);
                }

                var dados = Observacao.save(dados_obs, function(res) {
                    var linhas = [];
                    for(var k = 0;k < dados.observacao.length; k++) {
                        var tipo_operacao = dados.observacao[k].tipo_operacao; // ROW
                        var periodo = dados.observacao[k].periodo; // COL
                        var valor = dados.observacao[k].valor; // VAL
                        var tipo_valor = dados.observacao[k].tipo_valor;
                        var cae = dados.observacao[k].cae;
                        var sector_inst = dados.observacao[k].sector_inst;

                        var temLinha = false;
                        for (var j = 0; j < linhas.length && linhas[j].length > 1; j++) {
                            // SE o agrupamento não for por TIPO_OPERACAO, mudar aqui.
                            if (linhas[j][0] === '' + tipo_operacao) {
                                linhas[j].push(valor);
                                temLinha = true;
                            }
                        }

                        if (!temLinha) {
                            // SE o agrupamento não for por TIPO_OPERACAO, mudar aqui.
                            var linha = ['' + tipo_operacao, valor];
                            linhas.push(linha);
                            temLinha = true;
                        }
                    }
                    //console.log(linhas);
                    var chart1 = c3.generate({
                        bindto: '#' + graficoId,
                        width: 450,
                        legend: {
                            show: $scope.graficosShowLabels
                        },
                        tooltip: {
                            show: $scope.graficosShowTooltip
                        },
                        axis: {
                            x: {
                                show: $scope.graficosShowXaxis
                            },
                            y: {
                                show: $scope.graficosShowYaxis
                            }
                        },
                        data: {
                            columns: linhas
                        }
                    });


                });

                //console.log(dados);



                //if ($scope.onetime) {
                //    var dados = Observacao.query(dados_obs);
                //    console.log('CHAMADA SERVIÇO OBSERVAÇÃO');
                //    console.log(dados);
                //    $scope.onetime = false;
                //    console.log($scope.onetime);
                //}
*/
            } else {
                // Não é este gráfico. Passar para o seguinte
            //    console.log('Not grafic ' + graficoId);
            }

        }
/*
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
*/
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
	
	function loadGraficoIndicadores(data)
	{
		var monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEC"];
		
		var data_criacao = new Date();
		var data_criacao_formatada = '';
		
		if (data.formatacao != null && data.formatacao.data_criacao != null) {
			data_criacao = new Date(Number(data.formatacao.data_criacao.replace("/Date(","").replace("+0000)/","")));
			data_criacao_formatada = data_criacao.getDay() + ' ' +  monthNames[data_criacao.getMonth()] + ' ' + data_criacao.getFullYear();
		}				
		
		Indicador.save({"id_membros":data.formatacao.filtros},function(res) {
			var indicadorRes = res.toJSON();
			
			var indicadorResObs = jQuery.map(indicadorRes.observacao, function(v, k){ return v;});
			
			var k = $scope.conteudosGraficos.length;

			$scope.conteudosGraficos[k] = {
				title: data.nome_dados_fonte,
				order: 1,
				graficoId: 'Graf' + k,
				person: '',
				textDate: data_criacao_formatada,
				ws_data: data,
				observacao: indicadorResObs
			};				
		}, function (error) {
				console.log(error);
		});			
	}

    $scope.getGraficos = function (getGenerico, getDashboardUtilizador) {
        if (!$scope.graficosLoaded) {
            if (localStorage.getItem("BDP_ConteudoGraficosTeste")) {
                conteudoGraficos = JSON.parse(localStorage.getItem("BDP_ConteudoGraficosTeste"));
            }

            $scope.conteudosGraficos = new Array();
			
			if (typeof(getGenerico)=='undefined')
			{
				getGenerico = true;
			}

			if (typeof(getDashboardUtilizador)=='undefined')
			{
				getDashboardUtilizador = true;
			}		
			
			if (getGenerico)
			{			
				$scope.genericoQueryResult = Generico.query(function (data) {
					loadGraficoIndicadores(data);
				}, function (error) {
					//definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
					alert('Erro:' + JSON.stringify(error));
					$scope.textos = {};
				});
			}

			if (getDashboardUtilizador)
			{
				$scope.dashboardQueryResult = DashboardUtilizador.query(function (data) {
					var graficosToLoad = new Array();
					var maxId = -1;
					
					for (var i = 0; i < data.dashboard.length; i++) {
						if (data.dashboard[i].id>maxId)
						{
							maxId = data.dashboard[i].id;
						}
						
						graficosToLoad[data.dashboard[i].id] = data.dashboard[i];
					}
					
					var graficosCount = 0;
					
					for (var i = maxId; i >= 0; i--) {
						if (typeof(graficosToLoad[i])!='undefined')
						{
							loadGraficoIndicadores(graficosToLoad[i]);
							graficosCount++;
							if (graficosCount==2)
							{
								break;
							}
						}
					}					
				}, function (error) {
					//definir uma funcao geral para devolver o erro (Notification )com chamada a callback;
					alert('Erro:' + JSON.stringify(error));
					$scope.textos = {};
				});	
			}			
			
            $scope.graficosLoaded = true;
        }
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
				$scope.conteudoTextoEditOn = false;

				$scope.textosLoaded = false;
				$scope.getTextos();
            }, function (error) {
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
            }, function (error) {
                alert('Erro ' + JSON.stringify(error));
                $scope.textos = {};
            });
        }
    }

    $scope.deleteConteudoTexto = function (conteudoTexto) {
        Texto.delete({ "id": conteudoTexto.id }, function (data) {
            $scope.textosLoaded = false;
            $scope.getTextos();
            }, function (error) {
                alert('Erro ' + JSON.stringify(error));
                $scope.textos = {};
            });
    }

    $scope.ordenarConteudoTexto = function (conteudoTexto,ordem) {
		if(ordem>0){
			if(conteudoTexto.posicao!=1)conteudoTexto.posicao--;
		}
		else if(ordem<0){
			conteudoTexto.posicao++;
		}
		
		return $scope.saveConteudoTexto(conteudoTexto);
    }
	
	$scope.ordenarConteudoGrafico = function (conteudoGrafico,ordem) {
		if(ordem>0){
			if(conteudoGrafico.order!=1)conteudoGrafico.order--;
		}
		else if(ordem<0){
			conteudoGrafico.order++;
		}
		
		return $scope.saveConteudoGrafico(conteudoGrafico);
    }

    $scope.saveConteudoGrafico = function (conteudoGrafico) {
		console.log(conteudoGrafico)
        var conteudoToSave = $scope.conteudosGraficos[conteudoGrafico.index];
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
	
    $scope.getDataPublicacao2 = function(data) {
        var date = new Date(parseInt(data.substr(6)));

        var d = date,
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
function DomainsController($scope, $state, $window,Dominios,Dimensoes,Indicador,NotificationFactory,filterFilter,dominiosModel,DashboardUtilizador){
    
    $scope.dominios = Dominios.query();
    $scope.dominiosModel = dominiosModel;

    $scope.$watch('dominiosModel.link', function(newValue, oldValue) {
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
      $("#output").html("");
      $("#output").pivot(pivotData,pivotMembers,true);
    };

    function pivotTableUI (pivotData,pivotMembers){
       var derivers = $.pivotUtilities.derivers;

       $("#output").pivotUI(pivotData,pivotMembers,true);
    };

    function pivotGraphUI (pivotData,pivotMembers){
       var derivers = $.pivotUtilities.derivers;

       $("#output").pivotUI(pivotData,pivotMembers,true);
    };
    
    function validateData() {
      
      if (!$scope.dominiosModel.sel.membros)
        $scope.dominiosModel.sel.membros = [];
       
       if ($scope.dominiosModel.rows == [] || $scope.dominiosModel.cols == [])
            $scope.dominiosModel.init();
      
    }
  
    function draw(action){
        if (action=="Tab")
            drawTable();
        if (action=="Gra")
            drawGraph();    
     }
    
    function drawTable() {
        var sum = $.pivotUtilities.aggregatorTemplates.sum;
        var numberFormat = $.pivotUtilities.numberFormat;
        var intFormat = numberFormat({digitsAfterDecimal: 0});
        var pivotMembers = {
                  rows: $scope.dominiosModel.rows,
                  cols: $scope.dominiosModel.cols,
                  vals: ["valor"],
                  aggregatorName : "Sum",
                  //google chart
                  //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                  //renderer: $.pivotUtilities.renderers["Line Chart"],
                  //c3 chart
                  rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                  renderer: $.pivotUtilities.renderers["Line Chart C3"],
                  rendererName: "Table",
                  filter : function(filter) {
                      return true;
                      if ($scope.dominiosModel.sel.membros.indexOf(filter['tipo_operacao']) != -1  ||
                          $scope.dominiosModel.sel.membros.indexOf(filter['periodo']) != -1  ||
                          $scope.dominiosModel.sel.membros.indexOf(filter['tipo_valor']) != -1  ||
                          $scope.dominiosModel.sel.membros.indexOf(filter['cae']) != -1  ||
                          $scope.dominiosModel.sel.membros.indexOf(filter['sector_int']) != -1 )  
                         return true;
                      else  
                         return false;
                  },
                  onRefresh: function(config) {
                    var config_copy = JSON.parse(JSON.stringify(config));
                    $scope.dominiosModel.cols = config_copy.cols;
                    $scope.dominiosModel.rows = config_copy.rows;
                  }
        };
    
        /* hack */
        pivotTableUI($scope.indicador._value,pivotMembers);  

    }

    function drawGraph() {
        var sum = $.pivotUtilities.aggregatorTemplates.sum;
        var numberFormat = $.pivotUtilities.numberFormat;
        var intFormat = numberFormat({digitsAfterDecimal: 0});
        var pivotMembers = {
                  rows: $scope.dominiosModel.rows,
                  cols: $scope.dominiosModel.cols,
                  vals: ["valor"],
                  aggregatorName : "Sum",
                  //google chart
                  //rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers),
                  //renderer: $.pivotUtilities.renderers["Line Chart"],
                  //rendererName: "Line Chart",
                  //c3 chart
                  rendereres:$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers),
                  renderer:$.pivotUtilities.renderers["Line Chart C3"],
                  rendererName: "Line Chart C3",
                  filter : function(filter) {
                    return true;
                  },
                  onRefresh: function(config) {
                    var config_copy = JSON.parse(JSON.stringify(config));
                    $scope.dominiosModel.cols = config_copy.cols;
                    $scope.dominiosModel.rows = config_copy.rows;
                  }
        };
    
        /* hack */
       pivotGraphUI($scope.indicador._value,pivotMembers);       
    }
    
    function getData(action) {

            //LEITURA DE OBSERVACOES EM LOCALSTORAGE
            //------------------------------------
            //Se existir uma variável no localStorage com o identificador "link"+link+"obs"
            //por exemplo "link15obs", ele devolve o conteudo armazenado em localStorage
            //caso contrário faz a chamada ao WS
            //sendo que o link é o identificador do dominiosModel
            //------------------------------------
        if(localStorage['link'+$scope.dominiosModel.link+'obs']){         
                var obj = localStorage['link'+$scope.dominiosModel.link+'obs'];
                obj=JSON.parse(obj);

                $scope.indicador = obj;
        }


        if (jQuery.isEmptyObject($scope.indicador)) { 

                Indicador.save({"id_membros":$scope.dominiosModel.sel.membros},function(res) {

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

                //Se o cliente efectuar 5 pedidos é dado início ao armazenamento de dados em LocalStorage
                if(!localStorage['countRequests'])localStorage['countRequests']=0;
                if(localStorage['countRequests']<6){
                    $scope.indicador.timestamp = new Date().getTime().toString();
                    try {                    
                        localStorage['link'+$scope.dominiosModel.link+'obs'] = JSON.stringify($scope.indicador);
                        localStorage['countRequests']++;
                    }catch (e) {
                        cleanLocalStorage();   
                        localStorage['link'+$scope.dominiosModel.link+'obs'] = JSON.stringify($scope.indicador);
                        localStorage['countRequests']=1;
                    }
                }else {
                    deleteOldestEntry(localStorage);
                    $scope.indicador.timestamp = new Date().getTime().toString();
                    try {                    
                        localStorage['link'+$scope.dominiosModel.link+'obs'] = JSON.stringify($scope.indicador);
                        localStorage['countRequests']++;
                    }catch (e) {
                        cleanLocalStorage();   
                        localStorage['link'+$scope.dominiosModel.link+'obs'] = JSON.stringify($scope.indicador);
                        localStorage['countRequests']=1;
                    }
                }
                /* hack table */
                draw(action);
                }, function (error) {
                        notificationError("Observações",JSON.stringify(error));
                        delete $scope.indicador;               
                });

        } else {
            draw(action);
        }
    } /*** End getData() ***/
    
    function cleanLocalStorage (){
        //var oldest = null;
        for (var key in localStorage){
           if (key.match(/link.*obs/)) {
               localStorage.removeItem(key);
           }
        }
    }


    function deleteOldestEntry (array){
        //var oldest = null;
        var oldestKey = null;
        var oldestDate = new Date().getTime();
        var arrayObj
        for (var key in array){
           console.log(key)
           if(key.match(/link.*obs/)){
                arrayObj = JSON.parse(array[key])
                console.log(true);
                console.log(arrayObj);
                console.log(arrayObj.timestamp);
                console.log(oldestDate);
                if(parseInt(arrayObj.timestamp)<oldestDate){
                    oldestDate=arrayObj.timestamp
                    //oldest=array[key];
                    oldestKey=key;
                }
           }else console.log(false);
        }
        console.log(oldestKey);
        localStorage.removeItem(oldestKey);
    }

    /******************
     *  init()
     */ 
    $scope.init = function() {
        if ($scope.dominiosModel.link == {})
            return;
        
        $scope.choice = {};
        $scope.choice.dimensao = {};
        $scope.choice.membros =[];
        $scope.indicador = {};
		

		
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
    $scope.selectLink = function(obj){
        if ($scope.dominiosModel.link != obj.id){
          reset();
          $scope.dominiosModel.link = obj.id;
          $scope.dominiosModel.action = obj.tipo_formato;
          $scope.dominiosModel.cols = obj.colunas;
          $scope.dominiosModel.rows = obj.linhas;
          $scope.dominiosModel.membros = obj.filtros;
        
          Dimensoes.query({"link":$scope.dominiosModel.link},function(res) {
            $scope.dimensoes = res.toJSON();
          });
        }
    }
    /*******************
    * switchTo()
    */
    $scope.switchTo = function(action){
        $("select.pvtRenderer").val(action);
        $("select.pvtRenderer").change();
    }
    
    $scope.getNewData= function(action) {
        delete $scope.indicador;
        getData(action);
    }
	
    /*******************
    * saveGraficoToDashoard()
    */
    $scope.saveGraficoToDashoard = function(){
		var tipoDeFormato = '';
	
		if ($scope.dominiosModel.action =="Tab")
		{
			tipoDeFormato = "Quadro";
		}
		else
		{
			tipoDeFormato = "Grafico";	
		}
		
		DashboardUtilizador.save({
			"id_dados_fonte":$scope.dominiosModel.link,
			"formatacao":{
				"tipo_formato": tipoDeFormato,
				"linhas":$scope.dominiosModel.rows,
				"colunas":$scope.dominiosModel.cols,
				"filtros":$scope.dominiosModel.sel.membros
			}
		}, function (data) {
			alert('Gravado para o dashboard');
		}, function (error) {
			alert('Erro ' + JSON.stringify(error));
		});		

    }	
	
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
    dominiosModel.sel.membros = [200801,200802,200803];
  };
  
  dominiosModel.init = function() {
    dominiosModel.cols = ["tipo_operacao"];
    dominiosModel.rows = ["periodo"];
    dominiosModel.action = "Tab";

    dominiosModel.sel = {};
    dominiosModel.sel.dimensoes = [];
    dominiosModel.sel.membros = [200801,200802,200803];
  };
  
  return dominiosModel;
});

/**************************************************************
 *  Filters 
 **************************************************************/


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

// SPINKIT DIRECTIVE
/*statControllers.directive('stateLoadingIndicator', function($rootScope) {
  return {
    restrict: 'E',
    template: "<div ng-show='isStateLoading' class='loading-indicator'>" +
    "<div class='loading-indicator-body'>" +
    "<h3 class='loading-title'>Loading...</h3>" +
    "<div class='spinner'><chasing-dots-spinner></chasing-dots-spinner></div>" +
    "</div>" +
    "</div>",
    replace: true,
    link: function(scope, elem, attrs) {
      scope.isStateLoading = false;
 
      $rootScope.$on('$stateChangeStart', function() {
        scope.isStateLoading = true;
      });
      $rootScope.$on('$stateChangeSuccess', function() {
        scope.isStateLoading = false;
      });
    }
  };
});*/

angular.module('application').controller('bpBusy',function($scope,$http){

	$scope.delay = 0;
	$scope.minDuration = 0;
	$scope.message = 'Please Wait...';
	$scope.backdrop = true;
	$scope.promise = null;

	$scope.demo = function(){

		$scope.promise = $http.get('http://httpbin.org/delay/3');

	};

});
 