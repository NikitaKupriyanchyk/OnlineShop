/**
 * Created by user on 07-Sep-19.
 */

({
    doInitHelper: function (component,event) {
        var action = component.get("c.getAccounts");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.CustomAccount",response.getReturnValue());
            }
        })
        $A.enqueueAction(action);
    },

    loginHelper: function (component) {
        var login = component.get("v.CustomAccount.Login__c");
        var password = component.get("v.CustomAccount.Password__c");
        var acoount = component.get("c.checkLogin");
        acoount.setParams({login:login,password:password});
        acoount.setCallback(this, function(response) {
            var status = response.getState();
            acoount = response.getReturnValue();
            component.set("v.CustomAccountId",acoount);
            $A.createComponent("c:OrderConfirm", {'customAccountId': acoount},
                function (newComponent, status, errorMessage) {
                    if (status === "SUCCESS") {
                        var body = component.find("OrderConfirm");
                        body.set("v.body", newComponent);
                    }
                }
            );

        });
        $A.enqueueAction(acoount);
    },



});