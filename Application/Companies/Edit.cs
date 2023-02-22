using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Company Company { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies.FindAsync(request.Company.Id);
                //this is not working cause checkpassword returns false everytime...
                if (PasswordHelper.CheckPassword(request.Company.Password, company.Password, company.PasswordSalt))
                {
                company.Name = request.Company.Name ?? company.Name;
                company.Username = request.Company.Username ?? company.Username;
                company.Email = request.Company.Email ?? company.Email;
                company.updateDate = DateTime.UtcNow.AddHours(3);
                await _context.SaveChangesAsync();
                return Unit.Value;
                }
                else 
                {
                    return Unit.Value;
                }
            }
        }
    }
}