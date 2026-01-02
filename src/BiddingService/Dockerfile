FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY AuctionHub.sln ./
COPY src/BiddingService/BiddingService.csproj ./src/BiddingService/
COPY src/Contracts/Contracts.csproj ./src/Contracts/

# proto
#COPY src/BiddingService/Protos ./src/BiddingService/Protos

RUN dotnet restore ./src/BiddingService/BiddingService.csproj

COPY . .
RUN dotnet publish ./src/BiddingService/BiddingService.csproj -c release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet","BiddingService.dll" ]