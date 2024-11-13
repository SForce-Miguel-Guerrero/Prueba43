/**
* @author calvarez@ctconsulting.com.mx
* @date 2018
* @description Controlador utilizado como servicio para cotizador.
*/
/**
* ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
* @change       28/02/2020 Add opp validaction activation or deactivation with OpportunityAndThreatValidation__mdt.
* ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/

global without sharing class PLAN_CuentaService {

    public QuoteLineItem qli {get; set;}
    public static string OppRecordType {get; set;}
    public Boolean isRenegotiationMerchant { get; private set; }
    private final Contrato2__c record;
    private String objectType;

    public Opportunity opportunity { get; set; }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2016
        * @description Controlador principal de Cotizador Edenred => Mantenimiento 10/11/2017 calvarez@ctconsulting.com.mx
    */

    global PLAN_CuentaService(ApexPages.StandardController controller) {
        //this.opportunity = (Opportunity)controller.getRecord();
        SObject recordT = controller.getRecord();
        String objectApiName = controller.getRecord().getSObjectType().getDescribe().getName();
        this.isRenegotiationMerchant = false;
         
        if (objectApiName == 'Opportunity') {
            this.opportunity = (Opportunity) recordT;
        } else {
            Id idContrato2 = ((Contrato2__c)controller.getRecord()).id;
        	this.record = [SELECT Id, IsRenegotiationMerchant__c FROM Contrato2__c WHERE Id=:idContrato2];
            this.isRenegotiationMerchant = record.IsRenegotiationMerchant__c;
            
        }

    }
    public String getObjectType() {
        return objectType;
    }
    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param quoteId Id de una instancia del objeto Quote.
        * @param strDataBase64 Es un String en formato Base64.
        * @description Guarda archivo PDF de una propuesta comercial.
        * @return Objeto con la información del Attachment insertado.
    **/
    @RemoteAction
    global static Object guardaAnexoE( String qliId,  String strDataBase64,String codigoAS400 ) {
        System.debug(':::ENTRAANEXO:::');
        Map<String, Object> response = new Map<String, Object>();

        if(String.isNotBlank(qliId) && String.isNotBlank(strDataBase64)) {

            List<QuoteLineItem> soluciones = [SELECT Id,QuoteId, Product2.Name, Etapa__c, Quote.IdPDFContrato__c, Quote.OpportunityId FROM QuoteLineItem WHERE Id =: qliId];

            if( soluciones != null && soluciones.size() > 0 ) {
                QuoteLineItem qli = soluciones.get(0);


                List<Attachment> instances = new List<Attachment>();
                String nombre = '';
                if(String.isNotBlank(codigoAS400)){
                    nombre = 'Anexo E_' + qli.Product2.Name + '_' + codigoAS400 +'.pdf';
                }else{
                    nombre = 'Anexo E_' + qli.Product2.Name +'.pdf';
                }

                List<Attachment> documentos = [SELECT Id, Name FROM Attachment WHERE Name =: nombre  AND ParentId =: qli.Quote.OpportunityId];

                Attachment contrato = documentos != null && documentos.size() > 0 ? documentos.get(0) : new Attachment(ContentType = 'application/pdf', Name = nombre, ParentId = qli.Quote.OpportunityId);
                contrato.Body = EncodingUtil.base64Decode( strDataBase64 );
                instances.add(contrato);

                for (Database.upsertResult ur : Database.upsert(instances)) {
                    Map<String, Object> mapContrato = new Map<String, Object>();
                    mapContrato.put('Id', ur.getId());
                    mapContrato.put('errors', ur.getErrors());
                    mapContrato.put('isCreated', ur.isCreated());
                    mapContrato.put('isSuccess', ur.isSuccess());
                    response.put('Upsert_Attachment', mapContrato);
                }

            } else {
                response.put('error', 'Solución con Id ' + qliId + ' no encontrada');
            }
        } else {
            response.put('error', 'Parámetros {qliId} y {strDataBase64} son requeridos');
        }
        response.put('Limits', getLimits());

        return response;
    }

    /*
     * author Deloper Freeway
     * Metodo de duplicidad
     * Descripcion: validacion de duplicidad en la claracion de oportunidades de tipo migracion, venta nueva y bpfleet
    */
    private static boolean ValidatepadlockOpportunity(Opportunity opp,String oppID,String productoID)
        {
            boolean resultado =false;

            //validar duplicado
            Product2 producto = [Select Name from Product2 where id =:productoID];

            Opportunity cotiOppo = [Select Entidad_Cuenta__c,StageName,Familia__c,AccountId,RecordTypeId,Modify_opportunity__c
            From Opportunity
            where Id=:oppID];

            List<Opportunity> o=new List<Opportunity>();
            // List<Opportunity> x=new List<Opportunity>();
            //Es ingreso por primera vez del producto

            o=[Select Entidad_Cuenta__c,StageName,Familia__c,Producto_cotizacion__c
            from Opportunity
            where AccountId=:cotiOppo.AccountId
            and StageName Not In ('Ganada','Perdida','Planeada','Renegociada')
            and Entidad_Cuenta__c =: cotiOppo.Entidad_Cuenta__c
            and Familia__c =: cotiOppo.Familia__c
            and Producto_cotizacion__c =: producto.Name
            and Modify_opportunity__c =true];

            if(o.size()>0 && cotiOppo.Modify_opportunity__c!=true)//Si se encuentran registros se bloquea ya que estan duplicados
            {
                resultado=true;
            }

            //fin validacion duplicado


            return resultado;
        }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param strData cadena en formato JSON que contiene la información de la cotización a guardar, ejemplo: '{"Opportunity": {"Id": "0065B000009vHg2QAE"}, "Quote": {"ContactId": "0035B00000G9rx2QAB", "Familia__c": "Combustible", "VigenciaCotizacion__c": "7 días", "Id": "0Q05B0000002J7BSAU"}, "QuoteLineItem": [{"Product2Id": "01t61000000bwTWAAY", "CantidadTarjetas__c": "12", "Quantity": 1, "UnitPrice": "12000", "FormaPago__c": "TransferenciaElectronica", "OpcionesMetodoPago__c": "Banamex", "TarjetaAsociada__c": "1234", "ClabeInterbancaria__c": "123456789012345678", "TipoAmex__c": null, "NivelConsumo__c": null, "OtroMetodoPago__c": null, "Cantidad_Descuento__c": 0, "Total_Descuento__c": 0, "Cantidad_Descuento_Positivo__c": 0, "Total_Descuento_Positivo__c": 0, "Id": "0QL5B000000f9lhWAA", "Escalonamiento1__c": false } ], "ProductoComparado__c": [], "IndexProductoComparado": {}, "ProductoConcepto__c": [{"Concepto__c": "a0T5B000000mZIAUA2", "Bonificacion__c": 0, "PrecioLista2__c": 1.1, "EsProductoComparado__c": false, "CantidadTarjetas__c": 0, "PrecioFinal__c": 1.1, "VigenciaDescuento__c": null, "Id": "a0W5B000001A8MDUA0"} ], "IndexPConceptoCotizado": {"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }, "IndexPConceptoComparado": {}, "Ids2Delete": {"QuoteLineItem": [], "ProductoConcepto__c": [], "ProductoComparado__c": [] }, "IdsConEscalonamiento": {} }'
        * @param quoteData cadena en formato JSON que contiene la información de la cotización para aprobación.
        * @description Guarda archivo PDF de una propuesta comercial.
        * @return Objeto con la información de los objetos insertados, actualizados y eliminados.
    **/
    @RemoteAction
    global static Map<String, Object> guardaCotizacion(String strData, String quoteData) {
        system.debug('GUARDA COTIZACION PLAN_CUENTASERVICE');
        Savepoint sp = Database.setSavepoint();
        Map<String, Object> response = new Map<String, Object>();
        Boolean cdm = false;
        // 4291
        Map<Id, Id> approversToValidate;
        try {
            Approval.ProcessSubmitRequest [] requestList = new Approval.ProcessSubmitRequest []{};
            Integer requiredApprovalLevel = null;
            Integer grantedApprovalLevel = null;
            String comment = null;
            Quote cotAjuste = null;
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(strData);
            if( data != null || data.size() > 0 ) {

                Opportunity oportunidad = data.containsKey('Opportunity') ? ((Opportunity) JSON.deserialize(JSON.serialize(data.get('Opportunity')), Opportunity.class)) : null;

                // LICITACION GOB FED
                //System.debug('MAQUILA GOB FED: ' + oportunidad.Maquilador__c);

                List<QuoteLineItem> Listaluciones = (List<QuoteLineItem>) JSON.deserialize((String) JSON.serialize(data.get('QuoteLineItem')), List<QuoteLineItem>.class);

                //Metodo de duplicidad
                List<OpportunityAndThreatValidation__mdt> oppValidation = [SELECT isActive__c FROM OpportunityAndThreatValidation__mdt WHERE DeveloperName = 'Opportunity'];
                Boolean isDuplicated = false;
                if (!oppValidation.isEmpty() && (oppValidation[0].isActive__c == true || Test.isRunningTest())) {
                    isDuplicated = ValidatepadlockOpportunity(oportunidad,oportunidad.Id,Listaluciones[0].Product2Id);
                }
                if(!isDuplicated){
                    List<Opportunity> listOppValidacion = [SELECT Id, Solicitar_validaci_n_descuentos__c FROM Opportunity WHERE Id =: oportunidad.Id];
                    Quote cotizacion = data.containsKey('Quote') ? ((Quote) JSON.deserialize(JSON.serialize(data.get('Quote')), Quote.class)) : null;
                    if(cotizacion.Id == null){
                        borrarCotizacionesRechazadas(oportunidad.Id);
                    }
                    if(cotizacion.Id != null){
                        cotAjuste = [
                                Select Id, ApprovalStatus__c, RequiredApprovalLevel__c, GrantedApprovalLevel__c, IsApprovalLevelCredit__c,
                                        OwnerId, GrantedApprovalLevelCredit__c, ApprovalRequestComments__c, OpportunityId, CheckUpdatePause__c,
                                        (Select Id, CreditDays__c from QuoteLineItems)
                                from Quote
                                where Id =: cotizacion.Id];
                    }

                    if(cotizacion.Id != null && listOppValidacion != null && listOppValidacion.size() > 0 && listOppValidacion[0].Solicitar_validaci_n_descuentos__c == true){
                        response.put('error', new List<String>{'Su cotización requiere de aprobación, favor de revisar el historial de aprobación para mayor detalle.'});
                    } else {
                        Boolean sincronizeOpp = false;
                        // Ids que se van a eliminar
                        Map<String, List<Id>> ids2Delete = data.containsKey('Ids2Delete') ? ((Map<String, List<Id>>) JSON.deserialize((String) JSON.serialize(data.get('Ids2Delete')), Map<String, List<Id>>.class)) : new Map<String, List<Id>>();
                        Set<String> validar = new Set<String>{'QuoteLineItem', 'ProductoConcepto__c', 'ProductoComparado__c'};
                        for(String objName : ids2Delete.keySet()) {
                            if(validar.contains(objName) && ids2Delete.get(objName) != null && ids2Delete.get(objName).size() > 0 ) {

                                if( objName == 'QuoteLineItem' ) {
                                    System.debug('::EXISTEQUOTELI::');
                                    /////
                                    List<ProductoConcepto__c> productosConcepto=new List<ProductoConcepto__c>();
                                    List<Anexo__c> anexos=new List<Anexo__c>();
                                    List<Contrato2__c> contratos=new List<Contrato2__c>();
                                    List<QuoteLineItem> liqli=[Select Id,(SELECT Id FROM Productos_Concepto__r),(SELECT Id FROM Anexos__r),(SELECT Id FROM Contratos2__r) from QuoteLineItem where Id IN :ids2Delete.get(objName)];
                                    for(QuoteLineItem temqli : liqli){
                                        productosConcepto.addAll(temqli.Productos_Concepto__r);
                                        anexos.addAll(temqli.Anexos__r);
                                        contratos.addAll(temqli.Contratos2__r);
                                    }

                                    /////
                                    //List<ProductoConcepto__c> productosConcepto = [SELECT Id FROM ProductoConcepto__c WHERE PartidaPresupuesto__c IN: ids2Delete.get(objName)];
                                    if( productosConcepto != null && productosConcepto.size() > 0 ) {
                                        response.put('DELETE_' + objName + '_ProductoConcepto__c', Database.delete(productosConcepto, false));
                                    }

                                    //List<Anexo__c> anexos = [SELECT Id FROM Anexo__c WHERE Solucion__c IN: ids2Delete.get(objName)];
                                    if( anexos != null && anexos.size() > 0 ) {
                                        response.put('DELETE_' + objName + '_Anexo__c', Database.delete(anexos, false));
                                    }

                                    //List<Contrato2__c> contratos = [SELECT Id FROM Contrato2__c WHERE PartidaPresupuesto__c IN: ids2Delete.get(objName)];
                                    if( contratos!= null && contratos.size() > 0 ) {
                                        response.put('DELETE_' + objName + '_Contrato2__c', Database.delete(contratos, false));
                                    }
                                } else if( objName == 'ProductoComparado__c' ) {
                                    List<ProductoConcepto__c> productosConcepto = [SELECT Id FROM ProductoConcepto__c WHERE ProductoComparadoID__c IN: ids2Delete.get(objName)];
                                    if( productosConcepto != null && productosConcepto.size() > 0 ) {
                                        response.put('DELETE_' + objName + '_ProductoConcepto__c', Database.delete(productosConcepto, false));
                                    }
                                }

                                response.put('Deleted_' + objName, Database.delete(ids2Delete.get(objName), false));
                            }
                        }


                        if(cotizacion != null && oportunidad != null && oportunidad.Id != null){
                            List<Opportunity> oppWhithQuotes = [SELECT (Select Id FROM Quotes), Name, CloseDate, RecordType.DeveloperName, Owner.ManagerId, Familia__c FROM Opportunity WHERE Id =: oportunidad.Id];
                            OppRecordType = oppWhithQuotes[0].RecordType.DeveloperName;
                            String oppSolucion = oppWhithQuotes[0].Familia__c;
                            Id oppOwnerManager = oppWhithQuotes[0].Owner.ManagerId;
                            if(cotizacion.Id == null){
                                Integer cantidad = oppWhithQuotes[0].Quotes.size() + 1;
                                String oppNumber = '';
                                if(!oppWhithQuotes.isEmpty()){
                                    oppNumber = (oppWhithQuotes[0].Name).splitByCharacterType()[0];
                                }
                                String nombre = 'COT' + ( cantidad > 9 ? ('0' + cantidad) : ('00' + cantidad)) + '-' + oppNumber;
                                cotizacion.Name = nombre;
                                cotizacion.OpportunityId = oportunidad.Id;
                            }

                            List<QuoteLineItem> soluciones = (List<QuoteLineItem>) JSON.deserialize((String) JSON.serialize(data.get('QuoteLineItem')), List<QuoteLineItem>.class);

                            List<ProductoComparado__c> comparados = (List<ProductoComparado__c>) JSON.deserialize((String) JSON.serialize(data.get('ProductoComparado__c')), List<ProductoComparado__c>.class);
                            List<ProductoConcepto__c> pconceptos = (List<ProductoConcepto__c>) JSON.deserialize((String) JSON.serialize(data.get('ProductoConcepto__c')), List<ProductoConcepto__c>.class);
                            List<RenegotiationProduct__c> renegotiationProducts = (List<RenegotiationProduct__c>) JSON.deserialize((String) JSON.serialize(data.get('RenegotiationProduct__c')), List<RenegotiationProduct__c>.class);//CEAM: 3563
                            List<List<RenegotiationProductConcept__c>> renegotiationProductsConcept = (List<List<RenegotiationProductConcept__c>>) JSON.deserialize((String) JSON.serialize(data.get('RenegotiationProductConcept__c')), List<List<RenegotiationProductConcept__c>>.class);//CEAM: 3563
                            System.debug('VERCOTIZAPC:::'+JSON.serialize(pconceptos));
                            System.debug('RENEGOTIATIONPRODUCTS:::'+JSON.serialize(renegotiationProducts));
                            System.debug('RENEGOTIATIONPRODUCTSCONCEPT:::'+JSON.serialize(renegotiationProductsConcept));

                            Map<String, Object> indexComparados = (Map<String, Object>) JSON.deserializeUntyped((String) JSON.serialize(data.get('IndexProductoComparado')));
                            Map<String, Object> indexPConceptoCotizado = (Map<String, Object>) JSON.deserializeUntyped((String) JSON.serialize(data.get('IndexPConceptoCotizado')));
                            Map<String, Object> indexPConceptoComparado = (Map<String, Object>) JSON.deserializeUntyped((String) JSON.serialize(data.get('IndexPConceptoComparado')));

                            Map<Id, PricebookEntry> mapIdsPBE = new Map<Id, PricebookEntry>();

                            Set<Id> setIdsProduct2Id = new Set<Id>();
                            for( QuoteLineItem qli : soluciones ) {
                                if(!oppWhithQuotes.isEmpty()) {
                                    qli.ServiceDate = oppWhithQuotes[0].CloseDate;
                                }
                                if( qli.Product2Id != null ) {
                                    setIdsProduct2Id.add(qli.Product2Id);
                                }
                                if(cotAjuste != null && cotAjuste.ApprovalStatus__c == 'Ajuste' && cotAjuste.QuoteLineItems != null && !cotAjuste.QuoteLineItems.isEmpty()){
                                    for(QuoteLineItem oqli : cotAjuste.QuoteLineItems){
                                        if(qli.CreditDays__c > oqli.CreditDays__c){
                                            cdm = true;
                                        }
                                    }
                                }
                                if(qli.WarrantyType__c != null && qli.WarrantyType__c != '')  cotizacion.WarrantyType__c = qli.WarrantyType__c;
                                if(qli.DocumentType__c != null && qli.DocumentType__c != '') cotizacion.DocumentType__c = qli.DocumentType__c;
                                if(qli.GLB_LineaCreditoPreautorizada__c != null) cotizacion.GLB_LineaCreditoPreautorizada__c = qli.GLB_LineaCreditoPreautorizada__c;
                                if(qli.GLB_TerminoDePago__c != null) cotizacion.GLB_TerminoDePago__c = qli.GLB_TerminoDePago__c;

                            }

                            for(List<PricebookEntry> listPBE : [SELECT Id, Name, Product2Id, Pricebook2Id from PricebookEntry Where Product2Id IN: setIdsProduct2Id AND Pricebook2.Name = 'Edenred']) {
                                for(PricebookEntry pbe : listPBE) {
                                    mapIdsPBE.put(pbe.Product2Id, pbe);
                                }
                            }
                            System.debug('NVH - cotizacion ' + cotizacion);
                            System.debug('NVH cot.Id-  ' + cotizacion.Id);
                            System.debug('NVH mapIdsPBE-  ' + mapIdsPBE);
                            
                            
                            if( cotizacion.Id == null ) {
                                if( mapIdsPBE.values().size() > 0 ) {
                                    cotizacion.Pricebook2Id = mapIdsPBE.values()[0].Pricebook2Id;
                                    sincronizeOpp = true;
                                } else {
                                    Database.rollback(sp);
                                    throw new CustomException('No se encontró lista de precios, verifique que sus productos cuenten con Entrada de lista de precios.');
                                }
                            }
                            System.debug('NVH sincronizeOpp-  ' + sincronizeOpp);

                            response.put('PricebookEntry', mapIdsPBE);

                            //Se realiza el envío del proceso de aprobación
                            Integer approvalComisionTag = 1;
                            Integer approvalTag = 1;
                            Integer approvalComision = 1;
                            Integer approvalComisionMant = 1;
                            Integer approvalEnvioRecurrente = 1;
                            Integer approvalPrimerEnvio = 1;
                            Integer approvalTarjetaStock = 1;
                            Integer approvalTarjetaStockPrimer = 1;
                            Integer approvalCredito = 1;//CEAM:3375
                            Boolean IsApprovalLevelCredit = false;//CEAM:3375
                            oportunidad.Solicitar_validaci_n_descuentos__c = false;
                            if(OppRecordType != 'RT_CreditRenewal' && OppRecordType != 'RT_ChangeParameters') {
                                if(quoteData != null && quoteData != 'null') {
                                    if(oppOwnerManager != null) {
                                        oportunidad.Solicitar_validaci_n_descuentos__c = true;
                                        Map<String,Object> quoteInfo = (Map<String,Object>)JSON.deserializeUntyped(quoteData);
                                        approvalComisionTag = (Integer)quoteInfo.get('approvalComisionTag');
                                        approvalTag = (Integer)quoteInfo.get('approvalTag');
                                        approvalComision = (Integer)quoteInfo.get('approvalComision');
                                        approvalComisionMant = (Integer)quoteInfo.get('approvalComisionMant');
                                        approvalEnvioRecurrente = (Integer)quoteInfo.get('approvalEnvioRecurrente');
                                        approvalPrimerEnvio = (Integer)quoteInfo.get('approvalPrimerEnvio');
                                        approvalTarjetaStock = (Integer)quoteInfo.get('approvalTarjetaStock');
                                        approvalTarjetaStockPrimer = (Integer)quoteInfo.get('approvalTarjetaStockPrimer');
                                        approvalCredito = (Integer)quoteInfo.get('approvalCredito');//CEAM:3375
                                        IsApprovalLevelCredit = (Boolean)quoteInfo.get('IsApprovalLevelCredit');//CEAM:3375
                                        String quoteId = (string)quoteInfo.get('Id');
                                        comment = (string)quoteInfo.get('userComment');
                                        String owner = (string)quoteInfo.get('owner');
                                        requiredApprovalLevel = (Integer)quoteInfo.get('approvalLevel') - 1;
                                        grantedApprovalLevel = null;

                                        if(cotAjuste == null || (cotAjuste != null && (cotAjuste.ApprovalStatus__c != 'Ajuste' || cotAjuste.ApprovalStatus__c == 'Aprobada' || cotAjuste.ApprovalStatus__c == 'Pausa'))){
                                            Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
                                            req1.setComments(comment);
                                            req1.setProcessDefinitionNameOrId('QuoteApprovalInitial');
                                            req1.setNextApproverIds(new Id[] {oppOwnerManager});
                                            req1.setSkipEntryCriteria(false);
                                            req1.setSubmitterId(owner);
                                            requestList.add(req1);

                                            cotizacion.RequiredApprovalLevel__c = requiredApprovalLevel;
                                            cotizacion.GrantedApprovalLevel__c = grantedApprovalLevel;
                                            cotizacion.ApprovalRequestDate__c = System.now();
                                            cotizacion.IsApprovalLevelCredit__c = Boolean.valueOf(IsApprovalLevelCredit);
                                            cotizacion.Assigned_to__c = oppOwnerManager; //4291
                                            cotizacion.ApprovalStatus__c = 'Pendiente';
                                            cotizacion.Quote_Status__c = 'En análisis comercial';
                                        }
                                        else{
                                            if(cotAjuste != null) cotAjuste.ApprovalRequestComments__c = comment;
                                        }
                                        cotizacion.ApprovalRequestComments__c = comment;
                                    } else {
                                        Database.rollback(sp);
                                        throw new CustomException('El propietario del registro no cuenta con un gestor para que apruebe la solicitud de aprobación.');
                                    }
                                }
                            }

                            // Guardar información de la cotización.
                            Database.UpsertResult quoteUpsertResult = Database.upsert(cotizacion);
                            response.put('Upsert_Quote', quoteUpsertResult);
                            System.debug('***********************cotizacion '+cotizacion);
                            System.debug('***********************oportunidad '+oportunidad);

                            if(!requestList.isEmpty()){
                                requestList[0].setObjectId(quoteUpsertResult.getId());
                                approversToValidate = new Map<Id, Id>(); // 4291
                                approversToValidate.put(quoteUpsertResult.getId(), oppOwnerManager); // 4291
                            }

                            // Guardar información de productos cotizados
                            //Integer indexQLI = 1;
                            Precio_Litro__c pl = Precio_Litro__c.getInstance();
                            for(QuoteLineItem solucion : soluciones){
                                if(cotizacion.Familia__c == 'Combustible'){
                                    System.debug('ESTE ES::' + cotizacion.Id);
                                    //solucion.Litros__c = pl.Precio_por_litro__c * solucion.UnitPrice;
                                    solucion.Litros__c = solucion.UnitPrice / pl.Precio_por_litro__c;
                                }else{
                                    solucion.Litros__c = 0;
                                }
                                if(solucion.Id == null && solucion.QuoteId == null){
                                    solucion.QuoteId = cotizacion.Id;
                                    if(mapIdsPBE.containsKey(solucion.Product2Id)){
                                        solucion.PricebookEntryId = mapIdsPBE.get(solucion.Product2Id).Id;
                                    } else {
                                        Database.rollback(sp);
                                        throw new CustomException('Producto ' + solucion.Product2Id + ' no tiene entrada de lista de precios, en lista Edenred.');
                                    }
                                }
                                solucion.PreAnalysis__c = approvalCredito;//CEAM:3375
                                //Map<String, String> mapTest = new Map<String, String>();
                                //mapTest.put('desc', solucion.Description);
                                //response.put('QLI_' + indexQLI++, solucion.Description);
                            }
                            response.put('Upsert_QuoteLineItem', Database.upsert(soluciones));

                            // Guarda Cotización sincronizada en la Oportunidad
                            if( sincronizeOpp ) {
                                System.debug(LoggingLevel.DEBUG, '[FR] sincronizeOpp: ' + sincronizeOpp );
                                oportunidad.SyncedQuoteId = cotizacion.Id;
                                oportunidad.Modify_opportunity__c=true;//prueba req 2331
                                Database.SaveResult resultUPDOpp = Database.update(oportunidad, false);
                                if(resultUPDOpp.isSuccess())
                                    System.debug(LoggingLevel.DEBUG, '[FR] Update success && sincronizeOpp : true');
                                else
                                    System.debug(LoggingLevel.DEBUG, '[FR] Update_Opportunity Fail: ' +  JSON.serialize(resultUPDOpp.getErrors()));
                                response.put('Upsert_Opportunity', resultUPDOpp);
                            } else if (oportunidad.Solicitar_validaci_n_descuentos__c) {
                                System.debug(LoggingLevel.DEBUG, '[FR] Solicitar_validaci_n_descuentos__c: ' + oportunidad.Solicitar_validaci_n_descuentos__c );
                                Database.SaveResult resultUPDOpp = Database.update(oportunidad, false);
                                if(resultUPDOpp.isSuccess())
                                    System.debug(LoggingLevel.DEBUG, '[FR] Update success && sincronizeOpp : false && oportunidad.Solicitar_validaci_n_descuentos__c: true');
                                else
                                    System.debug(LoggingLevel.DEBUG, '[FR] Update_Opportunity: Fail' +  JSON.serialize(resultUPDOpp.getErrors()));
                                response.put('Upsert_Opportunity', resultUPDOpp);
                            } else if (oportunidad.RenegotiationType__c != null) {//CEAM: 3563 >>>
                                response.put('Upsert_Opportunity', Database.update(oportunidad, false));
                            }//CEAM: 3563 <<<

                            // Verificar si es una cotización es duplicada y tiene escalonamientos
                            Map<String, Object> idsConEscalonamiento = (Map<String, Object>) JSON.deserializeUntyped((String) JSON.serialize(data.get('IdsConEscalonamiento')));
                            if( idsConEscalonamiento != null && idsConEscalonamiento.size() > 0 ) {

                                List<QuoteLineItem> escalonamientos = [SELECT Id,QuoteId, UnitPrice, ServiceDate, Escalonamiento__c, Product2Id FROM QuoteLineItem WHERE Escalonamiento__c IN: idsConEscalonamiento.keySet() ];

                                //response.put('EscalonamientosClonados', escalonamientos);

                                //Map<Id, List<QuoteLineItem>> escalonamientosAClonar = new Map<Id, List<QuoteLineItem>>();
                                List<QuoteLineItem> solucionesEscalonamientos = new List<QuoteLineItem>();
                                for( QuoteLineItem qliACopiar: escalonamientos ) {
                                    //if( !escalonamientosAClonar.containsKey(qliACopiar.Escalonamiento__c) ) {
                                    //  escalonamientosAClonar.put(qliACopiar.Escalonamiento__c, new List<QuoteLineItem>());
                                    //}
                                    QuoteLineItem clon = qliACopiar.clone(false, false, false, false);
                                    QuoteLineItem qliBase = soluciones[Integer.valueOf(idsConEscalonamiento.get(String.valueOf(qliACopiar.Escalonamiento__c)))];
                                    clon.Escalonamiento__c      = qliBase.Id;
                                    clon.QuoteId                = cotizacion.Id;
                                    clon.PricebookEntryId       = qliBase.PricebookEntryId;
                                    clon.Quantity               = 1;
                                    clon.CantidadTarjetas__c    = qliBase.CantidadTarjetas__c;
                                    clon.Product2Id             = qliBase.Product2Id;
                                    clon.Escalonamiento1__c     = true;
                                    if(cotizacion.Familia__c=='Combustible'){
                                        //clon.Litros__c=pl.Precio_por_litro__c*qliBase.UnitPrice;
                                        clon.Litros__c=qliBase.UnitPrice/pl.Precio_por_litro__c;
                                    }else{
                                        clon.Litros__c=0;
                                    }
                                    //clon.UnitPrice                = qliBase.UnitPrice;

                                    //escalonamientosAClonar.get(qliACopiar.Escalonamiento__c).add(clon);
                                    solucionesEscalonamientos.add(clon);

                                }
                                if( solucionesEscalonamientos != null && solucionesEscalonamientos.size() > 0 ) {
                                    response.put('Upsert_QuoteLineItemEscalonamiento', Database.upsert(solucionesEscalonamientos));
                                }
                                //response.put('ListosParaClonar', escalonamientosAClonar);
                            }


                            Integer indexProductoComparado = 0;

                            for( ProductoComparado__c comparado: comparados ) {
                                if( comparado.ProductoCotizado__c == null ) {
                                    comparado.ProductoCotizado__c = soluciones[Integer.valueOf(indexComparados.get(String.valueOf(indexProductoComparado++)))].Id;
                                }
                            }
                            response.put('Upsert_ProductoComparado__c', Database.upsert(comparados));

                            Integer indexPCComparado = 0;
                            Integer indexPCCotizado = 0;
                            Integer indexPRQuoted = 0;
                            String idPC='';
                            Double comision=0;

                            //Extract approval levels for ProductoConcepto__c uuu
                            for( ProductoConcepto__c concepto: pconceptos ) {
                                if( concepto.EsProductoComparado__c == true ) {
                                    concepto.ProductoComparadoID__c = comparados[Integer.valueOf(indexPConceptoComparado.get(String.valueOf(indexPCComparado++)))].Id;
                                } else {
                                    concepto.PartidaPresupuesto__c = soluciones[Integer.valueOf(indexPConceptoCotizado.get(String.valueOf(indexPCCotizado++)))].Id;
                                }
                                System.debug('ENTRAA::'+concepto);
                                if((concepto.Concepto_Tipo_Cargo__c=='Comisión por el servicio' || concepto.Concepto_Tipo_Cargo__c=='Comisión por Servicio Telepeaje') &&concepto.PartidaPresupuesto__c!=null){
                                    idPC=concepto.PartidaPresupuesto__c;
                                    comision=concepto.PrecioFinal__c;
                                }
                                if(quoteData != null && quoteData != 'null') {
                                    if(concepto.Concepto_Tipo_Cargo__c=='Comisión por el servicio'){
                                        concepto.ApprovalLevel__c = approvalComision;
                                    } else if(concepto.Concepto_Tipo_Cargo__c=='Comisión por Servicio Telepeaje'){
                                        concepto.ApprovalLevel__c = approvalComisionTag;
                                    }else if(concepto.Concepto_Tipo_Cargo__c=='Cobro por gestion de vehiculos') {
                                        concepto.ApprovalLevel__c = approvalComisionMant;
                                    } else if(concepto.Concepto_Tipo_Cargo__c=='Cargo por envío - Recurrente') {
                                        concepto.ApprovalLevel__c = approvalEnvioRecurrente;
                                    }else if(concepto.Concepto_Tipo_Cargo__c=='TAG Telepeaje'){
                                        concepto.ApprovalLevel__c = approvalTag;
                                    } else if(concepto.Concepto_Tipo_Cargo__c=='Cargo del primer envío') {
                                        concepto.ApprovalLevel__c = approvalPrimerEnvio;
                                    } else if(concepto.Concepto_Tipo_Cargo__c=='Tarjeta titular / Stock') {
                                        concepto.ApprovalLevel__c = approvalTarjetaStock;
                                    } else if(concepto.Concepto_Tipo_Cargo__c=='Tarjeta titular / Stock - primer envío') {
                                        concepto.ApprovalLevel__c = approvalTarjetaStockPrimer;
                                    } else if(concepto.Concepto_Tipo_Cargo__c == 'Tarjeta titular' || concepto.Concepto_Tipo_Cargo__c=='Tarjeta stock') {//CEAM: 3563 >>>
                                        concepto.ApprovalLevel__c = approvalTarjetaStock;
                                    } else if(concepto.Concepto_Tipo_Cargo__c == 'Cuota por Tarjeta activa' || concepto.Concepto_Tipo_Cargo__c == 'Cargo por tarjeta activa' || concepto.Concepto_Tipo_Cargo__c == 'Cuota por cuenta activa') {
                                        concepto.ApprovalLevel__c = approvalTarjetaStock;
                                    }
                                }
                            }

                            if(!RenegotiationProducts.isEmpty() && RenegotiationProducts[0] != null) {// CEAM3563
                                for(RenegotiationProduct__c reprod: RenegotiationProducts) {
                                    reprod.QuoteProduct__c = soluciones[0].Id;
                                }
                            }

                            /*for( ProductoConcepto__c concepto: pconceptos ) {
                                if(concepto.Concepto_Tipo_Cargo__c=='Comisión por el servicio'){
                                idPC=concepto.PartidaPresupuesto__c;
                                comision=concepto.PrecioFinal__c;
                                }
                            }*/
                            if(idPC!=''){
                                QuoteLineItem ql=new QuoteLineItem();
                                ql.Id=idPC;
                                ql.Comision_por_Servicio__c=comision;
                                Database.update(ql);
                            }

                            response.put('request_ProductoConcepto__c', pconceptos);
                            response.put('Upsert_ProductoConcepto__c', Database.upsert(pconceptos, false));

                            if(!RenegotiationProducts.isEmpty() && RenegotiationProducts[0] != null) {// CEAM3563 >>>
                                Integer indexReProd = 0;
                                Database.upsert(RenegotiationProducts);
                                if(RenegotiationProducts[0].QuoteProduct__c != null) {
                                    response.put('Upsert_RenegotiationProduct__c', RenegotiationProducts);
                                    if(!renegotiationProductsConcept.isEmpty() && renegotiationProductsConcept[0] != null) {
                                        for(RenegotiationProduct__c rp : RenegotiationProducts) {
                                            for(RenegotiationProductConcept__c rpc : renegotiationProductsConcept[indexReProd]) {
                                                if(rp.KeyIndex__C == rpc.KeyIndex__C) {
                                                    rpc.RenegotiationProduct__c = rp.Id;
                                                }
                                            }
                                            indexReProd++;
                                        }

                                        List<RenegotiationProductConcept__c> listRenegotiationProducts = new List<RenegotiationProductConcept__c>();
                                        for (List<RenegotiationProductConcept__c> lrpcAdd : renegotiationProductsConcept) listRenegotiationProducts.addAll(lrpcAdd);

                                        Database.upsert(listRenegotiationProducts);

                                        if(renegotiationProductsConcept[0][0].RenegotiationProduct__c != null) {
                                            response.put('Upsert_RenegotiationProductConcept__c', renegotiationProductsConcept);
                                        }
                                    }
                                }

                            }//CEAM: 3563 <<<

                            if(OppRecordType == 'RT_Renegotiation'){//CEAM: 3563 >>>
                                System.debug('NVH -- execute saveContractADV');
                                if(oportunidad != null && oportunidad.Id != null && soluciones[0].Id != null) {
                                    System.debug('NVH -- soluciones[0] ' + soluciones[0]);
                                    saveContractADV(oportunidad, soluciones[0].Id);
                                }
                            }//CEAM: 3563 <<<

                            response.put('Instance_Quote', [SELECT Id, Name, IsSyncing, ApprovalStatus__c FROM Quote WHERE Id =: cotizacion.Id ]);
                        }
                    }

                    if (oportunidad.Solicitar_validaci_n_descuentos__c == true) {
                        response.put('SOQL_Opportunity', true);
                    } else {
                        response.put('SOQL_Opportunity', false);
                    }

                    response.put('request', data);
                }else{//Fin verificacion de duplicidad OP
                    response.put('error', new List<String>{'“Ya existe una oportunidad abierta para ese mismo RFC Solución”'});
                }
            } else {
                response.put('error', 'No se recibieron datos.');
            }
            System.debug('requestList: '+requestList);
            if(!requestList.isEmpty()) Approval.ProcessResult[] result = Approval.process(requestList);

            if(cotAjuste != null && cotAjuste.ApprovalStatus__c == 'Ajuste'){
                List<ContentDocumentLink> cdl = [select Id from ContentDocumentLink where LinkedEntityId =: cotAjuste.OpportunityId and ContentDocument.Title != 'Análisis de Crédito'];
                if(cdl == null || cdl.isEmpty()){
                    Database.rollback(sp);
                    response.put('error', 'Debe adjuntar al menos un documento en la oportunidad.');
                }
                else if(cdm){
                    Database.rollback(sp);
                    response.put('error', 'El número de días de crédito no puede ser mayor que el anterior.');
                }
                else{
                    Quote oldCotAjuste = cotAjuste.clone(true, true, true, true);
                    oldCotAjuste.GrantedApprovalLevel__c = cotAjuste.GrantedApprovalLevel__c - 1;
                    Map<Id, Quote> newMap = new Map<Id, Quote>();
                    newMap.put(oldCotAjuste.Id, oldCotAjuste);
                    QuoteMultilevelApprovalProcess.sendNextApprovalProcess(new List<Quote>{cotAjuste}, newMap);
                }
            }

            if(cotAjuste != null && cotAjuste.ApprovalStatus__c == 'Pausa'){
                cotAjuste.CheckUpdatePause__c = true;
                update cotAjuste;
            }

            // 4291
            if(approversToValidate != null && !approversToValidate.isEmpty()){
                QuoteMultilevelApprovalProcess.validateApproverAvailability(approversToValidate);
            }
        }
        catch(DmlException e) {
            Database.rollback(sp);
            System.debug('DmlException caught: ' + e.getMessage());
            if (e.getMessage().contains('vigencia de Comisión por Servicio Piloto')) {
                throw new CustomException('La vigencia de Comisión por Servicio Piloto no puede ser mayor a dos meses.');
            } else {
                throw new CustomException(e.getMessage() + ' ' + e.getLineNumber());
            }
        }
        catch( JSONException ex ) {
            Database.rollback(sp);
            System.debug('ERROR::'+ex.getMessage()+', linea:'+ex.getLineNumber());
            // response.put('error', ex.getStackTraceString() + ' ' + ex.getLineNumber());
            // response.put('JSONException', ex.getMessage());
            throw new CustomException(ex.getMessage() + ' ' + ex.getLineNumber());
        } catch( NullPointerException ex ) {
            Database.rollback(sp);
            System.debug('ERROR::'+ex.getMessage()+', linea:'+ex.getLineNumber());
            // response.put('error', ex.getStackTraceString() + ' ' + ex.getLineNumber());
            // response.put('NullPointerException', ex.getMessage() + ' ' + ex.getLineNumber());
            throw new CustomException(ex.getMessage() + ' ' + ex.getLineNumber());
        } catch( Exception ex ) {
            Database.rollback(sp);
            System.debug('ERROR::'+ex.getMessage()+', linea:'+ex.getLineNumber());
            // response.put('error', ex.getStackTraceString() + ' ' + ex.getLineNumber());
            // response.put('Exception', ex.getMessage() + ' ' + ex.getLineNumber());
            throw new CustomException(ex.getMessage() + ' ' + ex.getLineNumber());
        }

        response.put('Limits', getLimits());
        return response;
    }

    public static void saveContractADV(Opportunity opp, String qliId) { //CEAM: 3563
        List<Contrato2__c> listContract = [SELECT Id, PartidaPresupuesto__c from Contrato2__c WHERE PartidaPresupuesto__r.Quote.Opportunity.Id =: opp.Id];
        if(listContract.isEmpty()) {
            List<Opportunity> listOpp = [SELECT Id, Entidad_Cuenta__c, LegalEntity__c, GLB_Contratos_Renegociacion__c, Product__r.Name FROM Opportunity WHERE Id =: opp.Id];
            System.debug('>>>> listOpp'+listOpp);

            if(!listOpp.isEmpty()) {
                Opportunity oppGen = listOpp[0];
                String idCFParent = getFirstCFId(oppGen.GLB_Contratos_Renegociacion__c);
                String productName = oppGen.Product__r.Name;
                Contrato2__c contract = new Contrato2__c(
                        PartidaPresupuesto__c = qliId,
                        Entidad_Cuenta__c = oppGen.Entidad_Cuenta__c,
                        Entidad_Legal__c = oppGen.LegalEntity__c,
                        EtapaContrato__c = 'Finalizado'
                );
                
                
                if(idCFParent != null && productName == '33-Fleet Edenred') {
                    ContratoFilial__c contratoFilial = [
                        SELECT Id, Contrato_2__r.Producto__c, Contrato_2__r.Legal_representatives__c, 
                            Contrato_2__r.Entidad_Legal__c, Contrato_2__r.Entidad_Cuenta__c, Contrato_2__r.Package__c, Contrato_2__r.FiscalAddress__c, 
                            Contrato_2__r.CodigoAS400__c, Contrato_2__r.GLB_Ref_Cli_Mercedes__c, Contrato_2__r.FrecuenciaFacturacion__c, Contrato_2__r.CorreoRecibeFactura__c
                        FROM ContratoFilial__c 
                        WHERE Id =: idCFParent 
                        LIMIT 1
                    ];

                    contract.Legal_representatives__c = contratoFilial.Contrato_2__r.Legal_representatives__c;
                    contract.Entidad_Legal__c = contratoFilial.Contrato_2__r.Entidad_Legal__c;
                    contract.Entidad_Cuenta__c = contratoFilial.Contrato_2__r.Entidad_Cuenta__c;
                    contract.Package__c = contratoFilial.Contrato_2__r.Package__c;
                    contract.FiscalAddress__c = contratoFilial.Contrato_2__r.FiscalAddress__c;
                    contract.CodigoAS400_Con2_Ori__c = contratoFilial.Contrato_2__r.CodigoAS400__c;
                    contract.GLB_Ref_Cli_Mercedes__c = contratoFilial.Contrato_2__r.GLB_Ref_Cli_Mercedes__c;
                    contract.FrecuenciaFacturacion__c = contratoFilial.Contrato_2__r.FrecuenciaFacturacion__c;
                    contract.CorreoRecibeFactura__c = contratoFilial.Contrato_2__r.CorreoRecibeFactura__c;
                }

                
                if(contract.PartidaPresupuesto__c != null && contract.Entidad_Cuenta__c != null && contract.Entidad_Legal__c != null) {
                    insert contract;
                    if(productName == '33-Fleet Edenred') {
                        opp.Contrato2__c =  contract.Id;
                        Database.SaveResult res = Database.update(opp);
                        if(res.isSuccess()) {
                            System.debug('Record '+opp.Id+' updated successfully');
                        }else {
                            System.debug('Record fail '+opp.Id);
                            
                        }
                    }
                }
            }
        }
    }

    public static String getFirstCFId(String contratos) {
        if (contratos != null) {
            String[] elementos = contratos.split(',');
            if (elementos.size() > 0) {  
                return elementos[0].trim(); 
            }
        }
        return null; 
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 09/01/2017
        * @param quoteId Id de una instancia del objeto Quote.
        * @param strDataBase64 Es un String en formato Base64.
        * @description Guarda archivo PDF de una propuesta comercial.
        * @return Objeto con la información del QuoteDocument insertado.
    **/
    @RemoteAction
    public static Map<String, Object> guardaPDFBase64( String quoteId, String strDataBase64 ) {
        //System.debug('guardaContrato, strData: ' + strData);
        Map<String, Object> response = new Map<String, Object>();
        List<QuoteDocument> instances = new List<QuoteDocument>();

        Quote cotizacion = [SELECT Id, Name, IdPDFPropuestaComercial__c, OpportunityId from Quote where Id =: quoteId];

        System.debug('******************** '+ cotizacion.IdPDFPropuestaComercial__c+' '+quoteId);
        List<QuoteDocument> documentos = [SELECT Id, Name, QuoteId, Document FROM QuoteDocument WHERE Id =: cotizacion.IdPDFPropuestaComercial__c];

        QuoteDocument qDocument = new QuoteDocument(QuoteId = quoteId, Document = EncodingUtil.base64Decode(strDataBase64));
        instances.add(qDocument);

        if(documentos != null && documentos.size() > 0){
            delete documentos;
        }

        for (Database.upsertResult ur : Database.upsert(instances)) {
            Map<String, Object> mapAnexo = new Map<String, Object>();
            mapAnexo.put('Id', ur.getId());
            mapAnexo.put('errors', ur.getErrors());
            mapAnexo.put('isCreated', ur.isCreated());
            mapAnexo.put('isSuccess', ur.isSuccess());
            response.put('Upsert_QuoteDocument', mapAnexo);

            cotizacion.IdPDFPropuestaComercial__c = ur.getId();
            upsert cotizacion;

            update new Opportunity(Id = cotizacion.OpportunityId, Id_PDF__c = cotizacion.IdPDFPropuestaComercial__c);
        }

        response.put('strDataBase64', strDataBase64);
        response.put('Limits', getLimits());
        return response;
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param query Es un string válido para realizar una consulta
        * @description Executa una consulta SOQL.
        * @return Lista de instancias de sObject.
    **/
    @RemoteAction
    global static List<sObject> query( String query ) {
        Transient List<sObject> querys;
        querys = Database.query(query);
        return querys;
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param objs Array de string que contiene nombre API de los objetos existentes en la instancia de salesforce.
        * @description Obtiene los metadatos de unos ó más objetos de salesforce.
        * @return Lista de instancias metadatos de los objetos.
    **/
    @RemoteAction
    global static Schema.DescribeSobjectResult[] describe( String[] objs ) {
        return Schema.describeSObjects(objs);
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param ids Array ids existentes de objetos existentes de salesforce.
        * @description Elimina instancias de salesforce por id.
        * @return Lista de resultados por instancia que se intentó eliminar.
    **/
    @RemoteAction
    global static List<Database.DeleteResult> deleteIds( String[] ids ) {
        return Database.delete(ids);
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @param typeobj API name del objeto que se intenta insertar/actualizar.
        * @param data Lista de instancias que se van a insertar/actualizar.
        * @description Inserta/actualiza instancias de un obejto existente el el ambiente de salesforce.
        * @return Lista de resultados por instancia que se inserta/actualiza.
    **/
    @RemoteAction
    public static List<Database.UpsertResult> upsertSobjects( String typeobj, String data ) {
        Type t = Type.forName('List<' + typeobj + '>');
        System.debug('upsertSobjects' + typeobj);
        System.debug('upsertSobjects' + data);
        List<sObject> instances = (List<sObject>) JSON.deserialize(data, t);
        System.debug('upsertSobjects '+ instances);

        if(typeobj=='QuoteLineItem'){
            List<QuoteLineItem> lqli=(List<QuoteLineItem>)instances;
            Set<String> idCotTodos=new Set<String>();
            Set<String> idCotCombus=new Set<String>();
            for(QuoteLineItem tem:lqli){
                //idCotCombus.add(tem.QuoteId);
                idCotTodos.add(tem.QuoteId);
            }
            for(Quote q:[Select Id,Familia__c from Quote where Id IN:idCotTodos]){
                if(q.Familia__c=='Combustible'){
                    idCotCombus.add(q.Id);
                }
            }
            Precio_Litro__c pl=Precio_Litro__c.getInstance();
            boolean bandera=false;
            for(QuoteLineItem tem:lqli){
                if(idCotCombus.contains(tem.QuoteId)){
                    bandera=true;
                    //tem.Litros__c=pl.Precio_por_litro__c*tem.UnitPrice;
                    //tem.Litros__c=tem.UnitPrice/pl.Precio_por_litro__c;
                }
            }
            for(QuoteLineItem tem:lqli){
                if(bandera){
                    tem.Litros__c=tem.UnitPrice/pl.Precio_por_litro__c;
                }else{
                    tem.Litros__c=0;
                }
            }
            return Database.upsert(lqli);
        }

        return Database.upsert(instances);
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @description Obtiene los límites de gobierno por transacción realizada.
        * @return Objeto con los límites de gobierno de la transacción.
    **/
    public static Map<String, Object> getLimits() {
        // Map<String, Object> ret = new Map<String, Object>();
        // ret.put('DMLLimit', Limits.getLimitDMLStatements());
        // ret.put('DMLExecuted', Limits.getDMLStatements());
        // ret.put('DMLAvailable', Limits.getLimitDMLStatements() - Limits.getDMLStatements());

        // ret.put('SOQLLimit', Limits.getLimitQueries());
        // ret.put('SOQLExecuted', Limits.getQueries());
        // ret.put('SOQLAvailable', Limits.getLimitQueries() - Limits.getQueries());
        return LightningService_CTRL.getLimits();
    }

    /**
        * @author calvarez@ctconsulting.com.mx
        * @date 2018
        * @description Manejo personalizado de excepciones
    */
    public class CustomException extends Exception { }

    /*
                * @author DEV FWY
        * @date 25 SEP 2020
        * @description Calcula fecha maxima de vigencia
        */

    @RemoteAction
    public static Date calculaMaximaVigencia(Date fecha){
        Date fechaMaxima = Date.today();
        Integer diasDelMes = date.daysInMonth(fecha.year(), (fecha.month())+2);
        fechaMaxima = Date.newInstance(fecha.year(), (fecha.month())+2, diasDelMes);
        return fechaMaxima;
    }

    @Future
    private static void borrarCotizacionesRechazadas(Id oportunidadId){
        List<Quote> cotizacionAnterioresLista = [ 
            SELECT Id, Status 
            FROM quote where opportunityId =: oportunidadId 
            AND (ApprovalStatus__c = 'Rejected' OR ApprovalStatus__c = 'Rechazada')
        ];
        if( cotizacionAnterioresLista.size() > 0) {
            List<Anexo__c> listaAnexo = [
                SELECT Id, Solucion__c, Solucion__r.QuoteId 
                FROM Anexo__c 
                WHERE Solucion__r.QuoteId IN: cotizacionAnterioresLista
            ];
            try{
                delete listaAnexo;
                delete cotizacionAnterioresLista;
            }catch( exception e ){
                system.debug( 'Issue deleting quote ' + e);
            }
        }
    }

    public class ResourceWrapper {
        public String resource { get; set; }
        public Boolean isSelected { get; set; }
    
        public ResourceWrapper(String resource) {
            this.resource = resource;
            this.isSelected = false; // Inicialmente, no está seleccionado
        }
    }

    /**¨
     * NVH - PLD
     * metodo para actualizar un objeto
     */
    @AuraEnabled
    @RemoteAction
    public static String upsertRecord(String objectApiName, String jsonData) {
        try {
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(jsonData);
            
            SObject record = Schema.getGlobalDescribe().get(objectApiName).newSObject(null, true);
            
            for (String field : data.keySet()) {
                record.put(field, data.get(field));
            }
            
            List<Database.UpsertResult> results = Database.upsert(new List<SObject>{record}, false);
            
            if (results[0].isSuccess()) {
                return 'Actualización o inserción exitosa';
            } else {
                String errorMsg = 'Error en upsert: ';
                for (Database.Error error : results[0].getErrors()) {
                    errorMsg += error.getMessage() + ' ';
                }
                return errorMsg;
            }
        } catch (Exception e) {
            return 'Error inesperado: ' + e.getMessage();
        }
    }
   
}