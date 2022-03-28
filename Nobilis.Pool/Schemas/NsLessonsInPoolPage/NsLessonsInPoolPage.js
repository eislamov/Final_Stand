define("NsLessonsInPoolPage", [], function() {
	return {
		entitySchemaName: "NsLessonsInPool",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Date9b0c5a87-553e-4513-b6e2-3ad4e26d8395",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Date"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Trainerb1bb1659-4857-4cd9-ba31-c1115c35f306",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 5,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Trainer"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberMemberb1535382-2ece-43ac-8225-fc608c32c0c3",
				"values": {
					"layout": {
						"colSpan": 3,
						"rowSpan": 1,
						"column": 10,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "NumberMember"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LessonState6aa9c918-52f2-4863-b55c-78019ee7f761",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 13,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "LessonState"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Duration9517e2c8-2a3e-4d8c-a1c6-bd964ca8207e",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 19,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Duration"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			}
		]/**SCHEMA_DIFF*/
	};
});
