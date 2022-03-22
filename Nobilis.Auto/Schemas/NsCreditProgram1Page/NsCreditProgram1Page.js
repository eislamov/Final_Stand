define("NsCreditProgram1Page", [], function() {
	return {
		entitySchemaName: "NsCreditProgram",
		attributes: {
			// "DateValidator": {
			// 	dependencies: [
			// 		{
			// 			"columns": ["DateStart", "DateEnd"],
			// 			"methodName": "DateValidator"
			// 		}
			// 	]
			// },
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NsCreditProgramFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NsCreditProgram"
				}
			},
			"NsModelDetail630e87b4": {
				"schemaName": "NsModelDetail",
				"entitySchemaName": "NsModelInCreditDetail",
				"filter": {
					"detailColumn": "CreditProgram",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			asyncValidate: function(callback, scope) {
				this.callParent([function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					Terrasoft.chain(
						function(next) {
							this.DateValidator(function(response) {
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
			DateValidator: function(callback, scope) {
				if (this.get("DateStart")) {
					var dateStart = this.get("DateStart");
					var yearStart = dateStart.getFullYear();
					var monthStart = dateStart.getMonth();
				}
				if (this.get("DateEnd")) {
					var dateEnd = this.get("DateEnd");
					var yearEnd = dateEnd.getFullYear();
					var monthEnd = dateEnd.getMonth();
				}
				var result = {
					success: true
				};
				var timeDiff=0;
				var diffYear=0;
				if (this.leapYear(yearStart)) {
					if (monthStart==0 || monthStart==1) {
						timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
						diffYear = Math.round(timeDiff / (1000 * 3600 * 24 * 366)); 
					} else {
						timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
						diffYear = Math.round(timeDiff / (1000 * 3600 * 24 * 365));
					}
				} else if (this.leapYear(yearEnd)) {
					if (monthEnd==0 || monthEnd==1) {
						timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
						diffYear = Math.round(timeDiff / (1000 * 3600 * 24 * 365)); 
					} else {
						timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
						diffYear = Math.round(timeDiff / (1000 * 3600 * 24 * 366));
					}
				}
				if (diffYear<1) {
					result.message = this.get("Resources.Strings.NsDateValidorMes");
					result.success = false;
				}
				callback.call(scope || this, result);
			},

			leapYear: function(year) {
				var f29 = new Date (year, 1, 29)
				return (f29.getMonth () == 1); 
			},

		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name6a84899a-f009-4d98-9c6d-2502c06f08a4",
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
				"name": "DateStarta1351328-b8cd-4695-b92f-a2d297e8bc30",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "DateStart"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DateEnd37ffad6a-498e-4be7-bd20-fd717fee793b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "DateEnd"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Percent7947ab4f-4abd-442b-8d32-d71709955a64",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Percent"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "IsActual19477591-58c0-49ca-a59b-855754bc13e0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "IsActual"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ModelTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ModelTabLabelTabCaption"
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
				"name": "NsModelDetail630e87b4",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "ModelTabLabel",
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
