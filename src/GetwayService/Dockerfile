FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY AuctionHub.sln ./
COPY src/GetwayService/GetwayService.csproj ./src/GetwayService/

RUN dotnet restore ./src/GetwayService/GetwayService.csproj

COPY . .
RUN dotnet publish ./src/GetwayService/GetwayService.csproj -c release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet","GetwayService.dll" ]