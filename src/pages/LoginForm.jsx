import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PageContent from '../layout/PageContent';
import { axiosInstance, setAuthToken } from '../utils/auth';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/login', {
        email: data.email,
        password: data.password
      });

      const { token, ...userData } = response.data;

      if (token) {
        // Sadece Remember Me seçili ise localStorage'a kaydet
        if (data.rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        // Her durumda token'ı axios header'a ekle
        setAuthToken(token);
        
        // User bilgisini store'a kaydet
        dispatch({ type: 'SET_USER', payload: userData });
        
        toast.success('Login successful!');
        history.push('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again');
    }
  };

  return (
    <PageContent>
      <div className="flex font-monts items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: `url('/images/loginform3.png')` }}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email *</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email'
                }
              })}
              className={`border p-2 w-full rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="example@gmail.com"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password *</label>
            <input
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              placeholder="Password"
              className={`w-full border p-2 rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              {...register('rememberMe')}
              className="mr-2"
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Log In'
            )}
          </button>

          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </PageContent>
  );
};

export default LoginForm;
