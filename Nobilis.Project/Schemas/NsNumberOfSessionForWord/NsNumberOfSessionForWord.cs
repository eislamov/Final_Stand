namespace Terrasoft.Configuration
{
    using System;
    using System.CodeDom.Compiler;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Web;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Packages;
    using Terrasoft.Core.Factories;

    [ExpressionConverterAttribute("NsNumberOfSessionForWord")]
    class AccountInfoByTypeConverter : IExpressionConverter
    {
        private UserConnection _userConnection;
        private string _currentMonthPrice;
        private string _allSumPrice;
        private string _currentMonthNumber;
        private string _allNumber;
        /*private void SetResources()
        {
            string sourceCodeName = "NsNumberOfSessionForWord";
            _currentMonthPrice = new LocalizableString(_userConnection.ResourceStorage, sourceCodeName,
                "LocalizableStrings.NsCurrentMonthPriceSession.Value");
            _allSumPrice = new LocalizableString(_userConnection.ResourceStorage, sourceCodeName,
                "LocalizableStrings.NsAllSumPriceSession.Value");
            _currentMonthNumber = new LocalizableString(_userConnection.ResourceStorage, sourceCodeName,
                "LocalizableStrings.NsCurrentMonthNumberOfSession.Value");
            _allNumber = new LocalizableString(_userConnection.ResourceStorage, sourceCodeName,
                "LocalizableStrings.NsAllNumberOfSession.Value");
        }*/
        public string Evaluate(object value, string arguments = "")
        {
            try
            {
                _userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
                Guid treatmentId = new Guid(value.ToString());
                return getSessionInfo(treatmentId, arguments);
            }
            catch (Exception err)
            {
                return err.Message;
            }
        }
        private string getSessionInfo(Guid treatmentId, string arguments)
        {
            try
            {
                EntitySchemaQuery esq = new EntitySchemaQuery(_userConnection.EntitySchemaManager, nameof(NsSessions));
                esq.AddAllSchemaColumns();
                var sessionFilter = esq.CreateFilterWithParameters(
                    FilterComparisonType.Equal,
                    nameof(NsSessions.TreatmentProg),
                    treatmentId);
                esq.Filters.Add(sessionFilter);
                EntityCollection entities = esq.GetEntityCollection(_userConnection);
                decimal sumAll = 0;
                decimal sumMonth = 0;
                int countAll = 0;
                int countMonth = 0;
                if (entities.Count > 0)
                {
                    switch (arguments)
                    {
                        case "AllSumPrice":
                            for (int i = 0; i < entities.Count; i++)
                            {
                                object sum = entities[i].GetColumnValue(nameof(NsSessions.Price));
                                sumAll += Convert.ToDecimal(sum);
                            }
                            //return String.Format(_allSumPrice, sumAll.ToString());
                            return sumAll.ToString();

                        case "CurrentMonthNumber":
                            for (int i = 0; i < entities.Count; i++)
                            {
                                object dateObj = entities[i].GetColumnValue(nameof(NsSessions.Date));
                                DateTime date = Convert.ToDateTime(dateObj);
                                var curDate = _userConnection.CurrentUser.GetCurrentDateTime();
                                if (curDate.Month == date.Month && curDate.Year == date.Year)
                                {
                                    countMonth += 1;
                                }
                            }
                            //return String.Format(_currentMonthNumber, countMonth.ToString());
                            return countMonth.ToString();
                        case "AllNumber":
                            countAll = entities.Count;
                            //return String.Format(_allNumber, countAll.ToString());
                            return countAll.ToString();
                        case "CurrentMonthPrice":
                            for (int i = 0; i < entities.Count; i++)
                            {
                                object dateObj = entities[i].GetColumnValue(nameof(NsSessions.Date));
                                DateTime date = Convert.ToDateTime(dateObj);
                                var curDate = _userConnection.CurrentUser.GetCurrentDateTime();
                                if (curDate.Month == date.Month && curDate.Year == date.Year)
                                {
                                    object sum = entities[i].GetColumnValue(nameof(NsSessions.Price));
                                    sumMonth += Convert.ToDecimal(sum);
                                }
                            }
                            //return String.Format(_allSumPrice, sumMonth.ToString());
                            return sumMonth.ToString();
                    }
                }
                return String.Empty;
            }
            catch (Exception err)
            {
                throw err;
            }
        }
    }
}