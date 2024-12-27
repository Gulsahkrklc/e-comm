import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 25;

const ProductShop = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  const { productList, isLoading, error, total } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ 
      limit: ITEMS_PER_PAGE, 
      offset: currentPage * ITEMS_PER_PAGE 
    }));
  }, [dispatch, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading) {
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

      {/* Product List */}
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-4">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList?.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="border rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-contain rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">Price: ₺{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="my-8">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center gap-2"}
          previousLinkClassName={"px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"}
          nextLinkClassName={"px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"}
          pageClassName={"px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
};

export default ProductShop;
