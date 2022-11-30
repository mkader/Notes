using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.ServiceModel.Dispatcher;
using System.ServiceModel.Channels;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Collections.ObjectModel;

namespace Part6Employee
{
    //1. without no decorate
    //2. with [Serializable] decorate
    //[Serializable]
    //3. with [DataContract] decorate & with namespace
    //[DataContract]
    //[DataContract(Namespace = "http://daynightsoft.com/Employee")]
    //4. with knowntype decorate  - Part 7 - KnownType attribute in WCF
    [KnownType(typeof(FullTimeEmployee))]
    [KnownType(typeof(PartTimeEmployee))]
    //5.Commented for  Part 8 - Different ways of associating known types in wcf, 3. part
    [DataContract(Namespace = "http://daynightsoft.com/Employee")]
    //6. Part 13 IExtensibleDataObject
    public class Employee :IExtensibleDataObject
    {
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string Name { get; set; }
        //[DataMember]
        //public string Gender { get; set; }
        [DataMember]
        public DateTime DateOfBirth { get; set; }
        [DataMember]
        public EmployeeType Type { get; set; }
        //Part 13 - ExtensionDataObject in WCF
        public ExtensionDataObject ExtensionData { get; set; }
    }

    //Part 7 - KnownType attribute in WCF
    public enum EmployeeType
    {
        FullTime,
        PartTime
    }

    //Part 7 - KnownType attribute in WCF
    public class FullTimeEmployee : Employee
    {
        public double AnnualSalary { get; set; }
    }

    //Part 7 - KnownType attribute in WCF
    public class PartTimeEmployee : Employee
    {
        public double HourlyRate { get; set; }
    }

    [DataContract]
    public class DivideByZero
    {
        [DataMember]
        public string Message { get; set; }

        [DataMember]
        public string Error { get; set; }
    }

    public class GlobalErrorHandler : IErrorHandler
    {
        public bool HandleError(Exception error)
        {
            return true;
        }

        public void ProvideFault(Exception error, MessageVersion version, ref Message fault)
        {
            if (error is FaultException) return;

            FaultException fe = new FaultException("A generic service error occuered");
            MessageFault mf = fe.CreateMessageFault();
            fault = Message.CreateMessage(version, mf, null);

        }
    }

    public class GlobalErrorHandlerBehaviourAttribute : Attribute, IServiceBehavior
    {
        private readonly Type errorHandleType;

        public GlobalErrorHandlerBehaviourAttribute(Type errorHandleType)
        {
            this.errorHandleType = errorHandleType;
        }

        public void AddBindingParameters(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase, Collection<ServiceEndpoint> endpoints, BindingParameterCollection bindingParameters)
        {
            
        }

        public void ApplyDispatchBehavior(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase)
        {
            IErrorHandler handler = (IErrorHandler)Activator.CreateInstance(this.errorHandleType);
            foreach(ChannelDispatcherBase cdb in serviceHostBase.ChannelDispatchers)
            {
                ChannelDispatcher cd = cdb as ChannelDispatcher;
                if (cd != null)
                    cd.ErrorHandlers.Add(handler);
            }
        }

        public void Validate(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase)
        {
           
        }
    }
}
