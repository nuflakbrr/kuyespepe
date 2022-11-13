import { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaFolderPlus } from 'react-icons/fa';

import axios from '../../../../config/axios';
import SidebarAdmin from '../components/Sidebar';
import SppItemAdmin from '../components/SppItem';

const ContainersSppIndex: FC = () => {
  // Required State
  const [data, setData] = useState([]);

  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const getData = async () => {
      await axios
        .get('/spp', headerConf)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, []);

  return (
    <>
      <Head>
        <title>Daftar Spp | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="p-10 rounded-md w-full">
          <div className="flex flex-wrap items-center justify-between pb-6">
            <div>
              <h2 className="text-black dark:text-white text-2xl font-semibold">
                Daftar SPP
              </h2>
            </div>
            <div className="lg:ml-20 ml-10 space-x-8">
              <Link href="/admin/spp/add" legacyBehavior>
                <a className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  <FaFolderPlus className="mr-2" /> Tambah SPP
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
                    <SppItemAdmin
                      id={val.id_spp}
                      year={val.tahun}
                      nominal={val.nominal}
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

export default ContainersSppIndex;
