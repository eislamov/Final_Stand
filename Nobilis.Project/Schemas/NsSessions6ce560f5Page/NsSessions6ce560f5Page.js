define("NsSessions6ce560f5Page", [], function() {
	return {
		entitySchemaName: "NsSessions",
		attributes: {
			"Status": {
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
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "TreatmentProg908c6a8e-249f-4bdf-9700-d7bd007a322b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "TreatmentProg"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Operator",
				"values": {
					"layout": {
						"colSpan": 3,
						"rowSpan": 1,
						"column": 4,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Operator"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Duration",
				"values": {
					"layout": {
						"colSpan": 3,
						"rowSpan": 1,
						"column": 7,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Duration"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Date",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Date"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Status",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 10,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Status",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Price",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 14,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Price"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			}
		]/**SCHEMA_DIFF*/
	};
});
