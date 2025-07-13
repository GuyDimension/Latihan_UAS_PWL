import prisma from "@/lib/prisma";

export async function GET() {
    const data = await prisma.organisasi.findMany({
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina } = await request.json();
    if (!nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return new Response(JSON.stringify ({ error: 'Semua field wajib diisi' }), {
            status: 400,
        });
    }

    const organisasi = await prisma.organisasi.create({
        data: { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk: Number(tahun_dibentuk), pembina },
    });
    return new Response(JSON.stringify(organisasi), { status: 201 });
}