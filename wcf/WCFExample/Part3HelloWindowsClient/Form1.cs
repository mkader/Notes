using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Part3HelloWindowsClient
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            /*Part3HelloService.HelloServiceClient client =
                new Part3HelloService.HelloServiceClient("NetTcpBinding_IHelloService");
            label1.Text = client.GetMessage(textBox1.Text);*/

            Part3HelloService.IEmployeeService esc 
                = new Part3HelloService.EmployeeServiceClient("BasicHttpBinding_IEmployeeService");

            Part3HelloService.EmployeeRequest request = new Part3HelloService.EmployeeRequest();
            request.EmployeeId = Int32.Parse(textBox1.Text);
            request.LicenseKey = textBox1.Text + "_Key";

            var t = esc.GetEmployee(request);

            Part3HelloService.EmployeeInfo ei = new Part3HelloService.EmployeeInfo();
            ei = t;

            esc.SaveEmployee(ei);
        }
    }
}
