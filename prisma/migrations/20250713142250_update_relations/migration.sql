-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_organisasi" TEXT NOT NULL,
    "ketua_organisasi" TEXT NOT NULL,
    "no_kontak" TEXT NOT NULL,
    "tahun_dibentuk" INTEGER NOT NULL,
    "pembina" TEXT NOT NULL
);
INSERT INTO "new_organisasi" ("id", "ketua_organisasi", "nama_organisasi", "no_kontak", "pembina", "tahun_dibentuk") SELECT "id", "ketua_organisasi", "nama_organisasi", "no_kontak", "pembina", "tahun_dibentuk" FROM "organisasi";
DROP TABLE "organisasi";
ALTER TABLE "new_organisasi" RENAME TO "organisasi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
