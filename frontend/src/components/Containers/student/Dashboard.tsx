import { FC, useState, useEffect } from 'react';
import Head from 'next/head';

import SidebarStudent from './components/Sidebar';
import axios from '../../../config/axios';
import PaymentItemStudent from './components/PaymentItem';

const ContainersDashboardStudent: FC = () => {
  // Required state
  const [dataPayment, setDataPayment] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [studentNisn, setStudentNisn] = useState('');

  // Fetch Data from API
  useEffect(() => {
    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const getStudentData = async () => {
      const student = JSON.parse(localStorage.getItem('student') || '{}');

      await axios
        .get('/siswa', headerConf)
        .then((res) => setDataStudent(res.data.data))
        .catch((err) => console.log(err));

      setStudentNisn(student.nisn);
    };

    const getPaymentData = async () => {
      await axios
        .get(`/pembayaran/siswa/${studentNisn}`, headerConf)
        .then((res) => setDataPayment(res.data.data))
        .catch((err) => console.log(err));
    };

    Promise.all([getStudentData(), getPaymentData()]);
  }, [studentNisn]);

  return (
    <>
      <Head>
        <title>Dashboard Siswa - KuyEspepe</title>
      </Head>

      <SidebarStudent />

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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{dataPayment.length}</p>
                    <p>Histori Pembayaran</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-10">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-white text-2xl font-semibold">
                    Daftar Histori Pembayaran
                  </h2>
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
                        <PaymentItemStudent
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
    </>
  );
};

export default ContainersDashboardStudent;
