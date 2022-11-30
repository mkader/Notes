using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Part3HelloWindowsClient
{
    public partial class Form1 : Form
    {
        Part3HelloService.IEmployeeService esc;
        public Form1()
        {
            InitializeComponent();
            esc  = new Part3HelloService.EmployeeServiceClient();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            /*Part3HelloService.HelloServiceClient client =
                new Part3HelloService.HelloServiceClient("NetTcpBinding_IHelloService");
            label1.Text = client.GetMessage(textBox1.Text);*/

            //Part3HelloService.IEmployeeService esc 
            //    = new Part3HelloService.EmployeeServiceClient("BasicHttpBinding_IEmployeeService");

            /*Part3HelloService.EmployeeRequest request = new Part3HelloService.EmployeeRequest();
            request.EmployeeId = Int32.Parse(textBox1.Text);
            request.LicenseKey = textBox1.Text + "_Key";

            var t = esc.GetEmployee(request);

            Part3HelloService.EmployeeInfo ei = new Part3HelloService.EmployeeInfo();
            ei = t;

            esc.SaveEmployee(ei);*/

            //Part3HelloService.Employee emp = esc.GetEmployee(Int32.Parse(textBox1.Text));
            //emp.Gender = "Male";
            //esc.SaveEmployee(emp);
            //emp = esc.GetEmployee(emp.ID);

            try
            {
                var d = esc.Divide(Int32.Parse(textBox1.Text), Int32.Parse(textBox2.Text));
                label2.Text = d.ToString();
            }
            catch (FaultException faultException){
                label2.Text = faultException.Code + " - " +faultException.Message;
            }
            //catch(FaultException<Part3HelloService.DivideByZero> d)
            //{ 
             //   label2.Text = d.Detail.Error + " - " + d.Detail.Message;
            //}
            
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            esc = new Part3HelloService.EmployeeServiceClient();
        }
    }
}
