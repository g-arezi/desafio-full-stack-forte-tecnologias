-- AlterTable
ALTER TABLE "assets" ADD COLUMN "description" TEXT;
ALTER TABLE "assets" ADD COLUMN "serialNumber" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'Funcionário',
    "companyId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_employees" ("companyId", "cpf", "createdAt", "email", "id", "name", "updatedAt") SELECT "companyId", "cpf", "createdAt", "email", "id", "name", "updatedAt" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
CREATE UNIQUE INDEX "employees_cpf_key" ON "employees"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
