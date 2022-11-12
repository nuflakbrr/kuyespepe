import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from '../../config/axios';

const LoginAdmin: FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedSuccess, setLoggedSuccess] = useState(false);
  const [loggedFailed, setLoggedFailed] = useState(false);

  const bindingState = (e: any) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const sendData = { username, password };

    axios
      .post('/petugas/admin', sendData)
      .then((res) => {
        setLoggedSuccess(res.data.logged);
        setLoggedFailed(!res.data.logged);

        if (loggedSuccess) {
          const admin = res.data.data;
          const token = res.data.token;
          localStorage.setItem('admin', JSON.stringify(admin));
          localStorage.setItem('token', token);
          setTimeout(() => router.push('/admin/dashboard'), 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Masuk Admin - KuyEspepe</title>
      </Head>

      <Navbar />

      <main className="bg-white dark:bg-gray-900">
        <div className="py-20">
          <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="container bg-slate-100 dark:bg-white rounded p-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-black">Masuk Admin</h1>
              </div>
              <form onSubmit={(e) => handleLogin(e)}>
                {loggedFailed && (
                  <div className="mt-4 bg-red-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Username atau Password salah, silakan coba kembali!
                    </p>
                  </div>
                )}
                {loggedSuccess && (
                  <div className="mt-4 bg-green-500 p-3 rounded">
                    <p className="text-white text-sm font-bold">
                      Login Sukses, Selamat datang kembali!
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => bindingState(e)}
                    required
                  />
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
                    placeholder="******"
                    autoComplete="false"
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
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default LoginAdmin;
