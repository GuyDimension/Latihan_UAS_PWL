import prisma from "@/lib/prisma";

export async function GET() {
    const data = await prisma.kegiatan.findMany({
        include: { organisasi: true},
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran } = await request.json();
    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return new Response(JSON.stringify ({ error: 'Field wajib diisi' }), {
            status: 400,
        });
    }

    const kegiatan = await prisma.kegiatan.create({
        data: { judul_kegiatan, id_organisasi: Number(id_organisasi), tanggal_kegiatan: new Date(tanggal_kegiatan), lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran },
    });
    return new Response(JSON.stringify(kegiatan), { status: 201 });
}