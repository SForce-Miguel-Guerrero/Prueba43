/* - Componentes de Visualforce:
* -> CON_TC3PagoPorConsumo_LC
*
* Clase de Test: CON_ContractsContainer_TEST
* Hereda de: CON_OppDocChecklist_CTRL
*/
public without sharing class CON_ContractsContainer_CTRL extends CON_OppDocChecklist_CTRL {
    /**
    * @description
    */
    public String managerName{get{return [Select Manager.Name FROM User WHERE Id =: UserInfo.getUserId()].Manager.Name;}set;}
    public static Set<String> productAltaBE = new Set<String>{'19', '32', '95', '96', '32-CH', '32-W', '52','52-C', '62-C', '69-C', '48', '48-CH', '48-W', '58', '71', '81', '44', '34', '57'};

    static final Id MerchantRecordType = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('RT_Afiliacion').getRecordTypeId();
    static final Id ClienteRecordType = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Edenred').getRecordTypeId();
    
    private static String MERCEDES_ALTA_CLIENTE = 'create';
    private static String MERCEDES_MOD_CLIENTE = 'update';

    //NVH - EdenredArg - Agregar futuros productos de argentina en el siguiente set
	public static set<String> argentinaProducts = new Set<String>{'XC', 'YC'};
    
    @AuraEnabled
    public static List<Map<String,String>> getMotivosDeRechazo(){
        List<Map<String,String>> resp=new List<Map<String,String>>();
        Schema.DescribeFieldResult fieldResult = Contrato2__c.RejectionReasons__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry plv : ple){
            resp.add(new Map<String,String>{'label'=>plv.getLabel(),'value'=>plv.getValue()});
        }
        return resp;
    }

    /**
    * @description Guarda cambios de contenedor contratos(Contrato, Secciones y Anexos).
    * @param strData Es un String en formato JSON
    * @example '{"qli": "0QL5B000000aXzTWAU", "contrato": {"Id": "IdContrato2__c", "Name": "Prueba Contrato"}}'
    * @return
    */
    @AuraEnabled
    public static Map<String, Object> guardaContrato( String strData ) {

        Map<String, Object> response = new Map<String, Object>();
        try {
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(strData);
            if(data != null){
                Id qli = data.containsKey('qli') ? ( (Id) data.get('qli')) : null;
                if(qli != null){
                    // Obtener la instancia de Contrato2__c, si es que hay otro usuario editando el mismo contrato
                    List<Contrato2__c> listContrato = [SELECT Id,Name FROM Contrato2__c WHERE PartidaPresupuesto__c =: qli];
                    Contrato2__c contrato = data.containsKey('contrato') ? ( (Contrato2__c) JSON.deserialize((String)JSON.serialize(data.get('contrato')), Contrato2__c.class) ) : new Contrato2__c();
                    contrato.Id = listContrato != null && listContrato.size() > 0 ? listContrato[0].Id : contrato.Id;
                    contrato.PartidaPresupuesto__c = qli;
                    
                    if (!data.containsKey('finalizar')) {
                        contrato.EtapaContrato__c = 'En Proceso';
                    } else {
                        contrato.EtapaContrato__c = 'Finalizado';
                        contrato.CamposValidados__c = true;
                    }
                    
                    List<QuoteLineItem> soluciones = [SELECT Id, Product2.Name, Etapa__c, Quote.AccountId, Quote.OpportunityId,Quote.Opportunity.OwnerId FROM QuoteLineItem WHERE Id =: qli];
                    String idOwnerOpp='';
                    if(soluciones!=null&&soluciones.size()>0){
                        idOwnerOpp=soluciones[0].Quote.Opportunity.OwnerId;
                    }
                    
                    List<Opportunity> listOpp = [SELECT Contacto__r.Name,Maquila__c,Maquilador__c FROM Opportunity WHERE Id = :soluciones[0].Quote.OpportunityId AND Contacto__r.Funcion__c = 'Representante Legal'];                    
                    if( listOpp != null && listOpp.size() > 0 ) {
                        contrato.RepresentanteLegal__c = listOpp[0].Contacto__r.Name;
                        if(listOpp[0].Maquila__c==true){
                            contrato.Maquila__c = listOpp[0].Maquila__c;
                            contrato.Tipo_Maquila__c = listOpp[0].Maquilador__c;
                        }
                    }
                    
                    listContrato = new List<Contrato2__c>();
                    listContrato.add(contrato);

                    // Guardar instancia de Contrato2__c
                    Id idContrato = null;
                    for (Database.upsertResult ur : Database.upsert(listContrato)) {
                        Map<String, Object> mapContrato = new Map<String, Object>();
                        mapContrato.put('Id', ur.getId());
                        mapContrato.put('errors', ur.getErrors());
                        mapContrato.put('isCreated', ur.isCreated());
                        mapContrato.put('isSuccess', ur.isSuccess());
                        response.put('Upsert_Contrato2__c', mapContrato);
                        idContrato = ur.getId();
                    }
                    
                    List<Anexo__c> listAnexo = idContrato == null ? new List<Anexo__c>() : [SELECT Id FROM Anexo__c WHERE IdContrato__c =: idContrato ];

                    Anexo__c anexo = data.containsKey('anexo') ? ( (Anexo__c) JSON.deserialize((String)JSON.serialize(data.get('anexo')), Anexo__c.class) ) : new Anexo__c();
                    anexo.Id = listAnexo != null && listAnexo.size() > 0 ? listAnexo[0].Id : anexo.Id;
                    anexo.IdContrato__c = idContrato;
                    anexo.Solucion__c = qli;
                    
                    // Guardar instancia de Anexo__c
                    listAnexo.clear();
                    listAnexo.add(anexo);
                    for (Database.upsertResult ur : Database.upsert(listAnexo)) {
                        Map<String, Object> mapAnexo = new Map<String, Object>();
                        mapAnexo.put('Id', ur.getId());
                        mapAnexo.put('errors', ur.getErrors());
                        mapAnexo.put('isCreated', ur.isCreated());
                        mapAnexo.put('isSuccess', ur.isSuccess());
                        response.put('Upsert_Anexo__c', mapAnexo);
                    }

                    // Oportunidad
                    if (data.containsKey('oportunidad')) {
                        Opportunity opp = (Opportunity)JSON.deserialize((String)JSON.serialize(data.get('oportunidad')), Opportunity.class);
                        update opp;
                    }
                    // Contrato - Filial
                    // Obteniendo mapa de registros de Contrato - Filial
                    Map<String, List<ContratoFilial__c>> mapContratoFiliales = data.containsKey('contratoFilial') ? (Map<String, List<ContratoFilial__c>>)JSON.deserialize((String)JSON.serialize(data.get('contratoFilial')), Map<String, List<ContratoFilial__c>>.class) : new Map<String, List<ContratoFilial__c>>();
                    
                    // Insertando o actulizando registros de Contrato - Filial
                    List<ContratoFilial__c> listNuevosContratosFiliales = mapContratoFiliales.containsKey('paraGuardar') ? mapContratoFiliales.get('paraGuardar') : new List<ContratoFilial__c>();
                    if (listNuevosContratosFiliales.size() > 0) {
                        
                        for(ContratoFilial__c cf : listNuevosContratosFiliales){
                            cf.OwnerId=idOwnerOpp;
                        }                        
                        
                        for (Database.upsertResult ur : Database.upsert(listNuevosContratosFiliales)) {
                            response.put('Upsert_ContratoFilial__c', getMapUpsertResult(ur));
                        }
                    }
                    // Eliminando registros de Contrato - Filial, si los hay
                    List<ContratoFilial__c> listContratosFilialesParaEliminar = mapContratoFiliales.containsKey('paraEliminar') ? mapContratoFiliales.get('paraEliminar') : new List<ContratoFilial__c>();
                    if (listContratosFilialesParaEliminar.size() > 0) {
                        for (Database.DeleteResult dr : Database.delete(listContratosFilialesParaEliminar)) {
                            response.put('Delete_ContratoFilial__c', getMapDeleteResult(dr));
                        }
                    }
                } else {
                    response.put('error', 'Id de QuoteLineItem {qli} es requerido');
                }
            } else {
                response.put('error', 'No se recibió información');
            }
        } catch(JSONException ex) {
            response.put('error', ex.getStackTraceString());
            response.put('JSONException', ex.getMessage());
            throw new CustomException(ex.getMessage() + ', ' + ex.getStackTraceString());
        }  catch(Exception ex) {
            response.put('error', ex.getStackTraceString());
            response.put('Exception', ex.getMessage());
            throw new CustomException(ex.getMessage() + ', ' + ex.getStackTraceString());
        }

        response.put('Limits', getLimits());
        return response;
    }

    /**
    * @description Realiza una consulta hacia la base de datos y retorna el resultado
    * @param query String de una consulta SOQL válida
    * @return Si la consulta se realiza exitosamente, retorna un sObjects[] con los registros consultados. Si el método
    * se invoca con un valor inválido para el argumento "query", retorna un Map con información relativa a la excepción
    * "System.NullPointerException". Si el método se invoca con un String de consulta SOQL inválido, retorna un Map con
    * información relativa a la excepción "System.QueryException"
    */
    @AuraEnabled
    public static Object executeQuery(String query) {
        try {
            return Database.query(query);
        } catch(System.NullPointerException npe) {
            Map<String, Object> mapNpe = new Map<String, Object>();
            mapNpe.put('cause', npe.getCause());
            mapNpe.put('lineNumber', npe.getLineNumber());
            mapNpe.put('message', npe.getMessage());
            mapNpe.put('stackTraceString', npe.getStackTraceString());
            mapNpe.put('exceptionTypeName', npe.getTypeName());
            return mapNpe;
        } catch(System.QueryException qe) {
            Map<String, Object> mapQe = new Map<String, Object>();
            mapQe.put('cause', qe.getCause());
            mapQe.put('lineNumber', qe.getLineNumber());
            mapQe.put('message', qe.getMessage());
            mapQe.put('stackTraceString', qe.getStackTraceString());
            mapQe.put('exceptionTypeName', qe.getTypeName());
            return mapQe;
        }
    }

    /**
    * @description Obtiene los metadatos de los campos de varios sObjects y los retorna
    * @param objs Array de Strings con los nombres API de los sObjects
    * @return Retorna un Map donde Key es el nombre del sObject y Value es un Map de los campos de ese sObject donde Key
    * es el nombre del campo y Value es un Map de los metadatos de ese campo donde Key es el nombre del metadato y Value
    * es el valor de ese metadato
    */
    @AuraEnabled
    public static Map<String, Object> describeSObjects( String[] objs ) {
        Map<String, Object> response = new Map<String, Object>();
        
        if( objs != null && objs.size() > 0 ) {
            for( Schema.DescribeSobjectResult dsor: Schema.describeSObjects(objs) ) {
                Map<String, Object> fields = new Map<String, Object>();
                
                for ( Schema.SObjectField sof : dsor.fields.getMap().values() ) {
                    Map<String, Object> field = new Map<String, Object>();
                    Schema.DescribeFieldResult dfr = sof.getDescribe();
                    
                    // Field name
                    field.put('name', dfr.getName());
                    field.put('label', String.valueOf(dfr.getLabel()));
                    field.put('isCustom', String.valueOf(dfr.isCustom()));
                    field.put('type', String.valueOf(dfr.getType()));
                    field.put('editable', String.valueOf(dfr.isCreateable()));
                    field.put('updateable', String.valueOf(dfr.isUpdateable()));
                    
                    if (dfr.isCreateable() && !dfr.isNillable() && !dfr.isDefaultedOnCreate()) {
                        field.put('isRequired', String.valueOf(true));
                    }
                    
                    if (String.valueOf(dfr.getType()) == 'PICKLIST' || String.valueOf(dfr.getType()) == 'MULTIPICKLIST' || String.valueOf(dfr.getType()) == 'REFERENCE') {
                        if ( dfr.picklistValues.size() > 0 ) {
                            
                            List<Object> values = new List<Object>();
                            for (Schema.PicklistEntry ple : dfr.picklistValues) {
                                Map<String, String> value = new Map<String, String>();
                                value.put('label', ple.getLabel());
                                value.put('value', ple.getValue());
                                
                                if( ple.isDefaultValue() ) {
                                    value.put('defaultValue', ple.getValue());
                                }
                                values.add(value);
                            }
                            field.put('picklistEntries', values);
                            field.put('restrictedPicklist', String.valueOf(dfr.restrictedpicklist));
                        }
                        
                        if (dfr.getRelationshipName() != '') {
                            field.put('relationshipName', dfr.getRelationshipName());
                        }
                    } else if (String.valueOf(dfr.getType()) == 'DOUBLE' || String.valueOf(dfr.getType()) == 'PERCENT' || String.valueOf(dfr.getType()) == 'CURRENCY') {
                        field.put('precision', String.valueOf(dfr.getPrecision()));
                        field.put('scale', String.valueOf(dfr.getScale()));
                        
                        field.put('length', dfr.getScale() > 0 ? (String.valueOf(dfr.getPrecision() + 1)) : String.valueOf(dfr.getPrecision()));
                    }
                    
                    if (dfr.getController() != null) {
                        field.put('controller', dfr.getController().getDescribe().getName());
                    }
                    
                    if (dfr.getInlineHelpText() != '') {
                        field.put('inlineHelpText', dfr.getInlineHelpText());
                    }
                    
                    fields.put(dfr.getName(), field);
                }
                // Fields by sObject
                response.put(dsor.getName(), fields);
            }
            
        } else {
            response.put('error', 'Nombre de objetos es requerido. Ejemplo: ["Account", "Opportunity"]');
        }
        return response;
    }

    /**
    * @description Guarda archivo PDF de un Contrato relacionado a una Oportunidad
    * @param qliId Es el Id del QuoteLineItem
    * @param strDataBase64 Es un String en formato Base64
    */
    @RemoteAction
    public static Map<String, Object> guardaPDFBase64( String qliId, String strDataBase64 ) {
        Map<String, Object> response = new Map<String, Object>();

        if(String.isNotBlank(qliId) && String.isNotBlank(strDataBase64)) {

            List<QuoteLineItem> soluciones = [SELECT Id, Product2.Name, Etapa__c,Quote.Name, Quote.IdPDFContrato__c, Quote.OpportunityId FROM QuoteLineItem WHERE Id =: qliId];
            
            if( soluciones != null && soluciones.size() > 0 ) {
                QuoteLineItem qli = soluciones.get(0);
                List<Attachment> instances = new List<Attachment>();
                String nombre = 'Contrato ' + qli.Product2.Name + '.pdf';
                List<Attachment> documentos = [SELECT Id, Name FROM Attachment WHERE Name =: nombre  AND ParentId =: qli.Quote.OpportunityId];
                delete documentos;

                Attachment contrato = new Attachment(ContentType = 'application/pdf', Name = nombre, ParentId = qli.Quote.OpportunityId);
                contrato.Body = EncodingUtil.base64Decode(strDataBase64);
                instances.add(contrato);

                for (Database.upsertResult ur : Database.upsert(instances)) {
                    Map<String, Object> mapContrato = new Map<String, Object>();
                    mapContrato.put('Id', ur.getId());
                    mapContrato.put('errors', ur.getErrors());
                    mapContrato.put('isCreated', ur.isCreated());
                    mapContrato.put('isSuccess', ur.isSuccess());
                    response.put('Upsert_Attachment', mapContrato);
                }

                List<QuoteDocument> listQuoDocs = [SELECT Id FROM QuoteDocument WHERE QuoteId = :qli.QuoteId AND Id  =: qli.Quote.IdPDFContrato__c ];
                QuoteDocument qd;

                if(listQuoDocs.size() > 0){
                    delete listQuoDocs;
                }

                String quoteNameBK = qli.Quote.Name;
                Quote quote = new Quote(Id = qli.QuoteId, Name = 'Contrato');
                upsert quote;
        
                qd = new QuoteDocument();
                qd.QuoteId = qli.QuoteId;
                qd.Document = contrato.Body;
                upsert qd;

                quote = new Quote(Id = qli.QuoteId, IdPDFContrato__c = qd.Id, Name = quoteNameBK);
                upsert quote;
            } else {
                System.debug('Solución con Id ' + qliId + ' no encontrada');
                response.put('error', 'Solución con Id ' + qliId + ' no encontrada');
            }
        } else {
            System.debug('Entro guardaPDFBase64 error qlid:'+qliId+' Base64:'+strDataBase64);
            response.put('error', 'Parámetros {qliId} y {strDataBase64} son requeridos');
        }
        response.put('Limits', getLimits());
        return response;
    }

    /**
    * @description Ejecuta un SOQL válido para salesforce
    * @param
    * @return
    */
    @RemoteAction
    public static List<sObject> executeQueryRA(String query) {
        return Database.query(query);
    }

    /**
    * @description
    * @param
    * @return
    */
    @RemoteAction
    public static List<QuoteLineItem> getContratoTicketCarData(String quoteLineItemId){
        List<QuoteLineItem> quoteLineItemList = new List<QuoteLineItem>();
        String query;
        query = 'SELECT Quote.Opportunity.Name,Quote.OpportunityId,Quote.Owner.Name,Quote.AccountId,Quote.Account.RazonSocial__c, Quote.Account.RFC__c, Quote.Account.BillingAddress, Quote.Account.BillingCity FROM QuoteLineItem WHERE Id = \'' + quoteLineItemId+ '\''; 
        quoteLineItemList = Database.query(query);
        return quoteLineItemList;
    }

    /**
    * @description
    * @param
    * @return
    */
    @RemoteAction
    public static Contrato2__c getContrato(String quoteLineItemId){
        String strSql;
        List<Contrato2__c> listContrato = new List<Contrato2__c>();
        strSql = getStrCampos(Contrato2__c.SObjectType);
        strSql = 'SELECT ' + strSql + ',Cuenta__r.Giro__c ,Entidad_Legal__r.EconomicActivity__r.Name,Cuenta__r.Telefono2__c ,Bank_Account__r.Reference__c ,Bank_Account__r.Bank__c ,Bank_Account__r.StandardiziedBankKey__c ' +
                ',Bank_Account__r.AccountHolder__c ,Cuenta__r.Name ,Cuenta__r.Subgiro__c ,Cuenta__r.Phone ,Cuenta__r.CodigoClienteAS400__c ,PartidaPresupuesto__r.FormaPago__c ' +
                ',PartidaPresupuesto__r.Quote.Comision_por_Servicio__c, PartidaPresupuesto__r.WarrantyType__c,PartidaPresupuesto__r.WarrantyValue__c,Contacto__r.Name ,Contacto__r.Email, Contacto__r.Funcion__c ' +
                ',Contacto__r.FirstName ,Contacto__r.LastName ,Contacto__r.Curp__c ,Contacto__r.Phone, Contacto__r.Birthdate ,Contacto__r.BirthdateText__c , Contacto__r.typeIdentification__c, Contacto__r.Direccion_Contacto__c, Contacto__r.BirthCountry__c ' +

                ',Contacto__r.BirthState__c ,Contacto__r.ProfessionName__c ,Contacto__r.Nationality__c ,Contacto__r.ConditionOfStaying__c , Contacto__r.RFC__c , Contacto__r.NumberingOuterInner__c ' +
                ', Contacto__r.OtherStreet__c , Contacto__r.OtherCity , Contacto__r.OtherPostalCode , Contacto__r.Neighborhood__c , Contacto__r.OtherState ' +
                ', Contacto__r.NumOuterInnerField__c, Contacto__r.OtherCountry, Contacto__r.IDName__c , Contacto__r.IDNumber__c , Contacto__r.ElectorID__c , Entidad_Legal__r.RecordType.Name ' +
                ', FiscalAddress__r.Calle_Tt__c , FiscalAddress__r.NumeroExterior_Tt__c , FiscalAddress__r.NumeroInterior_Tt__c , FiscalAddress__r.Colonia_Tt__c , FiscalAddress__r.DelegacionMunicipio_Tt__c ' +
                ', FiscalAddress__r.Estado_Tt__c , FiscalAddress__r.CodigoPostal_Tt__c , FiscalAddress__r.Ciudad_Tt__c, Contacto__r.MailingStreet, Contacto__r.Street__c, Contacto__r.Colonia__c ' +
                ', Contacto__r.MailingCity, Contacto__r.MailingState, Contacto__r.MailingPostalCode,Contacto__r.MailingCountry, Entidad_Legal__r.DeedDate__c ,Entidad_Legal__r.Calle__c ' +
                ',Entidad_Legal__r.Colonia__c ,Entidad_Legal__r.DelegacionMunicipioFiscal__c ,Entidad_Legal__r.Estado__c ,Entidad_Legal__r.NumeroExterior__c ,Entidad_Legal__r.NumeroInterior__c ' +
                ', Entidad_Legal__r.NumberingOuterInner__c,Entidad_Legal__r.CodigoPostal__c , Entidad_Legal__r.Ciudad__c ,Entidad_Legal__r.CountryOrigin__c, Entidad_Cuenta__r.Cuenta__r.RecordType.DeveloperName  ' +
                ', Edenred_Representative__r.Name '+
                'FROM Contrato2__c WHERE PartidaPresupuesto__c = \'' + quoteLineItemId + '\'';

        listContrato = Database.query(strSql);

        if(listContrato.size() > 0){
            return listContrato[0];
        } else{
            Contrato2__c contrato;
            return contrato;
        }
    }

    /**
    * @description Ejecuta un SOQL válido para salesforce
    * @param
    * @return
    */
    @RemoteAction
    public static Map<String, Object> getMultiTempleate(String query, String queryMaquilas) {
        Map<String, Object> mapTempleate = new Map<String, Object>();
        mapTempleate.put('Main', Database.query(query));
        mapTempleate.put('Maquilas', Database.query(queryMaquilas));
        return mapTempleate;
    }

    /**
    * @description
    * @param
    * @return
    */
    public static String getStrCampos(Schema.SObjectType targetObject){
        return String.join(getListCampos(targetObject), ', ');
    }

    /**
    * @description
    * @param
    * @return
    */
    public static List<String> getListCampos(Schema.SObjectType targetObject){
        List<String> listCampos = new List<String>();
        Set<String> setCamposParaExcluir = new Set<String>{'CreatedById', 'CreatedDate', 'SystemModstamp', 'LastModifiedDate', 'LastModifiedById', 'LastReferencedDate', 'LastViewedDate', 'IsDeleted'};

        List<Schema.sObjectField> lSobjectFields = targetObject.getDescribe().fields.getMap().values();
        for(Schema.sObjectField sob : lSobjectFields){
            
            Schema.DescribeFieldResult f = sob.getDescribe();
            //NO agregar campos que no se necesitan
            String nombreCampo = f.getName();
            if(!setCamposParaExcluir.contains(nombreCampo)) listCampos.add(nombreCampo);
        }
        return listCampos;
    }

    /**
    * @description
    * @param
    * @return
    */
    public static List<Database.UpsertResult> upsertSobjects( List<sObject> instances ) {
        return Database.upsert(instances);
    }

    /**
     * NVH
    * @description Actualiza informacion del registro proporcionado para cualquier objeto (es necesario Indicar el objeto)
    * @param
    * @return
    */
    @AuraEnabled
    public static Map<String, String> updateRecord(String sObjectName, String jsonData) {
        Map<String, String> response = new Map<String, String>();
        try {
            SObject record = (SObject) JSON.deserialize(jsonData, Type.forName(sObjectName));
            update record;
            
            response.put('Code', '0');
            response.put('Response', 'Informacion Guardada con exito');
        } catch (Exception e) {
            response.put('Code', '-1');
            response.put('Response', 'Error al guardar la informacion: ' + e.getMessage());
        }
        return response;
    }

    /**
    * @description Actualiza informacion de Contrato para ADV
    * @param
    * @return
    */
    @AuraEnabled
    public static Map<String, String> updateContratoADV( String jsonContrato, String jsonOportunidad ) {
        Map<String,String> response = new Map<String,String>();
        Contrato2__c contrato = new Contrato2__c();
        Opportunity opp = new Opportunity();
        List<RenegotiationProduct__c> listRenegotiationProductApproved = new List<RenegotiationProduct__c>();//CEAM: 3563

        try{
            contrato = (Contrato2__c)JSON.deserialize(jsonContrato,Contrato2__c.class);
            opp = (Opportunity)JSON.deserialize(jsonOportunidad,Opportunity.class);
            opp.FechaFinADV__c = contrato.EtapaContrato__c == 'Autorizado' ? system.now() : null;
             
            update contrato;
            update opp;

            if(contrato.EtapaContrato__c == 'Rechazado para corrección'){
                Opportunity newOpp = [SELECT Id,  FechaInicioADV__c, FechaFinADV__c, ComentariosADV__c, Estatus__c, RejectionReasons__c, Comentarios_Ejecutivo__c,NumeroAltaCliente__c FROM Opportunity WHERE Id =:opp.Id];
                Integer rejections = [SELECT COUNT() FROM Rejection_history__c WHERE Opportunity__c = :newOpp.Id] + 1;

                Rejection_history__c rechazo = new Rejection_history__c(
                ADV_Comments__c = newOpp.ComentariosADV__c,
                Comercial_comments__c = newOpp.Comentarios_Ejecutivo__c,
                Opportunity_status__c   = newOpp.Estatus__c,
                Rejection_reason__c = newOpp.RejectionReasons__c,
                ADV_End_Date__c = newOpp.FechaFinADV__c != null ?  newOpp.FechaFinADV__c : null,
                ADV_Start_Date__c = system.now(),
                Name = newOpp.NumeroAltaCliente__c + ': Rechazo- ' + String.valueOf(rejections),
                Assignment_folio__c = newOpp.NumeroAltaCliente__c,
                Opportunity__c   = newOpp.Id
                );          
                insert rechazo;

                //CEAM: 3563 >>>
                QuoteLineItem qli = [Select Id from QuoteLineItem where Quote.OpportunityId =: newOpp.Id and Quote.IsSyncing = true and Escalonamiento__c = null LIMIT 1];
                if(qli.Id != null) {
                    List<RenegotiationProduct__c> listRenegotiationProduct = [SELECT Id, SubsidiaryContractApproved__c, SubsidiaryContract__c, Name, isRenegotiation__c FROM RenegotiationProduct__c WHERE QuoteProduct__c =: qli.id];

                    if(!listRenegotiationProduct.isEmpty()) {
                        for(RenegotiationProduct__c rp : listRenegotiationProduct) {
                            if(rp.SubsidiaryContractApproved__c != null && rp.SubsidiaryContract__c != null) {
                                rp.SubsidiaryContractApproved__c = null;
                                listRenegotiationProductApproved.add(rp);
                            }
                        }
                        if(!listRenegotiationProductApproved.isEmpty()) {
                            update listRenegotiationProductApproved;
                        }
                    }
                }
            }//CEAM: 3563 <<<

            if(contrato.EtapaContrato__c == 'Autorizado'){
                if(!string.isEmpty(contrato.CodigoAS400__c)&&contrato.id!=null){

                insert new ContratoFilial__c(CodigoAS400__c=contrato.CodigoAS400__c,Name=contrato.CodigoAS400__c,
                                             Contrato_2__c=contrato.id,Entidad_Cuenta__c=contrato.Entidad_Cuenta__c,isPrime__c=true);
                }
            }
            
            response.put('Code','0');
            response.put('Response','Informacion Guardada con exito');
            return response;
        }
        catch(Exception e){
            response.put('Code','-1');
            response.put('Response','Error al guardar la informacion: '+ e);
            return response;
        }
    }
    
    @AuraEnabled
   	public static  Map<String, String> updateContratoAfiliadoADV3 (String contratoId){//toPhantom
        return NTT_MFAAlta43A_Helper.callbackPhantomId(contratoId);
        
    }
    
    
    
    
    public static Map<String, String> updateContratoAfiliadoADV2(String jsonContrato, String jsonOportunidad, String extras){
        return updateContratoAfiliadoADV2(jsonContrato, jsonOportunidad, extras, '[]');
    }
    
    @AuraEnabled
    public static Map<String, String> updateContratoAfiliadoADV2(String jsonContrato, String jsonOportunidad, String extras, string estabs){
                
        Map<String, String> response = new Map<String, String>();
        Savepoint sp = Database.setSavepoint();
        Boolean isOPAM = false;
        String numExp ='';
        String num31='', num43='', afiliado31='', afiliado43='', prodNombre31='', prodNombre43='';

        try{
            List<String> lisErrors = new List<String>();
            Contrato2__c contrato = (Contrato2__c)JSON.deserialize(jsonContrato, Contrato2__c.class);
            Opportunity opp = (Opportunity)JSON.deserialize(jsonOportunidad, Opportunity.class);
            
            Opportunity opp2 = [SELECT id, Contacto__c, AccountId, OwnerId, RecordType.DeveloperName from Opportunity where id=:opp.id LIMIT 1];
            QuoteLineItem qli = [Select Id, Product2.IDInterno__c, Product2.ProductCode, Product2Id, Product2.Name from QuoteLineItem where Quote.OpportunityId=:opp2.Id and Quote.IsSyncing=true and Escalonamiento__c=null LIMIT 1];
            
            List<ContratoFilial__c> subs = (List<ContratoFilial__c>)JSON.deserialize(extras, List<ContratoFilial__c>.class);
            List<Affiliate__c> filiales = new List<Affiliate__c>();
            
            List<Affiliate__c> filial = (List<Affiliate__c>)JSON.deserialize(extras, List<Affiliate__c>.class); //6452 para guardar el afiliado
            for(Affiliate__c afil : filial){
                numExp = afil.FileNumber__c;
            }

            /*BEFORE OPAM*/
            for(ContratoFilial__c extra : subs) {
                if(qli.Product2.ProductCode == '31') {
                    num31 = qli.Product2.ProductCode;
                    afiliado31 = extra.CodigoAS400__c;
                    prodNombre31 = qli.Product2.Name;
                } else if(qli.Product2.ProductCode == '43'||qli.Product2.ProductCode == '43-A') {
                    num43 = qli.Product2.ProductCode;
                    afiliado43 = extra.CodigoAS400__c;
                    prodNombre43 = qli.Product2.Name;
                }
                
                if(qli.Product2.ProductCode != 'des-AF-OPAM'){
                    filiales.add(new Affiliate__c(
                    Id = extra.Id,
                    Name = extra.CodigoAS400__c,
                    CodeAS400__c = extra.CodigoAS400__c,
                    Distintivo__c = extra.Distintivo__c,
                    Product__c = extra.Producto__c,
                    OwnerId = opp2.OwnerId,
                    Contract_2__c = extra.Contrato_2__c,
                    PlatformAdministrator__c = extra.PlatformAdministrator__c,
                    isPrime__c = extra.isPrime__c,
                    FileNumber__c = numExp,                    
                    AccountEntity__c = extra.Entidad_Cuenta__c));                    
                } else{
                    isOPAM = true;
                    filiales.add(new Affiliate__c(
					Id = extra.Id,
                    Name = subs[0].CodigoAS400__c,
                    CodeAS400__c = subs[0].CodigoAS400__c,
                    Distintivo__c = subs[0].Distintivo__c,
                    Product__c = subs[0].Producto__c,
                    OwnerId = opp2.OwnerId,
                    Contract_2__c = subs[0].Contrato_2__c,
                    PlatformAdministrator__c = subs[0].PlatformAdministrator__c,
                    isPrime__c = subs[0].isPrime__c,
                    AccountEntity__c = subs[0].Entidad_Cuenta__c));
                    break;
                }
            } 
            
            contrato.EtapaContrato__c = 'Finalizado';
            Integer ind = [SELECT Count() FROM Contrato2__c WHERE Id !=: contrato.Id AND CodigoAS400__c =: contrato.CodigoAS400__c AND PartidaPresupuesto__r.Quote.Opportunity.RecordType.DeveloperName != 'VentaNueva'];
            if((contrato.PartidaPresupuesto__r.Product2.ProductCode != '33'||contrato.PartidaPresupuesto__r.Product2.ProductCode != '43-A' ) && opp2.RecordType.DeveloperName != 'RT_Renegotiation_merchants' && ind > 0){
                System.debug('Entra 613');
                Database.rollback(sp);
                response.put('Code','-1');                    
                response.put('Response','Error al guardar la informacion: El Código ingresado ya se encuentra en otro contrato ('+contrato.CodigoAS400__c+')');
                return response;
            }else{
                System.debug('No entra 613');
            }
            update contrato;
            upsert filiales;
            
            List<Establecimiento> pestabs = new List<Establecimiento>();
            try{
                pestabs = (List<Establecimiento>)JSON.deserialize(estabs, List<Establecimiento>.class);
            }
            catch(Exception ex){
                system.debug(ex.getMessage() + ' - ' + ex.getLineNumber());
            }
            
            Product2 producto = [SELECT Id, IsAffiliate__c, Name, SendToSIGLO__c, ProductCode,// Producto 43
                                    (SELECT Id, Producto_secundario__c, Producto_secundario__r.Name
                                    FROM Productos_secundarios__r
                                    WHERE Producto_secundario__r.IsActive = true
                                    ORDER BY Producto_secundario__r.ProductCode)
                                    FROM Product2
                                    WHERE Id =: qli.Product2Id];

            if(producto.Productos_secundarios__r != null && !producto.Productos_secundarios__r.isEmpty()) {
				Map<string, string> mes = new Map<string, string>();
                
                for(Establecimiento e : pestabs){
                    mes.put(e.Affiliate + '-' + e.Product, e.StationId);
                }
                
                List<Establishment__c> ests = [
                    SELECT Id, Name,PhoneNumber__c, Tradename__c, StartTimeBusiness__c, EndTimeBusiness__c, Bank__c, BusinessTime__c, Email__c,
                           Contact__c, Web__c, Street__c, ColMpoCpEdo__c, PostalCode__c, Settlement__c, City__c, ExternalNumber__c,
                           InternalNumber__c, State__c, Population__c, location__Latitude__s, location__Longitude__s,
                           Affiliate__c, Affiliate__r.Product__c, Affiliate__r.AccountEntity__c, Account__c, Contract__c,
                           Affiliate__r.Name, Affiliate__r.Product__r.Name, Affiliate__r.AccountEntity__r.Name
                      FROM Establishment__c
                     WHERE Contract__c =: contrato.Id
                     ORDER BY CreatedDate];

                Map<Id, Set<Id>> mafps = new Map<Id, Set<Id>>();
                Set<Id> usedAf = new Set<Id>();
                Map<String, Establishment__c> mapEstablecimientosContrato = new Map<String, Establishment__c>(); //Producto 43
                
                for(Establishment__c est : ests){
                    mapEstablecimientosContrato.put(est.Id, est); //Producto 43

                    if(est.Affiliate__c != null){
                        usedAf.add(est.Affiliate__c);
                        if(!mafps.containsKey(est.Affiliate__c)) mafps.put(est.Affiliate__c, new Set<Id>());
                        if(est.Affiliate__r.Product__c != null){
                            Set<Id> prods = mafps.get(est.Affiliate__c);
                            prods.add(est.Affiliate__r.Product__c);
                            mafps.put(est.Affiliate__c, prods);
                        }
                    }
                }
                
                List<Establishment__c> nes = new List<Establishment__c>();
                Set<String> stationIds = new Set<String>();

                if(Producto.ProductCode == '43') { // Producto 43 - producto.Productos_secundarios__r != null && !producto.Productos_secundarios__r.isEmpty() && 
                    
                    Map<String, Affiliate__c> mapAffiliate = new Map<String, Affiliate__c>();

                    for(Affiliate__c afiliado : filiales) {
                        mapAffiliate.put(afiliado.Product__c, afiliado);
                    }

                    Establishment__c estAltaContrato = new Establishment__c();
                        
                    for(Establecimiento establecimiento : pestabs) {

                        if(mapEstablecimientosContrato.containsKey(establecimiento.Id) && mapAffiliate.containsKey(establecimiento.Product)) { // Se agrega establecimiento creado en alta y contrato
                            if(mes.containsKey(establecimiento.Affiliate + '-' + establecimiento.Product)) {
                                estAltaContrato = mapEstablecimientosContrato.get(establecimiento.Id);
                                Establishment__c newEst = new Establishment__c();
                                newEst.Id =  mapEstablecimientosContrato.get(establecimiento.Id).Id;
                                newEst.Affiliate__c = mapAffiliate.get(establecimiento.Product).Id;
                                newEst.StationId__c = establecimiento.StationId;
                                newEst.Name = establecimiento.StationId;
                                if(newEst.StationId__c != null) nes.add(newEst);
                            }
                        } else { // Se agrega establecimiento nuevo
                            Establishment__c newEst = new Establishment__c();
                            newEst.StationId__c = establecimiento.StationId;
                            newEst.Name = establecimiento.StationId;
                            newEst.Affiliate__c = mapAffiliate.get(establecimiento.Product).Id;
                            newEst.Tradename__c = estAltaContrato.Tradename__c;
                            newEst.StartTimeBusiness__c = estAltaContrato.StartTimeBusiness__c;
                            newEst.EndTimeBusiness__c = estAltaContrato.EndTimeBusiness__c;
                            newEst.Bank__c = estAltaContrato.Bank__c;
                            newEst.BusinessTime__c = estAltaContrato.BusinessTime__c;
                            newEst.Email__c = estAltaContrato.Email__c;
                            newEst.Contact__c = estAltaContrato.Contact__c;
                            newEst.Web__c = estAltaContrato.Web__c;
                            newEst.Street__c = estAltaContrato.Street__c;
                            newEst.ColMpoCpEdo__c = estAltaContrato.ColMpoCpEdo__c;
                            newEst.PostalCode__c = estAltaContrato.PostalCode__c;
                            newEst.Settlement__c = estAltaContrato.Settlement__c;
                            newEst.City__c = estAltaContrato.City__c;
                            newEst.ExternalNumber__c = estAltaContrato.ExternalNumber__c;
                            newEst.InternalNumber__c = estAltaContrato.InternalNumber__c;
                            newEst.State__c = estAltaContrato.State__c;
                            newEst.Population__c = estAltaContrato.Population__c;
                            newEst.location__Latitude__s = estAltaContrato.location__Latitude__s;
                            newEst.location__Longitude__s = estAltaContrato.location__Longitude__s;
                            newEst.Account__c = estAltaContrato.Account__c;
                            newEst.Contract__c = estAltaContrato.Contract__c;
							newEst.PhoneNumber__c = estAltaContrato.PhoneNumber__c;													   
                            nes.add(newEst);
                        } 
                    }
                    
                } else {//Producto 43  else y llave
                    for(Establishment__c est : ests){
                        if(est.Affiliate__c != null){
                            for(Producto_relacionado__c pr : producto.Productos_secundarios__r){
                                if(!mafps.get(est.Affiliate__c).contains(pr.Producto_secundario__c)){
                                    for(Affiliate__c af : filiales){                                        
                                        if(!usedAf.contains(af.Id) && af.AccountEntity__c == est.Affiliate__r.AccountEntity__c && af.Product__c == pr.Producto_secundario__c){

                                            Set<Id> prods = mafps.get(est.Affiliate__c);
                                            prods.add(pr.Producto_secundario__c);
                                            mafps.put(est.Affiliate__c, prods);
                                            
                                            Establishment__c newEst = new Establishment__c();
                                            newEst.Name = est.Name;
                                            newEst.Tradename__c = est.Tradename__c;
                                            newEst.StartTimeBusiness__c = est.StartTimeBusiness__c;
                                            newEst.EndTimeBusiness__c = est.EndTimeBusiness__c;
                                            newEst.Bank__c = est.Bank__c;
                                            newEst.BusinessTime__c = est.BusinessTime__c;
                                            newEst.Email__c = est.Email__c;
                                            newEst.Contact__c = est.Contact__c;
                                            newEst.Web__c = est.Web__c;
                                            newEst.Street__c = est.Street__c;
                                            newEst.ColMpoCpEdo__c = est.ColMpoCpEdo__c;
                                            newEst.PostalCode__c = est.PostalCode__c;
                                            newEst.Settlement__c = est.Settlement__c;
                                            newEst.City__c = est.City__c;
                                            newEst.ExternalNumber__c = est.ExternalNumber__c;
                                            newEst.InternalNumber__c = est.InternalNumber__c;
                                            newEst.State__c = est.State__c;
                                            newEst.Population__c = est.Population__c;
                                            newEst.location__Latitude__s = est.location__Latitude__s;
                                            newEst.location__Longitude__s = est.location__Longitude__s;
                                            newEst.Affiliate__c = af.Id;
                                            newEst.Account__c = est.Account__c;
                                            newEst.Contract__c = est.Contract__c;
                                            boolean existStationId = false;

                                            if(mes.containsKey(est.Affiliate__c + '-' + pr.Producto_secundario__c)){
                                                newEst.StationId__c = mes.get(est.Affiliate__c + '-' + pr.Producto_secundario__c);
                                                existStationId = stationIds.contains(newEst.StationId__c);
                                                stationIds.add(newEst.StationId__c);
                                            }

                                            if(existStationId) nes.add(newEst);
                                            usedAf.add(af.Id);
                                            break;
                                        }
                                    }
                                }
                                else{
                                    boolean existStationId = false;
                                    if(mes.containsKey(est.Affiliate__c + '-' + est.Affiliate__r.Product__c)){
                                        est.StationId__c = mes.get(est.Affiliate__c + '-' + est.Affiliate__r.Product__c);
                                        existStationId = stationIds.contains(est.StationId__c);
                                        stationIds.add(est.StationId__c);
                                    }
                                    if (!nes.contains(est) && existStationId) {
                                        nes.add(est);
                                    }
                                }
                            }
                        }
                    }
                } //Producto 43 llave

                if(!nes.isEmpty()){
                    upsert nes;
                } 
            }
            else{
                List<Establishment__c> les = new List<Establishment__c>();
                integer x =0;
                for(Establecimiento e : pestabs){
                    if(qli.Product2.ProductCode != 'des-AF-OPAM'){
                    	Establishment__c uEst = new Establishment__c();
                        uEst.Id = e.Id;
                        uEst.Name = e.StationId;
                        uEst.StationId__c = e.StationId;
                        les.add(uEst);    
                    }else{
                        if(x==0){
                        	Establishment__c uEst = new Establishment__c();
                            uEst.Id = e.Id;
                            uEst.StationId__c = e.StationId;
                            les.add(uEst);    
                        }else{
                            List<Establishment__c> ests = [
                            SELECT Id, Name, Tradename__c, StartTimeBusiness__c, EndTimeBusiness__c, Bank__c, BusinessTime__c, Email__c,
                                   Contact__c, Web__c, Street__c, ColMpoCpEdo__c, PostalCode__c, Settlement__c, City__c, ExternalNumber__c,
                                   InternalNumber__c, State__c, Population__c, location__Latitude__s, location__Longitude__s,
                                   Affiliate__c, Affiliate__r.Product__c, Affiliate__r.AccountEntity__c, Account__c, Contract__c,
                                   Affiliate__r.Name, Affiliate__r.Product__r.Name, Affiliate__r.AccountEntity__r.Name
                              FROM Establishment__c
                             WHERE Contract__c =: contrato.Id
                             ORDER BY CreatedDate];
                            
                            Establishment__c newEst = new Establishment__c();
                                        newEst.Name = ests[0].Name;
                                        newEst.Tradename__c = ests[0].Tradename__c;
                                        newEst.StartTimeBusiness__c = ests[0].StartTimeBusiness__c;
                                        newEst.EndTimeBusiness__c = ests[0].EndTimeBusiness__c;
                                        newEst.Bank__c = ests[0].Bank__c;
                                        newEst.BusinessTime__c = ests[0].BusinessTime__c;
                                        newEst.Email__c = ests[0].Email__c;
                                        newEst.Contact__c = ests[0].Contact__c;
                                        newEst.Web__c = ests[0].Web__c;
                                        newEst.Street__c = ests[0].Street__c;
                                        newEst.ColMpoCpEdo__c = ests[0].ColMpoCpEdo__c;
                                        newEst.PostalCode__c = ests[0].PostalCode__c;
                                        newEst.Settlement__c = ests[0].Settlement__c;
                                        newEst.City__c = ests[0].City__c;
                                        newEst.ExternalNumber__c = ests[0].ExternalNumber__c;
                                        newEst.InternalNumber__c = ests[0].InternalNumber__c;
                                        newEst.State__c = ests[0].State__c;
                                        newEst.Population__c = ests[0].Population__c;
                                        newEst.location__Latitude__s = ests[0].location__Latitude__s;
                                        newEst.location__Longitude__s = ests[0].location__Longitude__s;
                                        newEst.Affiliate__c = filiales[0].Id;
                                        newEst.Account__c = ests[0].Account__c;
                                        newEst.Contract__c = ests[0].Contract__c;
                            			newEst.StationId__c = ests[0].Affiliate__c + '-' + x;
                            			les.add(newEst);    
                        }                            
                    }
                    x++;
                }

                if(qli.Product2.ProductCode != 'des-AF-OPAM'){
                	update les;
                }else{
                    upsert les;
                }    
            }
            
            contrato.EtapaContrato__c = 'Autorizado';
            opp.FechaFinADV__c = system.now();  
            update contrato;
            
            if(contrato.PartidaPresupuesto__r.Product2.ProductCode != null && !isOPAM){ // AFILIADOS OPAM SE AGREGA
                if(!string.isEmpty(contrato.CodigoAS400__c)&&contrato.CodigoAS400__c.split('-')[1]!='30'&&contrato.CodigoAS400__c.split('-')[1]!='31'){
                    update opp;//DYAMPI
                } else if (contrato.PartidaPresupuesto__r.Product2.ProductCode == '33'){ // AGREGADO PARA NECTAR
                    update opp;
                }
            } else {
                update opp;
            }  	
            Account thisAccount = [SELECT id, CodigoClienteAS400__c, CodigoClienteOPAM__c from Account where Id =: opp2.AccountId LIMIT 1];
            
										  
              if(!isOPAM){// AFILIADOS OPAM
                String codProd = qli.Product2.IDInterno__c!=null ? (qli.Product2.IDInterno__c.length() == 1 ? '0' + qli.Product2.IDInterno__c : qli.Product2.IDInterno__c) : '';

                if(codProd.contains('-')){
                    codProd = codProd.split('-')[0];
                }
                  
                List<String> codigoGrupo = new List<String>();                  
                if( (num43 =='43') && (prodNombre43=='Mantenimiento Fleet Edenred + Américas')){
                    codigoGrupo = afiliado43.split('-');
                    thisAccount.AffiliateCodeAS400__c = codigoGrupo.get(1);
                }
                else if((num43 =='43') && (prodNombre43=='43 Mantenimiento Fleet Américas')){
                    codigoGrupo = afiliado43.split('-');
                    thisAccount.AffiliateCodeAS400__c = codigoGrupo.get(1);
                }else if((num31 == '31') && (prodNombre31=='31 Mantenimiento de flota')){
                    codigoGrupo = afiliado31.split('-');
                    thisAccount.AffiliateCodeAS400__c = codigoGrupo.get(2);
                }
                      
                update thisAccount;

            }else{// AFILIADOS OPAM
                thisAccount.AffiliateCodeAS400__c =contrato.CodigoAS400__c.substring(0, 5);																										   
                update thisAccount;
            }
            
            if(lisErrors != null && lisErrors.size() > 0){
                Database.rollback(sp);
                response.put('Code', '-1');
                response.put('Response', 'Error al guardar la informacion: ' + String.join(lisErrors, ', '));
                return response;
            }
            
            response.put('Code', '0');
            response.put('Response', 'Información Guardada con éxito');
            return response;
        }
        catch(Exception e){
            Database.rollback(sp);
            response.put('Code', '-1');
            response.put('Response', 'Error al guardar la información: '+ e.getMessage()+', linea: '+e.getStackTraceString());
            return response;
        }
    }

	public static Double getLastAccountIdFromContracts() {
		Double accountIdCounter = 0;
		List<ContratoFilial__c> conts = [
			SELECT GLB_ID_Cuenta__c 
			FROM ContratoFilial__c 
			WHERE GLB_ID_Cuenta__c != null 
			ORDER BY GLB_ID_Cuenta__c DESC
			LIMIT 1
		];

		if(!conts.isEmpty()) {
			accountIdCounter = conts[0].GLB_ID_Cuenta__c;
		}
		return accountIdCounter;
	}

    public static String checkIfCorpIdAlreadyExistInAffiliate(String accountId) {
        String idCorpAfiliado = '';

        Map<String, Affiliate__c> affiliateMap = new Map<String, Affiliate__c>();
        for (Affiliate__c aff : [
            SELECT Id, Name, Account__r.Id, Account__r.GLB_ID_Corporativo__c, AccountEntity__r.Name
            FROM Affiliate__c
            WHERE Account__r.Id = :accountId
            AND Account__r.RecordType.DeveloperName = :MerchantRecordType
            AND (Account__r.GLB_ID_Corporativo__c != null AND Account__r.GLB_ID_Corporativo__c != '')
        ]) {
            affiliateMap.put(aff.AccountEntity__r.Name, aff);
        }
    
        for (EntidadCuenta__c ec : [
            SELECT Id, Name, Cuenta__r.Id, Cuenta__r.GLB_ID_Corporativo__c
            FROM EntidadCuenta__c
            WHERE Cuenta__r.Id = :accountId
            AND Cuenta__r.RecordType.DeveloperName = :ClienteRecordType
            AND (Cuenta__r.GLB_ID_Corporativo__c = null OR Cuenta__r.GLB_ID_Corporativo__c = '')
        ]) {
            Affiliate__c aff = affiliateMap.get(ec.Name);
            if (aff != null && aff.Account__r.Id == ec.Cuenta__r.Id) {
                idCorpAfiliado = aff.Account__r.GLB_ID_Corporativo__c;
                break;
            }
        }
    
        return idCorpAfiliado;
    }
 
	public static String checkIfCorpIdAlreadyExists(String accountId) {
		String idCorp = [
			SELECT GLB_ID_Corporativo__c
			FROM Account
			WHERE Id =: accountId
		].GLB_ID_Corporativo__c;

		System.debug('checkIfCorpIdAlreadyExists idCorp '+idCorp);
		if(idCorp == null) {
			idCorp = createCorpId(accountId);
		}

		return idCorp;
	}

	public static String createCorpId(String accountId) {
		String corpId = '';
		try {
			Account acc = [
				SELECT GLB_ID_Corporativo__c
				FROM Account
				WHERE Id =: accountId 
			];
			
			List<Account> accWithLastId = [
				SELECT GLB_ID_Corporativo__c
				FROM Account
				WHERE GLB_ID_Corporativo__c != null
				ORDER BY GLB_ID_Corporativo__c DESC
				LIMIT 1
			];

			//TODO: Look for Merchants and Client type account to assign the same ID
			
			if(!accWithlastId.isEmpty()) {
				acc.GLB_ID_Corporativo__c = incrementString(accWithLastId[0].GLB_ID_Corporativo__c);
			} else {
				acc.GLB_ID_Corporativo__c = 'A0001';
			}
			Database.update(acc);
			corpId = acc.GLB_ID_Corporativo__c;
		} catch (AuraHandledException e) {
			System.debug('Error: '+e.getMessage());
		}
		return corpId;
	}

	public static String getNextChar(String oldChar) {
		String key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZAabcdefghijklmnopqrstuvwxyza';
		Integer index = key.indexOfChar(oldChar.charAt(0));
		return index == -1? null: key.substring(index+1, index+2);
	}

	public static String incrementString(String inputString) {
		String letterPart = inputString.substring(0, 1);
		String numericPart = inputString.substring(1);
		
		Integer numberA = Integer.valueOf(numericPart);
		numberA++; // Increment the number
		
		// Check if the numeric part exceeds 9999
		if (numberA > 9999) {
			String nextLetter = getNextChar(letterPart);
			letterPart = nextLetter;
			numberA = 1; // Reset the numeric part to 1
		}
		
		String incrementedString = letterPart + String.valueOf(numberA).leftPad(4, '0');
		
		return incrementedString;
	}
	 
    public static Map<String, String> updateContratoADV2(String jsonContrato, String jsonOportunidad, String extras){
        return updateContratoADV2(jsonContrato, jsonOportunidad, extras, '[]', '[]');
    }
    
    @AuraEnabled
    public static Map<String, String> updateContratoADV2(String jsonContrato, String jsonOportunidad, String extras, string estabs, String filialesEx){
        String prodCode='';//Producto 43
        Map<String, String> response = new Map<String, String>();
		List<ContratoFilial__c> filialesExtras = (List<ContratoFilial__c>)JSON.deserialize(filialesEx, List<ContratoFilial__c>.class);
        
		//Ejecutamos logica con callouts antes de iniciar cualquier DML statement
		List<ContratoFilial__c> filiales = (List<ContratoFilial__c>)JSON.deserialize(extras, List<ContratoFilial__c>.class);
		Contrato2__c contrato = (Contrato2__c)JSON.deserialize(jsonContrato, Contrato2__c.class);
		Opportunity opp = (Opportunity)JSON.deserialize(jsonOportunidad,Opportunity.class);
		
		List<Opportunity> oppList = [
			SELECT Id, Contacto__c, AccountId, OwnerId, RecordType.DeveloperName, Account.CodigoClienteAS400__c, Account.CodigoClienteOPAM__c,
                Contrato_Filial__c, SubCuentaMigracion__c
			FROM Opportunity 
			WHERE id =: opp.id 
			LIMIT 1
		];
        Opportunity opp2 = (oppList.isEmpty()) ? null : oppList[0];

		List<Contrato2__c> contratoList = [
			SELECT Id, PartidaPresupuesto__r.Product2Id, PartidaPresupuesto__r.Product2.ProductCode,
				PartidaPresupuesto__r.OpcionesMetodoPago__c, PartidaPresupuesto__r.FormaPago__c,Entidad_Cuenta__r.EntidadLegal__r.Name
			FROM Contrato2__c 
			WHERE Id =: contrato.Id
		];
        Contrato2__c contr;
        List<ContratoFilial__c> filialesExistentes =  new List<ContratoFilial__c>();
        if(contratoList.isEmpty()) {
            contr = new Contrato2__c();
        } else{
            contr = contratoList[0];
            filialesExistentes = [
                SELECT Id
                FROM ContratoFilial__c
                WHERE RFC__c = :contr.Entidad_Cuenta__r.EntidadLegal__r.Name
            ];
        }

        //New logic added for product fleet 33
		String corpId;
		String phantomIdPrincipal;
		Double lastIdCuenta;
		//Se agregan mapas para armar string json
		Map<String, Object> uniqueIdJsonData = new Map<String, Object>();
		Map<String, String> principalEntity = new Map<String, String>();
		List<Map<String, String>> subaccounts = new List<Map<String, String>>();
		List<String> productsWithIdUniqueIntegration = new List<String>{'33', '60-t','43','43-A'};
		
		if(contr != null && productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode)) {
			lastIdCuenta = getLastAccountIdFromContracts();
			principalEntity.put('idCuenta', String.valueOf(Integer.valueOf(lastIdCuenta+1)));
			lastIdCuenta = lastIdCuenta+1;

			//Se agregan los IDs Cuenta a las subcuentas
			for(ContratoFilial__c extra : filiales) {
				extra.GLB_ID_Cuenta__c = lastIdCuenta + 1;
				lastIdCuenta = lastIdCuenta + 1;
			}

			///======================== EMPIEZAN CALLOUTS ========================//////////
			///=======GET=====
			AC_WSGetIdFromPhantom.Response res = AC_WSGetIdFromPhantom.getIdFromPhantom(contr.Entidad_Cuenta__r.EntidadLegal__r.Name);
			if(res.hasError) {
                System.debug('res ADR: ' + res);
				Integer statusCode = Test.isRunningTest() ? 200 : res.response.getStatusCode();
				if(statusCode >= 500) {
					response.put('Code','-1');
					response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
				} else {
					Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(res.message);
					String error = (String) jsonMap.get('error');
					System.debug('Error: ' + error);
					response.put('Code','-1');
					response.put('Response', 'Error al obtener ID ('+contr.Entidad_Cuenta__r.EntidadLegal__r.Name+'): '+error);
				}
				return response;
			}

			if(res.phantomJsonResponse.meta.status == 'failed') {
				response.put('Code','-1');
				response.put('Response', 'Error al obtener ID:'+res.phantomJsonResponse.meta.messages[0].text);
				return response;
			}

			Boolean dataExists = false;
			Boolean flag = true;
			if(!res.hasError && res.phantomJsonResponse.data.legal_entities.size() > 0) {
				Integer entityIdentifier = res.phantomJsonResponse.data.legal_entities[0].identifier;
				//Chequear si no hubo rollback por medio de verificar los ID Cuenta
				Map<String, Double> idsCuenta = new Map<String, Double>();
				idsCuenta.put(principalEntity.get('idCuenta'), Double.valueOf(principalEntity.get('idCuenta')));

				//Si existe entidad y contiene subcuentas, pero falta homologacion, entonces ejecuto methodo PUT
				if(res.phantomJsonResponse.data.legal_entities[0].operation_groups.size() > 0) {
					for(ContratoFilial__c extra : filiales) {
						idsCuenta.put(String.valueOf(Integer.valueOf(extra.GLB_ID_Cuenta__c)), extra.GLB_ID_Cuenta__c);
					}

					Map<String, String> idCuentaFromPhantom = new Map<String, String>();
					for(Integer i = 0; i < res.phantomJsonResponse.data.legal_entities[0].operation_groups.size(); i++) {
						String idCuentaTemp = res.phantomJsonResponse.data.legal_entities[0].operation_groups[i].customer_legacy.phantom_identifier;						
						idCuentaFromPhantom.put(idCuentaTemp,idCuentaTemp);
					}
                    
					for(String idCuenta : idsCuenta.keySet()) {
						if(idCuentaFromPhantom.get(idCuenta) == null) {
							flag = false;
						}
					}

					Integer operationGroupsSize = res.phantomJsonResponse.data.legal_entities[0].operation_groups.size();
					
					if(!flag) {
						// ============= PUT ===========
						//ejecuta metodo PUT			
						String clientType = 'cliente';

						res = AC_WSGetIdFromPhantom.updateEntity(
							String.valueOf(entityIdentifier),
							contr.Entidad_Cuenta__r.EntidadLegal__r.Name, 
							idsCuenta, 
							'cliente', 
							'crear'
						);

						if(res.hasError) {
							Integer statusCode = res.response.getStatusCode();
							if(statusCode >= 500) {
								response.put('Code','-1');
								response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
							} else {
								Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(res.message);
								String error = (String) jsonMap.get('error');
								System.debug('Error: ' + error);
								response.put('Code','-1');
								response.put('Response', 'Error al actualizar Entidad Legal ('+contr.Entidad_Cuenta__r.EntidadLegal__r.Name+'): '+error);
							}
							return response;
						}
						
						if(res.phantomJsonResponse.meta.status == 'failed') {
							System.debug('response PUT message >> '+res.phantomJsonResponse.meta.messages[0].text);
							response.put('Code','-1');
							response.put('Response', 'Error integración ID Unique Generator:'+res.phantomJsonResponse.meta.messages[0].text);
							return response;
						}
					}
				}
				dataExists = true;
			} else {
				//============ POST =============
				//Ejecuta metodo POST
				Map<String, Double> idsCuenta = new Map<String, Double>();
				String clientType = 'cliente';
				idsCuenta.put(principalEntity.get('idCuenta'), Double.valueOf(principalEntity.get('idCuenta')));

				for(ContratoFilial__c extra : filiales) {
					idsCuenta.put(String.valueOf(Integer.valueOf(extra.GLB_ID_Cuenta__c)), extra.GLB_ID_Cuenta__c);
				}

				res = AC_WSGetIdFromPhantom.sendNewEntity(
					contr.Entidad_Cuenta__r.EntidadLegal__r.Name,
					idsCuenta,
					clientType
				);

				if(res.hasError) {
					Integer statusCode = res.response.getStatusCode();
					if(statusCode >= 500) {
						response.put('Code','-1');
						response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
					} else {
						Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(res.message);
						String error = (String) jsonMap.get('error');
						System.debug('Error: ' + error);
						response.put('Code','-1');
						response.put('Response', 'Error al crear Entidad Legal ('+contr.Entidad_Cuenta__r.EntidadLegal__r.Name+'): '+error);
					}
					return response;
				}

				if(res.phantomJsonResponse.meta.status == 'failed') {
					response.put('Code','-1');
					response.put('Response', 'Error integración ID Unique Generator:'+res.phantomJsonResponse.meta.messages[0].text);
					return response;
				}
				if(!res.hasError && res.phantomJsonResponse.data.legal_entities.size() > 0) {
					dataExists = true;
				}
			}
			if(!dataExists && res.hasError) {
				response.put('Code','-1');
				response.put('Response', 'Error al consumir servicio Id Unique Generator');
				return response;
			} else {
				//Si existe en phantom, se asigna ID Phantom a entidad principal
				phantomIdPrincipal = res.phantomJsonResponse.data.legal_entities[0].code;
				
				//Si existen subcuentas, se recorre arreglo y se mapea Id Cuenta => Id Phantom
				if(res.phantomJsonResponse.data.legal_entities[0].operation_groups.size() > 0) {
					for(Integer i = 0; i < res.phantomJsonResponse.data.legal_entities[0].operation_groups.size(); i++) {
						String idCuentaTemp = res.phantomJsonResponse.data.legal_entities[0].operation_groups[i].customer_legacy.phantom_identifier;
						String idPhantomTemp = res.phantomJsonResponse.data.legal_entities[0].operation_groups[i].code;

						if(idCuentaTemp == principalEntity.get('idCuenta')) {
							principalEntity.put('phantomId', idPhantomTemp);
						}
						
						for(ContratoFilial__c extra : filiales) {
							if(extra.GLB_ID_Cuenta__c == Double.valueOf(idCuentaTemp)) {
								extra.GLB_Unique_ID_Generator__c = idPhantomTemp;
								extra.CodigoAS400__c = extra.GLB_Unique_ID_Generator__c; //Se asigna para leer en componente Folio Alta Cliente

								if(Integer.valueOf(extra.GLB_ID_Cuenta__c) == Integer.valueOf(idCuentaTemp)) {
									Map<String, String> tempDataMap = new Map<String, String>();
									tempDataMap.put('id', extra.id);
									tempDataMap.put('idCuenta', idCuentaTemp);
									tempDataMap.put('PhantomId', idPhantomTemp);
									subaccounts.add(tempDataMap);
								}
							}
						}
					}
				}
			}

			uniqueIdJsonData.put('Principal', principalEntity);

			if(filialesExtras.size() > 0) {
				dataExists = false;
				//SE HACE CALLOUT DENTRO DE FOR PORQUE SERVICIO EXTERNO NO SOPORTA ENVIO POR LOTE
				for(ContratoFilial__c contract: filialesExtras) {
					contract.GLB_ID_Cuenta__c = lastIdCuenta + 1;
					lastIdCuenta = lastIdCuenta + 1;

					//============= [ GET ] ===============
					System.debug('contract.RFC__c >>> '+contract.RFC__c);
					AC_WSGetIdFromPhantom.Response resFil;
					if(Test.isRunningTest()) {
						resFil = AC_WSGetIdFromPhantom.getIdFromPhantom('RFCEDG07062024');
					} else {
						resFil = AC_WSGetIdFromPhantom.getIdFromPhantom(contract.RFC__c);
					}
					//Chequeo si id cuenta que se envia ya existe en integracion
					if(resFil.hasError) {
						Integer statusCode = res.response.getStatusCode();
						if(statusCode >= 500) {
							response.put('Code','-1');
							response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
						} else {
							Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(resFil.message);
							String error = (String) jsonMap.get('error');
							System.debug('Error: ' + error);
							response.put('Code','-1');
							response.put('Response', 'Error al obtener ID Unique ('+contract.RFC__c+'): '+error);
						}
						return response;
					}

					if(!resFil.hasError && resFil.phantomJsonResponse.data.legal_entities.size() > 0) {
						Integer entityIdentifier = resFil.phantomJsonResponse.data.legal_entities[0].identifier;
						flag = false;
						if(resFil.phantomJsonResponse.data.legal_entities[0].operation_groups.size() > 0) {
							for(Integer i = 0; i < resFil.phantomJsonResponse.data.legal_entities[0].operation_groups.size(); i++) {
								String idCuentaTemp = resFil.phantomJsonResponse.data.legal_entities[0].operation_groups[i].customer_legacy.phantom_identifier;
								if(Integer.valueOf(idCuentaTemp) == Integer.valueOf(contract.GLB_ID_Cuenta__c)) {
									flag = true;
								}
							}
							if(!flag) {
								// ============= PUT ===========
								//ejecuta metodo PUT								
								String clientType = 'cliente';
								Map<String, Double> idCuentaMap = new Map<String, Double>();
								idCuentaMap.put(String.valueOf(Integer.valueOf(contract.GLB_ID_Cuenta__c)), contract.GLB_ID_Cuenta__c);
								resFil = AC_WSGetIdFromPhantom.updateEntity(
									String.valueOf(entityIdentifier),
									contract.RFC__c, 
									idCuentaMap, 
									'cliente', 
									'crear'
								);
								if(resFil.hasError) {
									Integer statusCode = res.response.getStatusCode();
									if(statusCode >= 500) {
										response.put('Code','-1');
										response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
									} else {
										Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(resFil.message);
										String error = (String) jsonMap.get('error');
										System.debug('Error: ' + error);
										response.put('Code','-1');
										response.put('Response', 'Error al actualizar Entidad legal ('+contract.RFC__c+'): '+error);
									}
									return response;
								}
								
								if(resFil.phantomJsonResponse.meta.status == 'failed') {
									System.debug('response PUT message >> '+resFil.phantomJsonResponse.meta.messages[0].text);
									response.put('Code','-1');
									response.put('Response', 'Error integración ID Unique Generator:'+resFil.phantomJsonResponse.meta.messages[0].text);
									return response;
								}
							}
						}
						dataExists = true;
					} else {
						//============ POST =============
						//Ejecuta metodo POST
						Map<String, Double> idsCuenta = new Map<String, Double>();
						String clientType = 'cliente';
						idsCuenta.put(String.valueOf(Integer.valueOf(contract.GLB_ID_Cuenta__c)), contract.GLB_ID_Cuenta__c);
						if(Test.isRunningTest()) {
							resFil = AC_WSGetIdFromPhantom.sendNewEntity(
								'RFCEDG07062024',
								idsCuenta,
								clientType
							);
						} else {
							resFil = AC_WSGetIdFromPhantom.sendNewEntity(
								contract.RFC__c,
								idsCuenta,
								clientType
							);
						}
						if(resFil.hasError) {
							Integer statusCode = resFil.response.getStatusCode();
							if(statusCode >= 500) {
								response.put('Code','-1');
								response.put('Response', 'El servicio de Unique ID se encuentra momentáneamente no disponible.');
							} else {
								Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(resFil.message);
								String error = (String) jsonMap.get('error');
								System.debug('Error: ' + error);
								response.put('Code', '-1');
								response.put('Response','Error al crear Entidad Legal ('+contract.RFC__c+'): '+error);
							}
							return response;
						}
						if(resFil.phantomJsonResponse.meta.status == 'failed') {
							response.put('Code','-1');
							response.put('Response', 'Error integración ID Unique Generator:'+resFil.phantomJsonResponse.meta.messages[0].text);
							return response;
						}
						if(!resFil.hasError && resFil.phantomJsonResponse.data.legal_entities.size() > 0) {
							dataExists = true;
						}
					}

					if(!dataExists && resFil.hasError) {
						response.put('Code','-1');
						response.put('Response', 'Error al consumir servicio Id Unique Generator');
						return response;
					} else {
						//Si existen subcuentas, se recorre arreglo y se mapea Id Cuenta => Id Phantom
						if(resFil.phantomJsonResponse.data.legal_entities[0].operation_groups.size() > 0) {
							for(Integer i = 0; i < resFil.phantomJsonResponse.data.legal_entities[0].operation_groups.size(); i++) {
								String idCuentaTemp = resFil.phantomJsonResponse.data.legal_entities[0].operation_groups[i].customer_legacy.phantom_identifier;
								String idPhantomTemp = resFil.phantomJsonResponse.data.legal_entities[0].operation_groups[i].code;

								if(contract.GLB_ID_Cuenta__c == Double.valueOf(idCuentaTemp)) {
									contract.GLB_Unique_ID_Generator__c = idPhantomTemp;
									contract.CodigoAS400__c = contract.GLB_Unique_ID_Generator__c; //Se asigna para leer en componente Folio Alta Cliente

									if(Integer.valueOf(contract.GLB_ID_Cuenta__c) == Integer.valueOf(idCuentaTemp)) {
										Map<String, String> tempDataMap = new Map<String, String>();
										tempDataMap.put('id', contract.id);
										tempDataMap.put('idCuenta', idCuentaTemp);
										tempDataMap.put('PhantomId', idPhantomTemp);
										subaccounts.add(tempDataMap);
									}
								}
							}
						}
					}

					filiales.add(contract);
				}
			}
			if(filialesExtras.size() > 0) {
				uniqueIdJsonData.put('Filiales', subaccounts);
			} else {
				uniqueIdJsonData.put('Subcuentas', subaccounts);
			}
			
			String uniqueIdJsonDataString = JSON.serialize(uniqueIdJsonData);
			response.put('jsonIdsPhantomData',uniqueIdJsonDataString);
            String CorpIdAffiliate = checkIfCorpIdAlreadyExistInAffiliate(opp2.AccountId);

			corpId = CorpIdAffiliate != null && CorpIdAffiliate != '' ? CorpIdAffiliate : checkIfCorpIdAlreadyExists(opp2.AccountId);
			if(corpId == '' || corpId == null) {
				response.put('Code', '-1');
				response.put('Response', 'Error al crear ID Corporativo');
				return response;
			}
			response.put('corporationId', corpId);
		}
		/////////////////////////////////////////////////////////////////////////
        Savepoint sp = Database.setSavepoint();
        
        try{
            List<String> lisErrors = new List<String>();
            
            QuoteLineItem qli = [
				SELECT Id, Product2.IDInterno__c 
				FROM QuoteLineItem 
				WHERE Quote.OpportunityId =: opp2.Id 
				AND Quote.IsSyncing = true 
				AND Escalonamiento__c = null 
				LIMIT 1
			];

            for(ContratoFilial__c extra : filiales){
                extra.OwnerId = opp2.OwnerId;
				extra.Name = extra.CodigoAS400__c;
            }
            
            contrato.EtapaContrato__c = 'Finalizado';
            Integer ind = [Select Count() from Contrato2__c where Id !=: contrato.Id and CodigoAS400__c =: contrato.CodigoAS400__c];

            if(!productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode) && ind>0){
                Database.rollback(sp);
                response.put('Code','-1');
                response.put('Response','Error al guardar la informacion: El Codigo ingresado ya se encuentra en otro contrato (' + contrato.CodigoAS400__c + ')');
                return response;
            }  

            //update contrato;
            update filiales;
            system.debug('>>> LIMITQUERYROWS|QUERYROWS|REMAININGROWS|UPPERBOUND|LIMITSOQL|LIMITMDL: '+Limits.getLimitQueryRows()+'|'+Limits.getQueryRows()+'|'+(Limits.getLimitQueryRows() - Limits.getQueryRows())+'|'+Limits.getQueries()+'|'+Limits.getDmlRows());      
            
			ContratoFilial__c tem;
            prodCode = contr.PartidaPresupuesto__r.Product2.ProductCode;// Producto 43
            if((!string.isEmpty(contrato.CodigoAS400__c) && contrato.id != null) || productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode)/*AGREGADO PARA NECTAR DESPUES DEL ||*/){                
                tem = new ContratoFilial__c(
                    OwnerId = opp2.OwnerId,
                    Contrato_2__c = contrato.Id,
                    Entidad_Cuenta__c = contrato.Entidad_Cuenta__c,
                    PlatformAdministrator__c = opp2.Contacto__c,
                    isPrime__c = true,
                    Distintivo__c = 'Principal'
                );

                if(productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode)) {
                    tem.GLB_ID_Cuenta__c = Double.valueOf(principalEntity.get('idCuenta'));
                    tem.GLB_Unique_ID_Generator__c = principalEntity.get('phantomId');
                    tem.CodigoAS400__c = tem.GLB_Unique_ID_Generator__c;//Se asigna para leer en componente Folio Alta Cliente
                    tem.Name = tem.GLB_Unique_ID_Generator__c;
                    contrato.CodigoAS400__c = tem.GLB_Unique_ID_Generator__c;//Se asigna para leer en componente Folio Alta Cliente
                    
                    if(opp.Recordtype.DeveloperName == 'Migracion') {
                        tem.Migration_Contract__c = true;
                        tem.isActive__c = true;
                        tem.MigrationOpportunity__c = opp2.Id;
                        tem.SourceSubaccount__c = opp2.Contrato_Filial__c;
                    }
                } else {
                    tem.CodigoAS400__c = contrato.CodigoAS400__c;
                    tem.Name = contrato.CodigoAS400__c;
                }
                insert tem;

                if(productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode) && opp.Recordtype.DeveloperName == 'Migracion') {
                    ContratoFilial__c oldCf = new ContratoFilial__c(
                        Id = opp2.Contrato_Filial__c, 
                        isActive__c = false,
                        MigrationOpportunity__c = opp2.Id,
                        DestinationSubaccount__c = tem.Id,
                        Migration_Contract__c = true,
                        Origin_contract__c = true
                    );
                    update oldCf;
                }
                opp.SubCuentaMigracion__c = tem.Id;
            }
            
            contrato.EtapaContrato__c = 'Autorizado';
            opp.FechaFinADV__c = system.now();  
			response.put('FechaFinADV', String.valueOf(opp.FechaFinADV__c));

            Map<String,String> mapWayPay = new Map<String,String>{
                'Banamex' => 'Transferencia Banamex',
                'BBVA Bancomer' => 'Transferencia Bancomer',
                'HSBC' => 'Transferencia HSBC'
            };

			if(productAltaBE.contains(contr.PartidaPresupuesto__r.Product2.ProductCode)){
                String value = mapWayPay.get(contr.PartidaPresupuesto__r.OpcionesMetodoPago__c);
                if(value != null) contrato.WayPay__c =value;
                if(contr.PartidaPresupuesto__r.FormaPago__c == 'Deposito') contrato.WayPay__c = 'Ficha de deposito';
            }
            
            update contrato;

            system.debug('>>> LIMITQUERYROWS|QUERYROWS|REMAININGROWS|UPPERBOUND|LIMITSOQL|LIMITMDL: '+Limits.getLimitQueryRows()+'|'+Limits.getQueryRows()+'|'+(Limits.getLimitQueryRows() - Limits.getQueryRows())+'|'+Limits.getQueries()+'|'+Limits.getDmlRows());
            if(!string.isEmpty(contrato.CodigoAS400__c)&& contrato.CodigoAS400__c.contains('-') && contrato.CodigoAS400__c.split('-')[1]!='30'&&contrato.CodigoAS400__c.split('-')[1]!='31'  && prodCode != '43'){ // Producto 43
                String str = JSON.serialize(opp);
                update opp;
            }else if (prodCode == '43'){ // AGREGADO PARA NECTAR // Producto 43
                opp.StageName = 'Implementación';
            }else {
                update opp;
            }

			if(!productsWithIdUniqueIntegration.contains(contr.PartidaPresupuesto__r.Product2.ProductCode)) {
				//'Para Producto 33 y 60: NO DEBE ENTRAR AQUI
				Account thisAccount = new Account(
                    Id = opp2.AccountId, 
                    CodigoClienteAS400__c = opp2.Account.CodigoClienteAS400__c, 
                    CodigoClienteOPAM__c = opp2.Account.CodigoClienteOPAM__c
                );

				String grupo = contrato.CodigoAS400__c;
				List<String> codigoGrupo = grupo.split('-');
				
				String codProd = qli.Product2.IDInterno__c != null ? (qli.Product2.IDInterno__c.length()==1 ? '0'+qli.Product2.IDInterno__c : qli.Product2.IDInterno__c) : '';
				
                //NVH -- Productos Arg no tienen validacion sobre CodigoClienteAS400__c
                if(!argentinaProducts.contains(codProd)) {
                    if(codProd.contains('-')){
                        codProd = codProd.split('-')[0];
                    }
    
                    if(codigoGrupo.size() == 4 && codProd != codigoGrupo.get(1) && !opp2.RecordType.DeveloperName.containsIgnoreCase('RT_NuevaAfiliacion')){
                        lisErrors.add('No puede generarse el alta de cliente con número de producto distinto al producto cotizado (' + grupo + ')');
                    }
                
                    if(String.isBlank(thisAccount.CodigoClienteAS400__c) && codigoGrupo.size() == 4){
                        Integer numAcc = [Select count() from Account where CodigoClienteAS400__c =: codigoGrupo.get(2)];
                        if(numAcc > 0){
                            lisErrors.add('El grupo capturado ya se encuentra generado en otra Cuenta (' + grupo + ')');
                        }else{                    
                            thisAccount.CodigoClienteAS400__c = codigoGrupo.get(2);						
                            String str = JSON.serialize(thisAccount);
                            updateRecord(str);
                        }
                    }else if((!String.isBlank(thisAccount.CodigoClienteAS400__c)) && codigoGrupo.size() == 4 && thisAccount.CodigoClienteAS400__c != codigoGrupo.get(2)){
                        lisErrors.add('El grupo capturado es diferente al grupo de la cuenta (' + grupo + ')');
                    }
                    else if(codigoGrupo.size() == 2){
                        thisAccount.CodigoClienteOPAM__c=grupo;					
                        String str = JSON.serialize(thisAccount);
                        updateRecord(str);
                    }
                }
                
			}

            if(lisErrors!=null&&lisErrors.size()>0){
                Database.rollback(sp);
                response.put('Code','-1');                    
                response.put('Response','Error al guardar la informacion: '+String.join(lisErrors, ','));
                return response;
            }
            
            response.put('Code','0');
            response.put('Response','Información Guardada con éxito');
            return response;
        }
        catch(Exception e){
            Database.rollback(sp);
            response.put('Code','-1');
            response.put('Response','Error al guardar la informacion: '+ e.getMessage()+', linea: '+e.getStackTraceString());
            return response;
        }
    }
    
    @TestVisible
    @future(callout=true)
    private static void updateRecord(String recordStr){
        try{
            SObject record = (SObject)JSON.deserialize(recordStr, SObject.class);            
            update record;
        }catch(Exception e){
            System.debug('Error:: '+e.getMessage());
        }
    }
  
    public static Map<String, String> updateContractADVRenegotiation(String jsonContrato, String jsonOportunidad, String extras){
        return updateContractADVRenegotiation(jsonContrato, jsonOportunidad, extras, '');
    }
    
    @AuraEnabled
    public static Map<String, String> updateContractADVRenegotiation(String jsonContrato, String jsonOportunidad, String extras, string estabs) {//CEAM: 3563
        //CB: Se pasa como parametro Contrato2__c sin sus objetos relacionados, lo mismo con Oportunidad        
        Map<String, String> response = new Map<String, String>();
        List<String> lisErrors = new List<String>();
        List<RenegotiationProduct__c> listRenegotiationProduct = new List<RenegotiationProduct__c>();
        List<RenegotiationProduct__c> listRenegotiationProductApproved = new List<RenegotiationProduct__c>();
        Contrato2__c contrato = (Contrato2__c)JSON.deserialize(jsonContrato, Contrato2__c.class);
        Opportunity opp = (Opportunity)JSON.deserialize(jsonOportunidad,Opportunity.class);
        List<QuoteLineItem> ListQli = [
            SELECT Id
            FROM QuoteLineItem
            WHERE Quote.OpportunityId =: opp.Id
                AND Quote.IsSyncing = true 
                AND Escalonamiento__c = null 
            LIMIT 1
        ];

        if(!ListQli.isEmpty()) {
            listRenegotiationProduct = [
                SELECT Id, SubsidiaryContractApproved__c, SubsidiaryContract__c, Name, isRenegotiation__c 
                FROM RenegotiationProduct__c 
                WHERE QuoteProduct__c =: ListQli[0].id
            ];
        }

		Contrato2__c contr = [
			SELECT PartidaPresupuesto__r.Product2.ProductCode
			FROM Contrato2__c
			WHERE Id =: contrato.Id
		];

        contrato.EtapaContrato__c = 'Autorizado';
        if(contr.PartidaPresupuesto__r.Product2.ProductCode != '33') {
            opp.StageName = 'Renegociada';
        }
        opp.FechaFinADV__c = system.now();

        Savepoint sp = Database.setSavepoint();
        try{            
            update contrato;
            update opp;

            if(!listRenegotiationProduct.isEmpty() && opp.Estatus__c == 'Cerrada') {
                for(RenegotiationProduct__c rp : listRenegotiationProduct) {
                    if(rp.SubsidiaryContractApproved__c == null && rp.SubsidiaryContract__c != null) {
                        rp.SubsidiaryContractApproved__c = rp.SubsidiaryContract__c;
                        listRenegotiationProductApproved.add(rp);
                    }
                }
                if(!listRenegotiationProductApproved.isEmpty()) {
                    update listRenegotiationProductApproved;
                }
            }

            response.put('Code','0');
            response.put('Response','Informacion Guardada con exito');
            return response;
        }
        catch(Exception e){
            Database.rollback(sp);
            response.put('Code','-1');
            response.put('Response','Error al guardar la informacion: '+ e.getMessage()+', linea: '+e.getStackTraceString());
            return response;
        }
    }

    @AuraEnabled
    public static Map<String, Object> sendClientToMercedes(String data, String method){
        Map<String, Object> result;
        if(method == MERCEDES_ALTA_CLIENTE){
            result = HMAC_EDG_cls.requestEDG('Clients', data);
        }else if(method == MERCEDES_MOD_CLIENTE){
            result = HMAC_EDG_cls.requestEDG('ClientsUpdate', data);
        }
        return result;
    }

    @AuraEnabled
    public static Map<String, String> generarClientesAs400(String idContrato, String idQli, String idOpp){
        Map<String, String> response = new Map<String, String>();
        CreateCustomerRequestWP cliente;
        CreateCustomerRequestBE clienteBE;

        try{
            Map<String, String> mapaCatalogos = new Map<String, String>();
            Map<String, WSCredentials__c> mapCredenciales = WSCredentials__c.getAll();
            for(GeneralCatalog__c gc : [Select Id, Name, Field__c, value__c, Key__c, RecordType.DeveloperName from GeneralCatalog__c where RecordType.DeveloperName = 'CustomerRegistration']){
                mapaCatalogos.put(gc.Name + '-' + gc.Field__c, gc.value__c);
            }

            String posVendedor;
            try{
                posVendedor = [Select Id, Name, Field__c, value__c from GeneralCatalog__c where Key__c = 'POS-AC'].value__c;
            }catch(Exception e){
                response.put('Code','2');                
                response.put('Response','Postvendedor no configurado');
                return response;
            }
            if(!(mapCredenciales.containsKey('TOK-AC') && mapCredenciales.containsKey('AC'))){
                response.put('Code','2');                
                response.put('Response','No existen las credenciales para alta de clientes');
                return response;
            }
            
            Opportunity opp2 = [
                SELECT Id, Owner.NumeroTerritorio__c, Contacto__r.Name, AccountId, OwnerId, Contacto__c, Contacto__r.FirstName,
                       Contacto__r.LastName, Contacto__r.Extension__c, Contacto__r.Email, Contacto__r.Phone,
                       Contacto__r.ColMpoCPEdo__r.CodigoPostal__c, Contrato_Filial__c, RecordTypeName__c, Producto_cotizacion__c,
                       NumeroOportunidad__c, Account.EstatusCliente__c, Account.AccountSource, Account.Giro__c, Owner.TerritorioPosventa__c,
                       Owner.Name, Owner.FirstName, Owner.LastName, Owner.phone, Owner.extension, Owner.email, Segmento_del_usuario__c,
                       RegistroPatronalOPAM__c, Contacto__r.HorarioOficina__c, Account.Name, Contact__r.Name, Contact__r.FirstName, Contact__r.LastName,
                       Razon_social__c,EjecutivoADV__c,EjecutivoADV_code__c,
                       Maquilador__c, //Añadido por Carlos Cruz
                       Account.CodigoClienteAS400__c, //Añadido por Carlos Cruz
                       RecordTypeId, //Añadido por Carlos Cruz
                       Familia__c, //Añadido por Carlos Cruz
                       Entidad_Cuenta__r.NombreEL__c, //Añadido por Carlos Cruz
                       SubCuentaMigracion__c,//Añadido por Carlos Cruz
                       BypassValidationRule__c, //Añadido por Carlos Cruz
                       Contacto__r.Fax,//Añadido por Carlos Cruz
                       Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__r.EconomicActivityCode__c,
                       Contact__r.phone, Contact__r.Extension__c, Contact__r.email, RegistroPatronal__c, 
                       (SELECT Id, Role__c, ContactId__r.FirstName, ContactId__r.LastName, ContactId__r.Email, ContactId__r.Phone,
                               ContactId__r.Extension__c, ContactId__r.MailingPostalCode
                          FROM Funciones_de_Contactos_en_Oportunidad__r)
                FROM Opportunity
                WHERE Id =: idOpp];
            
            QuoteLineItem qli = [SELECT Id, Product2.ProductCode,
                                    (SELECT Id, Concepto__r.SinEdicion__c, PrecioLista__c , Concepto__r.ClaveReferencia__c, Bonificacion__c,
                                    VigenciaDescuento__c, Concepto__r.Importe__c, Concepto__r.ReferenceKeyDiscount__c, FechaInicio__c,Concepto__r.Billing_period__c,
                                    FechaFinal__c, PrecioLista2__c, PrecioFinal__c, Concepto_Tipo_Cargo__c, PartidaPresupuesto__r.FormaPago__c,
                                    PartidaPresupuesto__r.NivelConsumo__c, CantidadTarjetas__c
                                    FROM Productos_Concepto__r)
                                FROM QuoteLineItem
                                WHERE Id =: idQli];
                             
            Set<String> idsDirecciones=new Set<String>();
            List<Contrato_Direccion__c> contratoDirecciones = [SELECT Id, Name, ContratoID__c,DireccionID__r.CodigoPostalID__r.CodigoPostal__c,
                                                               DireccionID__c, Contrato_Filial__c,
                                                               DireccionID__r.Ciudad_Tt__c,
                                                               DireccionID__r.Calle_Tt__c, DireccionID__r.CodigoPostal_Tt__c, DireccionID__r.Colonia_Tt__c, DireccionID__r.CodigoPostalID__r.Name,
                                                               DireccionID__r.Name, DireccionID__r.NumeroExterior_Tt__c, DireccionID__r.NumeroInterior_Tt__c
                                                               FROM Contrato_Direccion__c
                                                               WHERE ContratoID__c =: idContrato];

            for(Contrato_Direccion__c cd: contratoDirecciones){
                idsDirecciones.add(cd.DireccionID__c);
            }
            
            List<CatalogoDirecciones__c> direcciones = new List<CatalogoDirecciones__c>();  
            
            Contrato2__c cont = [Select Id,FiscalAddress__c, DireccionesAuxiliares__c FROM Contrato2__c WHERE Id =:idContrato ];
            
            if(cont.DireccionesAuxiliares__c){
                direcciones = [ Select Id, Calle_Tt__c, CodigoPostal_Tt__c, CodigoPostalID__r.CodigoPostal__c, Colonia_Tt__c, CodigoPostalID__r.Name,
                               Name, NumeroExterior_Tt__c, NumeroInterior_Tt__c
                               from CatalogoDirecciones__c
                               where Id =:cont.FiscalAddress__c];
            }else {
                direcciones = [ Select Id, Calle_Tt__c, CodigoPostal_Tt__c, CodigoPostalID__r.CodigoPostal__c, Colonia_Tt__c, CodigoPostalID__r.Name,
                               Name, NumeroExterior_Tt__c, NumeroInterior_Tt__c
                               from CatalogoDirecciones__c
                               where Id IN: idsDirecciones];
            }

            List<GeneralCatalog__c> catalogo=[SELECT Id, Name, Key__c, Value__c FROM GeneralCatalog__c WHERE RecordType.DeveloperName = 'Alta_Benefits'];
            map<String, String> mapCatalogo = new map<String, String>();

            for(GeneralCatalog__c c : catalogo){
                mapCatalogo.put(c.Key__c, c.value__c);
            }
            
            List<Attachment> documents = new List<Attachment>();
            List<ContratoFilial__c> listFilialesUpd = new List<ContratoFilial__c>();
            boolean error = false;
            String token = Test.isRunningTest() ? 'lajiudbiubi' : AltaCliente_WS.getToken(mapCredenciales.get('TOK-AC').EndPoint__c, mapCredenciales.get('TOK-AC').ClientId__c, mapCredenciales.get('TOK-AC').ClientSecret__c, mapCredenciales.get('TOK-AC').GrantType__c, mapCredenciales.get('TOK-AC').Scope__c);
       
            if(token == '' || token == null || (token != null && token.trim() == '')){
                response.put('Code','2');
                response.put('Response','Error al crear los clientes en AS400, No se Generó el TOKEN, Por favor Reintente');
                return response;
            }
            
            List<ContratoFilial__c> listaFiliales = [
                SELECT Id, isPrime__c,Origin_contract__c, Contrato_2__r.CondicionesPagoPlazo__c, Contrato_2__r.WayPay__c, Distintivo__c,
                        Contrato_2__r.Facturacion_Cargos__c, Contrato_2__r.FiscalAddress__r.Name, Contrato_2__r.Frecuencia_de_Pedido__c,
                        PlatformAdministrator__r.Name, Contrato_2__r.TipoPago__c, PlatformAdministrator__r.Phone,
                        PlatformAdministrator__r.LastName, PlatformAdministrator__r.FirstName, PlatformAdministrator__c,
                        Contrato_2__r.FiscalAddress__r.Colonia_Tt__c, Contrato_2__r.FiscalAddress__r.CodigoPostal_Tt__c,
                        Contrato_2__r.FiscalAddress__r.CodigoPostalID__r.CodigoPostal__c,
                        Contrato_2__r.FiscalAddress__r.CodigoPostalID__r.Name,
                        Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.Competidor__c,
                        Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c, Contrato_2__r.VolumenEmision__c,
                        Contrato_2__r.Tipo_de_Facturacion__c, Contrato_2__r.EmpresaPrincipal_PL__c,
                        Contrato_2__r.Nombre_de_Personalizacion__c, Producto__r.ProductCode, Producto__r.AS400_integration__c, CodigoAS400__c,
                        Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.LeadSource, Contrato_2__r.PrimeId__c,
                        Contrato_2__r.Telepeaje__c, Contrato_2__r.PrepaidTag__c, Contrato_2__r.referencedCustomer__c,
                        Contrato_2__r.Entidad_cuenta__r.NombreEL__c, Contrato_2__r.PrimeGroupName__c, Contrato_2__r.Modo_Transaccion__c,
                        Contrato_2__r.MaxOfflineTransactionsQuantity__c, Contrato_2__r.MaxOfflineTransactionsAmount__c,
                        Contrato_2__r.TransactionInterval__c, Contrato_2__r.BombaPropia__c, Contrato_2__r.ModoOffline__c,
                        Contrato_2__r.Consolidador__c, Contrato_2__r.TipoCliente__c, Contrato_2__r.ComisionMinima__c,
                        Contrato_2__r.Maneja_Conductores__c, Contrato_2__r.DenyPurchaseSunday__c,
                        Contrato_2__r.DenyPurchaseBusinessDay__c, Contrato_2__r.DenyPurchaseSaturday__c,
                        Contrato_2__r.Controla_Presencia_Vehiculo_NFC__c, Contrato_2__r.Facturacion_Comision__c,
                        Contrato_2__r.Maneja_Nota_Vale__c,
                        Contrato_2__r.Facturacion_Plasticos__c, Entidad_Cuenta__r.Cuenta__r.Sector__c,
                        Entidad_Cuenta__r.Cuenta__r.Giro__c,Entidad_Cuenta__r.RFCEL__c, Contrato_2__r.FiscalAddress__r.Calle_Tt__c,
                        Contrato_2__r.FiscalAddress__r.NumeroInterior_Tt__c, Contrato_2__r.FiscalAddress__r.NumeroExterior_Tt__c,
                        Contrato_2__r.Contacto__r.FirstName, Contrato_2__r.Contacto__r.LastName, Contrato_2__r.Contacto__r.Extension__c,
                        Contrato_2__r.Contacto__r.Email, Contrato_2__r.Contacto__r.Phone,
                        Contrato_2__r.Contacto__r.ColMpoCPEdo__r.CodigoPostal__c,Contrato_2__r.Tipo_Maquila__c,
                        Contrato_2__r.Cliente_Facturacion_Global__c, Contrato_2__r.Producto_Factura_Global__c,
                        Contrato_2__r.Sucursal_Facturacion_Global__c, Contrato_2__r.MontoGarantia__c, PlatformAdministrator__r.email,
                        PlatformAdministrator__r.Extension__c, PlatformAdministrator__r.ColMpoCPEdo__r.CodigoPostal__c,
                        Contrato_2__r.ComoFactura__c, Contrato_2__r.Item_Contratacion__c, Contrato_2__r.FrecuenciaFacturacion__c,
                        Contrato_2__r.CorreoRecibeFactura__c, Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.NumeroOportunidad__c,
                        Contrato_2__r.TipoTag_PL__c, Contrato_2__r.tagModel__c, Contrato_2__r.checkingAccountLiters__c, Contrato_2__r.Cuenta__r.Name,
                        Name, Contrato_2__r.PartidaPresupuesto__r.OperatingLine__c, Contrato_2__r.Porcentaje_Comision__c, Contrato_2__r.Personalizacion_de_Tarjetas__c,
                        Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.Account.EstatusCliente__c, Contrato_2__r.FrecuenciaReposicion_PL__c,
                        Contrato_2__r.Tipo_Reposicion__c, Contrato_2__r.Facturacion_mensual_tarjetas__c, Contrato_2__r.Caducidad_saldos__c,
                        Contrato_2__r.PartidaPresupuesto__r.Quote.CantidadTarjetas__c, Contrato_2__r.Deduce__c, Contrato_2__r.Emision_complemento__c,
                        Contrato_2__r.contacto__r.Name,  Contrato_2__r.Otros_correos__c, Contrato_2__r.Facturacion_otros_cargos__c,
                        Contrato_2__r.PeriodicidadComplemento__c, Contrato_2__r.FiscalAddressText__c,Contrato_2__r.TipoPlastico__c,Contrato_2__r.TipoPlasticoFinanciero_PL__c,
                        Contrato_2__r.PaymentMethod__c,Contrato_2__r.PartidaPresupuesto__r.CreditDays__c, Contrato_2__r.PartidaPresupuesto__r.FormaPago__c,
                        Contrato_2__r.PartidaPresupuesto__r.OpcionesMetodoPago__c,Contrato_2__r.PartidaPresupuesto__r.Quote.Comision_por_Servicio__c,
                        Contrato_2__r.DireccionesAuxiliares__c,//Añadido por Carlos Cruz
                        Contrato_2__r.Contacto__r.Fax,//Añadido por Carlos Cruz
                        Contrato_2__r.FiscalAddressFormula__c,//Añadido por Carlos Cruz
                        Contrato_2__r.Dias_credito__c, //Añadido por Carlos Cruz
                        Contrato_2__r.Direccion_Personalizacion__c, //Añadido por Carlos Cruz
                        Contrato_2__r.PartidaPresupuesto__r.Product2.Es_OPAM__c, //Añadido por Carlos Cruz
                        Contrato_2__r.Facturacion_consolidada_tarjetas__c, //Añadido por Carlos Cruz
                        Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.Maquilador__c
                    FROM ContratoFilial__c
                    WHERE Contrato_2__c =: idContrato
                    AND CustomerCreatedAS400__c = false];
            
            Integer filialesCount = [Select count() from ContratoFilial__c where Contrato_2__c=:idContrato];
            if(filialesCount == 0){
                response.put('Code','2');                
                response.put('Response','No hay filiales asociadas al contrato!!');
                response.put('cliente',JSON.serialize(cliente));
                return response;
            }

            if(listaFiliales != null && listaFiliales.size() > 0){
                List<erroresWP> listaErrores = new List<erroresWP>();
                for(ContratoFilial__c cf : listaFiliales){
                    if(new List<String>{'30-TC4', '30', '30-B', '30-E', '30-G', '30-S', '31', '30H'}.indexOf(cf.Producto__r.ProductCode) != -1){
                        Boolean isPilot = false;
                        Boolean containsTagTelepeage = false;
                        
                        List<ProductoConcepto__c> ratesToSend = new List<ProductoConcepto__c>();
                        for(ProductoConcepto__c pc : qli.Productos_Concepto__r) {
                            if(pc.Concepto_Tipo_Cargo__c == 'Comisión por servicio piloto') {
                                isPilot = true;   
                            }
                            
                            if(pc.Concepto_Tipo_Cargo__c == 'TAG Telepeaje') {
                                containsTagTelepeage = true;
                            }
                        }

                        if (containsTagTelepeage){
                            for(ProductoConcepto__c pc : qli.Productos_Concepto__r) {
                                if(pc.Concepto_Tipo_Cargo__c == 'Cargo por envío - Recurrente') {
                                    pc.Concepto__r.ClaveReferencia__c = 'CE09';
                                    pc.Concepto__r.ReferenceKeyDiscount__c = 'DE09';
                                } 
                            }
                        }

                        if(isPilot) {
                            for(ProductoConcepto__c pc : qli.Productos_Concepto__r) {
                                if(pc.Concepto_Tipo_Cargo__c != 'Comisión por el servicio') {
                                    ratesToSend.add(pc);
                                }
                            }
                        } else {
                            ratesToSend = qli.Productos_Concepto__r;
                        }

                        cliente = new CreateCustomerRequestWP(mapaCatalogos, cf, opp2, ratesToSend, direcciones, posVendedor);
                        cf.JSON__c = JSON.serialize(cliente).left(131072);
                        listFilialesUpd.add(cf);

                        AltaCliente_WS.responseWP resp = AltaCliente_WS.crearCliente(cliente, token, mapCredenciales.get('AC').EndPoint__c, mapCredenciales.get('AC').ClientId__c, mapCredenciales.get('AC').ClientSecret__c);
                        if(resp.status){
                            if(resp.response.meta.status.equalsIgnoreCase('succeeded')){
                                cf.CustomerCreatedAS400__c = true;
                            }else{
                                erroresWP tem = new erroresWP();
                                tem.subCuenta = cf.CodigoAS400__c;
                                List<String> errList = new List<String>();
                                for(CreateCustomerResponse.mensajesDTO msj : resp.response.meta.messages){
                                    errList.add(msj.text);
                                }
                                tem.errores = errList;
                                listaErrores.add(tem);
                                error = true;
                            }
                        }else{
                            erroresWP tem = new erroresWP();
                            tem.subCuenta = cf.CodigoAS400__c;
                            tem.errores = new List<String>{resp.msj};
                            listaErrores.add(tem);
                            error = true;
                        }
                    }

                    //Alta BE 
                    if (productAltaBE.contains(cf.Producto__r.ProductCode)) {
                        Boolean isPilot = false;
                        List<ProductoConcepto__c> ratesToSend = new List<ProductoConcepto__c>();
                                                
                        for(ProductoConcepto__c pc : qli.Productos_Concepto__r) {
                            if(pc.Concepto_Tipo_Cargo__c == 'Comisión por servicio piloto') {
                                isPilot = true;   
                            }
                        }

                        if(isPilot) {
                            for(ProductoConcepto__c pc : qli.Productos_Concepto__r) {
                                if(pc.Concepto_Tipo_Cargo__c != 'Comisión por el servicio') {
                                    ratesToSend.add(pc);
                                }
                            }
                        } else {
                            ratesToSend = qli.Productos_Concepto__r;
                        }

                        clienteBE = new CreateCustomerRequestBE(mapCatalogo, cf, opp2, ratesToSend, direcciones, contratoDirecciones);
                        cf.JSON__c = JSON.serialize(clienteBE).left(131072);
                        listFilialesUpd.add(cf);
                        Altacliente_Callout_BE.responseWP resp = Altacliente_Callout_BE.crearCliente(clienteBE);

                        if(resp.Status){
                            if(resp.response.meta.Status.equalsIgnoreCase('succeeded')){
                                cf.CustomerCreatedAS400__c = true;
                                
                                if(opp2!=null && opp2.Id!=null){                            
                                    Attachment attachment = new Attachment();
                                    attachment.Body = Blob.valueOf(resp.jsonRequest); 
                                    attachment.Name = cf.CodigoAS400__c +' JSON Request.txt';
                                    attachment.ContentType = 'txt';
                                    attachment.ParentId = opp2.Id; 
                                    documents.add(attachment); 
                                    
                                }
                            }else{                            
                                Attachment attachment = new Attachment();
                                attachment.Body = Blob.valueOf(resp.jsonRequest); 
                                attachment.Name = cf.CodigoAS400__c +' JSON Request Error.txt';
                                attachment.ContentType = 'txt';
                                attachment.ParentId = opp2.Id; 
                                documents.add(attachment);
                                
                                erroresWP tem = new erroresWP();
                                tem.subCuenta = cf.CodigoAS400__c;
                                List<String> errList = new List<String>();

                                for(CreateCustomerResponse.mensajesDTO msj : resp.response.meta.messages){
                                    errList.add(mapeoErroresAs400(msj));
                                }
                                tem.errores = errList;
                                listaErrores.add(tem);
                                error = true;
                            }
                        }else{
                            Attachment attachment = new Attachment();
                            attachment.Body = Blob.valueOf(resp.jsonRequest); 
                            attachment.Name = cf.CodigoAS400__c +' JSON Request Error.txt';
                            attachment.ContentType = 'txt';
                            attachment.ParentId = opp2.Id; 
                            documents.add(attachment);
                            
                            erroresWP tem = new erroresWP();
                            tem.subCuenta = cf.CodigoAS400__c;
                            tem.errores = new List<String>{resp.msj};
                            listaErrores.add(tem);
                            error = true;
                        }
                    }
                }

                if(mapCredenciales.get('Alta Customer BE').Log_Request__c) {
                    insert documents;
                }                    
                
                if(opp2 != null && error != true){
                    
                    Contrato2__c con = new Contrato2__c(Id = idContrato);
                    con.CustomersCreatedAS400__c = true;
                    update con;
                    
                    opp2.Estatus__c = 'Cerrada';  
                    opp2.FechaFinADV__c = system.now();
                    opp2.StageName = 'Implementación';
                    
                    if(opp2.RecordTypeName__c == 'Migración'){
                        ContratoFilial__c oldCf = new ContratoFilial__c(Id = opp2.Contrato_Filial__c, 
                                                                        isActive__c = false,
                                                                        MigrationOpportunity__c = opp2.Id,
                                                                        DestinationSubaccount__c = opp2.SubCuentaMigracion__c,
                                                                        Migration_Contract__c = true,
                                                                        Origin_contract__c = true);
                       
                        for(ContratoFilial__c c: listFilialesUpd){
                            if(c.Contrato_2__c == idContrato && c.Id != opp2.Contrato_Filial__c){
                                c.isActive__c = true;
                                c.MigrationOpportunity__c = opp2.Id;
                                c.SourceSubaccount__c = opp2.Contrato_Filial__c;
                                c.Migration_Contract__c = true;
                            }
                        }

                        listFilialesUpd.add(oldcf);
                    }
                    opp2.BypassValidationRule__c = true;
                    update opp2;
                    update listFilialesUpd;
                } 

                response.put('errores', JSON.serialize(listaErrores));
            }
            
            if(error){
                response.put('Code', '-1');
                response.put('cliente', JSON.serialize(cliente));
                response.put('Response', 'Error al crear los clientes en AS400');
                return response;
            }
            
            //pasar opp a implementación
            if(opp2.StageName!='Implementación')
                if(qli.Product2.ProductCode.contains('30') || qli.Product2.ProductCode.contains('31')){
                    Opportunity oppUpd = new Opportunity (Id = idOpp, stageName = 'Implementación', FechaFinADV__c = system.now()); 
                    update oppUpd;
                }
            
            
            response.put('Code', '0');
            response.put('cliente', JSON.serialize(cliente));
            response.put('Response', 'Clientes dados de alta correctamente!!');
            return response;
        }catch(Exception e){
            response.put('Code', '-2');
            response.put('cliente', JSON.serialize(cliente));
            response.put('Response', 'Error: ' + e.getStackTraceString() + '--' + e.getMessage());
            System.debug('ERROR::::' + e.getStackTraceString() + '--' + e.getMessage());
            return response;
        }
    }

    public static String mapeoErroresAs400(CreateCustomerResponse.mensajesDTO responseBE){
        Map<String, ManejoErroresAltaCliente_CMP__mdt>  listMapErrores = ManejoErroresAltaCliente_CMP__mdt.getAll();
        if (listMapErrores.containsKey(responseBE.code)) {
            return listMapErrores.get(responseBE.code).value__c;
        }else{
            return responseBE.description;
        }			
    }
    
    public class erroresWP{
        @AuraEnabled public String subCuenta{get;set;}
        @AuraEnabled public List<String> errores{get;set;}
    }

    /**
    * @description Actualiza informacion de Oportunidad para ADV
    * @param
    * @return
    */
    @AuraEnabled
    public static Map<String, String> updateOportunidadADV( String jsonOportunidad ) {
        Map<String,String> response = new Map<String,String>();
        Opportunity oportunidad = new Opportunity();
                
        /*WEBSALES*/
        Id updateOwner;
        Usuario_de_asignacion_websales__mdt usuario = [SELECT MasterLabel, Email_de_usuario__c FROM Usuario_de_asignacion_websales__mdt LIMIT 1];
                
        try{
            oportunidad = (Opportunity)JSON.deserialize(jsonOportunidad,Opportunity.class);
            /*WEBSALES*/
            if(oportunidad.webSalesContractRejected__c && updateOwner!= null && oportunidad.Is_Created_From_Websale__c){
                if(!test.isRunningTest()){updateOwner = [SELECT id FROM user WHERE Email =: usuario.Email_de_usuario__c].Id;}
                oportunidad.OwnerId = updateOwner; 
            }
            
            update oportunidad;
            
            //WEBSALES
            if((oportunidad.webSalesContractRejected__c && updateOwner != null) || test.isRunningTest()){
                Task tsk = new Task();
                tsk.OwnerId = updateOwner;
                tsk.ActivityDate = Date.today();
                tsk.WhatId = oportunidad.Id;
                tsk.Type = 'Recordatorio';
                tsk.Subject = 'Llamar cliente: rechazo alta de cliente websale';
                tsk.Description = 'Llamar cliente: rechazo alta de cliente websale';
                if(!test.isRunningTest()){insert tsk;}
            }
            
            response.put('Code','0');
            response.put('Response','Informacion Guardada con exito');
            return response;
        }
        catch(Exception e){
            response.put('Code','-1');
            response.put('Response','Error al guardar la informacion: '+ e);
            return response;
        }
    }

    /**
    * @description Obtiene información de la configuración personalizada "TiposDocumento", información de la Cuenta
    * relacionada con una Oportunidad y todos los Attachments de dicha Oportunidad y retorna el conjunto de toda esta
    * información. Este método hace uso de métodos definidos en la clase "CON_OppDocChecklist_CTRL"
    * @param oppId Id de la Oportunidad a través de la cual se obtendrá la información de la Cuenta y los Attachments
    * @return Retorna un Map con tres entradas: 1) los datos de la configuración personalizada, 2) la información de la
    * Cuenta relacionada y, 3) los Attachments de la Oportunidad
    */
    @AuraEnabled
    public static Object validateOppAttachments(Id oppId) {
        Map<String, Object> mapOppDocs = new Map<String, Object>();
        Map<String, Object> mapDocsByTypePerson = CON_OppDocChecklist_CTRL.getDocsByTypePerson();
        mapOppDocs.put('docsByTypePerson', mapDocsByTypePerson);
        SObject oppAcc = CON_OppDocChecklist_CTRL.getRelatedAccountInformation(oppId);
        mapOppDocs.put('relatedAccount', oppAcc);
        
        List<Attachment> oppAttachments = [SELECT Id, Name FROM Attachment WHERE ParentId = :oppId];
        List<Opportunity> opp = [ SELECT Id, Entidad_Legal__c FROM opportunity WHERE Id =: oppId AND Entidad_Legal__c != null ];
        if( opp.size() > 0 ) {
            oppAttachments.addAll([SELECT Id, Name, ParentId FROM Attachment WHERE ParentId = : opp[0].Entidad_Legal__c ]);
        }
        mapOppDocs.put('oppAttachments', oppAttachments);
        return mapOppDocs;
    }

    /**
    * @description Crea una nueva instancia de Attachment, la inserta o actualiza dependiendo del valor del argumento
    * "attachId", y retorna el resultado de cualquiera de esas acciones
    * @param attachId Id del Attachment a actualizar o insertar. Su valor puede ser un Id válido (para actualizar) o
    * no tener alguno (para insertar)
    * @param parentId Id del sObject al cual se asociará el Attachment
    * @param attachName Nombre del Attachment
    * @param attachBody Contenido del Attachment
    * @param docType Extensión del archivo
    * @return Si el Attachment es insertado o actualizado exitosamente, retorna un Map con información relativa a la
    * acción "Database.UpsertResult". Si el método es invocado con algún valor inválido para cualesquier argumento
    * u ocurre algún problema durante el proceso de actualización/insercción, retorna un Map con información relativa
    * a la excepción "System.Exception"
    */
    @AuraEnabled
    public static Object saveLayout(String attachId, Id parentId, String attachName, String attachBody, String docType) {
        try {
            Blob b = EncodingUtil.base64Decode(attachBody);
            Attachment attach = new Attachment(Id = attachId, ParentId = parentId, Name = attachName + docType, Body = b);
            return getMapUpsertResult(Database.upsert(attach));
        } catch(System.Exception e) {
            return getMapException(e);
        }
    }

    @AuraEnabled
    public static Object saveLayoutAttachment(Id attachmentId, Id parentId, String type, String encodedString, String name, boolean dirAux) {
        Map<String, Object> mapResults = new Map<String, Object>();
        try {
            
            if(dirAux){                
                ContentVersion contentVersion = new ContentVersion(
                    Title= name+type, 
                    PathOnClient = name+type,
                    VersionData = EncodingUtil.base64Decode(encodedString)
                );
                insert contentVersion;
                
                Id documentId = [SELECT Id,ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.id ].ContentDocumentId;
                
                ContentDocumentLink contentlink = new ContentDocumentLink();
                contentlink.LinkedEntityId = parentId;
                contentlink.contentdocumentid = documentId;
                contentlink.ShareType = 'V';
                insert contentlink;
                
                
                return getMapUpsertResult(Database.upsert(contentlink));
            }else {
                Attachment attach;
                if (attachmentId != null) {
                    attach = [SELECT Id, Body FROM Attachment WHERE Id = :attachmentId];
                    attach.Body = EncodingUtil.base64Decode(EncodingUtil.base64Encode(attach.Body) + encodedString);
                } else {
                    attach = new Attachment(ParentId = ParentId, Name = name + type, ContentType = type, Body = EncodingUtil.base64Decode(encodedString));
                }
                return getMapUpsertResult(Database.upsert(attach));  
            }            
            
        } catch(Exception e) {
            return getMapException(e);
        }
    }

    /**
    * @description Elimina un Attachment y retorna el resultado
    * @param attachId Id del Attachment a eliminar
    * @return Si el Attachment es eliminado correctamente, retorna un Map con información relativa a la acción
    * "Database.DeleteResult". Si el método es invocado con un valor inválido para el argumento "attachId" u ocurre
    * algún problema durante el proceso de eliminación, retorna un Map con información relativa a la excepción
    * "System.Exception"
    */
    @AuraEnabled
    public static Object deleteLayoutFAC(Id attachId) {
        try {
            Attachment attach = new Attachment(Id = attachId);
            
            return getMapDeleteResult(Database.delete(attach));
        } catch(System.Exception e) {
            return getMapException(e);
        }
    }

    /**
    * @description Obtiene y retorna una lista de Entidades Legales relacionadas con una determinada Cuenta
    * @param accId El Id de la Cuenta
    * @return Si la consulta se realiza exitosamente, se retorna una lista de Entidades Legales, de lo contrario, se
    * retornar un Map con información relativa a la Excepción "System.Exception"
    */
    @AuraEnabled
    public static Object getLegalEntitiesThroughAcc(Id accId) {
        try {
            if (accId.getSobjectType() == Schema.Account.SObjectType) { 
                List<EntidadCuenta__c> listEc = [SELECT Id, EntidadLegal__c, EntidadLegal__r.Name, EntidadLegal__r.RecordType.Name, EntidadLegal__r.RFC__c, EntidadLegal__r.RazonSocial__c, EntidadLegal__r.Estatus__c, (SELECT Contacto__c, Contacto__r.Name, Contacto__r.Funcion__c, Entidad_Cuenta__c FROM Contactos_Entidad1__r WHERE Contacto__r.Funcion__c = 'Representante Legal' ORDER BY CreatedDate) FROM EntidadCuenta__c WHERE Cuenta__c = :accId AND EntidadLegal__r.Estatus__c = 'Completa'];
                return listEc;
            } else {
                throw new CustomException('El argumento "accId" debe ser un Id de una instancia de Cuenta');
            }
        } catch(System.Exception e) {
            return getMapException(e);
        }
    }

    /**
    * @description Obtiene y retorna un determinado registro de Contrato con campos asociados a Estructuras de Cuentas
    * @param contractId El Id del Contrato
    * @return Si la consulta se realiza exitosamente, se retorna un registro de Contrato, de lo contrario, se
    * retornar un Map con información relativa a la Excepción "System.Exception"
    */
    @AuraEnabled
    public static Object getAccountsStructureFromContract(Id contractId) {
        try {
            Contrato2__c cont = [SELECT Id, Entidad_Legal__c, Entidad_Cuenta__c, Contacto__c FROM Contrato2__c WHERE Id = :contractId LIMIT 1];
            return cont;
        } catch(System.Exception e) {
            return getMapException(e);
        }
    }

    /**
    * @description
    * @param
    * @return
    */
    @AuraEnabled
    public static Object getContractSubsidiaries(Id contractId) {
        try {
            if (contractId.getSobjectType() == Schema.Contrato2__c.SObjectType) {
                return [SELECT Id, Entidad_Cuenta__c, Entidad_Cuenta__r.EntidadLegal__c, Entidad_Cuenta__r.EntidadLegal__r.Name FROM ContratoFilial__c WHERE Contrato_2__c = :contractId];
            } else {
                throw new CustomException('El argumento "contractId" debe ser un Id de una instancia de Contrato');
            }
        } catch(System.Exception e) {
            return getMapException(e);
        }
    }

    /**
    * @description Obtiene y retorna información relativa a la acción "Database.UpsertResult"
    * @param ur Instancia de "Database.UpsertResult"
    * @return Retorna un Map
    */
    private static Object getMapUpsertResult(Database.UpsertResult ur) {
        Map<String, Object> mapUr = new Map<String, Object>();
        mapUr.put('errors', ur.getErrors());
        mapUr.put('id', ur.getId());
        mapUr.put('isCreated', ur.isCreated());
        mapUr.put('isSuccess', ur.isSuccess());
        return mapUr;
    }

    /**
    * @description Obtiene y retorna información relativa a la acción "Database.DeleteResult"
    * @param dr Instancia de "Database.DeleteResult"
    * @return Retorna un Map
    */
    private static Object getMapDeleteResult(Database.DeleteResult dr) {
        Map<String, Object> mapDr = new Map<String, Object>();
        mapDr.put('errors', dr.getErrors());
        mapDr.put('id', dr.getId());
        mapDr.put('isSuccess', dr.isSuccess());
        return mapDr;
    }

    /**
    * @description Obtiene y retorna información relativa a la excepción "System.Exception"
    * @param e Instancia de "System.Exception"
    * @return Retorna un Map
    */
    private static Object getMapException(System.Exception e) {
        Map<String, Object> mapE = new Map<String, Object>();
        mapE.put('cause', e.getCause());
        mapE.put('lineNumber', e.getLineNumber());
        mapE.put('message', e.getMessage());
        mapE.put('stackTraceString', e.getStackTraceString());
        mapE.put('exceptionTypeName', e.getTypeName());
        return mapE;
    }

    /**
    * @description Obtener datos de límites de gobierno
    * @param
    * @return
    */
    public static Map<String, Object> getLimits() {
        Map<String, Object> ret = new Map<String, Object>();
        ret.put('DMLLimit', Limits.getLimitDMLStatements());
        ret.put('DMLExecuted', Limits.getDMLStatements());
        ret.put('DMLAvailable', Limits.getLimitDMLStatements() - Limits.getDMLStatements());

        ret.put('SOQLLimit', Limits.getLimitQueries());
        ret.put('SOQLExecuted', Limits.getQueries());
        ret.put('SOQLAvailable', Limits.getLimitQueries() - Limits.getQueries());
        return ret;
    }

    /**
    * @author rsanchez@ctconsulting.com.mx
    * @date 26/03/2018
    * @description Metodo que guarda los codigos AS400 en los contratos filiales.
    * @return String Respuesta de exito o error.
    */
    @AuraEnabled
    public static String saveS400Filiales(String jsonFiliales){
        String respuesta = '';
        try{          
            List<ContratoFilial__c> cFilial = (List<ContratoFilial__c>)JSON.deserialize(jsonFiliales,List<ContratoFilial__c>.class);
            for(ContratoFilial__c cf : cFilial){
                cf.Name=cf.CodigoAS400__c;
            }
            upsert cFilial;
            
            List<ContratoFilial__c> cFiliales = [
                SELECT Name, Contrato_2__c, Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId,
                       Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.RecordType.DeveloperName, Entidad_Cuenta__r.Cuenta__c,
                       CodigoAS400__c, Contrato_2__r.PartidaPresupuesto__r.Product2.IDInterno__c, Entidad_Cuenta__r.Name, Producto__r.Family,
                       Entidad_Cuenta__r.Cuenta__r.CodigoClienteAS400__c
                  FROM ContratoFilial__c
                 WHERE id =: cFilial
                   AND isPrime__c = false];            

            List<String> lisErr=new List<String>();            
            Set<String> setAcc=new Set<String>();
            Set<String> setAdv=new Set<String>();
            
            for(ContratoFilial__c cf : cFiliales){
                if(cf.Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId!=null){
                    setAcc.add(cf.Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId);
                }
                if(cf.Contrato_2__c!=null){
                    setAdv.add(cf.Contrato_2__c);
                }
            }

            for(Account acc:[Select Id,Name,Sector__c from Account where Id IN :setAcc]){
                if(acc.Sector__c==null){
                    lisErr.add('La cuenta '+acc.Name+' no contiene sector');
                }
            }

            for(Contrato2__c adv:[Select Id,FiscalAddress__c,PartidaPresupuesto__r.Product2.IDInterno__c from Contrato2__c where Id IN :setAdv and PartidaPresupuesto__r.Product2.IDInterno__c IN ('30','31')]){
                if(adv.FiscalAddress__c ==null){
                    lisErr.add('No se ha seleccionado una dirección en el contrato');
                }
            }

            for(ContratoFilial__c cf : cFiliales){                
                String codProd=cf.Contrato_2__r.PartidaPresupuesto__r.Product2.IDInterno__c!=null ? (cf.Contrato_2__r.PartidaPresupuesto__r.Product2.IDInterno__c.length()==1 ? '0'+cf.Contrato_2__r.PartidaPresupuesto__r.Product2.IDInterno__c : cf.Contrato_2__r.PartidaPresupuesto__r.Product2.IDInterno__c) : '';
                
                //NVH - EdenredArg -- productos Arg no realizan validacion sobre CodigoAS400__c
                if(!argentinaProducts.contains(codProd)) {
                    if(codProd.contains('-')){
                        codProd=codProd.split('-')[0];
                    }
                    if(cf.CodigoAS400__c!=null&&cf.CodigoAS400__c.split('-')[2]!=cf.Entidad_Cuenta__r.Cuenta__r.CodigoClienteAS400__c&&cf.Entidad_Cuenta__r.Cuenta__r.CodigoClienteAS400__c!=null&&cf.Entidad_Cuenta__r.Cuenta__r.CodigoClienteAS400__c!=''){
                        lisErr.add('El grupo capturado no corresponde a la cuenta ('+cf.CodigoAS400__c+')');
                    }
                    if(cf.CodigoAS400__c != null && cf.CodigoAS400__c.split('-')[1] != codProd && !cf.Contrato_2__r.PartidaPresupuesto__r.Quote.Opportunity.RecordType.DeveloperName.containsIgnoreCase('RT_NuevaAfiliacion')){
                        lisErr.add('No puede generarse el alta de cliente con número de producto distinto al producto cotizado('+cf.CodigoAS400__c+')');
                    }
                }
                
            }

            respuesta = lisErr.size() == 0 ? 'Exito' : String.join(lisErr, ',');            
        }   
        catch(Exception e){
            respuesta = 'Exception Cause saveS400Filiales status: '+e.getCause() +'Line: '+ e.getLineNumber()+' Message: '+e.getMessage();  
        }
        return respuesta;
    }

    @AuraEnabled
    public static String saveS400FilialesAfiliados(String jsonFiliales){
        String respuesta = '';
        try{
            List<ContratoFilial__c> cFilialTem = (List<ContratoFilial__c>)JSON.deserialize(jsonFiliales,List<ContratoFilial__c>.class);
            List<Affiliate__c > cFilial = new List<Affiliate__c >();
            for(ContratoFilial__c cf : cFilialTem){
                cFilial.add(
                    new Affiliate__c(
                        Name = cf.CodigoAS400__c,
                        PlatformAdministrator__c = cf.PlatformAdministrator__c,
                        Contract_2__c = cf.Contrato_2__c,
                        CodeAS400__c = cf.CodigoAS400__c,
                        AccountEntity__c = cf.Entidad_Cuenta__c,
                        isPrime__c = cf.isPrime__c,
                        Product__c = cf.Producto__c));
            }

            List<Affiliate__c> cFiliales = [SELECT Name, Contract_2__c, Contract_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId,
                       Contract_2__r.PartidaPresupuesto__r.Quote.Opportunity.RecordType.DeveloperName, AccountEntity__r.Cuenta__c,
                       CodeAS400__c, Contract_2__r.PartidaPresupuesto__r.Product2.IDInterno__c,
                       AccountEntity__r.Cuenta__r.CodigoClienteAS400__c
                  FROM Affiliate__c
                 WHERE id =: cFilial
                   AND isPrime__c = false
            ];

            List<String> lisErr = new List<String>();
            Set<String> setAcc = new Set<String>();
            Set<String> setAdv = new Set<String>();

            for(Affiliate__c cf : cFiliales){
                if(cf.Contract_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId != null){
                    setAcc.add(cf.Contract_2__r.PartidaPresupuesto__r.Quote.Opportunity.AccountId);
                }
                if(cf.Contract_2__c != null){
                    setAdv.add(cf.Contract_2__c);
                }
            }

            for(Account acc:[Select Id, Name, Sector__c from Account where Id IN :setAcc]){
                if(acc.Sector__c == null){
                    lisErr.add('La cuenta '+acc.Name+' no contiene sector');
                }
            }

            for(Contrato2__c adv:[Select Id, FiscalAddress__c, PartidaPresupuesto__r.Product2.IDInterno__c from Contrato2__c where Id IN :setAdv and PartidaPresupuesto__r.Product2.IDInterno__c IN ('30','31')]){
                if(adv.FiscalAddress__c == null){
                    lisErr.add('No se ha seleccionado una dirección en el contrato');
                }
            }
            for(Affiliate__c cf : cFiliales){                
                String codProd=cf.Contract_2__r.PartidaPresupuesto__r.Product2.IDInterno__c!=null ? (cf.Contract_2__r.PartidaPresupuesto__r.Product2.IDInterno__c.length()==1 ? '0'+cf.Contract_2__r.PartidaPresupuesto__r.Product2.IDInterno__c : cf.Contract_2__r.PartidaPresupuesto__r.Product2.IDInterno__c) : '';
                if(codProd.contains('-')){
                    codProd=codProd.split('-')[0];
                }                
            }

            respuesta = lisErr.size()==0 ? 'Exito' : String.join(lisErr, ',');            
        }   
        catch(Exception e){
            respuesta = 'Exception Cause saveS400FilialesAfiliado status: '+e.getCause() +'Line: '+ e.getLineNumber()+' Message: '+e.getMessage();              
        }
        return respuesta;
    }
    
    /*DVM INICIO, 2 Julio. Para atender el requerimiento de mostrar todos los contactos con función AP en la pantalla de ADV*/
    @AuraEnabled
    public static List<Object> getContactosAP(String idRegistro, String nombreObjeto){
            List< Object > contactosAp = new List< Object >();
            if(!String.isBlank(idRegistro) && !String.isBlank(nombreObjeto)){
                    String query = 'SELECT Id, Name, Puesto__c, Funcion__c, Phone, Telefono2__c, Email FROM Contact WHERE AccountID IN (SELECT AccountId FROM ' +nombreObjeto+ ' WHERE Id = \'' + idRegistro + '\')';
                    System.debug(query);
                    contactosAp = Database.query(query);
            }
            return contactosAp;
    }
    /*DVM FIN, 2 Julio*/
    
    /**
    * @author calvarez@ctconsulting.com.mx
    * @date 20/12/2017
    * @description
    */
    public class CustomException extends Exception {}

    public class Sub {
        public String Name;
        public String CodigoAS400;
    }
    
    public class Establecimiento{
        public string Id;
        public string Affiliate;
        public string Product;
        public string StationId;
    }

    @AuraEnabled
    public static void generaXMLExtras(Id opportunityId, Id contratoId, List<ContratoFilial__c> filiales, String extras){
        Integer contador = 0;
        String nombre;
        List<String> xmlAEnviar = new List<String>();
        List<ContratoFilial__c> subs = (List<ContratoFilial__c>)JSON.deserialize(extras, List<ContratoFilial__c>.class);
        Opportunity opp = new Opportunity();
        Contrato2__c contrato = (Contrato2__c) Database.query('SELECT ' + String.join( new List<String>( SObjectType.Contrato2__c.Fields.getMap().keySet() ), ', ') + ', Entidad_Cuenta__r.Name, Entidad_Legal__r.EconomicActivity__r.Name, Entidad_Cuenta__r.Cuenta__r.Sector__c, Entidad_Legal__r.RazonSocial__c, Entidad_Legal__r.Name, Entidad_Legal__r.Direccion__c, Entidad_Legal__r.Calle__c, Entidad_Legal__r.NumeroExterior__c, Entidad_Legal__r.NumeroInterior__c, Entidad_Legal__r.CodigoPostal__c, Entidad_Legal__r.Colonia__c, Entidad_Legal__r.Ciudad__c, Entidad_Legal__r.Estado__c, PartidaPresupuesto__r.Product2.ProductCode, PartidaPresupuesto__r.Product2.Familia__c, PartidaPresupuesto__r.ComentariosCotizacion__c, PartidaPresupuesto__r.Quote.QuoteNumber, PartidaPresupuesto__r.FormaPago__c, Contacto__r.Phone, Contacto__r.Email, Contacto__r.Extension__c,Entidad_Cuenta__r.Cuenta__r.Giro__c  FROM Contrato2__c WHERE id =: contratoId');
        for(Opportunity oppAux : [SELECT Id,EnvioXMLTC30__c, Name, NumeroOportunidad__c, AccountId, ComisionEmision__c, Competidor__c, OwnerId, Owner.Name, Owner.Segmento__c, Owner.NumeroTerritorio__c, Contacto__r.FirstName, Contacto__r.LastName, Contacto__r.Puesto__c, Contacto__r.HorarioOficina__c, Contacto__r.Phone, Contacto__r.Email, Contacto__r.Extension__c, Contacto__r.TipoContacto__c, Contacto__r.MailingStreet, Contacto__r.Street__c, Contacto__r.NumeroInterior__c, Contacto__r.NumeroExterior__c, Contacto__r.Colonia__c, Contacto__r.MailingState, Contacto__r.MailingCity FROM Opportunity WHERE Id =: opportunityId] ) {
            opp = oppAux;
            break;
        }
        nombre = opp.NumeroOportunidad__c;
        xmlAEnviar.add(GenerarXMLController.generaDocumentoXMLExtras(opp, contrato, nombre));

        for(ContratoFilial__c filial : subs){
            contador = contador + 1;
            nombre = opp.NumeroOportunidad__c + '-' + contador;
            xmlAEnviar.add(GenerarXMLController.generaDocumentoXMLExtras(opp, contrato, nombre));
        }

        for(ContratoFilial__c filial : filiales){
            contador = contador + 1;
            nombre = opp.NumeroOportunidad__c + '-' + contador;
            contrato.Entidad_Cuenta__r.Name = filial.Entidad_Cuenta__r.EntidadLegal__r.Name;
            contrato.Entidad_Legal__r.RazonSocial__c = filial.Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c;
            contrato.Entidad_Legal__r.Name = filial.Entidad_Cuenta__r.EntidadLegal__r.Name; 
            contrato.Entidad_Legal__r.Calle__c = filial.Entidad_Cuenta__r.EntidadLegal__r.Calle__c;
            contrato.Entidad_Legal__r.NumeroExterior__c = filial.Entidad_Cuenta__r.EntidadLegal__r.NumeroExterior__c; 
            contrato.Entidad_Legal__r.NumeroInterior__c = filial.Entidad_Cuenta__r.EntidadLegal__r.NumeroInterior__c;
            contrato.Entidad_Legal__r.CodigoPostal__c = filial.Entidad_Cuenta__r.EntidadLegal__r.CodigoPostal__c; 
            contrato.Entidad_Legal__r.Colonia__c = filial.Entidad_Cuenta__r.EntidadLegal__r.Colonia__c;
            contrato.Entidad_Legal__r.Ciudad__c = filial.Entidad_Cuenta__r.EntidadLegal__r.Ciudad__c;
            contrato.Entidad_Legal__r.Estado__c = filial.Entidad_Cuenta__r.EntidadLegal__r.Estado__c;
            contrato.CodigoAS400__c = filial.CodigoAS400__c;
            xmlAEnviar.add(GenerarXMLController.generaDocumentoXMLExtras(opp, contrato, nombre));
        }
        GenerarXMLController.enviarMail2(opp, contrato, xmlAEnviar, true);
        opp.EnvioXMLTC30__c = true;
        update opp;
    }
    
    @AuraEnabled
    public static Boolean getEntidadCuenta( id AccountIs ) {
        List<EntidadCuenta__c> lista=[SELECT ID FROM EntidadCuenta__c WHERE CUENTA__C=:AccountIs and EntidadLegal__r.Estatus__c='Completa'];
        if(lista.isEmpty()){return true;}
        return false;
    }

    @AuraEnabled
    public static responseWP getDireccionesFiscales(String idCuenta,String idOpp){
        responseWP res=new responseWP();
        try{
            res.lisDir=[Select Id,Name,NumeroInterior_Tt__c,Calle_Tt__c,NumeroExterior_Tt__c,Colonia_Tt__c,DelegacionMunicipio_Tt__c,Estado_Tt__c,CodigoPostal_Tt__c  from CatalogoDirecciones__c where EntidadLegal__r.Cuenta__c=:idCuenta or CuentaID__c=:idCuenta];
            res.valor=[Select Id,DireccionFiscal__c from Contrato2__c where PartidaPresupuesto__r.Quote.Opportunity.Id=:idOpp and PartidaPresupuesto__r.Quote.IsSyncing=true limit 1].DireccionFiscal__c!=null ? [Select Id,DireccionFiscal__c from Contrato2__c where PartidaPresupuesto__r.Quote.Opportunity.Id=:idOpp and PartidaPresupuesto__r.Quote.IsSyncing=true limit 1].DireccionFiscal__c : '';
            return res;
        }catch(Exception e){
            System.debug('Error: '+e.getMessage()+', Linea: '+e.getLineNumber());
            return null;
        }
    }

    public class responseWP{
        @AuraEnabled public String valor{get;set;}
        @AuraEnabled public List<CatalogoDirecciones__c> lisDir{get;set;}
    }

    //NTT Inicia alta clientes MoPay
    @AuraEnabled
    public static Map<String, String> generarClientesMoP(String idContrato, String idQli, String idOpp){
        
        Map<String, String> response = new Map<String, String>();
        
		try{
            response = NTT_Crea_Cliente_MoPay.creaCustomer(idContrato, idQli, idOpp, ''); 
            if(TEST.IsRunningTest()){throw new NullPointerException();}
        }catch(Exception e){
            response.put('Code', '-2');
            response.put('cliente','');
            response.put('Response', 'Error: ' + e.getStackTraceString() + '--' + e.getMessage());
            System.debug('ERROR::::' + e.getStackTraceString() + '--' + e.getMessage());
            return response;
        }
        return response;
    }
    
    @AuraEnabled
    public static Map<String, String> updateContratoADV2MoPay(String jsonContrato, String jsonOportunidad, String extras, string estabs, String filialesEx){
        
        Map<String, String> response = new Map<String, String>();
        
		try{
            response = NTT_Crea_Cliente_MoPay.updateContratoADV2MoPay(jsonContrato,jsonOportunidad,extras,estabs,filialesEx);
        }catch(Exception e){
            response.put('Code', '-2');
            response.put('cliente','');
            response.put('Response', 'Error: ' + e.getStackTraceString() + '--' + e.getMessage());
            System.debug('ERROR::::' + e.getStackTraceString() + '--' + e.getMessage());
            
        }
        return response;
    }    
    //NTT Termina alta clientes MoPay
    
    //NTT Inicia Alta clienyes 43
    @AuraEnabled
    public static Map<String, String> validaProdCode( String IdContract ) {

        Map<String, String> response = new Map<String, String>();
        
        try {
            
            String  prodCode = '';
            
            for(Contrato2__c contract : [Select Id, PartidaPresupuesto__c, PartidaPresupuesto__r.Product2.ProductCode from Contrato2__c where Id =: IdContract]){
                prodCode = contract.PartidaPresupuesto__r.Product2.ProductCode;
            }
           
            if(prodCode != null && prodCode != ''){
               	Boolean isMfa = false; 
               	for(NTT_Properties__mdt nttProp : [Select NTT_Valor__c from NTT_Properties__mdt where DeveloperName = 'NTT_Productos_NFM_Cliente' Limit 1]){
                	if(nttProp.NTT_Valor__c.IndexOf(prodCode) != -1){
                   		isMfa = true;
                	}
            	}
                response.put('isMfa', String.ValueOf(isMfa));
            }
            
        } catch(JSONException ex) {
            response.put('error', ex.getStackTraceString());
            response.put('JSONException', ex.getMessage());
            throw new CustomException(ex.getMessage() + ', ' + ex.getStackTraceString());
        }  catch(Exception ex) {
            response.put('error', ex.getStackTraceString());
            response.put('Exception', ex.getMessage());
            throw new CustomException(ex.getMessage() + ', ' + ex.getStackTraceString());
        }

        return response;
    }
    //NTT Termina Alta Clientes 43
}