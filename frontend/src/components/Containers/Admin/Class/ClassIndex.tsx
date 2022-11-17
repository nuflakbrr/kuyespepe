import { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaFolderPlus } from 'react-icons/fa';

import axios from '../../../../config/axios';
import SidebarAdmin from '../components/Sidebar';
import ClassItemAdmin from '../components/ClassItem';

const ContainersClassIndex: FC = () => {
  // Required State
  const [data, setData] = useState([]);

  // Fetch Data from API
  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const getData = async () => {
      await axios
        .get('/kelas', headerConf)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, []);

  return (
    <>
      <Head>
        <title>Daftar Kelas | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="p-10 rounded-md w-full">
          <div className="flex flex-wrap items-center justify-between pb-6">
            <div>
              <h2 className="text-black dark:text-white text-2xl font-semibold">
                Daftar Kelas
              </h2>
            </div>
            <div className="lg:ml-20 ml-10 space-x-8">
              <Link href="/admin/class/add" legacyBehavior>
                <a className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  <FaFolderPlus className="mr-2" /> Tambah Kelas
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
                  data.map((val: any, index) => (
                    <ClassItemAdmin
                      id={val.id_kelas}
                      nameClass={val.nama_kelas}
                      skill={val.kompetensi_keahlian}
                      key={index}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainersClassIndex;
