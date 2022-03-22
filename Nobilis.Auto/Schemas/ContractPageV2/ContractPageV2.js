define("ContractPageV2", ["MoneyModule", "MultiCurrencyEdit",
 "MultiCurrencyEditUtilities"], function(MoneyModule,
	 MultiCurrencyEdit, MultiCurrencyEditUtilities) {
	return {
		entitySchemaName: "Contract",
		attributes: {
			"NsCurrency": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
					"columns": ["Division", "Symbol"]
				}
			},
			"CurrencyRate": {
				"dataValueType": this.Terrasoft.DataValueType.FLOAT,
				"dependencies": [
					{
						"columns": ["NsCurrency"],
						"methodName": "setCurrencyRate"
					}
				]
			},
			"Amount": {
				"dataValueType": this.Terrasoft.DataValueType.FLOAT,
				"dependencies": [
					{
						"columns": ["CurrencyRate", "NsCurrency"],
						"methodName": "recalculateAmount"
					}
				]
			},
			"PrimaryAmount": {
				"dependencies": [
					{
						"columns": ["Amount"],
						"methodName": "recalculatePrimaryAmount"
					}
				]
			},
			"Currency": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
					"columns": ["Division"]
				},
				"dependencies": [
					{
						"columns": ["Currency"],
						"methodName": "onVirtualCurrencyChange"
					}
				]
			},
			"CurrencyRateList": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				value: this.Ext.create("Terrasoft.Collection")
			},
			"CurrencyButtonMenuList": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				value: this.Ext.create("Terrasoft.BaseViewModelCollection")
			},
			"AmountModel": {
				dependencies: [
					{
						"columns": ["NsModel"],
						"methodName": "setAmountModel"
					}
				]
			},
			"isCreditEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				"value":false,                    
			},
			"NsCreditProgram": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
					"filters": [
						function() {
							var model = this.get("NsModel").value;
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							filterGroup.add(
                                Terrasoft.createColumnFilterWithParameter(
                                    Terrasoft.ComparisonType.EQUAL,
                                    "[NsModelInCreditDetail:CreditProgram].Model",
                                    model));
							filterGroup.add(
							Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"IsActual",
								true));
							return filterGroup;
						}
					]
				}
			},
			"NsNumber": {
				dependencies: [
					{
						"columns": ["Number"],
			 			"methodName": "setNumber"
					}
				]
			}
		},
		mixins: {
			MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities"
		},
		messages: {
			"GetButtonIsEnabled": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"InvoiceDetailV2bd268b30": {
				"schemaName": "InvoiceDetailV2",
				"entitySchemaName": "Invoice",
				"filter": {
					"detailColumn": "Contract",
					"masterColumn": "Id"
				}
			},
			"Schema4b3fc533Detail748fcae8": {
				"schemaName": "Schema4b3fc533Detail",
				"entitySchemaName": "NsInfoPartiesAgree",
				"filter": {
					"detailColumn": "Contracts",
					"masterColumn": "Id"
				}
			},
			"NsScContractTermsDet": {
				"schemaName": "Schemab77053dbDetail",
				"entitySchemaName": "NsTermContract",
				"filter": {
					"detailColumn": "Contract",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Parent": {
				"FiltrationParentByAccount": {
					"uId": "8dde58fd-8c8f-4149-8786-e3e610a279b1",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Account",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": true,
					"type": 1,
					"attribute": "Account"
				},
				"FiltrationParentBySupplier": {
					"uId": "b2241f10-64bd-491c-b420-cabaf08a4a64",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "OurCompany",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": true,
					"type": 1,
					"attribute": "OurCompany"
				},
				"FiltrationParentByParent": {
					"uId": "471469a6-94c0-4894-a97e-c9c35ddec94a",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Id",
					"comparisonType": 4,
					"autoClean": false,
					"autocomplete": false,
					"type": 1,
					"attribute": "Id"
				}
			},
			"OurCompany": {
				"FiltrationByType": {
					"uId": "8b7dbf0c-8181-4fcb-9bf6-7d3370315456",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "57412FAD-53E6-DF11-971B-001D60E938C6"
				}
			},
			"SupplierBillingInfo": {
				"FiltrationSupplierBillingByAccount": {
					"uId": "24f9fb22-7fd3-4dc3-8cfd-6369d6c6ba1e",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Account",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": true,
					"type": 1,
					"attribute": "OurCompany"
				},
				"BindParameterEnabledSupplierBillingInfoToSupplier": {
					"uId": "7fe3c7ac-f1b7-43bc-a45f-fd4c54a0151d",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "OurCompany"
							}
						}
					]
				}
			},
			"CustomerBillingInfo": {
				"BindParameterEnabledCustomerBillingInfoToAccount": {
					"uId": "4179c969-268f-4d41-ab4b-eddd1805111d",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "Account"
							}
						}
					]
				}
			},
			"Contact": {
				"FiltrationContactByAccount": {
					"uId": "9a751ee4-65d2-4681-8c47-67058f5276aa",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Account",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "Account"
				},
				"1e56dca0-70ab-4081-a9b0-4e400058158f": {
					"uId": "1e56dca0-70ab-4081-a9b0-4e400058158f",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "00783ef6-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			},
			"NsCreditPeriod": {
				"2dfc827b-1b70-44e4-8871-e289f2c40ebd": {
					"uId": "2dfc827b-1b70-44e4-8871-e289f2c40ebd",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NsCreditProgram"
							}
						}
					]
				}
			},
			"NsCreditAmount": {
				"3fff2d43-254d-4cfb-9433-9e57006c157b": {
					"uId": "3fff2d43-254d-4cfb-9433-9e57006c157b",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NsCreditProgram"
							}
						}
					]
				}
			},
			"NsModel": {
				"b7b6d5a8-82ef-4c09-99fa-0f536ce8ab61": {
					"uId": "b7b6d5a8-82ef-4c09-99fa-0f536ce8ab61",
					"enabled": true,
					"removed": true,
					"ruleType": 1,
					"baseAttributePatch": "NsCreditProgram",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": true,
					"type": 1,
					"attribute": "NsCreditProgram"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.set("Currency", this.get("NsCurrency"), {silent: true});
				this.mixins.MultiCurrencyEditUtilities.init.call(this);
				var argument=this.isCreditSet();
				this.sandbox.publish("GetButtonIsEnabled", argument, null);
			},
			init: function() {
				this.callParent(arguments);
				this.on("change:AmountModel", this.setAmountModel, this);
				this.on("change:NsCreditProgram", this.isCredit, this);
			},
			setCurrencyRate: function() {
				MoneyModule.LoadCurrencyRate.call(this, "NsCurrency", "CurrencyRate", this.get("StartDate"));
			},
			recalculateAmount: function() {
				var currency = this.get("NsCurrency");
				var division = currency ? currency.Division : null;
				MoneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
				MoneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "NsCreditAmount", "PrimaryAmount", division);
			},
			recalculatePrimaryAmount: function() {
				var currency = this.get("NsCurrency");
				var division = currency ? currency.Division : null;
				MoneyModule.RecalcBaseValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
				MoneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "NsCreditAmount", "PrimaryAmount", division);
			},
			onVirtualCurrencyChange: function() {
				var currency = this.get("Currency");
				this.set("NsCurrency", currency);
			},
			isCreditSet: function() {
				return this.get("NsCreditProgram") ? true : false;
			},
			onOpenCreditClick: function() {
                var creditObject = this.get("NsCreditProgram");
                if (creditObject) {
                    var creditObjectId = creditObject.value;
                    var requestUrl = "CardModuleV2/NsCreditProgram1Page/edit/" + creditObjectId;
                    this.sandbox.publish("PushHistoryState", {
                        hash: requestUrl
                    });
                }
            },
			setAmountModel: function() {
				var model=this.get("NsModel");
				var summa=0;
				if (model) {
					var modelId=model.value;
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "NsModel"});
					esq.addColumn("Summa");
					esq.addColumn("Id");
					var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Id", modelId));
					esq.filters.add("filter1", filter1);
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							this.showInformationDialog("Ошибка, обратитесь к администратору :*(");
							return;
						}
						result.collection.each(function (item) {
							summa=item.get("Summa");
							return summa;
						});
						this.set("Amount", summa);
					}, this);
				}
			},
			isCredit: function() {
				var creditProgram = this.get("NsCreditProgram");
				if (creditProgram) {
					this.$isCreditEnabled = true;
				} else {
					this.$isCreditEnabled = false;
				}
			},
			setNumber: function() {
				var number=this.get("Number");
				this.set("Number", number.replace(/[^-\d]+/g,"").replace( /^([^\-]*\-)|\-/g, '$1' ));
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "CreditButton",
				"values": {
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.NsOpenCreditButtonCaption"
					},
					"click": {
						"bindTo": "onOpenCreditClick"
					},
					"enabled": {
						"bindTo": "isCreditSet"
					},
					"style": "blue"
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "merge",
				"name": "Number",
				"values": {
					"tip": {
						"content": {
							"bindTo": "Resources.Strings.NsNumberHint"
						},
						"displayMode": "wide"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Amount",
				"values": {
					"bindTo": "Amount",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"primaryAmount": "PrimaryAmount",
					"currency": "NsCurrency",
					"rate": "CurrencyRate",
					"primaryAmountEnabled": false,
					"generator": "MultiCurrencyEditViewGenerator.generate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NsIsPaid",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"bindTo": "NsIsPaid",
					"textSize": 0,
					"contentType": 3,
					"labelConfig": {
						"visible": true
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NsCommonInfoTabCaption"
					},
					"order": 0
				}
			},
			{
				"operation": "insert",
				"name": "NsModel",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"bindTo": "NsModel",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"bindTo": "StartDate",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "Contact",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "EndDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"bindTo": "EndDate",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NsDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"bindTo": "NsDate",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Type",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					},
					"bindTo": "Type",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "State",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"bindTo": "State",
					"enabled": true
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Activities",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Schema4b3fc533Detail748fcae8",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NsScContractTermsDet",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NsCreditTab",
				"values": {
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.NsCreditTab"
					},
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NsCreditTabGroup",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NsCreditTabGroupGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "NsCreditTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NsCreditTabGridLayout",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "NsCreditTabGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NsCreditProgram",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "NsCreditTabGridLayout"
					},
					"bindTo": "NsCreditProgram"
				},
				"parentName": "NsCreditTabGridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NsCreditAmount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "NsCreditTabGridLayout"
					},
					"bindTo": "NsCreditAmount",
					"primaryAmount": "PrimaryAmount",
					"currency": "NsCurrency",
					"rate": "CurrencyRate",
					"primaryAmountEnabled": false,
					"generator": "MultiCurrencyEditViewGenerator.generate",
					"enabled": {
						"bindTo": "isCreditEnabled"
					}
				},
				"parentName": "NsCreditTabGridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NsCreditPeriod",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "NsCreditTabGridLayout"
					},
					"bindTo": "NsCreditPeriod",
					"enabled": {
						"bindTo": "isCreditEnabled"
					}
				},
				"parentName": "NsCreditTabGridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NsFirstAmount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "NsCreditTabGridLayout"
					},
					"bindTo": "NsFirstAmount",
					"enabled": {
						"bindTo": "isCreditEnabled"
					}
				},
				"parentName": "NsCreditTabGridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NsFactAmount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "NsCreditTabGridLayout"
					},
					"bindTo": "NsFactAmount",
					"enabled": {
						"bindTo": "isCreditEnabled"
					}
				},
				"parentName": "NsCreditTabGridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "InvoiceTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.InvoiceTabLabelTabCaption"
					},
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "InvoiceDetailV2bd268b30",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "InvoiceTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "StartDate"
			},
			{
				"operation": "remove",
				"name": "Type"
			},
			{
				"operation": "remove",
				"name": "EndDate"
			},
			{
				"operation": "remove",
				"name": "State"
			},
			{
				"operation": "remove",
				"name": "Account"
			},
			{
				"operation": "remove",
				"name": "CustomerBillingInfo"
			},
			{
				"operation": "remove",
				"name": "OurCompany"
			},
			{
				"operation": "remove",
				"name": "SupplierBillingInfo"
			},
			{
				"operation": "remove",
				"name": "ContractConnectionsGroup"
			},
			{
				"operation": "remove",
				"name": "ContractConnectionsBlock"
			},
			{
				"operation": "remove",
				"name": "Parent"
			},
			{
				"operation": "remove",
				"name": "SubordinateContracts"
			},
			{
				"operation": "remove",
				"name": "HistoryTab"
			},
			{
				"operation": "remove",
				"name": "Activities"
			},
			{
				"operation": "remove",
				"name": "EmailDetailV2"
			},
			{
				"operation": "remove",
				"name": "ContractVisaTab"
			},
			{
				"operation": "remove",
				"name": "ContractPageVisaTabContainer"
			},
			{
				"operation": "remove",
				"name": "ContractPageVisaBlock"
			},
			{
				"operation": "remove",
				"name": "Visa"
			},
			{
				"operation": "remove",
				"name": "NotesAndFilesTab"
			},
			{
				"operation": "remove",
				"name": "Files"
			},
			{
				"operation": "remove",
				"name": "ContractNotesControlGroup"
			},
			{
				"operation": "remove",
				"name": "Notes"
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "remove",
				"name": "ESNFeedContainer"
			},
			{
				"operation": "remove",
				"name": "ESNFeed"
			},
			{
				"operation": "remove",
				"parentName": "GeneralInfoTab",
				"name": "ContractSumGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {
						"bindTo": "Resources.Strings.ContractSumCaption"
					},
					"controlConfig": {
						"collapsed": false
					},
					"items": []
				},
				"index": 1
			},
			{
				"operation": "remove",
				"name": "ContractPassportTab",
				"values": {
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.ContractPassportTab"
					}
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "Number",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Number",
					"textSize": 0,
					"labelConfig": {
						"visible": true
					},
					"enabled": true,
					"tip": {
						"content": { "bindTo": "Resources.Strings.NsNumberHint" },
						"displayMode": Terrasoft.controls.TipEnums.displayMode.WIDE
					},
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
		]/**SCHEMA_DIFF*/
	};
});
