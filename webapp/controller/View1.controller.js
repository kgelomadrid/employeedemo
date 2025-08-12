sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("employeede.controller.View1", {
        onInit() {
        },
        onSelectEmployee: function (oEvent){
            var oList = oEvent.getSource();
            //Get selected Item
            var oSelItem = oList.getSelectedItem();
            var sSelItemPath = oSelItem.getBindingContextPath();

            //Bind to input
            this.getView().byId("formEmployee").bindElement({
                path: sSelItemPath
            })
        },
        onPressUpdate: function(oEvent){
            var oView = this.getView();
            //Get selected Item
            var oList = oView.byId("listEmployee");
            var oSelItem = oList.getSelectedItem();
            var sSelItemPath = oSelItem.getBindingContextPath();

            //Get the input values (to update)
            var sNewFirstName = oView.byId("inFirstName").getValue();
            var sNewLastName = oView.byId("inLastName").getValue();
            var oData = {
                FirstName: sNewFirstName,
                LastName: sNewLastName
            }

            //Trigger HTTP MERGE operation
            var oModel = this.getOwnerComponent().getModel();
            oModel.update(sSelItemPath, oData,{
                success: function (data) {
                },
                error: function (data){
                } 
            });
        },
        onPressRead: function(oEvent){
            var oModel = this.getOwnerComponent().getModel();
            var sReadUri = oModel.createKey("/Employees",
                {
                    EmployeeID: 223994
                }
            );

            //Trigger HTTP GET operation
            oModel.read(sReadUri,{
                success: function (data) {

                },
                error: function (data){

                }
            })
        },
        onPressQuery: function(oEvent){
            var oView = this.getView();
            //Get the input values (to search)
            var sSearch = oView.byId("inSearch").getValue();

            //Create filter
            var aFilter = [];

            if (sSearch) {
                // First Name only.
                // if (sSearch) {
                //     aFilter.push(new Filter({
                //         path: "FirstName",
                //         operator: FilterOperator.EQ,
                //         value1: sSearch,

                //     }));
                // }

                // Search in FirstName OR LastName
                aFilter.push(
                    new Filter({
                        filters: [
                            new Filter({
                                path: "FirstName",
                                operator: FilterOperator.Contains,
                                value1: sSearch
                            }),
                            new Filter({
                                path: "LastName",
                                operator: FilterOperator.Contains,
                                value1: sSearch
                            })
                        ],
                        and: false  //OR
                    })
                );
            }

            //Trigger HTTP GET operation (with Filter)
            var oModel = this.getOwnerComponent().getModel();
            var sFilterEntity = "/Employees"
            oModel.read(sFilterEntity,{
                filters: aFilter,
                success: function (data) {

                },
                error: function (data){

                }
            })
        },
        onPressCreate: function(oEvent){
            var oModel = this.getOwnerComponent().getModel();
            var oView = this.getView();
            //Get input values
            var sNewFirstName = oView.byId("inFirstName").getValue();
            var sNewLastName = oView.byId("inLastName").getValue();
            var oData = {
                FirstName: sNewFirstName,
                LastName: sNewLastName
            }
            //Trigger HTTP POST operation
            oModel.create("/Employees", oData,{
                success: function (data) {
                },
                error: function (data){
                }
            });
        },
        onPressDelete: function(){
            var oView = this.getView();

            //Get selected item (to be deleted)
            var oList = oView.byId("listEmployee");
            var oSelItem = oList.getSelectedItem();
            var sSelItemPath = oSelItem.getBindingContextPath();

            //Trigger HTTP DELETE operation
            var oModel = this.getOwnerComponent().getModel();
            oModel.remove(sSelItemPath,{
                success: function (data) {
                },
                error: function (data){
                }
            })
        }
    });
});