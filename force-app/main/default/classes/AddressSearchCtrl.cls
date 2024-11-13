public class AddressSearchCtrl {
    @AuraEnabled
    public static CatalogoDirecciones__c getAddressDetailsbyId(String id){
        system.debug('getAddressDetailsbyId method');
        CatalogoDirecciones__c cd = new CatalogoDirecciones__c();
        if(!string.isBlank(id)){
            cd = [
                Select Id, Name, Calle_Tt__c, NumeroExterior_Tt__c, NumeroInterior_Tt__c, Colonia_Tt__c, DelegacionMunicipio_Tt__c,
                       CodigoPostal_Tt__c, Estado_Tt__c, Country__c, Place_Id__c, Latitude__c, Longitude__c, CuentaID__c,
                       UserRecordAccess.HasReadAccess, UserRecordAccess.HasEditAccess
                  From CatalogoDirecciones__c
                 where Id =: id
            ];
        }
        return cd;
    }
    
    @AuraEnabled
    public static String saveAddressDetailsbyId(CatalogoDirecciones__c addDetails){
        system.debug('saveAddressDetailsbyId method');
        try{
            if((addDetails.Country__c == 'México' || addDetails.Country__c == 'Mexico') && addDetails.CodigoPostal_Tt__c != null){
                List<Direccion__c> ccpp = [
                    Select Id, Colonia__c, DelegacionMunicipio__c, CodigoPostal__c, Estado__c
                      from Direccion__c
                     where CodigoPostal__c =: addDetails.CodigoPostal_Tt__c
                ];
                if(!ccpp.isEmpty()){
                    system.debug('dirección: ' + ccpp[0]);
                    if(string.isBlank(addDetails.Colonia_Tt__c))
                        addDetails.Colonia_Tt__c = ccpp[0].Colonia__c;
                    if(string.isBlank(addDetails.DelegacionMunicipio_Tt__c))
                        addDetails.DelegacionMunicipio_Tt__c = ccpp[0].DelegacionMunicipio__c;
                    if(string.isBlank(addDetails.Estado_Tt__c))
                        addDetails.Estado_Tt__c = ccpp[0].Estado__c;
                }
            }
            upsert addDetails;
            return 'Success|' + addDetails.Id;
        }
        catch (Exception ex){
            return ex.getMessage();
        }
    }
    
    @AuraEnabled
    public static Establishment__c getEstablishmentDetailsbyId(String id){
        system.debug('getEstablishmentDetailsbyId method');
        Establishment__c e = new Establishment__c();
        if(!string.isBlank(id)){
            e = [
                Select Id, Name, Tradename__c, StationId__c, Email__c, PhoneNumber__c, Street__c, ExternalNumber__c,
                       InternalNumber__c, Settlement__c, Population__c, PostalCode__c, State__c, Country__c, Place_Id__c,
                       Affiliate__c, GrouperId__c, Contact__c, Contract__c, Account__c, Bank__c, LegalEntityId__c,
                       location__Latitude__s, location__Longitude__s, UserRecordAccess.HasReadAccess,
                       UserRecordAccess.HasEditAccess
                  From Establishment__c
                 where Id =: id
            ];
        }
        return e;
    }
    
    @AuraEnabled
    public static Map<string, fieldW> getPicklistValues(String id){
        Map<string, fieldW> res = new Map<string, fieldW>();
        
        Map<string, SObjectField> fList = schema.getGlobalDescribe().get('Establishment__c').getDescribe().fields.getMap();
        for(string str: fList.keySet()){
            Schema.DescribeFieldResult des = fList.get(str).getDescribe();
            if(String.valueOf(des.getType()).equalsIgnoreCase('PICKLIST') || String.valueOf(des.getType()).equalsIgnoreCase('MULTIPICKLIST')){
                string api = String.valueOf(des.getName());
                List<comboWP> lcs = new List<comboWP>();
				List<Schema.PicklistEntry> ples = des.getPicklistValues();
				for(Schema.PicklistEntry ple : ples){
                    lcs.add(new comboWP(ple.getValue(), ple.getLabel()));
				}
                
                fieldW fw = new fieldW();
                fw.values = lcs;
                fw.depMap = new Map<String, Map<String, List<comboWP>>>();
                
                if(api == 'StationType__c'){
                    Map<String, Map<String, List<comboWP>>> m = new Map<String, Map<String, List<comboWP>>>();
                    m.put('BusinessLine__c', getDependentMap(new Establishment__c(), api, 'BusinessLine__c'));
                    fw.depMap = m;
                }
                if(api == 'FuelBrand__c'){
                    Map<String, Map<String, List<comboWP>>> m = new Map<String, Map<String, List<comboWP>>>();
                    m.put('FuelType__c', getDependentMap(new Establishment__c(), api, 'FuelType__c'));
                    fw.depMap = m;
                }
                
        		res.put(api, fw);
            }
        }
        
        return res;
    }
    
    @AuraEnabled
    public static String saveEstablishmentDetailsbyId(Establishment__c addDetails){
        system.debug('saveEstablishmentDetailsbyId method');
        try{
            if((addDetails.Country__c == 'México' || addDetails.Country__c == 'Mexico') && addDetails.PostalCode__c != null){
                List<Direccion__c> ccpp = [
                    Select Id, Colonia__c, DelegacionMunicipio__c, CodigoPostal__c, Estado__c
                      from Direccion__c
                     where CodigoPostal__c =: addDetails.PostalCode__c
                ];
                if(!ccpp.isEmpty()){
                    system.debug('dirección: ' + ccpp[0]);
                    if(ccpp.size() == 1)
                        addDetails.Settlement__c = ccpp[0].Colonia__c;
                    //if(string.isBlank(addDetails.Population__c))
                    addDetails.Population__c = ccpp[0].DelegacionMunicipio__c;
                    //if(string.isBlank(addDetails.State__c))
                    addDetails.State__c = ccpp[0].Estado__c;
                }
            }
            upsert addDetails;
            return 'Success|' + addDetails.Id;
        }
        catch (Exception ex){
            return ex.getMessage();
        }
    }
    
    @AuraEnabled
    public static String getAddressSet(String SearchText){
        system.debug('getAddressSet method');
        Negocio__c config = Negocio__c.getInstance();
        String APIKey = config.Google_API_Key__c;
        String result = null;
        system.debug('SearchText is ' + SearchText);
        try{
            if(SearchText != null){
                String APIUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + SearchText.replace(' ', '%20') + '&key=' + APIKey + '&language=es-419';
                system.debug('APIUrl is ' + APIUrl);
                HttpRequest req = new HttpRequest();
                req.setMethod('GET');
                req.setEndpoint(APIURL);
                Http http = new Http();
                HttpResponse res = http.send(req);
                Integer statusCode = res.getStatusCode();
                system.debug('statusCode is ' + statusCode);
                if(statusCode == 200){
                    system.debug('API invoked successfully');
                    result = res.getBody();
                }
            }
        }
        catch(exception e){
            //Handling exception
            system.debug(e.getMessage());
        }
        return result;
    }
    
    @AuraEnabled
    public static String getAddressDetailsByPlaceId(String PlaceID){
        system.debug('getAddressDetailsByPlaceId method');
        Negocio__c config = Negocio__c.getInstance();
        String APIKey = config.Google_API_Key__c;
        String result = null;
        system.debug('SearchText is ' + PlaceID);
        try{
            if(PlaceID != null){
                String APIUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + PlaceId.replace(' ', '%20') + '&key=' + APIKey + '&language=es-419'; 
                system.debug('APIUrl is ' + APIUrl);
                HttpRequest req = new HttpRequest();
                req.setMethod('GET');
                req.setEndpoint(APIURL);
                Http http = new Http();
                HttpResponse res = http.send(req);
                Integer statusCode = res.getStatusCode();
                system.debug('statusCode is ' + statusCode);
                if(statusCode == 200){
                    system.debug('API invoked successfully');
                    result = res.getBody();
                }
            }
        }
        catch(exception e){
            //Handling exception
            system.debug(e.getMessage());
        }
        return result;
    }
    
    public without sharing class fieldW{
        @AuraEnabled public List<comboWP> values {get; set;}
        @AuraEnabled public Map<String, Map<String, List<comboWP>>> depMap {get; set;}
    }    
    
    public without sharing class comboWP{
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String value {get; set;}
        public comboWP(String val, String lab){
            this.label =  lab;
            this.value = val;
        }
    }
    
    public static Map<String, List<comboWP>> getDependentMap(sObject objDetail, string contrfieldApiName, string depfieldApiName){
        String controllingField = contrfieldApiName.toLowerCase();
        String dependentField = depfieldApiName.toLowerCase();
        
        Map<String, List<comboWP>> objResults = new Map<String, List<comboWP>>();
        
        Schema.sObjectType objType = objDetail.getSObjectType();
        if(objType == null){
            return objResults;
        }
        
        Map<String, Schema.SObjectField> objFieldMap = objType.getDescribe().fields.getMap();
        
        if (!objFieldMap.containsKey(controllingField) || !objFieldMap.containsKey(dependentField)){
            return objResults;     
        }
        
        Schema.SObjectField theField = objFieldMap.get(dependentField);
        Schema.SObjectField ctrlField = objFieldMap.get(controllingField);
        
        List<Schema.PicklistEntry> contrEntries = ctrlField.getDescribe().getPicklistValues();
        List<PicklistEntryWrapper> depEntries = wrapPicklistEntries(theField.getDescribe().getPicklistValues());
        List<String> controllingValues = new List<String>();
        
        for(Schema.PicklistEntry ple : contrEntries){
            String value = ple.getValue();
            objResults.put(value, new List<comboWP>());
            controllingValues.add(value);
        }
        
        for(PicklistEntryWrapper plew : depEntries){
            String validForBits = base64ToBits(plew.validFor);
            for(Integer i = 0; i < validForBits.length(); i++){
                String bit = validForBits.mid(i, 1);
                if(bit == '1'){
                    objResults.get(controllingValues.get(i)).add(new comboWP(plew.value, plew.label));
                }
            }
        }

        return objResults;
    }
    
    public static String decimalToBinary(Integer val) {
        String bits = '';
        while(val > 0){
            Integer remainder = Math.mod(val, 2);
            val = Integer.valueOf(Math.floor(val / 2));
            bits = String.valueOf(remainder) + bits;
        }
        return bits;
    }
    
    public static String base64ToBits(String validFor) {
        if (String.isEmpty(validFor)) return '';
        
        String validForBits = '';
        
        for(Integer i = 0; i < validFor.length(); i++){
            String thisChar = validFor.mid(i, 1);
            Integer val = base64Chars.indexOf(thisChar);
            String bits = decimalToBinary(val).leftPad(6, '0');
            validForBits += bits;
        }
        
        return validForBits;
    }
    
    private static final String base64Chars = '' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' +
        '0123456789+/';
    
    private static List<PicklistEntryWrapper> wrapPicklistEntries(List<Schema.PicklistEntry> PLEs) {
        return (List<PicklistEntryWrapper>) JSON.deserialize(JSON.serialize(PLEs), List<PicklistEntryWrapper>.class);
    }
    
    public class PicklistEntryWrapper{
        public String active {get; set;}
        public String defaultValue {get; set;}
        public String label {get; set;}
        public String value {get; set;}
        public String validFor {get; set;}
        public PicklistEntryWrapper(){            
        }
    }
    
    @AuraEnabled
	public static void saveContacts(List<Contact> contacts, Id accountId, Id establishmentId) {	
        if (contacts == null || contacts.isEmpty()) {	
            throw new AuraHandledException('La lista de contactos está vacía.');	
        }
        for (Contact contact : contacts) {
            if (String.isEmpty(contact.FirstName) || String.isEmpty(contact.Email)) {
                throw new AuraHandledException('El nombre y el correo son obligatorios.');
            }
            contact.AccountId = accountId;
        }
        try {
            upsert contacts; // Inserta o actualiza los contactos
        } catch (DmlException e) {
            throw new AuraHandledException('Error al guardar los contactos: ' + e.getMessage());
        }
    }
    
   @AuraEnabled
	public static String checkPostalCode(String postalCode) {
    System.debug('Verificando código postal: ' + postalCode);

    // Rango de códigos postales para IVA fronterizo
    Map<String, List<String>> statePostalRanges = new Map<String, List<String>>{
        'Quintana Roo' => new List<String>{'76999', '77998'},
        'Chiapas' => new List<String>{'29934', '30947'},
        'CAMPECHE' => new List<String>{'24329', '24659'},
        'TABASCO' => new List<String>{'86899', '86978'},
        'Baja California' => new List<String>{'20999', '22910'},
        'Sonora' => new List<String>{'83399', '84638'},
        'Chihuahua' => new List<String>{'31819', '32999'},
        'Coahuila De Zaragoza' => new List<String>{'25000', '29000'},
        'Nuevo Leon' => new List<String>{'65000', '65059'},	
        'Tamaulipas' => new List<String>{'87300', '88995'}
    };

    // Verificar si el código postal está dentro de algún rango para los estados fronterizos
    for (String state : statePostalRanges.keySet()) {
        List<String> range = statePostalRanges.get(state);
        Integer postalCodeInt = Integer.valueOf(postalCode);
        Integer lowerRange = Integer.valueOf(range[0]);
        Integer upperRange = Integer.valueOf(range[1]);

        if (postalCodeInt >= lowerRange && postalCodeInt <= upperRange) {
            System.debug('Código postal ' + postalCode + ' es válido para el estado: ' + state);
            return state; // Retornar el nombre del estado
        }
    }

    // Si el código postal no está en ninguno de los rangos
        return 'invalid';
    }

  




    @AuraEnabled(cacheable=true)
    public static string getMetadataRecords(String productCode, String productName, String family) {
        List<NTTAprobacionesAfiliados__mdt> mtdList = [
            SELECT Id, NTT_ProductName__c, NTT_ProductCode__c, NTT_Familia__c  
            FROM NTTAprobacionesAfiliados__mdt 
            WHERE DeveloperName = 'Mantenimiento_43_A'
        ];
        if (mtdList.isEmpty()) {
            return null;
        }
        NTTAprobacionesAfiliados__mdt metadataRecord = mtdList[0];
        if (metadataRecord.NTT_ProductCode__c == '43-A' && 
            metadataRecord.NTT_ProductName__c == '43-Mantenimiento Fleet Afiliado' &&
            metadataRecord.NTT_Familia__c == 'Mantenimiento Fleet') {
            return metadataRecord.NTT_ProductName__c;
        }
        return null;
    }
}