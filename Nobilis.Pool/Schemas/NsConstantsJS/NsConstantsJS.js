  define("NsConstantsJS", [], function() {
  Ext.define("Terrasoft.configuration.NsConstantsJS", {

    alternateClassName: "Terrasoft.NsConstantsJS",

    singleton: true,

    constructor: function() {

      this.DeclareConstants();

    },
    DeclareConstants:function(){
      this.NsPeriodSwimming = {
        Daily:"8dbfd033-9166-49f6-9cde-2131b504152d",
        Weekly:"8397874b-1b23-48c7-a79a-1307351a286d",
        Monthly:"da618321-e96f-4671-a835-c63b8cc4d9f8",
      };
		this.NsPeriodTreatment = {
        Daily:"63a408ef-11e5-44b3-a6e0-021616659fd5",
        Weekly:"300f7147-3d3a-409f-8463-ed537e863a9c",
        Monthly:"34795af3-06b8-4cfb-ae21-397374b3cb7e",
      };
    },
  });

});