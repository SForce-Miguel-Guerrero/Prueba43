({
    clearAddressList : function(component) {
        console.log('clearAddressList');
        component.set('v.searchKey', null)
        component.set('v.AddressList', null);
    }, 
    saveEstablishmentDetails : function(component){
        console.log('saveEstablishmentDetails');
        var record = component.get("v.addressDetails");
        console.log('record', record);
        delete record.UserRecordAccess;
        delete record.Account__r;
        console.log('registro a guardar: ', JSON.stringify(record));

        var action = component.get("c.saveEstablishmentDetailsbyId");
        action.setParams({
            addDetails:record
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var msg = response.getReturnValue();
                if(msg.startsWith('Success')){
                    if(record.Id == undefined){
                        var toastEvent = $A.get("e.force:showToast");
		                toastEvent.setParams({
		                    title:'Éxito!',
		                    message:'El establecimiento ha sido guardado!',
		                    duration:'2000',
		                    key:'info_alt',
		                    type:'success',
		                    mode:'pester'
		                });
		                toastEvent.fire();
                        
                        var rId = msg.split('|')[1];
                        console.log('rId', rId);
                        var compEvent = component.getEvent("eaiEvt");
						compEvent.setParams({"recordId" : rId});
						compEvent.fire();
                    }
                    else{
                        var toastEvent = $A.get("e.force:showToast");
	                	toastEvent.setParams({
		                    title:'Éxito!',
		                    message:'El establecimiento ha sido actualizado!',
		                    duration:'2000',
		                    key:'info_alt',
		                    type:'success',
		                    mode:'pester'
		                });
		                toastEvent.fire();
                        $A.get('e.force:refreshView').fire();
                        var rId = msg.split('|')[1];
	                    var navEvt = $A.get("e.force:navigateToSObject");
					    navEvt.setParams({
	    					"recordId": rId,
	    					"slideDevName": "Detail"
	    				});
	    				navEvt.fire();
                    }
                }
                else{
                    var toastEvent = $A.get("e.force:showToast");
	                toastEvent.setParams({
	                    title:'Error!',
	                    message:msg,
	                    duration:'2000',
	                    key:'info_alt',
	                    type:'error',
	                    mode:'pester'
	                });
	                toastEvent.fire();
                }
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title:'Error!',
                    message:'Error al actualizar el establecimiento!',
                    duration:'2000',
                    key:'info_alt',
                    type:'error',
                    mode:'pester'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    getEstablishmentDetails : function(component){
        console.log('getEstablishmentDetails');
        var id = component.get("v.recordId");
        var action = component.get("c.getEstablishmentDetailsbyId");
        action.setParams({
            id:id 
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var record = response.getReturnValue();
                console.log('AccountId', component.get("v.AccountId"));
                record.Account__c = component.get("v.AccountId");
                component.set("v.addressDetails", record);
                console.log('registro obtenido: ', record);
            }
        });
        $A.enqueueAction(action);
    },
    getPicklistValues : function(component){
        console.log('getPicklistValues');
        var id = component.get("v.recordId");
        var action = component.get("c.getPicklistValues");
        action.setParams({
            id:id 
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var plvs = response.getReturnValue();
                component.set("v.PickListValues", plvs);
                console.log('PickListValues: ', plvs);
            }
        });
        $A.enqueueAction(action);
    },
    getEstablishmentDetailsByPlaceId : function(component,event){
        console.log('getEstablishmentDetailsByPlaceId');
        var selectedValue = event.currentTarget.dataset.value;
        var action = component.get("c.getAddressDetailsByPlaceId");
        action.setParams({
            PlaceID:selectedValue 
        });
        action.setCallback(this, function(response){
            var res = response.getState();
            if(res == 'SUCCESS'){
                var response = JSON.parse(response.getReturnValue());
                var postalCode = '', state = '', country= '', city = '', street = '', street_number = '', route = '', subLocal1 = '', subLocal2 = '';
                
                for(var i=0; i < response.result.address_components.length ; i++){
                    var FieldLabel = response.result.address_components[i].types[0];
                    if(FieldLabel == 'sublocality_level_2' || FieldLabel == 'sublocality_level_1' || FieldLabel == 'street_number' || FieldLabel == 'route' || FieldLabel == 'locality' || FieldLabel == 'country' || FieldLabel == 'postal_code' || FieldLabel == 'administrative_area_level_1'){
                        switch(FieldLabel){
                            case 'sublocality_level_2':
                                subLocal2 = response.result.address_components[i].long_name;
                                break;
                            case 'sublocality_level_1':
                                subLocal1 = response.result.address_components[i].long_name;
                                break;
                            case 'street_number':
                                street_number = response.result.address_components[i].long_name;
                                break;
                            case 'route':
                                route = response.result.address_components[i].short_name;
                                break;
                            case 'postal_code':
                                postalCode = response.result.address_components[i].long_name;
                                break;
                            case 'administrative_area_level_1':
                                state = response.result.address_components[i].long_name;
                                break;
                            case 'country':
                                country = response.result.address_components[i].long_name;
                                break;
                            case 'locality':
                                city = response.result.address_components[i].long_name;
                                break;
                            default:
                                break;
                        }
                    }
                }
                
                //component.set('v.addressDetails.Name', (response.result.formatted_address+'').substring(0,80));
                component.set('v.addressDetails.Street__c', route+'');
                component.set('v.addressDetails.ExternalNumber__c', street_number+'');
                //component.set('v.addressDetails.NumeroInterior_Tt__c', '');
                component.set('v.addressDetails.Settlement__c', subLocal1+'');
                if(city == 'Ciudad de México')
                	component.set('v.addressDetails.Population__c', '');
                else
                    component.set('v.addressDetails.Population__c', city);
                component.set('v.addressDetails.PostalCode__c', postalCode+'');
                component.set('v.addressDetails.State__c', state+'');
                component.set('v.addressDetails.Country__c', country+'');
                component.set('v.addressDetails.Place_Id__c', response.result.formatted_address+'');
                component.set('v.addressDetails.location__Latitude__s', response.result.geometry.location.lat+'');
                component.set('v.addressDetails.location__Longitude__s', response.result.geometry.location.lng+'');
                component.set("v.searchKey", null);
                component.set("v.showModalBox", false);
            }
        });
        $A.enqueueAction(action);
    },
    getAddressRecommendations : function(component, event){
        console.log('getAddressRecommendations');
        var key = component.get("v.searchKey");
        var action = component.get("c.getAddressSet");
        action.setParams({
            "SearchText": key
        });
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('state', state);
            if (state === "SUCCESS") {
                var response = JSON.parse(response.getReturnValue());
                //console.log('response', response);
                var predictions = response.predictions;
                var addresses = [];
                if (predictions.length > 0) {
                    for (var i = 0; i < predictions.length; i++) {
                        var bc =[];
                        addresses.push(
                            {
                                main_text: predictions[i].structured_formatting.main_text, 
                                secondary_text: predictions[i].structured_formatting.secondary_text,
                                place_id: predictions[i].place_id
                            });
                        
                    }
                }
                component.set("v.AddressList", addresses);
            }
        });
        $A.enqueueAction(action);
    },
    
    handleDiscountVisibility: function(component, event) {
        var nttProductName = component.get("v.nttProductName");
        var nttProductCode = component.get("v.nttProductCode");
        var nttFamily = component.get("v.nttFamily");
        
        //console.log('NTT  EstablishmentAddress  nttProductName '+nttProductName);   
        //console.log('NTT  EstablishmentAddress nttProductCode '+ nttProductCode); 
        //console.log('NTT  EstablishmentAddress  nttFamily :  '+ nttFamily); 
       	//console.log('Ayudaaa:  ', nttFamily); 
        if (nttProductCode === '43-A' && nttProductName === '43-Mantenimiento Fleet Afiliado' && nttFamily === 'Mantenimiento Fleet') {
        //console.log('Mostrando sección de descuento versión 72');
        component.set("v.tableDiscount", true);
        //console.log('Debe Mostar la tabla');
        component.set("v.isMF",false); 
    	}else if(nttFamily === 'Mantenimiento Fleet'){ 
            component.set("v.isMF", true);
        } else {
        //console.log('Ocultando sección de descuento');
        //console.log('Ayudaaa:  3'); 
        component.set("v.tableDiscount", false);
        component.set("v.isMF", true); 
    	}

    },
    saveContactsHelper: function(component) {   
        var contacts = component.get("v.contacts");
        var accountId = component.get("v.Account.Id");  
        console.log("NTT Account ID:" + accountId);
        if (!contacts || contacts.length === 0) {
            console.warn("NTT No hay contactos para guardar.");
            return;
        }
        if (!accountId) {
            console.log("El ID de cuenta no es válido." + accountId );
            return;
        }
        var action = component.get("c.saveContacts");
        action.setParams({
            contacts: contacts,
            accountId: accountId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("NTT Contactos guardados correctamente.");
                component.set("v.contacts", []);
            } else {
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    console.error("NTT Error al guardar contactos: " + errors[0].message);
                } else {
                    console.error("NTT  Error desconocido.");
                }
            }
        });
        $A.enqueueAction(action);
    }
})