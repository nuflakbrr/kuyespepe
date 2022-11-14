import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../config/axios';
import { FaArrowLeft } from 'react-icons/fa';

const ContainersPaymentDetails: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [data, setData] = useState([]);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const getData = async () => {
      await axios
        .get(`/pembayaran/siswa/${id}`, headerConf)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  // Format currency to IDR
  const formatCurrency = (num: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(Number(num));
  };

  // Format Date Time
  const formatTime = (time: any) => {
    const date = new Date(time);
    return `${date.getDate()}/${
      Number(date.getMonth()) + 1
    }/${date.getFullYear()}`;
  };

  return (
    <>
      <Head>
        <title>Detail Pembayaran - KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="md:ml-64 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container bg-slate-100 dark:bg-white rounded-lg p-5">
          <div className="flex items-center justify-between">
            {!data.length ? (
              <p className="text-black text-center mx-auto">Memuat Data📦...</p>
            ) : (
              data.map((item: any) => (
                <div
                  className="w-full flex items-center justify-between"
                  key={item.id_pembayaran}
                >
                  <section>
                    <div className="text-left">
                      <h1 className="font-bold text-sm text-slate-500">NISN</h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.nisn || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">NIS</h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.siswa.nis || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Nama Siswa
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.siswa.nama || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Alamat
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.siswa.alamat || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tanggal Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatTime(item.tgl_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left py-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Bulan Dibayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.bulan_dibayar || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section className="hidden md:block">
                    <div className="text-left">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tanggal Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatTime(item.tgl_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Bulan Dibayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.bulan_dibayar || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tahun Dibayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.tahun_dibayar || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Jumlah Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatCurrency(item.jumlah_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section>
                    <div className="block md:hidden text-left">
                      <h1 className="font-bold text-sm text-slate-500">
                        Tahun Dibayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.tahun_dibayar || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="block md:hidden text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Jumlah Bayar
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {formatCurrency(item.jumlah_bayar) || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5 md:pt-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        ID SPP
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.id_spp || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        ID Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.id_petugas || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5">
                      <h1 className="font-bold text-sm text-slate-500">
                        Nama Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.nama_petugas || 'Tidak diketahui'}
                      </h1>
                    </div>
                    <div className="text-left pt-5 pb-5 md:pb-0">
                      <h1 className="font-bold text-sm text-slate-500">
                        Level Petugas
                      </h1>
                      <h1 className="font-bold text-lg text-black">
                        {item.petugas.level || 'Tidak diketahui'}
                      </h1>
                    </div>
                  </section>

                  <section className="hidden md:block">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                      <FaArrowLeft className="mr-2" /> Kembali
                    </Link>
                  </section>
                </div>
              ))
            )}
          </div>

          <section className="block md:hidden">
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              <FaArrowLeft className="mr-2" /> Kembali
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default ContainersPaymentDetails;
