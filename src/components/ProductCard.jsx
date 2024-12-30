import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const ProductCard = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  image,
  gender = 'all',
  categoryName = 'general',
  category_id = 0,
}) => {
  // Create a URL-friendly slug from the name
  const nameSlug = slugify(name || '', { lower: true });

  return (
    <section>
      <div className='flex flex-col flex-wrap'>
        <Link 
          to={`/shop/${gender}/${categoryName}/${category_id}/${nameSlug}/${id}`}
          className="group cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img src={image} alt={name} className="group-hover:opacity-80" />
        
        <div className="p-4 text-center font-bold">
          <h5 className="text-h5">{name}</h5>
          <h6 className="text-h6 text-secondText">{description}</h6>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="text-secondText line-through text-h5">
              ${price}
            </span>
            <span className="text-h5 text-primary">
              ${discountedPrice}
            </span>
          </div>
          <div className="flex gap-2 justify-center">
            {["bg-blue-500", "bg-orange-500", "bg-navy-900"].map((color, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
                aria-label={`Select color ${index + 1}`}
              />
            ))}
          </div>
        </div>
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;