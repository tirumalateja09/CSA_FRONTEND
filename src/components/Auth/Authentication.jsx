import axios from 'axios';
import { createContext } from 'react';

import { toast } from 'react-toastify';


export const UserProvider = createContext();

export const Authentication = ({ children }) => {



const API="https://csa-backend-authentication.onrender.com"




    const signup = async (data) => {
      try {
        const userData = await axios.post(`${API}/user-creation`, data); 
        console.log("Response from server:", userData);
        console.log(userData.data)
        return userData.data;
        
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error(error|| error?.message);
        return null;
       
       
      }
    };
      


      const login = async (data) => {
        try{
            const loginData = await axios.post(`${API}/user-login`, data);

            if(loginData.data){
                localStorage.setItem('token', JSON.stringify({token : loginData.data.token }))
                return loginData.data
            }

        }catch(err){
            console.log(err)
            toast(err?.message)
        }

    }

      


   

    

  return (
    <UserProvider.Provider value={{ signup, login }} >
        {children}
    </UserProvider.Provider>
  )
}


