using System.ComponentModel.DataAnnotations;

namespace aspnetCoreReactTemplate.Models
{
    public class Card
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Back { get; set; }

        [Required]
        public string Front { get; set; }

    }
}
