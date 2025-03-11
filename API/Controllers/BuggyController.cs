using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    //IActionResult ko can tra ve 1 gia tri cu the
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is not a good request");
    }

    [HttpGet("unauthorized")]
    public IActionResult GetUnauthoriesd()
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public IActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is the first error");
        ModelState.AddModelError("Problem2", "This is the second error");

        return ValidationProblem();
    }

 [HttpGet("server-error")]
public IActionResult GetSeverError()
{
    throw new Exception("This is a server error");
}
}
