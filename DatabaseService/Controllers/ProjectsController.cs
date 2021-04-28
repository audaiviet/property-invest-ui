using DatabaseService.Entities;
using DatabaseService.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private IProjectRepository _projects;
        public ProjectsController(IProjectRepository repo)
        {
            this._projects = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAsync()
        {
            return Ok(await _projects.GetAllProjectsAsync());
        }

        [HttpGet("{id:length(24)}", Name = "GetProject")]
        public async Task<ActionResult<Project>> Get(string id)
        {
            var project = await _projects.GetByIdAsync(id);
            if (project == null) {
                return NotFound();
            }
            return project;
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostAsync([FromBody] Project project)
        {
            await _projects.CreateProjectAsync(project);
            return CreatedAtRoute("GetProject", new { id = project.Id.ToString() }, project);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Project project)
        {
            var oldProject = await _projects.GetByIdAsync(id);

            if (oldProject == null)
            {
                return NotFound();
            }

            await _projects.UpdateAsync(id, project);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var oldProject = await _projects.GetByIdAsync(id);

            if (oldProject == null)
            {
                return NotFound();
            }
            var success = await _projects.DeleteAsync(id);
            return NoContent();
        }
    }
}
