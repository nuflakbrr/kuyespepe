import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

import axios from '../../../../config/axios';

type SppItemProps = {
  id: number;
  year: string;
  nominal: string;
};

const SppItemAdmin: FC<SppItemProps> = ({ id, year, nominal }) => {
  const router = useRouter();

  // Delete Spp Item
  const handleDelete = async (e: any) => {
    e.preventDefault();

    alert('Apakah anda yakin ingin menghapus data ini?');

    const headerConf = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    await axios
      .delete(`/spp/${id}`, headerConf)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    router.reload();
  };

  // Format currency to IDR
  const formatCurrency = (num: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(Number(num));
  };

  return (
    <div className="container bg-slate-100 dark:bg-white rounded-lg p-5 mb-5">
      <div className="flex items-center justify-between">
        <section>
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Tahun</h1>
            <h1 className="font-bold text-lg text-black">
              {year || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Nominal</h1>
            <h1 className="font-bold text-lg text-black">
              {formatCurrency(nominal) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <div className="hidden md:block text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Nominal</h1>
            <h1 className="font-bold text-lg text-black">
              {formatCurrency(nominal) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <Link
            href={`/admin/spp/edit/${id}`}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            <FaEdit className="mr-2" /> Ubah
          </Link>
          <button
            type="button"
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
            onClick={(e) => handleDelete(e)}
          >
            <FaTrash className="mr-2" /> Hapus
          </button>
        </section>
      </div>
    </div>
  );
};

export default SppItemAdmin;
