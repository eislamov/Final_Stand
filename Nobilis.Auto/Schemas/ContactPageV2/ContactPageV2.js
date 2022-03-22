 define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {
			"FirstContractDate": {
				"value": ""
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function() {
                this.callParent(arguments);
				this.FirstDateContract();
				// if (this.$FirstContractDate!="") {
				// 	this.$NsFirstContractDate=this.$FirstContractDate;
				// 	this.save();
				// }
			},
			init: function() {
				this.callParent(arguments);
				//this.FirstDateContract();
			},
			FirstDateContract: function() {
				var contactId=this.$Id;
				var firstDate="";
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Contract"});
				esq.addColumn("Contact");
				esq.addColumn("StartDate");
				var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
					"Contact", contactId));
				esq.filters.add("filter1", filter1);
				esq.getEntityCollection(function(response) {
					if (response.collection.getItems()[0]) {
						firstDate=response.collection.getItems()[0].$StartDate
						this.$NsFirstContractDate=firstDate;
						this.save();
					}
				}, this);
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "NsFirstContractDate657b3f50-2f9a-43ac-9e21-70970bf6f544",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NsFirstContractDate",
					"enabled": false
				},
				"parentName": "ProfileContainer",
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
