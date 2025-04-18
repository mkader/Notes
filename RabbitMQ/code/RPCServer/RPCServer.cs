﻿using System;
			using RabbitMQ.Client;
			using RabbitMQ.Client.Events;
			using System.Text;

			class RPCServer {
			    public static void Main() {
				var factory = new ConnectionFactory() { HostName = "localhost" };
				using (var connection = factory.CreateConnection())
				using (var channel = connection.CreateModel())
				{
				    channel.QueueDeclare(queue: "rpc_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
				    //Run more than one server process. to spread the load equally over multiple servers, to set the prefetchCount setting in channel.BasicQos.
				    channel.BasicQos(0, 1, false);
				    var consumer = new EventingBasicConsumer(channel);
				    //use BasicConsume to access the queue.
				    channel.BasicConsume(queue: "rpc_queue", autoAck: false, consumer: consumer);
				    Console.WriteLine(" [x] Awaiting RPC requests");

				    consumer.Received += (model, ea) => {
					string response = null;

					var body = ea.Body;
					var props = ea.BasicProperties;
					var replyProps = channel.CreateBasicProperties();
					replyProps.CorrelationId = props.CorrelationId;

					try {
					    var message = Encoding.UTF8.GetString(body);
					    int n = int.Parse(message);
					    Console.WriteLine(" [.] fib({0})", message);
					    response = fib(n).ToString();
					} catch (Exception e) {
					    Console.WriteLine(" [.] " + e.Message);
					    response = "";
					} finally {
					    var responseBytes = Encoding.UTF8.GetBytes(response);
					    channel.BasicPublish(exchange: "", routingKey: props.ReplyTo, basicProperties: replyProps, body: responseBytes);
					    channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
					}
				    };

				    Console.WriteLine(" Press [enter] to exit.");
				    Console.ReadLine();
				}
			    }

			    /// 

			    /// Assumes only valid positive integer input.
			    /// Don't expect this one to work for big numbers, and it's
			    /// probably the slowest recursive implementation possible.
			    /// 
			    private static int fib(int n) {
				if (n == 0 || n == 1) {
				    return n;
				}

				return fib(n - 1) + fib(n - 2);
			    }
			}