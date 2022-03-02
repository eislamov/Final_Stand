using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using Terrasoft.Core;
using Terrasoft.Web.Common;
using Terrasoft.Core.Entities;
using System.Collections.Generic;

namespace Terrasoft.Configuration.NsTreatmentProgService

{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NsTreatmentProgService : BaseService
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
        public string GetTreatmentSessionsDurationPlanned(string TreatmentProgId)
        {
            Guid GuidId;
            double summ = -1;
            string result = "";
            if (Guid.TryParse(TreatmentProgId, out GuidId))
            {
                var esqResult = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(NsSessions));
                var colName = esqResult.AddColumn(nameof(NsSessions.Duration));
                esqResult.AddColumn(nameof(NsSessions.Status));
                esqResult.AddColumn(nameof(NsSessions.TreatmentProg));
                var sessionStatus = NsConstantsCS.NsSessionsStatus.Planned;
                var filter1 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                    nameof(NsSessions.Status),
                                    sessionStatus);
                esqResult.Filters.Add(filter1);
                var filter2 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                    nameof(NsSessions.TreatmentProg),
                                    GuidId);
                esqResult.Filters.Add(filter2);
                try
                {
                    var entities = esqResult.GetEntityCollection(UserConnection);
                    for (int i = 0; i < entities.Count; i++)
                    {
                        summ += Convert.ToInt32(entities[i].GetColumnValue(colName.Name));
                        if (i == entities.Count - 1)
                        {
                            summ += 1;
                        }
                    }
                    result=summ.ToString();
                }
                catch
                {
                    result = summ.ToString();
                }
            }
            else result = "Что-то пошло не так, обратитесь к Администратору";
            return result;
        }

        public static void AddRecordsToSession(UserConnection UserConnection, int SessionDuration, int SessionCount, decimal SessionPrice,
            Guid IdTreatmentProg, Guid PeriodTreatmentProg, Guid OperatorSession)
        {
            int countWeek = 0;
            for (int i = 0; i < SessionCount; i++)
            {
                if (PeriodTreatmentProg == NsConstantsCS.NsPeriodTreatment.Daily)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), IdTreatmentProg);
                    entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddDays(i));
                    entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                    entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                    entity.SetColumnValue(nameof(NsSessions.Duration), SessionDuration);
                    entity.SetColumnValue(nameof(NsSessions.Price), SessionPrice);
                    entity.Save();
                }

                if (PeriodTreatmentProg == NsConstantsCS.NsPeriodTreatment.Weekly)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), IdTreatmentProg);
                    entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddDays(countWeek));
                    entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                    entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                    entity.SetColumnValue(nameof(NsSessions.Duration), SessionDuration);
                    entity.SetColumnValue(nameof(NsSessions.Price), SessionPrice);
                    entity.Save();
                    countWeek += 7;
                }

                if (PeriodTreatmentProg == NsConstantsCS.NsPeriodTreatment.Monthly)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), IdTreatmentProg);
                    entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddMonths(i));
                    entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                    entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                    entity.SetColumnValue(nameof(NsSessions.Duration), SessionDuration);
                    entity.SetColumnValue(nameof(NsSessions.Price), SessionPrice);
                    entity.Save();
                }
            }
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public void Add5RecordsToSession(string TreatmentProgId, string PeriodTreatment)
        {
            Guid Id= Guid.Parse(TreatmentProgId);
            Guid Period;

            var esqResult = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(NsTreatmentProg));
            esqResult.AddAllSchemaColumns();
            var filter1 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                nameof(NsTreatmentProg.Id),
                                Id);
            esqResult.Filters.Add(filter1);
            var entities = esqResult.GetEntityCollection(UserConnection);
            if (entities.Count!=0)
            {
                var OperatorSession = entities[0].GetColumnValue(nameof(NsTreatmentProg.OwnerId));
                int countWeek = 0;
                if (Guid.TryParse(PeriodTreatment, out Period))
                {
                    for (int i = 0; i < 5; i++)
                    {
                        if (Period == NsConstantsCS.NsPeriodTreatment.Daily)
                        {
                            var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                            var entity = sessionsSchema.CreateEntity(UserConnection);
                            entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                            entity.SetDefColumnValues();
                            entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), Id);
                            entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddDays(i));
                            entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                            entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                            entity.SetColumnValue(nameof(NsSessions.Duration), 1);
                            entity.SetColumnValue(nameof(NsSessions.Price), 1);
                            entity.Save();
                        }

                        if (Period == NsConstantsCS.NsPeriodTreatment.Weekly)
                        {
                            var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                            var entity = sessionsSchema.CreateEntity(UserConnection);
                            entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                            entity.SetDefColumnValues();
                            entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), Id);
                            entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddDays(countWeek));
                            entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                            entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                            entity.SetColumnValue(nameof(NsSessions.Duration), 1);
                            entity.SetColumnValue(nameof(NsSessions.Price), 1);
                            entity.Save();
                            countWeek += 7;
                        }

                        if (Period == NsConstantsCS.NsPeriodTreatment.Monthly)
                        {
                            var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsSessions));
                            var entity = sessionsSchema.CreateEntity(UserConnection);
                            entity.FetchFromDB(nameof(NsSessions.Date), DateTime.UtcNow);
                            entity.SetDefColumnValues();
                            entity.SetColumnValue(nameof(NsSessions.TreatmentProgId), Id);
                            entity.SetColumnValue(nameof(NsSessions.Date), DateTime.UtcNow.AddMonths(i));
                            entity.SetColumnValue(nameof(NsSessions.StatusId), NsConstantsCS.NsSessionsStatus.Planned);
                            entity.SetColumnValue(nameof(NsSessions.OperatorId), OperatorSession);
                            entity.SetColumnValue(nameof(NsSessions.Duration), 1);
                            entity.SetColumnValue(nameof(NsSessions.Price), 1);
                            entity.Save();
                        }
                    }
                }
            }
        }
    }
}
