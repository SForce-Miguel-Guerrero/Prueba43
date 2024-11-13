({
    hideSpinGlobal: function (component, event, helper) {
        component.set("v.loadingPage", false);
    },
    clickTest: function (component, event, helper) {
        alert('nam');
        var nam = event.getSource().get("v.name");
        alert('-' + nam);
    },
    init: function (component, event, helper) {
        console.log('9:30');
        helper.getMotivosRechazo(component, event);
        //console.log('init : ', ctcLightning);
        var contratoId = component.get("v.recordId");
        $A.createComponent("c:DireccionesEntrega_LC", {
            "aura:id": "recordId",
            "recordId": contratoId,
            "withControl": false
        }, function (newCmp, status, errorMessage) {
            if (component.isValid()) {
                if (status == "ERROR") {
                    console.log('Error Message--', errorMessage);
                }
                component.set("v.dirEntregaCMP", newCmp);
            }
        });
        var describeSObjects = component.get('c.describeSObjects');
        describeSObjects.setParams({ objs: ['TiposDocumento__c'] })
        ctcLightning.aura(describeSObjects, component)
            .then($A.getCallback(function (res) {
                component.set('v.app_edenred.schema', res);
                var executeQuery = component.get("c.executeQuery");
                //executeQuery.setParams({query: "SELECT Id, Name, ActaConstitutivaCliente__c, AdjuntoA__c, AltaSHCP__c, CURP__c, CedulaRFC__c, ComprobanteDomicilioCliente__c, ComprobanteDomicilioFiscal__c, ConstanciaRFCCliente__c, ConstanciaRFC__c, ContratoFirmado__c, FM3__c, IdentificacionOficialCliente__c, PoderNotarial__c, RFCDoc__c, RFC__c, RegistroPatronal__c, Comprobante_de_Domicilio_Afiliado__c, Constancia_de_Situaci_n_Fiscal__c, Estado_de_Cuenta__c, ActaConstitutiva__c FROM TiposDocumento__c WHERE Name LIKE '%EL' or Name LIKE '%DocumentosOportunidad%'"})
                executeQuery.setParams({ query: "SELECT Id, Name, ActaConstitutivaCliente__c, AdjuntoA__c, AltaSHCP__c, CURP__c, CedulaRFC__c, ComprobanteDomicilioCliente__c, ComprobanteDomicilioFiscal__c, ConstanciaRFCCliente__c, ConstanciaRFC__c, ContratoFirmado__c, FM3__c, IdentificacionOficialCliente__c, PoderNotarial__c, RFCDoc__c, RFC__c, RegistroPatronal__c, Comprobante_de_Domicilio_Afiliado__c, Constancia_de_Situaci_n_Fiscal__c, Estado_de_Cuenta__c, ActaConstitutiva__c, CartaStandBy__c, EstadosFinancieros__c, EstudioRiesgo__c, FianzaCredito__c, FormatoBuroOriginal__c, DeclaracionesHacienda__c, Actualizacion_direccion_fiscal__c, Convenio_Modificatorio_Firmado__c, Pagare__c, Edenred_Mexico__c, Servicios_Soluciones_Empresariales__c, Otros__c, Solicitud_de_incorporaci_n__c, GLBAr_Constancia_CUIT__c, GLBAr_Estatuto_Social__c, GLBAr_Poder_Notarial__c, GLBAr_Documentacion_Impositiva__c, GLBAr_Documento_Identidad__c, GLBAr_Estados_Contables__c, GLBAr_Formulario_F71__c, GLBAr_Persona_Expuesta__c, Certificado_de_Exclusi_n__c  FROM TiposDocumento__c WHERE Name LIKE '%EL' or Name LIKE '%DocumentosOportunidad%' or Name LIKE '%MPago%'" })//CEAM:3375
                return ctcLightning.aura(executeQuery, component)
            }))
            .then($A.getCallback(function (res) {
                if (res && res.length > 0) {
                    var documentos = {};
                    var { TiposDocumento__c = {} } = component.get('v.app_edenred.schema');
                    for (var doc of res) {
                        documentos[doc.Name] = doc;
                        documentos[doc.Name].label = {};        
                        for (var field in doc) {
                            if (doc[field] == true && TiposDocumento__c.hasOwnProperty(field)) {
                                // documentos[doc.Name].label[field] = TiposDocumento__c[field].label;
                                var label = TiposDocumento__c[field].label
                                //archivo válido para ser mostrado, es decir, puede haber más ContentDocument Asociados a Opportunity ó EntidadLegal__c
                                documentos[doc.Name].label[label] = TiposDocumento__c[field].label;
                            } else if (doc[field] == false) {
                                delete documentos[doc.Name][field];
                            }
                        }
                    }
                    console.log('documentos: ', documentos);
                    component.set('v.app_edenred.documentos', documentos);
                    helper.getInitialData(component, contratoId);
                }
            })).catch($A.getCallback(function (err) {
                console.log("error: ", err);
            }))
    },
    handleClick: function (component, event, helper) {
        var url = location.href;  // entire url including querystring - also: window.location.href;
        var baseURL = url.substring(0, url.indexOf('/', 14));

        console.log('handleClick:', event.target.name);
        var attachName = event.target.name;
        var attachId = event.target.id;

        if (attachName.indexOf('.pdf') != -1) {
            var url = baseURL + "/servlet/servlet.FileDownload?file=" + attachId;
            console.log('URL:' + url);
            component.set("v.isOpen", true);
            component.set("v.urlPDF", url);
        } else {
            //window.open("../servlet/servlet.FileDownload?file=" + attachId); original 8/08/2018
            // window.location = "/lightning/r/ContentDocument/" + attachId + "/view";
            // window.open("/sfc/servlet.shepherd/version/download/" + attachId)
            console.log('download attachId: ', attachId, $A.get('e.lightning:openFiles'));
            $A.get('e.lightning:openFiles').fire({ recordIds: [attachId] });
        }
    },
    closeModel: function (component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"
        component.set("v.isOpen", false);
    },
    likenClose: function (component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer 
        // and set set the "isOpen" attribute to "False for close the model Box.
        alert('thanks for like Us :)');
        component.set("v.isOpen", false);
    },
    // guardaContrato: function (component, event, helper) {
    //     var dataSource = component.get("v.dataSource");
    //     helper.save(component, dataSource);
    // },
    
    actualizarClienteRenegociado: function(component, event, helper) {
        console.log("----> ACTUALIZAR CLIENTE RENEGOCIADO <----");
        component.set("v.spinAs400", true);

        console.log("SR--> contrato: ", JSON.stringify(component.get("v.dataSource"),null,2));
        console.log("SR--> filial: ", JSON.stringify(component.get("v.filialesSource")));
        console.log("SR--> extras: ", JSON.stringify(component.get("v.subcuentasAdicionales")));
		console.log("SR--> updateClientMercedesAvailable: ", component.get("v.updateClientMercedesAvailable"));

        helper.sendClientMercedes(component, event);

    },

    generarClientes: function (component, event, helper) {
        component.set("v.btnInactive", false);
        console.log("INICIO GENERA");
        component.set("v.spinAs400", true);
        var contrato = component.get("v.dataSource");
        console.log("NVH--> contrato: ", JSON.stringify(contrato,null,2));
        var filial = component.get("v.filialesSource");
        console.log("NVH--> filial: ", JSON.stringify(filial));
        var extras = component.get("v.subcuentasAdicionales");
        console.log("NVH--> extras: ", JSON.stringify(extras));
        var codigos = [];
        if (contrato && contrato.Contrato2__c && contrato.Contrato2__c.CodigoAS400__c && contrato.Contrato2__c.CodigoAS400__c.length > 0) {
            let isProductFleet = helper.isProductFleet(component, event);
			let isProductEcovale = helper.isProductEcovale(component, event);
            let isProduct43 = helper.isProduct43(component, event);
            
            console.log("NVH--> isProductFleet: ", isProductFleet);
			console.log("CB--> isProductEcovale: ", isProductEcovale);
            console.log("NTT--> isProduct43: ", isProduct43);
            //Solo para ejecucion de producto 33 (producto fleet)
            if(isProductFleet || isProductEcovale || isProduct43) { //Incluir producto 60
                console.log('SR--> SendClientMercedes RT: ', contrato.Opportunity.RecordType.DeveloperName);
                helper.sendClientMercedes(component, event);
            }
            else {
                var filialFlag = true;
                codigos.push(contrato.Contrato2__c.CodigoAS400__c);
                if (filial && filial.length > 0) {
                    if (filial) {
                        for (var x = 0; x < filial.length; x++) {
                            if (filial[x].CodigoAS400__c == undefined || filial[x].CodigoAS400__c.length == 0) {
                                filialFlag = false;
                            } else {
                                console.log();
                                codigos.push(filial[x].CodigoAS400__c);
                            }
                        }
                    }
                }
    
                if (extras.length > 0) {
                    for (var x = 0; x < extras.length; x++) {
                        if (extras[x].CodigoAS400__c == null || extras[x].CodigoAS400__c == '') {
                            filialFlag = false;
                        } else {
                            codigos.push(extras[x].CodigoAS400__c);
                        }
                    }
                }
                if (!filialFlag) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "duration": "15000",
                        "type": "error",
                        "title": "Error al aprobar",
                        "message": "Debe contar con codigos AS400"
                    });
                    toastEvent.fire();
                    component.set("v.spinAs400", false);
                } else {
                    console.log("LLAMA HELPER");
                    console.log(JSON.stringify(contrato, null, 2));
                    // if (contrato.Product2__c.isPhantomIntegration__c) {
                    //     console.log('triggering phantom integration');
                    // } else {
                    //     helper.generarClientAs400(component, event);
                    // }
                    helper.generarClientAs400(component, event);

                    var productCode = JSON.stringify(contrato.Product2__c.ProductCode,null,0);
				    let button = component.find('disablebuttonid');
                    if(productCode == '"95"' || productCode == '"96"'){
                       button.set('v.disabled',true);
                    }else{
                       button.set('v.disabled',false);
                    }
                }
            }
            
        } else {
            var toastEvent2 = $A.get("e.force:showToast");
            console.log('Llenar filiales2', toastEvent2);
            toastEvent2.setParams({
                "duration": "15000",
                "type": "error",
                "title": "Error al aprobar",
                "message": "Debe contar con codigos AS400"
            });
            toastEvent2.fire();
            component.set("v.spinAs400", false);
        }
    },
    
    //--Inicia crear cliente MoPay
    
    gestionaMoPayActivo: function (component, event, helper){
    	if(component.get("v.NTT_MoPayActivo") == 'true'){
            var a = component.get('c.generarClientesMopay');
        	$A.enqueueAction(a);
          }else{
            var a = component.get('c.generarClientes');
        	$A.enqueueAction(a);  
        }
	},
    
    gestionaMoPayActivoAprov: function (component, event, helper){
        if(component.get("v.NTT_MoPayActivo") == 'true'){
            var a = component.get('c.aprobarADVMoPay');
        	$A.enqueueAction(a);
          }else{
            var a = component.get('c.aprobarADV');
        	$A.enqueueAction(a);
        }
	},
    
    generarClientesMopay: function (component, event, helper) {
        component.set("v.btnInactive", true);
        console.log("INICIO GENERA");
        component.set("v.spinAs400", true);
        var contrato = component.get("v.dataSource");
        console.log("NVH--> contrato: ", JSON.stringify(contrato,null,2));
        var filial = component.get("v.filialesSource");
        console.log("NVH--> filial: ", JSON.stringify(filial));
        var extras = component.get("v.subcuentasAdicionales");
        console.log("NVH--> extras: ", JSON.stringify(extras));
        var codigos = [];
        if (contrato && contrato.Contrato2__c && contrato.Contrato2__c.CodigoAS400__c && contrato.Contrato2__c.CodigoAS400__c.length > 0) {
            let isProductFleet = helper.isProductFleet(component, event);
			let isProductEcovale = helper.isProductEcovale(component, event);
            console.log("NVH--> isProductFleet: ", isProductFleet);
			console.log("CB--> isProductEcovale: ", isProductEcovale);
            
            helper.sendClientMoPay(component, event);
            
        } else {
            var toastEvent2 = $A.get("e.force:showToast");
            console.log('Llenar filiales2', toastEvent2);
            toastEvent2.setParams({
                "duration": "15000",
                "type": "error",
                "title": "Error al aprobar",
                "message": "Debe contar con codigos AS400"
            });
            toastEvent2.fire();
            component.set("v.spinAs400", false);
        }
    },
    
    aprobarADVMoPay: function (component, event, helper) {
        //ALTAS BE component.set("v.btnInactive", true);
        console.log('::aprobarADVMoPay::');
		var contrato = component.get("v.dataSource");
        console.log("contrato::::", JSON.parse(JSON.stringify(contrato)));
        var filial = component.get("v.filialesSource");
        console.log("filiales::::", JSON.parse(JSON.stringify(filial)));
        var extras = component.get("v.subcuentasAdicionales");
        console.log("extras::::", JSON.parse(JSON.stringify(extras)));
        var estabs = component.get("v.establecimientos");
        console.log("establecimientos::::", JSON.parse(JSON.stringify(estabs)));
        var errorMerchants = '';
        console.log("Is phantom Integration? ", contrato.Product2__c.isPhantomIntegration__c);
        
        console.log('CB: Entra aprobacion producto 29');
		helper.aprobarContratoMoPay(component, contrato);
    },
    //--Termina crear cliente MoPay
    
    aprobarADV: function (component, event, helper) {
        //ALTAS BE component.set("v.btnInactive", true);
        console.log('::aprobarADV::');
		let requireIdUniqueIntegration = [
			'33-Fleet Edenred',
			'60 - Ecovale Combustible',
            '43-Mantenimiento Fleet Afiliado',
            '43-Mantenimiento Fleet'
		];
        var contrato = component.get("v.dataSource");
        console.log("contrato::::", JSON.parse(JSON.stringify(contrato)));
        var filial = component.get("v.filialesSource");
        console.log("filiales::::", JSON.parse(JSON.stringify(filial)));
        var extras = component.get("v.subcuentasAdicionales");
        console.log("extras::::", JSON.parse(JSON.stringify(extras)));
        var estabs = component.get("v.establecimientos");
        console.log("establecimientos::::", JSON.parse(JSON.stringify(estabs)));
        var errorMerchants = '';
        console.log("Is phantom Integration? ", contrato.Product2__c.isPhantomIntegration__c);
        
        if(((contrato && contrato.Contrato2__c && contrato.Contrato2__c.CodigoAS400__c && contrato.Contrato2__c.CodigoAS400__c.length > 0) 
			|| contrato.Opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion'))
			&& (contrato.Product2__c.Name != '33-Fleet Edenred' && contrato.Product2__c.Name != '43-Mantenimiento Fleet Afiliado' && contrato.Product2__c.Name !=   '43-Mantenimiento Fleet')
		){
            var filialFlag = true;
            if(filial && filial.length > 0 && !contrato.Opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion')){
                if(filial) {
                    for(var x = 0; x < filial.length; x++) {
                        if(filial[x].CodigoAS400__c == undefined || filial[x].CodigoAS400__c.length == 0) {
                            console.log('no existe codigo en filiales');
                            filialFlag = false;
                        }
                    }
                }
            }

            if (extras && extras.length > 0) {
                let regexNumExp = new RegExp("^\\d{3}\\-\\d{3}\\-\\d{5}\\-\\d{3}$");
                let regexMerchant43 = new RegExp("^\\d{3}\\-\\d{7}$");
                for (var x = 0; x < extras.length; x++) {
                    if (!(contrato && contrato.Contrato2__c && contrato.Contrato2__c.CodigoAS400__c && contrato.Contrato2__c.CodigoAS400__c.length > 0)) {
                        contrato.Contrato2__c.CodigoAS400__c = extras[x].CodigoAS400__c;
                    }
                    
                    if (extras[x].CodigoAS400__c == null || extras[x].CodigoAS400__c == '') {
                        //errorMerchants = 'Es necesario capturar los códigos Merchant indicados en la sección Afiliados'; 
                        errorMerchants = 'Es necesario capturar el ID Phantom Merchant indicados en la sección Afiliados';  
                        console.log('no existe codigo en extras');
                        filialFlag = false;
                    }

                    if(!regexMerchant43.test(extras[x].CodigoAS400__c) && extras[x].CodigoAS400__c != null && extras[x].CodigoAS400__c != '' && extras[x].ProductCode == '43') {
                        errorMerchants = 'El ID Phantom debe tener el siguiente formato 000-0000000';  
                        filialFlag = false;
                    }
                    //Validamnos que el nmero de expediente no venga nulo
                    if ((extras[x].FileNumber__c == null || extras[x].FileNumber__c == '') && extras[x].ProductCode=='43') {
                        //errorMerchants = 'Es necesario capturar los códigos Merchant indicados en la sección Afiliados'; 
                        errorMerchants = 'Es necesario capturar el Número de expediente';  
                        console.log('no existe codigo en extras');
                        filialFlag = false;
                    }
                        //6452 Se valida que el numero ingresado cuante con el formato valido
                    if(!regexNumExp.test(extras[x].FileNumber__c) && extras[x].FileNumber__c != null && extras[x].FileNumber__c != '' && extras[x].ProductCode == '43'){
                        errorMerchants = 'Dev El número de expediente deberá tener el siguiente formato 000-000-00000-000.'; 
                        console.log('formato de código inválido');
                        filialFlag = false;
                    }
                    
                }
            }
            
            if(estabs && estabs.length > 0){
                let regex = new RegExp("^\\d{2}\\-\\d{2}\\-\\d{5}\\-\\d{3}\\-\\d{3}$");
                let regexprod43 = new RegExp("^\\d{3}\\-\\d{7}\\-\\d{5}$"); //REQ: 6452 
                console.log('NTT PRUEBA ');
                var mySet = new Set();
                for(var x = 0; x < estabs.length; x++) {
                    console.debug('ESTABS: ', estabs[x]);
                    if(estabs[x].StationId__c == null || estabs[x].StationId__c == '') {//REQ: 6452 
                        if(estabs[x].ProductCode == '43') errorMerchants = 'Es necesario capturar el ID Phantom Establecimiento indicados en la sección Establecimientos';
                        else errorMerchants = 'Es necesario capturar los Códigos de Establecimiento indicados en la sección Establecimientos';
                         console.log('no existe codigo en estabs');
                        console.log('CAMBIO');
                        filialFlag = false;
                    } else {//REQ: 6452 
                        //6452 nueva regla
                        if(!regex.test(estabs[x].StationId__c) && undefined != estabs[x].ProductCode && estabs[x].ProductCode != '43') {//Producto 43
                            //if(!regex.test(estabs[x].StationId__c) && estabs[x].ProductCode != '43'  ){    
                            errorMerchants = 'El código de establecimiento debe tener el siguiente formato 00-00-00000-000-000.';
                            console.log('formato de código inválido');
                            filialFlag = false;
                            
                        } else if(!regexprod43.test(estabs[x].StationId__c) && undefined != estabs[x].ProductCode && estabs[x].ProductCode == '43') {
                            errorMerchants = 'El ID Phantom Establecimiento debe tener el siguiente formato 000-0000000-00000.';
                            console.log('formato de código inválido');
                            filialFlag = false;
                        } else {
                            if(mySet.has(estabs[x].StationId__c.slice(estabs[x].StationId__c.length-4,estabs[x].StationId__c.length))){
                                    errorMerchants = 'Número de establecimiento repetido, por favor valide.';
                                console.log('terminación repetida en estabs');
                                filialFlag = false;
                            }else{
                                mySet.add(estabs[x].StationId__c.slice(estabs[x].StationId__c.length-4,estabs[x].StationId__c.length));
                            }
                        }    
                    }
                }
            }

            if (!filialFlag) {
                // ALTAS BE component.set("v.btnInactive", false);
                var error = '';
                if (contrato.Opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion')) {
                    error = errorMerchants;
                }
                else {
                    error = 'Es necesario capturar los números de cliente indicados en la sección Subcuentas adicionales';
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "duration": "15000",
                    "type": "error",
                    "title": "Error al aprobar",
                    "message": error
                });
                toastEvent.fire();
            } else {
                var eL = component.get('v.entidadLegal');
                eL.CodigoAS400__c = contrato.Contrato2__c.CodigoAS400__c;
                console.log('filialesSource: '+filial);
                component.set("v.filialesSource", filial);
                component.set('v.entidadLegal', eL);

                if (contrato.Product2__c.isPhantomIntegration__c) {
                    console.log('Phantom Integration');
                }
                helper.aprobar(component, contrato, filial);
            }
        } else if((contrato.Opportunity.RecordType.DeveloperName.includes('Migracion')
					|| contrato.Opportunity.RecordType.DeveloperName.includes('VentaNueva')
                    ||contrato.Opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion_M')
					) && (requireIdUniqueIntegration.includes(contrato.Product2__c.Name)
                    ||helper.isProduct43(component))
		) {
			console.log('CB: Entra aprobacion producto fleet 33/ Ecovale 60');
			helper.aprobarContrato(component, contrato);
			
		} else if (contrato.Opportunity.RecordType.DeveloperName.includes('RT_Renegotiation') /*|| contrato.Opportunity.RecordType.DeveloperName.includes('Activacion_Servicio')*/ ) {//CEAM: 3563   //6298: (Descomentar 'Activacion_Servicio' si se activa Tarjetas Virtuales)
            if (contrato.Product2__c.isPhantomIntegration__c) {
                console.log('Phantom Integration');
            }
            helper.aprobarContrato(component, contrato);
			console.log('#1 Track renegotiation Fleet 33');
        } else {
            //ALTAS BE component.set("v.btnInactive", false);
            var error = '';
            if (contrato.Opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion')){
                error = "Debe capturar el código Merchant";
            }
            else {
                error = "Debe contar con codigos AS400";
            }
            var toastEvent2 = $A.get("e.force:showToast");
            toastEvent2.setParams({
                "duration": "15000",
                "type": "error",
                "title": "Error al aprobar",
                "message": error
            });
            toastEvent2.fire();
        }
    },

    rechazarADV: function (component, event, helper) {
        var toastEvent2 = $A.get("e.force:showToast");
        var dataSource = component.get("v.dataSource");

        var motivos = component.get("v.motivosRechazoSelec");
        //if(dataSource.Contrato2__c.Comentarios_ADV__c == null || dataSource.Contrato2__c.Comentarios_ADV__c == undefined || dataSource.Contrato2__c.Comentarios_ADV__c.length == 0){
        if (motivos == null || motivos == undefined || motivos.length == 0) {
            toastEvent2.setParams({
                "duration": "15000",
                "type": "error",
                "title": "Error al rechazar",
                "message": "Debe ingresar al menos un motivo para rechazar."
            });
            toastEvent2.fire();
        } else {
            helper.rechazar(component, dataSource);
        }
    },
    updateData: function (component, event, helper) {
        console.log('entro updateData:', event.target.id);

        var filial = component.get('v.filialesSource');
        var eL = component.get('v.entidadLegal');

        if (eL) {
            eL.Disabled = (eL.Id == event.target.id) ? false : true;
        }
        component.set('v.entidadLegal', eL);

        if (filial) {
            for (var x = 0; x < filial.length; x++) {
                filial[x].Disabled = (filial[x].Entidad_Cuenta__r.EntidadLegal__r.Id == event.target.id) ? false : true;
            }
        }
        component.set('v.filialesSource', filial);

        helper.getNewRepresentanteLegal(component, event.target.id);
    },
    hidePDFSpinner: function (component, event) {
        console.log('evento hidePDFSpinner:', event.getParam('isReady'));
        component.set("v.btnActionAprobar", false);
        component.set("v.loadingPage", false);// Req Producto 43
    },
    generaXML: function (component, event, helper) {
        console.log('evento hidePDFSpinner:');
        component.set("v.btnActionXML", true);
        helper.createXML(component);
    },
    ocultarMostrar: function (component, event, helper) {
        component.set("v.modalErrores", !component.get("v.modalErrores"));
    },
    generaPDF: function (component, event, helper) {
        helper.generaPDF(component);
    }
})