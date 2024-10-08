using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initalCreate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetCategories_Budgets_BudgetId",
                table: "BudgetCategories");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "BudgetCategories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetCategories_Budgets_BudgetId",
                table: "BudgetCategories",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetCategories_Budgets_BudgetId",
                table: "BudgetCategories");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "BudgetCategories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetCategories_Budgets_BudgetId",
                table: "BudgetCategories",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id");
        }
    }
}
