using System;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace Part3HelloServiceHost
{
    class Program
    {
        static void Main()
        {
            /*
             * A binding instance has already been associated to 
             * listen URI 'http://localhost:8080/'. If two endpoints want to share the 
             * same ListenUri, they must also share the same binding object instance. 
             * The two conflicting endpoints were either specified in AddServiceEndpoint() 
             * calls, in a config file, or a combination of AddServiceEndpoint() and config. 
             */
            System.ServiceModel.ServiceHost host;
            // using (System.ServiceModel.ServiceHost host
            //    = new System.ServiceModel.ServiceHost(typeof(Part3HelloService.HelloService)))
            //using (System.ServiceModel.ServiceHost host
            //    = new System.ServiceModel.ServiceHost(typeof(Part10Employee.EmployeeService)))
            host = new System.ServiceModel.ServiceHost(typeof(Part6Employee.EmployeeService));
            using (host)
            {
                ServiceMetadataBehavior smb = new ServiceMetadataBehavior()
                {
                    HttpGetEnabled = true
                };
                host.Description.Behaviors.Add(smb);
                host.AddServiceEndpoint(
                    typeof(Part6Employee.IEmployeeService),
                    new NetTcpBinding(),
                    "EmployeeService");
                host.Open();
                Console.WriteLine("Host started @ " + DateTime.Now.ToString());
                Console.ReadLine();
            }
        }
    }
}
