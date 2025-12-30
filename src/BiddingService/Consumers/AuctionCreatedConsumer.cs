using System;
using Contracts;
using MassTransit;

namespace BiddingService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    public Task Consume(ConsumeContext<AuctionCreated> context)
    {
        throw new NotImplementedException();
    }
}
