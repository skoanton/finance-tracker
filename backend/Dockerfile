# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Set the environment to Development (optional for debugging)
ENV ASPNETCORE_ENVIRONMENT=Development

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["backend/backend.csproj", "backend/"]
RUN dotnet restore "./backend/backend.csproj"
COPY . .
WORKDIR "/src/backend"
RUN dotnet build "./backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Add wait-for-it.sh script during build stage
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app

# Copy published app and the wait-for-it script into the final stage
COPY --from=publish /app/publish .
COPY --from=build /app/wait-for-it.sh /app/wait-for-it.sh

# Switch to root for setting permissions and running the script
USER root

# Set permissions for the wait-for-it script
RUN chmod +x /app/wait-for-it.sh

# Run wait-for-it.sh and start the app once MySQL is available
ENTRYPOINT ["/bin/bash", "-c", "chmod +x /app/wait-for-it.sh && /app/wait-for-it.sh mysql-db:3306 --timeout=60 --strict -- dotnet backend.dll"]
