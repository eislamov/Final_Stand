using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using Terrasoft.Core;
using Terrasoft.Web.Common;
using Terrasoft.Core.Entities;
using System.Collections.Generic;

namespace Terrasoft.Configuration.NsInvoiceService

{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NsInvoiceService : BaseService
    {
        private SystemUserConnection _systemUserConnection;
        private SystemUserConnection SystemUserConnection
        {
            get
            {
                return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
            }
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public (int resultCode, string err) AddInvoice(string dogovorNumber, decimal amount)
        {
            var esqContract = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(Contract));
            esqContract.AddAllSchemaColumns();
            var contractNumberFilter = esqContract.CreateFilterWithParameters(FilterComparisonType.Equal,
                                    nameof(Contract.Number),
                                    dogovorNumber);
            esqContract.Filters.Add(contractNumberFilter);
            bool isPaidContract = false;
            decimal amountContract = 0;
            decimal factAmountContract = 0;
            Guid idContract= new Guid();
            int ResultCode = 0;
            string Err = "";
            try
            {
                var entitiesContract = esqContract.GetEntityCollection(UserConnection);
                for (int i = 0; i < entitiesContract.Count; i++)
                {
                    isPaidContract = Convert.ToBoolean(entitiesContract[i].GetColumnValue(nameof(Contract.NsIsPaid)));
                    amountContract = Convert.ToDecimal(entitiesContract[i].GetColumnValue(nameof(Contract.Amount)));
                    factAmountContract = Convert.ToDecimal(entitiesContract[i].GetColumnValue(nameof(Contract.NsFactAmount)));
                    idContract = Guid.Parse((entitiesContract[i].GetColumnValue(nameof(Contract.Id))).ToString());
                }
                if (isPaidContract == false)
                {
                    if (amountContract>factAmountContract+amount)
                    {
                        var invoiceSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(Invoice));
                        var entityInvoice = invoiceSchema.CreateEntity(UserConnection);
                        entityInvoice.SetDefColumnValues();
                        entityInvoice.SetColumnValue(nameof(Invoice.StartDate), DateTime.UtcNow);
                        entityInvoice.SetColumnValue(nameof(Invoice.ContractId), idContract);
                        entityInvoice.SetColumnValue(nameof(Invoice.NsIsPaid), true);
                        entityInvoice.SetColumnValue(nameof(Invoice.Amount), amount);
                        //entityInvoice.SetColumnValue(nameof(Invoice.Number), " ");
                        entityInvoice.Save();
                        ResultCode = 1;
                    } else
                    {
                        ResultCode = 3;
                    }
                } else
                {
                    ResultCode = 2;
                }
            }
            catch
            {
                ResultCode = 0;
            }
            if (ResultCode==0)
            {
                Err = "Не успешно (ошибка).";
            } else if (ResultCode == 2)
            {
                Err = "Невозможно создать счет, договор оплачен.";
            } else if (ResultCode == 3)
            {
                Err = "Невозможно создать счет, оплаченная сумма договора превышена.";
            }
            /*var result = (ResultCode:0, Err:"");
            result.ResultCode = ResultCode;
            result.Err = Err;*/
            /*(int resultCode, string err)*/
            return (ResultCode, Err);
        }
    }
}
