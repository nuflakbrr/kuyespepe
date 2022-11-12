import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import SidebarAdmin from './components/Sidebar';
import { FaCartPlus } from 'react-icons/fa';

const ContainersDashboardAdmin: FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard Admin - KuyEspepe</title>
      </Head>

      <SidebarAdmin />

      <section className="bg-gray-900 md:ml-64 min-h-screen">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full p-10">
              <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-5 gap-4">
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-white text-white font-medium group">
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
                    {/* <p className='text-2xl'>{dataOutlet.length}</p> */}
                    <p>Total Outlet</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-white text-white font-medium group">
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
                    {/* <p className='text-2xl'>{dataMember.length}</p> */}
                    <p>Total Member</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-white text-white font-medium group">
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
                    {/* <p className='text-2xl'>{dataTransaction.length}</p> */}
                    <p>Total Transaksi</p>
                  </div>
                </div>
                <div className="bg-sky-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-white text-white font-medium group">
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
                    {/* <p className='text-2xl'>{dataUser.length}</p> */}
                    <p>Total Petugas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-10">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-white text-2xl font-semibold">
                    Daftar Transaksi
                  </h2>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="lg:ml-40 ml-10 space-x-8">
                    <Link
                      href="/admin/transaction/add"
                      className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                      <FaCartPlus className="mr-2" /> Tambah Transaksi
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {/* {!dataUser.length || !dataMember.length || !dataOutlet.length || !dataTransaction.length ? (
                      <p className='text-white text-center mx-auto'>Memuat Data📦...</p>
                    ) : (
                      <table className='min-w-full leading-normal'>
                        <thead>
                          <tr>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              No
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Nama Member
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Tanggal
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Tanggal Selesai
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Tanggal Bayar
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Status Pembayaran
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Status Pengerjaan
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Nama Petugas
                            </th>
                            <th
                              className='px-5 py-3 border-b-2 border-gray-200 bg-sky-500 text-left text-xs font-semibold text-white uppercase tracking-wider'>
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataTransaction.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                      {index + 1}
                                    </p>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <div className='flex-shrink-0 w-10 h-10'>
                                      <img className='w-full h-full rounded-full'
                                        src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                        alt='Member Profile Picture' />
                                    </div>
                                    <div className='ml-3'>
                                      <p className='text-gray-900 whitespace-no-wrap'>
                                        {formatMemberName(val.memberId)}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                      {formatDate(val.date)}
                                    </p>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                      {formatDate(val.deadline)}
                                    </p>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                      {formatDate(val.datePayment)}
                                    </p>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    {getStatusPayment(val.statusPayment)}
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    {getStatusTransaction(val.status)}
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <div className='flex items-center'>
                                    <div className='flex-shrink-0 w-10 h-10'>
                                      <img className='w-full h-full rounded-full'
                                        src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                                        alt='Admin Profile Picture' />
                                    </div>
                                    <div className='ml-3'>
                                      <p className='text-gray-900 whitespace-no-wrap'>
                                        {formatUserName(val.adminId)}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                  <Link to={`/admin/transaction/edit/${val._id}`} className='flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'><FaEdit className='mr-2' /> Ubah</Link>
                                </td>
                              </tr>
                            )
                            );
                          })}
                        </tbody>
                      </table>
                    )} */}
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

export default ContainersDashboardAdmin;
