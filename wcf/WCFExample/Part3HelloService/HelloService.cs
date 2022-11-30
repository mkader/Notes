using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Part3HelloService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "HelloService" in both code and config file together.
    
    //public class HelloService : IHelloService //part 2
    public class HelloService : IHelloServiceChanged //part4
    {
        public string GetMessageChanged(string name)
        {
            return "Hello " + name;
        }
    }
}
