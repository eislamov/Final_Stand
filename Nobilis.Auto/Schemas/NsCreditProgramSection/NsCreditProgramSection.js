define("NsCreditProgramSection", [], function() {
	return {
		entitySchemaName: "NsCreditProgram",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			prepareResponseCollectionItem: function(item) {
				this.callParent(arguments);
				item.customStyle = null;
				var isActual = item.get("IsActual");
				var dateEnd = item.get("DateEnd");
				if (isActual == true && dateEnd.valueOf()>Date.now()) {
					item.customStyle = {
						"color": "white",
						"background": "#8ecb60"
					};
				}
			},
		}
	};
});
