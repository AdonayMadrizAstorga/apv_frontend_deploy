import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ fecha, setFecha ] = useState( '' );
  const [ sintomas, setSintomas ] = useState('');
  const [ id, setId ] = useState( null );

  const [ alerta, setAlerta ] = useState( {} );

  const { guardarPaciente, pacienteEditando, setPacienteEditando, setFormularioDirty } = usePacientes();
  

  useEffect( () => {
    if ( pacienteEditando?.nombre ) {
      setNombre( pacienteEditando.nombre );
      setPropietario( pacienteEditando.propietario );
      setEmail( pacienteEditando.email );
      setFecha( pacienteEditando.fecha?.split('T')[0] );
      setSintomas( pacienteEditando.sintomas );
      setId( pacienteEditando._id );
    } else {
      setNombre( '' );
      setPropietario( '' );
      setEmail( '' );
      setFecha( '' );
      setSintomas( '' );
      setId( null );
    }
  }, [ pacienteEditando ]);


  // En este caso, la función no va a ser async porque conforme se agreguen los pacientes, se van a tener en un Context. Es decir, aquí solamente se leen los datos
  const handleSubmit = e => {
    e.preventDefault();

    setTimeout(() => {
      setAlerta( {} );
    }, 5000);

    // Validar el formulario
    if ( [ nombre, propietario, email, fecha, sintomas ].includes('') ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return;
    }

    // Guardar Paciente
    guardarPaciente( { nombre, propietario, email, fecha, sintomas, id } );

    setPacienteEditando( null );
    setFormularioDirty( false );

    setAlerta({
      msg: 'Guardado Correctamente'
    });

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId( null );
  }

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus Pacientes y {''}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={ handleSubmit }
      >
        
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ nombre }
            onChange={ e => {
              setNombre( e.target.value );
              setFormularioDirty( true );
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ propietario }
            onChange={ e => {
              setPropietario( e.target.value );
              setFormularioDirty( true );
            }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email }
            onChange={ e => {
              setEmail( e.target.value );
              setFormularioDirty( true );
            }}
          />
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ fecha }
            onChange={ e => {
              setFecha( e.target.value );
              setFormularioDirty( true );
            }}
          />
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ sintomas }
            onChange={ e => {
              setSintomas( e.target.value );
              setFormularioDirty( true );
            }}
          />
        </div>

        <input
          type="submit"
          className={`${id ? "bg-green-700 hover:bg-green-900" : "bg-indigo-600 hover:bg-indigo-800"} w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors`}
          value={ id ? "Guardar Cambios" : "Agregar Paciente"}
        />

      </form>

      { msg && <Alerta
        alerta={ alerta }
      />}

    </>
  )
}

export default Formulario;
