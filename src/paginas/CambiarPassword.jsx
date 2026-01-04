import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const { guardarPassword } = useAuth();

  const [ alerta, setAlerta ] = useState( {} );
  const [ password, setPassword ] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
    confirmar_pwd: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    setTimeout(() => {
        setAlerta( {} );
    }, 5000);

    // Validar si todos los campos están llenos
    if ( Object.values( password ).some( campo => campo === '' ) ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return;
    }

    // Validar que Nuevo Password y Confirmar Password sean iguales
    if ( password.pwd_nuevo !== password.confirmar_pwd ) {
      setAlerta({
        msg: 'El Nuevo Password y la confirmación del Nuevo Password no coinciden',
        error: true
      });

      return;
    }

    // Validar la cantidad de caracteres
    if ( password.pwd_nuevo.length < 6 ) {
      setAlerta({
        msg: 'El Password debe tener mínimo 6 caracteres',
        error: true
      });
      
      return;
    }

    // Intentar guardar Nuevo Password
    const respuesta = await guardarPassword( password );
    setAlerta( respuesta );
    e.target.reset();
  }

  const { msg } = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        
        <p className="text-xl mt-5 mb-10 text-center">
            Modifica tu {''}
            <span className="text-indigo-600 font-bold">Password aquí</span>
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
                            htmlFor="pwd_actual"
                            className="uppercase font-bold text-gray-600"
                        >
                            Password Actual
                        </label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Ingresa tu Password Actual"
                            id="pwd_actual"
                            name="pwd_actual"
                            onChange={ e => setPassword({
                                ...password,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label
                            htmlFor="pwd_nuevo"
                            className="uppercase font-bold text-gray-600"
                        >
                            Password Nuevo
                        </label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Ingresa tu Nuevo Password"
                            id="pwd_nuevo"
                            name="pwd_nuevo"
                            onChange={ e => setPassword({
                                ...password,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label
                            htmlFor="confirmar_pwd"
                            className="uppercase font-bold text-gray-600"
                        >
                            Confirmar Password Nuevo
                        </label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                            placeholder="Vuelve a ingresar tu Nuevo Password"
                            id="confirmar_pwd"
                            name="confirmar_pwd"
                            onChange={ e => setPassword({
                                ...password,
                                [ e.target.name ]: e.target.value
                            })}
                        />
                    </div>
                    
                    
                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 hover:bg-indigo-800 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                    />
                    
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword;
