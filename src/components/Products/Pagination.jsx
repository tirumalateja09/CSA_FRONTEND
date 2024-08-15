import React from 'react';

const Pagination = ({ data, currentPage, pageHandler }) => {
  const productsPerPage = 8; 
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(data.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => pageHandler(page)}
            className={`w-8 h-8 rounded-full border-2 transition duration-300 flex items-center justify-center ${
              page === currentPage
                ? 'bg-pink-500 text-white border-pink-600'
                : 'bg-white text-pink-500 border-pink-500 hover:bg-pink-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;