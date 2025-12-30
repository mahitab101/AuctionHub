using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
{
    private readonly ILogger<AuctionDeletedConsumer> _logger;
    public AuctionDeletedConsumer(ILogger<AuctionDeletedConsumer> logger)
    {
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {

        _logger.LogInformation("Consuming Auction Deleted {id}", context.Message.Id);

        var result = await DB.DeleteAsync<Item>(
            x => x.ID == context.Message.Id
        );

        if (result.DeletedCount == 0)
        {
            _logger.LogInformation("Item not found in Mongo {id}",context.Message.Id);
        }
    }

}
