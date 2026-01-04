import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  const [ alerta, setAlerta ] = useState( {} );
  const [ tokenValido, setTokenValido ] = useState( false );
  const [ passwordModificado, setPasswordModificado ] = useState( false );

  const params = useParams();
  const { token } = params;

  useEffect( () => {
    const commprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${ token }`);
        setAlerta({
          msg: 'Coloca tu Nuevo Password'
        });

        setTokenValido( true );
        
      } catch ( error ) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        });
      }
    };
    
    commprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    setTimeout(() => {
      setAlerta( {} );
    }, 5000);

    // Validar que campos obligatorios no estén vacíos
    if ( [ password, repetirPassword ].includes('') ) {
      setAlerta( { msg: 'Hay campos vacíos', error: true } );
      return;
    }
    
    // Validar si los Passwords son iguales
    if ( password !== repetirPassword ) {
      setAlerta( { msg: 'Los Passwords no son iguales', error: true } );
      return;
    }
    
    // Validar la cantidad de caracteres del Password
    if ( password.length < 6 ) {
      setAlerta( { msg: 'El Password es muy corto. Deben ser mínimo 6 caracteres', error: true } );
      return;
    }
    
    try {
      // Restablecer Password
      const url = `/veterinarios/olvide-password/${ token }`;
      const { data } = await clienteAxios.post( url, { password });

      setAlerta({
        msg: data.msg
      });

      setPasswordModificado( true );
      e.target.reset();

    } catch ( error ) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu Password y no Pierdas Acceso a {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt:20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && <Alerta
          alerta={ alerta }
        />}

        { tokenValido && (

          <form
            onSubmit={ handleSubmit }
          >

            <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu Nuevo Password"
                  className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                  value={ password }
                  onChange={ e => setPassword( e.target.value ) }
                  />
              </div>
              
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                  >
                  Repetir Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Repite tu Nuevo Password"
                  className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                  value={ repetirPassword }
                  onChange={ e => setRepetirPassword( e.target.value ) }
                />
              </div>

              <input
                type="submit"
                value="Cambiar Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />

          </form>
        )}

        { passwordModificado && (
          <Link
            className='block text-center my-5 text-gray-500'
            to="/">Iniciar Sesión
          </Link>
        )}
        
      </div>
    </>
  )
}

export default NuevoPassword