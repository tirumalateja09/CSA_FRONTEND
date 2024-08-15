import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, addItems, removeItems, removeProduct } from './store/cartslice';
import emptyCartImage from '../assets/emptyCart.png';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  useEffect(() => {
    document.title = "Cart";
  }, []);

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemHandle = (item) => {
    dispatch(addItems(item));
  };

  const removeItemHandle = (item) => {
    dispatch(removeItems(item));
  };

  const removeProductHandle = (item) => {
    dispatch(removeProduct(item));
  };

  // Payment using Razorpay
  const paymentOptions = (amount) => {
    return {
      key: 'rzp_test_GgREDX8otrTn3w',
      amount: amount * 100, 
      currency: "INR",
      description: "Acme Corp",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          dispatch(clearCart());
          navigate('/home');
        }
      },
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: "#F37254"
      }
    }
  };

  const buynowHandler = (totalAmount) => {
    console.log(typeof totalAmount)
    console.log(totalAmount)
    const razorpay = new window.Razorpay(paymentOptions(Number(totalAmount)));
    razorpay.open();
  };

  const totalAmount = cartItems.reduce((acc, cur) => {
    console.log( typeof cur.count)
    const price = Number(cur.product.price);
    return acc + (price * cur.count);
  }, 0).toFixed(2);

  return (
    <div className="container mx-auto my-8 p-4">
      {cartItems.length === 0 ? (
        <div className="text-center mt-12">
          <img
            src={emptyCartImage}
            alt="Empty cart"
            className="mx-auto w-[450px] h-auto"
          />
          <h1 className="text-xl font-semibold mt-4">Your cart is empty!</h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6 mt-14">Items in Cart</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((ele, index) => {
                  const price = ele.product.price;
                  const totalPrice = (price * ele.count).toFixed(2);

                  return (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4 flex items-center">
                        <img
                          src={ele.product.thumbnail}
                          alt={ele.product.title}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div className="text-md font-semibold text-gray-900">
                          {ele.product.title}
                        </div>
                      </td>
                      <td className="py-4 px-4">{ele.product.category}</td>
                      <td className="py-4 px-4">₹{price}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeItemHandle(ele.product)}
                            className="px-3 py-1 bg-black text-white rounded"
                          >
                            -
                          </button>
                          <span>{ele.count}</span>
                          <button
                            onClick={() => addItemHandle(ele.product)}
                            className="px-3 py-1 bg-black text-white rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">₹{totalPrice}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => removeProductHandle(ele.product)}
                          className="px-4 py-2 bg-black text-white rounded">Remove Item</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-4 me-10">
            <div className="flex items-center space-x-14">
              <span className="font-semibold text-lg">Total Sum: ₹{totalAmount}</span>
              <button 
                onClick={() => buynowHandler(totalAmount)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400 transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
