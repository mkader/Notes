using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Part2HelloRemotingService
{
    public class HelloRemotingService : MarshalByRefObject, Part2IHelloRemotingService.IHelloRemotingService
    {
        public string GetMessage(string name)
        {
            return "Hello " + name;
        }
    }
}
