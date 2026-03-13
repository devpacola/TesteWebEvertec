using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteWebEvertec.Models;

[Table("tb_pontos_turisticos")]
public class PontoTuristico
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [MaxLength(100, ErrorMessage = "A descrição deve ter no máximo 100 caracteres.")]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "O endereço é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O endereço deve ter no máximo 100 caracteres.")]
    public string Endereco { get; set; } = string.Empty;

    [Required(ErrorMessage = "A cidade é obrigatória.")]
    [MaxLength(100, ErrorMessage = "A cidade deve ter no máximo 100 caracteres.")]
    public string Cidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "O estado é obrigatório.")]
    [MaxLength(2, ErrorMessage = "O estado deve ter no máximo 2 caracteres.")]
    public string Estado { get; set; } = string.Empty;

    [Required(ErrorMessage = "A categoria é obrigatória.")]
    [MaxLength(20)]
    [AllowedValues("Praia", "Parque", "Museu", "Monumento", "Gastronomia", "Outro",
        ErrorMessage = "Categoria inválida. Use: Praia, Parque, Museu, Monumento, Gastronomia ou Outro.")]
    public string Categoria { get; set; } = string.Empty;

    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public DateTime AtualizadoEm { get; set; } = DateTime.Now;

    public DateTime? DeletadoEm { get; set; } = null;
}
