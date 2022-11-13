import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../config/axios';

const ContainersSppEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [oldYear, setOldYear] = useState([]);
  const [oldNominal, setOldNominal] = useState([]);
  const [year, setYear] = useState('');
  const [nominal, setNominal] = useState('');
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/spp/${id}`)
        .then((res) => {
          setOldYear(res.data.data.tahun);
          setOldNominal(res.data.data.nominal);
        })
        .catch((err) => console.log(err));
    };

    Promise.all([getData()]);
  }, [id]);

  const bindingState = (e: any) => {
    const { name, value } = e.target;
    if (name === 'year') {
      setYear(value);
    } else if (name === 'nominal') {
      setNominal(value);
    }
  };

  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = { id_spp: id, tahun: year, nominal };

    axios
      .put('/spp', sendData)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/spp');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Spp | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="py-32">
          <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Ubah Spp</h1>
              </div>
              <form onSubmit={(e) => handleStore(e)}>
                {storeFailed && (
                  <div className="mt-4 bg-red-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Gagal mengubah data, silakan coba kembali!
                    </p>
                  </div>
                )}
                {storeSuccess && (
                  <div className="mt-4 bg-green-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Ubah Data Sukses!
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Tahun (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Nama Kelas Old"
                    value={oldYear}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Nominal (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Kompetensi Keahlian"
                    value={oldNominal}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="year"
                  >
                    Tahun
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="year"
                    name="year"
                    type="text"
                    placeholder="Tahun"
                    value={year}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nominal"
                  >
                    Nominal
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="nominal"
                    name="nominal"
                    type="text"
                    placeholder="Nominal"
                    value={nominal}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="bg-sky-500 hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Ubah Data
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

export default ContainersSppEdit;
