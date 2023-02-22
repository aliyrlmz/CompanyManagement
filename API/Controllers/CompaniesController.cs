using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly DataContext _context;
        public CompaniesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet] //api/companies
        public async Task<ActionResult<List<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        [HttpGet("{id}")] //api/companies/{id}
        public async Task<ActionResult<Company>> GetCompany(long id)
        {
            return await _context.Companies.FindAsync(id);
        }
    }
}