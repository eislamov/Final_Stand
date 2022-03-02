define("NsTreatmentProg1Page", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "NsTreatmentProg",
		attributes: {
			"Period": {
				lookupListConfig: {
					orders: [
						{
							columnPath: "Number", 
							direction: Terrasoft.OrderDirection.ASC
						}
					]
				}
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NsTreatmentProgFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NsTreatmentProg"
				}
			},
			"NsSessionsDetaild5a1b4b7": {
				"schemaName": "NsSessionsDetail",
				"entitySchemaName": "NsSessions",
				"filter": {
					"detailColumn": "TreatmentProg",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Owner": {
				"0b01dd4b-6f4d-40ea-b428-694bc7a6b688": {
					"uId": "0b01dd4b-6f4d-40ea-b428-694bc7a6b688",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Owner",
								"attributePath": "Type"
							},
							"rightExpression": {
								"type": 0,
								"value": "60733efc-f36b-1410-a883-16d83cab0980",
								"dataValueType": 10
							}
						}
					],
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "60733efc-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function() {
                this.callParent(arguments);
                if (this.isAddMode() || this.isCopyMode()) {
                    this.getIncrementCode(function(response) {
                        this.set("Code", response);
                    });
                }
			},
			asyncValidate: function(callback, scope) {
				this.callParent([function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					Terrasoft.chain(
						function(next) {
							this.LimitedOfDailyBlocksValidator(function(response) {
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

			LimitedOfDailyBlocksValidator: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettingsItem("NsMaxCountActiveDailySession", function(countSettings) {
					if (!this.changedValues) {
						callback.call(scope, {success: true});
					}
					var periodicity = "";
					var activity = "";
					var result = {success: true};
					if (this.get("Period")) {
						periodicity = this.get("Period").value;
					}
					if (this.get("Active")) {
						activity = this.get("Active");
					}
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "NsTreatmentProg"});
					esq.addColumn("Period.Id", "PeriodId");
					esq.addColumn("Active");
					var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Period.Id", Terrasoft.NsConstantsJS.NsPeriodTreatment.Daily));
					var filter2= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Active", true));
					esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					esq.filters.add("filter1", filter1);
					esq.filters.add("filter2", filter2);
					esq.getEntityCollection(function(response) {
						if (response.success && periodicity === Terrasoft.NsConstantsJS.NsPeriodTreatment.Daily && activity &&
							 (this.changedValues && response.collection.getCount() >= countSettings)) {
								result.message = Ext.String.format(this.get("Resources.Strings.NsLimitOfDailyTreatmentProg"), countSettings);
								result.success = false;
						}
						callback.call(scope || this, result);
					}, this);
				}, this);
			},

			getActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getActionsMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));
                actionMenuItems.addItem(this.getActionsMenuItem({
                    "Caption": { bindTo: "Resources.Strings.NsAddRecordSession" },
                    "Tag": "ClickButtAddRecordSession",
                    "Visible": true,
                }));
                return actionMenuItems;
            },

			ClickButtAddRecordSession: function(result) {
				this.showConfirmationDialog(this.get("Resources.Strings.NsAddRecordSessionMessage"), function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.save();
						this.AddRecordSession();
						
					}
				}, ["yes", "no"]);
			},

			AddRecordSession: function() {
                var IdParameter = this.$Id;
				var PeriodParametr=this.$Period.value;
				var OperatorParametr=this.$Owner.value
                var args = {
                    sysProcessName: "AddRecordSession",
                    parameters: {
                        IdTreatmentProg: IdParameter,
						PeriodTreatmentProg: PeriodParametr,
						OperatorSession: OperatorParametr
                    }
                };
                ProcessModuleUtilities.executeProcess(args);
            },
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Name",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Code",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Code",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Period",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Period",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Owner",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Active",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Active",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Comment",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Comment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab4d6f49baTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab4d6f49baTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NsSessionsDetaild5a1b4b7",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab4d6f49baTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
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
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "Notes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});
