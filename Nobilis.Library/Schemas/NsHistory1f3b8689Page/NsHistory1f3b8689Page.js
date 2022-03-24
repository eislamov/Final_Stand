define("NsHistory1f3b8689Page", [], function() {
	return {
		entitySchemaName: "NsHistory",
		attributes: {
			"Dates": {
				"value":true,  
			},
			"CheckBoxReturn": {
				dependencies: [
					{
						"columns": ["Returned"],
						"methodName": "setDateReturned"
					}
				]
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Client": {
				"4917c2ed-29b1-4a14-bc23-6776589b0e3f": {
					"uId": "4917c2ed-29b1-4a14-bc23-6776589b0e3f",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "00783ef6-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			},
			"ReturnedDate": {
				"a975b08d-e6d0-48d9-a803-a63a49aa2185": {
					"uId": "a975b08d-e6d0-48d9-a803-a63a49aa2185",
					"enabled": false,
					"removed": false,
					"ruleType": 3,
					"populatingAttributeSource": {
						"expression": {
							"type": 6,
							"formula": {
								"type": 2,
								"dataType": 7,
								"code": "GETDATE",
								"arguments": []
							}
						}
					},
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Returned"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.setAuthor();
				//this.validateDates();
			},
			init: function() {
				this.callParent(arguments);
				this.on("change:Dates", this.validateDates, this);
			},
			setAuthor: function() {
				var bookId=this.get("Book");
				var author=0;
				if (bookId) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "NsAuthors"});
					esq.addColumn("Book");
					esq.addColumn("Author");
					var filter1= esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
						"Book", bookId));
					esq.filters.add("filter1", filter1);
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							this.showInformationDialog("Ошибка, обратитесь к администратору :*(");
							return;
						}
						result.collection.each(function (item) {
							author=item.get("Author");
							return author;
						});
						this.set("Author", author);
					}, this);
				}
			},
			setValidationConfig: function() {
                this.callParent(arguments);
                this.addColumnValidator("PlannedDate", this.validateDates);
            },
			validateDates: function() {
				var dateOfIssue=this.get("DateOfIssue");
				var plannedDate=this.get("PlannedDate");
				var invalidMessage = "";
				//var returnedDate=this.get("ReturnedDate");
				if (dateOfIssue>plannedDate) {
					invalidMessage="должно быть больше даты выдачи";
					//this.showInformationDialog("Планируемая дата должна быть больше даты выдачи");
					//this.set("PlannedDate", new Date(dateOfIssue.setDate(dateOfIssue.getDate()+1)));
				}
				return {
                    invalidMessage: invalidMessage
                };
				// if (dateOfIssue>returnedDate) {
				// 	this.showInformationDialog("Дата возврата должна быть больше даты выдачи");
				// 	this.set("ReturnedDate", new Date(dateOfIssue.setDate(dateOfIssue.getDate()+1)));
				// }
			},
			setDateReturned: function() {
				var dateOfIssue=this.get("DateOfIssue");
				var returned=this.get("Returned");
				if (returned) {
					this.$Dates = false;
					var today=new Date().setHours(0, 0, 0, 0);
					if (dateOfIssue.getTime()==today) {
						this.set("ReturnedDate", new Date(dateOfIssue.setDate(dateOfIssue.getDate()+1)));
						this.showInformationDialog("Дата возврата должна быть больше даты выдачи. К дате возврата добавлен 1 день!");
					} else {
						this.set("ReturnedDate", new Date().toLocaleDateString());
					}
				} else {
					this.$Dates = true;
				}
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Returnedcd8dbd18-1c23-4737-840d-a643e7a77475",
				"values": {
					"layout": {
						"colSpan": 3,
						"rowSpan": 1,
						"column": 18,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Returned"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DateOfIssuea714c827-6134-42b5-8efd-2b1cc9f4f9f1",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "DateOfIssue",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PlannedDate7be944c1-6612-40c1-a67f-e3eaf8bdc80f",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "PlannedDate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ReturnedDateae152749-012b-403e-ada6-f482fe489403",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "ReturnedDate",
					"enabled": {
						"bindTo": "Dates"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Bookce11c58f-ba04-43cf-bfce-d4d6dd0210d9",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Book"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Author29a21acb-9ca4-424a-8a29-28d964f35dde",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 7,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Author"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Client9785776e-32c0-49f1-b556-0d082dc9b769",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 14,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Client"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Comment9b0be5c8-6ca2-403a-9560-b80946f368ef",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "Comment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			}
		]/**SCHEMA_DIFF*/
	};
});
