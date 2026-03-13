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

    [HttpGet("{id}")]
    public async Task<ActionResult<PontoTuristico>> BuscarPontoTuristicoPorId(int id)
    {
        PontoTuristico? pontoTuristico = await _pontosTuristicosRepository.BuscarPorId(id);
        return Ok(pontoTuristico);
    }
}
