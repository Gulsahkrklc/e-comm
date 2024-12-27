import React, { useEffect, useState } from 'react';
import PageContent from "../layout/PageContent";
import Categories from '../components/Categories';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProductList, setLimit, setOffset } from '../redux/actions/productActions';

function createSlug(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function ShopPage() {
  const dispatch = useDispatch();

  const { productList, fetchState, total, limit, offset } = useSelector((state) => state.product);
  const products = productList || [];
  const { gender, categoryName, categoryId } = useParams();

  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(setLimit(24));
        setIsMobile(false);
      } else {
        dispatch(setLimit(5));
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setOffset(0));
    setFilter('');
    setAppliedFilter('');
  }, [dispatch, categoryId, categoryName, gender, sort]);

  useEffect(() => {
    dispatch(fetchProductList({ category: categoryId, sort, filter: appliedFilter, limit, offset }));
  }, [dispatch, categoryId, sort, appliedFilter, limit, offset, gender]);

  const totalProducts = total;
  const totalPages = Math.ceil(totalProducts / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      dispatch(setOffset((pageNum - 1) * limit));
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const getPaginationButtons = () => {
    if (totalPages <= 1) return [];

    const buttons = [];

    if (isMobile) {
      const firstPage = 1;
      const lastPage = totalPages;

      if (currentPage > 1) {
        buttons.push(
          <button key="first" onClick={() => goToPage(1)} className="px-2 border hover:bg-gray-100 rounded">
            First
          </button>
        );
      }

      buttons.push(
        <button
          key="prev"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-2 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          Previous
        </button>
      );

      const pagesToShow = [];
      if (currentPage - 1 > firstPage) pagesToShow.push(currentPage - 1);
      pagesToShow.push(currentPage);
      if (currentPage + 1 < lastPage) pagesToShow.push(currentPage + 1);

      pagesToShow.forEach((p) => {
        if (p >= firstPage && p <= lastPage) {
          buttons.push(
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-2 border rounded ${p === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {p}
            </button>
          );
        }
      });

      buttons.push(
        <button
          key="next"
          onClick={goToNextPage}
          disabled={currentPage === lastPage}
          className={`px-2 border rounded ${currentPage === lastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          Next
        </button>
      );

      if (currentPage < lastPage) {
        buttons.push(
          <button key="last" onClick={() => goToPage(lastPage)} className="px-2 border hover:bg-gray-100 rounded">
            Last
          </button>
        );
      }

      return buttons;
    }

    if (totalPages <= 5) {
      const buttonsAll = [];
      if (currentPage > 1) {
        buttonsAll.push(
          <button key="prev" onClick={goToPreviousPage} className="px-2 border rounded hover:bg-gray-100">
            Previous
          </button>
        );
      }
      for (let i = 1; i <= totalPages; i++) {
        buttonsAll.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-2 border rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages) {
        buttonsAll.push(
          <button key="next" onClick={goToNextPage} className="px-2 border rounded hover:bg-gray-100">
            Next
          </button>
        );
      }
      return buttonsAll;
    }

    const desktopButtons = [];

    if (currentPage > 3) {
      desktopButtons.push(<button key="first" onClick={() => goToPage(1)} className="px-2 border hover:bg-gray-100 rounded">First</button>);
    }

    desktopButtons.push(
      <button
        key="prev"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-2 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        Previous
      </button>
    );

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = 5;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - 4;
    }

    if (currentPage > 3) {
      desktopButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      desktopButtons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-2 border rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      desktopButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
    }

    desktopButtons.push(
      <button
        key="next"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-2 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        Next
      </button>
    );

    if (totalPages > 5 && currentPage < totalPages - 2) {
      desktopButtons.push(<button key="last" onClick={() => goToPage(totalPages)} className="px-2 border hover:bg-gray-100 rounded">Last</button>);
    }

    return desktopButtons;
  };

  if (fetchState === "FETCHING") {
    return (
      <PageContent>
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading products...</div>
        </div>
      </PageContent>
    );
  }

  if (fetchState === "FETCHED" && products.length === 0) {
    return (
      <PageContent>
        <div className="px-4 py-6 lg:px-12 font-monts">
          <Categories />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
            <p className="text-gray-700 text-sm">No products found</p>
          </div>
        </div>
      </PageContent>
    );
  }

  const paginationButtons = getPaginationButtons();

  return (
    <div>
      <PageContent>
        <div className="px-4 py-6 lg:px-12 font-monts">
          <Categories />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 mt-2 space-y-4 md:space-y-0">
            <div>
              <p className="text-gray-700 text-sm">Showing {products.length} of {totalProducts} results</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-x-2 space-y-4 sm:space-y-0">
              <div className='flex items-center space-x-2'>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 border rounded ${view === 'grid' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600`}
                    aria-label="Grid View"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3zM3 13h8v8H3zM13 3h8v8h-8zM13 13h8v8h-8z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 border rounded ${view === 'list' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600`}
                    aria-label="List View"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <select
                    className="border border-gray-300 rounded text-sm px-2 py-1"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Select Sort</option>
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                    <option value="rating:asc">Rating: Low to High</option>
                    <option value="rating:desc">Rating: High to Low</option>
                  </select>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type="text"
                  placeholder="Filter..."
                  className="border border-gray-300 rounded text-sm px-2 py-1"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />

                <button
                  className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  onClick={() => { setAppliedFilter(filter); }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              view === 'grid'
                ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'space-y-6'
            }
          >
            {products.map((product, ind) => {
              const slug = createSlug(product.name);
              const productUrl = `/shop/${gender || 'erkek'}/${categoryName || 'category'}/${categoryId || '0'}/${slug}/${product.id}`;
              return (
                <Link key={ind} to={productUrl}>
                  <div
                    className={`border border-gray-200 rounded p-4 flex min-h-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-gray-500 ${view === 'list' ? 'flex-row space-x-4' : 'flex-col'
                      } text-center cursor-pointer`}
                  >
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Product Image ${index}`}
                        className={`${view === 'grid' ? 'mb-4' : 'w-32 h-40 object-cover'} rounded`}
                      />
                    ))}
                    <div className={`${view === 'grid' ? 'gap-1 items-center' : 'gap-2 justify-center items-start text-left'} flex flex-col`}>
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-green-600 font-semibold">₺{product.price}</span>
                        <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                      </div>
                      <div className="flex space-x-1 gap-2">
                        <span className="text-yellow-500">
                          {"★".repeat(Math.round(product.rating))}
                          {"☆".repeat(5 - Math.round(product.rating))}
                        </span>
                        <span className='text-gray-700 font-semibold'>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-2 text-sm">
              {paginationButtons}
            </div>
          )}
        </div>
      </PageContent>
    </div>
  );
}

export default ShopPage;