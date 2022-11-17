import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../config/axios';

const ContainersClassAdd: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [nameClass, setNameClass] = useState('');
  const [skill, setSkill] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Binding event target & value
  const bindingState = (e: any) => {
    const { name, value } = e.target;
    if (name === 'nama_kelas') {
      setNameClass(value);
    } else if (name === 'kompetensi_keahlian') {
      setSkill(value);
    }
  };

  // Handle POST Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = { nama_kelas: nameClass, kompetensi_keahlian: skill };

    axios
      .post('/kelas', sendData)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/class');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Tambah Kelas | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Tambah Kelas</h1>
              </div>
              <form onSubmit={(e) => handleStore(e)}>
                {storeFailed && (
                  <div className="mt-4 bg-red-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Gagal menambahkan data, silakan coba kembali!
                    </p>
                  </div>
                )}
                {storeSuccess && (
                  <div className="mt-4 bg-green-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Tambah Data Sukses!
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nama_kelas"
                  >
                    Nama Kelas
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="nama_kelas"
                    name="nama_kelas"
                    type="text"
                    placeholder="Nama Kelas"
                    value={nameClass}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="kompetensi_keahlian"
                  >
                    Kompetensi Keahlian
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="kompetensi_keahlian"
                    name="kompetensi_keahlian"
                    type="text"
                    placeholder="Kompetensi Keahlian"
                    value={skill}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Tambah Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContainersClassAdd;
