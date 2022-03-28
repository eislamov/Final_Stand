using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using Terrasoft.Core;
using Terrasoft.Web.Common;
using Terrasoft.Core.Entities;
using System.Collections.Generic;

namespace Terrasoft.Configuration.NsSwimProgramService

{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NsSwimProgramService : BaseService
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
        public string GetSwimLessonsDurationPlanned(string SwimProgramId)
        {
            Guid GuidId;
            double summ = -1;
            string result = "";
            if (Guid.TryParse(SwimProgramId, out GuidId))
            {
                var esqResult = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(NsLessonsInPool));
                var colName = esqResult.AddColumn(nameof(NsLessonsInPool.Duration));
                esqResult.AddColumn(nameof(NsLessonsInPool.LessonState));
                esqResult.AddColumn(nameof(NsLessonsInPool.SwimProgram));
                var sessionStatus = NsConstantsCS.NsLessonState.Planned;
                var filter1 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                    nameof(NsLessonsInPool.LessonState),
                                    sessionStatus);
                esqResult.Filters.Add(filter1);
                var filter2 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                    nameof(NsLessonsInPool.SwimProgram),
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
                    result = summ.ToString();
                }
                catch
                {
                    result = summ.ToString();
                }
            }
            else result = "Что-то пошло не так, обратитесь к Администратору";
            return result;
        }


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public void Add8RecordToLesson(string SwimProgId, string PeriodSwim, string Owner)
        {
            Guid Id = Guid.Parse(SwimProgId);
            Guid PeriodId = Guid.Parse(PeriodSwim);
            Guid OwnerId = Guid.Parse(Owner);

            int countWeek = 0;
            for (int i = 0; i < 8; i++)
            {
                if (PeriodId == NsConstantsCS.NsPeriodSwimming.Daily)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddDays(i));
                    entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                    entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OwnerId);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                    entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                    entity.Save();
                }

                if (PeriodId == NsConstantsCS.NsPeriodSwimming.Weekly)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddDays(countWeek));
                    entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                    entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OwnerId);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                    entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                    entity.Save();
                    countWeek += 7;
                }

                if (PeriodId == NsConstantsCS.NsPeriodSwimming.Monthly)
                {
                    var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                    var entity = sessionsSchema.CreateEntity(UserConnection);
                    entity.SetDefColumnValues();
                    entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddMonths(i));
                    entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                    entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OwnerId);
                    entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                    entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                    entity.Save();
                }
            }
        }
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public void Add5RecordsToLessons(string ProgId, string PeriodLessons)
        {
            Guid Id = Guid.Parse(ProgId);
            Guid Period= Guid.Parse(PeriodLessons);

            var esqResult = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(NsSwimProgram));
            esqResult.AddAllSchemaColumns();
            var filter1 = esqResult.CreateFilterWithParameters(FilterComparisonType.Equal,
                                nameof(NsSwimProgram.Id),
                                Id);
            esqResult.Filters.Add(filter1);
            var entities = esqResult.GetEntityCollection(UserConnection);
            if (entities.Count != 0)
            {
                var OperatorSession = entities[0].GetColumnValue(nameof(NsSwimProgram.OwnerId));
                int countWeek = 0;
                
                for (int i = 0; i < 5; i++)
                {
                    if (Period == NsConstantsCS.NsPeriodSwimming.Daily)
                    {
                        var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                        var entity = sessionsSchema.CreateEntity(UserConnection);
                        entity.SetDefColumnValues();
                        entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddDays(i));
                        entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                        entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OperatorSession);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                        entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                        entity.Save();
                    }

                    if (Period == NsConstantsCS.NsPeriodSwimming.Weekly)
                    {
                        var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                        var entity = sessionsSchema.CreateEntity(UserConnection);
                        entity.SetDefColumnValues();
                        entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddDays(countWeek));
                        entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                        entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OperatorSession);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                        entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                        entity.Save();
                        countWeek += 7;
                    }

                    if (Period == NsConstantsCS.NsPeriodSwimming.Monthly)
                    {
                        var sessionsSchema = UserConnection.EntitySchemaManager.GetInstanceByName(nameof(NsLessonsInPool));
                        var entity = sessionsSchema.CreateEntity(UserConnection);
                        entity.SetDefColumnValues();
                        entity.SetColumnValue(nameof(NsLessonsInPool.SwimProgramId), Id);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Date), DateTime.UtcNow.AddMonths(i));
                        entity.SetColumnValue(nameof(NsLessonsInPool.LessonStateId), NsConstantsCS.NsLessonState.Planned);
                        entity.SetColumnValue(nameof(NsLessonsInPool.TrainerId), OperatorSession);
                        entity.SetColumnValue(nameof(NsLessonsInPool.Duration), 1);
                        entity.SetColumnValue(nameof(NsLessonsInPool.NumberMember), 1);
                        entity.Save();
                    }
                }
            }
        }
    }
}
