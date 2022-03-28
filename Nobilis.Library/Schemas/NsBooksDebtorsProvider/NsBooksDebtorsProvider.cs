namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Terrasoft.Common;
    using Terrasoft.Configuration.Reporting.FastReport;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Factories;

    #region Class: NsBooksDebtorsProvider

    [DefaultBinding(typeof(IFastReportDataSourceDataProvider), Name = "NsBooksDebtorsProvider")]
    public class NsBooksDebtorsProvider : IFastReportDataSourceDataProvider
    {

        #region Fields: Private

        private readonly Guid _contactEntitySchemaUId = new Guid("16BE3651-8FE2-4159-8DD0-A803D4683DD3");
        private readonly Guid _nsHistoryEntitySchemaUId = new Guid("4CCA6D23-CD96-48ED-A424-14E8005F2975");
        private readonly string _resourceManagerName = "NsBooksDebtorsProvider";

        private readonly string[] _localizableStringNames = new[] {
            "ReportTitle",
            "NumberLabel",
            "FullNameLabel",
            "BookLabel",
            "AuthorLabel",
            "DateOfIssueLabel",
            "PlannedDateLabel"
        };

        #endregion

        #region Methods: Private

        private IEnumerable<IReadOnlyDictionary<string, object>> GetContactData(UserConnection userConnection,
            Guid entitySchemaUId, IEntitySchemaQueryFilterItem filter) {
            var entitySchema = userConnection.EntitySchemaManager.GetInstanceByUId(entitySchemaUId);
            EntitySchemaQuery query = new EntitySchemaQuery(entitySchema);
            var idColumn = query.AddColumn("Id");
            query.Filters.Add(filter);
            EntityCollection collection = query.GetEntityCollection(userConnection);
            var result = new List<IReadOnlyDictionary<string, object>>();
            foreach (var entity in collection) {
                result.Add(new Dictionary<string, object> {
                    ["Id"] = entity.GetTypedColumnValue<Guid>(idColumn.Name),
                });
            }
            return result;
        }

        private IEnumerable<IReadOnlyDictionary<string, object>> GetHistoryData(
            UserConnection userConnection, Guid entitySchemaUId, IEntitySchemaQueryFilterItem filter) {
            var entitySchema = userConnection.EntitySchemaManager.GetInstanceByUId(entitySchemaUId);
            EntitySchemaQuery query = new EntitySchemaQuery(entitySchema);
            var plannedDateColumn = query.AddColumn("PlannedDate");
            var dateOfIssueColumn = query.AddColumn("DateOfIssue");
            var clientColumn = query.AddColumn("Client");
            var authorColumn = query.AddColumn("Author");
            var bookColumn = query.AddColumn("Book");
            var returnedColumn = query.AddColumn(nameof(NsHistory.Returned));
            var subQueryExpression = query.CreateSubEntitySchemaExpression("Client.Id");
            subQueryExpression.SubQuery.Filters.Add(filter);
            var subFilter = new EntitySchemaQueryFilter(FilterComparisonType.Exists);
            subFilter.RightExpressions.Add(subQueryExpression);
            query.Filters.Add(subFilter);
            EntityCollection collection = query.GetEntityCollection(userConnection);
            var result = new List<IReadOnlyDictionary<string, object>>();
            var number = 0;
            foreach (var entity in collection) {
                if (entity.GetTypedColumnValue<bool>(returnedColumn.Name)==false)
                {
                    number++;
                    var lookupClientColumn = entity.Schema.Columns.GetByName(clientColumn.Name);
                    var lookupAuthorColumn = entity.Schema.Columns.GetByName(authorColumn.Name);
                    var lookupBookColumn = entity.Schema.Columns.GetByName(bookColumn.Name);
                    result.Add(new Dictionary<string, object>
                    {
                        ["PlannedDate"] = entity.GetTypedColumnValue<DateTime>(plannedDateColumn.Name).ToShortDateString(),
                        ["DateOfIssue"] = entity.GetTypedColumnValue<DateTime>(dateOfIssueColumn.Name).ToShortDateString(),
                        ["ClientId"] = entity.GetTypedColumnValue<string>(lookupClientColumn.DisplayColumnValueName),
                        ["AuthorId"] = entity.GetTypedColumnValue<string>(lookupAuthorColumn.DisplayColumnValueName),
                        ["BookId"] = entity.GetTypedColumnValue<string>(lookupBookColumn.DisplayColumnValueName),
                        ["Number"] = number
                    });
                }
            }
            return result;
        }

        private IEntitySchemaQueryFilterItem ExtractFilterFromParameters(UserConnection userConnection,
            Guid entitySchemaUId, IReadOnlyDictionary<string, object> parameters) {
            var managerItem = userConnection.EntitySchemaManager.GetItemByUId(entitySchemaUId);
            return parameters.ExtractEsqFilterFromReportParameters(userConnection, managerItem.Name) ??
                throw new Exception();
            ;
        }

        private IEnumerable<IReadOnlyDictionary<string, object>> GetLocalizableStrings(UserConnection userConnection) {
            var localizableStrings = _localizableStringNames.ToDictionary(x => x,
                x => (object)(new LocalizableString(userConnection.ResourceStorage, _resourceManagerName,
                    $"LocalizableStrings.{x}.Value")).Value);
            return new[] { localizableStrings };
        }

        #endregion

        #region Methods: Public

        public Task<ReportDataDictionary> GetData(UserConnection userConnection,
            IReadOnlyDictionary<string, object> parameters) {
            var contactFilter = ExtractFilterFromParameters(userConnection, _contactEntitySchemaUId, parameters);
            //var bookFilter = ExtractFilterFromParameters(userConnection, _nsBookEntitySchemaUId, parameters);
            var result = new ReportDataDictionary {
                ["Contact"] = GetContactData(userConnection, _contactEntitySchemaUId, contactFilter),
                ["NsHistory"] = GetHistoryData(userConnection, _nsHistoryEntitySchemaUId,
                    contactFilter),
                ["LocalizableStrings"] = GetLocalizableStrings(userConnection)
            };
            return Task.FromResult(result);
        }

        #endregion

    }

    #endregion

}







