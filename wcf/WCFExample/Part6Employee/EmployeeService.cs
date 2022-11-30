using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Part6Employee
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "EmployeeService" in both code and config file together.
    //Part 13 - ExtensionDataObject in WCF

    [GlobalErrorHandlerBehaviour(typeof(GlobalErrorHandler))]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class EmployeeService : IEmployeeService
    {
        public double Divide(int a, int b)
        {
            //if (b == 0) throw new DivideByZeroException();
            //if (b == 0) throw new FaultException("B can't be 0", new FaultCode("DivideByZero"));
            //try
            //{
                return a / b;
            /*}
            catch (DivideByZeroException e)
            {
                DivideByZero d = new DivideByZero();
                d.Error = "Divide By Zero Error";
                d.Message = e.Message;

                throw new FaultException<DivideByZero>(d);
            }*/
        }

        private Employee _lastsaved;
        public Employee GetEmployee(int id)
        {
            //Part 7 - KnownType attribute in WCF
            Employee employee = null;
            employee = new Employee()
            {
                ID = id,
                Name = "Name " + id,
                //Gender = "Gender " + id,
                DateOfBirth = Convert.ToDateTime("12/12/2017"),
            };
            /*//SqlDataReader reader = cmd.ExecuteReader();
            EmployeeType et = EmployeeType.FullTime;//(EmployeeType)reader["EmployeeType"];
            if (et == EmployeeType.FullTime)
            {*/
                employee = new FullTimeEmployee()
                {
                    ID = id,
                    Name = "Name " + id,
                    //Gender = "Gender " + id,
                    DateOfBirth = Convert.ToDateTime("12/12/2017"),
                    AnnualSalary = 123.123,
                    Type = EmployeeType.FullTime,
                };
            /*}
            else
            {
                employee = new PartTimeEmployee()
                {
                    ID = id,
                    Name = "Name " + id,
                    Gender = "Gender " + id,
                    DateOfBirth = Convert.ToDateTime("12/12/2017"),
                    HourlyRate = 123.123,
                    Type = EmployeeType.PartTime,
                };
            }*/
            //Part 13 - ExtensionDataObject in WCF
            if (_lastsaved!=null && _lastsaved.ID == id)
            {
                employee.ExtensionData = _lastsaved.ExtensionData;
            }
            return employee;
        }

        public void SaveEmployee(Employee employee)
        {
            _lastsaved = employee; //Part 13 - ExtensionDataObject in WCF
            //emplyoee save db;
        }
    }
}
