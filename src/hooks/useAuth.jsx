// useContext es para extraer los datos del createContext.
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    return useContext( AuthContext );
};

export default useAuth;
