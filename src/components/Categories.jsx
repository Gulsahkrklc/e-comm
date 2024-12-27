import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = useSelector((state) => state.product.categories);

  const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="py-4  font-monts">
      <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {topCategories.map((category) => (
          <Link
            key={category.id}
            to={`/shop/${category.gender === "e" ? "erkek" : "kadin"}/${category.code.split(":")[1]}/${category.id}`}
            className="relative group"
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white group-hover:bg-opacity-60 transition-all">
              <div className='flex justify-center items-center gap-2'>
                <h3 className="text-lg font-bold">{category.title}</h3>
                <p>{category.gender === "e" ? "(Bay)" : "(Bayan)"}</p>
              </div>
              <p className="text-sm">{category.rating} ⭐</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;