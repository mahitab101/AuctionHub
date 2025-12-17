using System;
using Contracts;
using MassTransit;

namespace AuctionService.Consumer;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("--> consume faulcy creation");
        var exception = context.Message.Exceptions.First();
        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model="FooBar";
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("No an argument found");
        }
    }
}
