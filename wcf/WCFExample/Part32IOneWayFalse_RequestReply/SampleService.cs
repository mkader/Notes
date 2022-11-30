using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Part32IOneWayFalse_RequestReply
{
    //[ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Reentrant)]
    //[ServiceBehavior(InstanceContextMode =InstanceContextMode.Single)]
    //[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall, ConcurrencyMode = ConcurrencyMode.Single)]

    public class SampleService : ISampleService
    {
        /*public void OneWayOperation()
        {
            Thread.Sleep(2000);
        }

        public void OneWayOperation_ThrowsException()
        {
            throw new NotImplementedException();
        }

        public string RequestReplyOperation()
        {
            DateTime dtStart = DateTime.Now;
            Thread.Sleep(5000);
            DateTime dtEnd = DateTime.Now;

            return dtEnd.Subtract(dtStart).Seconds.ToString() + " seconds processing time";
        }

        public string RequestReplyOperation_ThrowsException()
        {
            throw new NotImplementedException();
        }*/
        /* public void ProcessReport()
         {
             for(int i = 1; i <= 100; i++)
             {
                 Thread.Sleep(200);
                 OperationContext.Current
                     .GetCallbackChannel<ISampleServiceCallback>().Progress(i);
             }
         }*/
        /*public File DownloadFile()
        {
            File file = new File();
            file.content = System.IO.File.ReadAllBytes(@"C:\Users\kadermxabq\Downloads\bi_rank.png");
            file.name = "bi_rank_1.png";
            return file;
        }*/

        //private int _increment;
        //public int IncrementNumber()
        //{
        //    Console.WriteLine("Session ID " + OperationContext.Current.SessionId);
        //    _increment = _increment + 1;
        //    return _increment;
        //}

        //public List<int> GetEvenNumbers()
        //{
        //    Console.WriteLine("Thread {0} started processing GetEvenNumbers at {1}",
        //        Thread.CurrentThread.ManagedThreadId, DateTime.Now.ToString());
        //    List<int> listEvenNumbers = new List<int>();
        //    for (int i = 0; i <= 10; i++)
        //    {
        //        Thread.Sleep(200);
        //        if (i % 2 == 0)
        //        {
        //            listEvenNumbers.Add(i);
        //        }
        //    }
        //    Console.WriteLine("Thread {0} completed processing GetEvenNumbers at {1}",
        //        Thread.CurrentThread.ManagedThreadId, DateTime.Now.ToString());
        //    return listEvenNumbers;
        //}

        //public List<int> GetOddNumbers()
        //{
        //    Console.WriteLine("Thread {0} started processing GetOddNumbers at {1}",
        //        Thread.CurrentThread.ManagedThreadId, DateTime.Now.ToString());
        //    List<int> listOddNumbers = new List<int>();
        //    for (int i = 0; i <= 10; i++)
        //    {
        //        Thread.Sleep(200);
        //        if (i % 2 != 0)
        //        {
        //            listOddNumbers.Add(i);
        //        }
        //    }
        //    Console.WriteLine("Thread {0} completed processing GetOddNumbers at {1}",
        //        Thread.CurrentThread.ManagedThreadId, DateTime.Now.ToString());
        //    return listOddNumbers;
        //}

        //public void DoWork()
        //{
        //    Thread.Sleep(1000);
        //    Console.WriteLine("Thread {0} processing request @ {1}", Thread.CurrentThread.ManagedThreadId, DateTime.Now);
        //}
        public string GetMessage(string message)
        {
            return "Hello " + message;
        }

        public string GetMessageWithoutAnyProtection()
        {
            return "Message without signature and encryption";
        }

        public string GetSignedMessage()
        {
            return "Message with signature but without encryption"; //but digitialy signed
        }

        public string GetSignedAndEncryptedMessage()
        {
            return "Message signed and encrypted";
        }
    }
}
