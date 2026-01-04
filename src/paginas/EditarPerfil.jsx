import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [ perfil, setPerfil ] = useState( {} );
    const [ alerta, setAlerta ] = useState( {} );
    
    useEffect( () => {
        setPerfil( auth );

    }, [auth]);
    
    const handleSubmit = async e => {
        e.preventDefault();
        
        setTimeout(() => {
            setAlerta( {} );
        }, 5000);
        
        const { nombre, email } = perfil;

        // Validar si todos los campos requeridos están llenos
        if ( [ nombre, email ].includes('') ) {
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            });

            return;
        }

        // Actualizar Perfil
        const resultado = await actualizarPerfil( perfil );
        setAlerta( resultado );
        e.target.reset();
    }

    const { msg } = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        
        <p className="text-xl mt-5 mb-10 text-center">
            Modifica tu {''}
            <span className="text-indigo-600 font-bold">Información aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                { msg && <Alerta
                    alerta={ alerta }
                />}

                <form
                    onSubmit={ handleSubmit }
                >

                    <div className="my-5">
                        <label
                            htmlFor="nombre"
                            className="uppercase font-bold text-gray-600"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Nombre del Veterinario"
                            id="nombre"
                            name="nombre"
                            value={ perfil.nombre || '' }
                            onChange={ e => setPerfil({
                                ...perfil,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label
                            htmlFor="web"
                            className="uppercase font-bold text-gray-600"
                        >
                            Sitio Web
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Sitio Web del Veterinario"
                            id="web"
                            name="web"
                            value={ perfil.web || '' }
                            onChange={ e => setPerfil({
                                ...perfil,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label
                            htmlFor="telefono"
                            className="uppercase font-bold text-gray-600"
                        >
                            Teléfono
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Teléfono de Contacto"
                            id="telefono"
                            name="telefono"
                            value={ perfil.telefono || '' }
                            onChange={ e => setPerfil({
                                ...perfil,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label
                            htmlFor="email"
                            className="uppercase font-bold text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Email de Contacto"
                            id="email"
                            name="email"
                            value={ perfil.email || '' }
                            onChange={ e => setPerfil({
                                ...perfil,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 hover:bg-indigo-800 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                    />
                    
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil;
