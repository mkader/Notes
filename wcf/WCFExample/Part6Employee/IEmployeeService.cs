using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Part6Employee
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IEmployeeService" in both code and config file together.
    [ServiceContract]
    public interface IEmployeeService
    {
        //Part 15 - Exception handling in WCF
        [FaultContract(typeof(DivideByZero))]
        [OperationContract]
        double Divide(int a, int b);

        //Part 8 - Different ways of associating known types in wcf - type 3.
        [OperationContract]
        void SaveEmployee(Employee employee);

        //[ServiceKnownType(typeof(FullTimeEmployee))]
        //[ServiceKnownType(typeof(PartTimeEmployee))]
        [OperationContract]
        Employee GetEmployee(int id);
    }
}
