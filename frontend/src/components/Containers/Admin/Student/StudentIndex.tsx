import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaEdit, FaFolderPlus, FaTrash } from 'react-icons/fa';

import axios from '../../../../config/axios';
import SidebarAdmin from '../components/Sidebar';

const ContainersStudentIndex: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [data, setData] = useState([]);

  // Fetch Data from API
  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const getData = async () => {
      await axios
        .get('/siswa', headerConf)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, []);

  // Format id_kelas to nama_kelas
  // const formatClass = (id: number) => {
  //   if (!id) return 'Tidak diketahui';

  //   const nameClass = dataClass.find((item: any) => item.id_kelas === id);
  //   return nameClass?.nama_kelas || 'Tidak diketahui';
  // };

  // Handle DELETE Data
  const handleDelete = async (nisn: any) => {
    alert('Apakah anda yakin ingin menghapus data ini?');

    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    await axios
      .delete(`/siswa/${nisn}`, headerConf)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    router.reload();
  };

  return (
    <>
      <Head>
        <title>Daftar Siswa | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="p-10 rounded-md w-full">
          <div className="flex flex-wrap items-center justify-between pb-6">
            <div>
              <h2 className="text-black dark:text-white text-2xl font-semibold">
                Daftar Siswa
              </h2>
            </div>
            <div className="lg:ml-20 ml-10 space-x-8">
              <Link href="/admin/student/add" legacyBehavior>
                <a className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  <FaFolderPlus className="mr-2" /> Tambah Siswa
                </a>
              </Link>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden">
                {!data.length ? (
                  <p className="text-black dark:text-white text-center mx-auto">
                    Memuat Data📦...
                  </p>
                ) : (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          NISN
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          NIS
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Nama Lengkap
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Alamat
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          No. Telp
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          ID Kelas
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          ID SPP
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((val: any, index) => (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.nisn}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.nis}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.nama}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.alamat}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.no_telp}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.id_kelas}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {val.id_spp}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link
                              href={`/admin/student/edit/${val.nisn}`}
                              className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            >
                              <FaEdit className="mr-2" /> Ubah
                            </Link>
                            <button
                              type="button"
                              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                              onClick={() => handleDelete(val.nisn)}
                            >
                              <FaTrash className="mr-2" /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainersStudentIndex;
