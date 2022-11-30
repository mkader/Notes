using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Part3HelloWebClient
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //throw exception An endpoint configuration section for contract 'Part3HelloService.IHelloService' could not be loaded because more than one endpoint configuration for that contract was found.Please indicate the preferred endpoint configuration section by name.
            //Part3HelloService.HelloServiceClient client = new Part3HelloService.HelloServiceClient();
            Part3HelloService.HelloServiceClient client = new Part3HelloService.HelloServiceClient("BasicHttpBinding_IHelloService");
            Label1.Text = client.GetMessage(TextBox1.Text);
        }
    }
}