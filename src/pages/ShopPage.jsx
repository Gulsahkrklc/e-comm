import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryActions";
import { Link } from "react-router-dom";
import PageContent from "../layout/PageContent";

const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Popularity");

  const dispatch = useDispatch();
  const { list: categories, loading, error } = useSelector((state) => state.categories);
  const topCategories = categories?.slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5) || [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const totalPages = Math.ceil((categories?.length || 0) / ITEMS_PER_PAGE);

  const paginatedCategories = categories?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <PageContent>
        {/* Page Title and Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Shop</h2>
            <nav className="text-sm text-gray-500">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              / <span className="text-gray-700">Shop</span>
            </nav>
          </div>
        </div>

        {/* Top 5 Categories */}
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-4">Top Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
                className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-48 object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold text-center">
                    {category.title} <br /> {category.rating} Stars
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-4">All Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
                className="border rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-48 object-contain rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-500">Rating: {category.rating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white text-black"} rounded-l-lg`}
          >
            First
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"} hover:bg-blue-100`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-white text-black"} rounded-r-lg`}
          >
            Next
          </button>
        </div>
      </PageContent>
    </div>
  );
};

export default ShopPage;