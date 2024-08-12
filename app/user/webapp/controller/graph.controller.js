sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    function (Controller, JSONModel,Fragment) {
        "use strict";

        return Controller.extend("app.user.controller.graph", {
            onInit: async function () {
                let nodeData = await this.readOData("Nodes")
                let linesData = await this.readOData("Lines");
                let groupsData = await this.readOData("Groups")

                let graphSchema = {
                    "nodes": nodeData,
                    "lines":linesData,
                    "groups": groupsData
                };
                let graphJSONData = new JSONModel(graphSchema);
                let oVeiw = this.byId("graph");
                console.log("oVeiw", oVeiw);
                oVeiw.setModel(graphJSONData);
                console.log("graphJSONData", oVeiw.getModel().getData());

                console.log("graphSchema received ", graphSchema);
            },

            readOData: async function (entityName) {
                try {
                    let oModel = this.getOwnerComponent().getModel();
                    let oBindList = oModel.bindList(`/${entityName}`);
                    let dataReceived = [];
                    await oBindList.requestContexts(0, Infinity).then(function (aContexts) {
                        aContexts.forEach(oContext => {
                            dataReceived.push(oContext.getObject());
                        });
                        console.log(dataReceived);
                    });
                    return dataReceived;
                    console.log("oModel", oModel);
                } catch (error) {
                    console.log("error", error);
                    throw error;
                }
            },

            onOpenDialog: function (oEvent) {
    let oNode = oEvent.getSource();
    let oView = this.getView();
    let sTitle = oNode.getTitle(); 

   
    if (!this._oDialog) {
        this._oDialog = Fragment.load({
            id: oView.getId(),
            name: "app.user.fragments.refineryDialogFragment",
            controller: this,
        }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.setTitle(sTitle); 
            return oDialog;
        });
    }

    // Open the dialog
    this._oDialog.then(function (oDialog) {
        oDialog.setTitle(sTitle); 
        oDialog.setBindingContext(oNode.getBindingContext());
        oDialog.open();
    });
},

onCloseDialog: function () {
    if (this._oDialog) {
        this._oDialog.then(function (oDialog) {
            oDialog.close();
           
        });
    }
}

              

        });
    });
