using Microsoft.AspNetCore.Mvc;
using TesteWebEvertec.Models;
using TesteWebEvertec.Repositories;

namespace TesteWebEvertec.Controllers;

[ApiController]
[Route("api/pontos-turisticos")]
public class PontosTuristicosController(PontosTuristicosRepository pontosTuristicosRepository) : ControllerBase
{
    private readonly PontosTuristicosRepository _pontosTuristicosRepository = pontosTuristicosRepository;

    [HttpPost]
    public async Task<ActionResult<PontoTuristico>> CriarPontoTuristico([FromBody] PontoTuristico pontoTuristico)
    {
        try {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resultado = await _pontosTuristicosRepository.Inserir(pontoTuristico);
            return Ok(resultado);
        }
        catch(Exception)
        {
            return StatusCode(500, "Não foi possível adicionar o ponto turístico.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<PontoTuristico>>> BuscarTodosPontosTuristicos()
    {
        List<PontoTuristico> pontosTuristicos = await _pontosTuristicosRepository.BuscarTodos();
        List<PontoTuristico> pontosTuristicosOrdenados = pontosTuristicos.OrderByDescending(p => p.CriadoEm).ToList();
        return Ok(pontosTuristicosOrdenados);
    }

    [HttpGet("categoria/{categoria}")]
    public async Task<ActionResult<List<PontoTuristico>>> BuscarTodosPontosTuristicosPorCategoria(string categoria)
    {
        List<PontoTuristico> pontosTuristicos = await _pontosTuristicosRepository.BuscarTodosPorCategoria(categoria);
        List<PontoTuristico> pontosTuristicosOrdenados = pontosTuristicos.OrderByDescending(p => p.CriadoEm).ToList();
        return Ok(pontosTuristicosOrdenados);
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<List<PontoTuristico>>> BuscarPontosTuristicosPorFiltro([FromQuery] string termo)
    {
        List<PontoTuristico> pontosTuristicos = await _pontosTuristicosRepository.BuscarPorFiltro(termo);
        List<PontoTuristico> pontosTuristicosOrdenados = pontosTuristicos.OrderByDescending(p => p.CriadoEm).ToList();
        return Ok(pontosTuristicosOrdenados);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PontoTuristico>> BuscarPontoTuristicoPorId(int id)
    {
        PontoTuristico? pontoTuristico = await _pontosTuristicosRepository.BuscarPorId(id);
        if (pontoTuristico is null) return NotFound();
        return Ok(pontoTuristico);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PontoTuristico>> AtualizarPontoTuristico(int id, [FromBody] PontoTuristico pontoTuristico)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var resultado = await _pontosTuristicosRepository.Atualizar(id, pontoTuristico);
            if (resultado is null) return NotFound();
            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Não foi possível atualizar o ponto turístico.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> ExcluirPontoTuristico(int id)
    {
        try
        {
            var excluido = await _pontosTuristicosRepository.Excluir(id);
            if (!excluido) return NotFound();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "Não foi possível excluir o ponto turístico.");
        }
    }
}
