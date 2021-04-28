using DatabaseService.Entities;
using DatabaseService.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DatabaseService.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private const string databaseName = "Jupiter";
        private const string collectionName = "projects";
        private IMongoCollection<Project> collection { get; set; }
        public ProjectRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<Project>(collectionName);
        }
        public async Task<Project> CreateProjectAsync(Project project, CancellationToken cancellationToken = default(CancellationToken))
        {
            await collection.InsertOneAsync(project, cancellationToken: cancellationToken);
            return project;
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            IAsyncCursor<Project> result = await collection.FindAsync(project => true, cancellationToken: cancellationToken);
            return await result.ToListAsync();

        }

        public  async Task<Project> GetByIdAsync(string key, CancellationToken cancellationToken = default(CancellationToken))
        {
            return (await this.collection.FindAsync(x => x.Id.Equals(key), cancellationToken: cancellationToken)).FirstOrDefault(cancellationToken: cancellationToken);
        }


        public async Task<bool> UpdateAsync(string id, Project newVersion, CancellationToken cancellationToken = default(CancellationToken)) {
            ReplaceOneResult updateResult = await collection.ReplaceOneAsync(filter: project => project.Id == id, replacement: newVersion, cancellationToken: cancellationToken);
            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }
        public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken = default(CancellationToken)) {
            DeleteResult deleteResult = await collection.DeleteOneAsync(filter: project => project.Id == id, cancellationToken: cancellationToken);
            return deleteResult.IsAcknowledged
                    && deleteResult.DeletedCount > 0;
        }
    }
}
