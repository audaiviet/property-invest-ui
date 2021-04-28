using DatabaseService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DatabaseService.Interfaces
{
    public interface IProjectRepository
    {
        public Task<Project> CreateProjectAsync(Project project, CancellationToken cancellationToken = default);
        public Task<IEnumerable<Project>> GetAllProjectsAsync(CancellationToken cancellationToken = default);
        public Task<Project> GetByIdAsync(string key, CancellationToken cancellationToken = default);
        public Task<bool> UpdateAsync(string id, Project newVersion, CancellationToken cancellationToken = default);
        public Task<bool> DeleteAsync(string id, CancellationToken cancellationToken = default);
    }
}
