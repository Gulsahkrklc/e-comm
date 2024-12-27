import React, { useEffect, useState } from 'react';
import PageContent from "../layout/PageContent";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts, setLimit, setOffset } from '../redux/actions/productActions';
import { fetchCategories } from '../redux/actions/categoryActions';

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
  
  // Get categories from the categories reducer
  const { list: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const topCategories = categories 
    ? [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
    : [];

  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');

  const [isMobile, setIsMobile] = useState(false);

  const sortOptions = [
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'rating:asc', label: 'Rating: Low to High' },
    { value: 'rating:desc', label: 'Rating: High to Low' }
  ];

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
    dispatch(fetchProducts({ category: categoryId, sort, filter: appliedFilter, limit, offset }));
  }, [dispatch, categoryId, sort, appliedFilter, limit, offset, gender]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setAppliedFilter(filter);
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
          <h3 className="text-2xl font-bold mb-6">Top Categories</h3>
          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-w-1 aspect-h-1"></div>
                </div>
              ))}
            </div>
          ) : topCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {topCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop/${category.gender === "e" ? "erkek" : "kadin"}/${category.title.toLowerCase()}/${category.id}`}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 group-hover:from-black/80 group-hover:to-black/40 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                            <p className="text-sm opacity-90">{category.gender === "e" ? "Erkek" : "Kadın"}</p>
                          </div>
                          <div className="flex items-center bg-white/20 px-2 py-1 rounded">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm font-medium">{category.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No categories found
            </div>
          )}
        </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 border-b pb-4">
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Views:</span>
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 ${
                    view === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600'
                  } rounded-l-lg transition-colors hover:bg-blue-500 hover:text-white`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 ${
                    view === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600'
                  } rounded-r-lg transition-colors hover:bg-blue-500 hover:text-white`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="text-gray-600">
              Showing all {products.length} results
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Popularity</option>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleFilterSubmit}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
}

export default ShopPage;