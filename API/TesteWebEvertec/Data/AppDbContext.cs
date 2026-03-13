using Microsoft.EntityFrameworkCore;
using TesteWebEvertec.Models;

namespace TesteWebEvertec.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<PontoTuristico> PontosTuristicos => Set<PontoTuristico>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PontoTuristico>(entity =>
        {
            entity.Property(p => p.CriadoEm)
                .HasDefaultValueSql("datetime('now', 'localtime')");

            entity.Property(p => p.AtualizadoEm)
                .HasDefaultValueSql("datetime('now', 'localtime')");

            entity.ToTable(t => t.HasCheckConstraint(
                "CK_PontoTuristico_Categoria",
                "Categoria IN ('Praia', 'Parque', 'Museu', 'Monumento', 'Gastronomia', 'Outro')"
            ));
        });
    }
}
