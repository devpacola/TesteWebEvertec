using Microsoft.EntityFrameworkCore;
using TesteWebEvertec.Data;
using TesteWebEvertec.Models;

namespace TesteWebEvertec.Repositories;

public class PontosTuristicosRepository(AppDbContext appDbContext)
{
    private readonly AppDbContext _dbContext = appDbContext;

    private static string GerarFiltro(PontoTuristico p) =>
        $"{p.Nome} {p.Descricao} {p.Endereco} {p.Estado} {p.Cidade}".ToLower();
        

    public async Task<PontoTuristico> Inserir(PontoTuristico pontoTuristico)
    {
        pontoTuristico.PontoTuristicoFiltro = GerarFiltro(pontoTuristico);
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
        var termoLower = termo.ToLower();
        return await _dbContext.PontosTuristicos
            .Where(p => p.PontoTuristicoFiltro.Contains(termoLower) && p.DeletadoEm == null)
            .ToListAsync();
    }

    public async Task<PontoTuristico?> BuscarPorId(int id)
    {
        return await _dbContext.PontosTuristicos
            .FirstOrDefaultAsync(p => p.Id == id && p.DeletadoEm == null);
    }

    public async Task<PontoTuristico?> Atualizar(int id, PontoTuristico dados)
    {
        var ponto = await BuscarPorId(id);
        if (ponto is null) return null;

        ponto.Nome = dados.Nome;
        ponto.Descricao = dados.Descricao;
        ponto.Endereco = dados.Endereco;
        ponto.Cidade = dados.Cidade;
        ponto.Estado = dados.Estado;
        ponto.Categoria = dados.Categoria;
        ponto.PontoTuristicoFiltro = GerarFiltro(ponto);
        ponto.AtualizadoEm = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return ponto;
    }

    public async Task<bool> Excluir(int id)
    {
        var ponto = await BuscarPorId(id);
        if (ponto is null) return false;

        ponto.DeletadoEm = DateTime.Now;
        await _dbContext.SaveChangesAsync();
        return true;
    }
}
