using System.ComponentModel.DataAnnotations;

namespace aspnetCoreReactTemplate.Models
{
    public class Deck
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
