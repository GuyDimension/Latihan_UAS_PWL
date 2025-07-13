import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const { id } = await params;
    const { judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran } = await request.json();

    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return new Response(JSON.stringify({ error: 'Field kosong' }), { status: 400 });
    }

    const kegiatan = await prisma.kegiatan.update({
        where: { id: Number(id) },
        data: { judul_kegiatan, id_organisasi: Number(id_organisasi), tanggal_kegiatan: new Date(tanggal_kegiatan), lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran },
    });
    return new Response(JSON.stringify(kegiatan), { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });
    
    const deletedKegiatan = await prisma.kegiatan.delete({
        where: { id: Number(id) },
    });
    return new Response(JSON.stringify({ message: "Berhasil dihapus", deletedKegiatan }), { status: 200 });
}