using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;

namespace Part2RemotingServiceHost
{
    class Program
    {
        static void Main(string[] args)
        {
            Part2HelloRemotingService.HelloRemotingService channles = new Part2HelloRemotingService.HelloRemotingService();
            TcpChannel channel = new TcpChannel(8080);
            ChannelServices.RegisterChannel(channel);
            RemotingConfiguration.RegisterWellKnownServiceType(
                typeof(Part2HelloRemotingService.HelloRemotingService), "GetMessage", WellKnownObjectMode.Singleton);
            Console.WriteLine("Host started @ " + DateTime.Now.ToString());
            Console.ReadLine();
        }
    }
}
