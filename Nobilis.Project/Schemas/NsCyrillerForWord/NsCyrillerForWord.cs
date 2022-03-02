 namespace Terrasoft.Configuration
{
    using System;
    using System.Web;
    using Terrasoft.Core;
    using Cyriller;
    using Cyriller.Model;


    [ExpressionConverterAttribute("NsCyrillerForWord")]
    class NsCyrillerForWord : IExpressionConverter
    {
        private static CyrName cyrName = new CyrName();
        private UserConnection _userConnection;
        public string Evaluate(object value, string arguments = "")
        {
            try
            {
                _userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
                string word = value.ToString();

                switch (arguments)
                {
                    case "Genitive":
                        CyrResult res = cyrName.Decline(word);
                        var result = res.Genitive;
                        return result;
                    case "Dative":
                        res = cyrName.Decline(word);
                        result = res.Dative;
                        return result;
                    case "Accusative":
                        res = cyrName.Decline(word);
                        result = res.Accusative;
                        return result;
                    case "Instrumental":
                        res = cyrName.Decline(word);
                        result = res.Instrumental;
                        return result;
                    case "Prepositional":
                        res = cyrName.Decline(word);
                        result = res.Prepositional;
                        return result;
                    default:
                        res = cyrName.Decline(word);
                        result = res.Nominative;
                        return result;
                }
                
            }
            catch (Exception err)
            {
                return err.Message;
            }
        }
    }
}