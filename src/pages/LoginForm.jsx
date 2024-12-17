import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link} from 'react-router-dom'; // useHistory import edildi
import { toast} from 'react-toastify';
import { login } from '../redux/userActions';
import { useDispatch } from 'react-redux';
import PageContent from '../layout/PageContent';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory(); 
  
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data.email, data.password, rememberMe));
      const response = await axiosInstance.post('/login', postData);

      const userData = response.data;
      dispatch(setUser(userData));

      if (data.rememberMe && userData.token) {
        localStorage.setItem('token', userData.token);
      }

      toast.success('Login successful!');
      history.push("/");
      //history.goBack(); // Önceki sayfaya yönlendirme
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again");
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
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className={`border p-2 w-full rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required and must be valid.</span>}
        </div>

      <div className="mb-4">
      <label className="block mb-2 font-semibold">Password *</label>
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && <div className="text-red-500 text-sm">Please enter correct password.</div>}
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          {...register('rememberMe')}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}

        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {isSubmitting && (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
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
          )}
          {isSubmitting ? 'Submitting...' : 'Log In'}
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not Registered? <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">Sign Up</Link>
          </p>
        </div>
      
    </form>
     </div>
     </PageContent>
  );
};

export default LoginForm;
