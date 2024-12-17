import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import PageContent from "../layout/PageContent";

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
  } = useForm({
    defaultValues: {
      role_id: "3", // Default: Customer
    },
  });

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
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };

      // Add store-specific fields if role is "Store" (role_id === "2")
      if (data.role_id === "2") {
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
    <PageContent>
      <div
        className="flex items-center justify-center min-h-screen bg-cover p-4"
        style={{ backgroundImage: `url('/images/signup.jpeg')` }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name *</label>
            <input
              {...register("name", { required: true, minLength: 3 })}
              className={`border p-2 w-full rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="Full Name"
            />
            {errors.name && <span className="text-red-500">Name is required (min 3 characters)</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email *</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className={`border p-2 w-full rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="example@gmail.com"
            />
            {errors.email && <span className="text-red-500">Valid email is required</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">Password *</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
              })}
              className={`border p-2 w-full rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">
                Password must be at least 8 characters, including uppercase, lowercase, number, and special character
              </span>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block font-semibold mb-1">Role *</label>
            <Controller
              name="role_id"
              control={control}
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
                <label className="block font-semibold mb-1">Store Name *</label>
                <input
                  {...register("storeName", { required: true, minLength: 3 })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Store Name"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Store Phone *</label>
                <input
                  {...register("storePhone", {
                    required: true,
                    pattern: /^(\+90|0)?[1-9][0-9]{9}$/,
                  })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Store Phone"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Store Tax ID *</label>
                <input
                  {...register("storeTaxId", { required: true, pattern: /^T\d{3}V\d{6}$/ })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="TXXXVXXXXXX"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Store Bank Account *</label>
                <input
                  {...register("storeBankAccount", {
                    required: true,
                    pattern: /^TR\d{2}[0-9A-Z]{5}[0-9A-Z]{17}$/,
                  })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="TRXXXXXXXXXXXXXXXXXXXXXX"
                />
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
          <div className="text-center mt-4">
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-500 font-semibold">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PageContent>
  );
};

export default SignupForm;




