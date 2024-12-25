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
                  className="w-full h-40 object-top object-cover"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
                className="group flex flex-col items-center text-center bg-white"
              >
                <div className="overflow-hidden w-full">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="py-4 transition-colors duration-300 group-hover:text-gray-500">
                  <h3 className="text-base font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">English Department</p>
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <span className="text-sm text-gray-500 line-through">${category.rating}</span>
                    <span className="text-sm text-green-600 font-semibold">$6.48</span>
                  </div>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="w-3 h-3 rounded-full bg-black"></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 mb-8">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-500 hover:text-blue-500"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-500 hover:text-blue-500"
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(currentPage)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 text-gray-500 hover:text-blue-500"
          >
            3
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-4 py-2 text-gray-500 hover:text-blue-500"
          >
            Next
          </button>
        </div>
      </PageContent>
    </div>
  );
};

export default ShopPage;
