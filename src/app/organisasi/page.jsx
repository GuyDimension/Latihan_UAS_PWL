"use client";
import styles from './OrganisasiPage.module.css';
import { useEffect, useState } from 'react';

export default function OrganisasiPage() {

    const[organisasis, setOrganisasis] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [ nama_organisasi, setNamaOrganisasi ] = useState('');
    const [ ketua_organisasi, setKetuaOrganisasi ] = useState('');
    const [ no_kontak, setNoKontak]= useState('');
    const [ tahun_dibentuk, setTahunDibentuk]= useState('');
    const [ pembina, setPembina]= useState('');
    const [ msg, setMsg ] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchOrganisasis = async () => {
        const res = await fetch('api/organisasi');
        const data = await res.json();
        setOrganisasis(data);
    };

    useEffect(() => {
        fetchOrganisasis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/organisasi/${editId}` : '/api/organisasi';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan!');
            setNamaOrganisasi('');
            setKetuaOrganisasi('');
            setNoKontak('');
            setTahunDibentuk('');
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
        setKetuaOrganisasi(item.ketua_organisasi);
        setNoKontak(item.no_kontak);
        setTahunDibentuk(item.tahun_dibentuk);
        setPembina(item.pembina);
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;

        await fetch(`/api/organisasi/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        fetchOrganisasis();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Organisasi dan Kegiatan Mahasiswa ITBSS</h1>
            <h2 className={styles.subTitle}>Data Organisasi</h2>
            <br/>
            <button
                className={styles.buttonToggle}
                onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Tutup Form' : 'Tambah Organisasi'}
            </button>
            <button className={styles.buttonToggle} style={{ float: 'right' }} onClick={() => window.location.href = '/kegiatan'}>Data Kegiatan</button>
            
            {formVisible && (
                <div className={styles.formWrapper}>
                    <h3>Input Data Baru</h3>
                    <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <span>Nama Organisasi</span>
                        <input
                            type="text"
                            value={nama_organisasi}
                            onChange={(e) => setNamaOrganisasi(e.target.value)}
                            placeholder="Masukkan Nama Organisasi"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <span>Ketua Organisasi</span>
                        <input
                            type="text"
                            value={ketua_organisasi}
                            onChange={(e) => setKetuaOrganisasi(e.target.value)}
                            placeholder="Masukkan Nama Ketua Organisasi"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <span>Nomor Kontak</span>
                        <input
                            type="text"
                            value={no_kontak}
                            onChange={(e) => setNoKontak(e.target.value)}
                            placeholder="Masukkan Nomor Kontak"
                            required
                            />
                    </div>
                    <div className={styles.formGroup}>
                        <span>Tahun Dibentuk</span>
                        <input
                            type="number"
                            value={tahun_dibentuk}
                            onChange={(e) => setTahunDibentuk(e.target.value)}
                            placeholder="Masukkan Tahun Dibentuk"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <span>Pembina</span>
                        <input
                            type="text"
                            value={pembina}
                            onChange={(e) => setPembina(e.target.value)}
                            placeholder="Masukkan Nama Pembina"
                            required
                        />
                    </div>
        
                
                    <button type="submit" className={styles.submitButton}>
                        Simpan
                    </button>
                    <p>{msg}</p>
                    </form>
                </div>
            )}

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Organisasi</th>
                            <th>Ketua Organisasi</th>
                            <th>Nomor Kontak</th>
                            <th>Tahun Dibentuk</th>
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
                                    <button className={styles.editButton} onClick={() => handleEdit(item)}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>Hapus</button>
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
        </div>
    );
}