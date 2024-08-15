import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItems } from '../store/cartslice';
import { fetchedDataById } from '../store/ApicallsEachProducts';

const ProductMenu = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    // Fetch product data from Redux store
    const singleProduct = useSelector((store) => store.apiDataById.product);
    const loading = useSelector((store) => store.apiDataById.loading);
    const error = useSelector((store) => store.apiDataById.error);

    useEffect(() => {
        dispatch(fetchedDataById(productId));
    }, [dispatch, productId]);

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching product data: {error}</div>;

   
    if (!singleProduct) {
        return <div>No product found.</div>;
    }

    const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        reviews = [],
        returnPolicy,
        images,
    } = singleProduct;

    const clickHandler = () => {
        dispatch(addItems(singleProduct));
    };

    return (
        <div className="container mx-auto p-4 mt-28">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="w-full md:w-1/2">
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
                {/* Product Details */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{description}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-semibold">${price}</span>
                        {discountPercentage > 0 && (
                            <span className="ml-4 text-sm text-red-500">
                                {discountPercentage}% off
                            </span>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500">
                            {'★'.repeat(Math.round(rating))}
                            {'☆'.repeat(5 - Math.round(rating))}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">({reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Brand: {brand}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Stock: {stock}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Warranty: {warrantyInformation}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Shipping Info: {shippingInformation}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Availability Status: {availabilityStatus}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-700">Return Policy: {returnPolicy}</span>
                    </div>
                    <button onClick={clickHandler} className="mt-auto w-[150px] bg-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-pink-600 transition">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500">
                                    {'★'.repeat(Math.round(review.rating))}
                                    {'☆'.repeat(5 - Math.round(review.rating))}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">by {review.reviewerName}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductMenu;