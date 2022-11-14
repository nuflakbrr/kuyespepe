import { FC, useState, useEffect, createRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaCartPlus, FaFileDownload } from 'react-icons/fa';
import Pdf from 'react-to-pdf';

import SidebarAdmin from './components/Sidebar';
import PaymentItemAdmin from './components/PaymentItem';
import axios from '../../../config/axios';

const ContainersDashboardAdmin: FC = () => {
  const ref = createRef();

  const options = { orientation: 'landscape', unit: 'in', format: [8.8, 8.8] };

  // Required state
  const [dataSpp, setDataSpp] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);

  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    // Get SPP Data Length
    const getSppData = async () => {
      await axios
        .get('/spp', headerConf)
        .then((res) => setDataSpp(res.data.data))
        .catch((err) => console.log(err));
    };

    // Get Student Data Length
    const getStudentData = async () => {
      await axios
        .get('/siswa', headerConf)
        .then((res) => setDataStudent(res.data.data))
        .catch((err) => console.log(err));
    };

    // Get Payment Data Length
    const getPaymentData = async () => {
      await axios
        .get('/pembayaran', headerConf)
        .then((res) => {
          setDataPayment(res.data.data);
        })
        .catch((err) => console.log(err));
    };

    // Get Admin Data Length
    const getAdminData = async () => {
      await axios
        .get('/petugas', headerConf)
        .then((res) => setDataAdmin(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([
      getSppData(),
      getStudentData(),
      getPaymentData(),
      getAdminData(),
    ]);
  }, []);

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
        <title>Dashboard Admin - KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-white dark:bg-gray-900 md:ml-64 min-h-screen">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full p-10">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-5 gap-4">
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataSpp.length}</p>
                    <p>Total SPP</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataStudent.length}</p>
                    <p>Total Siswa</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataPayment.length}</p>
                    <p>Total Pembayaran</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-slate-100 dark:border-white text-white font-medium group">
                  <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="stroke-current text-slate-800 transform transition-transform duration-500 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataAdmin.length}</p>
                    <p>Total Petugas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-10">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-black dark:text-white text-2xl font-semibold">
                    Daftar Pembayaran
                  </h2>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="lg:ml-40 ml-10 space-x-8">
                    <Link
                      href="/admin/payment/add"
                      className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                      <FaCartPlus className="mr-2" /> Tambah Pembayaran
                    </Link>
                  </div>
                  <div className="lg:ml-2 ml-10 space-x-8">
                    <Pdf
                      targetRef={ref}
                      filename="Report-Admin.pdf"
                      options={options}
                    >
                      {({ toPdf }: any) => (
                        <button
                          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2 lg:mt-0"
                          onClick={toPdf}
                        >
                          <FaFileDownload className="mr-2" /> Unduh Laporan
                        </button>
                      )}
                    </Pdf>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full rounded-lg overflow-hidden">
                    {!dataPayment.length ? (
                      <p className="text-black dark:text-white text-center mx-auto">
                        Memuat Data📦...
                      </p>
                    ) : (
                      dataPayment.map((item: any) => (
                        <PaymentItemAdmin
                          studentName={item.siswa.nama}
                          nisn={item.nisn}
                          totalPayment={item.jumlah_bayar}
                          datePayment={item.tgl_bayar}
                          id={item.nisn}
                          key={item.id_pembayaran}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="absolute top-1 -z-10"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                NISN
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Nama Siswa
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Tanggal Bayar
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Bulan Dibayar
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Tahun Dibayar
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Jumlah Bayar
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPayment.map((item: any, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.nisn}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.siswa.nama}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatTime(item.tgl_bayar)}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.bulan_dibayar}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.tahun_dibayar}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatCurrency(item.jumlah_bayar)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ContainersDashboardAdmin;
