using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Part6EmployeeWinClient
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                Part6EmployeeService.EmployeeServiceClient esc
                    = new Part6EmployeeService.EmployeeServiceClient("BasicHttpBinding_IEmployeeService");
                var t = esc.GetEmployee(1);


                 Part6EmployeeService.FullTimeEmployee f = new Part6EmployeeService.FullTimeEmployee();
               f.Type = Part6EmployeeService.EmployeeType.FullTime;
               f.ID = 1;
               f.AnnualSalary = 123;
               esc.SaveEmployee(f);

                /*Part6EmployeeService.Employee e1 = new Part6EmployeeService.Employee();
                //f.Type = Part6EmployeeService.Employee.FullTime;
                e1.ID = 1;
                //e.AnnualSalary = 123;
                esc.SaveEmployee(e1);*/
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
