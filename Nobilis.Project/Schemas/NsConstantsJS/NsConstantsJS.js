 define("NsConstantsJS", [], function() {
  Ext.define("Terrasoft.configuration.NsConstantsJS", {

    alternateClassName: "Terrasoft.NsConstantsJS",

    singleton: true,

    constructor: function() {

      this.DeclareConstants();

    },
    DeclareConstants:function(){
      this.NsPeriodTreatment = {
        Daily:"63a408ef-11e5-44b3-a6e0-021616659fd5",
        Weekly:"300f7147-3d3a-409f-8463-ed537e863a9c",
        Monthly:"34795af3-06b8-4cfb-ae21-397374b3cb7e",
      };
    },
  });

});