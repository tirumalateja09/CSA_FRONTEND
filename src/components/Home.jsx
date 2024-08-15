
import { useState, useEffect } from 'react';
import ProductCard from './Products/ProductCard';
import Pagination from './Products/Pagination';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSortAlt2 } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { fetchedData } from './store/ApicallsSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  useEffect(()=>{
    document.title="Home"
    // window.location.reload
  },[])

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState('');
  const [ratingSortOrder, setRatingSortOrder] = useState('');
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [ratingDropdownVisible, setRatingDropdownVisible] = useState(false);

  const productsStoreData = useSelector((store) => store.apiData.products);
  const dispatch = useDispatch();

  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchedData());
  }, [dispatch]);

  useEffect(() => {
    if (productsStoreData.length === 0) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    let products = [...productsStoreData];

    if (searchTerm) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products by price
    if (priceSortOrder === 'low-to-high') {
      products.sort((a, b) => a.price - b.price);
    } else if (priceSortOrder === 'high-to-low') {
      products.sort((a, b) => b.price - a.price);
    }

    // Sort products by rating
    if (ratingSortOrder === 'rating-low-to-high') {
      products.sort((a, b) => a.rating - b.rating);
    } else if (ratingSortOrder === 'rating-high-to-low') {
      products.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [currentPage, productsStoreData, searchTerm, priceSortOrder, ratingSortOrder]);

  const pageHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const togglePriceDropdown = () => {
    setPriceDropdownVisible(!priceDropdownVisible);
    setRatingDropdownVisible(false);
  };

  const toggleRatingDropdown = () => {
    setRatingDropdownVisible(!ratingDropdownVisible);
    setPriceDropdownVisible(false);
  };

  return (
    <>
      <div className="mt-32 container mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative w-full max-w-xs mb-4 sm:mb-0 sm:mr-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          <div className="relative sm:mr-4 mb-4 sm:mb-0">
            <button
              onClick={togglePriceDropdown}
              className="flex items-center bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 focus:outline-none"
            >
              <BiSortAlt2 className="mr-2" /> Sort by Price
            </button>
            {priceDropdownVisible && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-48">
                <button
                  onClick={() => { setPriceSortOrder('low-to-high'); setPriceDropdownVisible(false); }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => { setPriceSortOrder('high-to-low'); setPriceDropdownVisible(false); }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>

          <div className="relative mb-4 sm:mb-0">
            <button
              onClick={toggleRatingDropdown}
              className="flex items-center bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 focus:outline-none"
            >
              <BiSortAlt2 className="mr-2" /> Sort by Rating
            </button>
            {ratingDropdownVisible && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-48">
                <button
                  onClick={() => { setRatingSortOrder('rating-low-to-high'); setRatingDropdownVisible(false); }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Rating: Low to High
                </button>
                <button
                  onClick={() => { setRatingSortOrder('rating-high-to-low'); setRatingDropdownVisible(false); }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Rating: High to Low
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center">No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <Link key={product.id} to={'/' + product.id}>
                <ProductCard product={product} />
              </Link>
            ))
          )}
        </div>

        <div className='mb-10'>
          <Pagination
            data={productsStoreData}
            currentPage={currentPage}
            pageHandler={pageHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Home;