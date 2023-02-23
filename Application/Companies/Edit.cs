using AutoMapper;
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies.FindAsync(request.Company.Id);
                _mapper.Map(request.Company, company);
                //Need work
                company.Password = PasswordHelper.HashPasword(request.Company.Password, out byte[] salt) ?? company.Password;
                company.PasswordSalt = System.Text.Encoding.UTF8.GetString(salt, 0, salt.Length) ?? company.PasswordSalt;
                company.updateDate = DateTime.UtcNow.AddHours(3);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}