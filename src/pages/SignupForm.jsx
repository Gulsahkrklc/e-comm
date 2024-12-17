import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import PageContent from '../layout/PageContent';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setRoles } from '../redux/actions/clientActions';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      role_id: "3"
    }
  });

  const roles = useSelector(state => state.client.roles);
  const dispatch = useDispatch();

  const [storeFieldsVisible, setStoreFieldsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        dispatch(setRoles(response.data));
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    if (roles.length === 0) {
      fetchRoles();
    }
  }, [dispatch, roles.length]);

  const onSubmit = async (data) => {
    try {
      const { role_id } = data;
      let postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id,
      };

      if (role_id === 'store') {
        postData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxNo,
          bank_account: data.storeBankAccount,
        };
      }

      await axiosInstance.post('/signup', postData);
      toast.success('You need to click link in email to activate your account!');
      history.push("/login");
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed. Please try again.');
    }
  };

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find(role => role.id === parseInt(selectedRoleId, 10));
    setStoreFieldsVisible(selectedRole && selectedRole.code === 'store');
  };

  return (
    <PageContent>
      <div className="flex font-monts items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: `url('/images/signup-img.jpg')` }}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-md p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Name *</label>
            <input
              {...register('name', { required: true, minLength: 3 })}
              className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Full Name"
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required and must be at least 3 characters.</span>}
          </div>

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
              {...register('password', {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              })}
              className={`border p-2 w-full rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password must be at least 8 characters, including numbers, upper and lower case letters, and special characters.
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Confirm Password *</label>
            <input
              type="password"
              {...register('confirmPassword', {
                validate: value => value === watch('password') || "Passwords don't match"
              })}
              className={`border p-2 w-full rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          {roles.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Role *</label>
              <select
                {...register('role_id', { required: true })}
                onChange={handleRoleChange}
                className={`border p-2 w-full rounded ${errors.role_id ? 'border-red-500' : 'border-gray-300'}`}
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              {errors.role_id && <span className="text-red-500 text-sm">Role is required.</span>}
            </div>
          )}

          {storeFieldsVisible && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Store Name *</label>
                <input
                  {...register('storeName', { required: true, minLength: 3 })}
                  className={`border p-2 w-full rounded ${errors.storeName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Store Name"
                />
                {errors.storeName && <span className="text-red-500 text-sm">Store Name is required and must be at least 3 characters.</span>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Store Phone *</label>
                <input
                  {...register('storePhone', { required: true, pattern: /^(\+90|0)?5\d{2}\d{7}$/ })}
                  className={`border p-2 w-full rounded ${errors.storePhone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+90xxxxxxxxxx"
                />
                {errors.storePhone && <span className="text-red-500 text-sm">Store Phone is required and must be a valid Türkiye phone number.</span>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Store Tax ID *</label>
                <input
                  {...register('storeTaxNo', { required: true, pattern: /^T\d{4}V\d{6}$/ })}
                  className={`border p-2 w-full rounded ${errors.storeTaxNo ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="TXXXXVXXXXXX"
                />
                {errors.storeTaxNo && <span className="text-red-500 text-sm">Store Tax ID is required and must match the pattern "TXXXXVXXXXXX".</span>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Store Bank Account *</label>
                <input
                  {...register('storeBankAccount', { required: true, pattern: /^TR\d{2}[0-9]{5}[0-9]{1,16}$/ })}
                  className={`border p-2 w-full rounded ${errors.storeBankAccount ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="TRxxxxxxxxxxxxxxxxxxxxxxxxxx"
                />
                {errors.storeBankAccount && <span className="text-red-500 text-sm">Store Bank Account is required and must be a valid IBAN.</span>}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center"
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
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </PageContent>
  );
};

export default SignupForm;




