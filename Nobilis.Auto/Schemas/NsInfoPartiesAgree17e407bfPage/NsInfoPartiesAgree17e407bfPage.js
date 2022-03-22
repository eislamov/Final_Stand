define("NsInfoPartiesAgree17e407bfPage", [], function() {
	return {
		entitySchemaName: "NsInfoPartiesAgree",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "LOOKUP3b2a1b67-c8a3-4449-b5eb-6728efbcd0dd",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 7,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Contracts",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP04a37bb5-cb88-4014-b299-404f9e1cb407",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 19,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "RoleMember",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUP70a4d068-0692-4020-a4e5-f48111a6cd7a",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Contact",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Name8caa1c60-79f3-4fb3-9d5d-ef7353862947",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Name"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "STRING695c134b-0c6a-4d21-9f53-ea6c26c8bb48",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Comment",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			}
		]/**SCHEMA_DIFF*/
	};
});
