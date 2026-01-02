using System;
using AuctionService.Data;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Services;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext;
    private readonly ILogger<GrpcAuctionService> _logger;

    public GrpcAuctionService(AuctionDbContext dbContext, ILogger<GrpcAuctionService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
    {
       _logger.LogInformation("----> Received gRPC request for auction " + request.Id);

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id));
        if (auction == null) throw new RpcException(new Status(StatusCode.NotFound, "Auction not found"));

        var response = new GrpcAuctionResponse
        {
            Auction = new GrpcAuctionModel
            {
                AuctionEnd = auction.AuctionEnd.ToString(),
                Id = auction.Id.ToString(),
                ReservePrice = auction.ReservePrice,
                Seller = auction.Seller
            }
        };

        return response;
    }
}
