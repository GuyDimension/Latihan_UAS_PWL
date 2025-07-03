import prisma from "@/lib/prisma";

export async function PUT(request, {params}) {
    const { id } = params;
    const { kode, nama, deskripsi } = await request.json();

    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan ||
        !deskripsi_singkat || !tautan_pendaftaran) {
       return new Response(JSON.stringify({ error: 'Field kosong'}), {status: 400});
    }

    /*const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";*/

    const paket = await prisma.paket.update({
        where: { id: Number(id) },
        data: { kode, nama, deskripsi },
    });

    const viewPaket = {
        id: paket.id,
        kode: paket.kode,
        nama: paket.nama,
        deskripsi: paket.deskripsi
        /*order_date: preorder.order_date.toISOString().split('T')[0],
        order_by: preorder.order_by,
        selected_package: preorder.selected_package,
        qty: preorder.qty,
        status: preorder.is_paid ? "Lunas" : "Belum Lunas"*/
    };

    return new Response(JSON.stringify(viewPaket), { status: 200 }); 
}

export async function DELETE(request, {params}) {
    const { id } = params;
    
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), 
        { status: 400 });

    const deletedPaket = await prisma.paket.delete({
        where: { id: Number(id) },
    });
        
    return new Response(JSON.stringify({ message: "Berhasil dihapus"}), 
        { status: 200 });
}

