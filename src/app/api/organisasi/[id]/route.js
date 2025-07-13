
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const { id } = await params;
    const { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina } = await request.json();

    if (!nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return new Response(JSON.stringify({ error: 'Field kosong' }), { status: 400 });
    }

    const organisasi = await prisma.organisasi.update({
        where: { id: Number(id) },
        data: { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk: Number(tahun_dibentuk), pembina },
    });

    return new Response(JSON.stringify(organisasi), { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = await params;

    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });

    const deletedOrganisasi = await prisma.organisasi.delete({
        where: { id: Number(id) },
    });
    
    return new Response(JSON.stringify({ message: "Berhasil dihapus", deletedOrganisasi }), { status: 200 });
}
