sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                //alert("Teste Anderson");
                let produto = {};
                let productModel = new JSONModel(produto); //Model = objeto para exibir os dados na tela
                let view = this.getView(); 
                view.setModel(productModel, "ModeloProduto"); //Modelo é reconhecido na tela

            },
            
            onPressBuscar: function() {
                let input;
                input = this.byId("inpBusca");
                let value = input.getValue();
                //alert(value);

                //Consulta da API
                let parameters = {
                    url: "https://world.openfoodfacts.org/api/v2/product/" + value,
                    //CRUD - Create, Read, Update, Delete - Inserção, Leitura, Alteração, Exclusão
                    method: "GET",
                    async: true,
                    crossDomain: true
                };

                //break-point >> Ferramentas do Desenvolvedor (F12) > aba Sources > adicionar ponto azul na web > F10 linha por linha
                //debugger
                //ajax = Buscar do servidor
                //promise = quando uma função retorna como parâmetro de exportação outra função
                $.ajax(parameters).done(function(response){
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    //clear = limpar a tela
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this) ) //bind = associar a função ao contexto principal - torna a função global para acesso externo de outras funções
                .fail(function(){ //exception - tratamento de exceção
                    //debugger
                }); 
                
                



                /*let material = 'Água Mineral';
                let peso = 500;
                let uom = 'ml';
                let qtdsodio = 15.66;
                let conteudoliquido = true;

                //array = lista
                let composicao = ["bicarbonato","magnesio","sulfato","brometo"];
                //objeto = estrutura e seus atributos
                let produto = {
                    descricao : "Chá Verde",
                    marca : "Quaker",
                    peso : 130,
                    uom : "g"

                    
                */
                };
            },

            onClickImage: function(oEvent){
                var urlObject = library.URLHelper;
                urlObject.redirect(oEvent.getSource().getSrc(),true);

            }
        });
    });
