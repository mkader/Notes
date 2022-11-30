using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;

namespace Part2HelloRemotingServiceClient
{
    public partial class Form1 : Form
    {
        Part2IHelloRemotingService.IHelloRemotingService client;
        public Form1()
        {
            InitializeComponent();
            TcpChannel channel = new TcpChannel();
            ChannelServices.RegisterChannel(channel);
            client =(Part2HelloRemotingService.HelloRemotingService)Activator.GetObject(
                typeof(Part2HelloRemotingService.HelloRemotingService),
                "tcp://localhost:8080/GetMessage");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            label1.Text = client.GetMessage(textBox1.Text);
        }
    }
}
