
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './components/store/store.jsx';
import { Authentication } from './components/Auth/Authentication.jsx';

createRoot(document.getElementById('root')).render(

  <>
  <Authentication>
  <Provider store={store}>
  <App />
  <ToastContainer/>
  </Provider>
  </Authentication>
  </>
)
