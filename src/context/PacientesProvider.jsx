import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

const PacientesProvider = ( { children } ) => {

    const [ pacientes, setPacientes ] = useState( [] );
    const [ pacienteEditando, setPacienteEditando ] = useState( {} );
    const [ formularioDirty, setFormularioDirty ] = useState( false );
    const { auth } = useAuth();

    useEffect( () => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');

                if ( !token ) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`
                    }
                };

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes( data );

            } catch ( error ) {
                console.log( error );
            }
        };

        obtenerPacientes();
    }, [ auth ]);

    const guardarPaciente = async paciente => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        };

        if ( paciente.id ) {
            // Editar registro
            try {
                const { data } = await clienteAxios.put(`/pacientes/${ paciente.id }`, paciente, config);

                const pacientesActualizado = pacientes.map(
                    pacienteState => pacienteState._id === data._id ? { editado: true, ...data } : pacienteState
                );

                setPacientes( pacientesActualizado );
                
            } catch ( error ) {
                console.log( error );
            }

            return;
        }

        // Nuevo Registro
        try {
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            // const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.pacienteAlmacenado;
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes( [ pacienteAlmacenado, ...pacientes ] );

        } catch ( error ) {
            console.log( error.response.data.error );
        }
    }

    const eliminarPaciente = async id => {
        const confirmar = window.confirm('¿Confirmas que deseas eliminar este paciente?');

        if ( confirmar ) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`
                    }
                };

                await clienteAxios.delete(`/pacientes/${ id }`, config);

                const pacientesActualizado = pacientes.filter( pacienteState => pacienteState._id !== id );
                setPacientes( pacientesActualizado );

                if ( pacienteEditando?._id === id ) {
                    setPacienteEditando( null );
                    setFormularioDirty( false );
                }

            } catch ( error ) {
                console.log( error );
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                pacienteEditando,
                setPacienteEditando,
                formularioDirty,
                setFormularioDirty,
                eliminarPaciente
            }}
        >

            { children }

        </PacientesContext.Provider>
    )
};

export {
    PacientesProvider
};

export default PacientesContext;
