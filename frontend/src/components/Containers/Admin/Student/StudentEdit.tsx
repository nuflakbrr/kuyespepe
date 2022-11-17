/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarAdmin from '../components/Sidebar';
import axios from '../../../../config/axios';

const ContainersStudentEdit: FC = () => {
  // Define Router
  const router = useRouter();

  // Required State
  const [oldNisn, setOldNisn] = useState([]);
  const [oldNis, setOldNis] = useState([]);
  const [oldName, setOldName] = useState([]);
  const [oldAddress, setOldAddress] = useState([]);
  const [oldPhone, setOldPhone] = useState([]);
  const [oldClass, setOldClass] = useState([]);
  const [oldSpp, setOldSpp] = useState([]);
  const [nisn, setNisn] = useState('');
  const [nis, setNis] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [idClass, setIdClass] = useState('');
  const [idSpp, setIdSpp] = useState('');
  const [dataClass, setDataClass] = useState([]);
  const [dataSpp, setDataSpp] = useState([]);
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  // Get Data by params id
  const { id } = router.query;

  const headerConf = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  // Fetch Data from API
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/siswa/${id}`, headerConf)
        .then((res) => {
          setOldNisn(res.data.data.nisn);
          setOldNis(res.data.data.nis);
          setOldName(res.data.data.nama);
          setOldAddress(res.data.data.alamat);
          setOldPhone(res.data.data.no_telp);
          setOldClass(res.data.data.id_kelas);
          setOldSpp(res.data.data.id_spp);
        })
        .catch((err) => console.log(err));
    };

    const fetchDataClass = async () => {
      await axios
        .get('/kelas', headerConf)
        .then((res) => setDataClass(res.data.data))
        .catch((err) => console.log(err));
    };

    const fetchDataSpp = async () => {
      await axios
        .get('/spp', headerConf)
        .then((res) => setDataSpp(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getData(), fetchDataClass(), fetchDataSpp()]);
  }, [id, headerConf]);

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
      setNisn(value);
    } else if (name === 'nis') {
      setNis(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'class') {
      setIdClass(value);
    } else if (name === 'spp') {
      setIdSpp(value);
    }
  };

  // Handle PUT Data
  const handleStore = async (e: any) => {
    e.preventDefault();

    const sendData = {
      nisn,
      nis,
      nama: name,
      alamat: address,
      no_telp: phone,
      password,
      id_kelas: idClass,
      id_spp: idSpp,
    };

    axios
      .put('/siswa', sendData, headerConf)
      .then(() => {
        setStoreSuccess(true);
        setStoreFailed(false);

        router.push('/admin/student');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Edit Siswa | KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <main className="bg-white dark:bg-gray-900">
        <div className="md:ml-64 py-32">
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
                    NISN (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="NISN"
                    value={oldNisn}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    NIS (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="NIS"
                    value={oldNis}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Nama (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Nama"
                    value={oldName}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    No Telpon (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="No Telpon"
                    value={oldPhone}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    Alamat (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="Alamat"
                    value={oldAddress}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    ID Kelas (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="ID Kelas"
                    value={oldClass}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="old"
                  >
                    ID SPP (Old)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="old"
                    name="old"
                    type="text"
                    placeholder="ID SPP"
                    value={oldSpp}
                    required
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nisn"
                  >
                    NISN
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="nisn"
                    name="nisn"
                    type="text"
                    placeholder="NISN"
                    value={nisn}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nis"
                  >
                    NIS
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="nis"
                    name="nis"
                    type="text"
                    placeholder="NIS"
                    value={nis}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Alamat
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Alamat"
                    value={address}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    No Telepon
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="No Telepon"
                    value={phone}
                    onChange={(e) => bindingState(e)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="class"
                  >
                    Kelas
                  </label>
                  <select
                    name="class"
                    id="class"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => bindingState(e)}
                  >
                    <option selected disabled>
                      Pilih Kelas
                    </option>
                    {dataClass.map((item: any) => (
                      <option value={item.id_kelas} key={item.id_kelas}>
                        ID {item.id_kelas}: {item.nama_kelas}
                      </option>
                    ))}
                  </select>
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
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
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

export default ContainersStudentEdit;
