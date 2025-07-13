-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul_kegiatan" TEXT NOT NULL,
    "id_organisasi" INTEGER NOT NULL,
    "tanggal_kegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenis_kegiatan" TEXT NOT NULL,
    "deskripsi_singkat" TEXT NOT NULL,
    "tautan_pendaftaran" TEXT,
    CONSTRAINT "kegiatan_id_organisasi_fkey" FOREIGN KEY ("id_organisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_kegiatan" ("deskripsi_singkat", "id", "id_organisasi", "jenis_kegiatan", "judul_kegiatan", "lokasi", "tanggal_kegiatan", "tautan_pendaftaran") SELECT "deskripsi_singkat", "id", "id_organisasi", "jenis_kegiatan", "judul_kegiatan", "lokasi", "tanggal_kegiatan", "tautan_pendaftaran" FROM "kegiatan";
DROP TABLE "kegiatan";
ALTER TABLE "new_kegiatan" RENAME TO "kegiatan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
