using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BBetModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace BBetModels
{
    public class JsonRespClient
    {

        public static long ServerNonce
        {
            get { return DateTime.UtcNow.Ticks / 10; }
        }


        private static readonly JsonRespClient _None = new JsonRespClient { State = RequestStates.None };

        [JsonConverter(typeof(StringEnumConverter))]
        public RequestStates State;

        [JsonConverter(typeof(StringEnumConverter))]
        public RequestTypes Type;

        public long Nonce;

        [JsonIgnore]
        public int Size;
        [JsonIgnore]
        public int Node_to_Forward;

        public int Page;
        public int Count;

        public object Data;
        public string Error;

        [JsonIgnore]
        public JsonRespClient[] Next;

        public JsonRespClient()
        {
            State = RequestStates.Error;
            Nonce = ServerNonce;
        }
      
     

   

        public override string ToString()
        {
            var result = default(string);
            if (State != RequestStates.None)
            {
                try
                {
                    result = RequestBas0.Serialize(PropertyTypes.Public, Type, this);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Could not serialize " + ex.ToString());
                }
            }

            return result;
        }


    }
}
