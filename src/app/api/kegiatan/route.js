import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.kegiatan.findMany({
        orderBy: { id: 'asc' },
    });

    const viewData = data.map((item) => ({
        id: item.id,
        judul_kegiatan: item.judul_kegiatan,
        id_organisasi: item.id_organisasi,
        tanggal_kegiatan: item.tanggal_kegiatan,
        lokasi: item.lokasi,
        jenis_kegiatan: item.jenis_kegiatan,
        deskripsi_singkat: item.deskripsi_singkat,
        tautan_pendaftaran: item.tautan_pendaftaran
        // kode: item.kode,
        // nama: item.nama,
        // deskripsi: item.deskripsi
        /*order_date: item.order_date.toISOString().split('T')[0],
        order_by: item.order_by,
        selected_package: item.selected_package,
        qty: item.qty,
        status: item.is_paid ? "Lunas" : "Belum Lunas",*/
    }));

    return new Response(JSON.stringify(viewData), { status: 200 });
}

export async function POST(request) {
    const { judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan,
        deskripsi_singkat, tautan_pendaftaran} = await request.json();
    
    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan ||
        !deskripsi_singkat || !tautan_pendaftaran) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    /*const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";*/

    const paket = await prisma.kegiatan.create({
        data: { judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan,
        deskripsi_singkat, tautan_pendaftaran },
    });
    
    /*paket.order_date = paket.order_date.toISOString().split('T')[0];
    paket.status = is_paid ? "Lunas" : "Belum Lunas";
    delete paket.is_paid;*/

    return new Response(JSON.stringify(kegiatan), { status: 201 });
}