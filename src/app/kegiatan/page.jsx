"use client";
import styles from './KegiatanPage.module.css';
import { useEffect, useState } from 'react';

export default function KegiatanPage() {

    const [kegiatans, setKegiatans] = useState([]);
    const [organisasis, setOrganisasis] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [judul_kegiatan, setJudulKegiatan ] = useState('');
    const [id_organisasi, setIdOrganisasi ] = useState('');
    const [tanggal_kegiatan, setTanggalKegiatan]= useState('');
    const [lokasi, setLokasi]= useState('');
    const [jenis_kegiatan, setJenisKegiatan]= useState('');
    const [deskripsi_singkat, setDeskripsiSingkat]= useState('');
    const [tautan_pendaftaran, setTautanPendaftaran]= useState('');
    const [ msg, setMsg ] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchKegiatans = async () => {
        const res = await fetch('api/kegiatan');
        const data = await res.json();
        setKegiatans(data);
    };

    const fetchOrganisasis = async () => {
        const res = await fetch('api/organisasi');
        const data = await res.json();
        setOrganisasis(data);
    };

    useEffect(() => {
        fetchKegiatans();
        fetchOrganisasis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/kegiatan/${editId}` : '/api/kegiatan';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan!');
            setJudulKegiatan('');
            setIdOrganisasi('');
            setTanggalKegiatan('');
            setLokasi('');
            setJenisKegiatan('');
            setDeskripsiSingkat('');
            setTautanPendaftaran('');
            setEditId(null);
            setFormVisible(false);
            fetchKegiatans();
        } else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setJudulKegiatan(item.judul_kegiatan);
        setIdOrganisasi(item.organisasi?.id || '');
        setTanggalKegiatan(item.tanggal_kegiatan.split('T')[0]);
        setLokasi(item.lokasi);
        setJenisKegiatan(item.jenis_kegiatan);
        setDeskripsiSingkat(item.deskripsi_singkat);
        setTautanPendaftaran(item.tautan_pendaftaran);
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;

        await fetch(`/api/kegiatan/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchKegiatans();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Organisasi dan Kegiatan Mahasiswa ITBSS</h1>
            <h2 className={styles.subTitle}>Data Kegiatan</h2>
            <br/>
            <button
                className={styles.buttonToggle}
                onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Tutup Form' : 'Tambah Kegiatan'}
            </button>
            <button className={styles.buttonToggle} style={{ float: 'right' }} onClick={() => window.location.href = '/organisasi'}>Data Organisasi</button>
            
            {formVisible && (
                <div className={styles.formWrapper}>
                    <h3>Input Data Baru</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <span>Judul Kegiatan</span>
                            <input
                                type="text"
                                value={judul_kegiatan}
                                onChange={(e) => setJudulKegiatan(e.target.value)}
                                placeholder="Masukkan Judul Kegiatan"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <span>Organisasi</span>
                            <select
                                value={id_organisasi}
                                onChange={(e) => setIdOrganisasi(e.target.value)}
                                required
                            >
                                <option value="">Pilih Organisasi</option>
                                {organisasis.map((organisasi) => (
                                    <option key={organisasi.id} value={organisasi.id}>
                                        {organisasi.nama_organisasi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <span>Tanggal Kegiatan</span>
                            <input
                                type="date"
                                value={tanggal_kegiatan}
                                onChange={(e) => setTanggalKegiatan(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <span>Lokasi</span>
                            <input
                                type="text"
                                value={lokasi}
                                onChange={(e) => setLokasi(e.target.value)}
                                placeholder="Masukkan Lokasi"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <span>Jenis Kegiatan</span>
                            <select
                                value={jenis_kegiatan}
                                onChange={(e) => setJenisKegiatan(e.target.value)}
                                required
                            >
                                <option value="">Pilih Jenis Kegiatan</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Expo">Expo</option>
                                <option value="Lomba">Lomba</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <span>Deskripsi Singkat</span>
                            <input
                                type="text"
                                value={deskripsi_singkat}
                                onChange={(e) => setDeskripsiSingkat(e.target.value)}
                                placeholder="Masukkan Deskripsi Singkat"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <span>Tautan Pendaftaran</span>
                            <input
                                type="url"
                                value={tautan_pendaftaran}
                                onChange={(e) => setTautanPendaftaran(e.target.value)}
                                placeholder="Masukkan Tautan"
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
                            <th>Judul Kegiatan</th>
                            <th>Organisasi</th>
                            <th>Tanggal Kegiatan</th>
                            <th>Lokasi</th>
                            <th>Jenis Kegiatan</th>
                            <th>Deskripsi Singkat</th>
                            <th>Tautan Pendaftaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kegiatans.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.judul_kegiatan}</td>
                                <td>{item.organisasi?.nama_organisasi || 'Unknown'}</td>
                                <td>{item.tanggal_kegiatan.split('T')[0]}</td>
                                <td>{item.lokasi}</td>
                                <td>{item.jenis_kegiatan}</td>
                                <td>{item.deskripsi_singkat}</td>
                                <td>{item.tautan_pendaftaran}</td>
                                <td>
                                    <button className={styles.editButton} onClick={() => handleEdit(item)}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                        {kegiatans.length === 0 && (
                            <tr>
                                <td colSpan="9">Belum ada data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}