"use client";
import styles from './OrganisasiPage.module.css';
import { useEffect, useState } from 'react';

export default function OrganisasiPage() {
    
    const [organisasis, setOrganisasis] = useState([]);
    const [namaOrganisasi, setNamaOrganisasi] = useState('');
    const [ketua, setKetua] = useState('');
    const [kontak, setKontak] = useState('');
    const [tahun, setTahun] = useState('');
    const [pembina, setPembina] = useState('');
    const [msg, setMsg] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchOrganisasis = async () => {
        const res = await fetch('/api/organisasi');
        const data = await res.json();
        setOrganisasis(data);
    };

    useEffect(() => {
        fetchOrganisasis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const res = await fetch('/api/organisasi', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: editId,
                nama_organisasi: namaOrganisasi,
                ketua_organisasi: ketua,
                no_kontak: kontak,
                tahun_dibentuk: parseInt(tahun),
                pembina
            }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan!');
            setNamaOrganisasi('');
            setKetua('');
            setKontak('');
            setTahun('');
            setPembina('');
            setEditId(null);
            setFormVisible(false);
            fetchOrganisasis();    
        } else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setNamaOrganisasi(item.nama_organisasi);
        setKetua(item.ketua_organisasi);
        setKontak(item.no_kontak);
        setTahun(item.tahun_dibentuk);
        setPembina(item.pembina);
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;
        
        await fetch('/api/organisasi', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        
        fetchOrganisasis();
    };

    return (
        <div className={styles.container}>
            <button className={styles.buttonToggle}
                onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Tutup Form' : 'Tambah Organisasi'}
            </button>

            {formVisible && (
                <div className={styles.formWrapper}>
                    <h3>Input Data Baru</h3>
                    <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            value={namaOrganisasi}
                            onChange={(e) => setNamaOrganisasi(e.target.value)}
                            placeholder="Nama Organisasi"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={ketua}
                            onChange={(e) => setKetua(e.target.value)}
                            placeholder="Ketua Organisasi"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={kontak}
                            onChange={(e) => setKontak(e.target.value)}
                            placeholder="No Kontak"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            placeholder="Tahun Dibentuk"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={pembina}
                            onChange={(e) => setPembina(e.target.value)}
                            placeholder="Pembina"
                            required
                        />
                    </div>
                    <button type="submit">Simpan</button>
                    <p>{msg}</p>
                </form>
                </div>
            )}

            <br />
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Organisasi</th>
                        <th>Ketua</th>
                        <th>No Kontak</th>
                        <th>Tahun</th>
                        <th>Pembina</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {organisasis.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_organisasi}</td>
                            <td>{item.ketua_organisasi}</td>
                            <td>{item.no_kontak}</td>
                            <td>{item.tahun_dibentuk}</td>
                            <td>{item.pembina}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {organisasis.length === 0 && (
                        <tr>
                            <td colSpan="7">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}