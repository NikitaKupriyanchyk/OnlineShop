/**
 * Created by user on 06-Sep-19.
 */

public with sharing class EnterInStoreController {

    @AuraEnabled
    public static List<CustomAccount__c> getAccounts() {

        return new List<CustomAccount__c>();
    }

    @AuraEnabled
    public static String checkLogin(String login, String password) {
        List<CustomAccount__c> accounts = [SELECT Id,Login__c,Password__c FROM CustomAccount__c];
        for(CustomAccount__c account: accounts) {
            if(account.Login__c == login && account.Password__c == password) {
                return account.Id;
            }
        }
        return null;
    }
}

/*Для проверки регистрации
 if (password.isNumeric() || password.isAlpha() || login == null || password == null || password.length() < 8) {
            return 'false';
        }
        List<CustomAccount__c> accounts = [SELECT Id,Login__c,Password__c FROM CustomAccount__c];
        for (CustomAccount__c acc : accounts) {
            if (login == acc.Login__c) {
                return 'false';
            }
        }
        return accounts.Id;
*/