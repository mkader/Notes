using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using System.Runtime.Serialization;

namespace Part10Employee
{
    [MessageContract(IsWrapped =true,WrapperName = "EmployeeRequestObject", WrapperNamespace = "http://DNS.com/Employee")]
    public class EmployeeRequest
    {
        [MessageHeader(Namespace = "http://DNS.com/Employee")]
        public string LicenseKey { get; set; }

        [MessageBodyMember(Namespace = "http://DNS.com/Employee")]
        public int EmployeeId { get; set; }
    }

    [MessageContract(IsWrapped =true,WrapperName = "EmployeeInfoObject", WrapperNamespace = "http://DNS.com/Employee")]
    public class EmployeeInfo
    {
        public EmployeeInfo() { }
        public EmployeeInfo(Employee e) {
            this.Id = e.Id;
            //this.Name = e.Name;
            //this.Gender = e.Gender;
            this.DateOfBirth = e.DateOfBirth;
            this.Type = e.Type;
            if (this.Type == EmployeeType.FullTime)
            {
                this.AnnualSalary = ((FullTimeEmployee)e).AnnualSalary;
            }
            else
            {
                this.HourlySalary = ((PartTimeEmployee)e).HourlySalary;
                this.HourlyWorked = ((PartTimeEmployee)e).HourlyWorked;
            }
        }
        [MessageBodyMember(Order =1,Namespace = "http://DNS.com/Employee")]
        public int Id { get; set; }

        [MessageBodyMember(Order = 2, Namespace = "http://DNS.com/Employee")]
        public string Name { get; set; }

        [MessageBodyMember(Order = 3, Namespace = "http://DNS.com/Employee")]
        public string Gender { get; set; }

        [MessageBodyMember(Order = 4, Namespace = "http://DNS.com/Employee")]
        public DateTime DateOfBirth { get; set; }

        [MessageBodyMember(Order = 5, Namespace = "http://DNS.com/Employee")]
        public EmployeeType Type { get; set; }

        [MessageBodyMember(Order = 6, Namespace = "http://DNS.com/Employee")]
        public double AnnualSalary { get; set; }

        [MessageBodyMember(Order = 7, Namespace = "http://DNS.com/Employee")]
        public double HourlySalary { get; set; }

        [MessageBodyMember(Order = 8, Namespace = "http://DNS.com/Employee")]
        public double HourlyWorked { get; set; }

    }

    //[KnownType(typeof(FullTimeEmployee))]
    //[KnownType(typeof(PartTimeEmployee))]
    [DataContract(Namespace = "http://DayNightSoft.com/Employee")]
    public class Employee
    {
        [DataMember(Order = 1)]
        public int Id { get; set; }

        [DataMember(Order = 2, IsRequired =true)]
        public string Name { get; set; }

        //[DataMember(Order = 3)]
        //public string Gender { get; set; }

        [DataMember(Order = 4)]
        public DateTime DateOfBirth { get; set; }

        [DataMember(Order = 5)]
        public EmployeeType Type { get; set; }

        [DataMember(Order = 6)]
        public string City { get; set; }
    }

    public enum EmployeeType
    {
        FullTime = 1,
        PartTime = 2
    }

    public class FullTimeEmployee: Employee
    {
        public double AnnualSalary { get; set; }
    }
    public class PartTimeEmployee : Employee
    {
        public double HourlySalary { get; set; }
        public double HourlyWorked { get; set; }
    }
}
