import usePacientes from '../hooks/usePacientes';

const Paciente = ( { paciente } ) => {
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
    const { pacienteEditando, setPacienteEditando, formularioDirty, eliminarPaciente } = usePacientes();
    const estaEditando = pacienteEditando?._id === _id;

    const formatearFecha = fecha => {
        const [year, month, day] = fecha.split('T')[0].split('-');

        const fechaLocal = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        return fechaLocal.toLocaleDateString('es-MX', {
            dateStyle: 'long'
        });
    };


    const handleEditar = () => {
        // Cancelar edición
        if ( estaEditando ) {
            setPacienteEditando( null );
            return;
        }

        // Cambiar de paciente con cambios sin guardar del anterior paciente
        if ( formularioDirty ) {
            const confirmar = window.confirm(
                'Tienes cambios sin guardar. ¿Deseas descartarlos y editar otro paciente?'
            );

            if ( !confirmar ) return;
        }

        setPacienteEditando( paciente );
    };

    // const handleEliminar = () => {
    //     console.log('Eliminando...')
    // };


  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        
        <p className="font-bold uppercase text-indigo-700 my-2">
            Nombre: {''}
            <span className="font-normal normal-case text-black">{ nombre }</span>
        </p>
        
        <p className="font-bold uppercase text-indigo-700 my-2">
            Propietario: {''}
            <span className="font-normal normal-case text-black">{ propietario }</span>
        </p>
        
        <p className="font-bold uppercase text-indigo-700 my-2">
            Email Contacto: {''}
            <span className="font-normal normal-case text-black">{ email }</span>
        </p>
        
        <p className="font-bold uppercase text-indigo-700 my-2">
            Fecha de Alta: {''}
            <span className="font-normal normal-case text-black">{ formatearFecha( fecha ) }</span>
        </p>
        
        <p className="font-bold uppercase text-indigo-700 my-2">
            Síntomas: {''}
            <span className="font-normal normal-case text-black">{ sintomas }</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                // className={`bg-indigo-600 hover:bg-indigo-800 py-2 px-10 text-white uppercase font-bold rounded-lg cursor-pointer`}
                className={`${estaEditando ? "bg-gray-600 hover:bg-gray-800" : "bg-indigo-600 hover:bg-indigo-800"} py-2 px-10 text-white uppercase font-bold rounded-lg cursor-pointer`}
                onClick={ handleEditar }
            >{estaEditando ? "Cancelar" : "Editar"}</button>
            
            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg cursor-pointer"
                onClick={ () => eliminarPaciente( _id ) }
            >Eliminar</button>
        </div>

    </div>
  )
}

export default Paciente;
