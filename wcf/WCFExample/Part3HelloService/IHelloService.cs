﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Part3HelloService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IHelloService" in both code and config file together.
    //Part 2
    /*[ServiceContract]
    public interface IHelloService*/
    //Part 4
    /*[ServiceContract]*/
    [ServiceContract(Name = "IHelloService")]
    public interface IHelloServiceChanged
    {
        [OperationContract(Name ="GetMessage")]
        string GetMessageChanged(string name);
    }
}
