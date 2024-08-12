
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("app.user.controller.configartion", {
        onInit: function () {
            var oModel = new JSONModel({
                groupNameVisible: false,
                Groups: [],
                comboBoxData1: {
                    items: [
                        { key: "", text: "Group Icon", enabled: "false" },
                        { key: "sap-icon://factory", text: "Factory Icon", icon: "sap-icon://factory" },
                        { key: "sap-icon://shipping-status", text: "Shipping Icon", icon: "sap-icon://shipping-status" },

                    ],
                    selectedKey: null
                },



                comboBoxData2: {
                    items: [
                        { key: "", text: "Node Icon", enabled: "false" },
                        { key: "sap-icon://blur", text: "Blur Icon", icon: "sap-icon://blur" },
                        { key: "sap-icon://co", text: "Co Icon", icon: "sap-icon://co" },
                        { key: "sap-icon://sys-add", text: "Sys-Add Icon", icon: "sap-icon://sys-add" },
                        { key: "sap-icon://sys-minus", text: "Sys-Minus Icon", icon: "sap-icon://sys-minus" },
                        { key: "sap-icon://checklist", text: "Checklist Icon", icon: "sap-icon://checklist" },
                        { key: "sap-icon://bubble-chart", text: "Bubble-Chart Icon", icon: "sap-icon://bubble-chart" },
                        { key: "sap-icon://back-to-top", text: "Back-To-Top Icon", icon: "sap-icon://back-to-top" },
                        { key: "sap-icon://competitor", text: "Competitor Icon", icon: "sap-icon://competitor" },
                        { key: "sap-icon://accept", text: "Accept Icon", icon: "sap-icon://accept" },
                        { key: "sap-icon://pipeline-analysis", text: "Pipeline-Analysis Icon", icon: "sap-icon://pipeline-analysis" },
                        { key: "sap-icon://restart", text: "Restart Icon", icon: "sap-icon://restart" },
                        { key: "sap-icon://basket", text: "Basket Icon", icon: "sap-icon://basket" },
                        { key: "sap-icon://crossed-line-chart", text: "Crossed-Line-Chart Icon", icon: "sap-icon://crossed-line-chart" },
                        { key: "sap-icon://flag", text: "Flag Icon", icon: "sap-icon://flag" },




                    ],
                    selectedKey: null
                }
            });
            this.getView().setModel(oModel, "myModel");


            var oDataModel = new ODataModel("/path/to/your/odata/service/");
            this.getView().setModel(oDataModel, "mainService");
        },

        //Buttons Functions

        //Groups Button
        onPressGroups: function () {

            var oView = this.getView();
            var oGroupsVBox = oView.byId("groupsVBox");
            var oGroupsVBox1 = oView.byId("grouppannel");

            oGroupsVBox.setVisible(!oGroupsVBox.getVisible());
            oGroupsVBox1.setVisible(!oGroupsVBox1.getVisible());

            oView.byId("nodesVBox").setVisible(false);
            oView.byId("connectionsVBox").setVisible(false);
            oView.byId("nodesPanel").setVisible(false);
            oView.byId("connectionsPanel").setVisible(false);

        },

        //Nodes Button 
        onPressNodes: function () {
            var oView = this.getView();
            var oNodesVBox = oView.byId("nodesVBox");
            var oNodesVBox1 = oView.byId("nodesPanel");

            oNodesVBox.setVisible(!oNodesVBox.getVisible());
            oNodesVBox1.setVisible(!oNodesVBox1.getVisible());


            oView.byId("groupsVBox").setVisible(false);
            oView.byId("connectionsVBox").setVisible(false);
            oView.byId("grouppannel").setVisible(false);
            oView.byId("connectionsPanel").setVisible(false);
        },

        //Connections Button
        onPressConnections: function () {

            var oView = this.getView();
            var oConnectionsVBox = oView.byId("connectionsVBox");
            var oConnectionsVBox1 = oView.byId("connectionsPanel");

            oConnectionsVBox.setVisible(!oConnectionsVBox.getVisible());
            oConnectionsVBox1.setVisible(!oConnectionsVBox1.getVisible());


            oView.byId("groupsVBox").setVisible(false);
            oView.byId("nodesVBox").setVisible(false);
            oView.byId("grouppannel").setVisible(false);
            oView.byId("nodesPanel").setVisible(false);
        },

        //Group Save Button
        onPressGroupSave: function () {
            var oModel = this.getOwnerComponent().getModel();

            if (!oModel) {
                console.error("OData Model is undefined or null.");
                return;
            }

            var groupTitle = this.byId("groupNameInput").getValue();
            var groupKey = this.byId("groupKeyInput").getValue();
            var groupIcon = this.byId("groupIconInput").getSelectedKey();
            var groupStatus = this.byId("groupStatusInput").getValue();

            if (groupTitle === '') {
                MessageToast.show('Fields cannot be blank');
                return;
            }

            var oComboBox = this.getView().byId("groupIconInput");
            var sSelectedKey = oComboBox.getSelectedKey();

            if (sSelectedKey === "") {
                MessageToast.show("Please select a valid icon.");

                return;
            } 
          
            var oBindList = oModel.bindList("/Groups");

            oBindList.create({
                groupkey: groupKey,
                groupTitle: groupTitle,
                groupIcon: groupIcon,
                groupStatus: groupStatus
            });

            oModel.refresh();

            this.byId("groupNameInput").setValue("");
            this.byId("groupKeyInput").setValue("");
            this.byId("groupIconInput").setSelectedKey("");
            this.byId("groupStatusInput").setValue("");

            console.log("Saved group");
            MessageToast.show("Connections saved.");

            var oDialog = this.byId("groupsDialog");
            if (oDialog) {
                oDialog.close();
            }
        },

        //Group Clear Button
        onPressGroupDelete: function () {
            this.byId("groupNameInput").setValue("");
            this.byId("groupKeyInput").setValue("");
            this.byId("groupIconInput").setSelectedKey("");
            this.byId("groupStatusInput").setValue("");
        },



        onRadioSelect: function (oEvent) {
            var sSelectedIndex = oEvent.getParameter("selectedIndex");
            var oModel = this.getView().getModel("myModel");

            let myData = [];
            if (sSelectedIndex === 0) {
                // If "Yes" is selected, fetch the groups data and set it to the model
                let oDataModel = this.getView().getModel();
                oModel.setProperty("/groupNameVisible", true);
                let oBindList = oDataModel.bindList("/Groups");
                oBindList.requestContexts(0, Infinity).then(aContexts => {
                    aContexts.forEach(x => {
                        myData.push(x.getObject());
                    })
                })
                console.log("myData :", myData);
            } else {
                // If "No" is selected, hide the group selection
                oModel.setProperty("/groupNameVisible", false);
            }
        },


        onGroupSelect: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var sGroupName = oSelectedItem.getTitle();
            this.byId("groupnameInput1").setValue(sGroupName);
        },




        onNodeDialogSave: function () {
            var oModel = this.getOwnerComponent().getModel();

            if (!oModel) {
                console.error("OData Model is undefined or null.");
                return;
            }

            var groupname = this.byId("groupComboBox").getSelectedKey();
            var nodename = this.byId("nodeNameInput").getValue();
            var shape = this.byId("shapeSelect").getSelectedKey();
            var icon = this.byId("iconInput").getSelectedKey();
            var status = this.byId("statusInput").getValue();

            // console.log("groupname:", groupname);
            // console.log("nodename:", nodename);
            // console.log("shape:", shape);
            // console.log("icon:", icon);
            // console.log("status:", status);

            if (!nodename) {
                MessageToast.show('Node name cannot be blank.');
                return;
            }
            var oComboBox = this.getView().byId("iconInput");
            var sSelectedKey = oComboBox.getSelectedKey();

            if (sSelectedKey === "") {
                MessageToast.show("Please select a valid icon.");

                return;
            } 
            var oBindList = oModel.bindList("/Nodes");

            // Create entry in the model
            oBindList.create({
                nodeGroup: groupname,
                nodeTitle: nodename,
                nodeShape: shape,
                nodeIcon: icon,
                nodeStatus: status
            });

            oModel.refresh();

            // Clear the input fields
            this.byId("groupComboBox").setSelectedKey("");
            this.byId("nodeNameInput").setValue("");
            this.byId("shapeSelect").setSelectedKey("");
            this.byId("iconInput").setSelectedKey("");
            this.byId("statusInput").setValue("");

            MessageToast.show("Connections saved.");
            console.log("Attempt to save node");

            var oDialog = this.byId("nodesDialog");
            if (oDialog) {
                oDialog.close();
            }
        },
        onNodeDialogDelete: function () {
            this.byId("groupComboBox").setSelectedKey("");
            this.byId("nodeNameInput").setValue("");
            this.byId("shapeSelect").setSelectedKey("");
            this.byId("iconInput").setSelectedKey("");
            this.byId("statusInput").setValue("");


        },

        onDialogOk: function () {
            var oModel = this.getOwnerComponent().getModel();

            if (!oModel) {
                console.error("OData Model is undefined or null.");
                return;
            }

            var from = this.byId("_IDGenComboBox1").getSelectedKey();
            var to = this.byId("_IDGenComboBox2").getSelectedKey();

            if (!from || !to) {
                MessageToast.show('Both "From" and "To" fields must be selected.');
                return;
            }

            if (from === to) {
                MessageToast.show('"From" and "To" fields cannot be the same.');
                return;
            }


            var oBindList = oModel.bindList("/Lines");
            oBindList.create({
                lineFrom: from,
                lineTo: to
            });

            oModel.refresh();


            this.byId("_IDGenComboBox1").setSelectedKey("");
            this.byId("_IDGenComboBox2").setSelectedKey("");

            MessageToast.show("Connections saved.");
            console.log("Saved");

            var oDialog = this.byId("connectionsDialog");
            if (oDialog) {
                oDialog.close();
            }
        },

        onDialogDelete: function () {
            this.byId("_IDGenComboBox1").setSelectedKey("");
            this.byId("_IDGenComboBox2").setSelectedKey("");
        },


    });
});
