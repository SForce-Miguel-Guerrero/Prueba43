({
    OpenModal : function(component, event, helper) {
        component.set('v.AddressList', null);
        component.set("v.showModalBox", true);
    },
    closeModal: function(component, event, helper) {
        component.set("v.showModalBox", false);
    }, 
    clear: function(component, event, helper) {
        helper.clearAddressList(component, event);
    }, 
    handleRadioChange : function(component, event, helper) {
        var selectedValue = event.getParam("value");
        
        if (selectedValue === "yes") {
            component.set("v.showInput", true);
        } else {
            component.set("v.showInput", false);
        }
    },
    doInit: function(component, event, helper) {
        console.log('EA doInit');
        helper.getPicklistValues(component);
        helper.handleDiscountVisibility(component);
        var family = component.get("v.Family");

        if(family == 'Benefits'){
            component.set("v.isEC", true);
        }
        if(family == 'Ticket Car'){
            component.set("v.isM", true);
        }
        if (family == 'Mantenimiento Fleet' && component.get("v.isMF") !== false) {
            component.set("v.isMF", true);
        }
        console.log('addressDetails', JSON.stringify(addressDetails));
        var addressDetails = component.get("v.addressDetails");
        addressDetails.RecordTypeId = component.get("v.RecordTypeId");
        addressDetails.Account__c = component.get("v.Account.Id");
        addressDetails.Contract__c = component.get("v.Contract.Id");
        component.set("v.addressDetails", addressDetails);
        console.log('addressDetails', JSON.stringify(addressDetails));
        console.log('fin EA doInit');
    },
    handleChange: function(component, event, helper) {     
        var name = event.getSource().get("v.name");
        var value = event.getSource().get("v.value");
        var plvs = component.get("v.PickListValues");
        
        if(name == 'StationType'){
            component.set("v.BusinessLineValues", plvs.StationType__c.depMap.BusinessLine__c[value]);
        }
        if(name == 'FuelBrand'){
            component.set("v.FuelTypeValues", plvs.FuelBrand__c.depMap.FuelType__c[value]);
        }
    },
    saveEstablishment: function(component, event, helper){
        console.log('saveEstablishment');
        var record = component.get("v.addressDetails");
        
        var isEC = component.get("v.isEC");
	    var isM = component.get("v.isM");
	    var isMF = component.get("v.isMF");
        
        /*if (isEC && (!record.Affiliate__c || !record.Affiliate__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Afiliado!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }*/
        
        if (isEC && (!record.Contact__c || !record.Contact__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Contacto!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isEC && (!record.Bank__c || !record.Bank__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar la Cuenta bancaria!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isM && (!record.FuelBrand__c || !record.FuelBrand__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar la Marca de Combustible!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isM && (!record.FuelType__c || !record.FuelType__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Tipo de Combustible!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Trade_type__c || !record.Trade_type__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Tipo de comercio!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Services_type__c || !record.Services_type__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Tipo de servicios!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Vehicle_type__c || !record.Vehicle_type__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Tipo de vehículos!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Facilities__c || !record.Facilities__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar las Instalaciones!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Fuel_type2__c || !record.Fuel_type2__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar el Tipo de combustible!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Maximum_capacity_per_day__c || !record.Maximum_capacity_per_day__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar la Capacidad máxima por día!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Do_you_have_valet_service__c || !record.Do_you_have_valet_service__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar ¿Cuenta con servicio de valet?!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Area__c || !record.Area__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar la Superficie (m2)!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        if (isMF && (!record.Height__c || !record.Height__c.trim().length)){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe seleccionar la Altura!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
            return;
        }
        
        var allValid = component.find('inputField').reduce(function ( validSoFar, inputCmp ) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        console.log('allValid', allValid);
        if (allValid) {
            helper.saveEstablishmentDetails(component);
        } else {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:'Error!',
                message:'Debe capturar todos los campos requeridos!',
                duration:'2000',
                key:'info_alt',
                type:'error',
                mode:'pester'
            });
            toastEvent.fire();
        }
    },
    selectOption:function(component, event, helper) {
        helper.getEstablishmentDetailsByPlaceId(component, event);
    }, 
    keyPressController: function(component, event, helper) {
        helper.getAddressRecommendations(component,event);
    },
    createRecord: function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "BankAccount__c",
            "navigationLocation": "LOOKUP",
            "defaultFieldValues": {
                "Cuenta__c": component.get("v.Account.Id")
            }
        });
        createRecordEvent.fire();
    },
   
    
        validatePostalCode: function(component, event, helper) {
    var action = component.get("c.checkPostalCode");
    var postalCode = component.get("v.addressDetails.PostalCode__c");

    // Limpiar mensajes de error y estados válidos
    component.set("v.showError", false);
    component.set("v.errorMessage", "");
    component.set("v.validStates", []);
    component.set("v.showAdditionalFields", false); // Escondemos inicialmente los campos

    // Establecer el valor predeterminado del porcentaje de IVA como 16% y bloquear 8%
    if (component.get("v.taxOption") !== '8') {
        component.set("v.taxOption", '16'); // Solo se cambia a 16% si el usuario no seleccionó 8%
        component.set("v.isTaxOptionEnabled", false); // Bloquear la opción de 8%
    }

    // Verificar que el código postal tenga 5 dígitos
    if (!postalCode || postalCode.length !== 5) {
        return; // Si no hay código postal o no es de 5 dígitos, no hacer nada
    }

    console.log("Enviando solicitud al Apex para validar el código postal. Código Postal: " + postalCode);

    // Llamada al método Apex
    action.setParams({
        postalCode: postalCode // Solo pasamos el código postal para validarlo
    });

    action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var result = response.getReturnValue();

            console.log("Resultado del Apex: " + result);

            // Si el código postal es válido para el 8%
            var validStates = ['Quintana Roo', 'Chiapas', 'CAMPECHE', 'TABASCO', 'Baja California', 'Sonora', 'Chihuahua', 'Coahuila De Zaragoza','Nuevo Leon' , 'Tamaulipas'];

            if (validStates.includes(result)) {
                console.log("Código postal válido para IVA fronterizo.");
                component.set("v.showError", false);
                component.set("v.errorMessage", "");
                component.set("v.validStates", ["valid"]);

                // Si el usuario ya seleccionó 8%, mantener esa selección
                if (component.get("v.taxOption") === '8') {
                    component.set("v.showAdditionalFields", true); // Mostrar los campos adicionales
                    component.set("v.isTaxOptionEnabled", true); // Habilitar la opción de 8%
                } else {
                    component.set("v.taxOption", '8'); // Establecer 8% si aún no fue seleccionado
                    component.set("v.isTaxOptionEnabled", true); // Habilitar 8% solo si el CP es válido
                    component.set("v.showAdditionalFields", true); // Mostrar los campos adicionales
                }
            } else {
                // El código postal no es válido para IVA fronterizo
                console.log("NTT Código postal no es válido para 8%. Fuerza 16% y oculta los campos adicionales.");
                component.set("v.showError", true);
                component.set("v.errorMessage", "El código postal no es Fronterizo.");
                component.set("v.showAdditionalFields", false); // Ocultar los campos adicionales
                component.set("v.taxOption", '16'); // Forzar la selección del 16%
                component.set("v.isTaxOptionEnabled", false); // Bloquear 8%
            }
        } else {
            console.error("Error al validar el código postal.");
        }
    });

    $A.enqueueAction(action);
	},
    

	handleTaxChange: function(component, event, helper) {
    // Obtener el valor seleccionado del evento
    var selectedTaxOption = event.getParam("value");

    // Establecer el valor seleccionado en el atributo taxOption
    component.set("v.taxOption", selectedTaxOption);

    console.log("NTT Opción de IVA seleccionada: " + selectedTaxOption);

    // Si el usuario selecciona el 8%, verificar si el código postal es válido
    if (selectedTaxOption === '8') {
        var postalCode = component.get("v.addressDetails.PostalCode__c");

        // Verificar si el código postal es válido (5 dígitos)
        if (postalCode && postalCode.length === 5) {
            var action = component.get("c.checkPostalCode");
            action.setParams({
                postalCode: postalCode // Solo pasamos el código postal para validarlo
            });

            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    console.log("Resultado del Apex: " + result);

                    // Definir los estados válidos para el 8%
                    var validStates = ['Quintana Roo', 'Chiapas', 'Campeche', 'Tabasco', 'Baja California', 'Sonora', 'Chihuahua', 'Coahuila de Zaragoza','Nuevo Leon' , 'Tamaulipas'];

                    // Verificar si el estado es válido para el 8%
                    if (validStates.includes(result)) {
                        console.log("Código postal válido para 8%. Habilitando campos adicionales.");
                        component.set("v.showAdditionalFields", true); // Mostrar los campos adicionales
                        component.set("v.isTaxOptionEnabled", true); // Habilitar la opción del 8%
                    } else {
                        console.log("Código postal no es válido para 8%. Ocultando campos y forzando 16%.");
                        component.set("v.showError", true); // Mostrar mensaje de error
                        component.set("v.errorMessage", "El codigo Postal no es Fronterizo 8%.");
                        component.set("v.showAdditionalFields", false); // Ocultar los campos adicionales
                        component.set("v.taxOption", '16'); // Forzar la selección del 16%
                        component.set("v.isTaxOptionEnabled", false); // Bloquear 8%
                    }
                } else {
                    console.error("Error al validar el código postal.");
                }
            });

            $A.enqueueAction(action);
        } else {
            console.log("NTT No hay código postal válido. Ocultando campos adicionales.");
            component.set("v.showAdditionalFields", false); // Si no hay código postal, no mostrar campos
            component.set("v.taxOption", '16'); // Forzar 16% si no hay código postal
            component.set("v.isTaxOptionEnabled", false); // Bloquear 8%
        }
    } else {
        console.log("NTT Se seleccionó un IVA distinto a 8%. Ocultando campos.");
        component.set("v.showAdditionalFields", false); // Ocultar los campos si se selecciona otro porcentaje
        component.set("v.isTaxOptionEnabled", false); // Bloquear la opción de 8% si no es seleccionada
    }
	},
    

    handleAddContact: function(component) {
            var contacts = component.get("v.contacts");
            contacts.push({ 'Name': '', 'Email': '', 'Phone': '', 'Funcion__c': '' });
            component.set("v.contacts", contacts);
    },
        
    handleRemoveContact: function(component, event) {
            var index = event.getSource().get("v.value");
            var contacts = component.get("v.contacts");
            contacts.splice(index, 1);
            component.set("v.contacts", contacts);
    },
    
    handleSaveContacts : function(component, event, helper) {
        helper.saveContactsHelper(component);
    }

})