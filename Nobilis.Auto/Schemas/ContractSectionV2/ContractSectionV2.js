  define("ContractSectionV2", ["ContractSectionV2"], function(ContractSectionV2) {
	return {
		entitySchemaName: "Contract",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			"IsButtonEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,                    
			},
			"IsActionEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				"value":false,                    
			},
			"obj": {
				amount: 0,
				factAmount: 0
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
                "parentName": "CombinedModeActionButtonsCardLeftContainer",
                "propertyName": "items",
                "name": "CreditButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": {"bindTo": "Resources.Strings.NsOpenCreditButtonCaption"},
                    "click": {"bindTo": "onOpenCredit"},
                    "enabled": {"bindTo": "IsButtonEnabled"},
                    "style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"visible":{"bindTo": "isVisibleButt"},
                }
			}
		]/**SCHEMA_DIFF*/,
		messages: {		
			"GetButtonIsEnabled": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},	
		},
		methods: {
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
			isVisibleButt: function() {
				if (this.get("IsCardVisible")) {
					return true;
				}
				return false;
			},
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.$IsButtonEnabled = false;
				this.sandbox.subscribe("GetButtonIsEnabled", this.setButtonIsEnabled, this, null);
			},
			setButtonIsEnabled: function(value){
				this.$IsButtonEnabled = value;
			},
			onOpenCredit: function() {
                if (this.get("IsCardVisible")) {
					this.sandbox.publish("OnCardAction", "onOpenCreditClick", [this.getCardModuleSandboxId()]);
				}
            },
			isRunning: function(activeRowId) {
                var gridData = this.get("GridData");
                var selectedContract = gridData.get(activeRowId);
				var ContractId=selectedContract.get("Id");
				var Amount=""
				var NsFactAmount=""
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Contract"});
				esq.addColumn("Amount");
				esq.addColumn("NsFactAmount");
				var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
					"Id", ContractId));
				esq.filters.add("filter1", filter1);
				esq.getEntityCollection(function(result) {
					if (result.success) {
						result.collection.each(function (item) {
						Amount=item.get("Amount");
						NsFactAmount=item.get("NsFactAmount");
						});
					}
					this.$obj = {
						amount: Amount,
						factAmount: NsFactAmount
					}
				}, this);
				return this.$obj;
            },
            isActionEnabled: function() {
                var activeRowId = this.get("ActiveRow");
				if (activeRowId) {
					var item=this.isRunning(activeRowId);
					if (item && item.factAmount!=0 && item.amount!=0) {
							return true;
						} else {
							return false;
					}
				} else {
					return false;
				}
            },
            showSumInfo: function() {
                var activeRowId = this.get("ActiveRow");
				var item=this.isRunning(activeRowId);
				var ContractAmount = item.amount;
				var CreditAmount = item.factAmount;
				var message = "";
				message += "Оплаченная сумма по договору " + CreditAmount + " из " + ContractAmount + ".";
                this.showInformationDialog(message);
            },
            getSectionActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getButtonMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));
                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": {bindTo: "Resources.Strings.NsAmountPaidAction"},
                    "Click": {bindTo: "showSumInfo"},
                    "Enabled": {bindTo: "isActionEnabled"}
                }));
                return actionMenuItems;
            }
		}
	};
});