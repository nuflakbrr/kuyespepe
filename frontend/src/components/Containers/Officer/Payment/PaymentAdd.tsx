import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarOfficer from '../components/Sidebar';
import axios from '../../../../config/axios';

const ContainersPaymentAdd: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [idNisn, setIdNisn] = useState('');
  const [datePayment, setDatePayment] = useState('');
  const [monthPayment, setMonthPayment] = useState('');
  const [yearPayment, setYearPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [idAdmin, setIdAdmin] = useState('');
  const [idSpp, setIdSpp] = useState('');
  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [dataSpp, setDataSpp] = useState([]);
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Fetch Data from API
  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const fetchDataAdmin = async () => {
      await axios
        .get('/petugas', headerConf)
        .then((res) => setDataAdmin(res.data.data))
        .catch((err) => console.log(err));
    };

    const fetchDataSpp = async () => {
      await axios
        .get('/spp', headerConf)
        .then((res) => setDataSpp(res.data.data))
        .catch((err) => console.log(err));
    };

    const fetchDataStudent = async () => {
      await axios
        .get('/siswa', headerConf)
        .then((res) => setDataStudent(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([fetchDataAdmin(), fetchDataSpp(), fetchDataStudent()]);
  }, []);

  // Format currency to IDR
  const formatCurrency = (num: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(Number(num));
  };

  // Binding event target & value
  const bindingState = (e: any) => {
    const { name, value } = e.target;
    if (name === 'nisn') {
      setIdNisn(value);
    } else if (name === 'datePayment') {
      setDatePayment(value);
    } else if (name === 'monthPayment') {
      setMonthPayment(value);
    } else if (name === 'yearPayment') {
      setYearPayment(value);
    } else if (name === 'totalPayment') {
      setTotalPayment(value);
    } else if (name === 'admin') {
      setIdAdmin(value);
    } else if (name === 'spp') {
      setIdSpp(value);
    }
  };

  // Handle POST Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      nisn: idNisn,
      tgl_bayar: datePayment,
      bulan_dibayar: monthPayment,
      tahun_dibayar: yearPayment,
      jumlah_bayar: totalPayment,
      id_petugas: idAdmin,
      id_spp: idSpp,
    };

    axios
      .post('/pembayaran', sendData)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/officer/dashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Tambah Pembayaran | KuyEspepe</title>
      </Head>

      <SidebarOfficer />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
          <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">
                  Tambah Pembayaran
                </h1>
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
                    htmlFor="nisn"
                  >
                    NISN
                  </label>
                  <select
                    name="nisn"
                    id="nisn"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e)}
                  >
                    <option selected disabled>
                      Pilih NISN
                    </option>
                    {dataStudent.map((item: any) => (
                      <option value={item.nisn} key={item.nisn}>
                        NISN {item.nisn}: {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="datePayment"
                  >
                    Tanggal Bayar
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="datePayment"
                    name="datePayment"
                    type="date"
                    placeholder="Tanggal Bayar"
                    value={datePayment}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="monthPayment"
                  >
                    Bulan Bayar
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="monthPayment"
                    name="monthPayment"
                    type="text"
                    placeholder="Bulan Bayar"
                    value={monthPayment}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="yearPayment"
                  >
                    Tahun Bayar
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="yearPayment"
                    name="yearPayment"
                    type="text"
                    placeholder="Tahun Bayar"
                    value={yearPayment}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="spp"
                  >
                    SPP
                  </label>
                  <select
                    name="spp"
                    id="spp"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e)}
                  >
                    <option selected disabled>
                      Pilih SPP
                    </option>
                    {dataSpp.map((item: any) => (
                      <option value={item.id_spp} key={item.id_spp}>
                        ID {item.id_spp}: {formatCurrency(item.nominal)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="totalPayment"
                  >
                    Jumlah Bayar
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="totalPayment"
                    name="totalPayment"
                    type="text"
                    placeholder="Jumlah Bayar"
                    value={totalPayment}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="admin"
                  >
                    Petugas
                  </label>
                  <select
                    name="admin"
                    id="admin"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e)}
                  >
                    <option selected disabled>
                      Pilih Petugas
                    </option>
                    {dataAdmin.map((item: any) => (
                      <option value={item.id_petugas} key={item.id_petugas}>
                        ID {item.id_petugas}: {item.nama_petugas}
                      </option>
                    ))}
                  </select>
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

export default ContainersPaymentAdd;
