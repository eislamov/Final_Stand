 namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Threading.Tasks;
    using Terrasoft.Common;
    using Terrasoft.Configuration.Reporting.FastReport;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Factories;
    using Terrasoft.Nui.ServiceModel.Extensions;
    using EntitySchema = Terrasoft.Core.Entities.EntitySchema;
    using EntitySchemaColumn = Terrasoft.Core.Entities.EntitySchemaColumn;

    // Название класса провайдера данных для отчета, логику которого необходимо реализовать.
    [DefaultBinding(typeof(IFastReportDataSourceDataProvider), Name = "ContactDataProvider")]
    public class ContactDataProvider : IFastReportDataSourceDataProvider
    {

        private Guid _entitySchemaUId = new Guid("16BE3651-8FE2-4159-8DD0-A803D4683DD3");
        // Название схемы c исходным кодом.
       private readonly string _resourceManagerName = "NsContactDataSourceCode";
        private readonly string[] _localizableStringNames = new[] {
            "ReportTitle",
            "FullNameLabel",
            "BirthdayLabel",
            "GenderLabel",
            "AccountLabel"
        };

        // Заполнение колонок в отчете.
       private IEnumerable<IReadOnlyDictionary<string, object>> GetContactData(
            UserConnection userConnection,
            Guid entitySchemaUId,
            IEntitySchemaQueryFilterItem filter) {
                // Получить схему объекта.
                var entitySchema = userConnection.EntitySchemaManager.GetInstanceByUId(entitySchemaUId);
                // Создание объекта класса EntitySchemaQuery.
                EntitySchemaQuery query = new EntitySchemaQuery(entitySchema);
                // Добавление колонок в запрос.
                query.AddColumn("Name");
                query.AddColumn("BirthDate");
                var gender = query.AddColumn("Gender.Name");
                var account = query.AddColumn("Account.Name");
                // Добавление созданного фильтра.
                query.Filters.Add(filter);
                // Получить коллекцию контактов.
                var contacts = query.GetEntityCollection(userConnection);
                var contactsCollection = new Collection<Dictionary<string, object>>();
                // Заполнение колонок в отчете.
                foreach (var entity in contacts)
                {
                    contactsCollection.Add(new Dictionary<string, object> {
                        ["Full name"] = entity.GetTypedColumnValue<string>("Name"),
                        ["Birthday"] = entity.GetTypedColumnValue<string>("BirthDate"),
                        ["Gender"] = entity.GetTypedColumnValue<string>(gender.Name),
                        ["Account"] = entity.GetTypedColumnValue<string>(account.Name)
                    });
                }
                return contactsCollection;
        }
        
        // Локализация заголовков отчета.
        private IEnumerable<IReadOnlyDictionary<string, object>> GetLocalizableStrings(UserConnection userConnection) {
            var localizableStrings = _localizableStringNames.ToDictionary(
                x => x,
                x => (object)(new LocalizableString(userConnection.ResourceStorage, _resourceManagerName, $"LocalizableStrings.{x}.Value")).Value);
            return new[] { localizableStrings };
        }
        
        // Добавление фильтров интерфейса.
        private IEntitySchemaQueryFilterItem ExtractFilterFromParameters(UserConnection userConnection, Guid entitySchemaUId,
                IReadOnlyDictionary<string, object> parameters) {
            var managerItem = userConnection.EntitySchemaManager.GetItemByUId(entitySchemaUId);
            return parameters.ExtractEsqFilterFromReportParameters(userConnection, managerItem.Name) ?? throw new Exception();
        } 

        // Получить данные.
        public Task<ReportDataDictionary> GetData(UserConnection userConnection, IReadOnlyDictionary<string, object> parameters) {
            var filter = ExtractFilterFromParameters(userConnection, _entitySchemaUId, parameters);
            var result = new ReportDataDictionary {
                // Заполнить колонки в отчете.
                 ["ContactData"] = GetContactData(userConnection, _entitySchemaUId, filter),
                ["LocalizableStrings"] = GetLocalizableStrings(userConnection)
            };
            return Task.FromResult(result);
        }
    }
}