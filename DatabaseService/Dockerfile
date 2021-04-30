#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["DatabaseService.csproj", ""]
RUN dotnet restore "./DatabaseService.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "DatabaseService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DatabaseService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV MONGODBSETTINGS__HOST="172.17.0.1"
ENTRYPOINT ["dotnet", "DatabaseService.dll", "--environment=Development"]