using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; // Namespace för ServerVersion
using server.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        Console.WriteLine("Inside DesignTimeDbContextFactory.CreateDbContext"); // Debugging line
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        // Dummy connection string, since the database is not required for migration creation
        var dummyString = "Server=localhost;Port=3306;Database=db;User=user;Password=password;";

        Console.WriteLine($"Using connection string (DesignTime): {dummyString}"); // For debugging
        // Ange rätt version av MySQL
        optionsBuilder.UseMySql(dummyString, ServerVersion.AutoDetect(dummyString));
        return new ApplicationDbContext(optionsBuilder.Options);
    }
}