using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseService.Entities
{
    [BsonIgnoreExtraElements] 
    public class Project : IProject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int EstimatedDurationInDays { get; set; }
        public decimal EstimatedCost { get; set; }
        public decimal AnnualInterestRateOffered { get; set; }

        public string ProjectManager { get; set; }
        //public Project()
        //{
        //    Id = ObjectId.GenerateNewId();
        //}
    }
}
