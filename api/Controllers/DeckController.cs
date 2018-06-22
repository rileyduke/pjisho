using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using aspnetCoreReactTemplate.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace aspnetCoreReactTemplate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DeckController : Controller
    {
        private readonly DefaultDbContext _context;

        public DeckController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET api/decks
        [HttpGet]
        public IEnumerable<Deck> Get()
        {
            return _context.Decks.OrderBy((o)=> o.Name);
        }

        // GET api/decks/5
        [HttpGet("{id}", Name = "GetDeck")]
        public Deck Get(int id)
        {
            return _context.Decks.Find(id);
        }

        // GET api/decks/?=
        [HttpGet("search")]
        public IEnumerable<Deck> Search(string q)
        {
            return _context.Decks.
            Where((c)=> c.Name.ToLower().Contains(q.ToLower())).
            OrderBy((o) => o.Name);
        }

        // POST api/decks
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Deck model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Decks.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetDeck", new { id = model.Id }, model);
        }

        // PUT api/decks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Deck model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.Id = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/decks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deck = new Deck() { Id = id };
            _context.Entry(deck).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
