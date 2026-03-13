using Microsoft.EntityFrameworkCore;
using TesteWebEvertec.Data;
using TesteWebEvertec.Models;

namespace TesteWebEvertec.Repositories;

public class PontosTuristicosRepository(AppDbContext appDbContext)
{
    private readonly AppDbContext _dbContext = appDbContext;

    public async Task<PontoTuristico> Inserir(PontoTuristico pontoTuristico)
    {
        pontoTuristico.PontoTuristicoFiltro = $"{pontoTuristico.Nome} {pontoTuristico.Descricao}";
        await _dbContext.PontosTuristicos.AddAsync(pontoTuristico);
        await _dbContext.SaveChangesAsync();
        return pontoTuristico;
    }

    public async Task<List<PontoTuristico>> BuscarTodos()
    {
        return await _dbContext.PontosTuristicos
            .Where(p => p.DeletadoEm == null)
            .ToListAsync();
    }

    public async Task<List<PontoTuristico>> BuscarTodosPorCategoria(string categoria)
    {
        return await _dbContext.PontosTuristicos
            .Where(p => p.Categoria.Equals(categoria) && p.DeletadoEm == null)
            .ToListAsync();
    }

    public async Task<List<PontoTuristico>> BuscarPorFiltro(string termo)
    {
        return await _dbContext.PontosTuristicos
            .Where(p => p.PontoTuristicoFiltro.Contains(termo) && p.DeletadoEm == null)
            .ToListAsync();
    }

    public async Task<PontoTuristico?> BuscarPorId(int id)
    {
        return await _dbContext.PontosTuristicos
            .FirstOrDefaultAsync(p => p.Id == id && p.DeletadoEm == null);
    }
}
