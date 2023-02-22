using Application.Companies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        [HttpGet] //api/companies
        public async Task<ActionResult<List<Company>>> GetCompanies()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/companies/{id}
        public async Task<ActionResult<Company>> GetCompany(long id)
        {
             return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost] //api/companies
        public async Task<IActionResult> CreateCompany(Company company)
        {
            return Ok(await Mediator.Send(new Create.Command{Company = company}));
        }

        [HttpPut("{id}")] //api/companies/{id}
        public async Task<ActionResult<Company>> EditCompany(long id, Company company)
        {
            company.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Company = company}));
        }
    }
}