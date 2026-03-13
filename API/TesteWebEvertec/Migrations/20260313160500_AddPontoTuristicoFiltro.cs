using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TesteWebEvertec.Migrations
{
    /// <inheritdoc />
    public partial class AddPontoTuristicoFiltro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PontoTuristicoFiltro",
                table: "tb_pontos_turisticos",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PontoTuristicoFiltro",
                table: "tb_pontos_turisticos");
        }
    }
}
