using System;
using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;
    private readonly ILogger<BidPlacedConsumer> _logger;

    public BidPlacedConsumer(AuctionDbContext dbContext, ILogger<BidPlacedConsumer> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        _logger.LogInformation(
            "--> Bid received | AuctionId: {AuctionId}, Amount: {Amount}, Status: {Status}",
            context.Message.AuctionId,
            context.Message.Amount,
            context.Message.BidStatus
        );

        var auctionId = Guid.Parse(context.Message.AuctionId);
        var auction = await _dbContext.Auctions.FindAsync(auctionId);

        if (auction == null)
        {
            _logger.LogWarning("Auction not found: {AuctionId}", auctionId);
            return;
        }

        if (
            auction.CurrentHighBid == null
            ||
            (
                context.Message.BidStatus.Contains("Accepted")
                && context.Message.Amount > auction.CurrentHighBid
            )
        )
        {
            auction.CurrentHighBid = context.Message.Amount;
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation(
                "CurrentHighBid updated to {Amount} for auction {AuctionId}",
                context.Message.Amount,
                auctionId
            );
        }
    }



}