import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { UserProvider } from './Authentication';

const Signup = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const { signup } = useContext(UserProvider);

  const submitHandler = async (event) => {
    event.preventDefault();
    const userData = await signup(userInput);

    console.log(userData);
    if (userData) {
      toast.success(userData.message);
      navigate('/');
    }

    setUserInput({
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      address: "",
      mobile: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative mt-10">
      <img
        src="https://images-static.nykaa.com/creatives/8ca8807c-bb93-45d4-8b2f-ba6af17defce/default.jpg?tr=cm-pad_resize,w-600"
        alt="Signup Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            onChange={inputHandler}
            value={userInput.firstName}
            name='firstName'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your first name'
            type="text"
            required
          />
          <input
            onChange={inputHandler}
            value={userInput.secondName}
            name='secondName'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your second name'
            type="text"
            required
          />
          <input
            onChange={inputHandler}
            value={userInput.email}
            name='email'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your email'
            type="email"
            required
          />
          <input
            onChange={inputHandler}
            value={userInput.password}
            name='password'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your password'
            type="password"
            required
          />
          <input
            onChange={inputHandler}
            value={userInput.address}
            name='address'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your address'
            type="text"
            required
          />
          <input
            onChange={inputHandler}
            value={userInput.mobile}
            name='mobile'
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Enter your mobile number'
            type="tel"
            required
          />
          <button
            className='w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded transition duration-200'
            type="submit"
          >
            Create an Account
          </button>
          <h4 className='mt-3 text-gray-700 text-center'>
            Already have an account? 
            <Link to='/' className='text-sky-800'> Login Here</Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Signup;