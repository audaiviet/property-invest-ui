using DatabaseService.Controllers;
using DatabaseService.Entities;
using DatabaseService.Interfaces;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace DatabaseService.Tests
{
    public class ProjectsControllerTests: IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ProjectsControllerTests(WebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task CanCreateAllProjects()
        {
            // Act 
            var response = await _client.GetAsync("/api/projects/");
            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<List<Project>>(json);

            // Assert
            Assert.IsAssignableFrom<List<Project>>(data);
        }

        [Fact]
        public async Task CanCreateAProject()
        {
            //Arrange
            var project = new Project
            {
                Name = "Shirley Village",
                StartDate = DateTime.Parse("2022-11-01T17:14:43Z", null, DateTimeStyles.RoundtripKind),
                EndDate = DateTime.Parse("2030-12-16T14:59:01Z", null, DateTimeStyles.RoundtripKind),
                EstimatedDurationInDays = 223,
                EstimatedCost = 4000000,
                AnnualInterestRateOffered = 10,
                ProjectManager = "Smith Delta"
            };

            string jsonString = JsonConvert.SerializeObject(project);

            var content = new StringContent(jsonString.ToString(), Encoding.UTF8, "application/json");

            //Act
            var response = await _client.PostAsync("/api/projects", content);
            response.EnsureSuccessStatusCode();
        }
    }
}
