define("NsSwimProgram1Page", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "NsSwimProgram",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NsSwimProgramFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NsSwimProgram"
				}
			},
			"SchemaDetailLessons": {
				"schemaName": "SchemaLessonsInPoolDetail",
				"entitySchemaName": "NsLessonsInPool",
				"filter": {
					"detailColumn": "SwimProgram",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Owner": {
				"8061c828-c313-42fc-878b-3600a248f19d": {
					"uId": "8061c828-c313-42fc-878b-3600a248f19d",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
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
							this.LimitedOfDailyProgramValidator(function(response) {
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

			LimitedOfDailyProgramValidator: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettingsItem("NsMaxNumDailyPool", function(countSettings) {
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
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "NsSwimProgram"});
					esq.addColumn("Period.Id", "PeriodId");
					esq.addColumn("Active");
					esq.addColumn("Id");
					var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Period.Id", Terrasoft.NsConstantsJS.NsPeriodSwimming.Daily));
					var filter2= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Active", true));
					esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					esq.filters.add("filter1", filter1);
					esq.filters.add("filter2", filter2);
					esq.getEntityCollection(function(response) {
						var count=countSettings;
						for (var i=0; i<response.collection.getCount(); i++) {
							if (response.collection.getItems()[i].$Id===this.$Id) {
								count = countSettings + 1;
							}
						}
						if (response.success && periodicity === Terrasoft.NsConstantsJS.NsPeriodSwimming.Daily && activity &&
							 (this.changedValues && response.collection.getCount() >= count)) {
								result.message = Ext.String.format(this.get("Resources.Strings.NsLimitOfDailySwimProg"), countSettings);
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
                    "Caption": { bindTo: "Resources.Strings.NsAddRecordLessons" },
                    "Tag": "ClickButtAddRecordLessons",
                    "Visible": true,
                }));
                return actionMenuItems;
            },

			save: function() {
				this.callParent(arguments);
				this.Add8RecordToLesson();
			},

			ClickButtAddRecordLessons: function() {
				this.showConfirmationDialog(this.get("Resources.Strings.NsAddRecordLessonsMessage"), function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.save();
					}
				}, ["yes", "no"]);
			},

			onSaved: function() {
				this.callParent(arguments);
				this.reloadEntity()
			},

			Add8RecordToLesson:function() {
				var IdParameter= this.$Id;
				var Period=this.$Period.value;
				var Owner=this.$Owner.value;
				var serviceData = {
					SwimProgId: IdParameter,
					PeriodSwim: Period,
					Owner: Owner
				};
				ServiceHelper.callService("NsSwimProgramService", "Add8RecordToLesson",
                        function(response) {
                            var result = response.Add8RecordToLessonResult;
                        }, serviceData, this);
				//this.reloadEntity();
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Nameb6c744cb-0422-470b-ae84-d7c704c9ab72",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Name"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Code3f3e5c57-f17f-49f9-981f-5d2d49927369",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Code"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Period6ab17553-aae6-4ba6-865f-e054232654ff",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Period"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Ownera6b71395-a52a-4cfa-94bf-3b2a5771fcbb",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Owner"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Activeb07eef17-860b-4acc-8753-462e7ddcbd90",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Active"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Comment0c93dda9-f3a7-41b1-a02b-2de9f5a87dea",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Comment"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabLessonsLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabLessonsLabelTabCaption"
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
				"name": "SchemaDetailLessons",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "TabLessonsLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
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
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
