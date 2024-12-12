import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Create Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  const selectedRole = watch("role_id");

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };

      if (data.role_id === "2") {
        // Assuming '3' is the store role ID
        formData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxId,
          bank_account: data.storeBankAccount,
        };
      }

      await api.post("/signup", formData);
      alert("You need to click the link in your email to activate your account!");
      history.goBack(); // Redirect to the previous page
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true, minLength: 3 })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.name && <span className="text-red-500">Name is required (min 3 characters)</span>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <span className="text-red-500">Valid email is required</span>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && (
          <span className="text-red-500">
            Password must be at least 8 characters long and include numbers,
            lowercase, uppercase, and special characters
          </span>
        )}
      </div>

      {/* Password Confirmation */}
      <div>
        <label htmlFor="confirmPassword" className="block mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block mb-1">
          Role
        </label>
        <Controller
          name="role_id"
          control={control}
          defaultValue="3" // Assuming '2' is the customer role ID
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} className="w-full px-3 py-2 border rounded">
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {/* Store-Specific Fields */}
      {selectedRole === "2" && (
        <>
          <div>
            <label htmlFor="storeName" className="block mb-1">
              Store Name
            </label>
            <input
              id="storeName"
              {...register("storeName", { required: true, minLength: 3 })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.storeName && (
              <span className="text-red-500">Store name is required (min 3 characters)</span>
            )}
          </div>

          <div>
            <label htmlFor="storePhone" className="block mb-1">
              Store Phone
            </label>
            <input
              id="storePhone"
              {...register("storePhone", {
                required: true,
                pattern: /^(\+90|0)?[1-9][0-9]{9}$/,
              })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.storePhone && (
              <span className="text-red-500">Valid Turkish phone number is required</span>
            )}
          </div>

          <div>
            <label htmlFor="storeTaxId" className="block mb-1">
              Store Tax ID
            </label>
            <input
              id="storeTaxId"
              {...register("storeTaxId", {
                required: true,
                pattern: /^T\d{3}V\d{6}$/,
              })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.storeTaxId && (
              <span className="text-red-500">Valid Tax ID is required (TXXXVXXXXXX)</span>
            )}
          </div>

          <div>
            <label htmlFor="storeBankAccount" className="block mb-1">
              Store Bank Account (IBAN)
            </label>
            <input
              id="storeBankAccount"
              {...register("storeBankAccount", {
                required: true,
                pattern: /^TR\d{2}[0-9A-Z]{5}[0-9A-Z]{17}$/,
              })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.storeBankAccount && (
              <span className="text-red-500">Valid IBAN is required</span>
            )}
          </div>
        </>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;

