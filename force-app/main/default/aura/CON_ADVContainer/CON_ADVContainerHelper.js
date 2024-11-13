({
	getInitialData: function (component, contratoId) {
		var action = component.get("c.executeQuery");
		//SIGLO
		//
		var consulta = 
			"SELECT Name, GLB_Enviado_Mercedes__c, GLB_Facturacion_dia_Especifico__c, Package__c, AsignacionContrato__c, CreatedDate, FechaInicioADC__c, FechaFinADC__c, " +
				"TipoPago__c, CustomersCreatedAS400__c,NTT_Frecuencia_Consumo_Fee__c,NTT_Frecuencia_Fact_Consumo_Serv__c,NTT_DIa_Corte_1_MFA__c,NTT_DIa_Corte_2_MFA__c, Legal_representatives__c, Entidad_Cuenta__c, PlatformAdministrator__c, Primer_Pedido__c, Proxima_Carga__c, " +
				"EtapaContrato__c, Comentarios_ADV__c, CodigoAS400__c, Frecuencia_de_Pedido__c, Tipo_Pedido__c, Nombre_de_Personalizacion__c, Direccion_Personalizacion__c, CEO__c, " +
				"ImprimeLogo__c, TipoPlastico__c, LineasImpresionTarjeta__c, Tipo_Reposicion__c, Caducidad_Saldo__c, Opcion_Habilitada_ATM__c, ComoFactura__c, TipoCliente__c, DiscountFree__c, " +
				"CondicionesPagoPlazo__c, Deduce__c, ComisionMinima__c, Personalizacion_de_Tarjetas__c, FrecuenciaFacturacion__c, EspecialDia__c, Consolidador__c, CorreoRecibeFactura__c, " +
				"DireccionFiscal__c, FiscalAddress__c, FiscalAddressText__c, Otros_correos__c, PeriodicidadComplemento__c, Emision_complemento__c, FrecuenciaEstadoCuenta__c, Ligado_a__c, " +
				"Tipo_de_Facturacion__c, Producto_Factura_Global__c, Sucursal_Facturacion_Global__c, Cliente_Facturacion_Global__c, Facturacion_Cargos__c, Facturacion_Plasticos__c, " +
				"Facturacion_Comision__c, Linea_Operativa__c, Ventana_de_Riesgos__c, Frecuencia_Liberacion_Automatica__c, Fianza__c, MontoGarantia__c, Otro__c, Dia_Liberacion__c, Dia_de_la_Semana__c, " +
				"Dia_Inicio__c, Dia__c, VIP__c, Permite_autorizacion_telefonica__c, Item_Contratacion__c, TicketBomba__c, ControlVolumetrico__c, BombaPropia__c, Maneja_Nota_Vale__c, No_Mostrar_KM__c, " +
				"Maneja_Conductores__c, RejectionReasons__c, Controla_Presencia_Vehiculo_NFC__c, Modo_Transaccion__c, Opera_TC_Truck__c, WayPay__c, ChargeType__c, SelectedProducts__c, " +
				"GLB_LineaCreditoPreautorizada__c, GLB_TerminoDePago__c, GLB_FechaFinGarantia__c, GLB_CobroInteresesMoratorios__c, GLB_CodAnalistaCobranza__c, GLB_LineaCreditoAsignada__c, " +
				"CodigoAS400_Con2_Ori__c, GLB_Ref_Cli_Mercedes__c, NTT_Id_Middle_Office__c, GLB_TratTransacPendientes__c, " +
				"Contacto__c, Contacto__r.Email, Contacto__r.Phone, Contacto__r.Birthdate, Contacto__r.BirthState__c, Contacto__r.OtherBirthState__c, Contacto__r.BirthCountry__c, " +
				"Contacto__r.Nationality__c, Contacto__r.Gender__c, Contacto__r.ProfessionName__c, Contacto__r.ElectorID__c, Contacto__r.Funcion__c, BillingContact__r.Email, " +
				"Contacto__r.Curp__c, Contacto__r.RazonSocial__c, Contacto__r.Name, Contacto__r.Salutation, Contacto__r.Puesto__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Email, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Name, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.FirstName, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Funcion__c, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.LastName, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Phone, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Salutation, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Gender__c, PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.Puesto__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Contacto__r.MobilePhone, PartidaPresupuesto__r.Quote.Account.NumeroExterior__c, PartidaPresupuesto__r.Quote.Account.Text_Segment__c, PartidaPresupuesto__r.TipoTarjeta__c, " +
				"PartidaPresupuesto__r.Quote.Account.BillingPostalCode, PartidaPresupuesto__r.Quote.Account.BillingState, PartidaPresupuesto__r.Quote.Opportunity.VentaTrademarketing_Checkbox__c, " +
				"PartidaPresupuesto__r.Product2.AS400_integration__c , PartidaPresupuesto__r.Quote.Account.Colonia__c, PartidaPresupuesto__r.Quote.Account.BillingStreet, PartidaPresupuesto__r.Quote.Account.BillingCity, " +
				"PartidaPresupuesto__r.Product2.Name, PartidaPresupuesto__r.Product2.Formato__c, PartidaPresupuesto__r.Product2.Uso__c, PartidaPresupuesto__r.Product2.Red__c, PartidaPresupuesto__r.Product2.IDInterno__c, " + 
				"PartidaPresupuesto__r.Product2.SendToSIGLO__c, PartidaPresupuesto__r.Product2.isPhantomIntegration__c, PartidaPresupuesto__r.Product2.ProductCode, PartidaPresupuesto__r.Quote.Opportunity.Competidor__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Recordtype.Name, PartidaPresupuesto__r.Quote.Opportunity.AccountId, PartidaPresupuesto__r.Quote.CreatedDate, PartidaPresupuesto__r.Quote.Id, " +
				"PartidaPresupuesto__r.Quote.ApprovalRequestDate__c, PartidaPresupuesto__r.Quote.Account.Segmento_Logo__c, PartidaPresupuesto__r.Quote.Account.Busines__c, PartidaPresupuesto__r.Quote.Account.Ejecutivo_Logo__c, " +
				"PartidaPresupuesto__r.Quote.Account.Sum_turnover_volume__c, PartidaPresupuesto__r.Quote.Account.Sector__c, PartidaPresupuesto__r.Quote.Opportunity.Elapsed_days__c, PartidaPresupuesto__r.Quote.Opportunity.Gestor__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.TipoVenta__c, toLabel(PartidaPresupuesto__r.Quote.Opportunity.RenegotiationType__c), RenegotiationAffiliates__c, PartidaPresupuesto__r.Quote.Opportunity.Entidad_Cuenta__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.ComprobanteDomicilioFiscal__c, PartidaPresupuesto__r.Quote.Opportunity.LeadSource, " +
				"PartidaPresupuesto__r.Quote.Opportunity.EnvioXMLTC30__c, PartidaPresupuesto__r.Quote.Opportunity.Maquilador__c, PartidaPresupuesto__r.Quote.Name, PartidaPresupuesto__r.Quote.Opportunity.Name, " +
				"PartidaPresupuesto__r.Quote.Opportunity.StageName, PartidaPresupuesto__r.Quote.Opportunity.Owner.Name, PartidaPresupuesto__r.Quote.OpportunityId, PartidaPresupuesto__r.Quote.Opportunity.ActaConstitutivaCliente__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.CURP__c, PartidaPresupuesto__r.Quote.Opportunity.CedulaRFC__c, PartidaPresupuesto__r.Quote.Opportunity.ComprobanteDomicilioCliente__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.ConstanciaRFC__c, PartidaPresupuesto__r.Quote.Opportunity.ConstanciaRFCCliente__c, PartidaPresupuesto__r.Quote.Opportunity.IdentificacionOficialCliente__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.IdentificacionOficialVigente__c, PartidaPresupuesto__r.Quote.Opportunity.PoderNotarial__c, PartidaPresupuesto__r.Quote.Owner.Name, PartidaPresupuesto__r.Quote.AccountId, " +
				"PartidaPresupuesto__r.Quote.Account.RazonSocial__c, PartidaPresupuesto__r.Quote.Account.RFC__c, PartidaPresupuesto__r.Quote.Account.Owner.Name, PartidaPresupuesto__r.Quote.Account.BillingAddress, " +
				"PartidaPresupuesto__r.Quote.Contact.Email, PartidaPresupuesto__r.Quote.Contact.Name, PartidaPresupuesto__r.Quote.Contact.Puesto__c, PartidaPresupuesto__r.Quote.Opportunity.NumeroOportunidad__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Familia__c, PartidaPresupuesto__r.Quote.Opportunity.Producto_cotizacion__c, PartidaPresupuesto__r.Quote.Opportunity.Contrato_Filial__r.CodigoAS400__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.RecordType.DeveloperName, PartidaPresupuesto__r.Quote.Opportunity.Producto__c, PartidaPresupuesto__r.Quote.Opportunity.OwnerId, " +
				"PartidaPresupuesto__r.Quote.Opportunity.SubOrigen__c, PartidaPresupuesto__r.Quote.Opportunity.NumeroAltaCliente__c, PartidaPresupuesto__r.Quote.Account.Name, PartidaPresupuesto__r.Quote.Account.Phone, " +
				"PartidaPresupuesto__r.Quote.Account.Telefono2__c, PartidaPresupuesto__r.Quote.Account.Giro__c, PartidaPresupuesto__r.Quote.Contact.Funcion__c, " +
				"PartidaPresupuesto__r.Quote.Account.GLB_ID_Corporativo__c, PartidaPresupuesto__r.Quote.Account.CodigoClienteAS400__c, PartidaPresupuesto__r.Quote.Account.AffiliateCodeAS400__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.Comentarios_Ejecutivo__c, PartidaPresupuesto__r.Quote.Opportunity.Pilot__c, PartidaPresupuesto__r.Product2.IsAffiliate__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.GLB_Cambio_Condiciones_Comerciales__c, PartidaPresupuesto__r.Quote.Opportunity.GLB_Cambio_Condiciones_Facturacion__c, PartidaPresupuesto__r.Quote.Opportunity.VentaTradeMarketing_PL__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.GLB_Contratos_Renegociacion__c, PartidaPresupuesto__r.Quote.Opportunity.Bonificacion__c, PartidaPresupuesto__r.Quote.Opportunity.Porcentaje_Bonificacion__c, " + 
				"PartidaPresupuesto__r.Quote.GLB_designCardType__c, PartidaPresupuesto__r.Quote.GLB_IdDesign__c, " +
				"PartidaPresupuesto__r.GLB_LineaCreditoPreautorizada__c, PartidaPresupuesto__r.GLB_TerminoDePago__c, PartidaPresupuesto__r.GLB_FechaFinGarantia__c, " +
				"PartidaPresupuesto__r.Quote.Opportunity.GLBAr_Cantidad_Litros__c, PartidaPresupuesto__r.Quote.NumberOfShipments__c, PartidaPresupuesto__r.Quote.Opportunity.CloseDate " +
			"FROM Contrato2__c " + 
			"WHERE Id = '" + contratoId + "'"
		;

		console.log('Query contrato2: ', consulta);
		action.setParams({
			query: consulta
		});
		console.log('SP query: '+consulta);
		action.setCallback(this, function (response) {
			var state = response.getState();
			var dataSource = {};
			var QuoteLineItemId;
			var toastEvent1 = $A.get("e.force:showToast");
			console.log('LOG_CCO');
            if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()[0];
				
				let reps;
				if (!returnedValue || typeof returnedValue.Legal_representatives__c !== 'string') {
					reps = ''; // Devuelve una cadena vacía 
				  }
				else {
					var elements = returnedValue.Legal_representatives__c.split(',');
					var formattedString = elements.map(function(element) {
						return "'" + element.trim() + "'";
					}).join(',');
				  
				  reps = formattedString;
				}
				  
				
				let queryRL = 
					"SELECT Id, Email, Name, Puesto__c, Funcion__c, FirstName, LastName, Phone, MobilePhone, Salutation, Gender__c " + 
					"FROM Contact "					
				;
				if(reps) {
					queryRL += "WHERE Id IN (" + reps +")";
				}
				console.log("queryRL --> ", queryRL);
				var actionRL = component.get("c.executeQuery");
				actionRL.setParams({
					query: queryRL
				});
				console.log('queryRL: ', queryRL);
				actionRL.setCallback(this, function (anotherResponse) {
					// Lógica dentro del callback del segundo llamado
					var state = anotherResponse.getState();
    				if (state === "SUCCESS") {
						dataSource.RepresentantesLegales = anotherResponse.getReturnValue();
						
						//respuesta de error
						if(dataSource.RepresentantesLegales.exceptionTypeName) {
							var errors = dataSource.RepresentantesLegales.message;
							var source = dataSource.RepresentantesLegales.stackTraceString;
							console.error("Error: ", errors);
							console.error("source: ", source);
						}
						// Realizar acciones adicionales si es necesario
					} else if (state === "ERROR") {
						console.error("Error en la llamada al servidor.");
						var errors = response.getError();
						console.error("Error: ", errors);
						
						// Manejar errores en el segundo llamado
					}
				});
				$A.enqueueAction(actionRL);
				
                //-- NTT
                var actionNtt = component.get("c.executeQuery");
                
                let queryNtt = "select NTT_Valor__c from NTT_Properties__mdt where DeveloperName = 'NTT_Mopay_Activo'";
				console.log("queryNtt --> ", queryNtt);
                
                actionNtt.setParams({
					query: queryNtt
				});
                
                actionNtt.setCallback(this, function (responseNtt) {
                    var state = responseNtt.getState();
                    console.log("queryNtt state --> ", state);
    				if (state === "SUCCESS") {
                        
						component.set("v.NTT_MoPayActivo", responseNtt.getReturnValue()[0].NTT_Valor__c);
						console.log("queryNtt PASO " ,  component.get("v.NTT_MoPayActivo"));
					
						//NTT Alta Clientes 43
						var actionNtt43 = component.get("c.validaProdCode");
						console.log("contratoId43 --> ", contratoId);
			
						actionNtt43.setParams({
							IdContract: contratoId
						});
			
						actionNtt43.setCallback(this, function (responseNtt43) {
							var state43 = responseNtt43.getState();
							console.log("queryNtt43 state --> ", state43);
							if (state43 === "SUCCESS") {
								
								var result43 = responseNtt43.getReturnValue();
								let IsProductMfa = Boolean(result43.isMfa);
							
								console.log("result43  --> ", result43);
								console.log("IsProductMfa  --> ", IsProductMfa);
								
								component.set("v.NTT_IsProductMfa", IsProductMfa);
					
							} else if (state43 === "ERROR") {
								console.error("Error en la llamada al servidor.");
								var errors = response.getError();
								console.error("Error: ", errors);
					
								// Manejar errores en el segundo llamado
							}
						});
			
						$A.enqueueAction(actionNtt43);
						//NTT Alta Clientes 43
						
					} else if (state === "ERROR") {
						console.error("Error en la llamada al servidor.");
						var errors = response.getError();
						console.error("Error: ", errors);
						
						// Manejar errores en el segundo llamado
					}
                });
                
                $A.enqueueAction(actionNtt);
                //--NTT
				
				if(returnedValue.RejectionReasons__c != undefined) {
					if (returnedValue.RejectionReasons__c && returnedValue.RejectionReasons__c.trim().length) {
						component.set("v.motivosRechazoSelec", returnedValue.RejectionReasons__c.split(";"));
					}
				}
				dataSource = returnedValue.PartidaPresupuesto__r.Quote;
				dataSource.AllAddressesSelected = []; // Para fleet 33
				dataSource.FiscalAddress = {}; // Para fleet 33
				dataSource.Account.DireccionFiscal = dataSource.Account.Calle__c + ' ' + dataSource.Account.NumeroExterior__c + ' ' + dataSource.Account.Colonia__c + ' ' + dataSource.Account.DelegacionMunicipioFiscal__c + ' ' + dataSource.Account.Estado__c + ' C.P ' + dataSource.Account.CodigoPostal__c;
				QuoteLineItemId = returnedValue.PartidaPresupuesto__r.Id;
				dataSource.QuoteLineItem = {};
				dataSource.Quote = {};
				dataSource.Product2__c = {}
				dataSource.Product2__c = returnedValue.PartidaPresupuesto__r.Product2
				dataSource.ContactRepresentanteLegal = {}
				dataSource.ContactAdministrador = {}
				dataSource.ContactRepresentanteLegal.Email = (returnedValue.Contacto__r && returnedValue.Contacto__r.Email) ? returnedValue.Contacto__r.Email : '';
				dataSource.ContactRepresentanteLegal.Puesto__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.Funcion__c) ? returnedValue.Contacto__r.Funcion__c : '';
				dataSource.ContactRepresentanteLegal.RazonSocial__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.RazonSocial__c) ? returnedValue.Contacto__r.RazonSocial__c : '';
				dataSource.ContactRepresentanteLegal.Name = (returnedValue.Contacto__r && returnedValue.Contacto__r.Name) ? returnedValue.Contacto__r.Name : '';
				dataSource.ContactRepresentanteLegal.Phone = (returnedValue.Contacto__r && returnedValue.Contacto__r.Phone) ? returnedValue.Contacto__r.Phone : '';
				//Inicio SIGLO
				dataSource.ContactRepresentanteLegal.Gender__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.Gender__c) ? returnedValue.Contacto__r.Gender__c : '';
				dataSource.ContactRepresentanteLegal.Birthdate = (returnedValue.Contacto__r && returnedValue.Contacto__r.Birthdate) ? returnedValue.Contacto__r.Birthdate : '';
				dataSource.ContactRepresentanteLegal.BirthState__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.BirthState__c) ? returnedValue.Contacto__r.BirthState__c : '';
				dataSource.ContactRepresentanteLegal.OtherBirthState__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.OtherBirthState__c) ? returnedValue.Contacto__r.OtherBirthState__c : '';
				dataSource.ContactRepresentanteLegal.BirthCountry__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.BirthCountry__c) ? returnedValue.Contacto__r.BirthCountry__c : '';
				dataSource.ContactRepresentanteLegal.Nationality__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.Nationality__c) ? returnedValue.Contacto__r.Nationality__c : '';
				dataSource.ContactRepresentanteLegal.ProfessionName__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.ProfessionName__c) ? returnedValue.Contacto__r.ProfessionName__c : '';
				dataSource.ContactRepresentanteLegal.ElectorID__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.ElectorID__c) ? returnedValue.Contacto__r.ElectorID__c : '';
				dataSource.ContactRepresentanteLegal.Id = returnedValue.Contacto__c ? returnedValue.Contacto__c : '';
				dataSource.ContactRepresentanteLegal.Curp__c = (returnedValue.Contacto__r && returnedValue.Contacto__r.Curp__c) ? returnedValue.Contacto__r.Curp__c : '';
				//Fin SIGLO 
				
				//NVH -- Tarjeta Fisica
				dataSource.Quote.GLB_designCardType__c = returnedValue.PartidaPresupuesto__r.Quote.GLB_designCardType__c || '';
				dataSource.Quote.GLB_IdDesign__c = returnedValue.PartidaPresupuesto__r.Quote.GLB_IdDesign__c || null;
				
				component.set("v.cuenta", dataSource.AccountId);
				component.set("v.oppId", dataSource.OpportunityId);
				
				this.getMotivosRechazoHistorial(component, dataSource.OpportunityId);
				if (dataSource.Opportunity.EnvioXMLTC30__c) {
					component.set("v.isSendXML", true);
				}

				delete returnedValue.PartidaPresupuesto__r;
				delete dataSource.ContactId;
				//delete dataSource.OpportunityId;
				delete dataSource.OwnerId;
				delete dataSource.AccountId;
				dataSource.User = {};
				dataSource.Contrato2__c = {};
				dataSource.Contrato2__c = returnedValue;
				dataSource.Filiales = [];
                
				console.log('clientesCompletos > ', returnedValue.CustomersCreatedAS400__c);
				console.log('dataSource.Contrato2__c.GLB_Enviado_Mercedes__c: ', dataSource.Contrato2__c.GLB_Enviado_Mercedes__c);
				component.set("v.sent2Mercedes", dataSource.Contrato2__c.GLB_Enviado_Mercedes__c);
				component.set("v.isProductFleet", dataSource.Product2__c.ProductCode == '33');
				component.set("v.isProductArgentina", this.isProductArgentina(component, dataSource.Product2__c.ProductCode));
				component.set("v.isProduct29", dataSource.Product2__c.ProductCode.includes('29'));
				console.log("dataSource.Product2__c.ProductCode == 60-t", dataSource.Product2__c.ProductCode);
				component.set("v.isProductEcovale", dataSource.Product2__c.ProductCode == '60-t');
				component.set("v.clientesCompletos", returnedValue.CustomersCreatedAS400__c);
				
				var dirEntregaCMP = component.get("v.dirEntregaCMP");
				if (dirEntregaCMP) {
					dirEntregaCMP.set("v.isProductArgentina", component.get("v.isProductArgentina"));
				}
				// dataSource.User.Id = $A.get("$SObjectType.CurrentUser.Id");
				// var user =
				// dataSource.User.Email = (user.Email != undefined)? user.Email:'';
				// dataSource.User.FormaPago__c = ($A.get("$SObjectType.CurrentUser.FormaPago__c") != undefined)?$A.get("$SObjectType.CurrentUser.FormaPago__c"):'';
				// dataSource.User.NumeroTerritorio__c = (user.NumeroTerritorio__c != undefined)? user.NumeroTerritorio__c:'';
				// dataSource.User.ManagerId = (user.Manager.Name != undefined)? user.Manager.Name :'';
				// dataSource.Contrato2__c.EtapaContrato__c = returnedValue.EtapaContrato__c;
				// dataSource.Contrato2__c.Id = returnedValue.Id;
				// dataSource.Contrato2__c.PartidaPresupuesto__c = returnedValue.PartidaPresupuesto__c;			 				
				
				if (dataSource.Contrato2__c.EtapaContrato__c == 'Autorizado') {
					component.set("v.btnInactive", true);
                    console.log('>>>> ' + typeof dataSource.Contrato2__c.NTT_Id_Middle_Office__c);
                    console.log('>>>> ' + dataSource.Product2__c.IDInterno__c);
                    if(dataSource.Product2__c.IDInterno__c == "29-P" && dataSource.Contrato2__c.NTT_Id_Middle_Office__c > 0){
                    	component.set("v.NTT_btnInactive", true);
                        component.set("v.clientesCompletos", true);
                    }else if(dataSource.Product2__c.IDInterno__c == "29-P"){
                        component.set("v.NTT_btnInactive", false);
                    }
                    //ALTAS BE component.set("v.btnGenerarInactive", false);
					component.set("v.btnInactiveCheck", false);
				}
				else {
                    //ALTAS BE component.set("v.btnGenerarInactive", true);
					component.set("v.btnInactive", false);
                    
                    if(dataSource.Product2__c.IDInterno__c == "29-P"){
                    	component.set("v.NTT_btnInactive", true);    
                    }
				}
				if (dataSource.Product2__c.IDInterno__c == "30" && component.get("v.isSendXML") == false) {
					component.set("v.isXML", false);
				}
				component.set("v.dataSource", dataSource);
				console.log('getInitialData dataSource___1: ', JSON.parse(JSON.stringify(dataSource)));
                
                if ((!!component.get("v.DocumentType") && dataSource.Opportunity.RecordType.DeveloperName == 'RT_Renegotiation') 
					|| dataSource.Opportunity.RecordType.DeveloperName != 'RT_Renegotiation'
				) {//CEAM:3563
					console.log('#1 CB Track');
					this.getOppAttachments(component);
				}//CEAM:3563
				if(this.isProductFleet(component) && dataSource.Opportunity.RecordType.DeveloperName == 'RT_Renegotiation') {
					this.getConvenioModificatorio(component);
					this.getParentContracts(component, dataSource);
				}
                this.getCotizacion(component, QuoteLineItemId);
				this.getProductoConcepto(component, QuoteLineItemId);
                this.getRenegotiationProducts(component, QuoteLineItemId);//CEAM:3563
				this.getApprovalComments(component, dataSource.Id);//CEAM:3563
				this.getUser(component, dataSource.Opportunity.OwnerId);
				this.getEntidadLegal(component, contratoId);
				this.getContacts(component, dataSource.Opportunity.AccountId);
				this.getContactosAP(component); //DVM 2 Julio, para atender el requerimiento de mostrar todos los contactos con funcion AP en la pantalla ADV
				this.getFiliales(component, contratoId);
				this.getSubcuentasAsociadas(component, contratoId, returnedValue.RenegotiationAffiliates__c);
                //this.getAddresses(component, dataSource.OpportunityId);
                this.getAddresses(component, dataSource.Contrato2__c);
                console.log("PING LOG 2");
				this.getEstablecimientos(component, contratoId);
                //this.setTitleName(component); //6298 (Descomentar si se activa Tarjetas Virtuales)

                if(component.get("v.isProductFleet") || this.isProductEcovale(component)  || this.isProduct43(component)) {
					this.getMercedesActionMethodRequired(component, dataSource);
				}

                component.set('v.isApprovalQuote', !!dataSource.ApprovalRequestDate__c ? true : false);//CEAM:3563
				if (dataSource.ApprovalRequestDate__c) {
					if (!!dataSource.Account.business__c && !dataSource.Account.business__c.includes('No relacionada')) {
						//component.set("v.BusinessUnit", this.getImage('BusinessUnit', dataSource.Account.Busines__c));
                        component.set("v.BusinessUnit", dataSource.Account.business__c);
					}
					if (!!dataSource.Account.Ejecutivo_Logo__c && !dataSource.Account.Ejecutivo_Logo__c.includes('Proceso')) {
						//component.set("v.Canal", this.getImage('Canal', dataSource.Account.Ejecutivo_Logo__c));
                        component.set("v.Canal", dataSource.Account.Ejecutivo_Logo__c);
					}
				}
            }else{
                console.log('Algo paso aqui');
            }
		});
		$A.enqueueAction(action);
	},

	isProductArgentina: function(component, productCode) {
		let argentinaCodes = ['YC', 'XC'];
		return argentinaCodes.includes(productCode);
	},

	getTitleTypePerson : function(component) {
		var entidadLegal = component.get("v.entidadLegal");
		var isProductArgentina = component.get("v.isProductArgentina");
		var recordType = entidadLegal.RecordType;

		if(isProductArgentina && recordType === 'Persona Moral') {
			component.set("v.titlePersonType", 'Persona Juridica');
		} else {
			component.set("v.titlePersonType", recordType);
		}
	},

	convertToSoqlInClause: function(arr) {
		if (!Array.isArray(arr)) {
		  return null; 
		}
		
		if (arr.length === 0) {
		  return "('')";
		}
	  
		const quotedValues = arr.map(value => `'${value}'`).join(',');
		return `(${quotedValues})`;
	},

	getParentContracts: function(component, dataSource) {
		let idsCF = dataSource.Opportunity.GLB_Contratos_Renegociacion__c || "";
		let arrayOfIds = idsCF.split(',').map(s => s.trim()); // Convierte la cadena en un arreglo
		let sqlInClause = this.convertToSoqlInClause(arrayOfIds);
		console.log('NVH-- sqlInClause', sqlInClause);

		let queryParentCF = 
			"SELECT Id, Name, Contrato_2__c, Contrato_2__r.FrecuenciaFacturacion__c, " +
				"Contrato_2__r.GLB_Facturacion_dia_Especifico__c " + 
			"FROM ContratoFilial__c "+
			"WHERE Id  IN " + sqlInClause + " "+
			"LIMIT 1"
		;
		var action = component.get("c.executeQuery");
		action.setParams({
			query: queryParentCF
		});

		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				dataSource.parentContract = response.getReturnValue();

			}
			console.log("dataSource.parentContract ", dataSource.parentContract);
		});
		$A.enqueueAction(action);
	},
	
	getMercedesActionMethodRequired: function(component, dataSource) {
		// Already p33
		window.mercedesClientReference = {};
		var isRenegotiation = dataSource.Opportunity.RecordType.DeveloperName == "RT_Renegotiation";
		
		if(isRenegotiation) {
			var updateClientRequired = (dataSource.Opportunity.GLB_Cambio_Condiciones_Comerciales__c || dataSource.Opportunity.GLB_Cambio_Condiciones_Facturacion__c);
			component.set("v.updateClientMercedesAvailable", updateClientRequired);
			console.log("getMercedesActionMethodRequired > ", component.get("v.updateClientMercedesAvailable"));
		} else if(dataSource.Contrato2__c.CodigoAS400__c){
			this.consultSentClientsMercedes(component, dataSource);
		}
	},
	
	consultSentClientsMercedes: function(component, dataSource) {
		var codEntityCodeMercedes = dataSource.Contrato2__c.CodigoAS400__c.split("-");
		codEntityCodeMercedes.pop();
		
		var action = component.get("c.executeQuery");
		var q = 
			"SELECT Id, CodigoAS400__c, GLB_Enviado_Mercedes__c, GLB_Ref_Cli_Mercedes__c " +
			"FROM Contrato2__c " +
			"WHERE GLB_Enviado_Mercedes__c = true " +
			"AND CodigoAS400__c LIKE '" + codEntityCodeMercedes.join("-") + "%'"
		;
		console.log("SR-Query ->", q);
		action.setParams({
			query: q
		});
		action.setCallback(this, function (response) {
			console.log("SR-Query Response ->", response);
			var state = response.getState();
			var data = response.getReturnValue();
			if(state == 'SUCCESS') {
				// var obj = data[0];
				console.log("obj -> ", data.length);
				if(data.length > 0 && data[0].GLB_Ref_Cli_Mercedes__c) {
					window.mercedesClientReference = JSON.parse(data[0].GLB_Ref_Cli_Mercedes__c);
				}
				component.set("v.updateClientMercedesAvailable", data.length > 0);
			}
			console.log("updateClientMercedesAvailable > ", component.get("v.updateClientMercedesAvailable"));
		});
		$A.enqueueAction(action);
	},

	getMotivosRechazoHistorial: function (component, oppId) {
		var action = component.get("c.executeQuery");
		var consulta = 
			"SELECT Id, Opportunity__c,Opportunity_status__c, ADV_Start_Date__c, ADV_End_Date__c, Rejection_Reason__c, ADV_Comments__c,Comercial_comments__c " +
			"FROM Rejection_history__c " +
			"WHERE Opportunity__c = '" + oppId + "' " +
			"ORDER BY CreatedDate DESC"
		;
		action.setParams({
			query: consulta
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				component.set('v.historicoMotivosRechazo', response.getReturnValue());
			}
		});
		$A.enqueueAction(action);
	},

	getNewRepresentanteLegal: function (component, entidadLegal) {
		var action2 = component.get("c.executeQuery");
		action2.setParams({
			query: 
				"SELECT Id,Direccion__c,Name,RazonSocial__c " +
				"FROM EntidadLegal__c " +
				"WHERE Id = '" + entidadLegal + "'"
		});
		action2.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				console.log('getNewRepresentanteLegal: ', response.getReturnValue());

				var dataSource = component.get("v.dataSource");
				var returnedValue = response.getReturnValue()[0];

				dataSource.Account.RazonSocial__c = (returnedValue.RazonSocial__c != undefined) ? returnedValue.RazonSocial__c : '-';
				dataSource.Account.RFC__c = (returnedValue.Name != undefined) ? returnedValue.Name : '-';
				dataSource.Account.DireccionFiscal = (returnedValue.Direccion__c != undefined) ? returnedValue.Direccion__c : '-';
				component.set("v.dataSource", dataSource);
			}
		});
		$A.enqueueAction(action2);
        
        var dSource = component.get("V.dataSource");
        console.log('dSource',dSource);
        if(dSource.Product2__c.ProductCode != '43'){
        	this.getAttachment(component, entidadLegal);    
        }
		

		/*var action = component.get("c.executeQuery");

		  action.setParams({

			query : "SELECT Id,Contacto__r.Name,Contacto__r.Email,Contacto__r.Phone,Contacto__r.Puesto__c,Contacto__r.Funcion__c, SelectedProducts__c FROM Contrato2__c WHERE Id = '"+entidadLegal+"'"
		});
		action.setCallback(this,function(response){
			var state = response.getState();

			if(state == 'SUCCESS'){
				var returnedValue = response.getReturnValue()[0];

				if(returnedValue != null || returnedValue != undefined){
					var dataSource = component.get("v.dataSource")
					var repLegal;

					if(returnedValue.Contacto__r.Funcion__c == 'Representante Legal'){
						dataSource.ContactRepresentanteLegal = returnedValue.Contacto__r;
						repLegal = returnedValue.Contacto__r;
					}
					else if(returnedValue.Contacto__r.Funcion__c == 'Quien administra Plataforma'){
						dataSource.ContactAdministrador = returnedValue.Contacto__r;
					}


					if(dataSource.ContactAdministrador == null || dataSource.ContactAdministrador == undefined){
						dataSource.ContactAdministrador = repLegal
					}

					dataSource.Account.RFC__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RFC__c != undefined) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RFC__c : '-';
					dataSource.Account.DireccionFiscal = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c != undefined) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c : '-';
					component.set("v.dataSource", dataSource);
				}else{
					var action2 = component.get("c.executeQuery");
					  action2.setParams({
						query : "SELECT Id,Direccion__c,RFC__c,RazonSocial__c  FROM EntidadLegal__c WHERE Id = '"+entidadLegal+"'"
					});
					action2.setCallback(this,function(response){
						var state = response.getState();

						if(state == 'SUCCESS'){
							var dataSource = component.get("v.dataSource");
							var returnedValue = response.getReturnValue()[0];

							dataSource.Account.RazonSocial__c = (returnedValue.RazonSocial__c != undefined) ? returnedValue.RazonSocial__c : '-';
							dataSource.Account.RFC__c = (returnedValue.RFC__c != undefined) ? returnedValue.RFC__c : '-';
							dataSource.Account.DireccionFiscal = (returnedValue.Direccion__c != undefined) ? returnedValue.Direccion__c : '-';
							component.set("v.dataSource", dataSource);
						}
					});
					$A.enqueueAction(action2);
				}
			}
		});
		$A.enqueueAction(action);

		this.getAttachment(component,entidadLegal);*/
	},
	getEntidadLegal: function (component, contratoId) {
		var dataSource = component.get("v.dataSource");
		//NVH--> Se crea el objeto entidadCuenta para no sobreescribir el objeto dataSouce
		let entidadLegal = {};
		let action = component.get("c.executeQuery");
		
		console.log('getEntidadLegal');
		const queryEL = 
			"SELECT Id,Entidad_Cuenta__c,Legal_representatives__c, Entidad_Cuenta__r.EntidadLegal__c,Entidad_Cuenta__r.EntidadLegal__r.Id, "+
				"Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name,Entidad_Cuenta__r.EntidadLegal__r.Name,Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c, "+
				"Entidad_Cuenta__r.EntidadLegal__r.Estatus__c,Entidad_Cuenta__r.EntidadLegal__r.Direccion__c, Entidad_Cuenta__r.EntidadLegal__r.CountryOrigin__c, "+
				"Entidad_Cuenta__r.EntidadLegal__r.PersonType__c, Entidad_Cuenta__r.EntidadLegal__r.FEA__c, Entidad_Cuenta__r.EntidadLegal__r.DeedDate__c, "+
				"Entidad_Cuenta__r.EntidadLegal__r.AccountNumber__c, Entidad_Cuenta__r.EntidadLegal__r.KeyNumber__c, Entidad_Cuenta__r.EntidadLegal__r.Geolocation__c, "+
				"Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__c, Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__r.Name, " +
				"Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c, Entidad_Cuenta__r.EntidadLegal__r.DeedNumber__c, "+
				"Contacto__r.Name, Contacto__r.Salutation, Contacto__r.Gender__c, Contacto__r.Puesto__c, Contacto__r.Funcion__c, SelectedProducts__c " +
			"FROM Contrato2__c " +
			"WHERE Id = '" + contratoId + "'"
		;
		console.log('NVH--> queryEL: ', queryEL);
	
		action.setParams({
			query: queryEL
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			
			if (state == 'SUCCESS') {
				
				var returnedValue = response.getReturnValue()[0];
				if (returnedValue && returnedValue.Entidad_Cuenta__r) {
					entidadLegal.Id = (returnedValue.Entidad_Cuenta__r.EntidadLegal__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__c : '';
					entidadLegal.RecordType = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name : '';
					entidadLegal.Name = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name : '';
					//dataSource.Nombre__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Nombre__c ) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Nombre__c : '';
					entidadLegal.Direccion__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c : '';
					entidadLegal.RFC__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name : '';
					entidadLegal.RazonSocial__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c : '';
					entidadLegal.Estatus__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Estatus__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Estatus__c : '';
					entidadLegal.Disabled = true;
                    entidadLegal.Contacto__c = (returnedValue.Contacto__c) ? returnedValue.Contacto__r.Name : '';

					//SIGLO
					entidadLegal.PersonType__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.PersonType__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.PersonType__c : '';
					entidadLegal.CountryOrigin__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.CountryOrigin__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.CountryOrigin__c : '';
					entidadLegal.FEA__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.FEA__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.FEA__c : '';
					entidadLegal.DeedDate__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.DeedDate__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.DeedDate__c : '';
					entidadLegal.AccountNumber__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.AccountNumber__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.AccountNumber__c : '';
					entidadLegal.KeyNumber__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.KeyNumber__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.KeyNumber__c : '';
					entidadLegal.Geolocation__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Geolocation__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Geolocation__c : '';
					entidadLegal.EconomicActivity__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__c && returnedValue.Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__r.Name) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.EconomicActivity__r.Name : '';
					entidadLegal.Regimen_Fiscal__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c : '';
					entidadLegal.DeedNumber__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.DeedNumber__c) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.DeedNumber__c : '';
					//SIGLO
					//NVH---> se agrega para obtener info de EL
					//component.set("v.dataSource", dataSource);
					dataSource.EntidadLegal = entidadLegal;
					var dataSource2 = component.get("v.dataSource");

					//dataSource2.Account.RazonSocial__c = dataSource.RazonSocial__c;
					dataSource2.Account.RazonSocial__c = entidadLegal.RazonSocial__c; //CHEQUEAR COMPARACION CON PROD
					dataSource2.Account.RFC__c = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name != undefined) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Name : '-';
					dataSource2.Account.DireccionFiscal = (returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c != undefined) ? returnedValue.Entidad_Cuenta__r.EntidadLegal__r.Direccion__c : '-';
					component.set("v.dataSource", dataSource2);
					component.set("v.entidadLegal", entidadLegal);
					//component.set("v.entidadLegal", dataSource);
					component.set("v.eLExist", true);
					this.getAttachment(component, entidadLegal.Id);
					//this.getAttachment(component, dataSource.Id);
				}
			}else {
				console.error('Response error: ', response.getError());
			}
		});
		$A.enqueueAction(action);
	},
	getFiliales: function (component, contratoId) {
		var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
		var action = component.get("c.executeQuery");
		var query = "";
		if (tipoReg.includes('RT_NuevaAfiliacion') || tipoReg.includes('RT_Renegotiation_merchants')){
			query = 
				"SELECT Id, Name, PlatformAdministrator__r.Name, PlatformAdministrator__r.Email, Contract_2__c, AccountEntity__c , AccountEntity__r.EntidadLegal__c, "+
					"AccountEntity__r.EntidadLegal__r.Id, AccountEntity__r.EntidadLegal__r.RecordType.Name, AccountEntity__r.EntidadLegal__r.Name, "+
					"AccountEntity__r.EntidadLegal__r.RazonSocial__c, AccountEntity__r.EntidadLegal__r.Estatus__c, AccountEntity__r.EntidadLegal__r.Direccion__c, "+
					"codeAS400__c, Contacto_Representante_Legal__c "+
				"FROM Affiliate__c "+
				"WHERE Contract_2__c = '" + contratoId + "' "+
				"AND isPrime__c = true "+
				"AND AccountEntity__c NOT IN (SELECT Entidad_Cuenta__c FROM Contrato2__c WHERE Id ='" + contratoId + "')"
			;
		} else {
			query = 
				"SELECT Id, Name, PlatformAdministrator__r.Name, RFC__c, Razon_Social__c, PlatformAdministrator__r.Email, Contrato_2__c, Entidad_Cuenta__c, "+
					"Entidad_Cuenta__r.EntidadLegal__c, Entidad_Cuenta__r.EntidadLegal__r.Id, Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name, Entidad_Cuenta__r.EntidadLegal__r.Name, "+
					"Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c, Entidad_Cuenta__r.EntidadLegal__r.Estatus__c, Entidad_Cuenta__r.EntidadLegal__r.Direccion__c, CodigoAS400__c, "+
					"Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c, Entidad_Cuenta__r.Cuenta__r.Giro__c, Entidad_Cuenta__r.Cuenta__r.Sector__c, "+
					"Entidad_Cuenta__r.Cuenta__r.Name, Entidad_Cuenta__r.Cuenta__r.Type, PlatformAdministrator__c, " +
					"GLB_Unique_ID_Generator__c, GLB_ID_Cuenta__c " +
				"FROM ContratoFilial__c " +
				"WHERE Contrato_2__c = '" + contratoId + "' " +
				"AND isPrime__c = true " +
				"AND Distintivo__c = null"
			;
			// SR-Filiales Query
			// query = "SELECT Id, Name, PlatformAdministrator__r.Name, RFC__c, Razon_Social__c, PlatformAdministrator__r.Email, Contrato_2__c, Entidad_Cuenta__c, Entidad_Cuenta__r.EntidadLegal__c, Entidad_Cuenta__r.EntidadLegal__r.Id, Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name, Entidad_Cuenta__r.EntidadLegal__r.Name, Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c, Entidad_Cuenta__r.EntidadLegal__r.Estatus__c, Entidad_Cuenta__r.EntidadLegal__r.Direccion__c, CodigoAS400__c, regionGrouper__c FROM ContratoFilial__c WHERE Contrato_2__c = '" + contratoId + "' and isPrime__c = true";
		}
        console.log('QUERY '+ query);
		var filiales;
		action.setParams({
            query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
            console.log('Log_1');
			if (state == 'SUCCESS') {
				filiales = component.get("v.filialesSource");
				var returnedValue = response.getReturnValue();
                console.log(' returnedValue::: '+JSON.stringify(returnedValue,0,2));
                const sEC = new Set();
				for (var x = 0; x < returnedValue.length; x++) {
					var temAf = {};
					if (tipoReg.includes('RT_NuevaAfiliacion') || tipoReg.includes('RT_Renegotiation_merchants')){
						if (!sEC.has(returnedValue[x].AccountEntity__c)) {
							sEC.add(returnedValue[x].AccountEntity__c);
							temAf.Id = returnedValue[x].Id;
							temAf.Contrato_2__c = returnedValue[x].Contract_2__c;
							temAf.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
							temAf.Entidad_Cuenta__r = returnedValue[x].AccountEntity__r;
							temAf.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                            temAf.Contacto_Representante_Legal__c = returnedValue[x].Contacto_Representante_Legal__c;
							//temAf.CodigoAS400__c = returnedValue[x].codeAS400__c;
							filiales.push(temAf);
						}
					} else {
						filiales.push(returnedValue[x]);
					}
				}

				for (var y = 0; y < filiales.length; y++) {
					filiales[y].Disabled = true;
				}
				component.set("v.filialesSource", filiales);
			} else {
				alert("Error");
			}
		})
		$A.enqueueAction(action);
	},
	getUser: function (component, userId) {
		var action = component.get("c.executeQuery");
		var query = 
			"SELECT Id, Manager.Name, Email, NumeroTerritorio__c, TerritorioPosventa__c " +
			"FROM User " +
			"WHERE Id = '" + userId + "' " +
			"LIMIT 1"
		;

		var dataSource;
		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				dataSource = component.get("v.dataSource");
				var returnedValue = response.getReturnValue()[0];

				dataSource.User = returnedValue
				if (dataSource.Opportunity.RecordType != undefined || dataSource.Opportunity.RecordType != null) {
					if (dataSource.Opportunity.RecordType.Name != undefined && dataSource.Opportunity.RecordType.Name != 'Venta nueva') {
						dataSource.User.NumeroTerritorio__c = dataSource.User.TerritorioPosventa__c;
					}
				}
				component.set("v.dataSource", dataSource);
			}
		})
		$A.enqueueAction(action);
	},
	getOppAttachments: function (component) {
		console.log('#2 CB Track');
		var toastEvent1 = $A.get("e.force:showToast");
		var oppId = component.get("v.oppId");
		console.log('#3 CB Track', oppId);
		var executeQuery = component.get("c.executeQuery");
		executeQuery.setParams({
			query: 
				"SELECT ContentDocumentId, ContentDocument.LatestPublishedVersionId, ContentDocument.Title, Id " +
				"FROM ContentDocumentLink " +
				"WHERE LinkedEntityId='" + oppId + "'"
		});
		executeQuery.setCallback(this, function (res) {
			var state = res.getState();
			if (state == 'SUCCESS') {
				var data = res.getReturnValue();
				console.log('#4 CB Track', data);
				if (data.length > 0) {
					var DocumentType = component.get("v.DocumentType") //3375
					var { DocumentosOportunidad = {} } = component.get('v.app_edenred.documentos')
					var { [DocumentType]: ModalidadPago = {} } = component.get('v.app_edenred.documentos') //CEAM:3375
					var fileNames = DocumentosOportunidad.label || {}
					var fileDocumentTypeNames = ModalidadPago.label || {} //CEAM:3375

					console.log('fileNames ',fileNames);
					console.log('fileDocumentTypeNames',fileDocumentTypeNames);

					var documents = [];
					for (var cd of data) {
						console.log('#5 CB Track', cd);
						var doc = { Id: cd.ContentDocumentId };
						doc.Name = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : ''
						doc.Title = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : ''
						console.log('doc from opp >>> ', doc);
            
						if (fileNames.hasOwnProperty(doc.Title)) {
							documents.push(doc);
						}
						if (fileDocumentTypeNames.hasOwnProperty(doc.Title)) {//CEAM:3375
							documents.push(doc);//CEAM:3375
						}//CEAM:3375
					}
          			console.log('documents',documents);
					component.set("v.attachmentSourceOpp", documents);
					component.set("v.app_edenred.render", true);
				} else {
					toastEvent1.setParams({
						"duration": "15000",
						"type": "erro",
						"title": "Advertencia",
						"message": "No se encontraron documentos en la oportunidad."
					});
					toastEvent1.fire();
				}
			}
		});
		$A.enqueueAction(executeQuery);

		/*old version 08/08/2018 - comenta @calvarez
			var toastEvent1 = $A.get("e.force:showToast");
		var oppId = component.get("v.oppId");

		var query2 = "SELECT Name, Id FROM Attachment WHERE ParentId ='" + oppId + "'"
		var action3 = component.get("c.executeQuery");
		action3.setParams({
			query : query2
		});

		action3.setCallback( this, function( response ) {
			var state = response.getState();
			var respuesta;
			
			if( state =='SUCCESS' ) {
				respuesta = response.getReturnValue();
				if( respuesta.length > 0 ) {
					component.set("v.attachmentSourceOpp", respuesta);
				} else {
					toastEvent1.setParams({
					"duration": "15000",
					"type": "erro",
					"title": "Advertencia",
					"message": "No se encontraron documentos en la oportunidad."
					});
					toastEvent1.fire();
				}
			}
		});
		$A.enqueueAction(action3);
		*/
	},
	getAttachment: function (component, entidadLegal) {
		//SIGLO (also included in the query)
		var repLegal = component.get("v.dataSource.ContactRepresentanteLegal.Id");
		//Fin SIGLO
		var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
		var executeQuery = component.get("c.executeQuery");
		var toastEvent1 = $A.get("e.force:showToast");
		var splitName;
		var attachmentSource = [];
		var isProductArgentina = component.get("v.isProductArgentina");
		let query = 
			"SELECT LinkedEntityId, ContentDocumentId, ContentDocument.LatestPublishedVersionId, ContentDocument.Title, Id, LinkedEntity.RecordType.Name "+
			"FROM ContentDocumentLink "+
			"WHERE LinkedEntityId='" + entidadLegal + "' "+
			"OR (LinkedEntityId='" + repLegal + "' "+
				"AND ("+
					"ContentDocument.Title LIKE '%FM2%' "+
					"OR ContentDocument.Title LIKE '%FM3%' "+
					"OR ContentDocument.Title LIKE '%Pasaporte%'"+
				")"+
			")"
		;
    	this.getTitleTypePerson(component);
		//SIGLO
		executeQuery.setParams({ query: query });
		//executeQuery.setParams({query : "SELECT LinkedEntityId, ContentDocumentId, ContentDocument.LatestPublishedVersionId, ContentDocument.Title, Id, LinkedEntity.RecordType.Name FROM ContentDocumentLink WHERE LinkedEntityId='" + entidadLegal + "'" });
		//SIGLO
		executeQuery.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var res = response.getReturnValue();

				var elegal = {};
				for (var cd of res) {
					if (cd.LinkedEntityId == entidadLegal) {
						elegal = cd;
						break;
					}
				}
				//var elegal = res && res.length > 0 && res[0].LinkedEntityId == entidadLegal? res[0] : {}
				var tipoPersonaEL = elegal.LinkedEntity && elegal.LinkedEntity.RecordType ? elegal.LinkedEntity.RecordType.Name : ''
				var tipoPersonaLabel;
				if (isProductArgentina) {
					tipoPersonaLabel = tipoPersonaEL == 'Persona Moral' ? 'Persona Moral Argentina EL' : 'Persona Física Argentina EL';
				} else {
					tipoPersonaLabel = tipoPersonaEL == 'Persona Moral' ? 'Persona Moral EL' : 'Persona Física EL';
				}
        
				if (tipoReg.includes('RT_NuevaAfiliacion') || tipoReg.includes('RT_Renegotiation_merchants')){
					tipoPersonaLabel = tipoPersonaEL == 'Persona Moral' ? 'Persona Moral Afiliación EL' : 'Persona Física Afiliación EL'
				}
                console.log('Res docs: ', res);
                console.log('ETIQUETA TP: ', tipoPersonaLabel);
                console.log('tipoPersona TP: ', tipoPersona);
                console.log('docs TP: ', component.get('v.app_edenred.documentos'),0,2);
				
                var { [tipoPersonaLabel]: tipoPersona = {} } = component.get('v.app_edenred.documentos')
				var fileNames = tipoPersona.label || {}
				
                console.log('fileName TP: ', fileNames);
				
                var documents = [];
				for (var cd of res) {
					var doc = { Id: cd.ContentDocumentId };
					doc.Name = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : ''
					doc.Title = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : ''
					//doc.Name = doc.Name.replace(/_/g, " ");
					doc.Title = doc.Title.replace(/_/g, " ");
                    console.log('DOC: ', doc.Title);
					if (fileNames.hasOwnProperty(doc.Title)) {
                        	documents.push(doc);    
                    } //Inicio SIGLO
					else if (cd.LinkedEntityId == repLegal) {
						doc.Name = 'Pasaporte, FM2 o FM3 (Representante Legal)';
						doc.Title = 'Pasaporte, FM2 o FM3 (Representante Legal)';
						documents.push(doc);
					} //Fin SIGLO
				}
				documents.forEach(function (att, index) {
					if (att.Name.indexOf('Contrato Ticket Car ') != -1) {
						splitName = att.Name.split('\_');
					} else {
						splitName = att.Name.split('\.');
					}

					if (splitName[0].indexOf('_') != -1) {
						splitName[0] = splitName[0].replace(/_/g, " ");
					}
					att.Name = splitName[0]
				})
                console.log(' component.get("v.attachmentSourceOpp"): ',  component.get("v.attachmentSourceOpp"));
				var oppAttach = component.get("v.attachmentSourceOpp");

				documents.forEach(function (opp, index) {
					oppAttach.push(opp);
				})
				
				component.set("v.attachmentSource", oppAttach);
				component.set("v.app_edenred.render", true);
			} else {
				toastEvent1.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al consultar los documentos asociados a la oportunidad"
				});
				toastEvent1.fire();
			}
		});
		$A.enqueueAction(executeQuery);

		/*old version 8/08/2018 @calvarez
		var action2 = component.get("c.executeQuery");
		var toastEvent1 = $A.get("e.force:showToast");
		var splitName;
		var attachmentSource = [];

		var query = "SELECT Name, Id FROM Attachment WHERE ParentId ='" + entidadLegal + "'"
		
		action2.setParams({
			query : query
		});
		action2.setCallback(this,function(response){
			var state = response.getState();
			var res;
			
			if(state =='SUCCESS'){
				res=response.getReturnValue();
				res.forEach(function(att,index){
					if(att.Name.indexOf('Contrato Ticket Car ') != -1){
						splitName = att.Name.split('\_');
					}
					else{
						splitName = att.Name.split('\.');
					}
					if(splitName[0].indexOf('_') != -1){
						splitName[0] = splitName[0].replace(/_/g, " ");
					}
					att.Name = splitName[0]
				})

				var oppAttach = component.get("v.attachmentSourceOpp");

				oppAttach.forEach(function(opp,index){
					res.push(opp);
				})

				component.set("v.attachmentSource", res);
								
				// Object.keys(res).forEach(function(key,index){
				// 	attachmentSource.push({name:key,value:''})
				// })
				// Object.values(res).forEach(function(value,index){
				// 	attachmentSource[index].value = value;
				// })
				// component.set("v.attachmentSource", attachmentSource);
			}
			else 
			{
				toastEvent1.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al consultar los documentos asociados a la oportunidad"
				});
				toastEvent1.fire();
			}			

		});
		$A.enqueueAction(action2);*/
	},
	getConvenioModificatorio: function (component) {
		var toastEvent1 = $A.get("e.force:showToast");
		var oppId = component.get("v.oppId");
		var executeQuery = component.get("c.executeQuery");
		executeQuery.setParams({
			query: 
				"SELECT ContentDocumentId, ContentDocument.LatestPublishedVersionId, ContentDocument.Title, Id " +
				"FROM ContentDocumentLink " +
				"WHERE LinkedEntityId='" + oppId + "'"
		});
		executeQuery.setCallback(this, function (res) {
			var state = res.getState();
			if (state == 'SUCCESS') {
				var data = res.getReturnValue();

				if (data.length > 0) {
					var documents = component.get("v.convenioModificatorio");
					for (var cd of data) {
						var doc = { Id: cd.ContentDocumentId };
						doc.Name = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : '';
						doc.Title = cd.ContentDocument && cd.ContentDocument.Title ? cd.ContentDocument.Title : '';

						documents.push(doc);
					}
					component.set("v.convenioModificatorio", documents);
					component.set("v.app_edenred.render", true);
				} else {
					toastEvent1.setParams({
						"duration": "15000",
						"type": "erro",
						"title": "Advertencia",
						"message": "No se ha adjuntado convenio modificatorio a la oportunidad."
					});
					toastEvent1.fire();
				}
			}
		});
		$A.enqueueAction(executeQuery);
	},
	getCotizacion: function (component, idCotizacion) {
		var action = component.get("c.executeQuery");
		//SIGLO Quote.TransactionsEstimatedNumber__c, Quote.OperationsInDollars__c added to query
		//Missing NECTAR Fields in this query
		var query = 
			"SELECT Id, Quote.CreatedDate, Quote.FechaCreacionModifica__c, Quote.TransactionsEstimatedNumber__c, Quote.OperationsInDollars__c, CantidadTarjetas__c, meanType__c,dualTagQuantity__c, "+
				"physicalCardQuantity__c,regularTagQuantity__c,virtualCardQuantity__c,Description,Product2.IDInterno__c, FormaPago__c, OpcionesMetodoPago__c, OtroMetodoPago__c, TarjetaAsociada__c, "+
				"TipoTarjeta__c, LineNumber, Subtotal, Quantity, Product2Id, PricebookEntryId, ServiceDate, UnitPrice, ClabeInterbancaria__c, TipoAmex__c, NivelConsumo__c, WarrantyValue__c, "+
				"TotalCreditDays__c, ReleasesNumber__c, CreditWeeks__c, WarrantyType__c, CreditDays__c, PaymentMethod__c, OperatingLine__c, ReleasePeriod__c, PreAnalysis__c, DocumentType__c, "+
				"GLB_LineaCreditoPreautorizada__c, GLB_TerminoDePago__c, GLB_FechaFinGarantia__c "+
			"FROM QuoteLineItem "+
			"WHERE Id=\'" + idCotizacion +"\' "+
			"AND Escalonamiento__c = NULL ORDER BY Id ASC"
    	;//CEAM:3375 MAU:3374 SE UTILIZA EL QUERY DE LA 609 PARA ACTIVAR NECTAR 	6298 --> Product2.VirtualCards__c (Agregar si se activa Tarjetas Virtuales)
		//var query = 'SELECT Id, Quote.TransactionsEstimatedNumber__c, Quote.OperationsInDollars__c, CantidadTarjetas__c, Description,Product2.IDInterno__c, FormaPago__c, OpcionesMetodoPago__c, OtroMetodoPago__c, TarjetaAsociada__c, TipoTarjeta__c, LineNumber, Subtotal, Quantity, Product2Id, PricebookEntryId, ServiceDate, UnitPrice, ClabeInterbancaria__c, TipoAmex__c, NivelConsumo__c, WarrantyValue__c, TotalCreditDays__c, ReleasesNumber__c, CreditWeeks__c, WarrantyType__c, CreditDays__c, PaymentMethod__c, OperatingLine__c, ReleasePeriod__c, PreAnalysis__c, DocumentType__c FROM QuoteLineItem WHERE Id=\'' + idCotizacion + '\' AND Escalonamiento__c = NULL ORDER BY Id ASC'; // SE COMENTA PARA ACTIVAR NECTAR
		//NECTAR
		//var query = 'SELECT Id, CantidadTarjetas__c, meanType__c,dualTagQuantity__c,physicalCardQuantity__c,regularTagQuantity__c,virtualCardQuantity__c,Description,Product2.IDInterno__c, FormaPago__c, OpcionesMetodoPago__c, OtroMetodoPago__c, TarjetaAsociada__c, TipoTarjeta__c, LineNumber, Subtotal, Quantity, Product2Id, PricebookEntryId, ServiceDate, UnitPrice, ClabeInterbancaria__c, TipoAmex__c, NivelConsumo__c, WarrantyValue__c, TotalCreditDays__c, ReleasesNumber__c, CreditWeeks__c, WarrantyType__c, CreditDays__c, PaymentMethod__c, OperatingLine__c, ReleasePeriod__c,  PreAnalysis__c, DocumentType__c FROM QuoteLineItem WHERE Id=\'' + idCotizacion + '\' AND Escalonamiento__c = NULL ORDER BY Id ASC';//CEAM:3375 MAU:3374
		//SIGLO
		//var query = 'SELECT Id, Quote.TransactionsEstimatedNumber__c, Quote.OperationsInDollars__c, CantidadTarjetas__c, meanType__c,dualTagQuantity__c,physicalCardQuantity__c,regularTagQuantity__c,virtualCardQuantity__c,Description,Product2.IDInterno__c, FormaPago__c, OpcionesMetodoPago__c, OtroMetodoPago__c, TarjetaAsociada__c, TipoTarjeta__c, LineNumber, Subtotal, Quantity, Product2Id, PricebookEntryId, ServiceDate, UnitPrice, ClabeInterbancaria__c, TipoAmex__c, NivelConsumo__c, WarrantyValue__c, TotalCreditDays__c, ReleasesNumber__c, CreditWeeks__c, WarrantyType__c, CreditDays__c, PaymentMethod__c, OperatingLine__c, ReleasePeriod__c, PreAnalysis__c, DocumentType__c FROM QuoteLineItem WHERE Id=\'' + idCotizacion + '\' AND Escalonamiento__c = NULL ORDER BY Id ASC';//CEAM:3375 MAU:3374
		//console.log('getCotizacion query', query);
		var dataSource;
		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()[0]
				dataSource = component.get("v.dataSource")
				dataSource.QuoteLineItem = returnedValue;
				
				if (returnedValue.FormaPago__c == 'TransferenciaElectronica' || returnedValue.FormaPago__c == 'Transferencia electrónica') {
					component.set("v.transferenciaElectronica", true)
				}
				else if (returnedValue.FormaPago__c == 'American Express') {
					component.set("v.amex", true)
				}
				else if (returnedValue.FormaPago__c == 'Deposito') {
					component.set("v.depositoBancario", true)
				}
				else if (returnedValue.FormaPago__c == 'Pago Online') {
					component.set("v.pagoOnline", true)
				}
				else if (returnedValue.FormaPago__c == 'STP') {
					component.set("v.STP", true)
				}
				else if (returnedValue.FormaPago__c == 'Otros') {
					component.set("v.otros", true)
				}
				//CEAM:3375 >>>
				console.log('#1.1 CB Track', returnedValue.DocumentType__c);
				if (returnedValue.DocumentType__c) {
					component.set("v.DocumentType", returnedValue.DocumentType__c)
				}
				//CEAM:3375 <<<

				component.set("v.dataSource", dataSource);
				//MAU:3374 >>>INICIO SE DESCOMENTA PARA ACTIVAR NECTAR
				if (returnedValue.Product2 && returnedValue.Product2.IDInterno__c && (returnedValue.Product2.IDInterno__c == '33' /*|| (returnedValue.Product2.VirtualCards__c && returnedValue.meanType__c != undefined && returnedValue.meanType__c != '')*/ )) { // 6298 --> || (returnedValue.Product2.VirtualCards__c [...]   (Descomentar si se activa Tarjetas Virtuales)
					
					if(returnedValue.meanType__c != undefined) {
						component.set('v.tiposDeMedio', returnedValue.meanType__c.split(';'));
					}
					component.set('v.dualTagQuantity__c', returnedValue.dualTagQuantity__c);
					component.set('v.regularTagQuantity__c', returnedValue.regularTagQuantity__c);
					component.set('v.physicalCardQuantity__c', returnedValue.physicalCardQuantity__c);
					component.set('v.virtualCardQuantity__c', returnedValue.virtualCardQuantity__c);
				} //MAU:3374 <<< FIN
				//if(returnedValue.Product2.IDInterno__c=='30'||returnedValue.Product2.IDInterno__c=='31'){
				if (dataSource.Opportunity.RecordType.Name != 'Renegociación' 
					|| (this.isProductFleet(component) && dataSource.Opportunity.GLB_Cambio_Condiciones_Facturacion__c)
				) {	//CEAM: 3563
					component.set("v.loadingPage", true);
					var cmp = component.find("camposCon");
					cmp.iniciar(dataSource.QuoteLineItem.Id);
				}//CEAM: 3563
				//}
			}
			else {
			}
		})
		$A.enqueueAction(action);
	},
	getProductoConcepto: function (component, quoteLineItemId) {
		console.log("SR-getProductoConcepto qli ->", quoteLineItemId);
		var action = component.get("c.executeQuery");
		var query = 
			"SELECT Id, Concepto_Tipo_Cargo__c, Concepto__c, Concepto__r.NTT_Usar_Valor_Default__c,Concepto__r.NTT_Valor_Default__c, Concepto__r.Orden__c, Concepto__r.Obligatorio__c, Concepto__r.TipoCargo__c, " +
				"Concepto__r.ClaveReferencia__c, Concepto__r.GLBAr_Currency__c, PrecioLista__c, PrecioLista2__c, PrecioFinal__c, Bonificacion__c, " +
				"VigenciaDescuento__c, CantidadTarjetas__c, PartidaPresupuesto__c, ProductoComparadoID__c, ApprovalLevel__c, CreatedDate, GLBAr_Currency__c " +
			"FROM ProductoConcepto__c " +
			"WHERE  Concepto__c != null " +
			"AND PartidaPresupuesto__c ='" + quoteLineItemId + "'"
		;
		// var dataSource;
		console.log(query);
		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()

				var datos = { ob: [], op: [] }

				for (var concepto of returnedValue) {
					concepto.TipoCargo__c = concepto.Concepto__r.TipoCargo__c ? concepto.Concepto__r.TipoCargo__c : 'zzzzz';
					if(!this.isProductFleet(component)) {
						concepto.TipoCargo__c = concepto.TipoCargo__c == 'Comisión por el servicio' ? '' : concepto.TipoCargo__c
					
					}
					datos[concepto.Concepto__r.Obligatorio__c ? 'ob' : 'op'].push(concepto)
                    /* SE AGREGA REQ AFILIADOS OPAM */
                    if(concepto.TipoCargo__c == '% Participación - Despensa OPAM 52'){
                        //console.log('ENTRA % Participación - Despensa OPAM 52');
                        component.set("v.isOPAM52", true);
                    }
                    if(concepto.TipoCargo__c == '% Participación - Despensa OPAM 62'){
                        //console.log('ENTRA % Participación - Despensa OPAM 62');
                        component.set("v.isOPAM62", true);
                    }
                    if(concepto.TipoCargo__c == '% Participación - Despensa OPAM 69'){
                        //console.log('ENTRA % Participación - Despensa OPAM 69');
                        component.set("v.isOPAM69", true);
                    }/* FIN REQ AFILIADOS OPAM */
				}
                
                for (var tipo in datos) {
					datos[tipo + '_ord'] = datos[tipo].sort(function (a, b) {
						if (a.TipoCargo__c < b.TipoCargo__c) {
							return -1
						} else if (a.TipoCargo__c > b.TipoCargo__c) {
							return 1
						}
						return 0
					})
				}
                
				returnedValue = datos.ob_ord.concat(datos.op_ord)
				component.set("v.productosSource", returnedValue);
			}
		})
		$A.enqueueAction(action);
	},
	getApprovalComments: function (component, quoteId) {
		var action = component.get("c.executeQuery");
		var consulta = 
			"SELECT Comments, Actor.Name, ElapsedTimeInDays, StepStatus "+
			"FROM ProcessInstanceStep "+
			"WHERE ProcessInstance.TargetObjectId =  '" + quoteId + "' "+
			"AND (StepStatus = 'Approved' OR StepStatus = 'Started') ORDER BY CreatedDate ASC"
		;
		action.setParams({
			query: consulta
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var lastComments = [];
				for (var pi of response.getReturnValue()) {
					if (pi.StepStatus == 'Started') {
						component.set('v.submitterComment', pi.Comments);
						break;
					}
				}
				for (var pi of response.getReturnValue()) {
					if (pi.StepStatus == 'Approved') {
						lastComments.push(pi);
					}
				}
				component.set('v.lastComments', lastComments);
				//component.set('v.historicoMotivosRechazo', response.getReturnValue());
			}
		});
		$A.enqueueAction(action);
	},
	getRenegotiationProducts: function (component, QuoteLineItemId) {//CEAM: 3563
		var action = component.get("c.executeQuery");
		var query = 
			"SELECT Id, SubsidiaryContract__c, Name, isRenegotiation__c, AccountCharge__c, AdicCardDisc__c, AditionalCardFee__c, CommissionPercentage__c, "+
				"PrincipalCardDisc__c, PrincipalCardFee__c, RenewCardDisc__c, RenewCardFee__c, ReplaceCardDisc__c, ReplaceCardFee__c, SendFee__c "+
			"FROM RenegotiationProduct__c "+
			"WHERE QuoteProduct__c ='" + QuoteLineItemId + "' "+
			"AND isRenegotiation__c = false"
		;
		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()
				component.set("v.isRenegotiation", returnedValue.length > 0 ? true : false);
				component.set("v.RenegotiationProducts", returnedValue);

				var idRenegotiationProduct = '';
				if (returnedValue.length > 0) {
					for (var rp of returnedValue) {
						if (idRenegotiationProduct.length > 0) {
							idRenegotiationProduct += ', '
						}
						idRenegotiationProduct += '\'' + rp.Id + '\'';
					}
				}

				var action2 = component.get("c.executeQuery");
				var query2 = 
					"SELECT Id, Name, Concept__c, FinalPrice__c, CargoConcept__c, RenegotiationProduct__c "+
					"FROM RenegotiationProductConcept__c "+
					"WHERE isRenegotiation__c = false "+
					"AND RenegotiationProduct__c IN ('" + idRenegotiationProduct + "')"
				;
				action2.setParams({
					query: query2
				})
				action2.setCallback(this, function (response) {
					var state = response.getState();
					if (state == 'SUCCESS') {
						var returnedValue = response.getReturnValue()
						component.set("v.RenegotiationProductConcept", returnedValue);
					}
				});
				$A.enqueueAction(action2);
			}
		})
		$A.enqueueAction(action);
	},
	getRenegotiationProductsConcept: function (component, idRenegotiationProduct) {//CEAM: 3563
		console.log('getRenegotiationProductsConcept: ', idRenegotiationProduct);
		var action = component.get("c.executeQuery");
		var query = 
			"SELECT Id, Name, Concept__c, FinalPrice__c, CargoConcept__c, RenegotiationProduct__c "+
			"FROM RenegotiationProductConcept__c "+
			"WHERE isRenegotiation__c = false "+
			"AND RenegotiationProduct__c = '" + idRenegotiationProduct + "'"
		;
		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue();
				console.log('getRenegotiationProductsConcept response: ', response.getReturnValue());
				component.set("v.RenegotiationProductConcept", returnedValue);
			}
		})
		$A.enqueueAction(action);
	},
	getMotivosRechazo: function (component, idCotizacion) {
		var action = component.get("c.getMotivosDeRechazo");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				component.set("v.motivosRechazoList", response.getReturnValue());
			} else {
				console.log("ERROR GET MOTIVOS RECHAZO");
			}
		});
		$A.enqueueAction(action);
	},
	getContacts: function (component, idCuenta) {
		var action = component.get("c.executeQuery");
		var dataSource = component.get("v.dataSource");

		action.setParams({
			query: 
				"SELECT Id, Name, AccountId, Funcion__c,Email,Puesto__c,Phone "+
				"FROM Contact where AccountId = '" + idCuenta + "' "+
				"AND Funcion__c = 'Quien administra Plataforma'"
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()[0];
				if (returnedValue != null || returnedValue != undefined) {
					dataSource.ContactAdministrador.Email = (returnedValue.Email) ? returnedValue.Email : '';
					dataSource.ContactAdministrador.Puesto__c = (returnedValue.Funcion__c) ? returnedValue.Funcion__c : '';
					dataSource.ContactAdministrador.Phone = (returnedValue.Phone) ? returnedValue.Phone : '';
					dataSource.ContactAdministrador.Name = (returnedValue.Name) ? returnedValue.Name : '';
				} else {
					console.log('getContacts No existe contacto Administrador, se asigna el RL a Quien Administra.');
					console.log('dataSource getContacts:', dataSource);

					dataSource.ContactAdministrador.Email = (dataSource.ContactRepresentanteLegal.Email) ? dataSource.ContactRepresentanteLegal.Email : '';
					dataSource.ContactAdministrador.Puesto__c = (dataSource.ContactRepresentanteLegal.Funcion__c) ? dataSource.ContactRepresentanteLegal.Funcion__c : '';
					dataSource.ContactAdministrador.Phone = (dataSource.ContactRepresentanteLegal.Phone) ? dataSource.ContactRepresentanteLegal.Phone : '';
					dataSource.ContactAdministrador.Name = (dataSource.ContactRepresentanteLegal.Name) ? dataSource.ContactRepresentanteLegal.Name : '';
				}

				component.set("v.dataSource", dataSource);
			}
		})
		$A.enqueueAction(action);
	},
	getAddresses: function(component, contrato) {
		// debugger;
		var dataSource = component.get("v.dataSource");
		if(this.isProductFleet(component) || this.isProductEcovale(component) || this.isProduct43(component)) {
			let direccionesEntrega = component.get("v.dirEntregaCMP");
			
			let queryAddFiscal = 
				"SELECT Id, Name, Calle_Tt__c, NumeroInterior_Tt__c, NumeroExterior_Tt__c, Colonia_Tt__c, CodigoPostal_Tt__c, "+
					"DelegacionMunicipio_Tt__c, Ciudad_Tt__c, Estado_Tt__c, Tipo_Pt__c, CodigoPostalID__c, CuentaID__c " +
				"FROM CatalogoDirecciones__c "+
				"WHERE Id = '"  + contrato.FiscalAddress__c +"' "+
				"ORDER BY CreatedDate"
			;
			console.log('NVH --> quer queryAddFiscal: ', queryAddFiscal);
			let actionFiscalAdd = component.get("c.executeQuery");
			
			let query = 
				"SELECT Id, ContratoID__c, DireccionID__r.Id, DireccionID__r.Name, DireccionID__r.Calle_Tt__c, DireccionID__r.CodigoPostal_Tt__c, "+ 
					"DireccionID__r.Colonia_Tt__c, DireccionID__r.NumeroInterior_Tt__c, DireccionID__r.NumeroExterior_Tt__c  " +
				"FROM Contrato_Direccion__c "+
				"WHERE ContratoID__c = '"  + contrato.Id +"' "+
				"ORDER BY CreatedDate"
			;
			let action = component.get("c.executeQuery");
			console.log('NVH --> quer address: ', query);
			action.setParams({
				query: query
			});
			action.setCallback(this, function (response) {
				let state = response.getState();
				if (state == 'SUCCESS') {
					let returnedValue = response.getReturnValue();
					dataSource.AllAddressesSelected = returnedValue;
					component.set("v.dataSource", dataSource);
				} 
				else {
					console.error('Error al realizar query de direcciones');
				}
			});
			$A.enqueueAction(action);
			actionFiscalAdd.setParams({
				query: queryAddFiscal
			});
			actionFiscalAdd.setCallback(this, function (response) {
				let state = response.getState();
				if (state == 'SUCCESS') {
					let returnedValue = response.getReturnValue();
					dataSource.FiscalAddress = returnedValue;
					component.set("v.dataSource", dataSource);
				} 
				else {
					console.error('Error al realizar query de direcciones');
				}
			});
			$A.enqueueAction(actionFiscalAdd);
		}
		
		
	},
	getSubcuentasAsociadas: function (component, contratoId, afiliados) {
		console.log('getSubcuentasAsociadas');
        var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
		var action = component.get("c.executeQuery");
		var query = "";
        var sAfIds = '';
        var prodIds = [];
        query = 
			"SELECT Id, AS400_integration__c, ProductCode, Uso__c, Red__c, Formato__c, IsAffiliate__c, Name, SendToSIGLO__c, "+
				"("+
					"SELECT Id, Producto_secundario__c, Producto_secundario__r.Name, Producto_secundario__r.ProductCode, Producto_secundario__r.IDInterno__c "+
					"FROM Productos_secundarios__r "+
					"ORDER BY Producto_secundario__c"+
				") "+
			"FROM Product2 "+
			"WHERE Id = '" + component.get("v.dataSource.Product2__c.Id") + "'"
        ;
		action.setParams({
			query: query
		})
		console.log('SP getSubcuentasAsociadas query: '+query);
		action.setCallback(this, function (response) {
			var state = response.getState();
			console.log('CB state ', state);
            // REQ AFILIADOS OPAM
            var isOPAM52 = component.get("v.isOPAM52");
            var isOPAM62 = component.get("v.isOPAM62");
            var isOPAM69 = component.get("v.isOPAM69");
            //FIN REQ AFILIADOS OPAM
            //debugger;
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()[0];
				var dataSource = component.get("v.dataSource");
				console.log('CB getSubcuentasAsociadas returnedValue ', returnedValue);
				//CB: En la siguiente linea se esta reemplazando los campos traidos de Product2__c anteriormente
                dataSource.Product2__c = returnedValue;
				
				component.set("v.dataSource", dataSource);
                
                if(afiliados && afiliados != ''){
                    console.log('afiliados', JSON.parse(afiliados));
                    var afs = [];
                    afs = JSON.parse(afiliados);
                    var afsIds = [];
                    for(var x = 0; x < afs.length; x++){
                        afsIds.push(afs[x].Id);
                    }
                    sAfIds = afsIds.join("','");
                }
                
                query = "";

				/**
				 * 30-08-2023 TODO (Si se apruba cambio de contratos filiales)
				 * Si producto = fleet y Oportunidad tipo Renegociacion
				 * Obtener contratos filiales de GLB_Contratos_Renegociacion__c en Oportunidad
				 */
				console.log('tipoReg >>> ', tipoReg);
				console.log('isFleet >>> ', this.isProductFleet(component));
				console.log('dataSource.Opportunity.GLB_Contratos_Renegociacion__c', dataSource.Opportunity.GLB_Contratos_Renegociacion__c);
				if (tipoReg.includes('RT_NuevaAfiliacion') || tipoReg.includes('RT_Renegotiation_merchants')){
                    // query = "SELECT Id, BusinessName__c, RFC__c, Distintivo__c, PlatformAdministrator__c, PlatformAdministrator__r.Name, Name, codeAS400__c, Contract_2__c, AccountEntity__c, isPrime__c, Product__c, Product__r.Name (SELECT Id,Subsidiary_contract__c, Save_from_contract__c, Local_id__c FROM Groupers__r WHERE Save_from_contract__c = true) From Affiliate__c WHERE Contract_2__c = '" + contratoId + "' or Id in ('" + sAfIds + "') order by AccountEntity__c, isPrime__c desc, Product__c";
                    query = 
						"SELECT Id, BusinessName__c, RFC__c, Distintivo__c, PlatformAdministrator__c, PlatformAdministrator__r.Name, Name, codeAS400__c, Contract_2__c, "+
							"AccountEntity__c, isPrime__c, Product__c, Product__r.Name, isOPAM52__c, isOPAM62__c, isOPAM69__c, FileNumber__c, Product__r.ProductCode "+
						"FROM Affiliate__c "+
						"WHERE Contract_2__c = '" + contratoId + "' "+
						"OR Id IN ('" + sAfIds + "') "+
						"ORDER BY AccountEntity__c, isPrime__c DESC, Product__c"
					;
                } else if(tipoReg == 'RT_Renegotiation' && this.isProductFleet(component)
					&& (dataSource.Opportunity.GLB_Contratos_Renegociacion__c != null && dataSource.Opportunity.GLB_Contratos_Renegociacion__c != undefined)
				) {
					var contractIdsStringTreated = dataSource.Opportunity.GLB_Contratos_Renegociacion__c.replaceAll(",","\',\'");
					console.log('CB >>> ContractFilIds ', contractIdsStringTreated);
					query = 
						"SELECT Id, Razon_Social__c, RFC__c, Distintivo__c, PlatformAdministrator__c, PlatformAdministrator__r.Name, PlatformAdministrator__r.Email, "+
							"GLB_Unique_ID_Generator__c, GLB_ID_Cuenta__c,CodigoAS400__c, Contrato_2__c " +
						"FROM ContratoFilial__c "+
						"WHERE Id IN ('"+contractIdsStringTreated+ "')"
					;
				} else {
                    //Modificado por Carlos Cruz
					//query = "SELECT Id, Razon_Social__c, RFC__c, Distintivo__c, PlatformAdministrator__c, PlatformAdministrator__r.Name, PlatformAdministrator__r.Email, CodigoAS400__c, Contrato_2__c, (SELECT Id,Subsidiary_contract__c, Save_from_contract__c, Local_id__c FROM Groupers__r WHERE Save_from_contract__c = true) From ContratoFilial__c where Contrato_2__c = '" + contratoId + "' and isPrime__c = false";
					query = 
						"SELECT Id, Razon_Social__c, RFC__c, Distintivo__c, PlatformAdministrator__c, PlatformAdministrator__r.Name, PlatformAdministrator__r.Email, "+
							"GLB_Unique_ID_Generator__c, GLB_ID_Cuenta__c, " +
							"CodigoAS400__c, Contrato_2__c "+
						"FROM ContratoFilial__c "+
						"WHERE Contrato_2__c = '" + contratoId + "' "+
						"AND isPrime__c = false"
					;
				}
				console.log('SP query: '+query);

				action.setParams({
					query: query
				})
				action.setCallback(this, function (response) {
					var state = response.getState();
					if (state == 'SUCCESS') {
                        var returnedValue = response.getReturnValue();
						console.log('SP returnedValue: '+JSON.stringify(returnedValue,0,2));

                        
                        // Modificado por Carlos Cruz
                        var groupersIdArray = [];
                        var groupersIdString = '';
                        for(var x = 0; x < returnedValue.length; x++){
                            if(returnedValue[x].Groupers__r != null && returnedValue[x].Groupers__r != undefined )
                                for(var i = 0; i < returnedValue[x].Groupers__r.length; i++ ){
                                    groupersIdArray.push(returnedValue[x].Groupers__r[i].Id);
                                }
                        }
                        
                        groupersIdString = groupersIdArray.join("','");
                        console.log('::::::Groupers Id::::: '+groupersIdString);
                        
                        query = "SELECT Id,Name, Grouper__c,Grouper__r.Subsidiary_contract__c,Grouper__r.Name  FROM Cost_Center__c WHERE Grouper__c IN ('"+groupersIdString+"')";
                        action.setParams({
                            query: query
                        });
						//EndRegion
                        action.setCallback(this, function (response) {
                            //Modificado por Carlos Cruz
                            var returnedCostCenter = response.getReturnValue();   
                            console.log(':::::::Centros de costos:::::: '+JSON.stringify(returnedCostCenter));
                            console.log('SP tipoReg: '+tipoReg);
                            if(tipoReg.includes('RT_NuevaAfiliacion') || tipoReg.includes('RT_Renegotiation_merchants')){
                                var filiales = [];
                                //BEGIN Added by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
                                var listConceptos = component.get("v.productosSource");
                                var mapConceptos = {};
                                for (var indexCon in listConceptos)
                                    mapConceptos[listConceptos[indexCon].TipoCargo__c] = listConceptos[indexCon];
                                //END Added by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
                                var producto = component.get("v.dataSource.Product2__c");
                                var contrato = component.get("v.dataSource.Contrato2__c");
                            	console.log('SP producto: '+JSON.stringify(producto,0,2));
                            	console.log('SP contrato: '+JSON.stringify(contrato,0,2));
                                
                                if(producto && producto.Productos_secundarios__r && producto.Productos_secundarios__r.length > 0){
                                    console.log(':::ENTRO AQUI 1');
                                    for(var x = 0; x < returnedValue.length; x++){
                                        var idAsign = false;
                                        for(var y = 0; y < producto.Productos_secundarios__r.length; y++){
                                            if(returnedValue[x].Product__c){
                                                //console.log('Productos', returnedValue[x].Product__c, producto.Productos_secundarios__r[y].Producto_secundario__c);
                                                if(returnedValue[x].Product__c == producto.Productos_secundarios__r[y].Producto_secundario__c){
                                                    var temAf = {};
                                                    temAf.Id = returnedValue[x].Id;
                                                    temAf.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                    temAf.RFC__c = returnedValue[x].RFC__c;
                                                    temAf.Distintivo__c = returnedValue[x].Distintivo__c;
                                                    temAf.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                    temAf.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                    temAf.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                    temAf.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                    temAf.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                    temAf.Name = returnedValue[x].Name;
                                                    temAf.isPrime__c = returnedValue[x].isPrime__c;
                                                    temAf.Producto__c = producto.Productos_secundarios__r[y].Producto_secundario__c;
                                                    temAf.ProductCode = producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode; //REQ: 6452 
                                                    temAf.Texto_libre__c = '(' + producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode + ') ' + producto.Productos_secundarios__r[y].Producto_secundario__r.Name;
                                                    temAf.FileNumber__c = returnedValue[x].FileNumber__c != undefined ? returnedValue[x].FileNumber__c : null; //6452 Número de expediente 
                                                    //Modificado por Carlos Cruz
                                                    //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf.Id);
                                                    
                                                    //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                    
                                                    //temAf.centrosCostos = centrosCostos;
                                                    //EndRegion
                                                    filiales.push(temAf);
                                                }
                                                //BEGIN Added by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
                                            }
                                            else if (producto.ProductCode == "multip-AF" && mapConceptos[producto.Productos_secundarios__r[y].TipoCargo__c] && (!contrato.SelectedProducts__c || contrato.SelectedProducts__c.includes(producto.Productos_secundarios__r[y].Producto_secundario__c))){
                                                console.log('multip-AF');
                                                var temAf = {};
                                                if(!idAsign){
                                                    temAf.Id = returnedValue[x].Id;
                                                    idAsign = true;
                                                }
                                                temAf.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                temAf.RFC__c = returnedValue[x].RFC__c;
                                                temAf.Distintivo__c = returnedValue[x].Distintivo__c;
                                                temAf.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                temAf.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                temAf.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                temAf.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                temAf.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                temAf.Name = returnedValue[x].Name;
                                                temAf.isPrime__c = returnedValue[x].isPrime__c;
                                                temAf.Producto__c = producto.Productos_secundarios__r[y].Producto_secundario__c;
                                                temAf.ProductCode = producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode; //REQ: 6452 
                                                temAf.Texto_libre__c = '(' + producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode + ') ' + producto.Productos_secundarios__r[y].Producto_secundario__r.Name;
                                                
                                                //Modificado por Carlos Cruz
                                                //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf.Id);
                                                
                                                //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                
                                                //temAf.centrosCostos = centrosCostos;
                                                //EndRegion 
                                                
                                                filiales.push(temAf);
                                            }
                                                else if (producto.ProductCode != "multip-AF" && (!contrato.SelectedProducts__c || contrato.SelectedProducts__c.includes(producto.Productos_secundarios__r[y].Producto_secundario__c))) {
                                                    console.log('producto.ProductCode', producto.ProductCode);
                                                    var temAf = {};
                                                    if(!idAsign){
                                                        temAf.Id = returnedValue[x].Id;
                                                        idAsign = true;
                                                    }
                                                    temAf.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                    temAf.RFC__c = returnedValue[x].RFC__c;
                                                    temAf.Distintivo__c = returnedValue[x].Distintivo__c;
                                                    temAf.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                    temAf.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                    temAf.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                    temAf.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                    temAf.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                    temAf.Name = returnedValue[x].Name;
                                                    temAf.isPrime__c = returnedValue[x].isPrime__c;
                                                    temAf.Producto__c = producto.Productos_secundarios__r[y].Producto_secundario__c;
                                                    temAf.ProductCode = producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode; //REQ: 6452 
                                                    temAf.Texto_libre__c = '(' + producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode + ') ' + producto.Productos_secundarios__r[y].Producto_secundario__r.Name;
                                                    //Modificado por Carlos Cruz
                                                    //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf.Id);
                                                    
                                                    //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                    
                                                    //temAf.centrosCostos = centrosCostos;
                                                    //endRegion
                                                    filiales.push(temAf);
                                                }
                                        }
                                    }
                                }
                                else {
                                     console.log(':::ENTRO AQUI 2');
                                    for (var x = 0; x < returnedValue.length; x++) {
                                        var temAf = {};
                                        var temAf_OPAM52 = {};
                                        var temAf_OPAM62 = {};
                                        var temAf_OPAM69 = {};
                                        //REQ OPAM
                                        console.log('VALOR returnedValue[x].codeAS400__c: ', returnedValue[x].codeAS400__c);
                                        if((isOPAM52 || isOPAM62 || isOPAM69) && producto.ProductCode == 'des-AF-OPAM' && (returnedValue[x].codeAS400__c == '' ||returnedValue[x].codeAS400__c == undefined )){
                                            if(isOPAM52){
                                                console.log(':::ENTRO AQUI 3');
                                                temAf_OPAM52.Id = returnedValue[x].Id;
                                                temAf_OPAM52.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                temAf_OPAM52.RFC__c = returnedValue[x].RFC__c;
                                                temAf_OPAM52.Distintivo__c = returnedValue[x].Distintivo__c;
                                                temAf_OPAM52.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                temAf_OPAM52.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                temAf_OPAM52.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                temAf_OPAM52.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                temAf_OPAM52.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                temAf_OPAM52.Name = returnedValue[x].Name;
                                                temAf_OPAM52.isPrime__c = returnedValue[x].isPrime__c;
                                                temAf_OPAM52.Producto__c = producto.Id;
                                                temAf_OPAM52.ProductoCode = producto.ProductCode;//REQ: 6452
                                                temAf_OPAM52.Texto_libre__c = 'Despensa OPAM 52';
                                                temAf_OPAM52.isOPAM52__c = true;
                                                 //Modificado por Carlos Cruz
                                              
                                                //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf_OPAM52.Id);
                                                
                                                //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                
                                                //temAf_OPAM52.centrosCostos = centrosCostos;
                                                //Endregion
                                                filiales.push(temAf_OPAM52);
                                            }
                                            if(isOPAM62){
                                                 console.log(':::ENTRO AQUI 4');
                                                temAf_OPAM62.Id = returnedValue[x].Id;
                                                temAf_OPAM62.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                temAf_OPAM62.RFC__c = returnedValue[x].RFC__c;
                                                temAf_OPAM62.Distintivo__c = returnedValue[x].Distintivo__c;
                                                temAf_OPAM62.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                temAf_OPAM62.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                temAf_OPAM62.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                temAf_OPAM62.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                temAf_OPAM62.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                temAf_OPAM62.Name = returnedValue[x].Name;
                                                temAf_OPAM62.isPrime__c = returnedValue[x].isPrime__c;
                                                temAf_OPAM62.Producto__c = producto.Id;
                                                temAf_OPAM62.ProductoCode = producto.ProductCode;//REQ: 6452 
                                                temAf_OPAM62.Texto_libre__c = 'Despensa OPAM 62';
                                                temAf_OPAM62.isOPAM62__c = true;
                                                //Modificado por Carlos Cruz
                                            
                                                //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf_OPAM62.Id);
                                                
                                                //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                
                                                //temAf_OPAM62.centrosCostos = centrosCostos;
                                                //Endregion
                                                
                                                filiales.push(temAf_OPAM62);
                                            }
                                            if(isOPAM69){
                                                console.log(':::ENTRO AQUI 5');
                                                temAf_OPAM69.Id = returnedValue[x].Id;
                                                temAf_OPAM69.Razon_Social__c = returnedValue[x].BusinessName__c;
                                                temAf_OPAM69.RFC__c = returnedValue[x].RFC__c;
                                                temAf_OPAM69.Distintivo__c = returnedValue[x].Distintivo__c;
                                                temAf_OPAM69.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                                temAf_OPAM69.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                                temAf_OPAM69.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                                temAf_OPAM69.Contrato_2__c = returnedValue[x].Contract_2__c;
                                                temAf_OPAM69.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                                temAf_OPAM69.Name = returnedValue[x].Name;
                                                temAf_OPAM69.isPrime__c = returnedValue[x].isPrime__c;
                                                temAf_OPAM69.Producto__c = producto.Id;
                                                temAf_OPAM69.ProductoCode = producto.ProductCode;//REQ: 6452 
                                                temAf_OPAM69.Texto_libre__c = 'Despensa OPAM 69';
                                                temAf_OPAM69.isOPAM69__c = true;
                                                
                                               //Modificado por Carlos Cruz
                                                 //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__r != null && item.Grouper__r.Subsidiary_contract__c == temAf_OPAM69.Id);
                                                
                                                //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                                
                                                //temAf_OPAM69.centrosCostos = centrosCostos;
                                                //Endregion
                                                
                                                filiales.push(temAf_OPAM69);
                                            }
                                        }
                                        else{
                                            console.log('returnedValue[x].Affiliate__r.FileNumber__c: ' + returnedValue[x].FileNumber__c);
                                            console.log(':::ENTRO AQUI 6');
                                            temAf.Id = returnedValue[x].Id;
                                            temAf.Razon_Social__c = returnedValue[x].BusinessName__c;
                                            temAf.RFC__c = returnedValue[x].RFC__c;
                                            temAf.Distintivo__c = returnedValue[x].Distintivo__c;
                                            temAf.PlatformAdministrator__c = returnedValue[x].PlatformAdministrator__c;
                                            temAf.PlatformAdministrator__r = returnedValue[x].PlatformAdministrator__r;
                                            temAf.CodigoAS400__c = returnedValue[x].codeAS400__c;
                                            temAf.Contrato_2__c = returnedValue[x].Contract_2__c;
                                            temAf.Entidad_Cuenta__c = returnedValue[x].AccountEntity__c;
                                            temAf.Name = returnedValue[x].Name;
                                            temAf.isPrime__c = returnedValue[x].isPrime__c;
                                            temAf.Producto__c = producto.Id;
                                            temAf.ProductCode = producto.ProductCode;//REQ: 6452 
                                            temAf.FileNumber__c = returnedValue[x].FileNumber__c != undefined ? returnedValue[x].FileNumber__c : null; //6452 Número de expediente
                                            //temAf.FileNumber__c = returnedValue[x].Affiliate__r.FileNumber__c; //6452
                                            if( returnedValue[x].isOPAM52__c){
                                                temAf.Texto_libre__c = 'Despensa OPAM 52';  
                                                temAf.isOPAM52__c = true;
                                            }else if( returnedValue[x].isOPAM62__c){
                                                temAf.Texto_libre__c = 'Despensa OPAM 62';
                                                temAf.isOPAM62__c = true;
                                            }else if( returnedValue[x].isOPAM69__c){
                                                temAf.Texto_libre__c = 'Despensa OPAM 69';
                                                temAf.isOPAM69__c = true;
                                            }else{
                                                temAf.Texto_libre__c = '';
                                            }
                                            //Modificado por Carlos Cruz
                                            console.log(returnedCostCenter);
                                            //var centrosCostos = returnedCostCenter.filter(item => item.Grouper__c != null && item.Grouper__r.Subsidiary_contract__c === temAf.Id);
                                            console.log('LLEGA AQUI 66');
                                            //console.log(':::CC::: '+JSON.stringify(centrosCostos));
                                            
                                            //temAf.centrosCostos = centrosCostos;
                                            //Endregion
                                            filiales.push(temAf);
                                            //console.log('temAf.FileNumber__c: ' + temAf.FileNumber__c);
                                        }
                                    }
                                }
                                
                                component.set("v.subcuentasAdicionales", filiales);
                                console.log(':::getSubcuentasAsociadas::: ', filiales);
                                console.log("PING_log_1");
                            } else {
                                //Modificado por Carlos Cruz
                                for(var x = 0; x < returnedValue.length; x++){
                                    var item = returnedValue[x];
                                      console.log(':::Id::: '+item.Id);
                                    //item.centrosCostos =  returnedCostCenter.filter(element => element.Grouper__r != null && element.Grouper__r.Subsidiary_contract__c === item.Id);
                                }
                                console.log(':::CC::: '+JSON.stringify(returnedValue));
                                //Endregion
                                
                                component.set("v.subcuentasAdicionales", returnedValue);
                                console.log(':getSubcuentasAsociadas: ', returnedValue);
                            }
                        })
                        console.log('ping log1.1');
                        $A.enqueueAction(action);   
                        console.log('ping log1.2');    
					} else {
                        console.log('ping log1.3');
						alert("Error");
                        console.log('ping log1.4');
					}               
				})
                console.log('ping log1.5');
				$A.enqueueAction(action);
                console.log('ping log1.6');
			} else {
                console.log('ping log1.7');
				alert("Error");
                console.log('ping log1.8');
			}
		})
        console.log('ping log1.9');
		$A.enqueueAction(action);
	},
	getEstablecimientos: function (component, contratoId) {
        console.log("PING LOG 3");
		var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
		var action = component.get("c.executeQuery");
		var query = "";
		//BEGIN Removed by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
		//query = "Select Id, IsAffiliate__c, isPhantomIntegration__c, Name, SendToSIGLO__c, (Select Id, Producto_secundario__c, Producto_secundario__r.Name, Producto_secundario__r.ProductCode, Producto_secundario__r.IDInterno__c from Productos_secundarios__r where Producto_secundario__r.IsActive = true order by Producto_secundario__c) From Product2 WHERE Id = '" + component.get("v.dataSource.Product2__c.Id") + "'";
		//END Removed by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
		//BEGIN Added by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911
		query = 
			"SELECT Id, IsAffiliate__c, Uso__c, Formato__c, Red__c, AS400_integration__c, isPhantomIntegration__c, Name, SendToSIGLO__c, ProductCode, "+
				"("+
					"SELECT Id, TipoCargo__c, Producto_secundario__c, Producto_secundario__r.Name, Producto_secundario__r.ProductCode, Producto_secundario__r.IDInterno__c "+
					"FROM Productos_secundarios__r "+
					"ORDER BY Producto_secundario__c"+
				") "+
			"FROM Product2 "+
			"WHERE Id = '" + component.get("v.dataSource.Product2__c.Id") + "'"
		;
		//END Added by Fran Rojas<frojas@freewayconsulting.com> | FIX 02185911

		action.setParams({
			query: query
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var returnedValue = response.getReturnValue()[0];

				var dataSource = component.get("v.dataSource");
				dataSource.Product2__c = returnedValue;
				
				component.set("v.dataSource", dataSource);

				query = 
					"SELECT Id, Affiliate__c, Affiliate__r.RFC__c, Affiliate__r.BusinessName__c, Reference__c, StationId__c, Affiliate__r.Product__c "+
					"FROM Establishment__c "+
					"WHERE Contract__c = '" + contratoId + "' "+
					"ORDER BY Affiliate__r.AccountEntity__c, Affiliate__r.isPrime__c DESC, Affiliate__r.Product__c"
				;
                //COMENTADA POR CARLOS query = "SELECT Id, Affiliate__c, Affiliate__r.RFC__c, Affiliate__r.BusinessName__c, Reference__c, StationId__c, Affiliate__r.Product__c, Grouper__c, Grouper__r.Name FROM Establishment__c WHERE Contract__c = '" + contratoId + "' order by Affiliate__r.AccountEntity__c, Affiliate__r.isPrime__c desc, Affiliate__r.Product__c";
				action.setParams({
					query: query
				})
                
				action.setCallback(this, function (response) {
					var state = response.getState();
					if (state == 'SUCCESS') {
						var returnedValue = response.getReturnValue();
						//console.log('getEstablecimientos returnedValue: ', returnedValue);
						var establecimientos = [];
						var producto = component.get("v.dataSource.Product2__c");
						var contrato = component.get("v.dataSource.Contrato2__c");
                        //console.log('producto: ', JSON.parse(JSON.stringify(producto)));
                        
                        
                        //OPAM
                        console.log('producto: ', JSON.parse(JSON.stringify(producto)));
                        console.log('returnedValue: ', JSON.parse(JSON.stringify(returnedValue)));
                        console.log('getSubcuentas: ', component.get("v.subcuentasAdicionales"));
                        var subacc = component.get("v.subcuentasAdicionales");
                        
                        if(producto && producto.ProductCode == 'des-AF-OPAM'){
                            console.log('ENTRA IF OPAM')
                            for (var x = 0; x < returnedValue.length; x++) {
                                console.log('x', x);
                                for(var p = 0; p < subacc.length; p++ ){
                            		console.log('p', p);
                                    var temAf = {};
                                    temAf.Id = returnedValue[x].Id;
                                    temAf.Affiliate__c = returnedValue[x].Affiliate__c;
                                    temAf.Affiliate__r = returnedValue[x].Affiliate__r;
                                    temAf.Product__c = returnedValue[x].Affiliate__r.Product__c;
                                    temAf.StationId__c = returnedValue[x].StationId__c;
                                    temAf.Reference__c = subacc[p].Texto_libre__c;
									temAf.ProductCode = producto.ProductCode;// Producto 43
                                    establecimientos.push(temAf);
                                }
                            }    
                        }else{
							if (producto && producto.Productos_secundarios__r && producto.Productos_secundarios__r.length > 0) {
                                console.log('ENTRA IF 1231');
								for (var x = 0; x < returnedValue.length; x++) {
								var idAsign = false;
                                for (var y = 0; y < producto.Productos_secundarios__r.length; y++) {
									if (returnedValue[x].Affiliate__c && returnedValue[x].Affiliate__r.Product__c) {
										console.log('ENTRA IF 1236');
                                        if (returnedValue[x].Affiliate__r.Product__c == producto.Productos_secundarios__r[y].Producto_secundario__c) {
											var temAf = {};
											temAf.Id = returnedValue[x].Id;
                                            temAf.Affiliate__c = returnedValue[x].Affiliate__c;
											temAf.Affiliate__r = returnedValue[x].Affiliate__r;
											temAf.Product__c = returnedValue[x].Affiliate__r.Product__c;
											temAf.StationId__c = returnedValue[x].StationId__c;
											temAf.Reference__c = "(" + producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode + ") " + producto.Productos_secundarios__r[y].Producto_secundario__r.Name;
                                            if(returnedValue[x].Grouper__r != undefined && returnedValue[x].Grouper__r != null)
                                                temAf.Grouper__c = returnedValue[x].Grouper__r.Name;
											temAf.ProductCode = producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode;//Producto 43
                                            establecimientos.push(temAf);
										}
									} else if((!contrato.SelectedProducts__c || contrato.SelectedProducts__c.includes(producto.Productos_secundarios__r[y].Producto_secundario__c))){
										console.log('ENTRA IF 1248');
										console.log(':::::::::::returnedValue[x].Id', returnedValue[x].Id);
										console.log(':::::::::::idAsign', idAsign);
                                        var temAf = {};
										if(!idAsign){
											temAf.Id = returnedValue[x].Id;
                                            idAsign = true;
										}
                                        temAf.Affiliate__c = returnedValue[x].Affiliate__c;
										temAf.Affiliate__r = returnedValue[x].Affiliate__r;
										temAf.Product__c = producto.Productos_secundarios__r[y].Producto_secundario__c;
										temAf.StationId__c = returnedValue[x].StationId__c;
										temAf.Reference__c = "(" + producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode + ") " + producto.Productos_secundarios__r[y].Producto_secundario__r.Name;
                                        if(returnedValue[x].Grouper__r!=undefined && returnedValue[x].Grouper__r!= null)
                                            temAf.Grouper__c = returnedValue[x].Grouper__r.Name;
										temAf.ProductCode = producto.Productos_secundarios__r[y].Producto_secundario__r.ProductCode;//Producto 43
                                        establecimientos.push(temAf);
									}
								}
							}
							}
							else {
                                console.log('ENTRA IF 1266');
								for (var x = 0; x < returnedValue.length; x++) {
                                    var temAf = {};
                                    temAf.Id = returnedValue[x].Id;
                                    temAf.Affiliate__c = returnedValue[x].Affiliate__c;
                                    temAf.Affiliate__r = returnedValue[x].Affiliate__r;
                                    temAf.Product__c = returnedValue[x].Affiliate__r.Product__c;
                                    temAf.ProductCode = producto.ProductCode; //REQ: 6452
                                    temAf.StationId__c = returnedValue[x].StationId__c;
                                    temAf.Reference__c = "(" + producto.ProductCode + ") " + producto.Name;
                                    if(returnedValue[x].Grouper__r!=undefined && returnedValue[x].Grouper__r!= null)
                                        temAf.Grouper__c = returnedValue[x].Grouper__r.Name;
									//temAf.ProductCode = producto.ProductCode;// Producto 43
                                    establecimientos.push(temAf);
								}
							}
                        }    
						console.log('getEstablecimientoss: '+ JSON.parse(JSON.stringify(establecimientos)));
						component.set("v.establecimientos", establecimientos);
					} else {
						alert("Error");
					}
                    
                   
				})
				$A.enqueueAction(action);
			} else {
				alert("Error");
			}
		})
		$A.enqueueAction(action);
	},
	//---------------------------------------------
	//Validar si es necesario comparar RT de la Opp
	isProductFleet: function (component, event) {
		var contrato = component.get("v.dataSource");
		
        console.log("NVH--> contrato: ", JSON.stringify(contrato,null,2));
		console.log("NVH--> typeof contrato.Product2__c.ProductCode: ", typeof contrato.Product2__c.ProductCode);
		
		return contrato.Product2__c.ProductCode == '33';
	},
	isProductEcovale: function (component, event) {
		var contrato = component.get("v.dataSource");
		
        console.log("CB--> contrato: ", JSON.stringify(contrato,null,2));
		console.log("CB--> typeof contrato.Product2__c.ProductCode: ", typeof contrato.Product2__c.ProductCode);
		
		return contrato.Product2__c.ProductCode == '60-t';
	},
    
    //NTT-Alta clientes 43
    
    isProduct43: function (component, event) {
		var contrato = component.get("v.dataSource");
		
        console.log("CB--> contrato: ", JSON.stringify(contrato,null,2));
		console.log("CB--> typeof contrato.Product2__c.ProductCode: ", typeof contrato.Product2__c.ProductCode);
		
		return contrato.Product2__c.ProductCode == '43';
	},
    
    isProductCon43: function (contrato) {
        
        console.log("CB--> contrato: ", JSON.stringify(contrato,null,2));
		console.log("CB--> typeof contrato.Product2__c.ProductCode: ", typeof contrato.Product2__c.ProductCode);
		
		return contrato.Product2__c.ProductCode == '43';
	},
    
    //NTT-Alta clientes 43

	getProductId: function (component, event) {
		var contrato = component.get("v.dataSource");
		
        console.log("CB--> contrato: ", JSON.stringify(contrato,null,2));
		console.log("CB--> Product2__c.IDInterno__c ", contrato.QuoteLineItem.Product2.IDInterno__c);
		
		return Number(contrato.QuoteLineItem.Product2.IDInterno__c);
	},

	//NVH--- product 33 to mercedes--------
	convertDate: function(dateInput, toDateTime, hasTime, zeroHour) {
		let fechaOriginal;
		const OFFSET_SIGN = hasTime ? -1 : 1;
		const HORAS_OFFSET = new Date().getTimezoneOffset() * 60000 * OFFSET_SIGN;

		if (dateInput instanceof Date) {
			console.log("is Date");
			fechaOriginal = dateInput;
		} else if (typeof dateInput === 'string') {
			console.log("is string");
			fechaOriginal = new Date(dateInput);
		} else {
			console.log("Invalid input");
			return null; // Retorna null si el input no es válido
		}
		// Restar (+/-) cantidad (milisegundos) de horas segun timeZone a la fecha original
		fechaOriginal.setTime(fechaOriginal.getTime() + HORAS_OFFSET);

		if (toDateTime) {
			const year = fechaOriginal.getUTCFullYear();
			const month = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2);
			const day = ("0" + fechaOriginal.getUTCDate()).slice(-2);
			/*const hours = ("0" + fechaOriginal.getUTCHours()).slice(-2);
			const minutes = ("0" + fechaOriginal.getUTCMinutes()).slice(-2);
			const seconds = ("0" + fechaOriginal.getUTCSeconds()).slice(-2);

			const nuevaFecha = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;//*/
			const nuevaFecha = zeroHour ? `${year}-${month}-${day}T00:00:00Z` : `${year}-${month}-${day}T23:59:00Z`;
			return nuevaFecha;
		} else {
			const year = fechaOriginal.getUTCFullYear();
			const month = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2);
			const day = ("0" + fechaOriginal.getUTCDate()).slice(-2);

			const nuevaFecha = `${year}-${month}-${day}`;
			return nuevaFecha;
		}
	},
	
	buildRequetBodyMercedes: function(component) {
		let wrapper = {};
		let contrato = component.get("v.dataSource");
		let filial = component.get("v.filialesSource");
		let extras = component.get("v.subcuentasAdicionales");

		var updateMethod = component.get("v.updateClientMercedesAvailable");
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; //renegociacion -> 2 / alta -> 1
		window.mercedesClientReference = contrato.Contrato2__c.GLB_Ref_Cli_Mercedes__c ? JSON.parse(contrato.Contrato2__c.GLB_Ref_Cli_Mercedes__c) : window.mercedesClientReference;
		let entityCode;
		
		entityCode = contrato.Contrato2__c.CodigoAS400__c ? contrato.Contrato2__c.CodigoAS400__c.split('-') : contrato.Contrato2__c.CodigoAS400_Con2_Ori__c.split('-');
		entityCode.pop(); 
		wrapper.entityCode = entityCode.join('-');

		if(actionMethod != 2) {
			if(!updateMethod){
				wrapper.commercialName = contrato.Account.Name; //contrato.EntidadLegal ?contrato.EntidadLegal.RazonSocial__c:'';
				wrapper.businessName = contrato.EntidadLegal ? contrato.EntidadLegal.RazonSocial__c : ''; //contrato.Account.Name;
				wrapper.partnerId = 1; //Edenred
				wrapper.countryId = 484; //Mexico
				wrapper.businessUnitId = this.getBusinessUnitId(component, contrato.Product2__c.ProductCode); //2; // Req mercedes
				wrapper.fiscalKeyId = 1;
				wrapper.fiscalKeyValue = contrato.EntidadLegal.RFC__c;
				wrapper.fiscalRegimenId = parseInt(contrato.EntidadLegal.Regimen_Fiscal__c);
				wrapper.fiscalPersonId = contrato.EntidadLegal.RecordType === 'Persona Física' ? 1 : 2; //1-fisica  2-moral
				wrapper.economicSectorId = contrato.Account.Sector__c === 'Privado' ? 2 : contrato.Account.Sector__c === 'Público' ? 1 : 0; //1-Public 2-Privado;
				wrapper.economicActivityId = contrato.EntidadLegal.Giro__c;
				wrapper.externalReferences = this.buildExternalReference(component, contrato, true);
			}

			wrapper.addresses = this.buildAddresses2Mercedes(component, contrato);
			wrapper.banks = this.buildBanks2Mercedes(component, contrato);// Renegociacion Cliente no inserta ni modifica datos de cuenta.
			wrapper.corporations = !updateMethod ? this.buildCoorporativo(component, contrato) : [];
			wrapper.contacts = this.buildClientsMercedes(component, contrato);
			wrapper.billingEntities = this.buildBillEntities2Mercedes(component, contrato);// fiscal-deliverAddressCode debe existir del alta.
			wrapper.agreements = this.buildAgreements2Mercedes(component, contrato);
			wrapper.agreementConditions = this.buildAgreementsConditions2Mercedes(component, contrato);
			wrapper.agreementBillings = this.buildAgreementBillings2Mercedes(component, contrato);
			wrapper.agreementSteppedTables = [];
			wrapper.agreementBillingCharges = this.buildAgreementBillingsCharges2Mercedes(component, contrato);
			wrapper.accounts = this.buildSubAccounts2Mercedes(component, contrato, filial, extras);

			window.mercedesClientReference.banks =  wrapper.banks;
			window.mercedesClientReference.contacts = wrapper.contacts;
			window.mercedesClientReference.addresses = wrapper.addresses;
			window.mercedesClientReference.agreements = wrapper.agreements;
			window.mercedesClientReference.agreementBillings = wrapper.agreementBillings;
			window.mercedesClientReference.deliverySectors = wrapper.accounts[0] ? wrapper.accounts[0].deliverySectors : []; 
			if(updateMethod)delete wrapper.banks;
		} else {
			wrapper.agreementBillingCharges = this.buildAgreementBillingsCharges2Mercedes(component, contrato);
			// contrato.Contrato2__c.GLB_TratTransacPendientes__c -> se agregan items a Accounts (Renegociacion + Fleet)
			var rt = contrato.Opportunity.RecordType.DeveloperName;
			if(
				this.isProductFleet(component) && rt == 'RT_Renegotiation' &&
				contrato.Contrato2__c.GLB_TratTransacPendientes__c != null && contrato.Contrato2__c.GLB_TratTransacPendientes__c != undefined
			) {
				wrapper.accounts = this.buildSubAccounts2MercedesOnlyProductsStruct(component, contrato, filial, extras); // only Products(items 31 or 30).
			}
		}
		console.log('SR-mercedesClientReference: ', JSON.stringify(window.mercedesClientReference));
		console.log('wrapper ', wrapper);
		return wrapper;
	},

	getBusinessUnitId: function(component, productCode) {
		if(productCode == '33' || this.isProduct43(component)) {
			return 2;
		} else if (productCode == '60-t') {
			return 3;
		}
	},

	//-------buildexternalReferences
	buildExternalReference: function(component, contrato, isRoot, extra) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		console.log("SR - buildExternalReference-methodOperation -> ", updateMethod);

		let externalReferences = [];
		let externalObj = {};
		let extObjValue;
		extObjValue = isRoot ? contrato.Account.Id : extra.Id;

		externalObj = {
			externalId: 1,
			value: extObjValue
		};	
		if(updateMethod) {
			externalObj.action = actionMethod;
		}

		externalReferences.push(externalObj);
		// if(isRoot) {
		// 	// externalObj = {
		// 	// 	externalId: 1,
		// 	// 	value: contrato.Account.Id
		// 	// };
		// 	extObjValue = contrato.Account.Id;
		// } else {
		// 	//for (let extra of arrExtras) {
		// 	// externalObj = {
		// 	// 		externalId: 1,
		// 	// 		value: extra.Id
		// 	// };
		// 	//}
		// 	extObjValue = extra.Id;
		// }
		
		return externalReferences;
	},
	////-----------Contacto de facturacion-------------------------------
	makeFictionalContact: function(component, contrato, contacto) {
		window.billContactId = this.generateRandomString();
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		
		let contactCopy = Object.assign({}, contacto);
		contactCopy.contactCode = window.billContactId;
		contactCopy.email = contrato.Contrato2__c.CorreoRecibeFactura__c; //Veo que ventaNueva != Renegociacion.
		contactCopy.contactRoles= [{
			contactRoleId: 3 // Rol de Facturación
		}];

		if(updateMethod){
			contactCopy.action = 1;
			contactCopy.contactRoles[0].action = 1;
		}
		
		window.contactosIds.push(window.billContactId);
		console.log("DSR- contactCopy ->", contactCopy);

		return contactCopy;
	},

	////-----------Contacto de facturacion #2 (p60-Ecovale)-------------------------------
	makeFictionalContact2: function(component, contrato, contacto) {
		window.billContactIdN2 = this.generateRandomString();
		let contactN2;
		
		contactN2 = Object.assign({},contacto);
		contactN2.contactCode = window.billContactIdN2;
		contactN2.email = contrato.Contrato2__c.Otros_correos__c; //Veo que ventaNueva != Renegociacion.
		
		window.contactosIds.push(window.billContactIdN2);
		console.log('DSR-contactN2: ', contactN2);
		return contactN2;
	},	

	//---Contactos relacionados contacts Mercedes----
	buildClientsMercedes: function(component, contrato) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildClientsMercedes-methodOperation -> ", updateMethod);
		let refClientContacts = window.mercedesClientReference;

		let adminPlatform;
		let adminPlatform2Mercedes;
		let repsLegales = contrato.RepresentantesLegales;
		let contactos = [];
		const catalogGender = {
			'Masculino': 1,
			'Femenino': 2
		};
		const catalogSalutation = {
			'Sr.': 1,
			'Sra.': 2,
			'Mr.': 3,
			'Mrs.': 4,
			'Dr.': 5,
			'Ms.': 6,
			'Sir': 7,
			'Miss': 8
		};
		const catalogRole = {
			'ADMINISTRADOR DE PLATAFORMA': 1,
			'REPRESENTANTE LEGAL': 2,
			'FACTURACION': 3,
			'REEMBOLSO': 4,
			'RECLAMO': 5,
			'PERSONA FISCAL': 6
		  };
		window.contactosIds = [];
		window.firstRepLegal = {};
		window.billContactId;
		window.billContactIdN2;
		
		if(!updateMethod){
			adminPlatform = contrato.Opportunity.Contacto__r;
			adminPlatform2Mercedes = { //No se debe enviar en update (solo se especifica rep legal.)
				contactCode: adminPlatform.Id,
				contactTitleId: catalogGender[adminPlatform.Gender__c] || 1,//ANTES -- catalogSalutation[adminPlatform.Salutation] || 1,
				name: adminPlatform.FirstName,
				lastName: adminPlatform.LastName,
				email: adminPlatform.Email,
				phone: adminPlatform.Phone,
				cellPhone: adminPlatform.MobilePhone ? adminPlatform.MobilePhone : '999-999-9999',
				contactRoles: [{
					contactRoleId: 1//catalogRole[(adminPlatform.Funcion__c).toUpperCase()] || 0,
				}]
			};
		
			window.contactosIds.push(adminPlatform.Id);
			contactos.push(adminPlatform2Mercedes);
		}
		

		let cont = 0;
		let billContact = {};
		let billContactN2 = {};
		for (var representante of repsLegales) {
			if(adminPlatform && adminPlatform.Id === representante.Id) {
				let newContactRole = {
					contactRoleId: catalogRole[(representante.Funcion__c).toUpperCase()] || 0
				};
				adminPlatform2Mercedes.contactRoles.push(newContactRole);

				if(cont == 0){
					window.firstRepLegal = adminPlatform2Mercedes;
					billContact = this.makeFictionalContact(component, contrato, adminPlatform2Mercedes);
				}
			}
			else {
				let repLegal2Mercedes = {
					contactCode: representante.Id,
					contactTitleId: catalogGender[representante.Gender__c] || 1,//ANTES --catalogSalutation[representante.Salutation] || 0,
					name: representante.FirstName,
					lastName: representante.LastName,
					email: representante.Email,
					phone: representante.Phone,
					cellPhone: representante.MobilePhone ? representante.MobilePhone : '999-999-9999',
					contactRoles: [{
						contactRoleId: catalogRole[(representante.Funcion__c).toUpperCase()] || 0
					}]
				};
				if(cont == 0) {
					window.firstRepLegal = repLegal2Mercedes;
					billContact = this.makeFictionalContact(component, contrato, repLegal2Mercedes); //CorreoRecibeFactura__c -> Veo que ventaNueva != Renegociacion.
				}
				if(updateMethod){
					
					var contactRef = refClientContacts.hasOwnProperty("contacts") ? refClientContacts.contacts.find(cr => cr.contactCode === repLegal2Mercedes.contactCode) : null;
					repLegal2Mercedes.action = contactRef ? 2 : 1;
					console.log("SR-contactRef: ", contactRef);

					var contactRefRole = contactRef ? contactRef.contactRoles.find(crr => crr.contactRoleId === repLegal2Mercedes.contactRoles[0].contactRoleId) : null;
					repLegal2Mercedes.contactRoles[0].action = contactRefRole ? 2 : 1;
					console.log("SR-contactRefRole: ", contactRefRole);
				}
				contactos.push(repLegal2Mercedes);
				window.contactosIds.push(representante.Id);
			}
			cont++;
		}

		contactos.push(billContact);
		
		if(this.isProductEcovale(component) && contrato.Contrato2__c.Otros_correos__c){
			billContactN2 = this.makeFictionalContact2(component, contrato, billContact);
			contactos.push(billContactN2);
		}
		console.log("SR - buildClientsMercedes-contactos -> ", contactos);
		return contactos;				
	},
	//------Addresse para mercedes----------
	buildAddresses2Mercedes: function (component, contrato) {
		// debugger
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildAddresses2Mercedes-methodOperation -> ", updateMethod);
		let refClient = window.mercedesClientReference;

		window.addresses = [];
		window.Alladdresses2Mercedes = [];
		let AllAddressesSelected = contrato.AllAddressesSelected;
		let ficalDirId = contrato.Contrato2__c.FiscalAddress__c;
		let newAddress = {addressCode: ficalDirId};
		 
		window.addresses.push(newAddress); 
		//--------Dirección Fiscal-------------
		let addressesFiscal = contrato.FiscalAddress.map(address => ({
			addressCode: address.Id,
			addressName: address.Name,
			street: address.Calle_Tt__c,
			streetOptional: '',
			countryId: 484,
			//postalCodeId: address.CodigoPostal_Tt__c,// ANTES -->0,
			addressTypeId: ficalDirId === address.Id ? 1 : 2,
			streetInternalNumber: address.NumeroInterior_Tt__c,
			streetExternalNumber:  address.NumeroExterior_Tt__c,
			isPostalCodeIdUsed: false,
			postalCodeId:0,
			isZipCodeUsed: true,
			zipCode:address.CodigoPostal_Tt__c,
			zipReference: address.Colonia_Tt__c ? (address.Colonia_Tt__c).toUpperCase() : "",
			addressTypes:[{addressTypeId: ficalDirId === address.Id ? 1 : 2}]
		}))[0];
        console.log("addresses-->2.1 ");
		let addressesMercedes = [];
		addressesMercedes.push(addressesFiscal);
		console.log("addresses-->2 ");
		//--------Dirección de entrega-------------
		AllAddressesSelected.forEach(function(address) {

			if(ficalDirId === address.DireccionID__r.Id) {
				let addressTypes = addressesFiscal.addressTypes;
				addressTypes.push({addressTypeId:2});
				addressesFiscal.addressTypes = addressTypes;
			}
			else {
				window.addresses.push({addressCode: address.DireccionID__r.Id}); 
				let dirDelivery = {
					addressCode: address.DireccionID__r.Id,
					addressName: address.DireccionID__r.Name,
					street: address.DireccionID__r.Calle_Tt__c,
					streetOptional: '',
					countryId: 484,
					//postalCodeId: address.DireccionID__r.CodigoPostal_Tt__c,// ANTES -->0,
					addressTypeId: ficalDirId === address.DireccionID__r.Id?1:2,
					streetInternalNumber: address.DireccionID__r.NumeroInterior_Tt__c,
					streetExternalNumber:  address.DireccionID__r.NumeroExterior_Tt__c,
					isPostalCodeIdUsed: false,
					postalCodeId:0,
					isZipCodeUsed: true,
					zipCode:address.DireccionID__r.CodigoPostal_Tt__c,
					zipReference: address.DireccionID__r.Colonia_Tt__c?(address.DireccionID__r.Colonia_Tt__c).toUpperCase():"",
					addressTypes:[{addressTypeId:ficalDirId === address.DireccionID__r.Id?1:2}]
				  }
				  addressesMercedes.push(dirDelivery);
			}
		});

		console.log("addresses--> ", window.addresses);

		if(updateMethod) { //aplico action si existen direcciones en mercedesRefClient
			// let addressRef = window.addresses.find((wAdd, i) => {
			// 	var foundAddRef = refClient.addresses.find(addRef => addRef.addressCode === wAdd.addressCode);
			// 	window.addresses[i].action = foundAddRef ? 2 : 1;
			// 	return true;
			// });
			// console.log("SR-addressRef: ", addressRef);
			window.addresses.forEach((add => add.action = 1));

			if(refClient.hasOwnProperty("addresses")){
				let addressRef = addressesMercedes.find((wAdd, i) => {
					console.log("SR-addressRef2: ", refClient);
					var foundAddRef = refClient.addresses.find(addRef => addRef.addressCode === wAdd.addressCode);
					addressesMercedes[i].action = foundAddRef ? 2 : 1;
					return true;
				});
				console.log("SR-addressRef2: ", addressRef);
			}
		}

		// let addressesMercedes = AllAddressesSelected.map(address => ({
		// 	addressCode: address.DireccionID__r.Id,
		// 	addressName: address.DireccionID__r.Name,
		// 	street: address.DireccionID__r.Calle_Tt__c,
		// 	streetOptional: '',
		// 	countryId: 484,
		// 	//postalCodeId: address.DireccionID__r.CodigoPostal_Tt__c,// ANTES -->0,
		// 	//addressTypeId: ficalDirId === address.DireccionID__r.Id?1:2,
		// 	streetInternalNumber: address.DireccionID__r.NumeroInterior_Tt__c,
		// 	streetExternalNumber:  address.DireccionID__r.NumeroExterior_Tt__c,
		// 	isPostalCodeIdUsed: false,
		// 	postalCodeId:0,
		// 	isZipCodeUsed: true,
		// 	zipCode:address.DireccionID__r.CodigoPostal_Tt__c,
		// 	zipReference: address.DireccionID__r.Colonia_Tt__c,
		// 	addressTypes:[{addressTypeId:ficalDirId === address.DireccionID__r.Id?1:2}]
		//   })
		// );
		// addressesMercedes = addressesMercedes.concat(addressesFiscal);
		
		window.Alladdresses2Mercedes = addressesMercedes;
		
		return (updateMethod) ? [] : addressesMercedes;
	},
	generateBankId : function (contrato) {
		let labelPago = "";
		const bankCatalog = {
			"STP":1,
			"BANORTE":2,
			"BANAMEX":3,
			"HSBC":4,
			"BBVA BANCOMER":5,
			"BMULTIVA":6,
			"SCOTIABANK":7,
			"SANTANDER":8,
		}
		if(contrato && contrato.QuoteLineItem) {
			if(contrato.QuoteLineItem.FormaPago__c === 'TransferenciaElectronica') {
				labelPago = contrato.QuoteLineItem.OpcionesMetodoPago__c;
			}else{
				labelPago = contrato.QuoteLineItem.FormaPago__c;

			}
		}
		return {
			bankId:bankCatalog[labelPago.toUpperCase()] !== undefined ? bankCatalog[labelPago.toUpperCase()] : 1,
			labelPago:labelPago
		}

	},
	generateRandomString: function() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';

        for (var i = 0; i < 20; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    },
	//-------Bancos Mercedes-------
	buildBanks2Mercedes : function(component, contrato) {
		const responseBank = this.generateBankId(contrato);
		const bankId = responseBank.bankId;
		const labelPago = responseBank.labelPago;
		let bankAccountCode;
		
		var updateMethod = component.get("v.updateClientMercedesAvailable");
		if(updateMethod && window.mercedesClientReference && window.mercedesClientReference.banks){
			bankAccountCode = window.mercedesClientReference.banks[0].bankAccountCode;
		}else {
			bankAccountCode = this.generateRandomString();
		}
		console.log('SR-banks -> bankAccountCode ->', bankAccountCode);

		window.bankAccountCode = bankAccountCode;
		let banks = [{
			bankAccountCode: bankAccountCode,// ANTES --> contrato.Contrato2__c.Id + '-'+bankId, //Generar Id
			bankId:bankId,
			bankAccountTypeId:1, // De acuerdo a sesiones, se manda valor 0, pero el catalogo no soporta el valo. Se agrega al catalogo o se cambia el valor enviado?
			countryId: 484, //Este campo no se manejaba en archivo "fogoncito"
			currencyId:1,
			bankAccountName:labelPago, 
			bankAccountNumber:"",
			clabeNumber:""
		}];

		return banks;
	},
	
	//--------BillEntities Mercedes-----------
	buildBillEntities2Mercedes : function(component, contrato) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildBillEntities2Mercedes-methodOperation -> ", updateMethod);

		let billingEntities = [{
			billingEntityCode: contrato.Contrato2__c.Id + '-' + contrato.EntidadLegal.Id, 
			billingEntityName: contrato.EntidadLegal.RazonSocial__c,
			bankAccountCode: window.bankAccountCode, //this.generateRandomString(),//update -> window.mercedesClientReference
			deliveryAddressCode: contrato.Contrato2__c.FiscalAddress__c, 
			fiscalAddressCode: contrato.Contrato2__c.FiscalAddress__c,
			billingComplementaryText:"",
			billingEntityContacts: [{
				contactCode: window.billContactId//contactCode: window.firstRepLegal.contactCode  //contrato.Contrato2__c.CorreoRecibeFactura__c//"2" // Pendiente para validar con negocio 
			}]
		}];
		
		if(updateMethod) {
			billingEntities[0].action = 1;
			if(billingEntities[0].billingEntityContacts) {
				billingEntities[0].billingEntityContacts[0].action = 1;
			}
		}
		
		let ExtraBillingEntityContact;
		if(window.billContactIdN2) {
			ExtraBillingEntityContact = Object.assign({},billingEntities[0].billingEntityContacts[0]);
			ExtraBillingEntityContact.contactCode = window.billContactIdN2;
			billingEntities[0].billingEntityContacts.push(ExtraBillingEntityContact);
		}
		return billingEntities;
	},
	//--------Agreements Mercedes-----------
	buildAgreements2Mercedes : function(component, contrato) {
		const infinityDate = new Date('2099-12-31');
		let dateT = contrato.Contrato2__c.FechaFinADC__c;

		console.log(dateT);
		console.log(typeof dateT);
		console.log(this.convertDate(contrato.Contrato2__c.FechaFinADC__c));
		let warrantyType = contrato.QuoteLineItem.WarrantyType__c;
		let warrantyTypeCode = this.getValueCatalogWarrantyType(warrantyType);
		let warrantyEndDate = contrato.QuoteLineItem.GLB_FechaFinGarantia__c ? contrato.QuoteLineItem.GLB_FechaFinGarantia__c : infinityDate;
		let warrantyValue = contrato.QuoteLineItem.WarrantyValue__c;
		let analistaCobCode = contrato.Contrato2__c.GLB_CodAnalistaCobranza__c ? contrato.Contrato2__c.GLB_CodAnalistaCobranza__c : "DEFAULT";
		console.log('SR-PP-warranty value->', warrantyType);
		console.log('SR-PP-value catalog tipo garantia->', warrantyTypeCode);
		console.log('SR-PP-warranty endDate->', warrantyEndDate);
		console.log('SR-PP-warrantyValue->', warrantyValue);
		console.log('SR-PP-analistaCobCode->', analistaCobCode);

		let tipoPago = '';
		if(this.isProductFleet(component) || this.isProduct43(component)) {
			tipoPago = contrato.Contrato2__c.TipoPago__c === 'Prepago' ? 1 : (contrato.Contrato2__c.TipoPago__c === 'Pospago' ? 2 : 0);
		} else if(this.isProductEcovale(component)) {
			//tipoPago: Mapeo a service_plan_id (0: Otros 1: Prepago 2: Pospago)
			tipoPago = contrato.QuoteLineItem.PaymentMethod__c === 'Prepago' ? 1 : 0;
		}
		
		let agreements = [];
		let agreement = {
			agreementCode: contrato.Contrato2__c.Id,
			entityTypeId: 1, 
			warrantyTypeId: tipoPago === 2 ? warrantyTypeCode : 0, //Pospago=>warrantyTypeCatalog,
			warrantyValue:tipoPago === 2 && warrantyValue ? warrantyValue : 0.0, // Si hay garantia, no podemos mandar 0
			warrantyStartDate: this.convertDate(contrato.Contrato2__c.CreatedDate, false, true), // fecha aprobacion de contrato
			warrantyEndDate: this.convertDate(warrantyEndDate), //Pospago + garantia=>fechaFinGarantia
			servicePlanId: tipoPago,
			collectorId: tipoPago === 2 ? this.getValueCatalogCobranzaAnalist(analistaCobCode) : 0, //Pospago=>analista de cobranza
			approverId: 0,
			currencyId: 1,
			creditLimit: tipoPago === 2 ? contrato.Contrato2__c.GLB_LineaCreditoAsignada__c : 0, // Pospago=>linea de credito?
			agreementNumber: contrato.Contrato2__c.AsignacionContrato__c,
			agreementName: contrato.Contrato2__c.Name,
			agreementDate: this.convertDate(contrato.Contrato2__c.CreatedDate, false, true),
			startDate: this.convertDate(contrato.Contrato2__c.CreatedDate, false, true),
			endDate:  this.convertDate(infinityDate)
		};
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildAgreements2Mercedes-methodOperation -> ", updateMethod);
		if(updateMethod) {
			agreement.action = 1;
		}
		agreements.push(agreement);
		return agreements;
	},

	getValueCatalogCobranzaAnalist : function(key) {
		var res = null;
		if(!key) return res;

		const catalog = {
			"DEFAULT": 0,
			"CARTERA BP": 1,
			"MX ANALISTA100": 2,
			"MX ANALISTA110": 3,
			"MX ANALISTA120": 4,
			"MX ANALISTA130": 5,
			"MX ANALISTA140": 6,
			"MX ANALISTA150": 7,
			"MX ANALISTA160": 8,
			"MX ANALISTA170": 9,
			//"MX ANALISTA180": 10"Juridico",
			"MX ANALISTA190": 10,
			"MX ANALISTA200": 11,
			"MX ANALISTA40": 12,
			"MX ANALISTA50": 13,
			"MX ANALISTA60": 14,
			"MX ANALISTA70": 15,
			"MX ANALISTA80": 16,
			"MX ANALISTA90": 17
		};
		var keyUp =  key.toUpperCase();
		res =  catalog[keyUp];
		console.log('SR-PP catalog value -> ', res);
		return res;
	},

	getValueCatalogWarrantyType : function(key) {
		var res = null;
		if(!key) return res;

		const catalog = {
			"SIN GARANTIA": 0,
			"PAGARE": 1,
			"DEPOSITO EN EFECTIVO": 2,
			"CARTA STAND BY": 3,
			"FIANZA": 4,
			"GARANTIA MIXTA": 5
		};
		var keyUp =  key.toUpperCase();
		res =  catalog[keyUp];
		console.log('SR-PP catalog value -> ', res);
		return res;
	},
	
	//--------Agreements Conditions Mercedes-----------
	buildAgreementsConditions2Mercedes : function(component, contrato) {

		const infinityDate = new Date('2099-12-31');
		let agreementsConditions = [];
		let packageId = contrato.Contrato2__c.Package__c === 'Premium' ? 1 : (contrato.Contrato2__c.Package__c === 'Premium Plus' ? 2 : 0);
		if(this.isProductEcovale(component)) {
			packageId = 3;
        }else if(this.isProduct43(component)){
           	packageId = 4;
        }
		console.log('CB packageId ', packageId);
		let aggCondition = {
			agreementCode: contrato.Contrato2__c.Id,
			agreementConditionCode: contrato.Contrato2__c.Id,// --> ANTES condition.Concepto__r.ClaveReferencia__c|| ("c-generica" + cont++), // // No existe ClaveConcepto__c en ProductoConcepto
			salePlanId: packageId,
			productId: parseInt(contrato.Product2__c.ProductCode), 
			name: contrato.Contrato2__c.Name,// ANTES --> condition.TipoCargo__c,
			currencyId: 1, 
			startDate: this.convertDate(contrato.Contrato2__c.CreatedDate, false, true),//this.convertDate(contrato.Contrato2__c.FechaInicioADC__c),
			endDate:  this.convertDate(infinityDate)//contrato.Contrato2__c.FechaFinADC__c?this.convertDate(contrato.Contrato2__c.FechaFinADC__c): this.convertDate(infinityDate)
		};
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildAgreementsConditions2Mercedes-methodOperation -> ", updateMethod);
		if(updateMethod) {
			aggCondition.action = 1;
		}
		agreementsConditions.push(aggCondition);
		
		return agreementsConditions;
	},

	//--------Agreements Billings Mercedes-----------
	buildAgreementBillings2Mercedes : function(component, contrato) {
		
		let agreementsBillings = [];
		const metodoPagoObjeto = {
			"CHEQUE": 1,
			"TRANSFERENCIA ELECTRONICA": 2,
			"AMEX": 3,
			"TARJETA DE CREDITO": 4,
			"TARJETA DE DEBITO": 5,
			"STP": 6,
			"EFECTIVO": 7,
			"TARJETA DE SERVICIOS": 8,
			"CONDONACION": 9,
			"DEPOSITO BANCARIO": 10,
			"PAGO EN LINEA": 11,
			"CHEQUE CERTIFICADO": 12,
			"CHEQUE NORMAL": 13,
			"FICHA DE DEPOSITO": 14,
			"LINEA BANAMEX": 15,
			"LINEA BANCOMER": 16,
			"LINEA BANORTE": 17,
			"TRANSFERENCIA BANAMEX": 18,
			"TRANSFERENCIA BANCOMER": 19,
			"TRANSFERENCIA HSBC": 20
		};
		const wayPay = contrato.Contrato2__c.WayPay__c;
		// let payConditionId =metodoPagoObjeto[wayPay.toUpperCase()] || 0;
			
		let agrBilling = {
			agreementConditionCode: contrato.Contrato2__c.Id,// ANTES--> condition.Concepto__r.ClaveReferencia__c || ("c-generica" + cont++), // falta la clave de referencia en contratos
			agreementBillingCode: contrato.Contrato2__c.Id + '-' + contrato.EntidadLegal.Id,// ANTES --> condition.Id + '-' + contrato.Contrato2__c.Id, // Id de productoConcepto + Id contrato2__c
			billingEntityCode: contrato.Contrato2__c.Id + '-' + contrato.EntidadLegal.Id,
			paymentMethodId: 6,//se coloca por default STP ANtes --> payConditionId, //ver catálogo: paymentMethodCatalog
			payConditionId: 1, 
			name: "FACTURACION" 
		};
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildAgreementBillings2Mercedes-methodOperation -> ", updateMethod);
		if(updateMethod) {
			agrBilling.action = 1;
		}
		agreementsBillings.push(agrBilling);
		
		return agreementsBillings;
	},
	
	//--------Agreements Billings Charges Mercedes-----------
	chooseFrecuencyBill: function(contrato) {
		const frecuencyCatalogBill = {
			"DIARIO":1,
			"SEMANAL":2,
			"QUINCENAL":3,
			"MENSUAL":4,
			"COBRO ÚNICO":5,
			"POR EVENTO":6,
			"SEMANAL-MENSUAL":7, // Semanal Fraccionado
			"SEMANAL FRACCIONADO":7,
			"ANUAL":8,
			"SEMESTRAL":9
		}
        //-- NTT Alta cliente 43
        
        let frecuency = 0;
        
        if(this.isProductCon43(contrato)){
            frecuency = (contrato.Contrato2__c.NTT_Frecuencia_Consumo_Fee__c).toUpperCase();
        }else{
            frecuency = (contrato.Contrato2__c.FrecuenciaFacturacion__c).toUpperCase();
        }
        
        //-- NTT Alta cliente 43
		

		for (var key in frecuencyCatalogBill) {
			if (frecuency.includes(key)) {
				if(frecuency === "SEMANAL-MENSUAL") {
					return frecuencyCatalogBill["SEMANAL-MENSUAL"];
				}
				if(frecuency === "SEMANAL FRACCIONADO") {
					return frecuencyCatalogBill["SEMANAL FRACCIONADO"];
				}
				return frecuencyCatalogBill[key];
			}
		}
		return 0; // Si no se encuentra ninguna coincidencia, se puede manejar devolviendo null o un valor predeterminado
	},

	chooseFrecuencyApp: function(frecuencyId, charge) {
		const chargeMensual = ["MENSUALIDAD BASICO","MENSUALIDAD AVANZADO","MENSUALIDAD PREMIUM", "MENSUALIDAD PREMIUM PLUS"]
		//Para mensualidad Premium y Premium Plus será enviado el dia de alta de cliente
		if (chargeMensual.includes(charge)) {
			const currentDay = new Date();

			return frecuencyId != 4 ? "" + currentDay.getDate() : "" + this.setCorrectValueFrecuencyCatalog(currentDay.getDate());
		}
		else {
			const frecuencyCatalogDay = {
				1:"0",
				2:"0",
				3:"0",
				4:"1",
				5:"0",
				6:"1"				
			}
			return frecuencyCatalogDay[frecuencyId] || "0";
		}
	},

	normaliceString: function (cadena) {
		var acentos = {
            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',
            'ñ': 'n',
			'Á': 'A',
            'É': 'E',
            'Í': 'I',
            'Ó': 'O',
            'Ú': 'U',
            // Agrega más caracteres si es necesario
        };

        cadena = cadena.replace(/[áéíóúñÁÉÍÓÚ]/gi, function(matched) {
            return acentos[matched];
        });

        return cadena;

	},

	buildAgreementBillingsCharges2Mercedes : function(component, contrato) {
		//debugger;
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		let agreementCodeRef = contrato.Contrato2__c.Id;
		let clientRef = window.mercedesClientReference;
		let actionMethod;
		console.log("SR - buildAgreementBillingsCharges2Mercedes-methodOperation -> ", updateMethod);

		const tipoPago = contrato.Contrato2__c.TipoPago__c === 'Prepago' ? 1 : (contrato.Contrato2__c.TipoPago__c === 'Pospago' ? 2 : 0);
		let terminoDePago = contrato.Contrato2__c.GLB_TerminoDePago__c && tipoPago === 2 ? contrato.Contrato2__c.GLB_TerminoDePago__c : 0;

		const infinityDate = new Date('2099-12-31');
		let prodsConceptos = component.get("v.productosSource");
		console.log("SR-BillingCharges-productosSource ->", JSON.stringify(prodsConceptos));
		let agreementsBillingCharges = [];
		let dataSource = component.get("v.dataSource");
		var opportunityRt = dataSource.Opportunity.RecordType.DeveloperName;
		let rtNotRenegotiation = opportunityRt != "RT_Renegotiation";
		const isProduct60Ecovale = this.isProductEcovale(component);

		const chargeCatalog = {
			"IMPLEMENTACION": 1,
			"MENSUALIDAD BASICO": 2,
			"MENSUALIDAD PREMIUM":2,
			"MENSUALIDAD AVANZADO": 3,
			"MENSUALIDAD PREMIUM PLUS":3,
			"TAG REGULAR": 4,
			"TAG DUAL": 5,
			"TARJETAS VIRTUALES": 6,
			"COMISION POR DEPOSITO": 7,
			"CARGO POR ENVIO DISPOSITIVO": 8,
			"CUENTA ACTIVA": 9,
			"CONSUMO": 10,
			"COMISION POR EL SERVICIO": 7,//Antes valor 11, se cambia a 7 por que mercedes espera recibir el mismo valor de COMISION POR DEPOSITO
			"TARJETAS FISICAS": 12,
			"COMISION PORTAL POR PAGO": 13,
			"PARTICIPACION":14,
			"COBRO POR TRANSFERENCIA":15,
			"CARGO POR ENVIO - RECURRENTE":8,
			"CARGO POR ENVIO ESTANDAR":8,
			"CARGO POR REFACTURACION":16,
			"CUOTA POR ORDENAMIENTO Y/O ENTREGA ESPECIAL":17
		};

		const chargeFrecuencyCatalog = {
			"IMPLEMENTACION": 6,
			"MENSUALIDAD BASICO": 4,
			"MENSUALIDAD AVANZADO": 4,
			"MENSUALIDAD PREMIUM":4,
			"MENSUALIDAD PREMIUM PLUS":4,
			"TAG REGULAR": 6,
			"TAG DUAL": 6,
			"TARJETAS VIRTUALES": 6,
			"COMISION POR DEPOSITO": 6,
			"CARGO POR ENVIO DISPOSITIVO": 6,
			"CUENTA ACTIVA": 4,
			"CONSUMO": 0,
			"COMISION POR EL SERVICIO": 6,
			"TARJETAS FISICAS": 6,
			"COMISION PORTAL POR PAGO": 6,
			"PARTICIPACION":6,
			"COBRO POR TRANSFERENCIA":6,
			"CARGO POR ENVIO - RECURRENTE": 6,
			"CUOTA POR ORDENAMIENTO Y/O ENTREGA ESPECIAL":6,
			"CARGO POR REFACTURACION":6,
			"CARGO POR ENVIO ESTANDAR":6, //NVH --Tarjeta Fisica
			//A partir de aqui se agregan valores para Producto 60 - Ecovale
			"IMPRESION ESPECIAL": 6, //Revisar
			"ORDENAMIENTO Y/O ENTREGA ESPECIAL": 6,//Revisar
			"CUOTA POR RENTA MENSUAL TARJETA FISICA": isProduct60Ecovale ? 4 : 6, //Tarjetas fisicas
			"REFACTURACION": isProduct60Ecovale ? 6 : 4,//Cobro por refacturacion - Modificado
			"CARGO POR ENVIO EXPRESS": isProduct60Ecovale ? 6 : 4,
			"CUOTA POR LITRO MOVE FOR GOOD - 50%": isProduct60Ecovale ? 4 : 6,
			"CUOTA POR LITRO MOVE FOR GOOD - 100%": isProduct60Ecovale ? 4 : 6,
			"IMPLEMENTACION ESPECIAL": 6, //Cobro por Implementación - Revisado
			"TARJETA FISICA": 6//Revisado
		};
        
        const chargeFrecuencyCatalogMc = {
            'RENTA DE PLATAFORMA' : 2001,
            'COBRO POR GESTION DE VEHICULOS' : 2009,
            'COBRO POR GESTION DE VEHICULOS POR EVENTO' : 2013,
            'REFACTURACION' : 2016,
            'SERVICIOS DE MANTENIMIENTO' : 2018,
            'SERVICIOS CORRECTIVOS' : 2019,
            'SERVICIOS PREVENTIVOS' : 2020,
            'SERVICIOS DE LLANTAS' : 2021,
            'SERVICIOS DE VERIFICACION' : 2022,
            'SERVICIOS DE GRUA' : 2023,
            'SERVICIOS DE HOJALATERIA Y PINTURA' : 2024,
            'SERVICIOS DE LIMPIEZA DE UNIDADES' : 2025

		};
		
		const metodoFactura = {
			"NO AGRUPADO": 0,
			"Empresa": 1,
			"Por Empresa (Nivel jerarquico)": 1,
			"Cuenta": 2,
			"Por Cuenta": 2,
			"Región": 3, // Grupo 
			"Por Grupo (Nivel jerarquico)": 3,
			"Área": 4,
			"Por Área (Nivel jerarquico)": 4,
			"Centro de Costos": 5,
			"Por Centro de costos": 5,
			"Cargo": 6,
			"Evento": 7,
			"Entidad": 8,
			"Por RFC (Nivel jerarquico)": 8
		};

		const daySelectedCatalog = {
			"Lunes": "Monday",
			"Martes": "Tuesday",
			"Miércoles": "Wednesday",
			"Jueves": "Thursday",
			"Viernes": "Friday",
			"Sábado": "Saturday",
			"Domingo": "Sunday",
			"Ultimo dia del mes": "L",
			"1 y 16": "1,16"
		}
		// DIARIO, SEMANAL, QUINCENAL, MENSUAL, SEMANAL-MENSUAL -> 1,2,3,4,7 Casos particulares
		let chargeFrecuencyId = this.chooseFrecuencyBill(contrato);
		let comoFactura = contrato.Contrato2__c.ComoFactura__c;
		console.log('SR-> ComoFactura__c', comoFactura);
		let separatedGroupingId = metodoFactura[comoFactura] !== undefined ? metodoFactura[comoFactura] : 0;
		console.log('SR-> separatedGroupingId', separatedGroupingId);
		let isPrintedInGroup = false;
		let isSeparatedInGroup = false;
		if(this.isProductFleet(component) && separatedGroupingId !== 0 && separatedGroupingId !== 2) {
			// isPrintedInGroup = true;
			isSeparatedInGroup = true;
		}

		let daySelected;
		console.log('SR-> chargeFrec ->', chargeFrecuencyId);
        console.log('SR-> daySelected ->', daySelected);
		
		// Diff mergeARG
		// if(chargeFrecuencyId === 7) { //Semanal-Mensual
		// 	daySelected = "Monday";
		// } 
		// else if (contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c && (contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c in daySelectedCatalog)) {
		// 	daySelected = daySelectedCatalog[contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c];
		// }
		if(chargeFrecuencyId === 4) { //mensual - respeta el dia seleccionado
			daySelected = (!daySelected && contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c) ? contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c : "28";
			
			let dayNumber = parseInt(daySelected);
			daySelected = dayNumber > 28 ? "28" : daySelected;
		}
		 
		if (contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c && (contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c in daySelectedCatalog)) {
			daySelected = daySelectedCatalog[contrato.Contrato2__c.GLB_Facturacion_dia_Especifico__c];
			if(chargeFrecuencyId === 7) { //Semanal-Mensual / Semanal Fraccionado
				daySelected += ",1";
			}
		} else if(chargeFrecuencyId === 7) { //Semanal-Mensual / Semanal Fraccionado
			daySelected = "Monday,1";
		}

		if(chargeFrecuencyId === 1){
			daySelected = "28";
		}
		if(!daySelected && dataSource.parentContract) {
			let contratoPadre =  dataSource.parentContract[0];
			daySelected = daySelectedCatalog[contratoPadre.Contrato_2__r.GLB_Facturacion_dia_Especifico__c];
		}
		if(!daySelected){
			daySelected = "28";
		}

		/**
		 * CB TODO: Pendiente de definicion por Producto
		 * Si chargeFrecuencyId = 2 (Semanal), el daySelected debe ser un dia de la semana (Lun, Mar, etc)
		 * Desde Salesforce al seleccionar Semanal, no se habilita ningun campo dejando seleccionar dicho dia,
		 * Por ende se debe especificar 1 dia por defecto, de momento se dejara como "Monday"
		 */
		if(chargeFrecuencyId === 2 && isProduct60Ecovale) {
			daySelected = "Monday";
		}
		/**
		 * Si chargeFrecuencyId = 3 (Quincenal), el daySelected deben ser 2 dias entre el 1 y 28(
		 * Desde Salesforce al seleccionar Quincenal, no se habilita ningun campo dejando seleccionar dicho dia,
		 * Por ende se deben especificar 2 dias por defecto, de momento se dejara como "14,28"
		 */
		if(chargeFrecuencyId === 3 && isProduct60Ecovale) {
			daySelected = "14,28";
		}
		if(chargeFrecuencyId === 4 && isProduct60Ecovale) {
			daySelected = "1";
		}
		
		if(updateMethod) {
			actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2;
			console.log('SR- clientRef:', clientRef);
			agreementCodeRef = (clientRef && actionMethod == 2) ? clientRef.agreements[0].agreementCode : agreementCodeRef;
			console.log('SR- clientRefpost');
		}

		for(let prodConcepto of prodsConceptos) {
			let charge = (prodConcepto.Concepto_Tipo_Cargo__c) ? this.normaliceString((prodConcepto.Concepto_Tipo_Cargo__c).toUpperCase()) : '';
            
            //NTT Alta clientes 43
            let chargeFrecuency = 0;
            if(this.isProduct43(component)){
                chargeFrecuency = chargeFrecuencyCatalogMc[charge];
            }else{
            	chargeFrecuency = chargeFrecuencyCatalog[charge];    
            }
            
			
            console.log('chargeFrecuency43 ', chargeFrecuency);
            console.log('charge ', charge);
            
			let frecuencyDayApp = '0';
            
            if(this.isProduct43(component)){
                if(chargeFrecuencyId == 5){
                	//frecuencyDayApp = frecuencyCatalogBillPhantomDay.get(Integer.ValueOf(prodConcepto.NTT_diaEspecifico__c));
            	}else if(chargeFrecuencyId == 4){
                	frecuencyDayApp = 'L';  
            	}else{
                	frecuencyDayApp = this.chooseFrecuencyApp(chargeFrecuency, charge);	
            	}
            }else{
                frecuencyDayApp = this.chooseFrecuencyApp(chargeFrecuency, charge);
            }
            //NTT Alta clientes 43
			
			// let priceToSend = prodConcepto.PrecioLista__c < prodConcepto.PrecioFinal__c ? prodConcepto.PrecioFinal__c : prodConcepto.PrecioLista__c;
			let discountFixed = prodConcepto.Bonificacion__c ? parseFloat(Number(prodConcepto.Bonificacion__c).toFixed(2)) : 0;
			console.log('SR-> Cargo Discount', discountFixed);
			let agBCharge = {
				agreementBillingCode: agreementCodeRef + '-' + contrato.EntidadLegal.Id,// ANTES --> prodConcepto.Id + '-' + contrato.Contrato2__c.Id, // Id de productoConcepto + Id contrato2__c
				chargeId: this.handleChargeCatalog(component, contrato.Product2__c.ProductCode, charge, 'chargeId'),//chargeCatalog[charge] ||  0, 
				billingComplementaryText:"", // nuevo valor de mercedes (al parecer se manda vacio) 
				
                //NTT Alta clientes 43
                //chargeFrecuencyApplicationId: chargeFrecuency,// referente a frecuencia de facturacion
                	chargeFrecuencyApplicationId: this.isProduct43(component) ? chargeFrecuencyId : chargeFrecuency, 
            	//NTT Alta clientes 43
				chargeFrecuencyApplicationDay: frecuencyDayApp,// nuevo valor de mercedes (al parecer igual que chargeFrecuencyDay cuando se seleccione frecuencia con dia exacto)
				chargeFrecuencyId: chargeFrecuencyId,//Contrato2__c.FrecuenciaFacturacion__c : Ver catálogo: chargeFrecuencyCatalog	
				chargeFrecuencyDay: daySelected, // CONSTANTE: 0 //se cambia a string campo agregado por mercedes
				paymentDaysOfWeek: "", //CONSTANTE : ""
				paymentTermDays: terminoDePago, // Prepago -> 0
				isCustomName: false, 
				customName: "", 
				priceTypeId: this.handleChargeCatalog(component, contrato.Product2__c.ProductCode, charge, 'priceTypeId'),//chargeCatalog[charge] === 7 ? 2 : 1,//ANTES -->1, 
				priceTableCode: "", 
                price: this.isProduct43(component) && prodConcepto.Concepto__r.NTT_Usar_Valor_Default__c ? prodConcepto.Concepto__r.NTT_Valor_Default__c : prodConcepto.PrecioLista__c, 
				discountTypeId: prodConcepto.Bonificacion__c && prodConcepto.Bonificacion__c > 0 ? 2 : 0,	
				discountTableCode: "",
				discount: discountFixed,
				discountStartDate: rtNotRenegotiation ? this.convertDate(contrato.Contrato2__c.CreatedDate, true, true, true) : this.convertDate(contrato.Contrato2__c.CreatedDate, true, true), // (dateInput, toDateTime, hasTime, zeroHour)
				discountEndDate: prodConcepto.VigenciaDescuento__c ? this.convertDate(prodConcepto.VigenciaDescuento__c, true): this.convertDate(infinityDate, true),
				isSeparatedInInvoice: contrato.Contrato2__c.Tipo_de_Facturacion__c !== undefined && contrato.Contrato2__c.Tipo_de_Facturacion__c=== 'Separada',//false, //contrato.Contrato2__c.Tipo_de_Facturacion__c,
				isSeparatedInGroup: isSeparatedInGroup, 
				separatedGroupingId: separatedGroupingId,
				isPrintedInGroup: isPrintedInGroup, 
				printedGroupingId: 0, 
				isReplicatedInBillingGroup: false 
			};
            
            console.log('===agBCharge ' , agBCharge);
            
			if(tipoPago === 2 && agBCharge.chargeId == 7) {
				agBCharge.chargeId = 33;
			}
			if(updateMethod) {
				agBCharge.action = actionMethod;
			}
			console.log('SR-> Cargo', agBCharge);
			agreementsBillingCharges.push(agBCharge);
		}

		var zeroInterest = "0";
		var hasInteresesMoratorios = (contrato.Contrato2__c.GLB_CobroInteresesMoratorios__c && contrato.Contrato2__c.GLB_CobroInteresesMoratorios__c != zeroInterest);
		
		if(tipoPago === 2 && (this.isProduct43(component) || this.isProductFleet(component)) && hasInteresesMoratorios ) { //Pospago Fleet with Interest > 0
			let interesesMoratoriosCharga = this.buildInteresesMoratoriosCharges(component, contrato, agreementsBillingCharges[0]);
			interesesMoratoriosCharga.paymentTermDays = terminoDePago;
			if(updateMethod) {
				interesesMoratoriosCharga.action = actionMethod;
			}
			agreementsBillingCharges.push(interesesMoratoriosCharga);
		}
		return agreementsBillingCharges;
	},

	buildInteresesMoratoriosCharges : function(component, contrato, billingChargeConcept) {
		const infinityDate = new Date('2099-12-31');
		let interesMoratorioValue = this.getValueCatalogInteresesMoratorios(contrato.Contrato2__c.GLB_CobroInteresesMoratorios__c);
		// let chargeIdCode = interesMoratorioValue == 0.0 ? 31 : 32;
		// let chargeFrecuency = 6;
		// let frecuencyDayApp = "1";

		let agBCharge = {
			agreementBillingCode: billingChargeConcept.agreementBillingCode,									// en base a Contrat2->igual entre cargos
			chargeId: 32, 
			billingComplementaryText:"",
			chargeFrecuencyApplicationId: billingChargeConcept.chargeFrecuencyApplicationId,//chargeFrecuency	/ en base a Contrat2->igual entre cargos
			chargeFrecuencyApplicationDay: billingChargeConcept.chargeFrecuencyApplicationDay, //frecuencyDayApp/ en base a Contrat2->igual entre cargos
			chargeFrecuencyId: billingChargeConcept.chargeFrecuencyId,//chargeFrecuencyId						/ en base a Contrat2->igual entre cargos
			chargeFrecuencyDay: billingChargeConcept.chargeFrecuencyDay, // daySelected							/ en base a Contrat2->igual entre cargos
			paymentDaysOfWeek: "", //CONSTANTE : ""
			paymentTermDays: 0, 
			isCustomName: false, 
			customName: "", 
			priceTypeId: 2,//Porcentual
			priceTableCode: "", 
			price: interesMoratorioValue, // 3% -> 0.03
			discountTypeId: 0,	
			discountTableCode: "0",
			discount: 0.0,
			discountStartDate: billingChargeConcept.discountStartDate, 											// en base a Contrat2->igual entre cargos
			discountEndDate: this.convertDate(infinityDate, true), //validar discount end date para int moratorios
			isSeparatedInInvoice: billingChargeConcept.isSeparatedInInvoice, 									// en base a Contrat2->igual entre cargos
			isSeparatedInGroup: false, 
			separatedGroupingId: 0, // SE MANTIENE COMO LOS OTROS CARGOS O 0?
			isPrintedInGroup: false, 
			printedGroupingId: 0, 
			isReplicatedInBillingGroup: false 
		};
		console.log('SR-PP-> Cargo', agBCharge);
		return agBCharge;
	},

	getValueCatalogInteresesMoratorios : function(key) { //GLB_CobroInteresesMoratorios__c
		var res = null;
		if(!key) return res;

		const catalog = {
			"0": 0,
			"TIIE 28 + 2%": 2,
			"TIIE 28 + 3%": 3,
			"TIIE 28 + 5%": 5
		};
		// var keyUp =  key.toUpperCase();
		res =  catalog[key];
		console.log('SR-PP catalog value -> ', res);
		return res;
	},

	setCorrectValueFrecuencyCatalog : function(value) {
		var res = null;
		if(!value) return res;

		let valueInt = parseInt(value);
		res = valueInt > 28 ? "L" : value;
		console.log('SR- setCorrectValueFrecuencyCatalog ->', res);
		return res;
	},

	handleChargeCatalog : function(component, productCode, charge, type) {
		//Conceptos de producto 60 Ecovale
		const chargeCatalogEcovale = {
			"IMPLEMENTACION ESPECIAL": 1001, //Cobro por Implementación						
			//1001	Implementación => Implementación Especial
			"CARGO POR ENVIO - RECURRENTE": 1008, //Cargo por Envio
			//1008	Cargo por envío => Cargo por envío - Recurrente
			"CUOTA POR RENTA MENSUAL TARJETA FISICA": 1009, //Segun Harry equivale a Cuenta Activa?
			//1009	Cuenta Activa => Cuota por renta mensual Tarjeta Física
			"COMISION POR EL SERVICIO": 1011,
			//1011	Comisión por Servicio => Comisión por el servicio,	
			"TARJETA FISICA": 1012, //Tarjetas fisicas
			//1012	Tarjetas Físicas => Tarjeta Física
			"REFACTURACION": 1016, //Cobro por refacturacion
			//1016	Cargo por Refacturación => Refacturación
			"CARGO POR ENVIO EXPRESS": 1035,
			//1035	Cargo por envío express => Cargo por Envío Express
			"CUOTA POR LITRO MOVE FOR GOOD - 50%": 1036,
			//1036	Cuota por litro Move for good 50% => Cuota por litro Move for Good - 50%
			"CUOTA POR LITRO MOVE FOR GOOD - 100%": 1037,
			//1037	Cuota por litro Move for good 100% => Cuota por litro Move for Good - 100%
			"ORDENAMIENTO Y/O ENTREGA ESPECIAL": 1039,//Cuota por ordenamiento y/o entrega especial
			//"COMISION POR EL SERVICIO": 1039,//Estaba antes
			"IMPRESION ESPECIAL": 1041, //Impresión de Logo 
		}

		const chargeCatalog = {
			"IMPLEMENTACION": 1,
			"MENSUALIDAD BASICO": 2,
			"MENSUALIDAD PREMIUM":2,
			"MENSUALIDAD AVANZADO": 3,
			"MENSUALIDAD PREMIUM PLUS":3,
			"TAG REGULAR": 4,
			"TAG DUAL": 5,
			"TARJETAS VIRTUALES": 6,
			"COMISION POR DEPOSITO": 7,
			"CARGO POR ENVIO DISPOSITIVO": 8,
			"CUENTA ACTIVA": 9,
			"CONSUMO": 10,
			"COMISION POR EL SERVICIO": 7,//Antes valor 11, se cambia a 7 por que mercedes espera recibir el mismo valor de COMISION POR DEPOSITO
			"TARJETAS FISICAS": 12,
			"COMISION PORTAL POR PAGO": 13,
			"PARTICIPACION":14,
			"COBRO POR TRANSFERENCIA":15,
			"CARGO POR ENVIO - RECURRENTE":8,
			"CARGO POR ENVIO ESTANDAR":8,
			"CARGO POR REFACTURACION":16,
			"CUOTA POR ORDENAMIENTO Y/O ENTREGA ESPECIAL":17
		};
        
        //NTT Alta clientes 43
        const chargeCatalog43 = {
            'RENTA DE PLATAFORMA' : 2001,
            'COBRO POR GESTION DE VEHICULOS' : 2009,
            'COBRO POR GESTION DE VEHICULOS POR EVENTO' : 2013,
            'REFACTURACION' : 2016,
            'SERVICIOS DE MANTENIMIENTO' : 2018,
            'SERVICIOS CORRECTIVOS' : 2019,
            'SERVICIOS PREVENTIVOS' : 2020,
            'SERVICIOS DE LLANTAS' : 2021,
            'SERVICIOS DE VERIFICACION' : 2022,
            'SERVICIOS DE GRUA' : 2023,
            'SERVICIOS DE HOJALATERIA Y PINTURA' : 2024,
            'SERVICIOS DE LIMPIEZA DE UNIDADES' : 2025

		}; 
        //NTT Alta clientes 43

		if(type == 'chargeId') {
			if(productCode == '33') {
				return chargeCatalog[charge];
			} else if(productCode == '60-t') {
				return chargeCatalogEcovale[charge];
			}else if(this.isProduct43(component)){
				return chargeCatalog43[charge];
			}
		}else if(type == 'priceTypeId') {
			if(chargeCatalog[charge] === 7) {
				return 2;
			} else {
				return 1;
			}
		}
	},
	//--------LAS subcuentas se deben extraer de extras/filiales a Mercedes------------
	buildSubAccounts2Mercedes: function(component, contrato, filial, extras) {

		let updateMethod = component.get("v.updateClientMercedesAvailable");
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		console.log("SR-actionMethod -> ", actionMethod);
		const segmentTypeCatalog = {
			"NO ASIGNADO": 0,
			"SMALL": 1,
			"MEDIUM": 2,
			"LARGE": 3,
			"KEY": 4
		};
		let segment = this.normaliceString((contrato.Account.Text_Segment__c).toUpperCase());
		
		let segmentId = Object.keys(segmentTypeCatalog).find(key => segment.includes(key));
		segmentId = segmentTypeCatalog[segmentId] || 0;
		let adminPlatform = contrato.Opportunity.Contacto__r; 
	
		// Convertir el objeto Proxy a una cadena JSON
		var jsonStringFiliales = JSON.stringify(filial);
		var jsonStringExtras = JSON.stringify(extras);

		// Convertir la cadena JSON a un objeto
		var objFiliales = JSON.parse(jsonStringFiliales);
		var objExtras = JSON.parse(jsonStringExtras);

		let subaccounts = [];
		let joinExtras = {
			filiales: objFiliales,
			extras: objExtras
		};
		console.log('NVH: joinExtras', joinExtras);
		//--------------------Add EL -----------------------------
		const tipoPago = contrato.Contrato2__c.TipoPago__c === 'Prepago' ? 1 : (contrato.Contrato2__c.TipoPago__c === 'Pospago' ? 2 : 0);
		let lineaCreditoAsignada = contrato.Contrato2__c.GLB_LineaCreditoAsignada__c ? contrato.Contrato2__c.GLB_LineaCreditoAsignada__c : 0;

		let acc = {
			accountCode: contrato.Contrato2__c.CodigoAS400__c ? contrato.Contrato2__c.CodigoAS400__c : contrato.Contrato2__c.CodigoAS400_Con2_Ori__c,
			commercialName: contrato.Account.Name,
			businessName: contrato.EntidadLegal ? contrato.EntidadLegal.RazonSocial__c : '',
			isEntityFiscalKey: true, // True: Toma RFC de EL -> fiscalKeyValue de bloque Entity / False: RFC independiente de EL
			fiscalKeyId: 1,
			fiscalKeyValue: contrato.EntidadLegal.RFC__c,
			fiscalRegimenId: parseInt(contrato.EntidadLegal.Regimen_Fiscal__c),
			fiscalPersonId: contrato.EntidadLegal.RecordType === 'Persona Física' ? 1 : 2,
			economicSectorId: contrato.Account.Sector__c === 'Privado' ? 2 : contrato.Account.Sector__c === 'Público' ? 1 : 0,
			economicActivityId:contrato.EntidadLegal.Giro__c,
			accountTypeId: 1,
			segmentTypeId: segmentId,
			brandId: 0,
			countryId: 484,
			utcZoneId: 0,
			taxZoneId: 1,
			creditLimit: tipoPago === 2 ? lineaCreditoAsignada : 0, // Pospago => linea de credito,
			latitude: 0,
			longitude: 0,
			externalReferences: this.buildExternalReference(component, contrato, true),
			costCenters: [],
			deliverySectors: this.assembleDeliverySectors(component, contrato),//[], action 1
			products: this.assembleProducts(component, contrato),
			users: [{
				contactCode: adminPlatform.Id,
				productId: parseInt(contrato.Product2__c.ProductCode),
				userTypeId: 1
			}],
			addresses: window.addresses, //colocar action en inicializacion
			contacts: this.assembleContactIds(component, contrato, window.contactosIds)
		};
		if(updateMethod) { //Renegociacion acc existentes
			acc.action = actionMethod;
			acc.deliverySectors = actionMethod != 2 ? acc.deliverySectors : [];
			acc.users[0].action = actionMethod;
			acc.users = actionMethod != 2 ? acc.users : [];
			acc.addresses = actionMethod != 2 ? acc.addresses : [];
			acc.contacts = actionMethod != 2 ? acc.contacts : [];
		}
		subaccounts.push(acc);
		
		for (let key in joinExtras) {
			if (joinExtras.hasOwnProperty(key)) {
				let isEntityFiscalKey = key === 'filiales' ? false : true;
				let value = joinExtras[key];
				console.log(key, value);
				if(value.length > 0) {
					for (var val of value) {
						let acc = {
							accountCode: val.CodigoAS400__c,
							commercialName: contrato.Account.Name,
							businessName: val.Razon_Social__c,
							isEntityFiscalKey: isEntityFiscalKey, // True: Toma RFC de EL -> fiscalKeyValue de bloque Entity / False: RFC independiente de EL
							fiscalKeyId: 1,
							fiscalKeyValue: isEntityFiscalKey ? contrato.EntidadLegal.RFC__c : val.RFC__c,
							accountTypeId: 1,
							segmentTypeId: segmentId,
							brandId: 0,
							countryId: 484,
							utcZoneId: 0,
							taxZoneId: 1,
							creditLimit: tipoPago === 2 ? lineaCreditoAsignada : 0, // Pospago => linea de credito,
							latitude: 0,
							longitude: 0,
							externalReferences: this.buildExternalReference(component, contrato, false, val),
							costCenters: [],
							deliverySectors: this.assembleDeliverySectors(component, contrato),
							products: this.assembleProducts(component, contrato),
							users: [{
								contactCode: adminPlatform.Id,
								productId: parseInt(contrato.Product2__c.ProductCode),
								userTypeId: 1
							}],
							addresses: window.addresses, //[{addressCode: contrato.Contrato2__c.FiscalAddress__c}],
							contacts: this.assembleContactIds(component, contrato, window.contactosIds)
						};
						if(isEntityFiscalKey == false) {
							// Filiales RFC Independence
							console.log('SR-filiales val Regimen_Fiscal__c->', val.Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c);
							console.log('SR-filiales val RecordType->', val.Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name);
							console.log('SR-filiales val Sector__c->', val.Entidad_Cuenta__r.Cuenta__r.Sector__c);
							console.log('SR-filiales val Giro__c->', val.Entidad_Cuenta__r.Cuenta__r.Giro__c);

							acc.fiscalRegimenId = parseInt(val.Entidad_Cuenta__r.EntidadLegal__r.Regimen_Fiscal__c);
							acc.fiscalPersonId = val.Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name === 'Persona Física' ? 1 : 2;
							acc.economicActivityId = 0; // Doc Mercedes: economicActivityCatalog -> 0 : POR DEFINIR
							if(val.Entidad_Cuenta__r.Cuenta__r.Sector__c) {
								acc.economicSectorId = 
									val.Entidad_Cuenta__r.Cuenta__r.Sector__c === 'Privado' ? 2 :
									val.Entidad_Cuenta__r.Cuenta__r.Sector__c === 'Público' ? 1 : 
									0
								;
							}
						}
						if(updateMethod) { //Renegociacion -> acc existentes
							acc.action = actionMethod;
							acc.deliverySectors = actionMethod != 2 ? acc.deliverySectors : [];
							acc.users[0].action = actionMethod;
							acc.users = actionMethod != 2 ? acc.users : [];
							acc.addresses = actionMethod != 2 ? acc.addresses : [];
							acc.contacts = actionMethod != 2 ? acc.contacts : [];
						}
						subaccounts.push(acc);	
					}
				}
			}
		}
		return subaccounts;
	},
	buildSubAccounts2MercedesOnlyProductsStruct: function(component, contrato, filial, extras) {

		let updateMethod = component.get("v.updateClientMercedesAvailable");
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		console.log("SR- New subAccounts method > actionMethod -> ", actionMethod);
	
		// Convertir el objeto Proxy a una cadena JSON
		var jsonStringFiliales = JSON.stringify(filial);
		var jsonStringExtras = JSON.stringify(extras);

		// Convertir la cadena JSON a un objeto
		var objFiliales = JSON.parse(jsonStringFiliales);
		var objExtras = JSON.parse(jsonStringExtras);

		let subaccounts = [];
		let joinExtras = {
			filiales: objFiliales,
			extras: objExtras
		};
		console.log('SR: joinExtras', joinExtras);
		//--------------------Add EL -----------------------------
		// let acc = {
		// 	accountCode: contrato.Contrato2__c.CodigoAS400__c ? contrato.Contrato2__c.CodigoAS400__c : contrato.Contrato2__c.CodigoAS400_Con2_Ori__c,
		// 	products: this.assembleProductsOnlyProductsStruct(component, contrato)
		// };
		// if(updateMethod) { //Renegociacion acc existentes
		// 	acc.action = actionMethod;
		// }
		// subaccounts.push(acc);
		
		for (let key in joinExtras) {
			if (joinExtras.hasOwnProperty(key)) {
				let value = joinExtras[key];
				console.log(key, value);
				if(value.length > 0) {
					for (var val of value) {
						let acc = {
							accountCode: val.CodigoAS400__c,
							products: this.assembleProductsOnlyProductsStruct(component, contrato)
						};
						if(updateMethod) { //Renegociacion -> acc existentes
							acc.action = actionMethod;
						}
						subaccounts.push(acc);	
					}
				}
			}
		}
		return subaccounts;
	},
	assembleProductsOnlyProductsStruct: function(component, contrato) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		// let QuoteObj = component.get("v.dataSource.Quote");
		console.log("SR - assembleProducts-methodOperation -> ", updateMethod);

		var items = [];
		// if(this.isProductFleet(component)) {
			// if(contrato.Contrato2__c.GLB_TratTransacPendientes__c != null && contrato.Contrato2__c.GLB_TratTransacPendientes__c != undefined) {
		if(contrato.Contrato2__c.GLB_TratTransacPendientes__c == 'Agregar transacciones en la siguiente factura') {
			items.push({ itemId: 30, value: "OK"});
		} else if(contrato.Contrato2__c.GLB_TratTransacPendientes__c == 'Factura de transacciones separada con el periodo original'){
			items.push({ itemId: 31, value: "OK"});
		}
			// }
		// }
		
		console.log('items ', items);
		// if(updateMethod) {
		items[0].action = 1; // agregacion de condicion.
			// items[0].action = actionMethod;
			// for(var i = 0; items.length > i; i++) {
			// 	items[i].action = actionMethod;
			// }
		console.log('SR-items ', items);
		// }

		let products = [];
		let product = {
			productId: parseInt(contrato.Product2__c.ProductCode),
			// agreementConditionCode: contrato.Contrato2__c.Id,
			items:items
		};
		// if(updateMethod) {
			// if(actionMethod != 1){
			// 	product.items = [];
			// }
		product.action = actionMethod;
		// }
		products.push(product);
	
		return products;
	},
	assembleDeliverySectors : function(component, contrato) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		let adminPlatform = contrato.Opportunity.Contacto__r;
		let deliverySectors = (window.Alladdresses2Mercedes)
		.filter(address => address.addressTypes.some(type => type.addressTypeId === 2))
		.map(address => {
			const deliverySectorCode = this.generateRandomString();
			let dSector =  {
				deliverySectorCode: deliverySectorCode,
				productId: this.getProductId(component),
				addressCode: address.addressCode,
				deliverySectorName: "Sector " + deliverySectorCode,
				deliverySectorContacts: [{contactCode: adminPlatform.Id}]
			};
			if(updateMethod){
				dSector.action = actionMethod;
				dSector.deliverySectorContacts[0].action = actionMethod;
			}
			return dSector;
		});
		return deliverySectors;
	},

	assembleContactIds : function(component, contrato, contactIds) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - assembleContactIds-methodOperation -> ", updateMethod);
		console.log("SR - assembleContactIds-contactIds", contactIds);
		let contacts = [];

		for(let contactId of contactIds) {
			let contact = {
				contactCode:contactId
			}
			if(updateMethod) {
				contact.action = 1;
			}
			contacts.push(contact);
		}

		return contacts;
	},

	assembleProducts: function(component, contrato) {
		let updateMethod = component.get("v.updateClientMercedesAvailable"); 
		let actionMethod = !contrato.Contrato2__c.CodigoAS400_Con2_Ori__c ? 1 : 2; // Existe en Mercedes o no
		let QuoteObj = component.get("v.dataSource.Quote");
		console.log("SR - assembleProducts-methodOperation -> ", updateMethod);

		const mediaTypeCatalog = [
			{"Name":"","NombreCatalogo":"MONEDERO - FLEET EDENRED","Id":1},
			{"Name":"","NombreCatalogo":"PRODUCTO - BAJO OCTANAJE","Id":2},
			{"Name":"","NombreCatalogo":"PRODUCTO - ALTO OCTANAJE","Id":3},
			{"Name":"","NombreCatalogo":"PRODUCTO - DIESEL","Id":4},
			{"Name":"","NombreCatalogo":"PRODUCTO - GAS LP","Id":5},
			{"Name":"","NombreCatalogo":"PRODUCTO - GAS NATURAL","Id":6},
			{"Name":"","NombreCatalogo":"PRODUCTO - MAGNA RIBERENA","Id":7},
			{"Name":"","NombreCatalogo":"PRODUCTO - DUBA","Id":8},
			{"Name":"Tarjetas Virtuales","NombreCatalogo":"DISPOSITIVO - TARJETA VIRTUAL","Id":9},
			{"Name":"TAG Regular","NombreCatalogo":"DISPOSITIVO - TAG","Id":10},
			{"Name":"","NombreCatalogo":"DISPOSITIVO - TAG DUAL","Id":11},
			{"Name":"TAG Dual","NombreCatalogo":"DISPOSITIVO - TAG DUAL","Id":11},
			{"Name":"Tarjetas Físicas","NombreCatalogo":"DISPOSITIVO - TARJETA FISICA","Id":12},
			{"Name":"","NombreCatalogo":"ARTE DE DISPOSITIVO - TARJETA NEGRA","Id":13},
			{"Name":"","NombreCatalogo":"ARTE DE DISPOSITIVO - ARTE PLAN BASICO","Id":13},
			{"Name":"","NombreCatalogo":"ARTE DE DISPOSITIVO - ARTE PLAN FULL","Id":14},
			{"Name":"","NombreCatalogo":"MONEDERO - ECOVALE", "Id":1001} //Se agrega para producto 60 ecovale
		];
		  
		let tiposMedio = component.get('v.tiposDeMedio');
		var mediaType = JSON.stringify(tiposMedio);
		console.log(typeof mediaType);
		var jsonMediaType = JSON.parse(mediaType);
		console.log(typeof jsonMediaType);
		let opportunityRt = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");

		var items = [];
		if(this.isProductEcovale(component)) {
			items.push( //Los Items 2,3 y 4 deben de ir por default
				{ itemId: 12, value: "OK"},
				{ itemId: 2, value: "OK"},//BAJO OCTANAJE
				{ itemId: 3, value: "OK"},//ALTO OCTANAJE
				{ itemId: 4, value: "OK"}//DIESEL
			);
		} else {
			items.push(
				{ itemId: 1, value: "OK"},//MONEDERO - FLEET EDENRED
				{ itemId: 2, value: "OK"}//COMBUSTIBLE - BAJO OCTANAJE
			);
			if(this.isProductFleet(component)) {
				if(contrato.Contrato2__c.GLB_TratTransacPendientes__c != null && contrato.Contrato2__c.GLB_TratTransacPendientes__c != undefined) {
					if(contrato.Contrato2__c.GLB_TratTransacPendientes__c == 'Agregar transacciones en la siguiente factura') {
						items.push({ itemId: 30, value: "OK"});
					} else if(contrato.Contrato2__c.GLB_TratTransacPendientes__c == 'Factura de transacciones separada con el periodo original'){
						items.push({ itemId: 31, value: "OK"});
					}
				}
			}
		}
		console.log('items ', items);
		if(opportunityRt === 'VentaNueva' || opportunityRt === 'Migracion') {
			// 20 --> Venta nueva ---- 21 --> Migracion
			let saleType = {
				itemId: opportunityRt === 'VentaNueva'? 20 : 21,
				value: "OK"
			}
			items.push(saleType);
		}
		if(updateMethod) {
			for(var i = 0; items.length > i; i++) {
				items[i].action = actionMethod;
			}
			console.log('SR-items ', items);
		}
		let products = [];

		if(jsonMediaType.length > 0) {
			console.log('CB track #3');
			for (var media in jsonMediaType) {
				if (jsonMediaType.hasOwnProperty(media)) {
					console.log(media + ": " + jsonMediaType[media]);
					for(var i = 0; i < mediaTypeCatalog.length; i++) {
						if (mediaTypeCatalog[i]["Name"] === jsonMediaType[media]) {
							let item = {
								itemId: mediaTypeCatalog[i]["Id"],
								value: "OK"
							};
							if(updateMethod) {
								item.action = actionMethod;
							}
							items.push(item);
	
							//NVH -- Tarjeta
							if(jsonMediaType[media] === 'Tarjetas Físicas') {
								let itemDesign = {
									itemId: QuoteObj.GLB_IdDesign__c,
									value: "OK"
								};
								if(updateMethod) {
									itemDesign.action = actionMethod;
								}
								items.push(itemDesign);
							}
							
						}
					}
				}
			}
		}
		
		let product = {
			productId: parseInt(contrato.Product2__c.ProductCode),
			agreementConditionCode: contrato.Contrato2__c.Id,// ANTES --> condition.Concepto__r.ClaveReferencia__c|| ("c-generica" + cont++),
			items:items
		};
		if(updateMethod) {
			// if(actionMethod != 1){
			// 	product.items = [];
			// }
			product.action = actionMethod;
		}
		products.push(product);
	
		return products;
		// let prodsConceptos = component.get("v.productosSource");
		// let products = [];
		// let cont = 0;
		// for(let condition of prodsConceptos) {
		// 	let product = {
		// 		productId: contrato.Product2__c.ProductCode,
		// 		agreementConditionCode: condition.Concepto__r.ClaveReferencia__c|| ("c-generica" + cont++),
		// 		items:items
		// 	}
		// 	products.push(product);
		// }
		// return products;
	},

	buildCoorporativo: function (component, contract) {
		var updateMethod = component.get("v.updateClientMercedesAvailable"); 
		console.log("SR - buildCoorporativo-methodOperation -> ", updateMethod);
		let corporations = [];
		if(!updateMethod) {
			corporations = [{
				corporationCode: contract.Account.GLB_ID_Corporativo__c,
				corporationName: contract.Account.Name,
		  	}];
		}
		return corporations;
	},

	//-------------------------
	sendClientMercedes: function(component, event) {
		var action = component.get("c.sendClientToMercedes");
		let wrapper = this.buildRequetBodyMercedes(component);
		console.log('JSON Sent: ', JSON.stringify(wrapper));

		let methodOperation = component.get("v.updateClientMercedesAvailable") ? "update" : "create";
		console.log("SR - methodOperation", methodOperation);
		if(methodOperation == "create") {
			wrapper = this.mapJSON_EDG(wrapper);
		}else {
			wrapper = this.mapJSON_EDG_UPD(component, wrapper); // includes mapJSON_EDG_UPD_ACT1 scenario
		}
		console.log('NVH--wrapperMap ', JSON.stringify(wrapper));
		// SR-return component.set("v.btnInactive", true);component.set("v.spinAs400", false);return;
		action.setParams({
			data: JSON.stringify(wrapper),
			method: methodOperation
		});
		let scope = this;
		
		action.setCallback(this, function (response) {
			var state = response.getState();
			let res = response.getReturnValue();
			console.log('Response: ', res);
			let errors = res ?res.Error: null;
			if(state == 'ERROR') {
				errors = res = response.getError()[0].message;
			}
			if (state == 'SUCCESS' && !errors) {
				let responseBody = res.responseBody;
				console.log('ResponseBody: ', responseBody);
				if(responseBody === "") {
					let errorCode = res.statusCode;
					let description = "Error " + errorCode;
					$A.createComponent(
						"c:GLB_MessageComponent",{
							isSuccess:false,
							messageTxt: description
						},
						function(newComponent, status, errorMessage){
							if (newComponent.isValid()) {
								if (status === "SUCCESS") {									
									component.set("v.messageComponent", newComponent);
								} else if (status === "ERROR") {
									// Manejar el error en caso de que ocurra
									console.error("Error: " + errorMessage);
								}
							}
						}
					);
				}
				var responseBodyJSON = JSON.parse(responseBody);
				// var successResponse = (methodOperation == "create") ? responseBodyJSON.meta.status ==='succeeded' : responseBodyJSON.succeeded;
				if(responseBodyJSON.meta.status ==='succeeded') {
				//if(responseBodyJSON.succeeded) {
					$A.createComponent(
						"c:GLB_MessageComponent",
						{isSuccess:true},
						function(newComponent, status, errorMessage){
							if (newComponent.isValid()) {
								if (status === "SUCCESS") {
									component.set("v.messageComponent", newComponent);
									scope.updateSentMercedes(component);
								} else if (status === "ERROR") {
									console.error("Error al crear el componente: " + errorMessage);
									component.set("v.btnInactive", true);
								}
							}
						}
					);
				} else {
					//let errors = responseBodyJSON.errors;
					component.set("v.btnInactive", true);
					let errors = responseBodyJSON.meta.messages;
					let description = errors?errors[0].text||errors[0].description:"no data error";
					$A.createComponent(
						"c:GLB_MessageComponent",{
							isSuccess:false,
							messageTxt: description
						},
						function(newComponent, status, errorMessage){
							if (newComponent.isValid()) {
								if (status === "SUCCESS") {
									component.set("v.messageComponent", newComponent);
								} else if (status === "ERROR") {
									console.error("Error: " + errorMessage);
								}
							}
						}
					);
					component.set("v.spinAs400", false);
				}
			}
			//La información no es bien procesada internamente en SF
			else if(!res){	
				component.set("v.btnInactive", true);			
				$A.createComponent(
					"c:GLB_MessageComponent",{
						isSuccess:false,
						messageTxt: "Error interno, validar información de entrada: "
					},
					function(newComponent, status, errorMessage){
						if (newComponent.isValid()) {
							if (status === "SUCCESS") {
								component.set("v.messageComponent", newComponent);
							} else if (status === "ERROR") {
								console.error("Error interno al procesar informacion de entrada: " + dataJoined);
							}
						}
					  }
				);
				component.set("v.spinAs400", false);
			}else {				
				component.set("v.btnInactive", true);
				$A.createComponent(
					"c:GLB_MessageComponent",{
						isSuccess:false,
						messageTxt: errors
					},
					function(newComponent, status, errorMessage){
						if (newComponent.isValid()) {
							if (status === "SUCCESS") {
								component.set("v.messageComponent", newComponent);
							} else if (status === "ERROR") {
								// Manejar el error en caso de que ocurra
								console.error("Error: " + errorMessage);
							}
						}
					  }
				);
				component.set("v.spinAs400", false);
			}
			
		});
		$A.enqueueAction(action);
	},
    
    //--NTT Inicia crear cliente MoPay
    sendClientMoPay: function (component, event) {
		var dat = component.get("v.dataSource");
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.generarClientesMoP");
		action.setParams({
			idContrato: dat.Contrato2__c.Id,
			idQli: dat.Contrato2__c.PartidaPresupuesto__c,
			idOpp: dat.OpportunityId
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			console.log("ESTADO:" + state);
			console.log("result.Code: " + response.getReturnValue().Code);
			if (state == 'SUCCESS') {
				console.log(">>>1");
				var result = response.getReturnValue();
				
				if (result.Code == '0') {
					
                    
                    dat.Contrato2__c.NTT_Id_Middle_Office__c = result.idMoPay;
                    
                    component.set("v.clientesCompletos", true);
					component.set("v.spinAs400", false);
                    component.set("v.NTT_btnInactive", true);
					component.set("v.dataSource", dat);
                    
                    toastEvent.setParams({
						"type": "success",
						"title": "Exito",
						"message": "Clientes dados de alta correctamente"
					});
                    toastEvent.fire();
                    
				} else if (result.Code == '2') {
					toastEvent.setParams({
						"type": "warning",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();
					component.set("v.spinAs400", false);
				} else if (result.Code == '-1') {
					var err = result.errores;
					var errParse = JSON.parse(err);
					component.set('v.listaErrores', errParse);
					component.set("v.modalErrores", !component.get("v.modalErrores"));
					component.set("v.spinAs400", false);
					/*toastEvent.setParams({
						"type": "error",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();*/
				} else {
					toastEvent.setParams({
						"type": "warning",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();
					component.set("v.spinAs400", false);
				}
			} else {
				toastEvent.setParams({
					"type": "error",
					"title": "Error",
					"message": "Error al dar de alta los clientes"
				});
				toastEvent.fire();
				component.set("v.spinAs400", false);
			}
		});
		$A.enqueueAction(action);
	},
	aprobarContratoMoPay: function (component, dataSource) {
		
        var toastEvent = $A.get("e.force:showToast");
		var metodo = 'c.updateContratoADV2MoPay';
        var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");

		var action = component.get(metodo);
		var res;
		var subcuent = [];
        
        subcuent = component.get("v.subcuentasAdicionales");
		
		component.set("v.btnActionAprobar", true);
		dataSource.Contrato2__c.EtapaContrato__c = 'Autorizado'
		dataSource.Opportunity.Estatus__c = 'Cerrada'
        
        if (tipoReg != 'RT_Renegotiation') {
            if (dataSource.Opportunity.Familia__c == 'Benefits'){
                dataSource.Opportunity.StageName = 'Ganada';
            }else {
              	dataSource.Opportunity.StageName = 'Implementación';
                
            }
			dataSource.Opportunity.CodigoClienteAS400__c = dataSource.Contrato2__c.CodigoAS400__c;
		}
		
        dataSource.Opportunity.ComentariosADV__c = dataSource.Contrato2__c.Comentarios_ADV__c;
		
        var estabs = component.get("v.establecimientos");
        var establecimientos = [];
        for (var x = 0; x < estabs.length; x++) {
			var temE = {};
			temE.Id = estabs[x].Id;
            temE.Affiliate = estabs[x].Affiliate__c;
			temE.Product = estabs[x].Product__c;
			temE.StationId = estabs[x].StationId__c;
			establecimientos.push(temE);
		}
        
		console.log('aprobarContrato dataSource: ', JSON.parse(JSON.stringify(dataSource)));
		console.log("aprobarContrato subcuentasAdicionales: ", JSON.parse(JSON.stringify(subcuent)));
        console.log("aprobarContrato establecimientos: ", JSON.parse(JSON.stringify(establecimientos)));
        
		var filiales = [];
		
			console.log('isProduct29');
			filiales = component.get("v.filialesSource");
			console.log('filiales ',filiales);
			//Chequear que los campos RFC y contr.Entidad_Cuenta__r.EntidadLegal__r.Name esten completos y en el formato correcto
			var entidadLegal = component.get("v.entidadLegal");
			if(entidadLegal.Name == null || entidadLegal.Name == undefined
				|| entidadLegal.Name == ''
				|| entidadLegal.Name.includes(' ')
				|| !(/\D/.test(entidadLegal.Name))
				|| !(/\d/.test(entidadLegal.Name))
			) {
				toastEvent.setParams({
					"duration": "15000",
					"type": "error",
					"title": "Error al aprobar contrato",
					"message": 'El campo "Name" en Entidad Legal ('+entidadLegal.Name+') esta incompleto o no posee el formato correcto.'
				});
				component.set("v.btnActionAprobar", false);
				component.set("v.btnInactiveCheck", true);
				component.set("v.btnInactive", false);
                component.set("v.NTT_btnInactive", true);
                toastEvent.fire();
				return;
			}
			if(subcuent.length == 0 && filiales.length > 0) {
				//Chequear que los campos RFC esten completos y en el formato correcto
				var flag = false;
				var filialName = ''
				filiales.forEach(filial => {
					console.log(filial.RFC__c);
					if(filial.RFC__c == null || filial.RFC__c == undefined
						|| filial.RFC__c == ''
						|| filial.RFC__c.includes(' ')
						|| !(/\D/.test(filial.RFC__c))
						|| !(/\d/.test(filial.RFC__c))
					) {
							filialName = filial.Name;
							flag = true;
					}
				});
				if(flag) {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al aprobar contrato",
						"message": 'El campo RFC en contrato filial ('+filialName+') esta incompleto o no posee el formato correcto.'
					});
					component.set("v.btnActionAprobar", false);
					component.set("v.btnInactiveCheck", true);
					component.set("v.NTT_btnInactive", true);
					toastEvent.fire();
					return;
				}
				console.log("aprobarContrato filiales: ", JSON.parse(JSON.stringify(filiales)));
				console.log("aprobarContrato filiales stringified: ", JSON.stringify(filiales));
			}
	

		action.setParams({
                jsonContrato: JSON.stringify(dataSource.Contrato2__c),
                jsonOportunidad: JSON.stringify(dataSource.Opportunity),
                extras: JSON.stringify(subcuent),
            	estabs: JSON.stringify(establecimientos),
				filialesEx: JSON.stringify(filiales)
        })
        action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				res = response.getReturnValue();
				console.log(metodo, 'success: ', res);
				if (res.hasOwnProperty('jsonIdsPhantomData')) {
					console.log('contiene jsonIdspPhantomData');
					var jsonDataParsed = JSON.parse(res.jsonIdsPhantomData);
					console.log('jsonDataParsed',jsonDataParsed);
					//Phantom Id Entidad Principal
					component.set("v.idUniqueGeneratorData", jsonDataParsed);
					var phantomIdPrincipal = jsonDataParsed.Principal.phantomId;
					console.log('phantomIdPrincipal >>> ',phantomIdPrincipal);
					dataSource.Contrato2__c.CodigoAS400__c = phantomIdPrincipal;
					
					if(subcuent.length > 0 && jsonDataParsed.hasOwnProperty('Subcuentas')) {
						console.log('dentro de subcuentas');
						for(var i = 0; i < subcuent.length; i++) {
							for (var j = 0; j < jsonDataParsed.Subcuentas.length; j++) {
								if(subcuent[i].Id == jsonDataParsed.Subcuentas[j].id) {
									console.log('asignando phantom id a contrato filial');
									subcuent[i].CodigoAS400__c = jsonDataParsed.Subcuentas[j].PhantomId;
									console.log(subcuent[i].CodigoAS400__c);
								}
							}
						}
						component.set("v.subcuentasAdicionales", subcuent);
					} else if (filiales.length > 0 && jsonDataParsed.hasOwnProperty('Filiales')) {
						console.log('dentro de filiales');
						for(var i = 0; i < filiales.length; i++) {
							for (var j = 0; j < jsonDataParsed.Filiales.length; j++) {
								if(filiales[i].Id == jsonDataParsed.Filiales[j].id) {
									console.log('asignando phantom id a contrato filial');
									filiales[i].CodigoAS400__c = jsonDataParsed.Filiales[j].PhantomId;
									console.log(filiales[i].CodigoAS400__c);
								}
							}
						}
						component.set("v.filialesSource", filiales);
					}
				}
				if (res.hasOwnProperty('FechaFinADV')) {
					var fechaFinFormatted = new Date(res.FechaFinADV);
					dataSource.Contrato2__c.FechaFinADC__c = fechaFinFormatted;
					console.log('dataSource.Contrato2__c.FechaFinADC__c >> ',dataSource.Contrato2__c.FechaFinADC__c);
				}
				if(res.hasOwnProperty('corporationId')) {
					dataSource.Account.GLB_ID_Corporativo__c = res.corporationId;
					console.log('dataSource.Account.GLB_ID_Corporativo__c ',dataSource.Account.GLB_ID_Corporativo__c);
				}	
				if (res.Code == '0') {
					toastEvent.setParams({
						"duration": "15000",
						"type": "success",
						"title": "¡Éxito al aprobar contrato!",
						"message": res.Response
					});
					component.set("v.dataSource", dataSource);
					component.set("v.NTT_btnInactive", false);
                    //ALTAS BE component.set("v.btnGenerarInactive", false);
					component.set("v.btnInactiveCheck", false);
					if(tipoReg != 'RT_Renegotiation_merchants') {
						this.generaPDF(component); 
                    } else {
                        component.set("v.btnActionAprobar", false);
                    }
				}
				else {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al aprobar contrato",
						"message": res.Response
					});
					component.set("v.btnActionAprobar", false);
					component.set("v.btnInactiveCheck", true);
					component.set("v.btnInactive", false);
                    component.set("v.NTT_btnInactive", true);
                    //ALTAS BE component.set("v.btnGenerarInactive", true);
				}
				toastEvent.fire();
			}
			else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la información al aprobar contrato."
				});
				toastEvent.fire();
			}
		})
		$A.enqueueAction(action);
	},
        
    //--NTT Termina crear cliente MoPay
	updateSentMercedes: function(component) {
		console.log('updateSentMercedes');
		let clientRef = JSON.stringify(window.mercedesClientReference);
		let dataSource = component.get("v.dataSource");
		var action = component.get("c.updateRecord");
		let res = {};
		let contratoUpdate = {
			Id: dataSource.Contrato2__c.Id,
			GLB_Enviado_Mercedes__c: true,
			GLB_Ref_Cli_Mercedes__c: clientRef
		};

		action.setParams({
			sObjectName:'Contrato2__c',
			jsonData: JSON.stringify(contratoUpdate)
		})

		let scope = this;

		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				res = response.getReturnValue();
				if (res.Code == '0') {
					component.set("v.sent2Mercedes", true);

					var tipoPagoPospago = (dataSource.Contrato2__c.TipoPago__c === 'Pospago');
					var opportunityRt = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
					var stageNameValue = opportunityRt != "RT_Renegotiation" ? "Implementación" : "Renegociada";
					component.set("v.sent2Mercedes", true);
					var jsonData = {
						Id: dataSource.Opportunity.Id,
						StageName: stageNameValue,
					};
					if(tipoPagoPospago) {
						scope.setAnalistaCobranzaInPrimeContratoFilial(component);
					} else {
						console.log('update Opportunity');
						scope.updateRecord(component, 'Opportunity', jsonData);
					}
				}
			} else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion"
				});
				toastEvent.fire();
				component.set("v.spinAs400", false);
			}
		})
		$A.enqueueAction(action);
	},

	setAnalistaCobranzaInPrimeContratoFilial: function(component) {
		let dataSource = component.get("v.dataSource");
		let extIdCF = dataSource.Contrato2__c.CodigoAS400__c ? dataSource.Contrato2__c.CodigoAS400__c : '';
		var action = component.get("c.executeQuery");
		let query = 
			"SELECT Id, CodigoAS400__c, GLB_AnalistaDeCobranzaNombre__c " +
			"FROM ContratoFilial__c " + 
			"WHERE CodigoAS400__c  = " + "'" + extIdCF + "' " +
			"LIMIT 1"
		;
		action.setParams({
			query: query
		});
		console.log('SR-PP-Query CF ->', query);

		action.setCallback(this, function (response) {
			var state = response.getState();
			console.log('SR-PP- Response CF ->', response.getReturnValue());
			if (state === "SUCCESS") {
				let cf = response.getReturnValue()[0];
				let analistName = dataSource.Contrato2__c.GLB_CodAnalistaCobranza__c ? this.getValueCatalogCobranzaAnalistName(dataSource.Contrato2__c.GLB_CodAnalistaCobranza__c) : '';
				var jsonData = {
					Id: cf.Id,
					GLB_AnalistaDeCobranzaNombre__c: analistName
				};
				console.log('SR-PP-update CF->', jsonData);
				this.updateRecordReRun(component, 'ContratoFilial__c', jsonData);
			} else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion"
				});
				toastEvent.fire();
				component.set("v.spinAs400", false);
			}
		});
		$A.enqueueAction(action);
	},

	updateRecordReRun: function(component, sObjectName, jsonData) {
		console.log('NVH- execute updateRecord');
		let dataSource = component.get("v.dataSource");
		var action = component.get("c.updateRecord");
		
        action.setParams({
			sObjectName: sObjectName,
			jsonData: JSON.stringify(jsonData)
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				var stageNameValue = "Implementación";
				var jsonData = {
					Id: dataSource.Opportunity.Id,
					StageName: stageNameValue,
				};
				console.log('update Opportunity');
				this.updateRecord(component, 'Opportunity', jsonData);
			} else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion"
				});
				toastEvent.fire();
				component.set("v.spinAs400", false);
			}
		})
		$A.enqueueAction(action);
	},

	getValueCatalogCobranzaAnalistName: function(key) {
		var res = null;
		if(!key) return res;
        const catalog = {
			"CARTERA BP": "Delgado, Liliana",
			"MX ANALISTA100": "Olivares, Abraham",
			"MX ANALISTA110": "Zamora, Gabriela",
			"MX ANALISTA120": "Dominguez, Zuriel",
			"MX ANALISTA130": "Delgado, Liliana",
			"MX ANALISTA140": "Tuxpan, Marco",
			"MX ANALISTA150": "Miramontes, Yuneri",
			"MX ANALISTA160": "Cuenta, Interna",
			"MX ANALISTA170": "Castrejon, Karen",
			// "MX ANALISTA180": "Juridico",
			"MX ANALISTA190": "Nunez, Gabriela",
			"MX ANALISTA200": "Lopez, Aline Yanelly",
			"MX ANALISTA40": "Ramirez, Gloria",
			"MX ANALISTA50": "Perez, Anahi",
			"MX ANALISTA60": "Padron, Arturo",
			"MX ANALISTA70": "Santiago, Jovanni",
			"MX ANALISTA80": "Castorena, Rosario",
			"MX ANALISTA90": "Rodriguez, Frida"
		};
		var keyUp =  key.toUpperCase();
		res =  catalog[keyUp];
		console.log('SR-PP catalog name -> ', res);
		return res;
	},

	updateRecord: function(component, sObjectName, jsonData) {
		console.log('NVH- execute updateRecord');
		let toastMessage = sObjectName === "Opportunity" ? "Oportunidad Implementada correctamente!" : "Registro actualizado correctamente!";
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.updateRecord");
		let res = {};
		
        action.setParams({
			sObjectName: sObjectName,
			jsonData: JSON.stringify(jsonData)
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				res = response.getReturnValue();
				if (res.Code == '0') {
					toastEvent.setParams({
						"type": "success",
						"title": "Exito",
						"message": toastMessage
					});
					toastEvent.fire();
				}
			} else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion"
				});
				toastEvent.fire();
			}
			component.set("v.spinAs400", false);
		})
		$A.enqueueAction(action);
	},

	aprobar: function (component, dataSource, filiales) {
		var metodo = '';
		var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");

		if (tipoReg.includes('RT_NuevaAfiliacion')){
			metodo = 'c.saveS400FilialesAfiliados';
		} else {
			metodo = 'c.saveS400Filiales';
		}

		var action = component.get(metodo);
		console.log('Filiales SAVE:', JSON.parse(JSON.stringify(filiales)));
		action.setParams({
			jsonFiliales: JSON.stringify(filiales)
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				console.log(metodo, 'success: ', response.getReturnValue());
				if (response.getReturnValue() == 'Exito') {
					//Al final guardar Contrato
					this.aprobarContrato(component, dataSource);
				} else {
					component.set("v.btnInactiveCheck", true);
					var toastEvent = $A.get("e.force:showToast");
					toastEvent.setParams({
						"title": "Error!",
						"type": "error",
						"message": response.getReturnValue()
					});
					toastEvent.fire();
				}
			} else {
				component.set("v.btnInactiveCheck", true);
				console.log('aprobar error:', response.getReturnValue())
			}
		});
		$A.enqueueAction(action);
	},
	
	aprobarContrato: function (component, dataSource) {
		const isFleet = component.get("v.isProductFleet");
		const isProduct60 = this.isProductEcovale(component);
		console.log('CON_ADVContainer isProduct60', isProduct60);
		var toastEvent = $A.get("e.force:showToast");
		var metodo = '';
        var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
		// AFILIADOS OPAM
		var isOPAM52 = component.get("v.isOPAM52");
        var isOPAM62 = component.get("v.isOPAM62");
        var isOPAM69 = component.get("v.isOPAM69");
		// 
        if (tipoReg.includes('RT_NuevaAfiliacion')|| tipoReg.includes('RT_Renegotiation_merchants')){
			metodo = 'c.updateContratoAfiliadoADV2';
        } else if (tipoReg == 'RT_Renegotiation' /*|| tipoReg == 'Activacion_Servicio'*/) {//CEAM :3563   //6298: (Descomentar 'Activacion_Servicio' si se activa Tarjetas Virtuales)
			metodo = 'c.updateContractADVRenegotiation';
			console.log('#2 Track renegotiation Fleet 33');
		} else {
			console.log('CB Track #1');
			metodo = 'c.updateContratoADV2';
		}
        if (tipoReg.includes('RT_NuevaAfiliacion_M')){
            console.log('Metodo phantom 43-A');
            metodo = 'c.updateContratoADV2';
            }
			console.log('4341');
		var action = component.get(metodo);
			console.log('4343');
		var res;
		var subcuent = [];
        // if(tipoReg != 'RT_Renegotiation_merchants'){}
		subcuent = component.get("v.subcuentasAdicionales");
		
		component.set("v.btnActionAprobar", true);
		dataSource.Contrato2__c.EtapaContrato__c = 'Autorizado'
		dataSource.Opportunity.Estatus__c = 'Cerrada'
		
        console.log('4352');
		if (tipoReg != 'RT_Renegotiation') {//CEAM :3563
            if (dataSource.Opportunity.Familia__c == 'Benefits'){
                dataSource.Opportunity.StageName = 'Ganada';
            }else {
                if(!dataSource.Product2__c.AS400_integration__c && !isFleet && !isProduct60){
                    dataSource.Opportunity.StageName = 'Implementación';
                }
            }
			dataSource.Opportunity.CodigoClienteAS400__c = dataSource.Contrato2__c.CodigoAS400__c;
		}
		dataSource.Opportunity.ComentariosADV__c = dataSource.Contrato2__c.Comentarios_ADV__c;
		
        var estabs = component.get("v.establecimientos");
        var establecimientos = [];
        console.log('4367');
        for (var x = 0; x < estabs.length; x++) {
			var temE = {};
			temE.Id = estabs[x].Id;
            temE.Affiliate = estabs[x].Affiliate__c;
			temE.Product = estabs[x].Product__c;
			temE.StationId = estabs[x].StationId__c;
			establecimientos.push(temE);
		}
        
		console.log('aprobarContrato dataSource: ', JSON.parse(JSON.stringify(dataSource)));
		console.log("aprobarContrato subcuentasAdicionales: ", JSON.parse(JSON.stringify(subcuent)));
        console.log("aprobarContrato establecimientos: ", JSON.parse(JSON.stringify(establecimientos)));
		var filiales = [];
        console.log('NTT PRUEBA isProductFleet',this.isProduct43(component)); // no hay metodo con esta firma -> se reemplaza por isProduct43
		if(this.isProductFleet(component) || this.isProductEcovale(component) || this.isProduct43(component)) {
			console.log('isProductFleet, Ecovale');
			filiales = component.get("v.filialesSource");
			console.log('filiales ',filiales);
			//Chequear que los campos RFC y contr.Entidad_Cuenta__r.EntidadLegal__r.Name esten completos y en el formato correcto
			var entidadLegal = component.get("v.entidadLegal");
			if(entidadLegal.Name == null || entidadLegal.Name == undefined
				|| entidadLegal.Name == ''
				|| entidadLegal.Name.includes(' ')
				|| !(/\D/.test(entidadLegal.Name))
				|| !(/\d/.test(entidadLegal.Name))
			) {
				toastEvent.setParams({
					"duration": "15000",
					"type": "error",
					"title": "Error al aprobar contrato",
					"message": 'El campo "Name" en Entidad Legal ('+entidadLegal.Name+') esta incompleto o no posee el formato correcto.'
				});
				component.set("v.btnActionAprobar", false);
				component.set("v.btnInactiveCheck", true);
				component.set("v.btnInactive", false);
				toastEvent.fire();
				return;
			}
			if(subcuent.length == 0 && filiales.length > 0) {
				//Chequear que los campos RFC esten completos y en el formato correcto
				var flag = false;
				var filialName = ''
				filiales.forEach(filial => {
					console.log(filial.RFC__c);
					if(filial.RFC__c == null || filial.RFC__c == undefined
						|| filial.RFC__c == ''
						|| filial.RFC__c.includes(' ')
						|| !(/\D/.test(filial.RFC__c))
						|| !(/\d/.test(filial.RFC__c))
					) {
							filialName = filial.Name;
							flag = true;
					}
				});
				if(flag) {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al aprobar contrato",
						"message": 'El campo RFC en contrato filial ('+filialName+') esta incompleto o no posee el formato correcto.'
					});
					component.set("v.btnActionAprobar", false);
					component.set("v.btnInactiveCheck", true);
					component.set("v.btnInactive", false);
					toastEvent.fire();
					return;
				}
                    console.log("aprobarContrato filiales: ", JSON.parse(JSON.stringify(filiales)));
                    console.log("aprobarContrato filiales stringified: ", JSON.stringify(filiales));
                }
            }
        action.setParams({
            jsonContrato: JSON.stringify(dataSource.Contrato2__c),
            jsonOportunidad: JSON.stringify(dataSource.Opportunity),
            extras: JSON.stringify(subcuent),
            estabs: JSON.stringify(establecimientos),
            filialesEx: JSON.stringify(filiales)
        })
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
				res = response.getReturnValue();
				console.log(metodo, 'success: ', res);
				if (res.hasOwnProperty('jsonIdsPhantomData')) {
					console.log('contiene jsonIdspPhantomData');
					var jsonDataParsed = JSON.parse(res.jsonIdsPhantomData);
					console.log('jsonDataParsed',jsonDataParsed);
					//Phantom Id Entidad Principal
					component.set("v.idUniqueGeneratorData", jsonDataParsed);
					var phantomIdPrincipal = jsonDataParsed.Principal.phantomId;
					console.log('phantomIdPrincipal >>> ',phantomIdPrincipal);
					dataSource.Contrato2__c.CodigoAS400__c = phantomIdPrincipal;
					//NVH--------------
					this.consultSentClientsMercedes(component, dataSource);

					// Do further processing with the key and value here
					if(subcuent.length > 0 && jsonDataParsed.hasOwnProperty('Subcuentas')) {
						console.log('dentro de subcuentas');
						for(var i = 0; i < subcuent.length; i++) {
							for (var j = 0; j < jsonDataParsed.Subcuentas.length; j++) {
								if(subcuent[i].Id == jsonDataParsed.Subcuentas[j].id) {
									console.log('asignando phantom id a contrato filial');
									subcuent[i].CodigoAS400__c = jsonDataParsed.Subcuentas[j].PhantomId;
									console.log(subcuent[i].CodigoAS400__c);
								}
							}
						}
						component.set("v.subcuentasAdicionales", subcuent);
					} else if (filiales.length > 0 && jsonDataParsed.hasOwnProperty('Filiales')) {
						console.log('dentro de filiales');
						for(var i = 0; i < filiales.length; i++) {
							for (var j = 0; j < jsonDataParsed.Filiales.length; j++) {
								if(filiales[i].Id == jsonDataParsed.Filiales[j].id) {
									console.log('asignando phantom id a contrato filial');
									filiales[i].CodigoAS400__c = jsonDataParsed.Filiales[j].PhantomId;
									console.log(filiales[i].CodigoAS400__c);
								}
							}
						}
						component.set("v.filialesSource", filiales);
					}
				}
				if (res.hasOwnProperty('FechaFinADV')) {
					var fechaFinFormatted = new Date(res.FechaFinADV);
					dataSource.Contrato2__c.FechaFinADC__c = fechaFinFormatted;
					console.log('dataSource.Contrato2__c.FechaFinADC__c >> ',dataSource.Contrato2__c.FechaFinADC__c);
				}
				if(res.hasOwnProperty('corporationId')) {
					dataSource.Account.GLB_ID_Corporativo__c = res.corporationId;
					console.log('dataSource.Account.GLB_ID_Corporativo__c ',dataSource.Account.GLB_ID_Corporativo__c);
				}	
				if (res.Code == '0') {
					toastEvent.setParams({
						"duration": "15000",
						"type": "success",
						"title": "¡Éxito al aprobar contrato!",
						"message": res.Response
					});
					component.set("v.dataSource", dataSource);
					component.set("v.btnInactive", true); 
                    //ALTAS BE component.set("v.btnGenerarInactive", false);
					component.set("v.btnInactiveCheck", false);
					if(tipoReg != 'RT_Renegotiation_merchants') {
						this.generaPDF(component); 
                    } else {
                        component.set("v.btnActionAprobar", false);
                    }
				}
				else {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al aprobar contrato",
						"message": res.Response
					});
					component.set("v.btnActionAprobar", false);
					component.set("v.btnInactiveCheck", true);
					component.set("v.btnInactive", false);
                    //ALTAS BE component.set("v.btnGenerarInactive", true);
				}
				toastEvent.fire();
			}
			else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la información al aprobar contrato."
				});
				toastEvent.fire();
			}
		})
		$A.enqueueAction(action);
	},
	generaPDF: function (component) {
		var filial = component.get("v.filialesSource");
        console.log('generaPDF filial', JSON.parse(JSON.stringify(filial)));
		var eL = component.get('v.entidadLegal');
        console.log('generaPDF eL', JSON.parse(JSON.stringify(eL)));
		eL.Disabled = true;
		component.set('v.entidadLegal', eL);
		var generatePDFEvent = $A.get("e.c:CON_GeneratePDF_EVENT");
		generatePDFEvent.setParams({ params: { filiales: filial, entidadLegal: eL } })
		generatePDFEvent.fire();
	},
	rechazar: function (component, dataSource) {
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.updateContratoADV");
		var res;
		component.set("v.btnActionRechazar", true);

		var motivos = component.get("v.motivosRechazoSelec");
		var textM = '';
		if (motivos != null) {
			textM = motivos.join(";");
		}
		dataSource.Contrato2__c.RejectionReasons__c = textM
		dataSource.Contrato2__c.EtapaContrato__c = 'Rechazado para corrección'
		dataSource.Opportunity.Estatus__c = 'Pausada'
		//dataSource.Opportunity.StageName = 'Cotización'
		console.log('***********-**_******' + dataSource.Opportunity.StageName);
		dataSource.Opportunity.EnvioCSVOPAM__c = false
		dataSource.Opportunity.EnvioXMLTC30__c = false
		dataSource.Opportunity.ComentariosADV__c = dataSource.Contrato2__c.Comentarios_ADV__c
		dataSource.Opportunity.RejectionReasons__c = textM
		//WEBSALES
		if (dataSource.Opportunity.Is_Created_From_Websale__c == true) {
			dataSource.Opportunity.webSalesContractRejected__c = true
			dataSource.Opportunity.StageName = 'Contrato'
		} else {
			dataSource.Opportunity.StageName = 'Cotización'
		}
		action.setParams({
			jsonContrato: JSON.stringify(dataSource.Contrato2__c),
			jsonOportunidad: JSON.stringify(dataSource.Opportunity)
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				res = response.getReturnValue();
				if (res.Code == '0') {
					this.updateOportunidadWebsale(component, dataSource.Opportunity)
					component.set("v.dataSource", dataSource);
					if(this.isProductFleet(component) || this.isProductEcovale(component)) {
						component.set("v.btnInactive", false);
					}else {
						component.set("v.btnInactive", true);
					}
					component.set("v.btnInactiveCheck", false);
                    //ALTAS BE component.set("v.btnGenerarInactive", false);
				}
				else {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al rechazar contrato",
						"message": res.Response
					});
					toastEvent.fire();
				}
			}
			else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion al rechazar contrato"
				});
				toastEvent.fire();
			}
			component.set("v.btnActionRechazar", false);
		})
		$A.enqueueAction(action);
	},
	updateOportunidadWebsale: function (component, oportunidad) {
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.updateOportunidadADV");
		var res;
		component.set("v.btnActionRechazar", true);
		//oportunidad.StageName = 'Cotización';
		//WEBSALES
		if (oportunidad.Is_Created_From_Websale__c == true) {
			oportunidad.webSalesContractRejected__c = true
			oportunidad.StageName = 'Contrato'
		} else {
			oportunidad.StageName = 'Cotización'
		}

		action.setParams({
			jsonOportunidad: JSON.stringify(oportunidad)
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == 'SUCCESS') {
				res = response.getReturnValue();
				if (res.Code == '0') {
					toastEvent.setParams({
						"duration": "15000",
						"type": "success",
						"title": "¡Éxito al rechazar contrato!",
						"message": res.Response
					});
				}
				else {
					toastEvent.setParams({
						"duration": "15000",
						"type": "error",
						"title": "Error al rechazar contrato",
						"message": res.Response
					});
				}
				toastEvent.fire();
			}
			else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "warning",
					"title": "Advertencia",
					"message": "Error al guardar la informacion al rechazar contrato"
				});
				toastEvent.fire();
			}
			component.set("v.btnActionRechazar", false);
		})
		$A.enqueueAction(action);
	},
	/*DVM: INICIO, 2 Julio. Para atender el requerimiento de mostrar todos los contactos con función AP en la pantalla ADV*/
	getContactosAP: function (component) {
		component.set('v.columnas', [
			{ label: 'Nombre', fieldName: 'Name', type: 'text' },
			{ label: 'Puesto', fieldName: 'Puesto__c', type: 'text' },
			{ label: 'Función', fieldName: 'Funcion__c', type: 'text' },
			{ label: 'Teléfono 1', fieldName: 'Phone', type: 'phone' },
			{ label: 'Teléfono 2', fieldName: 'Telefono2__c', type: 'phone' },
			{ label: 'Email', fieldName: 'Email', type: 'email' }
		]);

		var action = component.get("c.getContactosAP");

		action.setParams({
			"idRegistro": component.get("v.oppId"),
			"nombreObjeto": "Opportunity"
		});

		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				component.set("v.contactosAP", response.getReturnValue());
			}
		});

		$A.enqueueAction(action);
	},
	/*DVM: FIN, 2 Julio*/
	createXML: function (component) {
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.generaXMLExtras");
		action.setParams({
			"opportunityId": component.get("v.oppId"),
			"contratoId": component.get("v.recordId"),
			"filiales": component.get("v.filialesSource"),
			"extras": JSON.stringify(component.get("v.subcuentasAdicionales"))
		});

		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state == "SUCCESS") {
				toastEvent.setParams({
					"duration": "15000",
					"type": "success",
					"title": "Exito",
					"message": "¡Se generaron correctamente los XMLs!"
				});
				component.set("v.btnActionXML", false);
				component.set("v.isXML", false);
				toastEvent.fire();
			}
			else {
				toastEvent.setParams({
					"duration": "15000",
					"type": "error",
					"title": "Error",
					"message": "¡Ocurrio un error al generar los XMLs!"
				});
				toastEvent.fire();
				component.set("v.btnActionXML", false);
			}
		});
		$A.enqueueAction(action);
	},
	generarClientAs400: function (component, event) {
		var dat = component.get("v.dataSource");
		var toastEvent = $A.get("e.force:showToast");
		var action = component.get("c.generarClientesAs400");
		action.setParams({
			idContrato: dat.Contrato2__c.Id,
			idQli: dat.Contrato2__c.PartidaPresupuesto__c,
			idOpp: dat.OpportunityId
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			console.log("ESTADO:" + state);
			console.log("result.Code: " + response.getReturnValue().Code);
			if (state == 'SUCCESS') {
				console.log(">>>1");
				var result = response.getReturnValue();
				console.log(">>>" + result.cliente);
				if (result.Code == '0') {
					toastEvent.setParams({
						"type": "success",
						"title": "Exito",
						"message": "Clientes dados de alta correctamente"
					});
					toastEvent.fire();
					component.set("v.clientesCompletos", true);
					component.set("v.spinAs400", false);
				} else if (result.Code == '2') {
					toastEvent.setParams({
						"type": "warning",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();
					component.set("v.spinAs400", false);
				} else if (result.Code == '-1') {
					var err = result.errores;
					var errParse = JSON.parse(err);
					component.set('v.listaErrores', errParse);
					component.set("v.modalErrores", !component.get("v.modalErrores"));
					component.set("v.spinAs400", false);
					/*toastEvent.setParams({
						"type": "error",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();*/
				} else {
					toastEvent.setParams({
						"type": "warning",
						"title": "Error",
						"message": result.Response
					});
					toastEvent.fire();
					component.set("v.spinAs400", false);
				}
			} else {
				toastEvent.setParams({
					"type": "error",
					"title": "Error",
					"message": "Error al dar de alta los clientes"
				});
				toastEvent.fire();
				component.set("v.spinAs400", false);
			}
		});
		$A.enqueueAction(action);
	},
	triggerPhantomIntegration: function (cmp, event) {

	},
	getImg: function (url) {
		var variables = {};
		var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
			variables[key] = value;
		});
		return variables;
	},
	getImage: function (resource, name) {
		if (!resource || !name) return;
        console.log('name', name.toString());
        console.log('getImg', this.getImg(name.toString()));
		var src = '\"/resource/' + resource + '/' + this.getImg(name.toString())["file"].substring(0, 15) + '.png\"';
		var img = '<img src=' + src + ' style="height:55px; width:65px;" border="0"/>';
        return img;
    },

	/**
	 * @author Noe Vasquez 
	 * @param originalJSON json para ser procesado y convertido para la estructura EDG 
	 * @returns mappedJSON json convertido
	 */
	mapJSON_EDG: function (originalJSON) {
		let agreementCCode = '';
		const mappedJSON = {
			client: {
				identifier: originalJSON.entityCode,
				commercial_name: originalJSON.commercialName,
				business_name: originalJSON.businessName,
				fiscal: {
					key: {
						identifier: originalJSON.fiscalKeyId,
						value: originalJSON.fiscalKeyValue,
					},
					regimen_id: originalJSON.fiscalRegimenId,
					person_id: originalJSON.fiscalPersonId,
				},
				economic: {
					sector_id: originalJSON.economicSectorId,
					activity_id: originalJSON.economicActivityId || 0, // Ajustar conforme al catalogo no definido
				},
				partner_id: originalJSON.partnerId,
				country_id: originalJSON.countryId,
				business_unit_id: originalJSON.businessUnitId,
				external_references: originalJSON.externalReferences.map((ref) => ({
					identifier: ref.externalId,
					value: ref.value,
				})),
				contacts: originalJSON.contacts.map((contact) => ({
					identifier: contact.contactCode,
					title_id: contact.contactTitleId,
					name: contact.name,
					last_name: contact.lastName,
					email: contact.email,
					phone: contact.phone,
					mobile_number: contact.cellPhone,
					roles: contact.contactRoles.map((role) => ({
						identifier: role.contactRoleId,
					})),
				})),
				addresses: originalJSON.addresses.map((address) => ({
					identifier: address.addressCode,
					name: address.addressName,
					street: address.street,
					street_additional: address.streetOptional,
					internal_number: address.streetInternalNumber || 'S/N',
					external_number: address.streetExternalNumber,
					country_id: address.countryId,
					postal_code: {
						code: address.postalCodeId,
						is_active: address.isPostalCodeIdUsed,
					},
					zip: {
						code: address.zipCode,
						is_active: address.isZipCodeUsed,
						reference: address.zipReference,
					},
					type_id: address.addressTypeId,
					types: address.addressTypes.map((type) => ({
						identifier: type.addressTypeId,
					})),
				})),
				banks: originalJSON.banks.map((bank) => ({
					identifier: bank.bankAccountCode,
					type_id: bank.bankId,
					account_type_id: bank.bankAccountTypeId,
					country_id: bank.countryId,
					currency_id: bank.currencyId,
					account_name: bank.bankAccountName,
					account_number: bank.bankAccountNumber,
					other_fiscal_id: bank.clabeNumber,
				})),
				billings: originalJSON.billingEntities.map((billing) => ({ //billingEntities en JSON Original
					identifier: billing.billingEntityCode,
					name: billing.billingEntityName,
					bank_ref: billing.bankAccountCode,
					address: {
						delivery: billing.deliveryAddressCode,
						fiscal: billing.fiscalAddressCode,
					},
					complement: billing.billingComplementaryText,
					contacts: billing.billingEntityContacts.map((contact) => ({
						contact_ref: contact.contactCode,
					})),
				})),
				agreements: originalJSON.agreements.map((agreement) => {
					agreementCCode = agreement.agreementCode;
					return {
						identifier: agreementCCode,
						type_id: agreement.entityTypeId,
						warranty: {
							identifier: agreement.warrantyTypeId,
							amount: agreement.warrantyValue,
							start_date: agreement.warrantyStartDate,
							end_date: agreement.warrantyEndDate,
						},
						service_plan_id: agreement.servicePlanId,
						collector_id: agreement.collectorId,
						approver_id: agreement.approverId,
						currency_id: agreement.currencyId,
						credit_limit: agreement.creditLimit,
						number: agreement.agreementNumber,
						name: agreement.agreementName,
						created_date: agreement.agreementDate,
						start_date: agreement.startDate,
						end_date: agreement.endDate,
						conditions: originalJSON.agreementConditions.map((condition) => ({ // agreementConditions
							identifier: condition.agreementConditionCode,
							plan_type_id: condition.salePlanId,
							product_id: condition.productId,
							name: condition.name,
							start_date: condition.startDate,
							end_date: condition.endDate,
							billings: originalJSON.agreementBillings.map((billing) => ({//agreementBillings
								identifier: billing.agreementConditionCode,// agreementBillingCode
								billing_ref: billing.billingEntityCode,
								payment_method_id: billing.paymentMethodId,
								payment_condition_id: billing.payConditionId,
								name: billing.name,
								charges: originalJSON.agreementBillingCharges.map((charge) => ({ // agreementBillingCharges
									identifier: charge.chargeId,
									frecuency: {
										identifier: charge.chargeFrecuencyId,
										range: charge.chargeFrecuencyDay,
										application_id: charge.chargeFrecuencyApplicationId,
										application_day: charge.chargeFrecuencyApplicationDay,
									},
									payment: {
										days: charge.paymentDaysOfWeek,
										deadline_date: charge.paymentTermDays,
									},
									is_custom_name: charge.isCustomName,
									custom_name: charge.customName,
									price_type_id: charge.priceTypeId,
									price_table_code: charge.priceTableCode,
									amount: charge.price,
									discount: {
										identifier: charge.discountTypeId,
										table_code: charge.discountTableCode,
										value: charge.discount,
										start_date: charge.discountStartDate,
										end_date: charge.discountEndDate,
									},
									is_separated_invoice: charge.isSeparatedInInvoice,
									is_separated_group: charge.isSeparatedInGroup,
									separated_group_id: charge.separatedGroupingId,
									is_printed_group: charge.isPrintedInGroup,
									printed_group_id: charge.printedGroupingId,
									is_replicated_billing_group: charge.isReplicatedInBillingGroup,
								})),
							})),

							stepped_tables: originalJSON.agreementSteppedTables
						}))
					}
				}),
				accounts: originalJSON.accounts.map((account) => ({ //accounts
					identifier: account.accountCode,
					commercial_name: account.commercialName,
					business_name: account.businessName,
					is_fiscal_key: account.isEntityFiscalKey,
					fiscal: {
						key: {
							identifier: account.fiscalKeyId,
							value: account.fiscalKeyValue,
						},
						regimen_id: account.fiscalRegimenId, // NO se contempla en el JSON Original en la seccion de Account
						person_id: account.fiscalPersonId, // NO se contempla en el JSON Original en la seccion de Account
					},
					economic: {
						sector_id: account.economicSectorId, // NO se contempla en el JSON Original en la seccion de Account
						activity_id: account.economicActivityId, // NO se contempla en el JSON Original en la seccion de Account
					},
					account_type_id: account.accountTypeId, 
					segment_type_id: account.segmentTypeId, 
					brand_id: account.brandId,
					country_id: account.countryId,
					utc_zone_id: account.utcZoneId,
					tax_zone_id: account.taxZoneId,
					credit_limit: account.creditLimit,
					latitude: account.latitude,
					longitude: account.longitude,
					external_references: account.externalReferences.map((ref) => ({
						identifier: ref.externalId,
						value: ref.value,
					})),
					cost_centers: account.costCenters.map((center) => ({
						identifier: center.costerCenterCode,
						billing_ref: center.billingEntityCode,
						name: center.billingEntityName,
					})),
					delivery_sectors: account.deliverySectors.map((sector) => ({
						identifier: sector.deliverySectorCode,
						product_id: sector.productId,
						address_ref: sector.addressCode,
						name: sector.deliverySectorName,
						contacts: sector.deliverySectorContacts.map((contact) => ({
							contact_ref: contact.contactCode,
						})),
					})),
					products: account.products.map(product => ({
						identifier: product.productId,
						condition_ref: agreementCCode,
						items: product.items.map((item) => ({
							identifier: item.itemId,
							value: item.value
						}))
					})),
					users: account.users.map(user => ({
						contact_ref: user.contactCode,
						product_id: user.productId, 
						type_id: user.userTypeId,
						
					})),
					address: account.addresses.map((address) => ({
						address_ref: address.addressCode,
					})),
					contacts: account.contacts.map((contact) => ({
						contact_ref: contact.contactCode,
					})),
				})),
				corporations: originalJSON.corporations.map((corporation) => ({
					identifier: corporation.corporationCode,
					name: corporation.corporationName,
				}))
			}
		}
		return mappedJSON;
	},

	mapJSON_EDG_UPD: function (component, originalJSON) {
		var isRenegotiation = component.get("v.dataSource.Opportunity.RecordType.DeveloperName") == "RT_Renegotiation";
		console.log('SR-isRenegotiation', isRenegotiation);
		if(!isRenegotiation){
			return this.mapJSON_EDG_UPD_ACT1(originalJSON);
		}

		let refClientMercedes = window.mercedesClientReference;
		if(
			!refClientMercedes || !refClientMercedes.agreements || !refClientMercedes.agreements[0] ||
			!refClientMercedes.agreementBillings || !refClientMercedes.agreementBillings[0]
		) {
			return;
		}

		let agreementCode = refClientMercedes.agreements[0].agreementCode;
		let agreementCCode = refClientMercedes.agreementBillings[0].agreementConditionCode;
		

		let mappedJSON = {
			client: {
				identifier: originalJSON.entityCode,
				agreements: [{
					identifier: agreementCode, //agreementCode
					conditions: [{ // agreementConditions
						identifier: agreementCode, //agreementConditionCode -> agreementCode
						billings: [{//agreementBillings
							identifier: agreementCCode, //agreementBillingCode	-> agreementConditionCode | relaciona billingCondition c/ billingCharge (y c/ agreementCondition)							
							charges: originalJSON.agreementBillingCharges.map((charge) => ({ // agreementBillingCharges
								identifier: charge.chargeId,
								frecuency: {
									identifier: charge.chargeFrecuencyId,
									range: charge.chargeFrecuencyDay,
									application_id: charge.chargeFrecuencyApplicationId,
									application_day: charge.chargeFrecuencyApplicationDay,
								},
								payment: {
									days: charge.paymentDaysOfWeek,
									deadline_date: charge.paymentTermDays,
								},
								is_custom_name: charge.isCustomName,
								custom_name: charge.customName,
								price_type_id: charge.priceTypeId,
								price_table_code: charge.priceTableCode,
								amount: charge.price,
								discount: {
									identifier: charge.discountTypeId,
									table_code: charge.discountTableCode,
									value: charge.discount,
									start_date: charge.discountStartDate,
									end_date: charge.discountEndDate,
								},
								is_separated_invoice: charge.isSeparatedInInvoice,
								is_separated_group: charge.isSeparatedInGroup,
								separated_group_id: charge.separatedGroupingId,
								is_printed_group: charge.isPrintedInGroup,
								printed_group_id: charge.printedGroupingId,
								is_replicated_billing_group: charge.isReplicatedInBillingGroup,
								action_type: charge.action	
							}))
						}]
					}]
				}]
				// ,
				// accounts: originalJSON.accounts.map((account) => ({ //accounts
				// 	identifier: account.accountCode,
				// 	products: account.products.map(product => ({
				// 		identifier: product.productId,
				// 		condition_ref: agreementCCode,
				// 		items: product.items.map((item) => ({
				// 			identifier: item.itemId,
				// 			value: item.value
				// 		}))
				// 	}))
				// }))
			}
		};
		if(originalJSON.accounts){
			mappedJSON.accounts = originalJSON.accounts.map((account) => { 
				let nAccount = {
					identifier: account.accountCode,
				};
				if(account.action) {nAccount.action_type = account.action;}
				nAccount.products = account.products.map(product => {
					let nProduct = {
						identifier: product.productId
						// ,
						// condition_ref: agreementCCode
					};
					if(product.action) {nProduct.action_type = product.action;}
					nProduct.items = product.items.map((item) => {
						let nItem = {
							identifier: item.itemId,
							value: item.value
						};
						if(item.action) {nItem.action_type = item.action;}
						return nItem;
					});
					return nProduct;
				})
				return nAccount;
			});
		}
		console.log('SR-> accounts:', originalJSON.accounts);

		return mappedJSON;
	},

	mapJSON_EDG_UPD_ACT1: function (originalJSON) {

		let agreementCCode = '';
		
		let wrapper = {};
		let charges = [];
		let billings = [];
		let conditions = [];

		wrapper.contacts = [];
		wrapper.addresses = [];
		// wrapper.banks;
		wrapper.billings = [];
		wrapper.agreements = [];
		wrapper.accounts = [];
		wrapper.corporations = [];
		

		if(originalJSON.contacts){
			wrapper.contacts = originalJSON.contacts.map((contact) => {
				let nContact = {
					identifier: contact.contactCode,
					title_id: contact.contactTitleId,
					name: contact.name,
					last_name: contact.lastName,
					email: contact.email,
					phone: contact.phone,
					mobile_number: contact.cellPhone
				};
				if(contact.action) {nContact.action_type = contact.action;}
				nContact.roles = contact.contactRoles.map((role) => {
					let nRole = {
						identifier: role.contactRoleId,
					};
					if(role.action) {nRole.action_type = role.action;}
					return nRole;
				});
				return nContact;
			})
		}
		console.log('SR-> contacts:', originalJSON.contacts);
		if(originalJSON.billingEntities){
			wrapper.billings = originalJSON.billingEntities.map((billing) => { //billingEntities en JSON Original
				let nBilling = {	
					identifier: billing.billingEntityCode,
					name: billing.billingEntityName,
					bank_ref: billing.bankAccountCode,
					address: {
						delivery: billing.deliveryAddressCode,
						fiscal: billing.fiscalAddressCode,
					},
					complement: billing.billingComplementaryText
				};
				if(billing.action) {nBilling.action_type = billing.action;}
				
				nBilling.contacts = billing.billingEntityContacts.map((contact) => {
					let nContact = {
						contact_ref: contact.contactCode,
					};
					if(contact.action) {nContact.action_type = contact.action;}
					return nContact;
				});
				return nBilling;
			});
		}
		console.log('SR-> billingEntities:', originalJSON.billingEntities);
		if(originalJSON.agreementBillingCharges){
			charges = originalJSON.agreementBillingCharges.map((charge) => {
				let nCharge = {
					identifier: charge.chargeId,
					frecuency: {
						identifier: charge.chargeFrecuencyId,
						range: charge.chargeFrecuencyDay,
						application_id: charge.chargeFrecuencyApplicationId,
						application_day: charge.chargeFrecuencyApplicationDay,
					},
					payment: {
						days: charge.paymentDaysOfWeek,
						deadline_date: charge.paymentTermDays,
					},
					is_custom_name: charge.isCustomName,
					custom_name: charge.customName,
					price_type_id: charge.priceTypeId,
					price_table_code: charge.priceTableCode,
					amount: charge.price,
					discount: {
						identifier: charge.discountTypeId,
						table_code: charge.discountTableCode,
						value: charge.discount,
						start_date: charge.discountStartDate,
						end_date: charge.discountEndDate,
					},
					is_separated_invoice: charge.isSeparatedInInvoice,
					is_separated_group: charge.isSeparatedInGroup,
					separated_group_id: charge.separatedGroupingId,
					is_printed_group: charge.isPrintedInGroup,
					printed_group_id: charge.printedGroupingId,
					is_replicated_billing_group: charge.isReplicatedInBillingGroup
				};
				if(charge.action) {nCharge.action_type = charge.action;}
				return nCharge;
			});
		}
		if(originalJSON.agreementBillings){
			billings = originalJSON.agreementBillings.map((billing) => {//agreementBillings
				let nBilling = {
					identifier: billing.agreementConditionCode, //agreementBillingCode
					billing_ref: billing.billingEntityCode,
					payment_method_id: billing.paymentMethodId,
					payment_condition_id: billing.payConditionId,
					name: billing.name
					
				};
				if(billing.action) {nBilling.action_type = billing.action;}
				nBilling.charges = charges;
				return nBilling;
			});
		}
		if(originalJSON.agreementConditions){
			conditions = originalJSON.agreementConditions.map((condition) => {
				let nCondition = {
					identifier: condition.agreementConditionCode,
					plan_type_id: condition.salePlanId,
					product_id: condition.productId,
					name: condition.name,
					start_date: condition.startDate,
					end_date: condition.endDate
				};
				if(condition.action) {
					nCondition.action_type = condition.action;
				}
				nCondition.billings = billings;
				nCondition.stepped_tables = originalJSON.agreementSteppedTables;
				return nCondition;
			});
		}
		if(originalJSON.agreements){
			agreementCCode = originalJSON.agreements[0].agreementCode;
			wrapper.agreements = originalJSON.agreements.map((agreement) => {
				let nAgrmnt = {
					identifier: agreementCCode,
					type_id: agreement.entityTypeId,
					warranty: {
						identifier: agreement.warrantyTypeId,
						amount: agreement.warrantyValue,
						start_date: agreement.warrantyStartDate,
						end_date: agreement.warrantyEndDate,
					},
					service_plan_id: agreement.servicePlanId,
					collector_id: agreement.collectorId,
					approver_id: agreement.approverId,
					currency_id: agreement.currencyId,
					credit_limit: agreement.creditLimit,
					number: agreement.agreementNumber,
					name: agreement.agreementName,
					created_date: agreement.agreementDate,
					start_date: agreement.startDate,
					end_date: agreement.endDate
				};
				if(agreement.action) {nAgrmnt.action_type = agreement.action;}
				nAgrmnt.conditions = conditions;
				return nAgrmnt;
			});
		}
		console.log('SR-> agreements:', originalJSON.agreements);
		if(originalJSON.accounts){
			wrapper.accounts = originalJSON.accounts.map((account) => { 
				let nAccount = {
					identifier: account.accountCode,
					commercial_name: account.commercialName,
					business_name: account.businessName,
					is_fiscal_key: account.isEntityFiscalKey,
					fiscal: {
						key: {
							identifier: account.fiscalKeyId,
							value: account.fiscalKeyValue,
						},
						regimen_id: account.fiscalRegimenId, // NO se contempla en el JSON Original en la seccion de Account
						person_id: account.fiscalPersonId, // NO se contempla en el JSON Original en la seccion de Account
					},
					economic: {
						sector_id: account.economicSectorId, // NO se contempla en el JSON Original en la seccion de Account
						activity_id: account.economicActivityId, // NO se contempla en el JSON Original en la seccion de Account
					},
					account_type_id: account.accountTypeId, 
					segment_type_id: account.segmentTypeId, 
					brand_id: account.brandId,
					country_id: account.countryId,
					utc_zone_id: account.utcZoneId,
					tax_zone_id: account.taxZoneId,
					credit_limit: account.creditLimit,
					latitude: account.latitude,
					longitude: account.longitude
				};
				if(account.action) {nAccount.action_type = account.action;}
				nAccount.external_references = account.externalReferences.map((ref) => {
					let nExRef = {
						identifier: ref.externalId,
						value: ref.value
					};
					if(ref.action) {nExRef.action_type = ref.action;}
					return nExRef;
				});
				nAccount.cost_centers = account.costCenters.map((center) => {
					let nCenter = {
						identifier: center.costerCenterCode,
						billing_ref: center.billingEntityCode,
						name: center.billingEntityName
					};
					if(center.action) {nCenter.action_type = center.action;}
					return nCenter;
				});
				nAccount.delivery_sectors = account.deliverySectors.map((sector) => {
					let nSector = {
						identifier: sector.deliverySectorCode,
						product_id: sector.productId,
						address_ref: sector.addressCode,
						name: sector.deliverySectorName
					};
					if(sector.action) {nSector.action_type = sector.action;}
					nSector.contacts = sector.deliverySectorContacts.map((contact) => {
						let nContact = {
							contact_ref: contact.contactCode
						};
						if(contact.action) {nContact.action_type = contact.action;}
						return nContact;
					});
					return nSector;
				}),
				nAccount.products = account.products.map(product => {
					let nProduct = {
						identifier: product.productId,
						condition_ref: agreementCCode
					};
					if(product.action) {nProduct.action_type = product.action;}
					nProduct.items = product.items.map((item) => {
						let nItem = {
							identifier: item.itemId,
							value: item.value
						};
						if(item.action) {nItem.action_type = item.action;}
						return nItem;
					});
					return nProduct;
				}),
				nAccount.users = account.users.map(user => {
					let nUsr = {
						contact_ref: user.contactCode,
						product_id: user.productId, 
						type_id: user.userTypeId
					};
					if(user.action) {nUsr.action_type = user.action;}
					return nUsr;
				}),
				nAccount.address = account.addresses.map((address) => {
					let nAddr = {
						address_ref: address.addressCode
					};
					if(address.action) {nAddr.action_type = address.action;}
					return nAddr;
				}),
				nAccount.contacts = account.contacts.map((contact) => {
					let nContact = {
						contact_ref: contact.contactCode
					};
					if(contact.action) {nContact.action_type = contact.action;}
					return nContact;
				});
				return nAccount;
			});
		}
		console.log('SR-> accounts:', originalJSON.accounts);

		const mappedJSON = {
			client: {
				identifier: originalJSON.entityCode,
				contacts: wrapper.contacts,
				addresses: wrapper.addresses,
				billings: wrapper.billings,
				agreements: wrapper.agreements,
				accounts: wrapper.accounts,
				corporations: wrapper.corporations
			}
		};

		return mappedJSON;
	}

    //6298 >> (Descomentar función y la ',' de arriba si se activa Tarjetas Virtuales)
    // setTitleName: function(component) {
    //     var tipoReg = component.get("v.dataSource.Opportunity.RecordType.DeveloperName");
    //     var IsAffiliate = component.get("v.dataSource.Product2__c.IsAffiliate__c");
    //     var name = " ";
    //     if(IsAffiliate){
    //         name = "Formato Alta Merchant";
    //     }else{
    //         if (tipoReg.includes('Activacion_Servicio')){
    //             name = "Formato Alta de Servicio";
    //         } else {
    //             name = "Formato Alta Cliente";
    //         }
    //     }
    //     component.set('v.titleFormato', name);
    // }
    // << 6298

	
	//--------------------------------------------- // NO SE REFERENCIA EN CMP
	// save: function (component, dataSource) { 
	// 	var toastEvent = $A.get("e.force:showToast");
	// 	var action = component.get("c.updateContratoADV");
	// 	var res;
	// 	component.set("v.btnActionSave", true);
	// 	if (dataSource.Opportunity.Familia__c == 'Benefits') { 
	// 		dataSource.Opportunity.StageName = 'Ganada' 
	// 	}
	// 	else { 
	// 		dataSource.Opportunity.StageName = 'Implementación'; 
	// 	}

    //     action.setParams({
	// 		jsonContrato: JSON.stringify(dataSource.Contrato2__c),
	// 		jsonOportunidad: JSON.stringify(dataSource.Opportunity)
	// 	})
	// 	action.setCallback(this, function (response) {
	// 		var state = response.getState();
	// 		if (state == 'SUCCESS') {
	// 			res = response.getReturnValue();
	// 			if (res.Code == '0') {
	// 				toastEvent.setParams({
	// 					"duration": "15000",
	// 					"type": "success",
	// 					"title": "¡Éxito!",
	// 					"message": res.Response
	// 				});
	// 			}
	// 			else {
	// 				toastEvent.setParams({
	// 					"duration": "15000",
	// 					"type": "error",
	// 					"title": "Error",
	// 					"message": res.Response
	// 				});
	// 			}
	// 			toastEvent.fire();
	// 		}
	// 		else {
	// 			toastEvent.setParams({
	// 				"duration": "15000",
	// 				"type": "warning",
	// 				"title": "Advertencia",
	// 				"message": "Error al guardar la informacion"
	// 			});
	// 			toastEvent.fire();
	// 		}
	// 		component.set("v.btnActionSave", false);
	// 	})
	// 	$A.enqueueAction(action);
	// 	//console.log('Contrato: ',contrato.CodigoAS400__c);
	// }
	
	// getPrincipalContratoFilial: function(component, contrato) {

	// 	return new Promise((resolve, reject) => {
	// 		const contratoId = contrato.Contrato2__c.Id;
	// 		let queryCF = "SELECT Id, Name, PlatformAdministrator__r.Name, RFC__c, Razon_Social__c, PlatformAdministrator__r.Email, Contrato_2__c, Entidad_Cuenta__c, "+
	// 		"Entidad_Cuenta__r.EntidadLegal__c, Entidad_Cuenta__r.EntidadLegal__r.Id, Entidad_Cuenta__r.EntidadLegal__r.RecordType.Name, Entidad_Cuenta__r.EntidadLegal__r.Name, "+
	// 		"Entidad_Cuenta__r.EntidadLegal__r.RazonSocial__c, Entidad_Cuenta__r.EntidadLegal__r.Estatus__c, Entidad_Cuenta__r.EntidadLegal__r.Direccion__c, CodigoAS400__c, "+
	// 		"Entidad_Cuenta__r.cuenta__r.Name, Entidad_Cuenta__r.cuenta__r.Type, PlatformAdministrator__c, " +
	// 		"GLB_Unique_ID_Generator__c, GLB_ID_Cuenta__c " +
	// 		"FROM ContratoFilial__c WHERE Contrato_2__c = '" + contratoId + "' and isPrime__c = true AND Distintivo__c = 'Principal' LIMIT 1";
	// 		console.log("queryCF --> ", queryCF);

	// 		var actionCF = component.get("c.executeQuery");

	// 		actionCF.setParams({
	// 			query: queryCF
	// 		});
	
	// 		actionCF.setCallback(this, function (response) {
	// 			var state = response.getState();
	// 			if (state === 'SUCCESS') {
	// 				var returnedValue = response.getReturnValue()[0];
	// 				contrato.EntidadLegal.GLB_ID_Cuenta__c = returnedValue.GLB_ID_Cuenta__c;
	// 				resolve(); // Resuelve la promesa una vez que la operación ha sido exitosa.
	// 			} else {
	// 				console.log('Error: ', response.getError());
	// 				reject(); // Rechaza la promesa en caso de error.
	// 			}
	// 		});
	
	// 		$A.enqueueAction(actionCF);
	// 	});

	// }
})