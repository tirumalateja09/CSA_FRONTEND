import React from 'react';

const ProductCard = ({ product }) => {
    {console.log(product)}
  const { title, price, discountPercentage, rating, thumbnail, tags } = product;

  return (
    <div className="relative border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">Price: ${price.toFixed(2)}</p>
        <p className="text-gray-500 mb-2">Rating: {rating} ★</p>
        {discountPercentage > 0 && (
          <p className="text-pink-500 font-semibold">Discount: {discountPercentage}%</p>
        )}
      </div>
      <div className="absolute top-2 left-2 flex flex-wrap">
        {tags.map((tag, index) => (
          <span key={index} className="bg-orange-500 text-white text-xs font-semibold mr-1 px-2 py-1 rounded-full z-10">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;