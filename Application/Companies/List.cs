using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Companies
{
    public class List
    {
        public class Query : IRequest<List<Company>> { }

        public class Handler : IRequestHandler<Query, List<Company>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
            }

            public async Task<List<Company>> Handle(Query request, CancellationToken token)
            {
                return await _context.Companies.ToListAsync();
            }
        }
    }
}