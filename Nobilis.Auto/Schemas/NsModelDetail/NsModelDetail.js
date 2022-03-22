define("NsModelDetail", ["LookupMultiAddMixin"], function() {
	return {
		entitySchemaName: "NsModelInCreditDetail",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		mixins: {
            LookupMultiAddMixin: "Terrasoft.LookupMultiAddMixin"
        },
		methods: {
			init: function() {
                this.callParent(arguments);
                this.mixins.LookupMultiAddMixin.init.call(this);
            },
            onActiveRowAction: function(buttonTag) {
                switch (buttonTag) {
                    case "openCard":
                        this.editRecord();
                        break;
                }
            },
            getAddRecordButtonVisible: function() {
                return this.getToolsVisible();
            },
            onCardSaved: function() {
                this.openLookupWithMultiSelect();
            },
            addRecord: function() {
                this.openLookupWithMultiSelect(true);
            },
            getMultiSelectLookupConfig: function() {
                return {
                    rootEntitySchemaName: "NsCreditProgram",
                    rootColumnName: "CreditProgram",
                    relatedEntitySchemaName: "NsModel",
                    relatedColumnName: "Model"
                };
            },
			loadAddedRecords: function(collection) {
			 	this.reloadGridData();
			},
		}
	};
});
