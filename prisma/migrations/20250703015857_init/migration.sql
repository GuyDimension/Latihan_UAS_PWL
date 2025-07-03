-- CreateTable
CREATE TABLE "organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_organisasi" TEXT NOT NULL,
    "ketua_organisasi" TEXT NOT NULL,
    "no_kontak" INTEGER NOT NULL,
    "tahun_dibentuk" INTEGER NOT NULL,
    "pembina" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul_kegiatan" TEXT NOT NULL,
    "id_organisasi" INTEGER NOT NULL,
    "tanggal_kegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenis_kegiatan" TEXT NOT NULL,
    "deskripsi_singkat" TEXT NOT NULL,
    "tautan_pendaftaran" TEXT NOT NULL
);
