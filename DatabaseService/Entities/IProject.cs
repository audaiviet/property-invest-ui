using MongoDB.Bson;
using System;

namespace DatabaseService.Entities
{
    public interface IProject
    {
        public string Id { get; set; }
        decimal AnnualInterestRateOffered { get; set; }
        DateTime EndDate { get; set; }
        decimal EstimatedCost { get; set; }
        int EstimatedDurationInDays { get; set; }
        string Name { get; set; }
        string ProjectManager { get; set; }
        DateTime StartDate { get; set; }
    }
}