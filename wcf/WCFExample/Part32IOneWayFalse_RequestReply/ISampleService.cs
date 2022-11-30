using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Part32IOneWayFalse_RequestReply
{
    //[ServiceContract(CallbackContract =typeof(ISampleServiceCallback))]
    //[ServiceContract(SessionMode = SessionMode.Required) ]
    [ServiceContract(CallbackContract = typeof(),ConfigurationName = "string", Namespace="string",ProtectionLevel =ProtectionLevel., SessionMode =SessionMode.r)]
    interface ISampleService
    {
        //Part 32 - Request Reply
        /*[OperationContract]
        string RequestReplyOperation();

        [OperationContract(IsOneWay = false)]
        string RequestReplyOperation_ThrowsException();

        //Part 33 - OneWay
        [OperationContract(IsOneWay =true)]
        void OneWayOperation();

        [OperationContract(IsOneWay = true)]
        void OneWayOperation_ThrowsException();*/

        /*//Part 34 - Duplex message
        [OperationContract(IsOneWay =true)]
        void ProcessReport();*/

        //[OperationContract]
        //File DownloadFile();

        //[OperationContract]
        //int IncrementNumber();

        //[OperationContract]
        //List<int> GetEvenNumbers();

        //[OperationContract]
        //List<int> GetOddNumbers();

        //[OperationContract(IsOneWay = true)]
        ////void DoWork();
        
        [OperationContract(Action ="string", AsyncPattern = true, IsInitiating =true, IsOneWay =true, IsTerminating =true, Name ="string", ProtectionLevel =ProtectionLevel.EncryptAndSign, ReplyAction ="string")]
        string GetMessage(string message);

        //[OperationContract(ProtectionLevel = ProtectionLevel.None)]
        //string GetMessageWithoutAnyProtection();

        //[OperationContract(ProtectionLevel = ProtectionLevel.Sign)]
        //string GetSignedMessage();

        //[OperationContract(ProtectionLevel = ProtectionLevel.EncryptAndSign)]
        //string GetSignedAndEncryptedMessage();
    }

    /*interface ISampleServiceCallback
    {
        [OperationContract(IsOneWay = true)]
        void Progress(int percentagecompleted);
    }*/

   /*[DataContract]
    public class File
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public byte[] content { get; set; }
    }*/
}