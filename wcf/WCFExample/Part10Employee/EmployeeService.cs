using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Part10Employee
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "EmployeeService" in both code and config file together.
    public class EmployeeService : IEmployeeService
    {
        public EmployeeInfo GetEmployee(EmployeeRequest request)
        {
            int id = 0;// request.EmployeeId;
            Employee e = null;
            if (id % 2 == 0)
            {
                e = new FullTimeEmployee()
                {
                    Id = id,
                    //Name = "Name " + id,
                    DateOfBirth = DateTime.Parse("12/12/1998"),
                    //Gender = "Male",
                    Type = EmployeeType.FullTime,
                    AnnualSalary = 125000,
                };
            }
            else
            {
                e = new PartTimeEmployee()
                {
                    Id = id,
                    //Name = "Name " + id,
                    DateOfBirth = DateTime.Parse("12/12/2019"),
                    //Gender = "Female",
                    Type = EmployeeType.PartTime,
                    HourlySalary = 85,
                    HourlyWorked = id*10,
                };
            }
            
            return new EmployeeInfo(e);
        }

        public EmployeeInfo GetEmployeeName(EmployeeRequest request)
        {
            int id = 15;
            Employee e = null;
            if (id % 2 == 0)
            {
                e = new FullTimeEmployee()
                {
                    Id = id,
                    //Name = "By Name " + id,
                    DateOfBirth = DateTime.Parse("12/12/1998"),
                    //Gender = "Male",
                    Type = EmployeeType.FullTime,
                    AnnualSalary = 125000,
                };
            }
            else
            {
                e = new PartTimeEmployee()
                {
                    Id = id,
                    //Name = "By Name " + id,
                    DateOfBirth = DateTime.Parse("12/12/2019"),
                    //Gender = "Female",
                    Type = EmployeeType.PartTime,
                    HourlySalary = 85,
                    HourlyWorked = id * 10,
                };
            }

            return new EmployeeInfo(e);
        }

        public void SaveEmployee(EmployeeInfo employee)
        {
            //record saves;
        }
    }
}
