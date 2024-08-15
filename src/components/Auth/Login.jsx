import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProvider } from './Authentication';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    document.title="Login"
  })

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const loginHandle = (event) => {
    const { name, value } = event.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };

  const { login } = useContext(UserProvider);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = await login(loginDetails);
      console.log(userData);
      if(userData){
        toast(userData.message)
        return navigate('/home')
      }
      setLoginDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(`Error Login: ${error.message || 'An error occurred'}`);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Background Image */}
      <img
        src="https://images-static.nykaa.com/creatives/8ca8807c-bb93-45d4-8b2f-ba6af17defce/default.jpg?tr=cm-pad_resize,w-600"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginDetails.email}
              onChange={loginHandle}
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginDetails.password}
              onChange={loginHandle}
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded w-full transition duration-200"
          >
            Login
          </button>
          <h4 className='mt-3 text-gray-700 text-center'>
            {"Don't have an Account?"}
            <Link to='/signup' className='text-sky-800'> Create Account </Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;