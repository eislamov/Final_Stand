  define("InvoicePageV2", ["BusinessRuleModule", "RightUtilities",
  "ProcessModuleUtilities"], function(BusinessRuleModule, RightUtilities, 
	ProcessModuleUtilities) {
	return {
		entitySchemaName: "Invoice",
		attributes: {
			"FieldsRights": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				"value":true,
			},
			"IsPaid": {
				dependencies: [
					{
						"columns": ["NsIsPaid"],
			 			"methodName": "setEnebledFields"
					}
				]
			},
			"Client": {
				"caption": {"bindTo": "Resources.Strings.Client"},
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"multiLookupColumns": ["Owner"],
				"isRequired": false
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"CustomerBillingInfo": {
				"FiltrationCustomerBillingInfoByAccount": {
					"uId": "69f3cfa3-c844-4094-9b27-4687fe8836ba",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Account",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "Account"
				},
				"BindParameterEnabledCustomerBillingInfoToAccount": {
					"uId": "a5f96c50-1dbf-47a0-920e-234caeed10a7",
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
			"SupplierBillingInfo": {
				"FiltrationSupplierBillingInfoByAccount": {
					"uId": "01534c8b-0818-4b36-9660-711a35f6062c",
					"enabled": false,
					"ruleType": 1,
					"baseAttributePatch": "Account",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "Supplier"
				},
				"BindParameterEnabledSupplierBillingInfoToSupplier": {
					"uId": "a8e07695-a24c-4ad6-b764-61e983b56723",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "Supplier"
							}
						}
					]
				}
			},
			"Order": {
				"EnableOrderByOrderEnabled": {
					"uId": "15b03eb9-5cc9-4ecb-942a-b554fc75a203",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "OrderEnabled"
							},
							"rightExpression": {
								"type": 0,
								"value": true
							}
						}
					]
				}
			},
			"Contract": {
				"FiltrationContractByAccount": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"enabled": false,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Account",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Account"
				},
				"FiltrationContractByContact": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"enabled": false,
					"autoClean": true,
					"baseAttributePatch": "Contact",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Contact"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			init: function() {
				const operationNames = [
					"CanChangeInvoiceFields" //Здесь через запятую нужно перечислить все системные операции, которые нужно проверить
				];
				RightUtilities.checkCanExecuteOperations(operationNames, function(result) {
					this.set("FieldsRights", result.CanChangeInvoiceFields); // "FieldsRights" - название атрибута, в который мы передаем результат проверки
				}, this);  // CanChangeContactFields - проверку по какой операции мы передаем в атрибут
				this.callParent(arguments);
			},
			setEnebledFields: function() {
				if (this.get("NsIsPaid")) {
					this.$FieldsRights = false;
				}
			},
			asyncValidate: function(callback, scope) {
				this.callParent([function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					Terrasoft.chain(
						function(next) {
							this.validateAccountOrContactFilling(function(response) {
								if (this.validateResponse(response)) {
									next();
								}
						}, this);
					},
					function(next) {
						callback.call(scope, response);
							next();
					}, this);
					}, this]);
			},
			validateAccountOrContactFilling: function(callback, scope) {
				var result = {
					success: true
				};
				callback.call(scope || this, result);
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Number",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "StartDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "insert",
				"name": "Contract",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Contract",
					"enabled": {
						"bindTo": "FieldsRights"
					},
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "InvoicePageGeneralTabContainer",
				"values": {
					"order": 0
				},
				"enabled": {
					"bindTo": "FieldsRights"
				},
			},
			{
				"operation": "remove",
				"name": "Client",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "remove",
				"name": "Client",
				"properties": [
					"tip"
				]
			},
			{
				"operation": "merge",
				"name": "CustomerBillingInfo",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "move",
				"name": "CustomerBillingInfo",
				"parentName": "InvoicePageGeneralBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "Supplier",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "SupplierBillingInfo",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "Amount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "PaymentStatus",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "DueDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "PaymentAmount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "merge",
				"name": "RemindToOwner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "RemindToOwnerDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "InvoiceProductsTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "merge",
				"name": "InvoiceVisaTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "InvoiceHistoryTab",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "merge",
				"name": "InvoiceFileNotesTab",
				"values": {
					"order": 3
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "remove",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Order",
				"values": {
					"bindTo": "Order",
					"layout": {"column": 12, "row": 1, "colSpan": 12},
					"tip": {
						"content": {"bindTo": "Resources.Strings.OrderTip"}
					}
				}
			},
			{
				"operation": "remove",
				"name": "Client",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "remove",
				"name": "Supplier",
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
				"operation": "remove",
				"parentName": "InvoicePageGeneralBlock",
				"propertyName": "items",
				"name": "CustomerBillingInfo",
				"values": {
					"bindTo": "CustomerBillingInfo",
					"layout": {"column": 12, "row": 0, "colSpan": 12},
					"tip": {
						"content": {"bindTo": "Resources.Strings.CustomerBillingInfoTip"}
					},
					"caption": {"bindTo": "Resources.Strings.ClientDetails"},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "remove",
				"parentName": "InvoicePageGeneralBlock",
				"propertyName": "items",
				"name": "SupplierBillingInfo",
				"values": {
					"bindTo": "SupplierBillingInfo",
					"layout": {"column": 12, "row": 1, "colSpan": 12},
					"tip": {
						"content": {"bindTo": "Resources.Strings.SupplierBillingInfoTip"}
					},
					"caption": {"bindTo": "Resources.Strings.SupplierDetails"},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "remove",
				"parentName": "InvoicePageGeneralTabContainer",
				"name": "PaymentControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {"bindTo": "Resources.Strings.PaymentGroupCaption"},
					"items": [],
					"controlConfig": {
						"collapsed": false
					}
				}
			},
			{
				"operation": "remove",
				"parentName": "InvoicePageGeneralTabContainer",
				"propertyName": "items",
				"name": "EntityConnections",
				"values": {
					itemType: Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "remove",
				"parentName": "InvoicePageGeneralTabContainer",
				"name": "RemindControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {"bindTo": "Resources.Strings.RemindControlGroupCaption"},
					"controlConfig": {
						"collapsed": false
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "InvoicePageSumBlock",
				"name": "NsIsPaid",
				"propertyName": "items",
				"values": {
					"bindTo": "NsIsPaid",
					"layout": {"column": 12, "row": 0, "colSpan": 12},
					"enabled": {
						"bindTo": "FieldsRights"
					},
				}
			},
			{
				"operation": "remove",
				"name": "InvoiceProductsTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.InvoiceProductsTabCaption"},
					"items": []
				},
				"index": 1
			},
			{
				"operation": "remove",
				"name": "InvoiceVisaTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.InvoiceVisaTabCaption"},
					"items": []
				},
				"index": 2
			},
			{
				"operation": "remove",
				"name": "InvoiceFileNotesTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.InvoiceFileNotesTabCaption"},
					"items": []
				},
				"index": 4
			},
			{
				"operation": "remove",
				"name": "ESNTab",
				"values": {
					"order": 5
				}
			},
		]/**SCHEMA_DIFF*/
	};
});
