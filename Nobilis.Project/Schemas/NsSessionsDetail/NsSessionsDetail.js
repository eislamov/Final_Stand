define("NsSessionsDetail", ["ServiceHelper", "ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilitiesV2"], function(ServiceHelper) {
	return {
		entitySchemaName: "NsSessions",
		attributes: {
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
		},
		mixins: {
			ConfigurationGridUtilitiesV2: "Terrasoft.ConfigurationGridUtilitiesV2"
		},
		methods: {
			onActiveRowAction: function(buttonTag, primaryColumnValue) {
				this.mixins.ConfigurationGridUtilitiesV2.onActiveRowAction.call(this, buttonTag, primaryColumnValue);
			},
			
			addToolsButtonMenuItems: function(toolsButtonMenu) {
				this.addRecordOperationsMenuItems(toolsButtonMenu);
				this.addGridOperationsMenuItems(toolsButtonMenu);
				if (this.useDetailWizard) {
					this.Ns_addDetailWizardAdd5Record(toolsButtonMenu);
				}
			},
			Ns_addDetailWizardAdd5Record: function(toolsButtonMenu) {
				toolsButtonMenu.addItem(this.getButtonMenuSeparator());
				toolsButtonMenu.add("WizardMenuItem", this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.NsAdd5RecordSession"},
					Click: {"bindTo": "Ns_ClickButtAdd5Record"},
					Visible: true
				}));
			},

			Ns_ClickButtAdd5Record: function(result) {
				this.showConfirmationDialog(this.get("Resources.Strings.NsAdd5RecordSessionMessage"), function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						//this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
						this.Ns_Add5RecordLookUp();
					}
				}, ["yes", "no"]);
			},

			Ns_Add5RecordLookUp:function() {
				var config = {
					entitySchemaName: "NsPeriodTreatment",
					multiSelect: false,
					columns: ["Id"],
				}
				this.openLookup(config, this.Ns_Add5Record, this);
			},

			Ns_Add5Record:function(values, arg) {
				//var Period=setParameterValue("NsPeriodTreatment", item.Id, Terrasoft.DataValueType.GUID)
				var IdParameter= this.$MasterRecordId;
				var selectedItems=values.selectedRows.getItems();
				var Periodselected=selectedItems[0];
				var Period=Periodselected.Id;
				var serviceData = {
					TreatmentProgId: IdParameter,
					PeriodTreatment:Period
				};
				ServiceHelper.callService("NsTreatmentProgService", "Add5RecordsToSession",
                        function(response) {
                            var result = response.Ns_Add5RecordsToSessionResult;
                        }, serviceData, this);
				this.reloadGridData();
			},
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"activeRowActions": [
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "save",
							"markerValue": "save",
							"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "cancel",
							"markerValue": "cancel",
							"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "card",
							"markerValue": "card",
							"imageConfig": {"bindTo": "Resources.Images.CardIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "copy",
							"markerValue": "copy",
							"imageConfig": {"bindTo": "Resources.Images.CopyIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "remove",
							"markerValue": "remove",
							"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
						}
					],
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"multiSelect": {"bindTo": "MultiSelect"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});