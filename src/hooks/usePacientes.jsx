// useContext es para extraer los datos del createContext.
import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider';

const usePacientes = () => {
    return useContext( PacientesContext );
};

export default usePacientes;
