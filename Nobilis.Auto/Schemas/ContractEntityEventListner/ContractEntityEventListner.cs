using System;
using Terrasoft.Core.Entities;
using Terrasoft.Common;
using Terrasoft.Core.Entities.Events;
using System.Linq;

namespace Terrasoft.Configuration.ContractEntityEventListner
{

    [EntityEventListener(SchemaName = nameof(Contract))]
    public class ContractEntityEventListner : BaseEntityEventListener
    {
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            var entity = (Entity)sender;
            var userConnection = entity.UserConnection;
        }

        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {

            base.OnSaving(sender, e);
            var entity = (Contract)sender;
            var userConnection = entity.UserConnection;
            if (entity.GetChangedColumnValues().Any(x => x.Name == (nameof(Contract.NsCreditProgramId))))
            {
                var contractId = Guid.Parse(entity.GetColumnValue(nameof(Contract.Id)).ToString());
                var creditPeriod = Convert.ToInt32(entity.GetColumnValue(nameof(Contract.NsCreditPeriod)));
                var firstAmount = Convert.ToDecimal(entity.GetColumnValue(nameof(Contract.NsFirstAmount)));
                var amountModel = Convert.ToDecimal(entity.GetColumnValue(nameof(Contract.Amount)));
                var creditProgramId = Guid.Parse(entity.GetColumnValue(nameof(Contract.NsCreditProgramId)).ToString());

                var esqCreditProgram = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(NsCreditProgram));
                esqCreditProgram.AddAllSchemaColumns();
                var filter1 = esqCreditProgram.CreateFilterWithParameters(FilterComparisonType.Equal,
                                        nameof(NsCreditProgram.Id),
                                        creditProgramId);
                esqCreditProgram.Filters.Add(filter1);
                var entitiesCredit = esqCreditProgram.GetEntityCollection(userConnection);
                if (!entitiesCredit.IsNullOrEmpty())
                {
                    var dateStart = Convert.ToDateTime(entitiesCredit[0].GetColumnValue(nameof(NsCreditProgram.DateStart)));
                    var dateEnd = Convert.ToDateTime(entitiesCredit[0].GetColumnValue(nameof(NsCreditProgram.DateEnd)));
                    var percent = Convert.ToDecimal(entitiesCredit[0].GetColumnValue(nameof(NsCreditProgram.Percent)));
                    if (dateStart < DateTime.UtcNow && DateTime.UtcNow < dateEnd && percent!=0)
                    {
                        if (firstAmount!=0 && creditPeriod!=0 && amountModel!=0)
                        {
                            var creditAmount = (percent * creditPeriod * amountModel - firstAmount) / 100;
                            entity.SetColumnValue(nameof(Contract.NsCreditAmount), creditAmount);
                            entity.SetColumnValue(nameof(Contract.Amount), creditAmount);
                            entity.Save();
                        }
                        else
                        {
                            throw new Exception("Не все обязательные поля заполнены в договоре");
                        }

                    }
                    else
                    {
                        throw new Exception("Выбранная кредитная программа не удовлетворяет условиям");
                    }
                }
                else
                {
                    throw new Exception("Что то пошло не так, обратитесь к Администратору :(");
                }

            }
        }
    }
}
