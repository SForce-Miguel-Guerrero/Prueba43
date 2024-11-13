({
	init: function(component, event, helper) {
		//console.clear();
		// Helper calls
		// helper.getAccountInformation(component);
		// Helper calls
		// Constants
		const JS_UNDEFINED_TYPE = 'undefined';
		// const PDF_EXT = '.pdf';
		// Constants
		// Variables
		let employerRegistrationCodes = '';
		let oppProductCode = '';
		let oppDocuments = [];
		var recordTypeOpp = '';//CEAM:3563
        let productoCotizacion = '';
		var productCode = '';
		var pais = '';
		// Variables
		helper.createActionPromise(component, {
			name: 'getEmployerRegistrationData',
			params: {
				oppId: component.get('v.recordId')
			}
		})
		.then(response => {
			console.log('init(), 1st responsee');
			console.log('init(), response.getReturnValue():', response.getReturnValue());
			if (typeof response.getReturnValue() !== JS_UNDEFINED_TYPE) {
				let mapEmployerRegOpp = response.getReturnValue();
				recordTypeOpp = mapEmployerRegOpp.opportunity.RecordType.DeveloperName;//CEAM:3563
                productoCotizacion = mapEmployerRegOpp.opportunity.Producto_cotizacion__c;
				pais = mapEmployerRegOpp.opportunity.PaisOrigen_FTt__c;
				console.log('recordTypeOpp ',recordTypeOpp);
				console.log('mapEmployerRegOpp ',mapEmployerRegOpp);
				if(recordTypeOpp == 'RT_Renegotiation') {
					if(mapEmployerRegOpp.opportunity.Product__r.ProductCode == undefined && mapEmployerRegOpp.opportunity.Codigo_Producto_cotizacion__c) {
						$A.get('e.force:showToast')
						.setParams({
							duration: '10000',
							type: 'error',
							title: 'Error',
							message: 'La oportunidad no posee producto relacionado.'
						})
						.fire();
					}
					productCode = mapEmployerRegOpp.opportunity.Product__r.ProductCode != undefined ? mapEmployerRegOpp.opportunity.Product__r.ProductCode : mapEmployerRegOpp.opportunity.Codigo_Producto_cotizacion__c;
					console.log('productCode ', productCode);
					if(productCode == '33') {
						component.set("v.showConvenioModificatorioButton", true);
					}
				}

				if(recordTypeOpp == 'Renegociacion_Merchant') {
					if(mapEmployerRegOpp.opportunity.Product__r.ProductCode == undefined && mapEmployerRegOpp.opportunity.Codigo_Producto_cotizacion__c) {
						$A.get('e.force:showToast')
						.setParams({
							duration: '10000',
							type: 'error',
							title: 'Error',
							message: 'La oportunidad no posee producto relacionado.'
						})
						.fire();
					}
					productCode = mapEmployerRegOpp.opportunity.Product__r.ProductCode != undefined ? mapEmployerRegOpp.opportunity.Product__r.ProductCode : mapEmployerRegOpp.opportunity.Codigo_Producto_cotizacion__c;
					console.log('productCode ',productCode);
					if(productCode == '33-AF') {
						component.set("v.showConvenioModificatorioButton", true);
					}
				}

				if(mapEmployerRegOpp.hasOwnProperty('opportunity') && mapEmployerRegOpp.opportunity.RecordType.DeveloperName.includes('RT_NuevaAfiliacion')){
					component.set("v.esAfiliacion",true);
				}else{
					component.set("v.esAfiliacion",false);
				}
				if(mapEmployerRegOpp.quoteLine.DocumentType__c){//CEAM:3375
					component.set("v.documentType",mapEmployerRegOpp.quoteLine.DocumentType__c);//CEAM:3375
				}//CEAM:3375

				if (mapEmployerRegOpp.hasOwnProperty('employerRegistrationCodes') && mapEmployerRegOpp.employerRegistrationCodes.hasOwnProperty('CodigosRegistroPatronal__c')) {
					employerRegistrationCodes = mapEmployerRegOpp.employerRegistrationCodes.CodigosRegistroPatronal__c;
					if (mapEmployerRegOpp.hasOwnProperty('opportunity') && mapEmployerRegOpp.opportunity.hasOwnProperty('Codigo_Producto_cotizacion__c')) {
						oppProductCode = mapEmployerRegOpp.opportunity.Codigo_Producto_cotizacion__c;
						// return helper.createActionPromise(component, {
						// 	name: 'getDocsByTypePerson',
						// 	params: {}
						// });
					}
					// else {
					// 	return Promise.reject(new Error('Hubo un problema al obtener los datos de la Oportunidad'));
					// }
					console.log(employerRegistrationCodes, ',', oppProductCode);
					return helper.createActionPromise(component, {
						name: 'getDocsByTypePerson',
						params: {}
					});
				} else {
					return Promise.reject(new Error('Hubo un problema al obtener los datos de la Configuración Personalizada "Negocio"'));
				}
			} else {
				return Promise.reject(new Error('Hubo un problema al obtener los datos de la Configuración Personalizada "Negocio" y de la Oportunidad'));
			}
		})
		.then(response => {
			console.log('init(), 2nd response');
			console.log('init(), response.getReturnValue():', response.getReturnValue());
            console.log('productoCotizacion: ' + productoCotizacion);
			console.log('response.getReturnValue()["DocumentosOportunidadRenegociacion"] ', response.getReturnValue()['DocumentosOportunidadRenegociacion']);
			console.log('response.getReturnValue().hasOwnProperty ', response.getReturnValue().hasOwnProperty('DocumentosOportunidad'));
			if ((typeof response.getReturnValue() !== JS_UNDEFINED_TYPE) && response.getReturnValue().hasOwnProperty('DocumentosOportunidad')){
            
            	if(component.get("v.esAfiliacion") && component.get("v.documentType")){//CEAM:3375
					oppDocuments = recordTypeOpp != 'RT_Renegotiation' ? response.getReturnValue()['DocumentosOportunidadAfiliacion'] : response.getReturnValue()['DocumentosOportunidadRenegociacion'];//CEAM:3375 //CEAM:3563
					oppDocuments = oppDocuments.concat(response.getReturnValue()[component.get("v.documentType")]);//CEAM:3375
				}else if(recordTypeOpp == 'RT_Renegotiation_merchants') {
					oppDocuments = response.getReturnValue()['DocumentosOportunidadRenMerchant'];  //DocumentosOportunidadRenMerchant 6705
				}else if(recordTypeOpp == 'Renegociacion_Merchant') {
					oppDocuments = response.getReturnValue()['DocumentosOportunidadRenMerchant'];  //DocumentosOportunidadRenMerchant 6705
        		}else if(component.get("v.esAfiliacion")  && productoCotizacion === 'Mantenimiento Fleet Edenred + Américas') {//CEAM:6452
				oppDocuments = response.getReturnValue()['DocumentoMttoFEAmericas'];  //DocumentoMttoFEAmericas
				}else if(component.get("v.esAfiliacion")  && productoCotizacion === '43 Mantenimiento Fleet Américas') {//CEAM:6452
				oppDocuments = response.getReturnValue()['DocumentosERMX'];
				}else if(component.get("v.esAfiliacion") && productoCotizacion === '31 Mantenimiento de flota') {//CEAM:6452  
					oppDocuments = response.getReturnValue()['DocumentoSYSE'];
                }else if(component.get("v.esAfiliacion") && recordTypeOpp != 'RT_Renegotiation') {//CEAM:3563
					oppDocuments = response.getReturnValue()['DocumentosOportunidadAfiliacion'];
				}else if(component.get("v.documentType")){//CEAM:3375
					oppDocuments = recordTypeOpp != 'RT_Renegotiation' ? response.getReturnValue()['DocumentosOportunidad'] : response.getReturnValue()['DocumentosOportunidadRenegociacion'];//CEAM:3375 //CEAM:3563
					oppDocuments = oppDocuments.concat(response.getReturnValue()[component.get("v.documentType")]);//CEAM:3375
	            } else {
                    oppDocuments = recordTypeOpp != 'RT_Renegotiation' ? /*(recordTypeOpp != 'Activacion_Servicio' ?*/ response.getReturnValue()['DocumentosOportunidad'] /*:response.getReturnValue()['OportunidadActivacionServicio'] )*/ : response.getReturnValue()['DocumentosOportunidadRenegociacion'];//CEAM:356  //6298:Activacion_Servicio
				}
				// Setting some useful properties to each object document in the array
				for (let oppDocument of oppDocuments) {
          console.log('oppDocument.apiName: ' + oppDocument.apiName);
					if (oppDocument.apiName === 'RegistroPatronal__c') {
						if (employerRegistrationCodes.includes(oppProductCode) && recordTypeOpp != 'RT_ChangeParameters' && recordTypeOpp != 'RT_CreditRenewal') {
							oppDocument.isVisible = true;
						} else {
							oppDocument.isVisible = false;
						}
					} else if (oppDocument.apiName === 'Otros__c') {
            console.log('uno');
						if ( recordTypeOpp == 'Renegociacion_Merchant') {
							oppDocument.isVisible = true;
						} else {
							oppDocument.isVisible = false;
						}
          } else if (oppDocument.apiName === 'ContratoFirmado__c') {
            console.log('uno');
						if ((recordTypeOpp == 'BPfleet' || 
							recordTypeOpp == 'Migracion' ||
							recordTypeOpp == 'RT_NuevaAfiliacion_EC' || 
							recordTypeOpp == 'RT_NuevaAfiliacion_M' || 
							recordTypeOpp == 'Renegociacion_Merchant' ||
							recordTypeOpp == 'VentaNueva') && pais != 'Argentina') {
							oppDocument.isVisible = true;
						} else {
							oppDocument.isVisible = false;
						}
          }else if (oppDocument.apiName === 'Solicitud_de_incorporaci_n__c'  || oppDocument.apiName === 'Certificado_de_Exclusi_n__c') {
            console.log('uno');
						if (recordTypeOpp == 'VentaNueva' && pais == 'Argentina') {
							oppDocument.isVisible = true;
						} else {
							oppDocument.isVisible = false;
						}
                    }else if(oppDocument.apiName === 'Edenred_Mexico__c'){
                        console.log('dos');
                        if(recordTypeOpp == 'RT_NuevaAfiliacion_M'){
                            oppDocument.isVisible = true;
                           }else{
                             oppDocument.isVisible = false;
                           }
                    }else if(oppDocument.apiName === 'Servicios_Soluciones_Empresariales__c'){
                        console.log('tres');
                        if(recordTypeOpp == 'RT_NuevaAfiliacion_M'){
                            oppDocument.isVisible = true;
                           }else{
                             oppDocument.isVisible = false;
                           }
                    }else {
						oppDocument.isVisible = true;
					}
					oppDocument.loaded = false;
				}
				console.log('init(), oppDocuments:', oppDocuments);
				// component.set('v.documents', oppDocuments);
				// Retrieving persisted Attachments associated with the current Opportunity, if there's any
				return helper.createActionPromise(component, {
					name: 'getOppAttachments',
					params: {
						oppId: component.get('v.recordId')
					}
				});
			} else {
				return Promise.reject(new Error('Hubo un problema al obtener los datos de la Configuración Personalizada "TiposDocumento"'));
			}
		})
		.then(response => {
			console.log('init(), 3rd response');
			console.log('init(), response.getReturnValue():', response.getReturnValue());
			/* if (response.getReturnValue() && Array.isArray(response.getReturnValue())) {
				let persistedOppAttachments = response.getReturnValue();
				var documentsEL = []
				for( var attachment of persistedOppAttachments ) {
					if( attachment.ParentId != null ) {
						documentsEL.push( attachment )
					}
				}
				component.set("v.documentsEL", documentsEL)
				if (persistedOppAttachments.length > 0) {
					for (let oppDocument of oppDocuments) {
						console.log("oppDocument: ", oppDocument)
						for (let persistedOppAttachment of persistedOppAttachments) {
							if ((oppDocument.name + PDF_EXT) === persistedOppAttachment.Name) {
								oppDocument.loaded = true;
								oppDocument.Id = persistedOppAttachment.Id;
							}
						}
					}
					component.set('v.documents', oppDocuments);
				} else {
					component.set('v.documents', oppDocuments);
				}
			} else {
				return Promise.reject(new Error('Hubo un problema al obtener los Archivos Adjuntos de la Oportunidad'));
			} */
			if ((typeof response.getReturnValue() !== JS_UNDEFINED_TYPE) && Array.isArray(response.getReturnValue())) {
				let persistedOppAttachments = response.getReturnValue();
				// Getting the legal entity attachments...
				let documentsEL = [];
				console.log('persistedOppAttachments ',  persistedOppAttachments);
				for (let attachment of persistedOppAttachments) {
					if (attachment.hasOwnProperty('LinkedEntityId')) {
						documentsEL.push(attachment);
					}
				}
				component.set('v.documentsEL', documentsEL);
				// Is there any attachment?
				if (persistedOppAttachments.length > 0) {
					console.log('persistedOppAttachments');
					for (let oppDocument of oppDocuments) {
						console.log("oppDocument: ", oppDocument)
						for (let persistedOppAttachment of persistedOppAttachments) {
							if ((oppDocument.name) === persistedOppAttachment.ContentDocument.Title) {
								oppDocument.loaded = true;
								oppDocument.Id = persistedOppAttachment.ContentDocumentId;
								oppDocument.contentVersionId = persistedOppAttachment.ContentDocument.LatestPublishedVersionId;
							}
						}
					}

					if(oppDocuments.length == 0) {
						for (let persistedOppAttachment of persistedOppAttachments) {
							var oppDocument = {};
							oppDocument.name = persistedOppAttachment.ContentDocument.Title;
							oppDocument.loaded = true;
							oppDocument.Id = persistedOppAttachment.ContentDocumentId;
							oppDocument.contentVersionId = persistedOppAttachment.ContentDocument.LatestPublishedVersionId;
							oppDocuments.push(oppDocument);
						}
						
					}
					component.set('v.documents', oppDocuments);
				} else {
					component.set('v.documents', oppDocuments);
				}
				console.log('documents: ', component.get('v.documents'));
			} else {
				return Promise.reject(new Error('Ocurrió un problema al obtener los Archivos Adjuntos de la Oportunidad'));
			}
		})
		.catch(error => {
			console.log(error);
		});
	},

	handleUploadFinished: function (component, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
		console.log('uploadedFiles ', uploadedFiles);
		let { name, documentId, contentVersionId } = event.getParam('files')[0];

        // Get the file name
        uploadedFiles.forEach(file => console.log(file.name));
		if ((typeof documentId !== undefined) && (documentId !== '')) {
			var oppDocuments = component.get("v.documents");
			var oppDocument = {};
			oppDocument.name = name;
			oppDocument.loaded = true;
			oppDocument.Id = documentId;
			oppDocument.contentVersionId = contentVersionId;
			oppDocuments.push(oppDocument);
			
			component.set("v.documents", oppDocuments);
			// Updating the name of the file...
			$A.get('e.force:showToast')
				.setParams({
					duration: '10000',
					type: 'success',
					title: '¡Éxito!',
					message: 'El archivo ha sido cargado correctamente'
				})
				.fire();

			$A.get('e.force:refreshView').fire();

		}
    },
	
	/* uploadAttachment: function(component, event, helper) {
		component.set("v.loading", true);
		var MAX_FILE_SIZE = 4000000;
		var toastEvent = $A.get("e.force:showToast");
		var pressedButton = event.getSource();
		//console.log("uploadFile, pressedButton:", pressedButton);
		var name = pressedButton.get("v.name").split("-");
		var attachmentName = name[0];
		var oppFieldName = name[1];
		// console.log("attachmentName:", attachmentName, ", oppFieldName:", oppFieldName);
		// console.log("uploadAttachment, pressedButton.get(\"v.files\"):", pressedButton.get("v.files"));
		var uploadedFile = pressedButton.get("v.files")[0];
		// console.log("uploadAttachment, uploadedFile:", uploadedFile);
		// console.log("uploadAttachment, uploadedFile.size:", uploadedFile.size);
		if (uploadedFile.size <= MAX_FILE_SIZE) {
			var fr = new FileReader();
			fr.readAsDataURL(uploadedFile);
			fr.onload = function() {
				//console.log("fr.onload, fr.result:", fr.result);
				var tempResult = fr.result;
				tempResult = tempResult.split(",");
				var attachmentBody = tempResult[1];
				//console.log("attachmentBody", attachmentBody);
				helper.saveAttachmentFAC(component, attachmentName, attachmentBody, oppFieldName);
			};
			fr.onerror = function(error) {
				console.log("fr.onerror, error:", error);
			};
		} else {
			toastEvent.setParams({
				"duration": "2000",
				"type": "warning",
				"title": "Advertencia",
				"message": "El archivo que está intentado subir tiene un tamaño superior a los 4MB. Reduzca el tamaño del archivo y vuelva a intentarlo"
			});
			toastEvent.fire();
		}
	}, */
	
	handleUploadDoc: function(component, event, helper) {
		// Constants
		const JS_UNDEFINED_TYPE = 'undefined';
		// Constants
		// Getting the uploaded files...
		let oppId = component.get('v.recordId');
		let [ newTitle, oppFieldName ] = event.getSource().get('v.name').split('-');
		let { name, documentId } = event.getParam('files')[0];
		console.log(`handleUploadDoc() > name: ${name}, documentId: ${documentId}`);
		// It was loaded a valid file?
		if ((typeof documentId !== JS_UNDEFINED_TYPE) && (documentId !== '')) {
			// Updating the name of the file...
			$A.get('e.force:showToast')
				.setParams({
					duration: '10000',
					type: 'success',
					title: '¡Éxito!',
					message: 'El archivo ha sido cargado correctamente'
				})
				.fire();
			helper.createActionPromise(component, { name: 'updateDocAndOpp', params: { documentId, newTitle, oppId, oppFieldName } })
				.then(response => {
					console.log('handleUploadDoc(), 1st response');
					console.log('handleUploadDoc(), response.getReturnValue():', response.getReturnValue());
					helper.handleDocAndOppUpdate(component, response, newTitle);
				})
				.catch(error => {
					console.log('handleUploadDoc(), error:', error);
				});
		} else {
			$A.get('e.force:showToast')
				.setParams({
					duration: '10000',
					type: 'error',
					title: 'Error',
					message: 'Ocurrió un problema al cargar el archivo. Vuelva a intentarlo de nuevo más tarde.'
				})
				.fire();
		}
	},
	
	/* deleteAttach: function(component, event, helper) {
		component.set('v.loading', true);
		let pressedButton = event.getSource();
		let name = pressedButton.get('v.name').split('-');
		let attachmentId = name[0];
		let oppFieldName = name[1];
		// console.log('deleteAttachment, attachmentId:', attachmentId, ', oppFieldName:', oppFieldName);
		helper.deleteAttachmentFAC(component, attachmentId, oppFieldName);
	}, */
	
	handleDeleteDoc: function(component, event, helper) {
		component.set('v.loading', true);
		// Variables
		let oppId = component.get('v.recordId');
		console.log('event.getSource().get("v.name") ', event.getSource().get('v.name'));
		let [ oldDocId, title, oppFieldName ] = event.getSource().get('v.name').split('-');
		// Variables
		console.log(`handleDeleteDoc(), oldDocId: ${oldDocId}, oppFieldName: ${oppFieldName}`);
		helper.createActionPromise(component, { name: 'deleteDocUpdateOpp', params: { oldDocId, oppId, oppFieldName } })
			.then(response => {
				let { errors, id, isSuccess } = response.getReturnValue();
				if (isSuccess) {
					$A.get('e.force:refreshView').fire();
					let documents = component.get('v.documents');
					if(component.get("v.showConvenioModificatorioButton")) {
						console.log('inside if convenio modificatorio');
						var docs = component.get("v.documents");

						for(var doc of docs) {
							if(doc.Id == oldDocId) {
								console.log('inside doc.id == oldDocId');
								docs.splice(docs.indexOf(doc), 1);
							}

							component.set("v.documents", docs);
							console.log('docs >>> ', component.get("v.documents"));
						}
					}
					for (let i = 0; i < documents.length; i++) {
						if (documents[i].name == title) {
							documents[i].loaded = false;
							documents[i].Id = '';
							break;
						}
					}
					
					console.log('documents: ', documents);
					component.set('v.documents', documents);
					component.set('v.loading', false);
					$A.get('e.force:showToast')
					.setParams({
						duration: '10000',
						type: 'success',
						title: '¡Éxito!',
						message: 'El archivo fue eliminado correctamente'
					})
					.fire();
				} else {
					component.set('v.loading', false);
					$A.get('e.force:showToast')
					.setParams({
						duration: '10000',
						type: 'error',
						title: 'Error',
						message: 'Ocurrió un problema al eliminar el archivo: ' + errors
					})
					.fire();
				}
			})
			.catch(error => {
				console.log('handleDeleteDoc(), error:', error);
			});
	},
	
	/* downloadAttachment: function(component, event, helper) {
		// var url = location.href;
		// console.log("downloadAttachment, url:", url);
		var pressedButton = event.getSource();
		var attachmentId = pressedButton.get("v.name");
		var urlEvent = $A.get("e.force:navigateToURL");
		// var baseURL = "../servlet/servlet.FileDownload?file=";
		// console.log("baseURL:", baseURL);
		urlEvent.setParams({
			"url": "/servlet/servlet.FileDownload?file=" + attachmentId
			// + "&operationContext=S1"
		});
		urlEvent.fire();
	}, */
	
	handleDownloadDoc: function(component, event, helper) {
		let [ documentId, contentVersionId ] = event.getSource().get('v.name').split('-');
		console.log('handleDownloadDoc: ', documentId, contentVersionId);
		window.open('/sfc/servlet.shepherd/document/download/' + documentId);
		// window.open('/sfc/servlet.shepherd/version/download/' + contentVersionId);
	},
	
	/* editAttachment: function(component, event, helper) {
		component.set("v.loading", true);
		var MAX_FILE_SIZE = 4000000;
		var toastEvent = $A.get("e.force:showToast");
		//var pressedButton = event.getSource();
		//var attachmentId = pressedButton.get("v.name");
		//console.log("editAttachment, attachmentId:", attachmentId);
		var input = event.target;
		console.log("editAttachment, input:", input);
		var attachmentId = input.name;
		//console.log("input:", input);
		//console.log("input.files:", input.files);
		var uploadedFile = input.files[0];
		// console.log("editAttachment, uploadedFile:", uploadedFile);
		// console.log("editAttachment, uploadedFile.size:", uploadedFile.size);
		if (uploadedFile.size <= MAX_FILE_SIZE) {
			var fr = new FileReader();
			fr.readAsDataURL(uploadedFile);
			fr.onload = function() {
				//console.log("fr.onload, fr.result:", fr.result);
				var tempResult = fr.result;
				tempResult = tempResult.split(",");
				var attachmentBody = tempResult[1];
				//console.log("attachmentBody", attachmentBody);
				helper.updateAttachmentFAC(component, attachmentId, attachmentBody);
			};
			fr.onerror = function(error) {
				console.log("fr.onerror, error:", error);
			};
		} else {
			toastEvent.setParams({
				"duration": "2000",
				"type": "warning",
				"title": "Advertencia",
				"message": "El archivo que está intentado subir tiene un tamaño superior a los 4MB. Reduzca el tamaño del archivo y vuelva a intentarlo"
			});
			toastEvent.fire();
		}
	}, */
	
	handleEditDoc: function(component, event, helper) {
		// Variables
		let oppId = component.get('v.recordId');
		let { name, documentId } = event.getParam('files')[0];
		let [ oldDocId, newTitle, oppFieldName ] = event.getSource().get('v.name').split('-');
		// Variables
		console.log(`handleEditDoc(), oldDocId: ${oldDocId}, newTitle: ${newTitle}`);
		helper.createActionPromise(component, { name: 'deleteDocUpdateOpp', params: { oldDocId, oppId, oppFieldName } })
			.then(response => {
				console.log('handleEditDoc(), 1st response');
				console.log('handleEditDoc(), response.getReturnValue():', response.getReturnValue());
				let { errors, id, isSuccess } = response.getReturnValue();
				if (isSuccess) {
					$A.get('e.force:showToast')
					.setParams({
						duration: '10000',
						type: 'success',
						title: '¡Éxito!',
						message: 'El archivo ha sido actualizado correctamente'
					})
					.fire();
					return helper.createActionPromise(component, { name: 'updateDocAndOpp', params: { documentId, newTitle, oppId, oppFieldName } });
				} else {
					$A.get('e.force:showToast')
					.setParams({
						duration: '10000',
						type: 'error',
						title: 'Error',
						message: 'Ocurrió un problema al eliminar el archivo anterior: ' + errors
					})
					.fire();
				}
			})
			.then(response => {
				console.log('editAttachment(), 2nd response');
				console.log('editAttachment(), response.getReturnValue():', response.getReturnValue());
				helper.handleDocAndOppUpdate(component, response, newTitle);
			})
			.catch(error => {
				console.log('editAttachment(), error:', error);
			});
	}
})