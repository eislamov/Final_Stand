define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Schema45942f0bDetaila3554810": {
				"schemaName": "Schema45942f0bDetail",
				"entitySchemaName": "NsAuthors",
				"filter": {
					"detailColumn": "Author",
					"masterColumn": "Id"
				}
			},
			"Schema5b2e9566Detail2222a2f5": {
				"schemaName": "Schema5b2e9566Detail",
				"entitySchemaName": "NsHistory",
				"filter": {
					"detailColumn": "Client",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Schema45942f0bDetaila3554810": {
				"b8e5b63c-d5ac-497d-8703-4e16e8e9ebfc": {
					"uId": "b8e5b63c-d5ac-497d-8703-4e16e8e9ebfc",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Type"
							},
							"rightExpression": {
								"type": 0,
								"value": "496377a5-d63f-40b5-ae5c-bcfa272cdabb",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Schema5b2e9566Detail2222a2f5": {
				"4f0fe072-b0b8-418b-b71a-929ce4ec50eb": {
					"uId": "4f0fe072-b0b8-418b-b71a-929ce4ec50eb",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Type"
							},
							"rightExpression": {
								"type": 0,
								"value": "00783ef6-f36b-1410-a883-16d83cab0980",
								"dataValueType": 10
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Schema45942f0bDetaila3554810",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Schema5b2e9566Detail2222a2f5",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "JobTabContainer",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "merge",
				"name": "NotesAndFilesTab",
				"values": {
					"order": 6
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 7
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
