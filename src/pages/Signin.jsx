import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/'); 
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ email, password });

      setLoading(true);
      setError('');

      const response = await axios.get('http://localhost:3000/team', {
        params: { email, password }
      });

      if (response.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        navigate('/dashboard');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-black py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg dark:text-white dark:border border-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-white">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 ">
          <div className='dark:bg-gray-900'>
            <label htmlFor="email" className="block mb-1 text-gray-700 font-medium dark:text-white">email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium dark:text-white">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6 dark:text-white">
        Don&apos;t have an account?
          <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium ">
            Create Acount
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
