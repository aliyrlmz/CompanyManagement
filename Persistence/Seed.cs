using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Companies.Any()) return;
            
            var companies = new List<Company>
            {
                new Company
                {
                    Name = "Company 1",
                    Email = "c1@gmail.com",
                    Username =  "company1",
                    Password = PasswordHelper.HashPasword("c1pw", out byte[] salt),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt, 0, salt.Length),
                },
                new Company
                {
                    Name = "Company 2",
                    Email = "c2@gmail.com",
                    Username =  "company2",
                    Password = PasswordHelper.HashPasword("c2pw", out byte[] salt2),
                    createDate = DateTime.UtcNow.AddDays(-1),
                    updateDate = DateTime.UtcNow.AddDays(-2),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt2, 0, salt2.Length),
                },
                new Company
                {
                    Name = "Company 3",
                    Email = "c3@gmail.com",
                    Username =  "company3",
                    Password = PasswordHelper.HashPasword("c3pw", out byte[] salt3),
                    createDate = DateTime.UtcNow.AddDays(-2),
                    updateDate = DateTime.UtcNow.AddDays(-3),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt3, 0, salt3.Length),
                },
                new Company
                {
                    Name = "Company 4",
                    Email = "c4@gmail.com",
                    Username =  "company4",
                    Password = PasswordHelper.HashPasword("c4pw", out byte[] salt4),
                    createDate = DateTime.UtcNow.AddDays(-3),
                    updateDate = DateTime.UtcNow.AddDays(-4),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt4, 0, salt4.Length),
                    Status = 0
                },
                new Company
                {
                    Name = "Company 5",
                    Email = "c5@gmail.com",
                    Username =  "company5",
                    Password = PasswordHelper.HashPasword("c1pw", out byte[] salt5),
                    createDate = DateTime.UtcNow.AddDays(-4),
                    updateDate = DateTime.UtcNow.AddDays(-5),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt5, 0, salt5.Length),
                    Status = 1
                },
                
            };

            await context.Companies.AddRangeAsync(companies);
            await context.SaveChangesAsync();
        }
    }
}