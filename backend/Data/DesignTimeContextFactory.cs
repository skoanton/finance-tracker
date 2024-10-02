using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; // Namespace för ServerVersion
using server.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        // Dummy connection string, since the database is not required for migration creation
        var connectionString = "Server=localhost;Port=3306;Database=db;User=user;Password=password;";

        // Ange rätt version av MySQL
        var serverVersion = new MySqlServerVersion(new Version(8, 0, 39)); // Ändra versionen efter behov

        optionsBuilder.UseMySql(connectionString, serverVersion);

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}