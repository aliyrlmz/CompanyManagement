using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Create
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
                Company company = new Company()
                {
                    Name = request.Company.Name,
                    Email = request.Company.Email,
                    Username =  request.Company.Username,
                    Password = PasswordHelper.HashPasword(request.Company.Password, out byte[] salt),
                    PasswordSalt = System.Text.Encoding.UTF8.GetString(salt, 0, salt.Length),
                };
                _context.Companies.Add(company);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}